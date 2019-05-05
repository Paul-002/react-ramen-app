import React from "react";
import classes from "./Buttons.css";
import Aux from '../../hoc/auxiliary'

const buttons = props => {
  return (
    <Aux>
      <div className={classes.ButtonConteiner}>
        <div className={`${classes.Label} ${classes[props.section]}`}> {props.label} </div>
        <button className={classes.Button} onClick={props.addCount}> Plus </button>
        <button className={classes.Button} onClick={props.removeCount} disabled={props.disabled}> Minus </button>
        <div className={classes.Count}>{props.count}</div>
      </div>
    </Aux>
  );
};

export default buttons;
