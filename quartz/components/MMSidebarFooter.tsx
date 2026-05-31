import { QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { version } from "../../package.json"

const ICONS = {
  github: (<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>),
  linkedin: (<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>),
}

export default ((opts?: { links: Record<string, string> }) => {
  function MMSidebarFooter() {
    const year = new Date().getFullYear()
    const links = opts?.links ?? {}
    return (
      <div className="mm-sidebar-footer">
        <p className="mm-copyright">MNKY Math © {year}</p>
        <ul className="mm-social-links">
          {Object.entries(links).map(([platform, link]) => (
            <li key={platform}>
              <a href={link} target="_blank" rel="noopener noreferrer" aria-label={platform}>
                {ICONS[platform.toLowerCase() as keyof typeof ICONS] || platform}
              </a>
            </li>
          ))}
        </ul>
        <p className="mm-quartz-version">Created with Quartz v{version}</p>
      </div>
    )
  }

  MMSidebarFooter.css = `
  .mm-sidebar-footer {
    margin-top: auto; /* Pushes it to the bottom of the sidebar */
    padding-top: 2rem;
    border-top: 1px solid var(--lightgray);
  }
  .mm-copyright { font-size: 0.94rem; font-weight: 600; margin: 0; }
  .mm-social-links { list-style: none; padding: 0; margin: 0.5rem 0; display: flex; gap: 1rem; }
  .mm-social-links a { color: #ddabaf; transition: color 0.3s ease; }
  .mm-social-links a:hover { color: #832632 !important; }
  .mm-quartz-version { font-size: 0.7rem; color: var(--darkgray); opacity: 0.5; }
  `
  return MMSidebarFooter
}) satisfies QuartzComponentConstructor