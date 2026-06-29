import { QuartzComponentConstructor, QuartzComponentProps } from "./types"
import readingTime from "reading-time"

function MMReadTime({ fileData, displayClass }: QuartzComponentProps) {
  const text = (fileData.text as string) || ""

  // 1. Explicit skip via frontmatter toggle
  const isExplicitlyHidden = fileData.frontmatter?.readTimeMM === false
  
  
  // If it's explicitly hidden, or has no text, mute it
  if (isExplicitlyHidden || !text) {
    return null
  }

  const { minutes } = readingTime(text)
  const stats = Math.ceil(minutes)

  return (
    <div className={`mm-read-time ${displayClass ?? ""}`}>
      <p style={{ fontSize: "0.87rem", color: "var(--gray)", margin: "0" }}>
        {stats} min read
      </p>
    </div>
  )
}

export default (() => MMReadTime) satisfies QuartzComponentConstructor