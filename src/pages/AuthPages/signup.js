import { useState } from "react";
import { Button, Card,  TextField} from "@material-ui/core"
import { makeStyles, Grid } from "@material-ui/core"
import { ThemeProvider, createTheme } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import Image from '../../assets/background.jpg'
// import { LoginSignupBtn } from "../../components";

import {
    Typography, Input, InputLabel, FormControl, FormHelperText
  } from '@material-ui/core';
  import {
    Checkbox,
    FormControlLabel,
    FormGroup,
  } from '@material-ui/core';
import axios from "axios";


const useStyles = makeStyles((theme) =>({
    main:{
        height:"auto",
        display: "flex",
        padding: "0rem 0 8rem",
        justifyContent : "center",
       // background: "linear-gradient(125deg, #873ab7, #58319c)",
        //background : "linear-gradient(123deg, blue, skyblue)",
        backgroundImage : `linear-gradient(to top,  blue, #556bd6, rgba(225,225,225, 0.7)), url(${Image})`,
        backgroundPosition: 'center',
        backgroundAttachment : 'fixed',
        backgroundSize: 'cover',
        //objectFit: "cover",
        backgroundRepeat: "no-repeat"
        
    },
    pageTite:{
        textAlign : "center",
        fontSize:"1.3rem",
        // color : "#fff"
    },
    signupForm:{
        // marginTop: "3rem",
        height: "auto",
        // padding: "1rem",
        width: "100%",
        // display: "flex",
        // justifyContent : "center",
        //background: "blue",
        [theme.breakpoints.down('xs')]:{
            width : "100%"
        },
        // '&:hover':{
        //     background:"#fff",
        //     color:"#0a66c2"
        // }
    },
    // formItems:{
    //     position:"relative",
    //     background:"rgba(200,200,200,0.4)",
    //     background:"#fff",
    //     marginLeft:"0.2rem",
    //     width: "20rem",
    //     boxSizing:"content-box",
    //     padding: "0.4rem",
    //     height:"auto",
    // },
    formItems:{
      // position:"relative",
      background:"rgba(200,200,200,0.4)",
      background:"#fff",
      width: "20rem",
      boxSizing:"content-box",
      padding: "0.5rem",
      
      height:"auto",
      [theme.breakpoints.down('xs')]:{
          margin:"0 auto",
          width:"80%"
      }
  },
    input:{
        outline: "none",
        border: "none",
        width:"100%",
        fontSize: "0.8rem"
    },
    ckeckbox:{
        zoom:"0.7",
        // display:'flex',
        // alignSelf:"center"
    },
    signupBtnBox:{
        width:"100%",
        display:"grid",
        placeItems:"center",
        margin:"1.5rem 0"
    },
    signupBtn:{
        width:"70%",
        height:"1.6rem",
        background: "#512da8",
        color:"#fff",
        '&:hover':{
            background:"#411d98"
        }
    },
      divider: {
        display: 'block',
        margin: `${theme.spacing(3)}px 0`,
      },
      // formControl: {
      //   width:"95%",
      //   margin: theme.spacing(1),
      //   marginBottom:"0.7rem"
      // },
      formControl: {
        width:"95%",
        margin: theme.spacing(1),
        marginBottom:"0.7rem",
        [theme.breakpoints.down('xs')]:{
            width:"100%",
            margin: theme.spacing(0.1),
        }
      },
      formHeader:{
            margin:"0.5rem"
        },
      formBox:{
          display: "grid",
          justifyContent:'center',
          alignItems:"center", 
      },
      authBtnsBox:{
        height: "3rem",
        display:"flex",
        alignItems:"center",
        padding:"1rem",
        justifyContent: "space-between"
      },
      forgotpsw:{
          fontSize: "0.7rem",
            color:"green"
      },
      forgotpswBtn:{
      zoom: "0.7",
      color:"#f00"
      },
      login:{
          zoom:"0.7",
          color:"#f00"
      },
      signupBtn:{
        color:"#f00"
      },
      signupLink:{
        textDecoration: "none"
      },
      errorMessage:{
          fontSize: "0.8rem",
          color: "#f00",
          textAlign: "center"
      },
      authLink:{
        textDecoration: "none"
      },
      loginSignupBtn:{
        color:"#fff",
        background:"red",
        background : "linear-gradient(123deg, silver, gray)",
        boxShadow: "2.8px 2.8px 2.2px rgba(0, 0, 0, 0.02),6.7px 6.7px 5.3px rgba(0, 0, 0, 0.028),12.5px 12.5px 10px rgba(0, 0, 0, 0.035),22.3px 22.3px 17.9px rgba(0, 0, 0, 0.042),41.8px 41.8px 33.4px rgba(0, 0, 0, 0.05),100px 100px 80px rgba(0, 0, 0, 0.07)",
        fontSize: "0.6rem",
        width:"50%",
        height:"85%",
        fontSize:"0.7rem",
        marginLeft:"50%",
        transform:"translate(-50%)"
      }
}))




