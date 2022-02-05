import * as React from "react"
import Layout from "../components/layout"
import Seo from "../components/seo"
import { graphql, Link } from "gatsby"

const Tags = ({ data }) => {
  const tagGroup = data.allMarkdownRemark.group
  return (
    <Layout>
      <Seo title="Tags" description="站点所有文章分类" />
      <h1 style={{ color: "#005b99", marginBottom: `4rem` }}>分类:</h1>
      <ol style={{ listStyle: `none` }}>
        {tagGroup.length > 0 &&
          tagGroup.map(tag => (
            <li key={tag.fieldValue}>
              <article
                className="post-list-item"
                itemScope
                itemType="http://schema.org/Article"
              >
                <header>
                  <h2>
                    <Link to={tag.fieldValue} itemProp="url">
                      <span itemProp="headline">{`${tag.fieldValue}(${tag.pageInfo.totalCount})`}</span>
                    </Link>
                  </h2>
                </header>
              </article>
            </li>
          ))}
      </ol>
    </Layout>
  )
}

export const pageQuery = graphql`
  {
    allMarkdownRemark(limit: 1000) {
      group(field: frontmatter___tags) {
        fieldValue
        pageInfo {
          totalCount
        }
      }
    }
  }
`
export default Tags
