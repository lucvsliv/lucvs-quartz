import { pathToRoot } from "../util/path"
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"
import { i18n } from "../i18n"

const PageTitle: QuartzComponent = ({ fileData, cfg, displayClass }: QuartzComponentProps) => {
  const title = cfg?.pageTitle ?? i18n(cfg.locale).propertyDefaults.title
  const baseDir = pathToRoot(fileData.slug!)
  return (
    <div class={classNames(displayClass, "page-title")} role="heading" aria-level="2">
      <span class="page-title-link" onClick={() => window.location.href = baseDir}>
        {title}
      </span>
    </div>
  )
}

PageTitle.css = `
.page-title {
  font-weight: bold;
  color: #109872;
  font-size: 2.00rem;
  margin: 0;
}

.page-title-link {
  cursor: pointer;
  text-decoration: none;
  color: var(--dark);
}
`


export default (() => PageTitle) satisfies QuartzComponentConstructor
