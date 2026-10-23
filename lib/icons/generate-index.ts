import { mkdir, readdir, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const iconsDir = path.join(__dirname, '../../assets/icons');
const generatedDir = path.join(__dirname, './generated');
const indexFile = path.join(__dirname, './index.tsx');

function toComponentName(file: string): string {
  return file
    .replace('.svg', '')
    .split('-')
    .map((part: string) => part.charAt(0).toUpperCase() + part.slice(1))
    .join('');
}

async function generateIconsIndex() {
  try {
    const files = await readdir(iconsDir);
    const svgFiles = files.filter((file: string) => file.endsWith('.svg'));

    // Clean and recreate generated directory
    await rm(generatedDir, { force: true, recursive: true });
    await mkdir(generatedDir, { recursive: true });

    // Generate individual icon files
    for (const file of svgFiles) {
      const componentName = toComponentName(file);
      const iconContent = `// This file is auto-generated. Do not edit manually
import type { ComponentType, SVGProps } from 'react';
import { createIcon } from '../create-icon';

type IconComponentProps = SVGProps<SVGSVGElement> & {
  className?: string;
};

import ${componentName} from '../../../assets/icons/${file}';

export const ${componentName}Icon = createIcon(${componentName} as unknown as ComponentType<IconComponentProps>);
`;
      await writeFile(path.join(generatedDir, `${componentName}Icon.tsx`), iconContent);
    }

    // Generate barrel index that re-exports from individual files
    const template = `// This file is auto-generated. Do not edit manually
${svgFiles
  .map((file: string) => {
    const componentName = toComponentName(file);
    return `export { ${componentName}Icon } from './generated/${componentName}Icon';`;
  })
  .join('\n')}

export type { IconProps } from './icon';
export type { IconVariants } from './icon.variants';
export { iconVariants } from './icon.variants';
`;

    await writeFile(indexFile, template);
    console.log(`Icon index file generated successfully! (${svgFiles.length} icons)`);
  } catch (error) {
    console.error('Error generating icons index:', error);
    process.exit(1);
  }
}

generateIconsIndex();
