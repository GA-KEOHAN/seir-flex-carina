import React from "react"
import { graphql, Link } from "gatsby"

import Layout from "../components/layout"

import styles from "../styles/course-content-display.module.scss"

export default ({ data, location }) => {
  const { allMarkdownRemark } = data

  const weekTwentyFourLessons = allMarkdownRemark.edges
    .filter(({ node }) => node.frontmatter.week === 24)
    .map(({ node }) => (
      <Link to={node.fields.slug}>
        <h2 className={styles.dayTitle} key={node.fields.id}>
          {node.frontmatter.title}
          <small className={styles.smallText}>
            {" "}
            - {node.frontmatter.topics}
          </small>
        </h2>
      </Link>
    ))

  const weekTwentyFiveLessons = allMarkdownRemark.edges
    .filter(({ node }) => node.frontmatter.week === 25)
    .map(({ node }) => (
      <Link to={node.fields.slug}>
        <h2 className={styles.dayTitle} key={node.fields.id}>
          {node.frontmatter.title}
          <small className={styles.smallText}>
            {" "}
            - {node.frontmatter.topics}
          </small>
        </h2>
      </Link>
    ))

  return (
    <Layout
      centerContent={true}
      pageTitle="Capstone Essentials"
      location={location}
      crumbLabel={"Capstone Essentials"}
    >
      <h1>Capstone Essentials</h1>
      <main>
        <h2>Week 24 - Capstone Project Week</h2>
        {weekTwentyFourLessons}
        <br />
        <hr />
        <br />
        <h2>Week 25 - Graduation Week</h2>
        {weekTwentyFiveLessons}
        <br />
        <hr />
        <br />
      </main>
    </Layout>
  )
}

export const query = graphql`
  query {
    allMarkdownRemark(
      filter: {
        frontmatter: {
          track: { eq: "Capstone Essentials" }
          type: { eq: "homepage" }
        }
      }
      sort: { fields: [frontmatter___week, frontmatter___day] }
    ) {
      edges {
        node {
          id
          fields {
            slug
          }
          frontmatter {
            track
            title
            week
            day
            type
            topics
          }
        }
      }
    }
  }
`
