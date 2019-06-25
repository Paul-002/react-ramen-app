import React from 'react';
import classes from './SubmitButton.css'

const submitButton = (props) => {
	return (
		<div className={classes.ButtonContainer}>
			<button
				disabled={props.disabled}
				className={classes.SubmitButton}
				onClick={props.showModal}
			>
				{props.onlyForUsers ? 'My order' : 'Sign in/up to continue'}
			</button>
		</div>
	);
}

export default submitButton;