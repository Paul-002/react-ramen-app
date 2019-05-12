import React from "react";
import Aux from "../hoc/auxiliary";
import Buttons from "../components/Buttons/Buttons";
import classes from "./ButtonsSection.css"

const ingredients = [
  { name: "Chicken", type: "chicken", section: 'Meat' },
  { name: "Duck", type: "duck", section: 'Meat' },
  { name: "Pork", type: "pork", section: 'Meat' },
  { name: "Mun", type: "mun", section: 'Mushrooms' },
  { name: "Shiitake", type: "shiitake", section: 'Mushrooms' },
  { name: "Reishi", type: "reishi", section: 'Mushrooms' },
  { name: "Wakame", type: "wakame", section: 'Other' },
  { name: "Egg", type: "egg", section: 'Other' },
  { name: "Onion", type: "onion", section: 'Other' }
];

const buttonsSection = props => (
  <Aux>
    <div className={classes.ButtonSectionContainer}>
      {ingredients.map(item => (
        <Buttons
          addCount={() => props.addCount(item.type)}
          removeCount={() => props.removeCount(item.type)}
          label={item.name}
          key={item.name}
          count={props.count[item.type]}
          subDisabled={props.disabled[item.type].subButton} //minus button 
          section={item.section}
          addDisabled={props.disabled[item.type].addButton} //plus button
        >
          {item.name}
        </Buttons>
      ))}
    </div>
  </Aux>
);

export default buttonsSection;