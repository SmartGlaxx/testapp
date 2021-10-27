import { useState } from 'react';
import { Grid, Card, Paper, CardContent, Button, Divider , FormGroup, FormControl, 
    InputLabel, makeStyles, Input} from '@material-ui/core';
import { useContext, useEffect } from 'react';
import { Redirect, useHistory } from 'react-router';
import { DashboardHeader,Sidebar, SidebarMobile, InvestorSidebar, InvestorSidebarMobile, 
    DashboardButton } from '../../components';
import { UseContext } from '../../contexts.js/context';
import {Link} from 'react-router-dom'
import { FaWallet,  FaPiggyBank, FaMoneyBill, FaMoneyBillWave} from 'react-icons/fa';
import axios from 'axios';


const useStyles = makeStyles((theme)=>({
    main:{
        marginTop: "6rem",
        marginLeft: "15rem",
        marginRight:"1rem",
        [theme.breakpoints.down('sm')]:{
            marginLeft: "1rem",
        }
    },
    container:{
        marginBottom:"2rem"
    },
    dashboardItems:{
        height: "8rem",
        background: "#fff"
    },
    details:{
        height:" 100%",
        fontSize:"0.7rem",
        background:"linear-gradient(123deg, #556bd6, #00f)",
        padding:'1rem',
        boxSizing:"border-box",
        position:"relative",
        display:"flex",
        // alignItems:"center",
        justifyContent: "left"
    },
    detailsMain:{
        color:"#fff",
        fontSize:"1.5rem",
        fontWeight:"600",
        // display:"grid",
        // placeItems:"center",
        
    },
    detailsName:{
        fontSize:"0.8rem",
        color:"#fff",
        fontWeight:"600",
        // padding: "0.6rem"
    },
    link:{
      
        textDecoration: "none"
    },
    linkBtn:{
        color:'#fff',
        float: "right",
        fontSize: "0.7rem",
        position:"absolute", 
        right:"1.2rem",
        bottom:"1.2rem"
    },
    icon:{
        fontSize:"1.2rem",
        color:"#556bd6",
        float:"right", 
        padding:"0.5rem", 
        borderRadius: "50%", 
        background:"#fff", 
        position:"absolute", 
        right:"1.2rem",
        top:"1.2rem"
    },
    dashboardBtns:{
        fontSize: "0.7rem",
        background : "silver",
        color:"#fff"
    },
    dashboardLink:{
        textDecoration:"none"
    },
    formItems:{
        // position:"relative",
        background:"rgba(200,200,200,0.4)",
        background:"#fff",
        width: "90%",
        boxSizing:"content-box",
        padding: "0.5rem",
        
        [theme.breakpoints.down('xs')]:{
            margin:"0 auto",
            width:"80%"
        }
    },
    formHeader:{
        margin:"0.5rem"
    },
    errorMessage:{
        fontSize: "0.8rem",
        color: "#f00",
        textAlign: "center"
      },
      
    
}))



