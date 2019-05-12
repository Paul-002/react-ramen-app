import React from 'react';
import classes from './SubmitButton.css'

const submitButton = (props) => {
	return (
		<div className={classes.ButtonContainer}>
			<button disabled={props.disabled} className={classes.SubmitButton} onClick={props.showModal}>My order</button>
		</div>
	);
}

export default submitButton;