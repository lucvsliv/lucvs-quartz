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
  font-weight: bold;
  color: #109872;
  font-size: 2.00rem;
  margin: 0;
}
.page-title a {
  text-decoration: none;
  color: inherit; /* 링크 색상을 부모의 색상(#109872)과 동일하게 설정 */
}
`


export default (() => PageTitle) satisfies QuartzComponentConstructor
