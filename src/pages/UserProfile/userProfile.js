import { Grid, Card, Paper, CardContent, Button, Divider , makeStyles, TextField} from '@material-ui/core';
import { useContext, useEffect } from 'react';
import { Redirect } from 'react-router';
import { DashboardHeader,Sidebar, SidebarMobile, InvestorSidebar, InvestorSidebarMobile, 
    DashboardButton } from '../../components';
import { UseContext } from '../../contexts.js/context';
import {Link} from 'react-router-dom'
import { FaWallet,  FaPiggyBank, FaMoneyBill, FaMoneyBillWave} from 'react-icons/fa';
import axios from 'axios';

const useStyles = makeStyles((theme)=>({
    main:{
        // background : "red",
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
    }
}))
//https://investmentapp10.herokuapp.com/api/v1/users/{userId}/{username} 


const UserProfile = ()=>{
    const classes = useStyles()
    const {authenticated} = UseContext()
    const url = 'https://investmentapp10.herokuapp.com/api/v1/users/{userId}/{username}'
  
    if(!authenticated){
        return <Redirect to='/'/> 
    }

    const fetchUserData = async(url)=>{
        await axios(url).then(response => console.log(response))
    }
    // useEffect(()=>{
        fetchUserData(url)
    // },[])
    return (<>
        <DashboardHeader />
        {authenticated ?
     <><InvestorSidebar /> <InvestorSidebarMobile/></>:
      <><Sidebar /><SidebarMobile /></>}
        <div className={classes.main}>
        <Grid container className={classes.container} spacing={1}>
            <Link to="/" className={classes.dashboardLink}><DashboardButton>New Investment</DashboardButton></Link>
            <Link to="/" className={classes.dashboardLink}><DashboardButton>Investments</DashboardButton></Link>
        </Grid>
        <Grid container className={classes.container} spacing={1}>
            <Grid>

               <TextField type='text'/>
               <Button>Submit</Button> 
            </Grid>
      


    </Grid>
    </div>
    </>)
}

export default UserProfile