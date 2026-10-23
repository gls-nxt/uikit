# Web component-library

Welcome to the GLS NXT UI Kit component library! This library provides a set of reusable components to help you build fast, accessible, scalable, and maintainable applications.

[Storybook](https://component-library-glsnxt.vercel.app/)

## License

Copyright (c) 2026 GLS IT Services GmbH. All rights reserved. The source is publicly visible for
reference only and no license is granted. See [LICENSE](LICENSE).

Third-party icons (Lucide, Feather) remain under their own licenses. See
[THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md).

## Getting Started

To get started with the GLS NXT UI Kit, follow these simple steps:

### Prerequisites

- A GitHub Personal Access Token (see [Step-by-Step Installation Guide](#step-by-step-installation-guide) below)

### Step-by-Step Installation Guide

To install the GLS NXT UI Kit package, follow these steps:

#### Step 1: Create a Personal Access Token on GitHub

1. Go to the GitHub settings page: https://github.com/settings/tokens
2. Navigate to the **Developer settings** section
3. Click on **Personal access tokens** and then click on **Generate new token**
4. Select **Classic token** and give the `read:packages` permission. (Please copy the token)
5. Click on **Generate token** and copy the token

#### Step 2: Configure NPM Login

Add the following script to your `package.json` file:

```bash
"npm:login":"npm login --scope=@gls-nxt --auth-type=legacy --registry=https://npm.pkg.github.com"
```

This will prompt you to enter your GitHub username and the Personal Access Token you generated in Step 1

```bash
Username: <your github username>
Password: <Token generated in the step 1>
```

#### Step 3: Install the GLS NXT UI Kit Package

Install the package using the following command:

```bash
pnpm add @gls-nxt/uikit
```

#### Generating Icons

To add a new icon, follow these steps:

1. Place your SVG file in the `assets/icons` directory using **kebab-case** naming (e.g. `my-new-icon.svg`).
2. Run the following command to generate the icon component:

```bash
pnpm generate:icons
```

This will:

- Create an auto-generated React component in `lib/icons/generated/` (e.g. `MyNewIconIcon.tsx`) that wraps the SVG with `createIcon`
- Re-export it from `lib/icons/index.tsx`

**Naming convention:** Each kebab segment is PascalCased and `Icon` is appended. For example, `my-new-icon.svg` → `MyNewIconIcon`.

When you run `pnpm build`, the SVGs are also copied to `dist/icons/` and optimized via SVGO (`pnpm optimize:icons`).

⚠️ Do not manually modify anything in `lib/icons/generated/` or `lib/icons/index.tsx` — these files are automatically regenerated when you run the command above.

That's it! You should now have the GLS NXT UI Kit installed and ready to use in your project.

## Using Fonts

Import the packaged font CSS once near your app root:

```tsx
import '@gls-nxt/uikit/fonts';
```

Then use the font normally in your own CSS:

```css
body {
  font-family: 'Newson', sans-serif;
}
```

If you want the font files to start loading earlier, render `PreloadFonts` in your document head:

```tsx
import { PreloadFonts } from '@gls-nxt/uikit';

<head>
  <PreloadFonts />
</head>
```

## Using Icons

Icons are shipped as raw SVG files. Import them directly and let your bundler ([vite-plugin-svgr](https://github.com/nicolo-ribaudo/vite-plugin-svgr), [@svgr/webpack](https://react-svgr.com/docs/webpack/), etc.) turn them into React components:

### Vite (vite-plugin-svgr)

```tsx
import SearchIcon from '@gls-nxt/uikit/icons/search.svg?react';
import AlertCircle from '@gls-nxt/uikit/icons/alert-circle.svg?react';
import Spinner from '@gls-nxt/uikit/icons/Spinner.svg?react';

<SearchIcon className="icon" width={24} height={24} />;
```

The `?react` suffix tells vite-plugin-svgr to return a React component.

### Webpack (@svgr/webpack)

```tsx
import SearchIcon from '@gls-nxt/uikit/icons/search.svg';

<SearchIcon className="icon" width={24} height={24} />;
```

Only the SVGs you actually import end up in your bundle — zero JS wrapper overhead per icon.

### Icon licenses

Many icons are taken from or derived from [Lucide](https://lucide.dev) (ISC) and [Feather](https://feathericons.com) (MIT). Their license texts are in [`THIRD_PARTY_NOTICES.md`](THIRD_PARTY_NOTICES.md), which is also published as `icons/THIRD_PARTY_NOTICES.md` in the package.
