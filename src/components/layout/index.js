import React, { Fragment } from 'react';
import { useStaticQuery, graphql } from 'gatsby'

import Head from '../head/';
import NavBar from '../responsiveNav';
import Footer from '../footer';

import { Breadcrumb } from 'gatsby-plugin-breadcrumb'

import '../../styles/base.scss';

import styles from './layout.module.scss';

export default ({
        centerContent, 
        pageTitle, 
        children, 
        location, 
        crumbLabel }) => {

        const { site } = useStaticQuery(graphql`
        query {
            site {
                siteMetadata {
                    title
                    navigationLinks {
                        title
                        slug
                    }
                    homeworkSubmissionLink {
                        title
                        href
                    }
                }
            }
        }
    `);

    return (
        <Fragment>
            <Head pageTitle={pageTitle} />
            <div className={styles.outerContainer}>
                <NavBar 
                    title={site.siteMetadata.title}
                    navigationLinks={site.siteMetadata.navigationLinks}
                    homeworkSubmissionLink={site.siteMetadata.homeworkSubmissionLink}
                />
                <div 
                    style={centerContent ? {margin: '0 auto'} : {}}
                    className={styles.innerContainer}>
                    <div className={styles.breadContainer}>
                        <Breadcrumb 
                            location={location} 
                            crumbLabel={crumbLabel}
                            crumbStyle={{ color: "#000" }}
                            crumbActiveStyle={{ color: "crimson" }} 
                        />
                    </div>
                    { children }
                </div>
                <Footer />
            </div>
        </Fragment>
    );
}