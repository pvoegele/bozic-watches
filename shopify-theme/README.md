# BOZIC Konzept-Seite als Shopify-Theme-Baustein

Die Konzept-Seite (Schweizer Typografie: Papierweiß, Schwarz, Signalrot) als eigenständige Shopify-Section —
integrierbar in jedes Online-Store-2.0-Theme (z. B. Dawn), ohne Build-Pipeline
und ohne App. CSS und JS sind in der Section eingebettet, alle Klassen sind
mit `bz-` gescoped und kollidieren nicht mit dem Theme.

## Dateien

| Datei | Zweck |
|---|---|
| `sections/konzept.liquid` | Die komplette Seite als Section (Markup, Styles, Script, Schema) |
| `templates/page.konzept.json` | Seiten-Template, das nur diese Section rendert |
| `preview/konzept-preview.html` | Eigenständige HTML-Vorschau — im Browser öffnen, kein Shopify nötig |
| `build-liquid.py` | Generiert die Section aus der Vorschau (Design-Änderungen nur in der Preview machen, dann Script ausführen) |

## Integration (Theme-Code-Editor, ~5 Minuten)

1. Shopify Admin → **Onlineshop → Themes → ⋯ → Code bearbeiten**
2. Unter **Sections**: „Neue Section hinzufügen" → Name `konzept` → Inhalt von
   `sections/konzept.liquid` einfügen → speichern.
3. Unter **Templates**: „Neues Template hinzufügen" → Typ **page**, JSON,
   Name `konzept` → Inhalt von `templates/page.konzept.json` einfügen → speichern.
4. **Onlineshop → Seiten → Seite hinzufügen**: Titel „Konzept",
   rechts unter **Theme-Template** das Template `konzept` wählen → speichern.
5. Die Seite ist unter `/pages/konzept` erreichbar. Wer sie nicht öffentlich
   verlinken will, lässt sie einfach aus der Navigation heraus — oder schützt
   den Shop während der Abstimmungsphase per Passwortseite.

Alternativ (Shopify CLI): beide Dateien in ein Theme-Verzeichnis kopieren und
`shopify theme push` ausführen.

## Hero-Video einbinden

Die Section startet mit einem gestalteten Platzhalter (rote Plakat-Scheibe
mit Zeigern auf 10.08 Uhr). Sobald das generierte Hero-Video hochgeladen ist:

1. Shopify Admin → **Inhalte → Dateien** → Video hochladen (MP4, empfohlen
   ≤ 8 MB; das Kling-Video vor dem Upload ggf. komprimieren).
2. Datei-URL kopieren.
3. Theme-Editor → Seite „Konzept" öffnen → Section **Konzept (BOZIC)** →
   Feld **Hero-Video-URL** → URL einfügen → speichern.

Bleibt das Feld leer, trägt die Scheibe den Hero — die Seite ist auch ohne
Video vollständig. Das Video wird automatisch kreisförmig maskiert und
schwarzweiß gefiltert, damit jedes Material stilkonform bleibt.

## Anpassbare Inhalte

Über den Theme-Editor (Section-Settings): Titel, Akzentwort, Untertitel,
Stand/Datum, Status, Hero-Video-URL, CTA-Text und CTA-Ziel.

Die Kapitel-Inhalte (Zahlen, Budgets, Roadmap, Entscheidungen) sind bewusst
fest im Markup — sie sind das Strategiepapier selbst (Quelle: `Konzept.md`
im Repo-Root). Änderungen daran bitte in
`preview/konzept-preview.html` vornehmen und `python3 build-liquid.py`
ausführen, damit Vorschau und Section synchron bleiben.

## Technische Hinweise

- Schriften: Google Fonts (Hanken Grotesk) — wird per `<link>` geladen;
  Fallback-Stacks sind deklariert.
- Animationen: genau zwei Momente — die Hero-Scheibe setzt beim Laden ein,
  die Waren-Pipeline tickt einmal durch; ohne JavaScript ist alles sichtbar,
  `prefers-reduced-motion` deaktiviert Bewegung und pausiert das Video.
- Kein horizontales Scrollen; Tabellen scrollen in eigenen Containern.
- Die Seite ist eine in sich geschlossene, helle Welt (Papierweiß, Schwarz,
  Signalrot) und übernimmt bewusst nicht die Farbwelt des restlichen Themes.
