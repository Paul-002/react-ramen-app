import React from "react";
import classes from "./Buttons.css";
import Aux from '../../hoc/auxiliary'

const buttons = props => {

  let newClass = [classes.Count, classes.Hidden];
  if (props.count) {
    newClass = [classes.Count];
  }

  return (
    <Aux>
      <div className={classes.ButtonConteinerRow}>
        <div className={`${classes.Label} ${classes[props.section]}`}
        >
          {props.label}
        </div>
        <button
          className={classes.Button}
          onClick={props.addCount}
          disabled={props.addDisabled}
        >
          +
        </button>
        <button
          className={classes.Button}
          onClick={props.removeCount}
          disabled={props.subDisabled}
        >
          -
        </button>
        <div className={newClass.join(' ')}>{props.count}</div>
        {/* second version
        <div
          className={`${classes.Count} ${!props.count ? classes.Hidden : ''}`}
        >
          {props.count}
        </div>
        */}
      </div>
    </Aux>
  );
};

export default buttons;
