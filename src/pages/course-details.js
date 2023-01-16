import React from 'react';
import { graphql } from 'gatsby';

import Layout from '../components/layout';

export default ({ data, location }) => {
    const { allMarkdownRemark } = data;

    const html = allMarkdownRemark.edges[0].node.html;
    return (
        <Layout
            pageTitle={"Home"} 
            location={location} 
            crumbLabel={"Course Details"}>
            <main dangerouslySetInnerHTML={{__html: html}} />
        </Layout>
    );

}

export const query = graphql`
    query {
        allMarkdownRemark (
        filter: { fileAbsolutePath: {regex : "\/course-details/"} }
    ) {
        edges {
            node {
                frontmatter {
                title
                }
                html
            }
        }
    }
    }
`;
