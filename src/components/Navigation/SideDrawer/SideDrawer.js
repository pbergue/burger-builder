import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../../Navigation/NavigationItems/NavigationItems';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Auxiliary from '../../../hoc/Auxiliary';
import classes from './SideDrawer.module.css';

const sideDrawer = props => {
  return (
    <Auxiliary>
      <Backdrop show={props.show} exit={props.exit}/>
      <div className={`${classes.SideDrawer} ${props.show ? classes.Open : classes.Close}`}>
        <div className={classes.Logo}>
          <Logo />
        </div>
        <nav>
          <NavigationItems />
        </nav>
      </div>
    </Auxiliary>
  );
};

export default sideDrawer;
