import jsYaml from 'js-yaml';

export interface ParsedContent<T> {
  frontmatter: T;
  content: string;
}

export function parseFrontmatter<T>(text: string): ParsedContent<T> {
  const frontmatterRegex = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/;
  const match = frontmatterRegex.exec(text);

  if (match) {
    const yamlBlock = match[1];
    const content = match[2];
    try {
      const frontmatter = jsYaml.load(yamlBlock) as T;
      return { frontmatter, content };
    } catch (e) {
      console.error('Error parsing YAML frontmatter:', e);
      return { frontmatter: {} as T, content: text };
    }
  }

  // No frontmatter found
  return { frontmatter: {} as T, content: text };
}