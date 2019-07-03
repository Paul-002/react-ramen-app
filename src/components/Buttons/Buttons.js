import React from 'react';
import classes from './Buttons.css';
import Aux from '../../hoc/auxiliary';

const buttons = (props) => {
  const {
    section, label, addCount, addDisabled, removeCount, subDisabled, count,
  } = props;

  let newClass = [classes.Count, classes.Hidden];
  if (count) {
    newClass = [classes.Count];
  }

  return (
    <Aux>
      <div className={classes.ButtonConteinerRow}>
        <div className={`${classes.Label} ${classes[section]}`}>
          {label}
        </div>
        <button
          type="button"
          className={classes.Button}
          onClick={addCount}
          disabled={addDisabled}
        >
          +
        </button>
        <button
          type="button"
          className={classes.Button}
          onClick={removeCount}
          disabled={subDisabled}
        >
          -
        </button>
        <div className={newClass.join(' ')}>{count}</div>

        {/* template strings version <div
          className={`${classes.Count} ${!count ? classes.Hidden : ''}`}
        >
          {count}
        </div> */}

      </div>
    </Aux>
  );
};

export default buttons;
