# git-gud-gym.github.io

The website and docs for [Git Gud Gym](https://git-gud-gym.github.io/): React 18, Vite, TypeScript,
Tailwind CSS and framer-motion. It's deployed to GitHub Pages on every push to `main`.

```bash
npm install
npm run dev        # http://localhost:5173/
npm run build      # type-check + production build into dist/
npm run preview    # serve dist/ locally
```

## Where things are

| Path | What |
|---|---|
| `src/config.ts` | Every GitHub URL the site uses. Nothing else hardcodes the org or repo names. |
| `src/pages/` | Home, Games, Docs, 404 |
| `src/docs/*.md` | Documentation pages. `{{NAME}}` placeholders are filled from `config.ts`. |
| `src/catalog.ts` | Loads the game library from the [registry](https://github.com/Git-Gud-Gym/registry)'s `catalog.json`, falling back to `src/data/sample-catalog.json` if it can't be reached. |

Deep links work on GitHub Pages because the build copies `index.html` to `404.html`.

## Rules for content

- **No publisher assets:** no official art, logos or screenshots of the games. Game cards are our
  own typography and gradients.
- **No made-up numbers:** anything shown comes from the catalog or the GitHub API.

Contributing: see the org-wide [contributing guide](https://github.com/Git-Gud-Gym/.github/blob/main/CONTRIBUTING.md).
