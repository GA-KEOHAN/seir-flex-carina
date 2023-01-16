import React from 'react';

import { graphql } from 'gatsby';

import Layout from '../components/layout';


export default ({ data, location }) => {
    const { markdownRemark } = data;
    return (
        <Layout
            pageTitle={markdownRemark.frontmatter.title} 
            location={location}
            crumbLabel={markdownRemark.frontmatter.title}
        >
            <main dangerouslySetInnerHTML={{ __html: markdownRemark.html }}/>
        </Layout>
    );
};

export const query = graphql`
    query($slug: String!) {
        markdownRemark (fields: { slug: { eq: $slug }}) {
            html 
            frontmatter {
                title
            }
        }
    }
`;