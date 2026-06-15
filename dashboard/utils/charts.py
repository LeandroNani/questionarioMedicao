import plotly.express as px
import plotly.graph_objects as go
import pandas as pd
import matplotlib.pyplot as plt
from wordcloud import WordCloud
from io import BytesIO
from collections import Counter
from .constants import PALETTE_CATEGORICAL, PLOTLY_LAYOUT_DEFAULTS, PALETTE_SEQUENTIAL


def apply_defaults(fig: go.Figure, title: str = "") -> go.Figure:
    fig.update_layout(**PLOTLY_LAYOUT_DEFAULTS, title=title)
    return fig


def donut_chart(labels: pd.Series, title: str = "", hole: float = 0.45) -> go.Figure:
    counts = labels.value_counts()
    fig = go.Figure(go.Pie(
        labels=counts.index,
        values=counts.values,
        hole=hole,
        marker=dict(colors=PALETTE_CATEGORICAL[:len(counts)]),
        textinfo="label+percent",
        textposition="outside",
        pull=[0.03] * len(counts),
    ))
    return apply_defaults(fig, title)


def horizontal_bar(
    series: pd.Series,
    title: str = "",
    color: str = PALETTE_CATEGORICAL[0],
    sort: bool = True,
    category_order: list | None = None,
    precounted: bool = False,
) -> go.Figure:
    counts = series if precounted else series.value_counts()
    if category_order:
        counts = counts.reindex(category_order).dropna()
    elif sort:
        counts = counts.sort_values(ascending=True)
    else:
        counts = counts.iloc[::-1]

    fig = go.Figure(go.Bar(
        x=counts.values,
        y=counts.index,
        orientation="h",
        marker_color=color,
        text=counts.values,
        textposition="outside",
    ))
    fig.update_layout(yaxis=dict(autorange="reversed" if not sort and not category_order else None))
    return apply_defaults(fig, title)



def stacked_bar_100(
    df: pd.DataFrame,
    group_col: str,
    segment_col: str,
    title: str = "",
    group_order: list | None = None,
    segment_order: list | None = None,
    colors: list | None = None,
) -> go.Figure:
    ct = pd.crosstab(df[group_col], df[segment_col], normalize="index") * 100
    if group_order:
        ct = ct.reindex([g for g in group_order if g in ct.index])
    if segment_order:
        ct = ct.reindex(columns=[s for s in segment_order if s in ct.columns])

    fig = go.Figure()
    palette = colors or PALETTE_CATEGORICAL
    for i, seg in enumerate(ct.columns):
        fig.add_trace(go.Bar(
            name=seg,
            y=ct.index.astype(str),
            x=ct[seg],
            orientation="h",
            marker_color=palette[i % len(palette)],
            text=[f"{v:.0f}%" for v in ct[seg]],
            textposition="inside",
        ))
    fig.update_layout(barmode="stack", xaxis_title="%", yaxis=dict(autorange="reversed"))
    return apply_defaults(fig, title)


def grouped_bar(
    df_plot: pd.DataFrame,
    x_col: str,
    group_col: str,
    value_col: str,
    title: str = "",
    x_order: list | None = None,
) -> go.Figure:
    fig = px.bar(
        df_plot,
        x=x_col,
        y=value_col,
        color=group_col,
        barmode="group",
        color_discrete_sequence=PALETTE_CATEGORICAL,
        category_orders={x_col: x_order} if x_order else None,
    )
    return apply_defaults(fig, title)


def line_chart(
    x: list,
    y: list,
    title: str = "",
    x_label: str = "",
    y_label: str = "",
    color: str = PALETTE_CATEGORICAL[1],
) -> go.Figure:
    fig = go.Figure(go.Scatter(
        x=x, y=y,
        mode="lines+markers+text",
        text=[f"{v:.0f}%" for v in y],
        textposition="top center",
        marker=dict(size=10, color=color),
        line=dict(color=color, width=3),
    ))
    fig.update_layout(xaxis_title=x_label, yaxis_title=y_label)
    return apply_defaults(fig, title)


def treemap_chart(
    labels: pd.Series,
    title: str = "",
) -> go.Figure:
    counts = labels.value_counts().reset_index()
    counts.columns = ["area", "count"]
    fig = px.treemap(
        counts,
        path=["area"],
        values="count",
        color_discrete_sequence=PALETTE_CATEGORICAL,
    )
    fig.update_traces(textinfo="label+value+percent root")
    return apply_defaults(fig, title)


def heatmap_chart(
    ct: pd.DataFrame,
    title: str = "",
    x_label: str = "",
    y_label: str = "",
) -> go.Figure:
    fig = go.Figure(go.Heatmap(
        z=ct.values,
        x=ct.columns.tolist(),
        y=ct.index.tolist(),
        colorscale=[[0, PALETTE_SEQUENTIAL[0]], [1, PALETTE_SEQUENTIAL[-1]]],
        text=ct.values,
        texttemplate="%{text}",
        textfont=dict(size=12),
    ))
    fig.update_layout(xaxis_title=x_label, yaxis_title=y_label)
    return apply_defaults(fig, title)


def box_plot(
    df: pd.DataFrame,
    x_col: str,
    y_col: str,
    title: str = "",
    category_order: list | None = None,
) -> go.Figure:
    fig = px.box(
        df, x=x_col, y=y_col,
        color_discrete_sequence=[PALETTE_CATEGORICAL[0]],
        category_orders={x_col: category_order} if category_order else None,
    )
    return apply_defaults(fig, title)


def generate_wordcloud(word_freq: dict, title: str = "") -> BytesIO:
    wc = WordCloud(
        width=800,
        height=400,
        background_color="white",
        colormap="Blues",
        max_words=50,
        prefer_horizontal=0.7,
        min_font_size=10,
    ).generate_from_frequencies(word_freq)

    buf = BytesIO()
    fig, ax = plt.subplots(figsize=(10, 5))
    ax.imshow(wc, interpolation="bilinear")
    ax.axis("off")
    if title:
        ax.set_title(title, fontsize=16, fontweight="bold", pad=15)
    plt.tight_layout()
    fig.savefig(buf, format="png", dpi=150, bbox_inches="tight")
    plt.close(fig)
    buf.seek(0)
    return buf


def explode_subjects(df: pd.DataFrame, col_prefix: str) -> Counter:
    counter = Counter()
    cols = [c for c in df.columns if c.startswith(col_prefix)]
    for _, row in df.iterrows():
        for i, col in enumerate(cols):
            val = row[col]
            if pd.notna(val) and val:
                weight = 3 - i
                counter[val] += weight
    return counter


def explode_list_col(df: pd.DataFrame, col: str) -> Counter:
    counter = Counter()
    for items in df[col]:
        if isinstance(items, list):
            counter.update(items)
    return counter
