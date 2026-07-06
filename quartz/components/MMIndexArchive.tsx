import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"

export default (() => {
  const IndexArchive: QuartzComponent = ({ allFiles }: QuartzComponentProps) => {
    const scriptContent = `
      document.addEventListener("nav", () => {
        const container = document.querySelector(".mm-archive-index-container");
        if (!container) return;

        // 1. Map raw Quartz file formats into a standardized catalog array
            const archiveCatalog = ${JSON.stringify(
             allFiles.map(f => {
            let typeVal = f.frontmatter?.contentType || "";
            if (Array.isArray(typeVal)) typeVal = typeVal[0] || "";

            const hasValidDate = f.frontmatter?.date && typeof f.frontmatter.date === "string";

            // CORE STRATEGY: Replicate MMReadTime's parsing rules inside the index array map
            const fileText = f.text || "";
            const isExplicitlyHidden = f.frontmatter?.readTimeMM === false;
    
            // Fallback default reading time logic matching your readingTime(text) function
            // Assuming roughly 200 words per minute to match the standard reading-time library weight
            const wordCount = fileText.split(/\s+/).filter(Boolean).length;
            const computedMinutes = Math.ceil(wordCount / 200);
            const finalMinutes = isExplicitlyHidden || wordCount === 0 ? 0 : Math.max(1, computedMinutes);

            return {
                title: f.frontmatter?.title || f.slug || "Untitled",
                slug: f.slug,
                date: hasValidDate ? new Date(f.frontmatter!.date as string) : null,
                rawDateString: hasValidDate ? f.frontmatter!.date : "",
                contentType: typeVal,
                mmShort: f.frontmatter?.mmShort || "",
                readTimeMinutes: finalMinutes // Passes the exact locked integer down
            };
            })
        )};

        // 2. Filter for Directory Isolation and Execute Multi-Tier Sort
        const sortedEntries = archiveCatalog
          .filter(item => {
            const isInArchiveDirectory = item.slug.startsWith("archive/");
            const isNotIndexPage = !item.slug.endsWith("/index");
            return isInArchiveDirectory && isNotIndexPage;
          })
          .sort((a, b) => {
            if (a.date === null && b.date !== null) return 1;
            if (a.date !== null && b.date === null) return -1;
            if (a.date === null && b.date === null) {
              return a.title.localeCompare(b.title);
            }

            const timeB = new Date(a.rawDateString).getTime();
            const timeA = new Date(b.rawDateString).getTime();
            if (timeA !== timeB) return timeA - timeB;

            return a.title.localeCompare(b.title);
          });

        if (sortedEntries.length === 0) {
          container.innerHTML = '<p style="font-style: italic; color: var(--gray);">No catalogued archive entries found.</p>';
          return;
        }

        // 3. Compute System Variables (Cumulative Volume Metrics)
        const totalReadingTime = sortedEntries.reduce((sum, item) => sum + item.readTimeMinutes, 0);
        
        // SYSTEM CONTROLLER: Hide the meta row entirely if volume feels too low
        const MIN_ENTRY_THRESHOLD = 25; 
        const showMetaBadge = sortedEntries.length >= MIN_ENTRY_THRESHOLD;

        // 4. Build Your Exact Typographic Specification Layout
        let htmlOutput = '<div class="mm-archive-header-zone">';
        htmlOutput += '<h1 class="mm-archive-master-title">Index</h1>';
        
        if (showMetaBadge) {
          htmlOutput += \`
            <div class="mm-archive-dashboard-meta">
              <span class="mm-archive-meta-stat">\${sortedEntries.length} Entries</span>
              <span class="mm-meta-divider">|</span>
              <span class="mm-archive-meta-stat">\${totalReadingTime} Mins Continuous Read</span>
            </div>
          \`;
        }
        htmlOutput += '</div>'; // Close header zone

        htmlOutput += '<div class="mm-archive-list-wrapper">';

        sortedEntries.forEach(entry => {
            const cleanHref = entry.slug.startsWith("/") ? entry.slug : "/" + entry.slug;
  
            let displayDate = "Undated Framework";
            if (entry.rawDateString) {
                const parsedDate = new Date(entry.rawDateString + "T00:00:00");
                displayDate = parsedDate.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
            }

            // If readTimeMinutes is 0 (hidden), print an empty string instead of the metadata segment
            const readTimeMetaSegment = entry.readTimeMinutes > 0 
                 ? \`<span class="mm-meta-divider">|</span> \${entry.readTimeMinutes} Min Read\`
            : "";

            htmlOutput += \`
                <div class="mm-archive-item-block">
                <a class="mm-archive-title-link internal" href="\${cleanHref}">\${entry.title}</a>
                <div class="mm-archive-meta-line">
                 \${displayDate} 
                 <span class="mm-meta-divider">|</span> 
                \${entry.contentType || 'Essay'} 
                \${readTimeMetaSegment}
                </div>
                <p class="mm-archive-summary">\${entry.mmShort}</p>
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

  return IndexArchive
}) satisfies QuartzComponentConstructor