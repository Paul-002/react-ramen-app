import React from 'react';
import classes from './Spinner.css'

const spinner = (props) => {
	return (
		<div className={classes.SpinnerContainer}>
			<div className={classes.Spinner}>{props.children}</div>
		</div>
	);
}

export default spinner;