const CreateUser = ()=>{
    const classes = useStyles()
    const {authenticated, loginDetail, setUserCreated} = UseContext()
    const url = 'https://investmentapp10.herokuapp.com/api/v1/auth/users/'
    const url2 = 'https://investmentapp10.herokuapp.com/api/v1/users/'
    const [userData, setUserData] = useState({})
    const [formData, setFormData] = useState({})
    const [error, setError] = useState({status : false, message: ""})
    const history = useHistory()

    const fetchUserData = async(url)=>{
        
        await axios(url).then(response => {
            const {usersAuth} = response.data
            usersAuth.map(user =>{
                
                if(user.email === loginDetail || user.username === loginDetail){ 
                    setUserData(user)
                   
                }
                else{
                    return
                }
            })
           
        })
        
    }
    useEffect(()=>{
        fetchUserData(url)
    },[])


    const setFormValues =(e)=>{
        const name = e.target.name
        const value = e.target.value

        setFormData(prev =>{return {...prev, [name] : value}})
    }
    const setErrorHandler = (a,b)=>{
        setError({status : a, message : b})
            setTimeout(()=>{
            setError({status : false, message : ''})
           }, 4000)
       }
    const createProfile = async()=>{
        const userId = userData._id
      if(!userData._id || !formData.firstname || !formData.lastname || !userData.username || !userData.email 
        || !formData.phone || !formData.bank || !formData.accNo || !formData.nextOfKin || !formData.nextOfKinNo){
       return
      }else{     
        let userId = userData._id
        let userUsername = userData.username
        const options = {
            url : `${url2}${userId}/${userUsername}`,
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=UTF-8'
            },
            data: {
                userId : userData._id, 
                firstname :  userData.firstname, 
                lastname : userData.lastname, 
                username : userData.username,
                email: userData.email,
                address : formData.address,
                phone : formData.phone,
                bankName : formData.bank,
                accountNumber : formData.accNo,
                nextOfKin : formData.nextOfKin,
                nextOfKinPhone : formData.nextOfKinNo
            }    
                
            }
            await axios(options)
            .then(result =>{
                
                const {message} = result.data
                
                if(message == "Success"){
                    setUserCreated(true)
                    history.push('/dashboard')
                }else{
                    
                   setErrorHandler(true, 'User profile setup unsuccessful. Please make sure you entered the correct details.')
                }
            })



        }
    }
    // if(!authenticated){
    //     return <Redirect to='/'/> 
    // }

    return (<>
        <DashboardHeader />
        {authenticated ?
     <><InvestorSidebar /> <InvestorSidebarMobile/></>:
      <><Sidebar /><SidebarMobile /></>}
        <div className={classes.main}>
        <Grid container className={classes.container} spacing={1}>
            <Link to="/" className={classes.dashboardLink}><DashboardButton>Back</DashboardButton></Link>
            <Link to="/" className={classes.dashboardLink}><DashboardButton>Investments</DashboardButton></Link>
        </Grid>
        <FormGroup  className={classes.loginForm} >
        <Grid container className={classes.container} spacing={1}>
   
            <Grid item className={classes.boxItem}>
            <Card className={classes.formItems} >
            <h3 className={classes.formHeader}>Create Your Profile</h3>
            {error.status && <div className={classes.errorMessage}>{error.message}</div>} 
            <Input name='userId' value={userData._id}  type='hidden'/>
            <Input name='authenticated' value={userData.authenticated}  type='hidden'/>
            <FormControl className={classes.formControl}>
                {/* <InputLabel htmlFor="address">Address</InputLabel> */}
                First Name<Input id='firstname' className={classes.input} value={formData.firstname} onChange={setFormValues} 
            type='text' name='firstname' required/>
            </FormControl>
            <FormControl className={classes.formControl}>
                {/* <InputLabel htmlFor="address">Address</InputLabel> */}
                Last Name<Input id='lastname' className={classes.input} value={formData.lastname} onChange={setFormValues} 
            type='text' name='lastname' required/>
            </FormControl>
            <FormControl className={classes.formControl}>
                {/* <InputLabel htmlFor="username"></InputLabel> */}
               Username <Input type='text' name='username'  value={userData.username} disabled/>
            </FormControl>
            <FormControl className={classes.formControl}>
                {/* <InputLabel htmlFor="email"></InputLabel> */}
               Email <Input type='email' name='email'  value={userData.email} disabled/>
            </FormControl>
            <FormControl className={classes.formControl}>
                {/* <InputLabel htmlFor="address">Address</InputLabel> */}
              Address<Input id='address' className={classes.input} value={formData.address} onChange={setFormValues} 
            type='text' name='address' required/>
            </FormControl>
            <FormControl className={classes.formControl}>
                {/* <InputLabel htmlFor="phone">Phone</InputLabel> */}
               Phone <Input id='phone' className={classes.input} value={formData.phone}  onChange={setFormValues} 
            type='text'  name='phone' required/>
            </FormControl>
            <FormControl  className={classes.formControl}>
                {/* <InputLabel htmlFor="profilePicture">Profile Picture</InputLabel> */}
                Profile Picture<Input id='profilePicture' className={classes.input} value={formData.profilePicture}  onChange={setFormValues} 
            type='file'  name='profilePicture' required/>
            </FormControl>
            <FormControl className={classes.formControl}>
                {/* <InputLabel htmlFor="bank">Bank</InputLabel> */}
                Bank Name<Input id='bank' className={classes.input} value={formData.bank}  onChange={setFormValues} 
            type='text' name='bank' required/>
            </FormControl>
            <FormControl className={classes.formControl}>
                {/* <InputLabel htmlFor="accNo">Account Number</InputLabel> */}
                Account Number<Input id='accNo' className={classes.input} value={formData.accNo} onChange={setFormValues} 
            type='text' name='accNo' required/>
            </FormControl>
            <FormControl className={classes.formControl}>
                {/* <InputLabel htmlFor="NextOfKin">Next of Kin</InputLabel> */}
                Next of Kin<Input id='nextOfKin' className={classes.input} value={formData.nextOfKin} onChange={setFormValues} 
            type='text'  name='nextOfKin' required/>
            </FormControl>
            <FormControl className={classes.formControl}>
                {/* <InputLabel htmlFor="NextOfKinNo">Next of Kin's Number</InputLabel> */}
                Next of Kin's Contact<Input id='nextOfKinNo' className={classes.input} value={formData.nextOfKinNo} onChange={setFormValues} 
            type='text' name='nextOfKinNo' required/>
            </FormControl>
            <FormControl className={classes.formControl}>
            <Button onClick={createProfile}>Create Profile</Button>
            </FormControl>
    
            </Card>
        </Grid>  
        </Grid>    
        </FormGroup>
    
    </div>
    </>)
}

export default CreateUser

// "address" : "Your address no 10",
//     "profilePicture" : "profilePicture",
//     "phone" : 23498437458568,
//     "authenticated" : false,
//     "bankName" : "GTBank",
//     "accountNumber" : 435467879,
//     "nextOfKin" : "Brother",
//     "nextOfKinPhone" : 2348430485493