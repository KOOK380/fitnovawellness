// Renders CMS rich text (HTML from the admin editor) with the site's prose styles.
// Headings get an id from their text so in-article "jump to" links work; links to other sites open in a new tab.

const ENT: Record<string, string> = { amp: '&', quot: '"', apos: "'", '#39': "'", nbsp: ' ', lt: '<', gt: '>' };
const decode = (s: string) => s.replace(/&(amp|quot|apos|#39|nbsp|lt|gt);/g, (_, e: string) => ENT[e]);
const slugify = (s: string) => decode(s).toLowerCase().replace(/&[a-z]+;/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const stripTags = (s: string) => s.replace(/<[^>]+>/g, '');
const isExternal = (u: string) => /^https?:\/\//.test(u) && !u.includes('fitnovawellness.com');

export function prepareHtml(html: string): string {
  return html
    // h1 belongs to the page title — demote any in the body
    .replace(/<h1(\s[^>]*)?>/g, '<h2>').replace(/<\/h1>/g, '</h2>')
    // ids on headings (keep an existing one)
    .replace(/<(h[2-6])>([\s\S]*?)<\/\1>/g, (_, tag: string, inner: string) => `<${tag} id="${slugify(stripTags(inner))}">${inner}</${tag}>`)
    // external links: new tab, no referrer leak
    .replace(/<a\s([^>]*?)href="([^"]+)"([^>]*)>/g, (m, pre: string, href: string, post: string) => {
      if (!isExternal(href) || /target=/.test(pre + post)) return m;
      return `<a ${pre}href="${href}"${post} target="_blank" rel="noopener noreferrer">`;
    })
    // wide tables scroll sideways on phones
    .replace(/<table>/g, '<div class="pg-table-scroll"><table>').replace(/<\/table>/g, '</table></div>')
    // never allow scripts from content
    .replace(/<script[\s\S]*?<\/script>/gi, '');
}

export default function RichText({ data }: { data: unknown }) {
  if (!data || typeof data !== 'string') return null;
  return <div className="pg-prose" dangerouslySetInnerHTML={{ __html: prepareHtml(data) }} />;
}
