import React from 'react';
import { NavLink } from 'react-router-dom';
import classes from './NavigationItem.css';

const navigationItem = (props) => {
    return (
        <ul className={classes.NavigationItem}>
            <NavLink
                to={props.link}
                exact
                activeClassName={classes.active}>{props.children}</NavLink>
        </ul>
    )
}

export default navigationItem;
