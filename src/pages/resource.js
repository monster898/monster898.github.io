import * as React from "react"
import { graphql } from "gatsby"
import Seo from "../components/seo"
import Layout from "../components/layout"

const Resource = ({ data }) => {
  return (
    <Layout>
      <Seo title="resource" />
      <section
        dangerouslySetInnerHTML={{
          __html: data.allMarkdownRemark.nodes[0].html,
        }}
      />
    </Layout>
  )
}

export const queryAbout = graphql`
  {
    allMarkdownRemark(filter: { fields: { slug: { eq: "/resource/" } } }) {
      nodes {
        html
      }
    }
  }
`

export default Resource
