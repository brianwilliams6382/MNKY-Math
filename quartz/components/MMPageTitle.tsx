import { QuartzComponentConstructor, QuartzComponentProps } from "./types"

function PageTitle({ displayClass }: QuartzComponentProps) {
  // Logic: Create the class string for the header and Use className instead of class to satisfy the TS compiler
  const containerClass = displayClass ? `page-title ${displayClass}` : "page-title"

  return (
    <h1 className={containerClass}>
      <a href="/">
        {/* We keep this tag clean so custom.scss handles all sizing */}
        <img src="/static/logo_26.png" alt="MNKY Math Logo" />
      </a>
    </h1>
  )
}

// We leave this empty or remove it so that custom.scss has total authority
PageTitle.css = ``

export default (() => PageTitle) satisfies QuartzComponentConstructor