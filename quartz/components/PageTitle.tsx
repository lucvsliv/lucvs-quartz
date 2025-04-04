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
  font-size: 3.30rem;
  margin: 0;
}
.page-title a {
  font-family: 'Cormorant', Times;
  font-weight: 300;
  color: var(--dark);
  text-decoration-color: #58c374;
  text-decoration-line: underline;
  text-decoration-thickness: 2px;
}
`


export default (() => PageTitle) satisfies QuartzComponentConstructor
