import * as React from "react"
import { Link } from "gatsby"
import sun from "../images/sun.png"
import moon from "../images/moon.png"
import Toggle from "./Toggle"

const Layout = ({ location, title, children }) => {
  const [theme, setTheme] = React.useState({ theme: null })

  React.useEffect(() => {
    console.log(window.__theme)
    setTheme({ theme: window.__theme })
    window.__onThemeChange = () => {
      setTheme({ theme: window.__theme })
    }
  }, [theme.theme])
  return (
    <div className="global-wrapper">
      <header className="header">
        <div className="header__top">
          <Link className="header__title" to="/">
            Hao Chen's blog
          </Link>
          <div className="header__toggle">
            <Toggle
              icons={{
                checked: (
                  <img
                    src={moon}
                    width="16"
                    height="16"
                    role="presentation"
                    style={{ pointerEvents: "none" }}
                  />
                ),
                unchecked: (
                  <img
                    src={sun}
                    width="16"
                    height="16"
                    role="presentation"
                    style={{ pointerEvents: "none" }}
                  />
                ),
              }}
              checked={theme.theme === "dark"}
              onChange={e =>
                window.__setPreferredTheme(e.target.checked ? "dark" : "light")
              }
            />
          </div>
        </div>
        <ul className="header__tags">
          <li>
            <Link to="/">notes</Link>
          </li>
          <li>
            <Link to="/">Coding365</Link>
          </li>
          <li>
            <Link to="/">分类</Link>
          </li>
          <li>
            <Link to="/">珍藏资料</Link>
          </li>
          <li>
            <a href="https://github.com/monster898">Github</a>
          </li>
          <li>
            <Link to="/">About</Link>
          </li>
          <li>
            <a href="./rss.xml">RSS</a>
          </li>
        </ul>
        <div className="header__line"></div>
      </header>
      <main>{children}</main>
      <footer>
        <div className="header__line"></div>
        <div className="footer__content">
          <span>
            © {new Date().getFullYear()} Hao Chen, Built with
            {` `}
            <a href="https://www.gatsbyjs.com">Gatsby</a>
          </span>
          <span>email:hey@haochen.me</span>
        </div>
      </footer>
    </div>
  )
}

export default Layout
