#!/usr/bin/env python3
"""Generiert sections/konzept.liquid aus preview/konzept-preview.html.

Die Preview ist das visuelle Master. Dieses Script ersetzt die wenigen
redaktionellen Stellen (Hero-Texte, Video, CTA) durch Section-Settings
und hängt das Shopify-Schema an. Nach Änderungen an der Preview einfach
erneut ausführen:  python3 build-liquid.py
"""
import re
import pathlib

base = pathlib.Path(__file__).parent
src = (base / "preview" / "konzept-preview.html").read_text(encoding="utf-8")

style = re.search(r"<style>(.*?)</style>", src, re.S).group(1)
body = re.search(r"<body>(.*?)</body>", src, re.S).group(1)
script = re.search(r"<script>(.*?)</script>", body, re.S).group(1)
body = re.sub(r"<script>.*?</script>", "", body, flags=re.S)
# Direction-Contract-Kommentar nicht in den Shop ausliefern
body = re.sub(r"<!--\nTHESIS:.*?-->", "", body, flags=re.S).strip()

# --- Redaktionelle Stellen -> Settings ---------------------------------
video_block = re.search(r"\s*<video[^>]*></video>", body).group(0)
body = body.replace(
    video_block,
    "\n            {% if section.settings.video_url != blank %}\n"
    '            <video autoplay muted loop playsinline preload="metadata" src="{{ section.settings.video_url }}"></video>\n'
    "            {% endif %}",
)

body = body.replace(
    '<h1 class="bz-h1">Vom Showroom zum <span class="bz-rot">Handelshaus.</span></h1>',
    '<h1 class="bz-h1">{{ section.settings.title }} <span class="bz-rot">{{ section.settings.title_accent }}</span></h1>',
)
body = body.replace(
    '<p class="bz-lead">Das Konzept für BOZIC Watches: Shopify-Handel für exklusive Uhren mit Verwaltungsebene, sauberer Abrechnung und planbarer Kundengewinnung über Google und Instagram.</p>',
    '<p class="bz-lead">{{ section.settings.subtitle }}</p>',
)
body = body.replace(
    '<span class="bz-label">BOZIC Watches</span>',
    '<span class="bz-label">{{ shop.name | default: "BOZIC Watches" }}</span>',
)
body = body.replace(
    '<span class="bz-label bz-label--dim">Stand 29.08.2026</span>',
    '<span class="bz-label bz-label--dim">Stand {{ section.settings.date_label }}</span>',
)
body = body.replace(
    '<span class="bz-label bz-label--red">Zur Abstimmung</span>',
    '<span class="bz-label bz-label--red">{{ section.settings.status_label }}</span>',
)
body = body.replace(
    "<figcaption>Abb. 01 · <b>10.08 Uhr</b> — Hero-Video folgt</figcaption>",
    "<figcaption>{% if section.settings.video_url != blank %}Abb. 01 · <b>10.08 Uhr</b>{% else %}Abb. 01 · <b>10.08 Uhr</b> — Hero-Video folgt{% endif %}</figcaption>",
)
body = body.replace(
    '<a class="bz-btn" href="/pages/kontakt">Abstimmung vereinbaren</a>',
    '<a class="bz-btn" href="{{ section.settings.contact_url | default: \'/pages/kontakt\' }}">{{ section.settings.cta_label }}</a>',
)
body = body.replace(
    "<span>BOZIC Watches · Strategiepapier</span>",
    '<span>{{ shop.name | default: "BOZIC Watches" }} · Strategiepapier</span>',
)
body = body.replace(
    "<span>Stand 29.08.2026 · Vertraulich</span>",
    "<span>Stand {{ section.settings.date_label }} · Vertraulich</span>",
)

schema = """{% schema %}
{
  "name": "Konzept (BOZIC)",
  "tag": "section",
  "class": "bz-konzept-section",
  "settings": [
    { "type": "header", "content": "Hero" },
    { "type": "text", "id": "title", "label": "Titel", "default": "Vom Showroom zum" },
    { "type": "text", "id": "title_accent", "label": "Titel-Akzentwort (rot)", "default": "Handelshaus." },
    { "type": "textarea", "id": "subtitle", "label": "Untertitel", "default": "Das Konzept für BOZIC Watches: Shopify-Handel für exklusive Uhren mit Verwaltungsebene, sauberer Abrechnung und planbarer Kundengewinnung über Google und Instagram." },
    { "type": "text", "id": "date_label", "label": "Stand (Datum)", "default": "29.08.2026" },
    { "type": "text", "id": "status_label", "label": "Status", "default": "Zur Abstimmung" },
    { "type": "text", "id": "video_url", "label": "Hero-Video-URL (leer = rote Scheibe)", "info": "Video unter Inhalte → Dateien hochladen und die Datei-URL hier einfügen. Läuft automatisch schwarzweiß im Kreis." },
    { "type": "header", "content": "Abschluss" },
    { "type": "text", "id": "cta_label", "label": "Button-Text", "default": "Abstimmung vereinbaren" },
    { "type": "url", "id": "contact_url", "label": "Button-Ziel" }
  ],
  "presets": [ { "name": "Konzept (BOZIC)" } ]
}
{% endschema %}
"""

liquid = (
    "{% comment %}\n"
    "  BOZIC Watches – Konzept-Seite (Schweizer Typografie)\n"
    "  Generiert aus shopify-theme/preview/konzept-preview.html – Änderungen\n"
    "  dort vornehmen und build-liquid.py erneut ausführen.\n"
    "{% endcomment %}\n"
    '<link rel="preconnect" href="https://fonts.googleapis.com">\n'
    '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>\n'
    '<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Hanken+Grotesk:wght@400;600;800&display=swap">\n'
    "<style>" + style + "</style>\n\n"
    + body.strip() + "\n\n"
    "<script>" + script + "</script>\n\n"
    + schema
)

out = base / "sections" / "konzept.liquid"
out.write_text(liquid, encoding="utf-8")
leftover = re.findall(r"Vom Showroom|29\.08\.2026|/pages/kontakt\"|BOZIC Watches<", body)
print(f"written {out} ({len(liquid)} bytes); un-templated leftovers: {leftover}")
