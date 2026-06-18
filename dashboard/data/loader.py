import json
import pandas as pd
import streamlit as st
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


def _find_json_path() -> Path:
    base = Path(__file__).resolve().parent.parent.parent / "respostas_rows.json"
    if base.exists():
        return base
    alt = Path.cwd().parent / "respostas_rows.json"
    if alt.exists():
        return alt
    alt2 = Path.cwd() / "respostas_rows.json"
    if alt2.exists():
        return alt2
    raise FileNotFoundError(f"respostas_rows.json not found. Tried: {base}, {alt}, {alt2}")


@st.cache_data
def load_data() -> pd.DataFrame:
    json_path = _find_json_path()
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
