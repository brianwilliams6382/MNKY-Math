import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"

export default (() => {
  const MMLinkedInBridge: QuartzComponent = ({ fileData, displayClass }: QuartzComponentProps) => {
    // 1. Extract the linkedin variable from frontmatter
    const linkedinURL = fileData.frontmatter?.linkedinURL as string | undefined

    // 2. Guard Rail: If no LinkedIn link is specified, render absolutely nothing
    if (!linkedinURL) {
      return null
    }

    return (
      <div className={classNames(displayClass, "mm-linkedin-bridge-top")}>
        <a href={linkedinURL} target="_blank" rel="noopener noreferrer">
         💬 Open the companion discussion on LinkedIn
        </a>
      </div>
    )
  }

  // Visual tuning contained within the component
  MMLinkedInBridge.css = `
    .mm-linkedin-bridge-top {
      margin-top: .6rem;
      margin-bottom: 1.0rem;
      padding: 0.80rem 0.6rem!important;
      border-radius: 1px !important;
      border: none !important; 
      background-color: rgba(10, 102, 194, 0.12) !important;
      font-size: 0.88rem;      
    }
    .mm-linkedin-bridge-top a {
      color: var(--darkgray);
      opacity: 0.72;
      text-decoration: none;
      font-weight: 500;
    }
    .mm-linkedin-bridge-top a:hover {
      text-decoration: underline;
      color: var(--secondary);
    }
  `

  return MMLinkedInBridge
}) satisfies QuartzComponentConstructor