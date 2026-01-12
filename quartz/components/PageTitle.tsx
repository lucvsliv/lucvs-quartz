import { pathToRoot } from "../util/path"
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"
import { i18n } from "../i18n"

const PageTitle: QuartzComponent = ({ fileData, cfg, displayClass }: QuartzComponentProps) => {
  const title = cfg?.pageTitle ?? i18n(cfg.locale).propertyDefaults.title
  const baseDir = pathToRoot(fileData.slug!)
  return (
    <div class={classNames(displayClass, "page-title")}>
      <div class="page-title">
        <a href={baseDir}>{title}</a>
      </div>
    </div>
  )
}

PageTitle.css = `
.page-title {
  text-align: center;
}

.page-title a {
  font-size: 2.5rem;
  margin: 0;
  font-family: optima;
  color: #444;
}
`


export default (() => PageTitle) satisfies QuartzComponentConstructor
