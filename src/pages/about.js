import * as React from "react"
import { graphql } from "gatsby"
import Seo from "../components/seo"
import Layout from "../components/layout"

const About = ({ data }) => {
  return (
    <Layout>
      <Seo title="About" description="关于" />
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
    allMarkdownRemark(filter: { fields: { slug: { eq: "/about/" } } }) {
      nodes {
        html
      }
    }
  }
`

export default About
