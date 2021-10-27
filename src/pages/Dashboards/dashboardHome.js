import { Grid, Card, Paper, CardContent, Button, Divider , makeStyles} from '@material-ui/core';
import { useContext, useEffect } from 'react';
import { Redirect } from 'react-router';
import { DashboardHeader,Sidebar, SidebarMobile, InvestorSidebar, InvestorSidebarMobile, 
    DashboardButton } from '../../components';
import { UseContext } from '../../contexts.js/context';
import {Link} from 'react-router-dom'
import { FaWallet,  FaPiggyBank, FaMoneyBill, FaMoneyBillWave} from 'react-icons/fa';

const useStyles = makeStyles((theme)=>({
    main:{
        marginTop: "6rem",
        marginLeft: "15rem",
        marginRight:"1rem",
        [theme.breakpoints.down('sm')]:{
            marginLeft: "1rem",
        }
    },
    mainCollapsed:{
        marginTop: "6rem",
        marginLeft: "4rem",
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
//https://investmentapp10.herokuapp.com/api/v1/invest/{userId}/{username} 

const DashboardHome = ()=>{
    const classes = useStyles()
    const {authenticated, menuState} = UseContext()
    // const url = ''
  
    if(!authenticated){
        return <Redirect to='/'/> 
    }

    // useEffect(()=>{
    //     fetchData(url)
    // },[])
    return (<>
        <DashboardHeader />
        {authenticated ?
     <><InvestorSidebar /> <InvestorSidebarMobile/></>:
      <><Sidebar /><SidebarMobile /></>}
        <div className={menuState ? classes.main : classes.mainCollapsed}>
        <Grid container className={classes.container} spacing={1}>
            <Link to="/createinvestment/:{userId}/:{username}" className={classes.dashboardLink}><DashboardButton>New Investment</DashboardButton></Link>
            <Link to="/investment/:{userId}/:{username}/investments" className={classes.dashboardLink}><DashboardButton>Investments</DashboardButton></Link>
        </Grid>
        <Grid container className={classes.container} spacing={1}>
           
        <Grid item xs={12} sm={4} className={classes.dashboardItems}>
        <Paper className={classes.details}>
            <div>    <FaWallet className={classes.icon}/>
                <p className={classes.detailsName}>Wallet Balance</p>
                <div className={classes.detailsMain}>₦350,000</div>
                <Link to='' className={classes.link}><Button className={classes.linkBtn}>Details</Button></Link>
            </div>
        </Paper>
        </Grid>
        <Grid item xs={12} sm={4} className={classes.dashboardItems}>
        <Paper className={classes.details}>
        <div>    <FaPiggyBank  className={classes.icon}/>
            <p className={classes.detailsName}>All Deposits</p>
            <div className={classes.detailsMain}>₦300,000</div>
            <Link to='' className={classes.link}><Button className={classes.linkBtn}>Details</Button></Link>
        </div>
        </Paper>
        </Grid>
        <Grid item xs={12} sm={4} className={classes.dashboardItems}>
        <Paper className={classes.details}>
        <div>    <FaMoneyBill className={classes.icon}/>
            <p className={classes.detailsName}>All Profits</p>
            <div className={classes.detailsMain}>₦150,000</div>
            <Link to='' className={classes.link}><Button className={classes.linkBtn}>Details</Button></Link>
        </div>
        </Paper>
        </Grid>
        </Grid>
        <Grid container className={classes.container} spacing={1}>
        <Grid item xs={12} sm={4} className={classes.dashboardItems}>
        <Paper className={classes.details}>
        <div>    <FaMoneyBillWave />
            <p className={classes.detailsName}>All Withdrawals</p>
            <div className={classes.detailsMain}>₦100,000</div>
            <Link to='' className={classes.link}><Button className={classes.linkBtn}>Details</Button></Link>
        </div>
        </Paper>
        </Grid>
        <Grid item xs={12} sm={4} className={classes.dashboardItems}>
        <Paper className={classes.details}>
        <div>    
            <p className={classes.detailsName}>All Withdrawals</p>
            <div className={classes.detailsMain}>₦100,000</div>
            <Link to='' className={classes.link}><Button className={classes.linkBtn}>Details</Button></Link>
        </div>
        </Paper>
        </Grid>
        {/* <Grid item xs={12} sm={4} className={classes.dashboardItems}>
            <h5>Investments</h5>
            <Paper>Facts & figures</Paper>
        </Grid>
        <Grid item xs={12} sm={4} className={classes.dashboardItems}>
             <h5>Wallet Ballance</h5>
             <Paper>Facts & figures</Paper>
        </Grid>
        <Grid item xs={12} sm={4} className={classes.dashboardItems}>
            <h5>New Investment</h5>
            <Paper>Facts & figures</Paper>
        </Grid> */}


    </Grid>
    </div>
    </>)
}

export default DashboardHome