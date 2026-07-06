import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"

export default (() => {
  const IndexSimple: QuartzComponent = ({ allFiles }: QuartzComponentProps) => {
    const scriptContent = `
      document.addEventListener("nav", () => {
        const container = document.querySelector(".mm-simple-index-container");
        if (!container) return;

        // 1. Automatically detect the directory context from the browser URL path
        // e.g., /foundations/ -> "foundations", /journeys/ -> "journeys"
        const currentPathSegments = window.location.pathname.split("/").filter(Boolean);
        const targetDirectory = currentPathSegments[0];
        
        if (!targetDirectory) return;

        // 2. Map raw Quartz file formats into a standardized catalog array
        const simpleCatalog = ${JSON.stringify(
          allFiles.map(f => ({
            title: f.frontmatter?.title || f.slug || "Untitled",
            slug: f.slug,
            mmShort: f.frontmatter?.mmShort || ""
          }))
        )};

        // 3. Filter for matching Directory and sort Alphabetically by title
        const filteredEntries = simpleCatalog
          .filter(item => {
            const matchesDirectory = item.slug.startsWith(targetDirectory + "/");
            const isNotIndexPage = !item.slug.endsWith("/index");
            return matchesDirectory && isNotIndexPage;
          })
          .sort((a, b) => a.title.localeCompare(b.title));

        if (filteredEntries.length === 0) {
          container.innerHTML = '<p style="font-style: italic; color: var(--gray); font-size: 0.9rem;">No catalogued entries found in this folder track.</p>';
          return;
        }

        // 4. Build Your Exact Typographic Specification Layout
        let htmlOutput = '<div class="mm-simple-list-wrapper">';

        filteredEntries.forEach(entry => {
          const cleanHref = entry.slug.startsWith("/") ? entry.slug : "/" + entry.slug;
          
          htmlOutput += \`
            <div class="mm-simple-index-row">
              <a class="mm-simple-title-link internal" href="\${cleanHref}">\${entry.title}</a>
              <p class="mm-simple-summary">\${entry.mmShort}</p>
            </div>
          \`;
        });

        htmlOutput += '</div>';
        container.innerHTML = htmlOutput;
      });
    `

    return (
      <script dangerouslySetInnerHTML={{ __html: scriptContent }} />
    )
  }

  return IndexSimple
}) satisfies QuartzComponentConstructor