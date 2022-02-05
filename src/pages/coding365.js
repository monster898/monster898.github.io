import * as React from "react"
import { graphql } from "gatsby"
import Seo from "../components/seo"
import Layout from "../components/layout"

const Coding365 = ({ data }) => {
  return (
    <Layout>
      <Seo title="Coding365" />
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
    allMarkdownRemark(filter: { fields: { slug: { eq: "/coding365/" } } }) {
      nodes {
        html
      }
    }
  }
`

export default Coding365
