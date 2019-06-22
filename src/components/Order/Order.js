import React from 'react';
import classes from './Order.css'

const order = (props) => {

	let ingredientsList = (
		Object.keys(props.ingredients)
			.map(item => {
				return props.ingredients[item] ? <li key={item}>{item} : <b>{props.ingredients[item]}</b></li> : null
			})
	);

	let trueOrFalse;
	props.payment ? trueOrFalse = 'Yes' : trueOrFalse = 'No'

	return (
		<div className={classes.OrderCard}>
			<p>Name: <b>{props.name} {props.surname}</b></p>
			<p>E-mail: <b>{props.email}</b></p>
			<p>Street: <b>{props.street}</b></p>
			<p>City: <b>{props.city}</b></p>
			<p>Card payment: <b>{trueOrFalse}</b></p>
			<p>Total price: <b>{props.totalPrice}</b></p>
			<p>Ingredients: {ingredientsList}</p>
		</div>
	);
}

export default order;