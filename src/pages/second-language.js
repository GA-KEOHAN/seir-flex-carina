import React from "react"
import { graphql, Link } from "gatsby"

import Layout from "../components/layout"

import styles from "../styles/course-content-display.module.scss"

export default ({ data, location }) => {
  const { allMarkdownRemark } = data



  const weekNineteenLessons = allMarkdownRemark.edges
    .filter(({ node }) => node.frontmatter.week === 19)
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

  const weekTwentyLessons = allMarkdownRemark.edges
    .filter(({ node }) => node.frontmatter.week === 20)
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

  const weekTwentyOneLessons = allMarkdownRemark.edges
    .filter(({ node }) => node.frontmatter.week === 21)
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

  const weekTwentyTwoLessons = allMarkdownRemark.edges
    .filter(({ node }) => node.frontmatter.week === 22)
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

  const weekTwentyThreeLessons = allMarkdownRemark.edges
    .filter(({ node }) => node.frontmatter.week === 23)
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

  const weekTwentySixLessons = allMarkdownRemark.edges
    .filter(({ node }) => node.frontmatter.week === 26)
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
      pageTitle="Second Language"
      location={location}
      crumbLabel={"Second Language"}
    >
      <h1>Second Language</h1>
      <main>
        <h2>Week 19</h2>
        {weekNineteenLessons}
        <br />
        <hr />
        <br />
        <h2>Week 20</h2>
        {weekTwentyLessons}
        <br />
        <hr />
        <br />
        <h2>Week 21</h2>
        {weekTwentyOneLessons}
        <br />
        <hr />
        <br />
        <h2>Week 22</h2>
        {weekTwentyTwoLessons}
        <br />
        <hr />
        <br />
        <h2>Week 23</h2>
        {weekTwentyThreeLessons}
        <br />
        <hr />
        <br />
        <h2>Project Week</h2>
        {weekTwentyFourLessons}
        <br />
        <hr />
        <br />
        <h2>Final Project - Week 24</h2>
        {weekTwentyFourLessons}
        <br />
        <hr />
        <br />
        <h2>Final Project - Week 25</h2>
        {weekTwentyFiveLessons}
        <br />
        <hr />
        <br />
        <h2>Graduation Week - Week 26</h2>
        {weekTwentySixLessons}

     
      </main>
    </Layout>
  )
}

export const query = graphql`
  query {
    allMarkdownRemark(
      filter: {
        frontmatter: {
          track: { eq: "Second Language" }
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