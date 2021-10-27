import { Grid, Card, Paper, CardContent, Button, Divider ,MenuItem,
     makeStyles, TextField, Input, FormControl, Select} from '@material-ui/core';
import { useContext, useEffect, useState } from 'react';
import { Redirect, useHistory } from 'react-router';
import { DashboardHeader,Sidebar, SidebarMobile, InvestorSidebar, InvestorSidebarMobile, 
    DashboardButton } from '../../components';
import { UseContext } from '../../contexts.js/context';
import {Link} from 'react-router-dom'
import { FaWallet,  FaPiggyBank, FaMoneyBill, FaMoneyBillWave} from 'react-icons/fa';
import axios from 'axios';
import Payment from '../Payment/payment';
import { usePaystackPayment , PaystackButton} from 'react-paystack';
import { NumberFormat } from '../../utils/formater';

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
    },
    select:{
        minWidth:"10rem"
    },
    formControl: {
        width:"45%",
        margin: theme.spacing(1),
        marginBottom:"0.7rem",
        [theme.breakpoints.down('xs')]:{
            width:"100%",
            margin: theme.spacing(0.1),
        }
      },
    investmentDetails:{
        display:"flex",
        margin:"1rem 0"
    },
    investmentDetailsName:{
        marginRight:"4rem"
    },
    paystackBtn:{
        background : "green",
        boxShadow: "2.8px 2.8px 2.2px rgba(0, 0, 0, 0.02),6.7px 6.7px 5.3px rgba(0, 0, 0, 0.028),12.5px 12.5px 10px rgba(0, 0, 0, 0.035),22.3px 22.3px 17.9px rgba(0, 0, 0, 0.042),41.8px 41.8px 33.4px rgba(0, 0, 0, 0.05),100px 100px 80px rgba(0, 0, 0, 0.07)",
        fontSize: "0.6rem",
        color: "#fff",
        margin:"0 0.3rem",
        borderRadius:"0.3rem",
        padding:"0.4rem 1rem",
        border:'none',
        fontSize : "0.8rem"
    },
    paystackBtn2:{
        background : "linear-gradient(123deg, silver, gray)",
        boxShadow: "2.8px 2.8px 2.2px rgba(0, 0, 0, 0.02),6.7px 6.7px 5.3px rgba(0, 0, 0, 0.028),12.5px 12.5px 10px rgba(0, 0, 0, 0.035),22.3px 22.3px 17.9px rgba(0, 0, 0, 0.042),41.8px 41.8px 33.4px rgba(0, 0, 0, 0.05),100px 100px 80px rgba(0, 0, 0, 0.07)",
        fontSize: "0.6rem",
        color: "#fff",
        margin:"0 0.3rem",
        borderRadius:"0.3rem",
        padding:"0.4rem 1rem",
        border:'none',
        fontSize : "0.8rem"
    },

//packages
    packagesMain: {
        paddingTop:"2rem",
        // background: "red",
        minHeight:"60vh"
      },
      packagesBox:{
        padding:"0rem",
        
        // background: "gray"
      },
      packages:{
        margin:"1rem 0"
          // padding:'1rem',
        // background:"green",
      // '&:hover':{
      //       background:"#fff",
      //       color:"#0a66c2"
      //   }
      },
      packageDescription:{
        width:"90%",
        margin:"0 auto",
          minHeight:"60vh",
        position:"relative",
        transition: "all 0.7s ease-in-out",
        '&:hover':{
          transform : "scale(1.1)"
      }
      },
      label:{
        color:"#fff",
        position: "absolute",
        top:"0",
        padding:"0.3rem 1.5rem",
        height:"4rem",
        width: "100%",
        background: "#00f",
        display:"grid",
        alignItems:"center",
        justifyContent:"left"
      },
      packageBody:{
        marginTop:"4.5rem"
      },
      packageBodyUl:{
        listStyleType :"none",
        padding:"1.5rem"
      },
      packageBodyLi:{
        margin:"0.3rem 0"
      },
      featured:{
        color:"#fff",
        position: "absolute",
        bottom:"-7%",
        right:"-47%",
        height:"5rem",
        width: "100%",
        padding:"0.3rem",
        background: "#00f",
        display:"grid",
        alignItems:"top",
        transform: "rotate(-45deg)"
      }
}))

//https://investmentapp10.herokuapp.com/api/v1/invest/{userId}/{username} 

