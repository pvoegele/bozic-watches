#!/usr/bin/env python3
"""Kopiert die statischen Vorschauen nach public/, damit sie über die
Vercel-Deployment-URL erreichbar sind.

  preview/konzept-preview.html -> public/konzept.html
  preview/theme-preview.html   -> public/shop-vorschau.html
  theme/assets/base.css        -> public/bozic-swiss.css

Die Vorschauen bleiben das Master unter preview/; nach Änderungen dort
einfach erneut ausführen:  python3 publish-preview.py
"""
import pathlib
import shutil

base = pathlib.Path(__file__).parent
public = base.parent / "public"

# Konzept-Seite: eigenständiges Dokument, nur Schrift von Google Fonts
shutil.copyfile(base / "preview" / "konzept-preview.html", public / "konzept.html")

# Theme-Stylesheet für die Shop-Vorschau
shutil.copyfile(base / "theme" / "assets" / "base.css", public / "bozic-swiss.css")

# Shop-Vorschau: Pfade auf die Auslieferung unter / umschreiben
shop = (base / "preview" / "theme-preview.html").read_text(encoding="utf-8")
shop = shop.replace("../theme/assets/base.css", "/bozic-swiss.css")
shop = shop.replace("../../public/examples/", "/examples/")
(public / "shop-vorschau.html").write_text(shop, encoding="utf-8")

for name in ("konzept.html", "shop-vorschau.html", "bozic-swiss.css"):
    print(f"written public/{name} ({(public / name).stat().st_size} bytes)")
