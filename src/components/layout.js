import * as React from "react"
import { Link } from "gatsby"
import sun from "../images/sun.png"
import moon from "../images/moon.png"
import Toggle from "./Toggle"
import { useStaticQuery, graphql } from "gatsby"

const Layout = ({ children }) => {
  const data = useStaticQuery(
    graphql`
      {
        site {
          siteMetadata {
            description
            github
            email
          }
        }
      }
    `
  )

  const [theme, setTheme] = React.useState({ theme: null })
  const description = data.site.siteMetadata.description
  const githubLink = data.site.siteMetadata.github
  const email = data.site.siteMetadata.email
  const mailto = "mailto:" + email

  React.useEffect(() => {
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
            {description}
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
            <Link to="/coding365">Coding365</Link>
          </li>
          <li>
            <Link to="/tags">分类</Link>
          </li>
          <li>
            <Link to="/resource">珍藏资料</Link>
          </li>
          <li>
            <a href={githubLink}>Github</a>
          </li>
          <li>
            <Link to="/about">About</Link>
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
        <div className="footer__content" style={{ color: `#005b99` }}>
          <span>
            © {new Date().getFullYear()} Hao Chen, Built with
            {` `}
            <a href="https://www.gatsbyjs.com">Gatsby</a>
          </span>
          <a href={mailto}>email:{email}</a>
        </div>
      </footer>
    </div>
  )
}

export default Layout
