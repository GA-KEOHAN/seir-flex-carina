import React from 'react';
import { graphql, Link } from 'gatsby';

import Layout from '../components/layout';

import styles from '../styles/course-content-display.module.scss';


export default({ data, location }) => {
    
   const { allMarkdownRemark } = data;

   const weekThirteenLessons = allMarkdownRemark.edges.filter(({ node }) => 
   node.frontmatter.week === 13
 ).map(({ node }) =>
   <Link to={node.fields.slug}>
     <h2 className={styles.dayTitle} key={node.fields.id}>{node.frontmatter.title}<small className={styles.smallText}> - {node.frontmatter.topics}</small></h2>
   </Link> 
 );
     

    const weekFourteenLessons = allMarkdownRemark.edges.filter(({ node }) => 
        node.frontmatter.week === 14
      ).map(({ node }) =>
        <Link to={node.fields.slug}>
          <h2 className={styles.dayTitle} key={node.fields.id}>{node.frontmatter.title}<small className={styles.smallText}> - {node.frontmatter.topics}</small></h2>
        </Link> 
      );

      
      const weekFifteenLessons = allMarkdownRemark.edges.filter(({ node }) => 
      node.frontmatter.week === 15
      ).map(({ node }) =>
        <Link to={node.fields.slug}>
          <h2 className={styles.dayTitle} key={node.fields.id}>{node.frontmatter.title}<small className={styles.smallText}> - {node.frontmatter.topics}</small></h2>
        </Link> 
      );

      const weekSixteenLessons = allMarkdownRemark.edges.filter(({ node }) => 
      node.frontmatter.week === 16
      ).map(({ node }) =>
        <Link to={node.fields.slug}>
          <h2 className={styles.dayTitle} key={node.fields.id}>{node.frontmatter.title}<small className={styles.smallText}> - {node.frontmatter.topics}</small></h2>
        </Link> 
      );

      const weekSeventeenLessons = allMarkdownRemark.edges.filter(({ node }) => 
      node.frontmatter.week === 17
      ).map(({ node }) =>
        <Link to={node.fields.slug}>
          <h2 className={styles.dayTitle} key={node.fields.id}>{node.frontmatter.title}<small className={styles.smallText}> - {node.frontmatter.topics}</small></h2>
        </Link> 
      );
    
      const weekEighteenLessons = allMarkdownRemark.edges
        .filter(({ node }) => node.frontmatter.week === 18)
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
      

    return (
        <Layout
          centerContent={true} 
          pageTitle="React Fundamentals" 
          location={location} 
          crumbLabel={"React Fundamentals"}>
            <h1>React Fundamentals</h1>
            <main>
            <h2>Week 13</h2>  
              { weekThirteenLessons }
              <br />
              <hr />
              <br />
              <h2>Week 14</h2>  
              { weekFourteenLessons }
              <br />
              <hr />
              <br />
              <h2>Week 15</h2>  
              { weekFifteenLessons }
              <br />
              <hr />
              <br />
              <h2>Week 16</h2>  
              { weekSixteenLessons }
              <br />
              <hr />
              <br />
              <h2>Week 17</h2>  
              { weekSeventeenLessons }
              <br />
              <hr />
              <br />
              <h2>Week 18</h2>  
              { weekEighteenLessons }
              <br />
              <hr />
              <br />
              <h2>Week 19 - Project Week</h2>  
              { weekNineteenLessons }
            </main>
        </Layout>
    );
}

export const query = graphql`
query {
    allMarkdownRemark (
          filter: {frontmatter: {track: {eq: "React Fundamentals"}, 
          type: {eq: "homepage"}}}
            sort: {fields:  [frontmatter___week, frontmatter___day]}
        ){
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
`;