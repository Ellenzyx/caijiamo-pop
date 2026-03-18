## CAIJIAMO POP

[中文](README.md) | [English](README.en.md)

### Overview

`CAIJIAMO POP` is a mobile‑first web puzzle game.  
You can play it directly in the browser without installing anything.

- **Core gameplay**: On a 7×7 grid of dishes, tap to select adjacent tiles of the same type; matching 3 will cook one CAIJIAMO.
- **Timer**: Each round lasts 60 seconds. The green time bar turns red and shakes in the last 10 seconds.
- **MY CAIJIAMO**: Completed matches stack up different CAIJIAMO stages in the bottom area.
- **MENU**:
  - Finished rounds **unlock two new dishes** at a time.
  - Unlocked dishes are shown in color and can be opened for recipe details (Chinese / English).
  - Locked dishes are grayed out; you can still tap the heart to favorite them, but cannot open recipes yet.
- **CALENDAR**:
  - MONTH view: tap a day to toggle a small `caijiamo1` icon, marking “ate CAIJIAMO on this day”.
  - YEAR view: shows, per month, how many days CAIJIAMO was eaten, using a pixel/retro‑style bar chart. You can move across years.

### Run locally

1. Make sure Python 3 is installed.
2. From the project root, start a simple static server:

```bash
cd CAIJIAMO_POP
python3 -m http.server 5173
```

3. Open in your desktop browser:

```text
http://localhost:5173/
```

4. With your phone on the same Wi‑Fi, visit:

```text
http://<your-computer-ip>:5173/
```

Example: `http://192.168.1.8:5173/`

### Deploying to Vercel (short version)

1. Push the project to a GitHub repository.
2. Log in to `vercel.com` with GitHub → `New Project` → import that repo.
3. Framework preset: `Other` / `Static Site`, build command: (empty), output directory: `.`.
4. Click `Deploy`. Vercel will provide a public URL like `https://xxx.vercel.app` which you can share.

