import React from 'react';
import classes from './Button.css'

const button = (props) => {
	return (
		<button disabled={props.disabled} className={[classes.Button, classes[props.btn], classes[props.customStyle]].join(' ')}
			onClick={props.clicked}>{props.children}</button>
	);
}

export default button;