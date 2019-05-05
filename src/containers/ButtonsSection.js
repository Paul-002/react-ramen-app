import React from "react";
import Aux from "../hoc/auxiliary";
import Buttons from "../components/Buttons/Buttons";
//import { withRouter } from 'react-router-dom';

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
    {ingredients.map(item => (
      <Buttons
        addCount={() => props.addCount(item.type)}
        removeCount={() => props.removeCount(item.type)}
        label={item.name}
        key={item.name}
        count={props.count[item.type]}
        disabled={props.disabled[item.type]}
        section={item.section}
      >
        {item.name}
      </Buttons>
    ))}
  </Aux>
);

export default buttonsSection;
