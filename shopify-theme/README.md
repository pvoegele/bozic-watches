# BOZIC Swiss — Shopify-Theme

Das komplette Shop-Theme im Design „Schweizer Typografie": Papierweiß,
Tuscheschwarz, Signalrot als einziger Akzent, eine Grotesk (Hanken Grotesk),
1px/2px-Linienwerk, keine Radien, keine Schatten. Enthält Startseite,
Uhren-Katalog, Produktseite mit der `sales_mode`-Logik aus dem Konzept,
Ankauf-Formular, Warenkorb, Suche und die Konzept-Seite als eigene Vorlage.

## Struktur

| Pfad | Zweck |
|---|---|
| `theme/` | Das installierbare Shopify-Theme (nur dieser Ordner wird hochgeladen) |
| `preview/theme-preview.html` | Statische Vorschau der Shop-Screens (Home, Produkt, Warenkorb) — im Browser öffnen |
| `preview/konzept-preview.html` | Statische Vorschau der Konzept-Seite (visuelles Master der Section) |
| `build-liquid.py` | Generiert `theme/sections/konzept.liquid` aus der Konzept-Preview |

## Installation

**Variante A — Shopify CLI (empfohlen):**

```bash
shopify theme push --path shopify-theme/theme --unpublished --theme "BOZIC Swiss"
```

**Variante B — ZIP-Upload:**

```bash
cd shopify-theme/theme && zip -r ../bozic-swiss.zip . && cd -
```

Dann Shopify Admin → **Onlineshop → Themes → Theme hinzufügen → ZIP-Datei
hochladen** → `bozic-swiss.zip`.

## Einrichtung nach der Installation (~15 Minuten)

1. **Menüs** (Inhalte → Navigation):
   - `main-menu`: Uhren (→ Kollektion „Alle Produkte" oder eigene), Ankauf
     (→ Seite „Ankauf"), Konzept (→ Seite „Konzept"), Kontakt (→ Seite „Kontakt")
   - `footer`: Impressum, Datenschutz, AGB, Widerruf
2. **Seiten** (Onlineshop → Seiten):
   - „Konzept" mit Theme-Template **konzept**
   - „Ankauf" mit Theme-Template **ankauf** (nutzt das Kontaktformular —
     Einsendungen kommen als E-Mail an die Shop-Adresse und lassen sich per
     Shopify Flow/Zapier an HubSpot weiterreichen)
   - „Kontakt", „Impressum", „Datenschutz", „AGB", „Widerruf" mit Template **page**
3. **Startseite**: Theme-Editor → Sektion „Uhren-Raster" → Kollektion wählen
   (z. B. eine Kollektion „Neuzugänge"); Hero-Texte und CTAs anpassen.
4. **Produktseite**: Theme-Editor → Vorlage Produkt → Anfrage-Seite und
   WhatsApp-Nummer hinterlegen.
5. **Metafelder** (einmalig, Einstellungen → Benutzerdefinierte Daten → Produkte),
   Namespace `custom`: `brand`, `model`, `reference`, `year`, `case_size_mm`,
   `material`, `movement`, `condition`, `scope_of_delivery` (Text),
   `availability_status` (Text: available/reserved/sold),
   `sales_mode` (Text: checkout/inquiry/auf_anfrage),
   `show_price` (Wahr/Falsch). Fehlen die Felder, fällt das Theme auf sinnvolle
   Standards zurück (Preis sichtbar, Kauf möglich, Vendor als Marke).

## Verkaufslogik der Produktseite (aus dem Konzept)

| Zustand | Verhalten |
|---|---|
| `sales_mode: checkout` | „In den Warenkorb" + optional WhatsApp |
| `sales_mode: inquiry` | Kauf-Button **und** „Beratung anfragen" |
| `sales_mode: auf_anfrage` | Kein Kauf-Button, „Preis auf Anfrage", Anfrage-CTA |
| `show_price: false` | Preis wird durch „Preis auf Anfrage" ersetzt |
| `availability_status: reserved` | Rote Marke „Reserviert", Warteliste statt Kauf |
| `availability_status: sold` (oder ausverkauft) | Marke „Verkauft", Referenzstück, Anfrage-CTA |

## Hero-Video

Startseite und Konzept-Seite zeigen als Signet die rote Plakat-Scheibe
(Zeiger auf 10.08 Uhr). Ein Hero-Video ersetzt sie formgleich — kreisförmig
maskiert und automatisch schwarzweiß gefiltert: Video unter **Inhalte →
Dateien** hochladen, URL kopieren, im Theme-Editor in das Feld
**Hero-Video-URL** der jeweiligen Sektion einfügen.

## Konzept-Seite pflegen

Die Inhalte der Konzept-Section (Zahlen, Budgets, Roadmap, Entscheidungen)
sind bewusst fest im Markup — sie sind das Strategiepapier selbst (Quelle:
`Konzept.md` im Repo-Root). Änderungen in `preview/konzept-preview.html`
vornehmen und `python3 build-liquid.py` ausführen; das Script schreibt die
Section neu nach `theme/sections/konzept.liquid`.

## Technische Hinweise

- Ein schlankes Custom-Theme (kein Theme-Store-Umfang): Kundenkonto-,
  Passwort- und Geschenkgutschein-Templates sind bewusst nicht enthalten.
- Schrift: Google Fonts (Hanken Grotesk) per `<link>`, Fallback Helvetica/Arial.
- Kein horizontales Scrollen; Tabellen scrollen in eigenen Containern;
  `prefers-reduced-motion` wird respektiert.
- Designsystem zentral in `theme/assets/base.css` (Präfix `sw-`); die
  Konzept-Section ist absichtlich autark (eingebettetes CSS, Präfix `bz-`).
