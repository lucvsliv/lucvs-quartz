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
  color: #00ffaa;
  text-shadow: 0 0 5px #00ffaa, 0 0 10px #00ddff, 0 0 20px #0099ff, 0 0 40px #0066ff;
  animation: flicker 2s infinite alternate;
  background: linear-gradient(45deg, #00ffaa, #00ddff, #0099ff, #0066ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  display: inline-block;
  transition: font-size 0.2s ease, text-shadow 0.3s ease;
}

.page-title a:hover {
  font-size: 3.3rem;
  text-shadow: 0 0 10px #00ffcc, 0 0 20px #00ffff, 0 0 30px #00ffaa, 0 0 50px #00ff99;
}

@keyframes flicker {
  0% { 
    opacity: 1; 
    text-shadow: 0 0 5px #00ffaa, 0 0 10px #00ddff, 0 0 20px #0099ff, 0 0 40px #0066ff;
  }
  50% { 
    opacity: 0.8; 
    text-shadow: 0 0 5px #00ddff, 0 0 10px #00ffaa, 0 0 30px #00ff99, 0 0 50px #00ff66;
  }
  100% { 
    opacity: 1; 
    text-shadow: 0 0 10px #00ff99, 0 0 20px #00ffaa, 0 0 40px #00ffcc, 0 0 60px #00ffff;
  }
}
`


export default (() => PageTitle) satisfies QuartzComponentConstructor
