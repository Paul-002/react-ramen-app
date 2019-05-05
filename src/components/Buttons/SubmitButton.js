import React from 'react';
import classes from './SubmitButton.css'

const submitButton = (props) => {
    return (
        <div className={classes.ButtonContainer}>
            <button className={classes.SubmitButton} onClick={props.showModal}>Go to summary</button>
        </div>
    );
}

export default submitButton;