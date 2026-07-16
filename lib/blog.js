import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { marked } from 'marked';

const DIR = path.join(process.cwd(), 'content/blog');

marked.setOptions({ gfm: true, breaks: false });

function readTime(content = '') {
  const words = content.trim().split(/\s+/).length;
  return `${Math.max(1, Math.round(words / 200))} min read`;
}

export function getAllPosts() {
  if (!fs.existsSync(DIR)) return [];
  return fs
    .readdirSync(DIR)
    .filter((f) => f.endsWith('.md') || f.endsWith('.mdx'))
    .map((file) => {
      const slug = file.replace(/\.mdx?$/, '');
      const raw = fs.readFileSync(path.join(DIR, file), 'utf8');
      const { data, content } = matter(raw);
      return { slug, readTime: readTime(content), ...data };
    })
    .filter((p) => !p.draft)
    .sort((a, b) => new Date(b.date) - new Date(a.date));
}

export function getPost(slug) {
  const base = path.join(DIR, slug);
  const fp = fs.existsSync(`${base}.mdx`) ? `${base}.mdx` : fs.existsSync(`${base}.md`) ? `${base}.md` : null;
  if (!fp) return null;
  const { data, content } = matter(fs.readFileSync(fp, 'utf8'));
  return {
    slug,
    meta: { ...data, readTime: readTime(content) },
    html: marked.parse(content),
  };
}