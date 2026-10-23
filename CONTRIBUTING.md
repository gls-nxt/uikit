# Contributing

## Reporting a problem

Open an issue using the bug report template. Include the component, the package version and what you expected. For security problems, follow [SECURITY.md](SECURITY.md) instead.

## Proposing a change

Contributions from outside GLS IT Services GmbH can only be accepted under a signed contributor agreement. Open an issue before starting work.

Pull requests are welcome for bug fixes, accessibility improvements, tests and documentation. For a new component or a visual change, open an issue first so the design team can confirm it matches the design system.

1. Fork the repository and create a branch.
2. Use the Node version in `.nvmrc` and install with `pnpm install --frozen-lockfile`.
3. Run `pnpm lint`, `pnpm typecheck`, `pnpm test` and `pnpm build`. A pre-commit hook formats staged files.
4. Add or update stories and tests for the component you touched.
5. Open a pull request and fill in the template. CI runs the same checks on every pull request.

## Fonts and brand assets

The Newson GLS font files and the GLS brand assets are proprietary to GLS IT Services GmbH. See [LICENSE](LICENSE). Do not add, modify or redistribute them without written permission from GLS IT Services GmbH.

## Releases

Maintainers release by merging to `main` with a bumped `version` in `package.json`. The package is published to GitHub Packages automatically.
