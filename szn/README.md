# Suzanne Raider — Video Archive

Unofficial static fan archive for [@suzanneraider](https://www.youtube.com/@suzanneraider). No API keys or backend required.

## Setup

1. Upload these files (including the hidden `.github` folder) to a GitHub repository on the `main` branch.
2. Open **Settings → Pages → Build and deployment**. Select **Deploy from a branch**, `main`, `/ (root)`, and save.
3. Open **Actions → Sync videos → Run workflow**, select `main`, and run it. Enable Actions if prompted. Repository policies must allow the workflow to write contents and push to `main`.
4. Open the Pages URL shown in Settings → Pages.

**Important:** GitHub normally does not trigger branch-based Pages builds from commits made with `GITHUB_TOKEN`. For fully automatic updates without a personal token, switch **Settings → Pages → Source** to **GitHub Actions** and use the optional deployment workflow described below instead of branch deployment.

## Automatic deployment (recommended)

The included `.github/workflows/pages.yml` can be enabled by selecting GitHub Actions as the Pages source. It runs after successful syncs, after normal pushes to `main`, and manually. It publishes only the website files. If using branch deployment instead, remove this optional workflow; a manual human push is needed to publish bot-generated changes.

## Sync behaviour

The sync runs every four hours (UTC), merges by video ID, and retains previously discovered videos even if they leave the RSS feed. The first run only discovers recent uploads (typically up to 15). Older videos can be added manually using the same JSON fields. Deleted or private videos remain in the archive but may not play. YouTube can also restrict embedding; the direct watch link remains available. Scheduled workflows can be delayed by GitHub or disabled after inactivity.

## Local preview

Run `python3 -m http.server 8000` in the repository root and open `http://localhost:8000`. Opening the HTML directly from disk may prevent JSON loading.
