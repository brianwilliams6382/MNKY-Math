import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { compileStyles } from "../util/styles"
import { FullSlug, simplifySlug } from "../util/path"

// Define the shape of our individual journey maps from frontmatter
interface JourneyEntry {
  j_id: string
  j_seq: number
  j_name?: string
  j_desc?: string
}

export const JourneyNav: QuartzComponent = ({ allFiles, fileData, displayClass }: QuartzComponentProps) => {
  // Extract the frontmatter safely. If this file doesn't have a journeys list, skip rendering entirely.
  const currentJourneys = fileData.frontmatter?.journeys as JourneyEntry[] | undefined
  if (!currentJourneys || !Array.isArray(currentJourneys) || currentJourneys.length === 0) {
    return null
  }

  return (
    <div className={`mm-journey-wrapper ${displayClass ?? ""}`}>
      {currentJourneys.map((curr) => {
        const targetId = curr.j_id
        const currentSeq = curr.j_seq
        const journeyDisplayName = curr.j_name ?? targetId.replace(/-/g, " ")

        // Filter the entire vault to assemble this specific journey track
        const trackPages = allFiles
          .filter((file) => {
            const fileJourneys = file.frontmatter?.journeys as JourneyEntry[] | undefined
            return Array.isArray(fileJourneys) && fileJourneys.some((j) => j.j_id === targetId)
          })
          .map((file) => {
            const match = (file.frontmatter!.journeys as JourneyEntry[]).find((j) => j.j_id === targetId)!
            return {
              slug: file.slug,
              title: file.frontmatter?.title ?? simplifySlug(file.slug!),
              seq: match.j_seq,
              desc: match.j_desc,
            }
          })
          .sort((a, b) => a.seq - b.seq)

        // Find neighbors along this specific track
        const prevPage = trackPages.find((p) => p.seq === currentSeq - 1)
        const nextPage = trackPages.find((p) => p.seq === currentSeq + 1)
        const totalStops = trackPages.length - 1

        // Form clean slug paths for links
        const prevUrl = prevPage ? `/${prevPage.slug}?j=${targetId}` : null
        const nextUrl = nextPage ? `/${nextPage.slug}?j=${targetId}` : null
        const directoryUrl = `/journeys/${targetId}`

        return (
          <div 
            key={targetId} 
            className="page-flow-nav mm-journey-card" 
            data-journey-id={targetId}
            style={{ display: "none" }}
          >
            {/* UPDATED HEADER: Custom reader-facing name track */}
            <div className="journey-header">
              <span className="journey-status-text">
                current journey: <a href={directoryUrl} className="journey-directory-link">{journeyDisplayName}</a>
              </span>
            </div>
            
            <div className="journey-controls">
              <div className="journey-nav-block prev">
                {prevUrl ? (
                  <>
                    <span className="nav-label">← previous stop</span>
                    <a href={prevUrl} className="nav-link">{prevPage?.title}</a>
                    <span className="nav-meta">stop {String(currentSeq - 1).padStart(1, '0')} of {String(totalStops).padStart(1, '0')}</span>
                  </>
                ) : (
                  <span className="nav-disabled">start of path</span>
                )}
              </div>

              <div className="journey-nav-block next">
                {nextUrl ? (
                  <>
                    <span className="nav-label">next stop →</span>
                    <a href={nextUrl} className="nav-link">{nextPage?.title}</a>
                    <span className="nav-meta">stop {String(currentSeq + 1).padStart(1, '0')} of {String(totalStops).padStart(1, '0')}</span>
                  </>
                ) : (
                  <span className="nav-disabled">end of path </span>
                )}
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default (() => {
  return JourneyNav
}) as QuartzComponentConstructor

JourneyNav.afterDOMLoaded = `
  (() => {
    const handleJourneyVisibility = () => {
      requestAnimationFrame(() => {
        const params = new URLSearchParams(window.location.search);
        let activeJourney = params.get("j");
        
        const cards = document.querySelectorAll(".mm-journey-card");
        if (cards.length === 0) return;
        
        // SYSTEMS OVERRIDE: Check if the current file itself is an explicit journey summary page
        const isJourneySummaryPage = window.location.pathname.startsWith("/journeys/");
        
        if (isJourneySummaryPage) {
          // Extract the journey identity directly from the clean folder URL slug
          const slugId = window.location.pathname.split("/").pop() || "";
          if (slugId && !activeJourney) {
            activeJourney = slugId;
            // Silently append the tracker to the browser address bar without forcing a reload
            params.set("j", slugId);
            window.history.replaceState({}, "", window.location.pathname + "?" + params.toString());
          }
        }
        
        cards.forEach(card => {
          const cardId = card.getAttribute("data-journey-id");
          if (activeJourney && cardId === activeJourney) {
            card.style.setProperty("display", "flex", "important");
          } else {
            card.style.setProperty("display", "none", "important");
          }
        });
      });
    };

    // Global listeners
    document.addEventListener("animationstart", (event) => {
      if (event.animationName === "mmJourneyCardInserted") {
        handleJourneyVisibility();
      }
    }, true);

    handleJourneyVisibility();
    document.addEventListener("nav", handleJourneyVisibility);
  })();
`