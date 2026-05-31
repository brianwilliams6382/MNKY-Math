import { QuartzComponentConstructor, QuartzComponentProps } from "./types"

export default (() => {
  function MMFooter({ displayClass }: QuartzComponentProps) {
    return (
      <footer className={displayClass}>
        <div className="mm-footer-end-marker">
          <span>* * *</span>
        </div>
      </footer>
    )
  }

  MMFooter.css = `
  .mm-footer-end-marker {
    text-align: center;
    color: var(--lightgray);
    letter-spacing: 1rem;
    padding: 4rem 0 2rem 0;
    font-size: 1.2rem;
  }
  `
  return MMFooter
}) satisfies QuartzComponentConstructor