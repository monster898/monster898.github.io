import * as React from "react"
import Layout from "../components/layout"
import Seo from "../components/seo"
import { Link } from "gatsby"

const TagTemplate = ({ pageContext: { data: posts, fieldValue } }) => {
  return (
    <Layout>
      <Seo title={`tag:${fieldValue}`} />
      <h1
        style={{ color: "#005b99", marginBottom: `4rem` }}
      >{`${fieldValue}:`}</h1>
      <ol style={{ listStyle: `none` }}>
        {posts.map(post => {
          const title = post.frontmatter.title || post.fields.slug

          return (
            <li key={post.fields.slug}>
              <article
                className="post-list-item"
                itemScope
                itemType="http://schema.org/Article"
              >
                <header>
                  <h2>
                    <Link
                      to={post.fields.slug}
                      itemProp="url"
                      state={{ isShowOtherPageLink: false }}
                    >
                      <span itemProp="headline">{title}</span>
                    </Link>
                  </h2>
                  <small>{`${post.frontmatter.date} • ${post.timeToRead} min read`}</small>
                </header>
              </article>
            </li>
          )
        })}
      </ol>
    </Layout>
  )
}

export default TagTemplate