const CreateInvestment = ()=>{
    const classes = useStyles()
    const {authenticated, userFullData, setInvestmentValues, setInvestmentDeposited, menuState, setPackageData} = UseContext()
    
    const [invetsmentReturn, setInvetsmentReturn] = useState('0')
    // const [amountValue, setAmountValue] = useState(0)
    const history = useHistory()
    
    const url = 'https://investmentapp10.herokuapp.com/api/v1/invest'
    
    const setInvestment = (value)=>{
        if(value == 'basic'){
            setPackageData({name : "Basic", amount : 100000, interestRate : 10, minimunDeposit: "₦100,000", duration: "6 Months", expectedReturn: "₦60,000"})
        }
        else if(value == 'standard'){
            setPackageData({name : "Standard", amount : 150000, interestRate : 12, minimunDeposit: "₦150,000",  duration: "6 Months", expectedReturn: "₦90,000"})
        }
        else if(value == 'premium'){
            setPackageData({name : "Premium", amount : 200000,  interestRate : 15, minimunDeposit: "₦200,000",  duration: "6 Months", expectedReturn: "₦120,000"})
        }
    }
  

    // const setPackegeValue =(e)=>{
    //     if(e.target.value == 'Basic'){
    //         setPackageData({name : "Basic", interestRate : 10, minimunDeposit: "100,000", duration: 6})
    //     }
    //     else if(e.target.value == 'Standard'){
    //         setPackageData({name : "Standard", interestRate : 12, minimunDeposit: "150,000",  duration: 6})
    //     }
    //     else if(e.target.value == 'Premium'){
    //         setPackageData({name : "Premium", interestRate : 15, minimunDeposit: "200,000",  duration: 6})
    //     }
    //     // else {
    //     //     setPackageData({name : "", interestRate : 0, minimunDeposit: "0",  duration: 0})
    //     // }
        
    // }
    // const setFormValues =(e)=>{
    //     const name = e.target.name
    //     const value = e.target.value
        
    //     setamountValue(prev => {return {...prev, [name]: value}})
    // }

   

    // const toPaystack = async()=>{
    //     const amount = Number(amountValue)
    //     const packageName = packageData.name
    //     const interestRate = packageData.interestRate
    //     const userId = userFullData.userId
    //     const username = userFullData.username
    //     const options = {
    //         url: `${url}/${userId}/${username}`,
    //         method: "POST",
    //         headers: {
    //             "Accept" : "application/json",
    //             "Content-Type" : "application/json;charset=UTF-8"
    //         },
    //         data :{
    //             amount : amount,
    //             packageName : packageName,
    //             interestRate : interestRate,
    //             userId : userId,
    //             username : username
    //         }
    //     }
        
    //          await axios(options).then(response=> {
    //         const {investData} = response.data

    //         if(investData){
    //             setInvestmentDeposited(true)
    //             history.push('/investments')
                
    //         }else{
                
    //             setInvestmentDeposited(false)
    //         }
    //     })
    
        
    // }
    
    //     let userEmail = ''
    // if(userFullData){
    //     if(userFullData.email){
    //         userEmail = userFullData.email
    //     }else{
    //         userEmail = 'user@gmail.com'
    //     }
    // }else{
    //     userEmail = 'user@gmail.com'
    // }  
    //  let calcAmount = Number(amountValue) * 100
    //  const config = {
        
    //     reference: (new Date()).getTime(),
    //     email: userEmail,
    //     amount: calcAmount,
    //     publicKey: "pk_test_085a1335baf91100b71d68106d08a1ccad842ce4",
    //     };

    //     const text = calcAmount && packageData.name ?  `Pay ₦${NumberFormat(calcAmount)}` : "Add amount and package"
    //     const componentProps = {
    //         ...config,
    //         text : text,
    //         onSuccess: () =>toPaystack()
    //         // onClose: () =>updateCartAfterBuy(()=>window.location.redirect('/')),
    //     };


    // useEffect(()=>{
    //     const interestValue = packageData.interestRate * Number(amountValue)
    //     const returnExpected = interestValue * packageData.duration /100
    //     if(!returnExpected){
    //         setInvetsmentReturn(0)
    //     }else{
    //         setInvetsmentReturn(`₦${NumberFormat(returnExpected * 100)}`)
    //         //setInvetsmentReturn(returnExpected)
    //     }
        
    // },[amountValue, packageData])


   
    // if(!amount || !packageName || !interestRate){
    //     console.log('data in')
    // }else{

    if(!authenticated){
        return <Redirect to='/'/> 
    }
    
    //console.log('packege', setPackageName)
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
        {/* <Grid container className={classes.container} spacing={1}> */}
            {/* <Grid item xs={12} sm={6}>
               <FormControl className={classes.formControl}>
               {/* Amount <Input type='amount' name='amount'  onChange={setFormValues} value={amountValue}/>
            <Select  displayEmpty name='amount'  onChange={setAmount} className={classes.select} >
            <MenuItem >Amount to Invest</MenuItem >
            <MenuItem  value='100k' >₦100,000</MenuItem >
            <MenuItem  value='150k' >₦150,000</MenuItem >
            <MenuItem  value='200k' >₦200,000</MenuItem >
            </Select>
            </FormControl> */}
            <div className={classes.packagesMain}>
                <Grid container className={classes.packagesBox}>
                <Grid item xs={12} sm={4} className={classes.packages}>
                    <Card className={classes.packageDescription}>  
                    <div className={classes.label}> <h4>Basic</h4></div>
                    <div className={classes.packageBody}>
                        <ul className={classes.packageBodyUl}>
                            <li className={classes.packageBodyLi}>
                            Lorem ipsum dolor 
                            </li>
                            <li className={classes.packageBodyLi}>
                            consectetur adipiscing
                            </li>
                            <li className={classes.packageBodyLi}>
                            Lorem ipsum dolor 
                            </li>
                        </ul>
                        <Link to='/invest/:{userId}/:{username}'><Button onClick={()=>setInvestment("basic")}>Get Started</Button></Link>
                    </div>
                    </Card>
                    </Grid>
                    <Grid item xs={12} sm={4} className={classes.packages}>
                    <Card className={classes.packageDescription}>
                    <div className={classes.label}><h4> Standard</h4></div>
                    <div className={classes.packageBody}>
                        <ul className={classes.packageBodyUl}>
                            <li className={classes.packageBodyLi}>
                            Lorem ipsum dolor 
                            </li>
                            <li className={classes.packageBodyLi}>
                            consectetur adipiscing
                            </li>
                            <li className={classes.packageBodyLi}>
                            Lorem ipsum dolor 
                            </li>
                        </ul>
                        <Link to='/invest/:{userId}/:{username}'><Button onClick={()=>setInvestment("standard")}>Get Started</Button></Link>
                    </div>

                    <div className={classes.featured}> 20% extra </div>
                    </Card>
                    </Grid>
                    <Grid item xs={12} sm={4} className={classes.packages}>
                    <Card className={classes.packageDescription}>
                    <div className={classes.label}> <h4>Premium</h4></div>
                    <div className={classes.packageBody}>
                        <ul className={classes.packageBodyUl}>
                            <li className={classes.packageBodyLi}>
                            Lorem ipsum dolor 
                            </li>
                            <li className={classes.packageBodyLi}>
                            consectetur adipiscing
                            </li>
                            <li className={classes.packageBodyLi}>
                            Lorem ipsum dolor 
                            </li>
                        </ul>
                        <Link to='/invest/:{userId}/:{username}'><Button onClick={()=>setInvestment("premium")}>Get Started</Button></Link>
                    </div>
                    </Card>
                    </Grid>
                </Grid>
            </div>
            {/* <FormControl  className={classes.formControl}>
            <Select displayEmpty name='packageName'   className={classes.select} >
            <MenuItem > Select a package</MenuItem >
            <MenuItem  value='Basic' >Basic</MenuItem >
            <MenuItem  value='Standard' >Standard</MenuItem >
            <MenuItem  value='Premium' >Premium</MenuItem >
            </Select>
            </FormControl> */}
            {/* </Grid>
            <Grid item xs={12} sm={6}>
            <Grid className={classes.investmentDetails} >
                    <Grid className={classes.investmentDetailsName} item xs={6}>Package Name </Grid>
                    <Grid className={classes.investmentCalc} item xs={6}>{packageData.name}</Grid>
                </Grid>
                <Grid className={classes.investmentDetails}> 
                    <Grid className={classes.investmentDetailsName} item xs={6}> Interest Rate </Grid>
                    <Grid className={classes.investmentCalc} item xs={6}>{`${packageData.interestRate}%`}</Grid>
                </Grid>
                <Grid className={classes.investmentDetails}>
                    <Grid className={classes.investmentDetailsName} item xs={6}> Minimum Deposit</Grid>
                    <Grid className={classes.investmentCalc}  item xs={6}>{packageData.minimunDeposit}</Grid>
                </Grid>
                <Grid className={classes.investmentDetails}>
                    <Grid className={classes.investmentDetailsName} item xs={6}>Expected Return</Grid>
                    <Grid className={classes.investmentCalc} item xs={6}>{invetsmentReturn}</Grid>
                </Grid>
            </Grid> */}
            {/* <PaystackButton  {...componentProps} className={text == "Add amount and package" ? classes.paystackBtn2 : classes.paystackBtn} />  */}
    {/* </Grid> */}
    </div>
    </>)
}

export default CreateInvestment


