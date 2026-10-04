import fs from 'node:fs';
import path from 'node:path';
import { installEditor } from './install-editor.mjs';

const directory = process.argv[2] || '_site/concepts';
const baseRoot = (process.env.BASE_ROOT || '/agency-web-templates').replace(/\/$/, '');
if (fs.existsSync(directory)) {
  for (const slug of fs.readdirSync(directory, { withFileTypes: true }).filter(entry => entry.isDirectory())) {
    const variants = path.join(directory, slug.name);
    for (const variant of fs.readdirSync(variants, { withFileTypes: true }).filter(entry => entry.isDirectory() && entry.name !== 'editor')) {
      const site = path.join(variants, variant.name);
      if (fs.existsSync(path.join(site, 'index.html'))) installEditor(site, `concepts/${slug.name}/${variant.name}`, `${baseRoot}/concepts/${slug.name}/${variant.name}`);
    }
  }
}
