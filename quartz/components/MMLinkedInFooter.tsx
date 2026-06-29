import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"

export default (() => {
  const MMLinkedInFooter: QuartzComponent = ({ fileData, displayClass }: QuartzComponentProps) => {
    const linkedinURL = fileData.frontmatter?.linkedinURL as string | undefined

    if (!linkedinURL) {
      return null
    }

    return (
      <div className={classNames(displayClass, "mm-engagement-footer")}>
        <h3>Join the Equation</h3>
        <p>
          MNKY Math is a place to question, connect, and co-create around the systems shaping modern work, behavior, and outcomes.
        </p>
        <p>
          If this piece gave you something to notice, challenge, or extend, add your voice to the companion discussion on{" "}
          <a href={linkedinURL} target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>.
        </p>
        <p className="mm-footer-closing-tag">The more minds in the equation, the better the outcome.</p>
      </div>
    )
  }

// Visual tuning contained within the component
  MMLinkedInFooter.css = `
    .mm-engagement-footer {
      width: 86% !important;
      margin-left: auto !important;
      margin-right: auto !important;
      margin-top: 1.0rem !important;
      margin-bottom: 1.0rem !important;
      padding: 1.3rem 1.3rem!important;
      border-radius: 1px !important;
      border: none !important; 
      background-color: rgba(10, 102, 194, 0.12) !important;
    }

    .mm-engagement-footer h3 {
      font-family: var(--headerFont) !important;
      font-size: 1.25rem !important;
      font-weight: 700 !important;
      letter-spacing: 0.2rem !important;
      margin-top: 0 !important;
      margin-bottom: 0.75rem !important;
      color: var(--darkgray) !important;
    }

    .mm-engagement-footer p {
      font-family: var(--bodyFont) !important;
      font-size: 0.87rem !important;
      line-height: 1.25 !important;
      color: var(--darkgray) !important;
      margin-bottom: 1.0rem !important;
    }

    .mm-engagement-footer p:last-of-type {
      margin-bottom: 0 !important; 
    }

    .mm-engagement-footer a {
      color: var(--secondary) !important;
      text-decoration: underline !important;
      font-weight: 600 !important;
    }

    .mm-engagement-footer a:hover {
      color: var(--tertiary) !important;
    }

    .mm-engagement-footer .mm-footer-closing-tag {
      font-style: italic !important;
      font-weight: bold !important;
      font-size: 0.88rem !important;
      color: var(--darkgray) !important;
      margin-top: 1.5rem !important;
    }
  `

  return MMLinkedInFooter
}) satisfies QuartzComponentConstructor