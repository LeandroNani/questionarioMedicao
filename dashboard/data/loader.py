import json
import pandas as pd
from pathlib import Path


def _parse_json_col(val):
    if pd.isna(val) or val is None:
        return []
    if isinstance(val, list):
        return val
    if isinstance(val, str):
        try:
            parsed = json.loads(val)
            return parsed if isinstance(parsed, list) else [parsed]
        except (json.JSONDecodeError, TypeError):
            return [val] if val.strip() else []
    return []


def load_data() -> pd.DataFrame:
    json_path = Path(__file__).resolve().parent.parent.parent / "respostas_rows.json"
    with open(json_path, encoding="utf-8") as f:
        raw = json.load(f)

    df = pd.DataFrame(raw)

    json_cols = ["main_languages", "comfortable_languages"]
    for col in json_cols:
        if col in df.columns:
            df[col] = df[col].apply(_parse_json_col)

    df["created_at"] = pd.to_datetime(df["created_at"])

    ordinal_cols_int = ["entry_year", "entry_semester", "current_period"]
    for col in ordinal_cols_int:
        if col in df.columns:
            df[col] = pd.to_numeric(df[col], errors="coerce")

    df["period_group"] = pd.cut(
        df["current_period"],
        bins=[0, 2, 5, 8],
        labels=["Início (P1-P2)", "Meio (P3-P5)", "Fim (P6-P8)"],
        right=True,
    )

    df["n_comfortable_langs"] = df["comfortable_languages"].apply(len)
    df["n_main_langs"] = df["main_languages"].apply(len)

    return df
