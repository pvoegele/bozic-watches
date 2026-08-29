# PRODUCT.md — BOZIC Watches

## Produkt

BOZIC Watches ist ein exklusiver Uhrenhandel: An- und Verkauf hochwertiger Uhren
(Rolex, Omega, Patek Philippe u. a.), dazu Suchaufträge (Concierge-Beschaffung)
und Kommissionsverkauf. Der Handel wird auf Shopify aufgebaut (Commerce-Backend,
Checkout, Verwaltung); die Storefront ist ein eigenes Frontend.

Mechanismus in einem Satz: Drei Standbeine speisen einander — Ankauf liefert die
Ware, Verkauf die Marge, Suchaufträge die Kundenbindung — verwaltet in einer
Pipeline pro Uhr (Unikat, Menge 1) und abgerechnet über Differenzbesteuerung
(§ 25a UStG).

## Diese Surface: „Konzept"-Seite

- **Zweck:** Das Shop- und Vermarktungskonzept (siehe `Konzept.md`) als begehbare
  Seite — Strategiepapier zum Lesen, Verstehen und Freigeben.
- **Audience:** Inhaber/Partner (Bozic), Stakeholder, ggf. Dienstleister.
  Deutschsprachig. Liest auf Desktop und Handy.
- **Job der Seite:** In einer Scrollstrecke verstehen: Geschäftsmodell,
  Architektur, Verwaltung, Abrechnung/§ 25a, Marketing (Google + Instagram,
  Budgets), Roadmap (3 Phasen), Kosten — und die acht offenen Entscheidungen,
  die den Start freigeben.
- **Aktion:** Abstimmung vereinbaren / Entscheidungen treffen.
- **Format:** Muss als Shopify-Theme-Baustein funktionieren
  (Liquid-Section + Page-Template, keine Build-Pipeline, keine externen
  Abhängigkeiten außer erlaubten Assets).

## Inhaltliche Fakten (nicht erfindbar, Quelle: Konzept.md)

- Verkaufsmodi: bis 3.000 € Checkout · 3.000–15.000 € Checkout + Beratung ·
  ab 15.000 € Anfrage & Reservierung (Anzahlung ~10 %).
- Waren-Pipeline: Angekauft → Echtheitsprüfung → Aufbereitung → Fotografie →
  Online → Reserviert → Verkauft → Versendet.
- Abrechnung: easybill/Billbee, § 25a-Differenzbesteuerung, DATEV-Export,
  GwG-Grenze 10.000 € bar.
- Marketing: GA4 + GTM + Consent Mode v2; Google Ads ~2.700 €/M
  (Brand 150 / Modelle 900 / PMax 600 / Ankauf 750 / Remarketing 300);
  Instagram/Meta ~1.800 €/M (Ankauf-Leads 750 / Suchauftrag 300 /
  Retargeting 300 / Brand 450); Lead-SLA < 24 h; HubSpot-Pipelines.
- Roadmap: Phase 1 Wochen 1–6 (verkaufsfähiger Shop) · Phase 2 Wochen 7–10
  (Marketing) · Phase 3 ab Woche 11 (Ausbau).
- Kosten: Fixkosten ~180–420 €/M, Ads ~4.500 €/M, gesamt ~4.700–4.900 €/M
  (Richtwerte).
- Acht offene Entscheidungen (Preistransparenz, Barzahlung/GwG, Steuer-Setup,
  Versand, Kommission, Internationalisierung, Chrono24, Budgetfreigabe).

## Brand-Commitments

- Der Nutzer hat das bestehende Frontend-Design **explizit verworfen**
  („kannst das bestehende Frontend komplett über Bord werfen"): kein Pin auf
  die alte Cream/Gold/System-Sans-Welt. Erwartung: „besser, schöner, geiler" —
  eine eigenständige, ambitionierte visuelle Welt.
- Eine Higgsfield-generierte Animation (Video) ist ausdrücklich erwünscht,
  wenn sie zur Richtung passt.
- Sprache der Seite: Deutsch. Zahlen sind Richtwerte und bleiben als solche
  gekennzeichnet; keine erfundenen kommerziellen Claims.

## Constraints

- Muss ohne Build-Schritt in ein Shopify-Theme integrierbar sein
  (eine Section-Datei mit eingebettetem CSS/JS + JSON-Template + Assets).
- Selbst gehostete Assets (Video/Poster) über das Theme; keine fremden CDNs
  außer Google Fonts.
- Performance: ein Hero-Video als kurzer, komprimierter Loop mit Poster;
  `prefers-reduced-motion` respektieren.
