import React from 'react';
import { Link } from 'gatsby';

import styles from './lecture-card.module.scss';

export default (props) => {
    return (
    <Link to={props.slug}>
        <section className={styles.card}>
            <h2>{props.title}</h2>
            <p>{props.topics}</p>
        </section>
    </Link>
    );
}