const theme = createTheme({
  //v5.0.0
  typography: {
    body2: {
        fontSize: [30, "!important"]
    }
  },
  //older versions
  overrides: {
    MuiTypography: {
      body2: {
        fontSize: [56, "!important"]
      }
    }
  }
});
const Signup = ()=>{
    const classes = useStyles()
    const [checkedValue, setCheckedValue] = useState(false)
    const [formData, setFormData] = useState({})
    const [error, setError] = useState({status : false, message: ""})
    
    const setCheckedVal = ()=>{
        setCheckedValue(prev => {return !prev})
    }
    const setFormValues=(e)=>{
        const name = e.target.name
        const value = e.target.value
       
        setFormData(prev =>{
            return {...prev, [name] : value}
        })
    }

   const setErrorHandler = (a,b)=>{
    setError({status : a, message : b})
        setTimeout(()=>{
        setError({status : false, message : ''})
       }, 5000)
   }
    const register =async ()=>{
      try{
        const password = formData.password
        const comfirmPassword = formData.comfirmPassword
        if(password !== comfirmPassword){
            setErrorHandler(true, 'Passwords do not match. Please try again.')
        }else{
            if( !formData.username || !formData.email || !formData.password || !formData.comfirmPassword){
                setErrorHandler( true,  'Please fill all fields.')
            }else{
              if(password.length < 8){
                setErrorHandler( true,  'Password should not be less than 8 characters.')
              }else{
                let email = formData.email 
                const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
                if(email.match(mailformat))
                {
                  setErrorHandler(false, '')
                  const options = {
                      url: 'https://investmentapp10.herokuapp.com/api/v1/auth/signup',
                      method: 'POST',
                      headers: {
                          'Accept': 'application/json',
                          'Content-Type': 'application/json;charset=UTF-8'
                      },
                      data : {
                          username: formData.username,
                          email: formData.email,
                          password: formData.password
                      }
                      };
                      
                      axios(options)
                      .then(response => {
                          const {singupdData} = response.data
                          if(singupdData){
                            
                            window.location.href = '/comfirmemail'
                          }else{
                              setErrorHandler(true, 'Error registering you. Please try again.')
                          }
                      });
                }
                else
                {
                  setErrorHandler( true,  'Please use a valid email.')
                }
              }
                
            }
       
        
        }
      }catch(error){
          console.log(error)
      }
        
    }


return(<ThemeProvider theme = {theme} >
    <div className={classes.main} >
        <span>
        <h4 className={classes.pageTite}>Invest App</h4>
            <FormGroup  className={classes.signupForm} >
            <Grid container>
            <Grid item className={classes.boxItem}>
                <Card className={classes.formItems} >
                <h3 className={classes.formHeader}>Register</h3>
                 { error.status && <div className={classes.errorMessage}>{error.message}</div>} 
                {/* <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="firstname">Firstname</InputLabel>
                    <Input id="firstname" className={classes.input} name='firstname' onChange={setFormValues} 
                    value={formData.firstname} type="text" required/>
                </FormControl>
                <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="lastname">Lastname</InputLabel>
                    <Input id="lastname" className={classes.input} name='lastname' onChange={setFormValues} 
                    value={formData.lastname} type="text" required/>
                </FormControl> */}

                <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="username">Username</InputLabel>
                    <Input id="username" className={classes.input} name='username' onChange={setFormValues} 
                    value={formData.username} type="text" required/>
                </FormControl>
                <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="email">Email</InputLabel>
                    <Input id="email" className={classes.input} name='email' onChange={setFormValues} 
                    value={formData.email} type="email" required/>
                </FormControl>

                {/* <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="phone">Phone</InputLabel>
                    <Input id="phone" className={classes.input} name='phone' onChange={setFormValues} 
                    value={formData.phone} type="tel" required/>
                </FormControl> */}
                <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="password">Password</InputLabel>
                    <Input id="password" className={classes.input} name='password' onChange={setFormValues} 
                    value={formData.password} type="password" required/>
                </FormControl>
                <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="comfirmPassword">Comfirm Password</InputLabel>
                    <Input id="comfirmPassword" className={classes.input} name='comfirmPassword' onChange={setFormValues} 
                    value={formData.comfirmPassword} type="password" required/>
                </FormControl>
         
                {/* <FormControl className={classes.formBox}>
                <FormControlLabel
                    control={(
                      <Checkbox
                      className={classes.ckeckbox}
                        checked={checkedValue}
                        onChange={()=>setCheckedVal()}
                        value="remember"
                      />
                    )}
                    label="Remember me"
                  />
                </FormControl> */}
                <FormControl className={classes.signupBtnBox}>
                <Button className={classes.loginSignupBtn} onClick={()=>register()} >CONTINUE</Button>
                </FormControl>       
                    
                    <hr className ={classes.divider} />
                    {/* <Social Media Butons> */}
                <div className={classes.authBtnsBox}>
                    <div className={classes.forgotpsw}> Forgot password? 
                        <Link to='/forgotPassword' className={classes.authLink}>
                            <Button className={classes.forgotpswBtn}>Reset Password</Button>
                        </Link>
                    </div>
                    <div className={classes.login}>
                        <Link to='/login'  className={classes.signupLink}>
                            <Button  className={classes.signupBtn}>Login</Button>
                        </Link>
                    </div>
                </div>
            </Card>
            </Grid>
            </Grid>
            </FormGroup>

            </span>
        </div>
    </ThemeProvider>
)
}

export default Signup


