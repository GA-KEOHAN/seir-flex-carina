import React from 'react';
import { graphql, Link } from 'gatsby';

import Layout from '../components/layout';

import styles from '../styles/course-content-display.module.scss';


export default({ data, location }) => {
    
   const { allMarkdownRemark } = data;

   const weekSevenLessons = allMarkdownRemark.edges
   .filter(({ node }) => node.frontmatter.week === 7)
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

 const weekEightLessons = allMarkdownRemark.edges
   .filter(({ node }) => node.frontmatter.week === 8)
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

    const weekNineLessons = allMarkdownRemark.edges.filter(({ node }) => 
        node.frontmatter.week === 9
      ).map(({ node }) =>
        <Link to={node.fields.slug}>
          <h2 className={styles.dayTitle} key={node.fields.id}>{node.frontmatter.title}<small className={styles.smallText}> - {node.frontmatter.topics}</small></h2>
        </Link> 
      );
      const weekTenLessons = allMarkdownRemark.edges.filter(({ node }) => 
      node.frontmatter.week === 10
      ).map(({ node }) =>
      <Link to={node.fields.slug}>
          <h2 className={styles.dayTitle} key={node.fields.id}>{node.frontmatter.title}<small className={styles.smallText}> - {node.frontmatter.topics}</small></h2>
        </Link> 
      );
      
      const weekElevenLessons = allMarkdownRemark.edges.filter(({ node }) => 
        node.frontmatter.week === 11
      ).map(({ node }) =>
        <Link to={node.fields.slug}>
          <h2 className={styles.dayTitle} key={node.fields.id}>{node.frontmatter.title}<small className={styles.smallText}> - {node.frontmatter.topics}</small></h2>
        </Link> 
      );

      const weekTwelveLessons = allMarkdownRemark.edges.filter(({ node }) => 
      node.frontmatter.week === 12
    ).map(({ node }) =>
      <Link to={node.fields.slug}>
        <h2 className={styles.dayTitle} key={node.fields.id}>{node.frontmatter.title}<small className={styles.smallText}> - {node.frontmatter.topics}</small></h2>
      </Link> 
    );

    return (
        <Layout
          centerContent={true} 
          pageTitle="Full-Stack Development" 
          location={location} 
          crumbLabel={"Full-Stack Development"}>
            <h1>Full Stack Development</h1>
            <main>
            <h2>Week 7</h2>  
              { weekSevenLessons }
              <br />
              <hr />
              <br />
              <h2>Week 8</h2>  
              { weekEightLessons }
              <br />
              <hr />
              <br />
              <h2>Week 9</h2>  
              { weekNineLessons }
              <br />
              <hr />
              <br />
              <h2>Week 10</h2>  
              { weekTenLessons }
              <br />
              <hr />
              <br />
              <h2>Week 11</h2>  
              { weekElevenLessons }
              <br />
              <hr />
              <br />
              <h2>Project Week</h2>  
              { weekTwelveLessons }
            </main>
        </Layout>
    );
}

export const query = graphql`
query {
    allMarkdownRemark (
          filter: {frontmatter: {track: {eq: "Full-Stack Development"}, 
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
