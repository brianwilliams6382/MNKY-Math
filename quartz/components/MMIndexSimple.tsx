import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"

export default (() => {
  const IndexSimple: QuartzComponent = ({ allFiles }: QuartzComponentProps) => {
    const scriptContent = `
      document.addEventListener("nav", () => {
        const container = document.querySelector(".mm-simple-index-container");
        if (!container) return;

        // 1. Get the full directory path of the current page
        // e.g., /about/mm_drivers/index -> ["about", "mm_drivers"]
        const pathSegments = window.location.pathname.split("/").filter(Boolean);
        
        // If we are on an index page, drop "index" or trailing slashes to get the target folder path
        if (pathSegments[pathSegments.length - 1] === "index") {
          pathSegments.pop();
        }
        
        const targetFolderPath = pathSegments.join("/");
        if (!targetFolderPath) return;

        // 2. Map raw Quartz file formats into a standardized catalog array
        const simpleCatalog = ${JSON.stringify(
          allFiles.map(f => ({
            title: f.frontmatter?.title || f.slug || "Untitled",
            slug: f.slug,
            mmShort: f.frontmatter?.mmShort || ""
          }))
        )};

        // 3. Filter for files STRICTLY inside this specific folder track
        const filteredEntries = simpleCatalog
          .filter(item => {
            const isNotIndexPage = !item.slug.endsWith("/index");
            
            // File must start with the target directory path
            const isInTargetFolder = item.slug.startsWith(targetFolderPath + "/");
            
            // Extract path relative to target folder to ensure it is a direct child (no sub-subdirectories)
            const relativePath = item.slug.replace(targetFolderPath + "/", "");
            const isDirectChild = !relativePath.includes("/");

            return isInTargetFolder && isNotIndexPage && isDirectChild;
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