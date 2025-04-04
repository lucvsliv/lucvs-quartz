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
  font-size: 3.2rem;
  margin: 0;
  font-family: 'Orbitron', sans-serif;
  color: #0ff;
  text-shadow: 0 0 5px #0ff, 0 0 10px #0ff, 0 0 20px #00f, 0 0 40px #00f;
  animation: flicker 2s infinite alternate;
}

@keyframes flicker {
  0% { opacity: 1; text-shadow: 0 0 5px #0ff, 0 0 10px #0ff, 0 0 20px #00f; }
  50% { opacity: 0.8; text-shadow: 0 0 5px #0ff, 0 0 10px #00f, 0 0 30px #00f; }
  100% { opacity: 1; text-shadow: 0 0 10px #0ff, 0 0 20px #00f, 0 0 40px #00f; }
}
`


export default (() => PageTitle) satisfies QuartzComponentConstructor
