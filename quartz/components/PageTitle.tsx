import { i18n } from "../i18n"
import { QuartzComponentConstructor, QuartzComponentProps } from "./types"

function PageTitle({ fileData, cfg, displayClass }: QuartzComponentProps) {
  const title = cfg?.pageTitle ?? i18n(cfg.locale).propertyDefaults.title
  
  // Manually joining the classes to bypass the utility resolution error
  const containerClass = displayClass ? `page-title ${displayClass}` : "page-title"

  return (
    <h1 class={containerClass}>
      <a href="/">
        <img src="static/logo.png" alt="MNKY Math Logo" />
      </a>
    </h1>
  )
}

PageTitle.css = `
.page-title {
  margin: 0;
}

.page-title a {
  display: flex;
  align-items: center;
  text-decoration: none;
  gap: 0.8rem;
}

.page-title img {
  height: 3.5rem;
  width: auto;
  border-radius: 4px;
}
`

export default (() => PageTitle) satisfies QuartzComponentConstructor