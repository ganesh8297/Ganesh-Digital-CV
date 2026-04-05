#!/usr/bin/env python3
"""Rebuild data/portfolio.js from data/portfolio.json (for file:// preview)."""
import json
from pathlib import Path

root = Path(__file__).resolve().parents[1]
src = root / "data" / "portfolio.json"
dst = root / "data" / "portfolio.js"
data = json.loads(src.read_text(encoding="utf-8"))
dst.write_text(
    "/* Generated from data/portfolio.json — edit JSON, then run: python3 scripts/sync_portfolio_js.py */\n"
    "window.PORTFOLIO_DATA = "
    + json.dumps(data, ensure_ascii=False, indent=2)
    + ";\n",
    encoding="utf-8",
)
print(f"Updated {dst}")
