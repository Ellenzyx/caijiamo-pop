## CAIJIAMO POP / 菜夹馍消消乐

> English version below / 英文版在后面

### 介绍（简体中文）

`CAIJIAMO POP` 是一个为手机优先设计的网页小游戏：  
点开链接即可玩，无需下载。

- **玩法**：在 7×7 的菜品棋盘上，点击选中相邻的同类菜，三连即可做出一份菜夹馍。
- **计时**：每局 60 秒，右上角绿色进度条会在最后 10 秒变成红色并抖动提醒。
- **MY CAIJIAMO**：每完成若干三连，会在下方堆叠出不同阶段的菜夹馍图片。
- **菜单（MENU）**：展示所有菜品，每玩完一局会解锁两道新菜：
  - 已解锁：彩色显示，可点进查看中/英文做法。
  - 未解锁：灰色显示，只能点小心心收藏，不能查看做法。
- **日历（CALENDAR）**：
  - MONTH：点某一天可以标记“这天吃过菜夹馍”，显示为小 `caijiamo1` 图标。
  - YEAR：按月统计一年中吃菜夹馍的频率，用数码风条形图展示，可左右切年份。

### 本地运行

1. 确保安装了 Python 3。
2. 在项目根目录下启动本地服务器：

```bash
cd CAIJIAMO_POP
python3 -m http.server 5173
```

3. 在电脑浏览器打开：

```text
http://localhost:5173/
```

4. 在同一 Wi‑Fi 下，手机浏览器访问：

```text
http://你的电脑IP:5173/
```

示例：`http://192.168.1.8:5173/`

### 线上部署（Vercel 简要说明）

1. 把本项目推到 GitHub 仓库。
2. 在 `vercel.com` 使用 GitHub 账号登录，`New Project` → 选择该仓库。
3. Framework 选 `Other` / `Static Site`，Build 命令留空，Output 目录为 `.`。
4. 点击 `Deploy`，几秒后会得到一个形如 `https://xxx.vercel.app` 的访问地址。

---

## English Version

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

