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
.page-title {}

.page-title a {
  font-size: 3.2rem;
  margin: 0;
  font-family: fantasy;
  color: #0ff;
  text-shadow: 0 0 5px #0ff, 0 0 10px #0ff, 0 0 20px #00f, 0 0 40px #00f;
  animation: shake 0.5s infinite alternate;
}

@keyframes shake {
  0% { transform: rotate(-3deg) translateX(-3px); }
  100% { transform: rotate(3deg) translateX(3px); }
}
`


export default (() => PageTitle) satisfies QuartzComponentConstructor
