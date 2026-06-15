import pandas as pd
from scipy import stats


def spearman_test(x: pd.Series, y: pd.Series) -> dict:
    mask = x.notna() & y.notna()
    x_clean = x[mask]
    y_clean = y[mask]
    if len(x_clean) < 5:
        return {"rho": None, "p_value": None, "n": len(x_clean), "interpretation": "Amostra insuficiente"}

    rho, p = stats.spearmanr(x_clean, y_clean)
    interpretation = _interpret_correlation(rho, p)
    return {"rho": round(rho, 3), "p_value": round(p, 4), "n": len(x_clean), "interpretation": interpretation}


def mann_whitney_test(group_a: pd.Series, group_b: pd.Series, label_a: str = "A", label_b: str = "B") -> dict:
    a_clean = group_a.dropna()
    b_clean = group_b.dropna()
    if len(a_clean) < 3 or len(b_clean) < 3:
        return {"U": None, "p_value": None, "n_a": len(a_clean), "n_b": len(b_clean), "interpretation": "Amostra insuficiente"}

    u_stat, p = stats.mannwhitneyu(a_clean, b_clean, alternative="two-sided")
    median_a = a_clean.median()
    median_b = b_clean.median()
    interpretation = (
        f"Medianas: {label_a}={median_a:,.0f}, {label_b}={median_b:,.0f}. "
        f"{'Diferença estatisticamente significativa' if p < 0.05 else 'Sem diferença significativa'} (p={p:.4f})."
    )
    return {"U": round(u_stat, 1), "p_value": round(p, 4), "n_a": len(a_clean), "n_b": len(b_clean), "interpretation": interpretation}


def chi_square_test(df: pd.DataFrame, col_a: str, col_b: str) -> dict:
    ct = pd.crosstab(df[col_a], df[col_b])
    if ct.shape[0] < 2 or ct.shape[1] < 2:
        return {"chi2": None, "p_value": None, "dof": None, "interpretation": "Categorias insuficientes"}

    chi2, p, dof, _ = stats.chi2_contingency(ct)
    interpretation = (
        f"χ²={chi2:.2f}, gl={dof}, p={p:.4f}. "
        f"{'Associação significativa entre as variáveis' if p < 0.05 else 'Sem associação significativa'}."
    )
    return {"chi2": round(chi2, 2), "p_value": round(p, 4), "dof": dof, "interpretation": interpretation}


def _interpret_correlation(rho: float, p: float) -> str:
    abs_rho = abs(rho)
    if abs_rho < 0.1:
        strength = "desprezível"
    elif abs_rho < 0.3:
        strength = "fraca"
    elif abs_rho < 0.5:
        strength = "moderada"
    elif abs_rho < 0.7:
        strength = "forte"
    else:
        strength = "muito forte"

    direction = "positiva" if rho > 0 else "negativa"
    sig = "estatisticamente significativa" if p < 0.05 else "não significativa"
    return f"Correlação {strength} {direction} (ρ={rho:.3f}), {sig} (p={p:.4f})."
