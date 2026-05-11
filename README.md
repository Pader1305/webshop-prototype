# 🏀 Basekorb Frontend

Ein modernes Nuxt-3-Frontend fuer den **Basekorb**: anmelden, Produkte entdecken, Angebote ansehen, Warenkorb fuellen und Einkaeufe ueber ein angebundenes Backend abschliessen.

Das Projekt verbindet eine klare Shop-Oberflaeche mit persistiertem Login- und Warenkorb-State, mehrsprachiger UI und serverseitigen API-Proxies. Kurz gesagt: ein kleiner, runder E-Commerce-Flow fuer das Academy-Modul.

## ✨ Highlights

- **Geschuetzter Shopbereich** mit Login, Registrierung und Route-Middleware
- **Produktuebersicht mit Pagination**, Detailansicht und Angebotsbereich
- **Persistenter Warenkorb** inklusive Mengensteuerung, Entfernen, Leeren und Gesamtsumme
- **Backend-Anbindung ueber Nuxt Server Routes** fuer Produkte, Angebote und Kaufabschluss
- **Mehrsprachigkeit** mit deutscher und englischer Lokalisierung ueber `@nuxtjs/i18n`
- **Formularvalidierung** mit `vee-validate` und `yup`
- **End-to-End-Tests** fuer zentrale Warenkorb-Szenarien mit Playwright

## 🧰 Tech Stack

- **Nuxt 3** und **Vue 3** als App-Framework
- **TypeScript** fuer robuste Typisierung
- **Pinia** mit `pinia-plugin-persistedstate` fuer Auth- und Cart-State
- **Tailwind CSS 4** fuer Styling
- **Swiper** fuer interaktive Produkt-/Angebotsdarstellungen
- **ESLint** und **Prettier** fuer Code-Qualitaet
- **Playwright** fuer Browser-Tests

## 🗂️ Projektstruktur

```text
.
|-- assets/              # Globale Styles und SVG-Icons
|-- components/          # Wiederverwendbare UI-Komponenten
|-- composables/         # Nuxt/Vue Composables
|-- i18n/locales/        # Uebersetzungen fuer de und en
|-- middleware/          # Guest- und Auth-Route-Guards
|-- pages/               # Nuxt-Seiten und Routen
|-- server/api/          # Server Routes als Backend-Proxies
|-- stores/              # Pinia Stores fuer Auth und Warenkorb
|-- tests/               # Playwright E2E-Tests
|-- types/               # TypeScript-Typen und DTOs
`-- utils/               # Services, Formatter und Validierung
```

## ✅ Voraussetzungen

- Node.js in einer aktuellen LTS-Version
- npm
- Ein laufendes Backend mit den erwarteten Endpunkten, z. B. Auth, Produkte, Angebote, Nutzerprofil und Purchase

## ⚙️ Setup

Repository installieren:

```bash
npm install
```

Environment-Datei anlegen:

```bash
cp .env.example .env
```

In `.env` die Backend-URL setzen:

```env
API_BASE_URL=http://localhost:8000/
```

Wichtig: Die URL sollte mit einem Slash enden, da die Server Routes Pfade wie `api/products` oder `purchase` daran anhaengen.

## 💻 Entwicklung

Lokalen Dev-Server starten:

```bash
npm run dev
```

Die App ist danach standardmaessig unter `http://localhost:3000` erreichbar. Durch die i18n-Strategie liegen die lokalisierten Routen z. B. unter:

- `http://localhost:3000/de/login`
- `http://localhost:3000/de/shop`
- `http://localhost:3000/de/cart`

## 📜 Scripts

```bash
npm run dev          # Entwicklungsserver starten
npm run build        # Produktionsbuild erstellen
npm run preview      # Produktionsbuild lokal ansehen
npm run generate     # Statische Ausgabe generieren
npm run lint:js      # ESLint ausfuehren
npm run lint:prettier # Prettier auf das Projekt anwenden
npm run lint         # ESLint und Prettier kombiniert
```

## 🧪 Tests

Die E2E-Tests liegen in `tests/shopping-cart.spec.ts` und decken zentrale Warenkorb-Flows ab:

- Produkt kaufen
- Warenkorb leeren
- Produkt aus dem Warenkorb entfernen

Vor dem Testlauf muessen Frontend und Backend laufen. Danach:

```bash
npx playwright test
```

Falls Playwright-Browser noch nicht installiert sind:

```bash
npx playwright install
```

## 🔌 API-Anbindung

Das Frontend spricht nicht alle Backend-Endpunkte direkt aus Komponenten heraus an. Fuer Produkt- und Kaufdaten werden Nuxt Server Routes in `server/api/` verwendet:

- `/api/products/products`
- `/api/products/product`
- `/api/products/offers`
- `/api/purchase/purchase`

Diese Routes lesen `API_BASE_URL` aus der Runtime-Konfiguration, leiten Authorization-Header weiter und normalisieren teilweise Backend-Antworten fuer die UI.

## 🔐 Authentifizierung und Warenkorb

Der Auth-State wird im `authStore` verwaltet. Nach erfolgreichem Login wird das Token gespeichert und fuer geschuetzte API-Aufrufe genutzt. Der Warenkorb lebt im `cartStore`, ist ebenfalls persistiert und berechnet die Gesamtsumme automatisch aus Menge, Preis und Angebotspreis.

Geschuetzte Seiten wie Shop und Warenkorb nutzen Middleware, damit nur angemeldete Nutzerinnen und Nutzer Zugriff erhalten.

## 🌍 Lokalisierung

Die App ist auf Deutsch und Englisch vorbereitet. Neue UI-Texte sollten in beiden Dateien gepflegt werden:

- `i18n/locales/de.json`
- `i18n/locales/en.json`

Die Standard-Sprache ist Deutsch.

## 🏗️ Build

Produktionsbuild erstellen:

```bash
npm run build
```

Build lokal pruefen:

```bash
npm run preview
```

## 👤 Autor

Erstellt im Rahmen des Academy-Moduls von Patrick Kuipers.
