/** @type {import('svgo').Config} */
export default {
  multipass: true,
  plugins: [
    {
      name: 'preset-default',
      params: {
        overrides: {
          // Reduce path precision — 3 decimal places is sub-pixel at 24×24
          cleanupNumericValues: {
            floatPrecision: 3,
          },

          // Aggressive path optimisation
          convertPathData: {
            floatPrecision: 3,
            forceAbsolutePath: false,
            utilizeAbsolute: true,
          },

          // Convert transforms to path data
          convertTransform: {
            floatPrecision: 3,
          },

          // Merge paths where safe
          mergePaths: {
            floatPrecision: 3,
          },
        },
      },
    },

    // Remove xmlns (redundant when inlined in HTML/JSX)
    'removeXMLNS',

    // Prefix IDs to avoid collisions when multiple icons are on one page
    // e.g. clip0_348_1571 → icon-settings-clip0_348_1571
    {
      name: 'prefixIds',
      params: {
        delim: '-',
        prefixClassNames: true,
        prefixIds: true,
      },
    },

    // Sort attributes for deterministic output & better gzip
    'sortAttrs',

    // Remove empty <defs> left over after other optimisations
    'removeEmptyContainers',
  ],
};
