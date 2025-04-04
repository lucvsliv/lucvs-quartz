import { pathToRoot } from "../util/path"
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"
import { i18n } from "../i18n"

const PageTitle: QuartzComponent = ({ fileData, cfg, displayClass }: QuartzComponentProps) => {
  const title = cfg?.pageTitle ?? i18n(cfg.locale).propertyDefaults.title
  const baseDir = pathToRoot(fileData.slug!)

  const handleClick = () => {
    window.location.href = baseDir
  }

  return (
    <div class={classNames(displayClass, "page-title")}>
      <div class="page-title-text" onClick={handleClick}>
        {title}
      </div>
    </div>
  )
}

PageTitle.css = `
.page-title-text {
  font-family: "Quintessential";
  font-weight: bold;
  color: var(--dark);
  font-size: 3.30rem;
  margin: 0;
  cursor: pointer;
  text-decoration: none;
}
`

export default (() => PageTitle) satisfies QuartzComponentConstructor
