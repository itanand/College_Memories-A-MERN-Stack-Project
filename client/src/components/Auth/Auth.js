import React, {useState} from 'react'
import { Avatar,Container, Paper,Button, Grid, Typography} from '@material-ui/core';
import LockOutLinedIcon from '@material-ui/icons/LockOutlined';
import { GoogleLogin } from 'react-google-login';
import { useDispatch } from 'react-redux';

import useStyles from './styles';
import Input from './Input';
import Icon from './icon';


const Auth = () => {
   const classes = useStyles();
   const dispatch = useDispatch();
   
   const [showPassword, setShowPassword] = useState(false);
   const [isSignup, setIsSignup] = useState(false);

   
   const handleShowPassword = () => 
       setShowPassword(
           (prevShowPassword)  => !prevShowPassword );

   const handleSubmit = () => {
       
   };

   const handleChange = () => {

   }
   const switchMode = () => {
      setIsSignup((prevIsSignup) => !prevIsSignup);
      handleShowPassword(false);
    }
    const googleSuccess = async (res) => {
       const result = res?.profileObj; //undefined optional chaining operator
       const token = res?.tokenId;

       try{
          dispatch({ type: 'AUTH', data: {result, token} });
       }
       catch(error){
          console.log(error);
       }
    };
    const googleFailure = (error) => {
      console.log(error);
      console.log("Google Sign In was unsuccessful. Try again later");
    };
    return (
       <Container component="main" maxWidth="xs">
           <Paper className={classes.paper} elevation={3}>
               <Avatar className={classes.avatar}>
                   <LockOutLinedIcon />
               </Avatar>
               <Typography variant="h5">{isSignup ? 'Sign Up' : 'Sign In'}</Typography>
               <form className={classes.form} onSubmit={handleSubmit}>
                 <Grid container spacing={2}>
                       {
                           isSignup && (
                               <>
                               <Input name="firstName" label="First Name" handlechange={handleChange} autoFocus half />
                               <Input name="lastName" label="Last Name" handlechange={handleChange} half />
                               </>
                           )
                       }
                       <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
                       <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword} />
                       {isSignup && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" />}
                 </Grid>
                 <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                     {isSignup ? 'Sign Up' : 'Sign In'}
                 </Button>
                 <GoogleLogin clientId="659154986721-1qoce4f21j8i3rn12ftdr148gjt95r0e.apps.googleusercontent.com"
                 render={(renderProps) => (
                    <Button 
                     className={classes.googleButton} 
                     color="primary" 
                     fullWidth 
                     onClick={renderProps.onClick} 
                     disabled={renderProps.disabled} 
                     startIcon={<Icon />} 
                     variant="contained"

                    >
                      Google Sign In
                    </Button>
                 )}
                 onSuccess = {googleSuccess}
                 onFailure= {googleFailure}
                 cookiePolicy="single_host_origin"/>
                 <Grid container justify="flex-end">
                        <Grid item>
                          <Button onClick={switchMode} >
                              {isSignup ? 'Already have an account? Sign In': "Don't have an account? Sign Up"}
                          </Button>
                        </Grid>
                 </Grid>
               </form>
           </Paper>
       </Container>
    )
}

export default Auth
