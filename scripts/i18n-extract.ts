import { Project, SyntaxKind } from 'ts-morph';
import fs from 'fs';
import path from 'path';

const project = new Project();
project.addSourceFilesAtPaths('src/**/*.tsx');
project.addSourceFilesAtPaths('src/constants/**/*.ts');

const translations: Record<string, Record<string, string>> = {
  en: {},
  es: {},
  ca: {},
};

function generateKey(text: string): string {
  const clean = text.trim().toLowerCase().replace(/[^a-z0-9]+/g, '_');
  return clean.substring(0, 30).replace(/_+$/, '');
}

console.log('Scanning files for hardcoded strings...');

for (const sourceFile of project.getSourceFiles()) {
  let modified = false;

  // 1. Process JSX Text nodes
  const jsxTexts = sourceFile.getDescendantsOfKind(SyntaxKind.JsxText);
  for (const jsxText of jsxTexts) {
    const text = jsxText.getLiteralText().trim();
    if (text.length > 2 && /[a-zA-Z]/.test(text)) {
      const key = `jsx_${generateKey(text)}`;
      
      // Save translation for ES
      translations.es[key] = text;
      // Provide placeholders for others
      translations.en[key] = `[EN] ${text}`;
      translations.ca[key] = `[CA] ${text}`;

      // Replace in code
      try {
        jsxText.replaceWithText(`{t('${key}')}`);
        modified = true;
      } catch {
        console.warn(`Could not replace JSX text in ${sourceFile.getBaseName()}`);
      }
    }
  }

  // Ensure useTranslation is imported if we modified JSX
  if (modified && sourceFile.getExtension() === '.tsx') {
    const hasImport = sourceFile.getImportDeclaration('react-i18next');
    if (!hasImport) {
      sourceFile.addImportDeclaration({
        namedImports: ['useTranslation'],
        moduleSpecifier: 'react-i18next'
      });
      
      // Try to find the component function to insert `const { t } = useTranslation();`
      // This is rudimentary and might need manual adjustment
      console.log(`[ACTION REQUIRED] Please add \`const { t } = useTranslation();\` to the component in ${sourceFile.getBaseName()}`);
    }
    sourceFile.saveSync();
  }
}

import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const localesDir = path.join(__dirname, '../src/locales');
for (const lang of ['es', 'en', 'ca']) {
  const filePath = path.join(localesDir, lang, 'translation.json');
  let currentTranslations = {};
  if (fs.existsSync(filePath)) {
    currentTranslations = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  }
  
  // Merge and sort keys
  const merged = { ...currentTranslations, ...translations[lang as keyof typeof translations] };
  
  fs.writeFileSync(filePath, JSON.stringify(merged, null, 2));
  console.log(`Updated ${lang}/translation.json`);
}

console.log('Extraction complete! Please review the changes, manually add useTranslation() hooks where needed, and update the EN/CA translations.');
