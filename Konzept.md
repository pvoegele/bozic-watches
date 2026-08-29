# BOZIC Watches – Shop- und Vermarktungskonzept

**Shopify-basierter Online-Handel für exklusive Uhren mit Verwaltungsebene, Abrechnung und digitalem Marketing (Google & Instagram)**

| | |
|---|---|
| Projekt | bozic-watches (github.com/pvoegele/bozic-watches) |
| Stand | 29.08.2026 |
| Status | Konzeptentwurf zur Abstimmung |
| Ist-Basis | Next.js-16-Showroom-Frontend mit Shopify Storefront API (headless), noch ohne Checkout |

---

## Inhalt

1. [Executive Summary](#1-executive-summary)
2. [Ausgangslage: Was bereits existiert](#2-ausgangslage-was-bereits-existiert)
3. [Geschäftsmodell & Zielgruppen](#3-geschäftsmodell--zielgruppen)
4. [Systemarchitektur](#4-systemarchitektur)
5. [Storefront: Funktionsumfang des Shops](#5-storefront-funktionsumfang-des-shops)
6. [Verwaltungsebene (Backoffice)](#6-verwaltungsebene-backoffice)
7. [Abrechnung, Zahlungsarten & Buchhaltung](#7-abrechnung-zahlungsarten--buchhaltung)
8. [Recht & Compliance](#8-recht--compliance)
9. [Tracking & Analytics (GA4, GTM, Consent)](#9-tracking--analytics-ga4-gtm-consent)
10. [Google Ads](#10-google-ads)
11. [Instagram / Meta: Ads & Lead-Generierung](#11-instagram--meta-ads--lead-generierung)
12. [Weitere Kanäle: SEO, E-Mail, WhatsApp, Chrono24](#12-weitere-kanäle-seo-e-mail-whatsapp-chrono24)
13. [KPIs & Reporting](#13-kpis--reporting)
14. [Roadmap & Phasenplan](#14-roadmap--phasenplan)
15. [Laufende Kosten (Richtwerte)](#15-laufende-kosten-richtwerte)
16. [Offene Entscheidungen](#16-offene-entscheidungen)

---

## 1. Executive Summary

BOZIC Watches wird vom reinen Showroom zum vollwertigen Handelsbetrieb für exklusive Uhren ausgebaut – mit drei Standbeinen:

1. **Verkauf** hochwertiger Uhren (gebraucht/CPO und ggf. Neuware) über den eigenen Shop – mit direktem Checkout im unteren Preissegment und beratungsgeführtem Verkauf (Anfrage, Reservierung, Überweisung) im Hochpreissegment.
2. **Ankauf** von Uhren aus Privatbesitz als zweite Umsatzquelle und wichtigster Warenbeschaffungskanal – gesteuert über Lead-Generierung (Instagram Lead Ads, Google Ads auf „Uhr verkaufen"-Keywords) und eine CRM-Pipeline.
3. **Suchaufträge / Concierge**: Kunden hinterlegen ihre Wunschuhr, BOZIC beschafft sie – hohe Marge, starke Kundenbindung, ideales Lead-Ads-Format.

**Kernentscheidungen dieses Konzepts:**

- **Headless-Architektur beibehalten**: Das bestehende Next.js-Frontend bleibt das Schaufenster (volle Designfreiheit für den Luxusauftritt), Shopify liefert Produktverwaltung, Warenkorb, Checkout, Bestell- und Kundenverwaltung. Kein Wechsel auf ein Shopify-Theme, keine Eigenentwicklung von Checkout/Payment.
- **Shopify Admin ist die Verwaltungsebene** – erweitert um interne Metafelder (Einkaufspreis, Einlieferer, Workflow-Status), Staff-Rollen und Apps. Ein eigenes Dashboard (Lagerwert, Margen, Standtage) kommt erst in Phase 3, wenn der Bedarf belegt ist.
- **Abrechnung**: Shopify Payments plus manuelle Banküberweisung (wichtig bei hohen Warenwerten wegen Kartengebühren), automatische Rechnungsstellung über ein deutsches Buchhaltungs-Tool mit Unterstützung der **Differenzbesteuerung nach §25a UStG** – das steuerliche Kernthema im Gebrauchtuhrenhandel, das Shopify allein nicht abbildet.
- **Marketing-Stack**: GA4 + Google Tag Manager mit Consent Mode v2, Google Ads (Search, Performance Max mit Produktfeed), Meta Pixel + Conversions API, Instagram Lead Ads für Ankauf und Suchaufträge, CRM-Anbindung (HubSpot) mit automatisiertem Follow-up.

Grober Zeitrahmen: **Phase 1 (verkaufsfähiger Shop) in 4–6 Wochen**, Phase 2 (Marketing-Maschine) weitere 4 Wochen, Phase 3 (Ausbau) fortlaufend.

---

## 2. Ausgangslage: Was bereits existiert

Das Repository enthält ein produktionsreifes **Showroom-Frontend**:

| Baustein | Stand |
|---|---|
| Framework | Next.js 16 (App Router), TypeScript, Tailwind CSS 4 |
| Seiten | Startseite (Hero-Video), `/uhren` (Katalog), `/uhren/[handle]` (Detail), `/ankauf`, `/kontakt` |
| Shopify-Anbindung | Storefront API (GraphQL) in `lib/shopify.ts`, Produktdaten über Metafelder (`custom.brand`, `model`, `reference`, `year`, `case_size_mm`, `material`, `movement`, `condition`, `availability_status`, `show_price`) |
| Fallback | Mock-Daten, wenn keine Shopify-Credentials gesetzt sind |
| Design | Luxus-Look (Cream/Gold/Forest-Palette, Serifen-Headlines), responsive |

**Bewusste Lücken des Ist-Stands, die dieses Konzept schließt:**

- Kein Warenkorb, kein Checkout, keine Zahlungsabwicklung („No E-commerce" laut README)
- Produktbilder sind hart auf Platzhalter gesetzt (`imageUrl` in `lib/shopify.ts:65`) – echte Shopify-Bilder werden noch nicht geladen
- Kontakt- und Ankaufsformulare haben kein Backend (kein E-Mail-Versand, kein CRM)
- Kein Tracking, kein Consent-Management, kein SEO-Feinschliff
- Storefront-API-Version `2024-01` ist veraltet und sollte auf eine aktuelle Version gehoben werden
- Keine Verwaltungs-/Abrechnungsprozesse definiert

---

## 3. Geschäftsmodell & Zielgruppen

### 3.1 Umsatzquellen

| Quelle | Beschreibung | Marge/Charakter |
|---|---|---|
| **Verkauf Lagerware** | Angekaufte, geprüfte und aufbereitete Uhren (Unikate, Menge = 1) | Kerngeschäft; Bruttomarge typ. 10–25 % je nach Marke/Modell |
| **Ankauf** | Ankauf von Privat (Basis für Lagerware); alternativ direkte Weitervermarktung | Beschaffungskanal; Ankaufskurs unter Marktwert |
| **Kommission** | Verkauf im Kundenauftrag gegen Provision (z. B. 8–15 %) | Kein Kapitaleinsatz, kein Lagerrisiko |
| **Suchauftrag/Concierge** | Beschaffung einer Wunschuhr auf Bestellung, ggf. gegen Anzahlung | Planbare Marge, kein Standrisiko |

### 3.2 Zielgruppen

- **Käufer Einsteiger/Mittelklasse** (ca. 500–5.000 €): kaufen online direkt, erwarten Checkout, Ratenzahlung, schnellen Versand.
- **Käufer Premium/Luxus** (5.000–50.000+ €): erwarten persönliche Beratung, Verhandlungsspielraum, Echtheitsnachweis, diskrete Abwicklung; kaufen selten per Kreditkarte, sondern per Überweisung oder vor Ort.
- **Verkäufer (Ankauf-Leads)**: Privatpersonen mit Erbstücken oder Sammlungsauflösung; suchen Vertrauen, faire Bewertung, unkomplizierte Abwicklung.
- **Sammler mit Suchprofil**: wissen genau, was sie wollen (Referenznummer), reagieren auf „Neuzugänge"-Benachrichtigungen und Suchauftrags-Angebote.

### 3.3 Verkaufsmodi nach Preissegment

Der Shop unterstützt **beide Welten parallel** – gesteuert über die bereits vorhandenen Metafelder (`show_price`, `availability_status`) plus ein neues Feld `sales_mode`:

| Preissegment | Modus | Ablauf |
|---|---|---|
| bis ca. 3.000 € | **Direkter Checkout** | Warenkorb → Shopify Checkout → Zahlung → versicherter Versand |
| ca. 3.000–15.000 € | **Checkout + Beratungsoption** | Checkout möglich; zusätzlich prominenter CTA „Beratung/Termin" und WhatsApp-Kontakt |
| über 15.000 € / „Preis auf Anfrage" | **Anfrage & Reservierung** | Anfrageformular/Termin → persönliches Angebot → Reservierung gegen Anzahlung (z. B. 10 %) → Restzahlung per Überweisung/Escrow → Übergabe/Versand |

---

## 4. Systemarchitektur

### 4.1 Architekturentscheidung: Headless bleibt

**Empfehlung: Das bestehende Next.js-Frontend beibehalten und Shopify als Commerce-Backend nutzen.**

Begründung:
- Der Luxusauftritt (Video-Hero, Typografie, reduzierte Ästhetik) ist bereits gebaut und mit Shopify-Standard-Themes nur mit Kompromissen erreichbar.
- Shopify liefert die schwer selbst zu bauenden Teile fertig: PCI-konformer Checkout, Zahlarten, Bestellverwaltung, Kundenkonten, Steuerlogik, App-Ökosystem.
- Die Alternative (Wechsel auf Shopify Online Store 2.0 mit Custom Theme) würde das vorhandene Frontend verwerfen und spart erst bei sehr kleinem Entwicklungsbudget wirklich Aufwand.

### 4.2 Zielbild

```
                        ┌─────────────────────────────────────────────┐
                        │                 KUNDE                       │
                        └──────┬──────────────────────────┬───────────┘
                               │                          │
                 ┌─────────────▼────────────┐   ┌─────────▼──────────┐
                 │  Next.js Storefront      │   │  Shopify Checkout   │
                 │  (Vercel)                │──▶│  (Warenkorb-Übergabe│
                 │  Katalog, Detail, Ankauf,│   │   via checkoutUrl)  │
                 │  Kontakt, Suchauftrag    │   └─────────┬──────────┘
                 └─────────────┬────────────┘             │
                               │ Storefront API           │ Order-Webhooks
                 ┌─────────────▼────────────────────────── ▼──────────┐
                 │                   SHOPIFY (Verwaltungsebene)       │
                 │  Produkte (Unikate + Metafelder) · Bestellungen ·  │
                 │  Kunden · Rabatte · Staff-Rollen · Zahlungen       │
                 └───────┬───────────────┬───────────────┬────────────┘
                         │               │               │
              ┌──────────▼───┐  ┌────────▼────────┐  ┌───▼─────────────────┐
              │ Buchhaltung/ │  │ Marketing-Stack │  │ CRM (HubSpot)       │
              │ Rechnungen   │  │ GA4/GTM · Google│  │ Ankauf-Pipeline ·   │
              │ (§25a UStG,  │  │ Ads · Meta Pixel│  │ Suchaufträge ·      │
              │ DATEV-Export)│  │ + CAPI · Klaviyo│  │ High-Ticket-Deals   │
              └──────────────┘  └─────────────────┘  └─────────────────────┘
```

### 4.3 Komponenten im Detail

| Komponente | Lösung | Anmerkung |
|---|---|---|
| Storefront | Next.js 16 auf Vercel (bestehend) | Erweiterung um Cart, echte Bilder, Formular-Backends |
| Commerce-Backend | Shopify (Plan „Grow/Shopify", nicht Basic) | Bessere Reports, geringere Payment-Gebühren; Advanced erst bei Bedarf |
| Checkout | Shopify Checkout via `cart.checkoutUrl` | Kein Eigenbau; Apple/Google Pay, Klarna etc. inklusive |
| Warenkorb | Storefront API Cart (serverseitig via Route Handler) | API-Version auf aktuelle Version anheben |
| Bilder/Medien | Shopify CDN (Produktbilder aus Shopify laden statt Platzhalter) | `next/image` mit Shopify-Domain in `next.config.ts` freigeben |
| CRM | HubSpot (bereits im Einsatz beim Betreiber) | Pipelines „Ankauf" und „Suchauftrag/High-Ticket" |
| E-Mail-Marketing | Klaviyo (Shopify-nativ) | Alternativ Brevo, wenn Kostenfokus |
| Buchhaltung | easybill oder Billbee + Lexware Office/sevDesk | Muss §25a Differenzbesteuerung unterstützen (siehe Kap. 7) |
| Consent | Cookie-Consent-Plattform (z. B. Usercentrics/Cookiebot) | Consent Mode v2 zwingend für Google Ads |

---

## 5. Storefront: Funktionsumfang des Shops

### 5.1 Ausbau bestehender Seiten

- **Startseite**: bleibt; ergänzt um „Neuzugänge"-Sektion (Sortierung nach `createdAt`), Trust-Leiste (Echtheitsgarantie, versicherter Versand, Bewertungen), Newsletter-/Suchauftrags-CTA.
- **/uhren (Katalog)**: funktionierende Filter (Marke, Preisspanne, Material, Zustand, Verfügbarkeit) und Sortierung; Filterzustand in der URL (SEO + Ads-Landingpages wie `/uhren?marke=rolex`); „Verkauft"-Uhren bleiben sichtbar als Referenz (SEO + Vertrauen), klar gekennzeichnet.
- **/uhren/[handle] (Detail)**: Bildergalerie aus Shopify (mehrere Bilder, Zoom), vollständige Spezifikationen, Lieferumfang (Box/Papiere – neues Metafeld `scope_of_delivery`), Zustandsbeschreibung, CTA je `sales_mode` (In den Warenkorb / Anfrage senden / Termin buchen), WhatsApp-Button, „Ähnliche Uhren".
- **/ankauf**: wird zur Lead-Maschine (siehe 5.3).
- **/kontakt**: Formular mit echtem Versand (Resend o. ä.) + HubSpot-Kontaktanlage; optional Terminbuchung (HubSpot Meetings/Calendly).

### 5.2 Neue Funktionen

| Funktion | Beschreibung |
|---|---|
| **Warenkorb & Checkout** | Cart über Storefront API, Übergabe an Shopify Checkout. Bei Unikaten: Menge fix 1, Verfügbarkeitsprüfung beim Checkout-Start (Race-Condition „zwei Käufer, eine Uhr" wird durch Shopify-Inventar gelöst). |
| **Reservierung mit Anzahlung** | Für Hochpreis-Uhren: Draft Order in Shopify mit Anzahlungsposition (z. B. 10 %), Versand des Zahlungslinks per E-Mail; Uhr wird auf `reserved` gesetzt. |
| **Suchauftrag („Wunschuhr")** | Formular: Marke, Modell/Referenz, Budget, Zeitrahmen, Kontakt. Landet als Deal in HubSpot-Pipeline; Kunde erhält Bestätigung + Neuzugangs-Abo. |
| **Neuzugangs-Benachrichtigung** | Newsletter-Segment „Neuzugänge" (Klaviyo-Flow bei neuem Produkt); für Sammler wichtigstes Bindungsinstrument, da Unikate schnell weg sind. |
| **Verkäufe-Archiv** | `/uhren/verkauft` als Referenzliste (zeigt Marktpräsenz, stützt SEO und Preisvertrauen). |
| **Bewertungen** | Google-Bewertungen (und/oder Trusted Shops) eingebunden auf Start- und Detailseiten. |

### 5.3 Ankaufsstrecke (Lead-Funnel)

Mehrstufiges Formular auf `/ankauf` (geringe Einstiegshürde, steigende Verbindlichkeit):

1. **Schritt 1**: Marke + Modell (Auswahl), Zustand (grob), Lieferumfang (Uhr solo / mit Box / mit Papieren / Fullset)
2. **Schritt 2**: Foto-Upload (2–5 Bilder, mobilfreundlich)
3. **Schritt 3**: Kontaktdaten + gewünschter Kanal (E-Mail/Telefon/WhatsApp)
4. **Ergebnis**: Lead in HubSpot-Pipeline „Ankauf" (Stufe „Neu"), automatische Eingangsbestätigung mit Zeitzusage („Bewertung innerhalb von 24 h")

Dieselbe Strecke dient als Ziel für Instagram Lead Ads und Google-Ads-Ankaufskampagnen (Kap. 10/11).

### 5.4 Technische Aufgaben am Frontend (aus dem Ist-Stand abgeleitet)

- Echte Produktbilder aus Shopify laden (Platzhalter-Hardcoding in `lib/shopify.ts` entfernen, `images`-Feld in GraphQL-Query aufnehmen)
- Storefront-API-Version aktualisieren (aktuell `2024-01`)
- Cart-Mutationen (cartCreate, cartLinesAdd) + Checkout-Weiterleitung
- Formular-Backends als Next.js Route Handler (Spam-Schutz: Turnstile/hCaptcha)
- SEO: Metadata je Uhr (Marke/Modell/Referenz im Title), `Product`-Schema.org mit Preis/Verfügbarkeit, Sitemap, saubere 404/410-Behandlung verkaufter Uhren (oder Archiv-Weiterleitung)
- Performance-Budget halten (Hero-Video lazy/poster, Core Web Vitals als Ads-Qualitätsfaktor)

---

## 6. Verwaltungsebene (Backoffice)

**Grundsatz: Kein Eigenbau, wo Shopify es kann.** Der Shopify Admin (Web + Mobile App) ist das tägliche Arbeitswerkzeug für Produkte, Bestellungen, Kunden und Rabatte. Eigenentwicklung nur dort, wo der Uhrenhandel Spezifika hat.

### 6.1 Produktverwaltung für Unikate

Jede Uhr = ein Produkt mit Menge 1 („Inventar nachverfolgen" aktiv, Überverkauf deaktiviert). Die bestehende Metafeld-Struktur wird erweitert:

**Öffentliche Metafelder (Storefront, bestehend + neu):**

| Feld | Typ | Status |
|---|---|---|
| `custom.brand`, `model`, `reference`, `year`, `case_size_mm`, `material`, `movement`, `condition` | Text | bestehend |
| `custom.availability_status` (available/reserved/sold) | Text | bestehend |
| `custom.show_price` | Boolean | bestehend |
| `custom.sales_mode` (checkout / inquiry / auf_anfrage) | Auswahl | **neu** |
| `custom.scope_of_delivery` (Fullset, nur Box, nur Papiere, solo) | Auswahl | **neu** |
| `custom.warranty_until` / `custom.service_date` | Datum | **neu** |

**Interne Metafelder (nicht in Storefront-Query, nur Admin):**

| Feld | Zweck |
|---|---|
| `internal.purchase_price` | Einkaufspreis → Margenkalkulation, Pflichtangabe für §25a-Aufzeichnungen |
| `internal.purchase_date` / `internal.supplier` | Ankaufsdatum, Einlieferer/Quelle (Privat, Händler, Kommission) |
| `internal.serial_number` | Seriennummer (nie öffentlich – Fälschungs-/Betrugsschutz) |
| `internal.commission` + `internal.commission_rate` | Kommissionsware ja/nein, Provisionssatz |
| `internal.location` | Lagerort (Safe/Vitrine/Schaufenster/beim Uhrmacher) |
| `internal.workflow_status` | Pipeline-Status (siehe 6.2) |

### 6.2 Waren-Workflow

Jede Uhr durchläuft eine feste Pipeline, abgebildet als `internal.workflow_status` (plus Shopify-Tags für schnelle Filterung):

```
Angekauft → Echtheitsprüfung → Aufbereitung/Service → Fotografie → Online (aktiv)
→ Reserviert → Verkauft → Versendet/Übergeben → Archiviert
```

Regeln:
- Erst mit Status „Online" wird das Produkt im Sales Channel aktiv.
- „Reserviert"/„Verkauft" synchronisiert `availability_status` (Storefront-Badge) – einfacher Shopify Flow (Automatisierung) hält Tag, Metafeld und Inventar konsistent.
- Standtage werden ab „Online" gemessen (Basis für Repricing: z. B. Preisprüfung nach 60/90 Tagen).

### 6.3 Rollen & Rechte

| Rolle | Rechte |
|---|---|
| Inhaber | Vollzugriff inkl. Finanzen, Auszahlungen, Apps |
| Verkauf/Backoffice | Produkte, Bestellungen, Kunden, Draft Orders; **kein** Zugriff auf Zahlungseinstellungen/Berichte mit Einkaufspreisen |
| Fotografie/Content extern | nur Produkte (Entwürfe) |
| Steuerberater | Lesezugriff Berichte bzw. Zugang über Buchhaltungs-Tool statt Shopify |

Zwei-Faktor-Authentifizierung für alle Staff-Accounts verpflichtend (Warenwerte!).

### 6.4 Ankauf- und Suchauftragsverwaltung (CRM)

Ankauf und Suchaufträge sind Vertriebsprozesse, keine Shop-Prozesse → **HubSpot**:

- **Pipeline „Ankauf"**: Neu → Bewertung erstellt → Angebot gesendet → Verhandlung → Angenommen (→ Uhr geht in Waren-Workflow) → Abgelehnt/Verloren. Automatisierungen: Eingangsbestätigung, Erinnerung nach 3 Tagen ohne Antwort, Absage-Nurturing („Preis-Alert, falls Sie es sich anders überlegen").
- **Pipeline „Suchauftrag/High-Ticket"**: Neu → Qualifiziert (Budget bestätigt) → Suche läuft → Angebot → Reserviert/Anzahlung → Abgeschlossen.
- Shopify-Kunden ↔ HubSpot-Kontakte synchronisieren (native HubSpot-Shopify-Integration), damit Käufer- und Verkäuferhistorie an einem Ort liegt.

### 6.5 Eigenes Admin-Dashboard (Phase 3, optional)

Erst wenn Shopify-Reports nicht mehr reichen: geschützter Bereich `/admin` im Next.js-Projekt (Auth z. B. über Vercel/NextAuth, Zugriff nur Inhaber) mit Admin-API-Auswertungen:

- Lagerwert zu Einkaufspreisen vs. Verkaufspreisen (gebundenes Kapital)
- Marge je Uhr / je Marke, Standtage-Verteilung, Repricing-Kandidaten
- Ankaufs-Funnel-Kennzahlen (Leads → Angebote → Ankäufe, Ø-Ankaufsmarge)

> Bis dahin: Shopify-Berichte + ein einfaches Google-Sheet/Looker-Studio auf Basis von Exporten genügt und kostet keine Entwicklungszeit.

---

## 7. Abrechnung, Zahlungsarten & Buchhaltung

### 7.1 Zahlungsarten

Bei Warenwerten von 500 € bis 50.000 € ist die Gebührenstruktur geschäftskritisch – eine 2 %-Kartengebühr auf eine 20.000-€-Uhr sind 400 €.

| Zahlart | Einsatz | Anmerkung |
|---|---|---|
| **Shopify Payments** (Karten, Apple Pay, Google Pay) | Standard bis mittleres Preissegment | Gebühr je nach Plan ca. 1,5–2 % + Fixbetrag (Richtwert, planabhängig) |
| **Klarna** (Rechnung/Raten) | Einsteigersegment | Limits beachten (Ratenkauf typ. bis niedriger vierstelliger Bereich); erhöht Conversion spürbar |
| **Banküberweisung / Vorkasse** | Ab ca. 3.000 € aktiv anbieten, ab 10.000 € bevorzugt | Als manuelle Zahlungsmethode in Shopify; keine Gebühren; Bestellung bleibt „ausstehend" bis Zahlungseingang |
| **Anzahlung + Restzahlung** | Reservierungen, Suchaufträge | Draft Order mit Anzahlungsposition; Rest per Überweisung |
| **Barzahlung bei Übergabe** | Showroom/Abholung | GwG-Pflichten beachten (Kap. 8) |
| Optional: **Escrow/Treuhand** | Sehr hohe Beträge, Fernabsatz an Neukunden | Vertrauensanker; Anbieter im Uhrenumfeld prüfen |

Betrugsprävention: Shopify Fraud-Analyse ernst nehmen; bei Kartenzahlung über definierter Schwelle (z. B. 5.000 €) nur mit zusätzlicher Verifikation versenden (Abgleich Rechnungs-/Lieferadresse, ggf. Identitätsnachweis); niemals an Packstationen im Hochpreissegment.

### 7.2 Differenzbesteuerung nach §25a UStG – das steuerliche Kernthema

Beim gewerblichen Ankauf von Privatpersonen (kein Vorsteuerabzug möglich) wird beim Wiederverkauf nur die **Marge** umsatzbesteuert, nicht der Verkaufspreis:

- Rechnungen differenzbesteuerter Uhren dürfen **keine Umsatzsteuer ausweisen** und müssen den Hinweis „Gebrauchtgegenstände/Sonderregelung" tragen.
- Es besteht eine **Aufzeichnungspflicht je Artikel**: Einkaufspreis, Verkaufspreis, Bemessungsgrundlage (Differenz). Das interne Metafeld `internal.purchase_price` (Kap. 6.1) liefert die Datenbasis.
- Neuware oder von Händlern mit USt-Ausweis angekaufte Ware läuft parallel in der **Regelbesteuerung** → das System muss beide Fälle je Produkt unterscheiden können (Metafeld `internal.tax_scheme`: margin / regular).

**Konsequenz für die Tool-Wahl:** Shopify allein bildet §25a nicht ab. Die Rechnungsstellung übernimmt ein an Shopify angebundenes deutsches Tool, das Differenzbesteuerung beherrscht (Kandidaten: **easybill**, **Billbee**; finale Auswahl mit dem Steuerberater). Shopify wird so konfiguriert, dass es selbst keine Steuer-Rechnung erzeugt, sondern nur die Bestellbestätigung.

### 7.3 Rechnungs- und Buchhaltungsprozess (Soll-Ablauf)

```
Bestellung (Shopify) ──▶ Rechnungstool (easybill/Billbee)
                          │  automatische Rechnung: §25a ohne USt-Ausweis
                          │  oder Regelbesteuerung – je nach Produkt-Kennzeichen
                          ├──▶ Versand der Rechnung an Kunden (automatisch)
                          ├──▶ Zahlungsabgleich (Shopify-Payments-Auszahlungen,
                          │    Banküberweisungen via Bank-Anbindung)
                          └──▶ DATEV-Export an Steuerberater (monatlich)
```

Ergänzend:
- **Ankaufsbelege**: Beim Ankauf von Privat erstellt BOZIC den Beleg (Ankaufvertrag/Gutschrift) mit Identität des Verkäufers, Uhrendaten inkl. Seriennummer, Preis – Pflichtbestandteil des §25a-Wareneingangsbuchs und der GwG-Dokumentation. Als Vorlage im Rechnungstool oder als PDF-Template mit Ablage je Uhr.
- **Kommissionsabrechnung**: Bei Kommissionsverkauf Gutschrift an den Einlieferer (Verkaufspreis − Provision) mit sauberem Beleg.
- **GoBD**: Alle Belege unveränderbar archiviert (Rechnungstool + revisionssichere Ablage); Verfahrensdokumentation kurz festhalten.
- **Auslandsverkäufe**: EU-B2C ggf. OSS-Verfahren (Achtung: Differenzbesteuerung und OSS schließen sich aus – differenzbesteuerte Ware bleibt im Ursprungsland steuerbar), Export in Drittländer steuerfrei mit Ausfuhrnachweis. Details mit Steuerberater festlegen, bevor internationale Märkte in Shopify aktiviert werden.

### 7.4 Zahlungsausfall & Storno

- Bestellungen mit Vorkasse verfallen automatisch nach X Tagen ohne Zahlungseingang (Shopify Flow) → Uhr wieder „available".
- Widerruf (14 Tage im Fernabsatz, siehe Kap. 8): Prozess für Rückversand (versichert, Wertgrenze), Prüfung bei Rückkunft (Seriennummer!), Erstattung über Originalzahlweg, Stornorechnung automatisch.

---

## 8. Recht & Compliance

Punkte, die vor Go-Live des Checkouts zwingend stehen müssen (Umsetzung mit Anwalt/Steuerberater, hier als Anforderungsliste):

| Thema | Anforderung |
|---|---|
| **Rechtstexte** | Impressum, Datenschutzerklärung, AGB (inkl. Reservierung/Anzahlung, Kommission), Widerrufsbelehrung + Muster-Widerrufsformular, Versand-/Zahlungsbedingungen. Anbieter wie IT-Recht-Kanzlei/Händlerbund liefern gepflegte Texte inkl. Update-Service. |
| **Widerrufsrecht** | B2C-Fernabsatz: 14 Tage – gilt auch für teure Uhren; kein Ausschluss als „versiegelte Ware". Prozess und Kalkulation müssen Retouren einpreisen. |
| **Button-Lösung & Preisangaben** | „Zahlungspflichtig bestellen", Gesamtpreise inkl. USt-Hinweis (bei §25a: „inkl. Sonderregelung, keine USt ausweisbar" – Formulierung mit Anwalt), Versandkosten transparent. |
| **DSGVO** | AV-Verträge (Shopify, Vercel, HubSpot, Klaviyo, Meta/Google als gemeinsame Verantwortlichkeit), Datenschutzerklärung deckt Tracking/Ads ab, Löschkonzept, ggf. Verarbeitungsverzeichnis. |
| **Cookie-Consent** | Einwilligung vor jedem Marketing-Tracking (TTDSG/TDDDG); Consent Mode v2 (Kap. 9). |
| **Geldwäschegesetz (GwG)** | Als Güterhändler gelten Sorgfaltspflichten insb. bei **Barzahlungen ab 10.000 €** (Identifizierung, Aufzeichnung, ggf. Verdachtsmeldung). Interne Regel: Barannahme nur mit Ausweiskopie + dokumentiertem Prozess, oder Barzahlungen über Schwelle generell ausschließen. |
| **Echtheit & Gewährleistung** | Gewährleistung B2C 1 Jahr verkürzbar bei Gebrauchtware (AGB), Echtheitsgarantie als USP dokumentieren (Prüfprotokoll je Uhr), Umgang mit Herstellergarantie transparent. |
| **Markenrecht in Ads** | Markennamen (Rolex etc.) beschreibend nutzen ist zulässig, aber keine Logos in Anzeigen, keine Irreführung über Vertragshändlerstatus („unabhängiger Händler, kein autorisierter Rolex-Händler" im Footer/FAQ). |

---

## 9. Tracking & Analytics (GA4, GTM, Consent)

### 9.1 Setup

| Baustein | Umsetzung |
|---|---|
| **Google Tag Manager** | Ein Web-Container im Next.js-Frontend; alle Marketing-Tags laufen über GTM, nichts hartkodiert. |
| **GA4** | Property „bozic-watches"; E-Commerce-Events (siehe 9.2); Cross-Domain-Messung zwischen Shop-Domain und Shopify-Checkout-Domain konfigurieren (Referral-Ausschluss + verlinkte Domains), sonst zerreißen Sessions am Checkout. |
| **Shopify-Seite** | Checkout- und Purchase-Events über Shopify **Customer Events (Web Pixel)** bzw. die „Google & YouTube"-App erfassen – `checkout.liquid`-Zeiten sind vorbei; Custom Pixel im Shopify-Backend pusht `begin_checkout`/`purchase` in den DataLayer/GA4. |
| **Consent Mode v2** | Pflicht für Google-Ads-Personalisierung in der EU. Cookie-Banner (Usercentrics/Cookiebot o. ä.) setzt `ad_storage`, `ad_user_data`, `ad_personalization`, `analytics_storage`; GTM-Tags feuern consent-abhängig. Gilt für Frontend **und** Shopify-Checkout (Shopify Customer Privacy API mit CMP verbinden). |
| **Server-side Tagging** | Phase 3 (optional): GTM-Server-Container für bessere Datenqualität; zum Start nicht nötig. |

### 9.2 Event-Modell (GA4 Enhanced E-Commerce)

| Event | Auslöser | Besonderheit Uhrenhandel |
|---|---|---|
| `view_item_list` | Katalog `/uhren` (inkl. Filter als `item_list_name`) | Marken-Filter als Listenname → zeigt Nachfrage je Marke |
| `view_item` | Uhrendetailseite | `item_brand`, `item_category` (Marke/Modell), Preis auch bei „auf Anfrage" als internes Feld |
| `add_to_cart` / `begin_checkout` / `purchase` | Standard-Funnel | `purchase` mit echtem Umsatz → Basis für ROAS |
| `generate_lead` | Ankaufsformular, Suchauftrag, Kontaktformular, Terminbuchung | mit Parameter `lead_type` (ankauf / suchauftrag / beratung) – **wichtigste Conversions neben purchase** |
| `select_content` (whatsapp_click, phone_click) | Klick auf WhatsApp/Telefon | Mikro-Conversions für Hochpreissegment |

Leads bekommen **Conversion-Werte** zugewiesen (z. B. Ankauf-Lead 50 €, Suchauftrag 100 €, Beratungstermin 150 € – kalibrieren nach realen Abschlussquoten), damit Google/Meta auch auf Lead-Wert statt nur Kauf optimieren können.

### 9.3 Auswertung

- GA4-Standardberichte + ein Looker-Studio-Dashboard (Kap. 13) für den Wochenblick.
- UTM-Konvention festlegen (source/medium/campaign einheitlich, z. B. `meta / paid_social / ankauf_leads_q4`).

---

## 10. Google Ads

### 10.1 Konto- und Kampagnenstruktur

| Kampagne | Typ | Inhalt & Ziel |
|---|---|---|
| **Brand** | Search | „bozic watches" & Varianten – günstig, schützt Markensuche |
| **Verkauf – Modelle** | Search | Keyword-Cluster je Marke/Modell: „rolex submariner kaufen", „omega speedmaster gebraucht", „[Referenznummer]" – Referenznummern-Suchen sind kaufnah und günstig; Landingpage = gefilterter Katalog oder Detailseite |
| **Verkauf – Shopping/PMax** | Performance Max mit Feed | Produktfeed über Shopify „Google & YouTube"-App ins Merchant Center (Zustand „gebraucht" korrekt ausweisen, eindeutige Bilder, GTIN-Befreiung für Unikate beantragen falls nötig); Ziel-ROAS-Steuerung sobald genug Kaufdaten |
| **Ankauf** | Search | „rolex verkaufen", „uhr verkaufen preis", „uhrenankauf [Stadt]" – hoher Lead-Wert, eigenes Budget; Landingpage `/ankauf` |
| **Remarketing** | Demand Gen / Display | Besucher von Detailseiten ohne Conversion; Frequency Cap; dezente Markenwerbung statt Rabattdruck (Luxuspositionierung) |

### 10.2 Conversion-Setup

- Conversions: `purchase` (Wert = Umsatz), `generate_lead` je Typ (statische Werte, s. o.), Anruf-Conversions.
- Import aus GA4 **oder** Google-Ads-Tag direkt – einheitlich entscheiden (Empfehlung: Google-Ads-Tag für purchase/leads wegen besserer Attributionsdaten, GA4 als Zweitmessung).
- **Erweiterte Conversions** (gehashte E-Mail) aktivieren – kompensiert Cookie-Verluste.

### 10.3 Budget-Empfehlung (Start, Richtwerte)

| Kampagne | Monatsbudget Start |
|---|---|
| Brand | 150 € |
| Verkauf Modelle (Search) | 900 € |
| PMax/Shopping | 600 € |
| Ankauf (Search) | 750 € |
| Remarketing | 300 € |
| **Summe** | **~2.700 €/Monat** – nach 8–12 Wochen anhand CPL/ROAS umschichten |

Erwartungswerte kalibrieren: Im Luxussegment sind Klickpreise für Modell-Keywords moderat, aber Conversion-Zyklen lang (Erstbesuch → Kauf oft Wochen). Attribution deshalb nicht nur Last-Click bewerten.

---

## 11. Instagram / Meta: Ads & Lead-Generierung

Instagram ist für Uhren **der** visuelle Kanal – organisch für Marke und Vertrauen, paid für Reichweite, Retargeting und vor allem **Lead-Generierung** (Ankauf + Suchaufträge).

### 11.1 Technisches Setup

1. Meta Business Manager + Instagram-Business-Profil, Domain verifizieren
2. **Meta Pixel + Conversions API** über die offizielle „Facebook & Instagram"-Shopify-App (serverseitige Events aus dem Checkout inklusive) + Pixel im Next.js-Frontend via GTM (consent-abhängig)
3. **Produktkatalog** aus Shopify synchronisieren → Basis für dynamische Anzeigen und Instagram-Shopping-Tags
4. Custom Audiences: Websitebesucher (180 Tage), Detailseiten-Viewer, Kundenliste (gehasht), Engagement-Audience (Profilinteraktionen); Lookalikes auf Käufer- und Ankauf-Lead-Listen

### 11.2 Organische Basis (Voraussetzung, damit Ads wirken)

- 3–5 Posts/Reels pro Woche: Neuzugänge (Kurzvideo am Handgelenk), „Sold"-Posts (Begehrlichkeit), Behind-the-Scenes (Echtheitsprüfung, Aufbereitung – zahlt direkt aufs Vertrauen für den Ankauf ein), Uhrenwissen (Referenz-Guides)
- Stories täglich, Highlights: Ankauf, Aktuelle Uhren, Bewertungen, FAQ
- Konsistentes visuelles Raster im bestehenden Marken-Look (Cream/Gold, Serifen)

### 11.3 Kampagnenarchitektur

| Kampagne | Ziel | Format | Zielgruppe |
|---|---|---|---|
| **Ankauf-Leads** | Leads | **Instant Forms** (Lead Ads): „Uhr verkaufen? Kostenlose Bewertung in 24 h" – Formular: Marke (Auswahl), Modell, Zustand, Kontakt | Interessen Luxusuhren/Rolex/Chrono24 + Lookalike Ankauf-Leads, 30–65, DACH bzw. Region |
| **Suchauftrag** | Leads | Instant Form „Wir finden Ihre Wunschuhr": Wunschmodell, Budgetrahmen, Kontakt | Sammler-Interessen, Engagement-Audience, Lookalike Käufer |
| **Katalog-Retargeting** | Verkäufe | Dynamic Product Ads (angesehene Uhren + „Neu eingetroffen") | Websitebesucher/Detailseiten-Viewer |
| **Neuzugänge/Brand** | Reichweite/Traffic | Reels-Ads mit neuen Uhren | Breite Luxus-/Uhren-Interessen, Geo-Fokus |

**Lead-Handling entscheidet über den Erfolg:** Instant-Form-Leads via nativer **Meta-HubSpot-Integration** (oder Make/Zapier) in Echtzeit in die Ankauf-Pipeline; automatische Bestätigung sofort, persönlicher Kontakt **innerhalb von 24 h** (Reaktionszeit ist der stärkste Hebel auf die Abschlussquote). Follow-up-Sequenz für nicht erreichte Leads (Tag 1 WhatsApp/E-Mail, Tag 3 Anruf, Tag 7 letzte E-Mail).

### 11.4 Budget-Empfehlung (Start, Richtwerte)

| Kampagne | Monatsbudget Start |
|---|---|
| Ankauf-Leads | 750 € |
| Suchauftrag | 300 € |
| Katalog-Retargeting | 300 € |
| Neuzugänge/Brand | 450 € |
| **Summe** | **~1.800 €/Monat**; Ziel-CPL Ankauf zunächst 15–40 € annehmen, dann an realer Ankaufsquote messen |

---

## 12. Weitere Kanäle: SEO, E-Mail, WhatsApp, Chrono24

- **SEO**: Modell-/Referenzseiten sind Longtail-Gold („Rolex 126610LN gebraucht kaufen"). Verkaufte Uhren im Archiv halten Content am Leben. Ergänzend Ratgeber-Content (Ankauf-Guides, Modellvergleiche) – füttert zugleich Social und E-Mail.
- **E-Mail (Klaviyo)**: Flows – Willkommen (Suchauftrags-CTA), Neuzugänge (Segment nach Markeninteresse aus Browsing-Daten), Warenkorb-/Browse-Abandonment (dezent formuliert), Nachkauf-Strecke (Pflegehinweise, Ankaufsangebot nach 12–24 Monaten: „Zeit für die nächste?").
- **WhatsApp Business**: Im Luxussegment oft der bevorzugte Kanal. Button auf jeder Detailseite; Nummer im Impressum/Google Business Profile; Broadcast-Liste „Neuzugänge" für Top-Kunden (nur mit Opt-in).
- **Google Business Profile**: Pflicht bei lokalem Showroom/Abholung; Bewertungen aktiv einsammeln (nach Kauf per E-Mail-Flow).
- **Chrono24** (Abwägung): Größter Uhren-Marktplatz, sinnvoll als zusätzlicher Absatzkanal für Standware (Provision einkalkulieren, Preisparität beachten). Bestandssync in Phase 3 (manuell starten, bei Volumen automatisieren). Strategisch bleibt das Ziel, Käufer in eigene Kanäle (Newsletter, WhatsApp) zu überführen.

---

## 13. KPIs & Reporting

**Wöchentliches Dashboard (Looker Studio auf GA4 + Ads + Meta; Handel-KPIs zunächst aus Shopify-Reports):**

| Bereich | KPI | Zielrichtung (Start) |
|---|---|---|
| Handel | Umsatz, Bruttomarge je Uhr, Ø-Marge % | Marge > 15 % halten |
| Lager | Lagerwert (EK), Standtage Ø, Uhren > 90 Tage | Kapitalbindung sichtbar machen, Repricing-Trigger |
| Shop | Conversion-Rate Checkout-Segment, AOV | CR 0,5–1,5 % realistisch im Uhrensegment |
| Leads | CPL Ankauf, CPL Suchauftrag, Lead→Ankauf-Quote, Reaktionszeit | Quote > 10 %, Reaktion < 24 h |
| Google Ads | ROAS (Verkauf), CPL (Ankauf), Anteil Brand vs. Non-Brand | ROAS-Ziel nach 3 Monaten Datenlage setzen |
| Meta | CPL, Retargeting-ROAS, Frequenz | Frequenz < 4/Woche |
| E-Mail | Listenwachstum, Umsatz je Empfänger, Öffnungsrate Neuzugänge | Neuzugangs-Mail als Top-Umsatzmail etablieren |

Monatlich zusätzlich: Kanal-Deckungsbeitrag (Umsatz − Wareneinsatz − Werbekosten je Kanal) – die einzige Zahl, die am Ende zählt.

---

## 14. Roadmap & Phasenplan

### Phase 1 – Verkaufsfähiger Shop (Wochen 1–6)

**Ziel: Erste Uhr online verkauft, rechtssicher und sauber abgerechnet.**

- [ ] Shopify-Store einrichten (Plan, Domains, Staff-Accounts + 2FA, Steuereinstellungen)
- [ ] Metafeld-Schema erweitern (öffentlich + intern, inkl. `sales_mode`, `tax_scheme`, `purchase_price`)
- [ ] Reale Produktfotos (Standard-Setup definieren: Frontal, 3/4, Wristshot, Detail, Lieferumfang)
- [ ] Frontend: echte Shopify-Bilder, Cart + Checkout-Übergabe, Detailseiten-CTAs je `sales_mode`, API-Version-Update
- [ ] Formular-Backends (Kontakt, Ankauf mit Foto-Upload) + HubSpot-Anbindung
- [ ] Zahlungsarten: Shopify Payments, Klarna, Banküberweisung (manuell)
- [ ] Rechnungstool (easybill/Billbee) mit §25a-Setup, Ankaufsbeleg-Vorlage, DATEV-Export – **mit Steuerberater abnehmen**
- [ ] Rechtstexte, Cookie-Consent mit Consent Mode v2, Datenschutz
- [ ] GA4 + GTM Basis-Setup inkl. Checkout-Events (Customer Events Pixel)
- [ ] Versandprozess: versicherter Versand definieren (Wertgrenzen, Anbieter/Wertlogistik, Verpackung, Übergabeprotokoll)

### Phase 2 – Marketing-Maschine (Wochen 7–10)

**Ziel: Planbarer Zufluss an Käufern und Ankauf-Leads.**

- [ ] Merchant Center + Google-&-YouTube-App, Feed-Qualität (Zustand, Bilder, Titel „Marke Modell Referenz Jahr")
- [ ] Google-Ads-Konto: Brand, Modelle, Ankauf, PMax, Remarketing; Conversion-Setup + erweiterte Conversions
- [ ] Meta: Pixel + CAPI, Katalog, Custom Audiences; Kampagnen Ankauf-Leads, Suchauftrag, Retargeting
- [ ] Lead-Automation: Meta-Leads → HubSpot → Bestätigung + Follow-up-Sequenz (24-h-SLA)
- [ ] Klaviyo: Willkommens-Flow, Neuzugänge-Flow, Abandonment
- [ ] Suchauftrags-Funktion im Frontend + Verkäufe-Archiv
- [ ] Looker-Studio-Dashboard (Kap. 13)

### Phase 3 – Ausbau (ab Woche 11, nach Bedarf priorisieren)

- [ ] Reservierung mit Online-Anzahlung (Draft-Order-Flow automatisiert)
- [ ] Eigenes Admin-Dashboard `/admin` (Lagerwert, Margen, Standtage, Repricing-Liste)
- [ ] Chrono24-Anbindung (Bestandssync)
- [ ] Server-side Tagging, Mehrsprachigkeit (EN), internationale Märkte (steuerlich geklärt)
- [ ] WhatsApp-Broadcast „Neuzugänge", Bewertungs-Automation
- [ ] Content-/SEO-Ausbau (Referenz-Guides, Ankaufs-Ratgeber)

---

## 15. Laufende Kosten (Richtwerte)

Richtwerte netto/Monat, Stand der Preismodelle bitte bei Beauftragung aktuell prüfen:

| Position | ca. Kosten/Monat |
|---|---|
| Shopify-Plan (Grow/„Shopify") | 80–110 € |
| Vercel (Pro) | ~20 € |
| Rechnungstool (easybill/Billbee) | 20–60 € |
| Buchhaltung (Lexware Office/sevDesk, falls zusätzlich) | 10–30 € |
| Cookie-Consent-Plattform | 10–60 € |
| Klaviyo (bis ~1.000 Kontakte) | 0–45 € |
| HubSpot (Starter-Umfang) | 20–50 € |
| Sonstige Apps (Flow-Erweiterungen, Bewertungen, Foto-Upload) | 20–50 € |
| **Fixkosten gesamt** | **~180–420 €** |
| Werbebudget Google Ads (Start) | ~2.700 € |
| Werbebudget Meta/Instagram (Start) | ~1.800 € |
| **Gesamt inkl. Ads (Startphase)** | **~4.700–4.900 €** |

Dazu einmalig: Entwicklung Phase 1+2 (Frontend-Ausbau, Integrationen, Setup), Fotografie-Equipment/Dienstleister, Rechtstexte-Paket, Steuerberatungs-Setup.

---

## 16. Offene Entscheidungen

Vor Umsetzungsstart zu klären (Vorschlag jeweils fett):

1. **Preistransparenz**: Alle Preise öffentlich vs. Hochpreissegment „auf Anfrage"? → **Empfehlung: Preise grundsätzlich zeigen** (Conversion + Google Shopping erfordert Preise), „auf Anfrage" nur für Ausnahmestücke.
2. **Bar-/Abholgeschäft**: Showroom-Übergabe anbieten? Falls ja: GwG-Prozess und Terminlogik definieren; Barzahlung ≥ 10.000 € zulassen oder ausschließen? → **Empfehlung: Abholung ja, Barzahlung über GwG-Schwelle ausschließen.**
3. **Steuer-Setup**: easybill vs. Billbee, OSS-Frage, Formulierungen §25a auf Rechnung/Shop → **Termin mit Steuerberater in Woche 1.**
4. **Versandpartner Hochpreis**: Standard-Versender mit Höherversicherung vs. Wertlogistik ab welcher Grenze? → mit Versicherungsangeboten klären.
5. **Kommissionsgeschäft** von Anfang an oder ab Phase 3? → **Empfehlung: Verträge vorbereiten, aktiv bewerben erst Phase 3.**
6. **Internationalisierung**: Start DACH-only? → **Empfehlung: DE/AT zum Start**, Erweiterung nach Steuerklärung.
7. **Chrono24**: Parallelvertrieb ja/nein und mit welcher Preisstrategie?
8. **Budgetfreigabe** Ads-Startbudgets (Kap. 10.3 / 11.4) und Fotografie.

---

*Dieses Konzept ist die Arbeitsgrundlage für die Umsetzung. Nächster Schritt: Entscheidungen aus Kap. 16 treffen, dann Phase 1 als Umsetzungs-Backlog detaillieren.*
