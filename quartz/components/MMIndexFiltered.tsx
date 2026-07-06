import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"

export default (() => {
  const FilteredIndex: QuartzComponent = ({ allFiles }: QuartzComponentProps) => {
    const scriptContent = `
      document.addEventListener("nav", () => {
        const anchorNodes = document.querySelectorAll(".mm-filtered-index");
        
        const siteCatalog = ${JSON.stringify(
          allFiles.map(f => ({
            title: f.frontmatter?.title || f.slug || "Untitled",
            slug: f.slug,
            mmShort: f.frontmatter?.mmShort || "",
            contentType: f.frontmatter?.contentType || "",
          }))
        )};

        anchorNodes.forEach(container => {
          const targetType = container.getAttribute("data-filter-type");
          if (!targetType) return;

          const matchedEntries = siteCatalog
            .filter(item => {
              if (!item.contentType) return false;
              
              // Normalize data: If it's an array, extract the first value; otherwise use it as-is
              let actualValue = "";
              if (Array.isArray(item.contentType)) {
                actualValue = item.contentType[0] || "";
              } else if (typeof item.contentType === "string") {
                actualValue = item.contentType;
              }

              if (!actualValue) return false;

              // Filter out index template containers
              if (item.slug.endsWith("/index")) return false;

              return actualValue.toLowerCase() === targetType.toLowerCase();
            })
            .sort((a, b) => a.title.localeCompare(b.title));

          if (matchedEntries.length === 0) {
            container.innerHTML = '<p style="font-style: italic; color: var(--gray); font-size: 0.9rem;">No catalogued entries found under this section map.</p>';
            return;
          }

          let htmlOutput = '<div class="mm-index-catalog-wrapper">';
          
          matchedEntries.forEach(entry => {
            const cleanHref = entry.slug.startsWith("/") ? entry.slug : "/" + entry.slug;
            
            htmlOutput += \`
              <div class="mm-index-row">
                <a class="mm-index-title-link internal" href="\${cleanHref}">\${entry.title}</a>
                <p class="mm-index-summary">\${entry.mmShort}</p>
              </div>
            \`;
          });

          htmlOutput += '</div>';
          container.innerHTML = htmlOutput;
        });
      });
    `

    return (
      <script dangerouslySetInnerHTML={{ __html: scriptContent }} />
    )
  }

  return FilteredIndex
}) satisfies QuartzComponentConstructor