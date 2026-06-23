# Sanity CMS — Voyaflair (χωρίς code για τον client)

Ο client γράφει articles στο **Sanity Studio** (browser). Το site κάνει build αυτόματα και ανεβαίνει live.

---

## Βήμα 1 — Φτιάξε Sanity project (5 λεπτά)

1. Πήγαινε στο [sanity.io/manage](https://www.sanity.io/manage)
2. **Create project** → όνομα: `Voyaflair`
3. Dataset: **production**
4. Copy το **Project ID** (π.χ. `abc123xy`)

---

## Βήμα 2 — Env vars

### Netlify (για live site build)

**Site configuration → Environment variables:**

| Key | Value |
|-----|-------|
| `SANITY_PROJECT_ID` | το Project ID |
| `SANITY_DATASET` | `production` |

### Τοπικά (εσύ / dev)

```bash
cp .env.example .env
# βάλε SANITY_PROJECT_ID=...

cp studio/.env.example studio/.env
# βάλε SANITY_STUDIO_PROJECT_ID=... (ίδιο ID)
```

---

## Βήμα 3 — Τρέξε Studio (admin panel)

```bash
cd /Users/johanna/Desktop/alpine_astroproject
npm install
cd studio && npm install && cd ..
npm run studio
```

Άνοιξε: **http://localhost:3333**

Login με Sanity account → **Article → Create**

---

## Βήμα 4 — Deploy Studio στο cloud (για client)

Μία φορά:

```bash
cd studio
npm run deploy
```

Sanity δίνει URL τύπου: `https://voyaflair.sanity.studio`

**Δώσε αυτό το link στον client** — γράφει articles από browser, χωρίς code.

---

## Βήμα 5 — Auto publish (Netlify rebuild)

Όταν ο client πατάει **Publish** στο Sanity, το site πρέπει να ξανα-build-άρει.

### Netlify Build Hook

1. Netlify → **Site configuration → Build & deploy → Build hooks**
2. **Add build hook** → όνομα: `Sanity publish`
3. Copy το URL

### Sanity Webhook

1. [sanity.io/manage](https://www.sanity.io/manage) → project → **API → Webhooks**
2. **Create webhook**
3. URL = το Netlify build hook URL
4. Trigger: **Create, Update, Delete** on type `article`
5. Save

**Τώρα:** Client Publish → Netlify build → live σε ~2–3 λεπτά.

---

## Πώς γράφει article ο client

1. Άνοιξε Studio URL
2. **Article → Create**
3. Συμπλήρωσε:
   - **Title**
   - **Slug** (πάτα Generate)
   - **Published date** (π.χ. `20 June 2026`)
   - **Destination** (Japan, Greece, κλπ.)
   - **Category** (π.χ. `JAPAN`)
   - **Hero image** + alt text
   - **Intro** (1+ παράγραφοι)
   - **Sections** (TOC + heading + body + photos)
4. **Publish**

Live URL: `https://voyaflair.com/articles/το-slug/`

---

## Σημαντικό — παλιά vs νέα articles

| Τύπος | Πού είναι |
|-------|-----------|
| Kyoto, Rhodes, Nara, Bali, Bruges | **Κώδικας** (ήδη live) — δεν τα αγγίζει ο client στο Sanity |
| **Νέα** articles | **Sanity** → auto URL `/articles/slug/` |

**Μην** βάλεις slug `kyoto-itinerary` στο Sanity — υπάρχει ήδη στο site.

---

## Newsletter (ξεχωριστά)

Sanity = articles. Newsletter = ακόμα `PUSH-ODIGOS.txt` (ή admin page αργότερα).

Νέο Sanity article → πρέπει να μπει slug στο send-newsletter catalog **ή** admin page που διαβάζει από Sanity.

---

## Checklist παράδοσης client

```
[ ] Sanity project created
[ ] Studio deployed (sanity.studio URL)
[ ] Netlify SANITY_PROJECT_ID set
[ ] Webhook → auto deploy
[ ] Client invite στο Sanity (Members → Editor)
[ ] 5-min Loom: «New article → Publish»
[ ] Δεν δίνεις GitHub / terminal
```

---

## Troubleshooting

| Πρόβλημα | Λύση |
|----------|------|
| Build OK αλλά no new pages | Έλεγξε `SANITY_PROJECT_ID` στο Netlify |
| Studio δεν ανοίγει | `cd studio && npm install && npm run dev` |
| 404 on new article | Publish στο Sanity + Netlify deploy |
| Duplicate slug | Άλλαξε slug — μην χρησιμοποιείς existing names |

---

## Scripts

| Command | Τι κάνει |
|---------|----------|
| `npm run studio` | Local admin panel |
| `npm run studio:deploy` | Studio cloud URL για client |
| `npm run build` | Site + Sanity articles |
