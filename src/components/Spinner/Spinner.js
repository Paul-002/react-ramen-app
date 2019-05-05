import React from 'react';
import classes from './Spinner.css'

const spinner = (props) => {
    return (
        <div className={classes.Spinner}>{props.children}</div>
    );
}

export default spinner;