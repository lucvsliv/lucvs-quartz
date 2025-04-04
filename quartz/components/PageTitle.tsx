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
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');

.page-title {
  font-family: 'Roboto', sans-serif; /* 구글 폰트 적용 */
  font-weight: bold;
  color: var(--dark);
  font-size: 3.30rem;
  margin: 0;
}

.page-title a {
  text-decoration: none;
  color: inherit;
}
`

export default (() => PageTitle) satisfies QuartzComponentConstructor
