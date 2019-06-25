import React from "react";
import classes from "./NavBar.css";
import NavItems from "./NavItems/NavItems";
import MenuButton from './NavItems/MenuButton/MenuButton'
import Logo from "../Logo/Logo";


const navBar = (props) => {
  return (
    <header className={classes.NavBar}>
      <MenuButton clickTheBurgerButton={props.clickTheBurgerButton} />  {/* show BurgerButton < 500 */}
      <div className={classes.LogoContainer}>
        <Logo /> {/* show logo < 500 */}
      </div>
      <nav className={classes.NavBox}>
        <NavItems isAuth={props.isAuth} />  {/* show NavItems > 500 */}
      </nav>
    </header>
  );
};

export default navBar;
