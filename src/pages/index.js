import React from 'react';
import { graphql } from 'gatsby';

import Layout from '../components/layout';

export default ({ data, location }) => {
    const { allMarkdownRemark } = data;

    const html = allMarkdownRemark.edges[0].node.html;

    return (
        <Layout centerContent={true} pageTitle={"Home"} location={location} crumbLabel={"Home"}>
            <main dangerouslySetInnerHTML={{__html: html}} />
        </Layout>
    );

}

export const query = graphql`
    query {
        allMarkdownRemark (
        filter: { fileAbsolutePath: {regex : "\/index/"} }
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
