import { i18n } from "../i18n"
import { classNames } from "../util/classNames"
import { QuartzComponentConstructor, QuartzComponentProps } from "./types"

function PageTitle({ fileData, cfg, displayClass }: QuartzComponentProps) {
  const title = cfg?.pageTitle ?? i18n(cfg.locale).propertyDefaults.title
  return (
    <h1 class={classNames(displayClass, "page-title")}>
      <a href="/">
        <img src="/static/logo.png" alt="MNKY Math Logo" />
        {title}
      </a>
    </h1>
  )
}

PageTitle.css = `
.page-title {
  margin: 0;
  display: flex;
  align-items: center;
  gap: 0.8rem;
}

.page-title a {
  display: flex;
  align-items: center;
  text-decoration: none;
}

.page-title img {
  height: 2.5rem;
  width: auto;
  border-radius: 4px;
}
`

export default (() => PageTitle) satisfies QuartzComponentConstructor
