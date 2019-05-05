import React from 'react';
import Aux from '../../hoc/auxiliary';
import classes from './Input.css'

const input = (props) => {
	let input = null;
	const checkboxClass = [classes.InputCheckbox]
	const InvalidClass = [classes.FormInput];

	if (props.valid && props.touch) {
		InvalidClass.push(classes.Invalid)
	}

	InvalidClass.push(classes.Valid)

	switch (props.inputtype) {
		case 'input':
			input = <input
				className={InvalidClass.join(' ')}
				onChange={props.change}
				type={props.inputtype}
				name={props.name}
				placeholder={props.placeholder} />
			break;

		case 'checkbox':
			input = <label className={classes.CheckboxLabel}>
				<input
					className={checkboxClass}
					onChange={props.change}
					type={props.inputtype}
					name={props.name}>
				</input>
				{props.label}
			</label>
			break;

		default:
			alert('something wrong');
	}

	return (
		<Aux>
			{input}
		</Aux>
	);
}

export default input;