import React, {useState, useEffect} from 'react';
import {AppBar, Avatar, Toolbar, Typography, Button} from '@material-ui/core';
import useStyles from './styles';
import {Link} from 'react-router-dom';
import memories from '../../images/memories.png';

const Navbar = () => {

      const classes = useStyles();
      const [user, setUser ]= useState(JSON.parse(localStorage.getItem('profile')));
      console.log(user);
     
    return (
        <div>
            <AppBar className={classes.appBar} position="static" color="inherit">
                <div className={classes.brandContainer} >
                   <Typography component={Link} to="/" className={classes.heading} variant="h3" align="center">College Memories</Typography>
                   <img className={classes.image} src={memories} alt="icon" height="60" />
                </div>
                <Toolbar className={classes.toolbar}>
                 {user ? (
                  <div className={classes.profile}>
                      <Avatar className={classes.purple} alt={user.result.name} src={user.result.imgUrl}>{user.result.name.charAt(0)}</Avatar>
                      <Typography className={classes.userName} variants="h6">{user.result.name}</Typography>
                      <Button variant="contained" className={classes.logout} color="secondary">Logout</Button>
                  </div>
                 ): (
                   <Button component={Link} to="/auth" variant="contained" color="primary">SignIn</Button>
                 )}
                </Toolbar>
            </AppBar>
        </div>
    )
}

export default Navbar
