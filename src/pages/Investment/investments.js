import React from 'react'
import { useState, useContext, useEffect} from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import TableBody from '@mui/material/TableBody';
import TablePagination from '@mui/material/TablePagination';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';

import { Link } from 'react-router-dom';
import { Grid, Card, CardContent, Button, Divider , FormGroup, FormControl, 
    InputLabel, makeStyles, Input} from '@material-ui/core';
    import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { DashboardHeader,Sidebar, SidebarMobile, InvestorSidebar, InvestorSidebarMobile, 
    DashboardButton } from '../../components';
import { UseContext } from '../../contexts.js/context';
// import {Link} from 'react-router-dom'
// import axios from 'axios';
import { useHistory } from 'react-router';

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



const Investments = ()=>{
    const classes = useStyles()
    const {authenticated, loginDetail, setUserCreated, userFullData, setLoading} = UseContext()
    const history = useHistory()
    const [investments, setInvestments] = useState([])
    const url = 'https://investmentapp10.herokuapp.com/api/v1/invest/'
   

    const userId = userFullData.userId
    const username = userFullData.username
    const fetchInvestments = async(url)=>{
        setLoading(true)
        await axios(url).then(response => {
          
          setInvestments(response.data.response)
        })
        
    }
    
const columns = [
  { id: 'name', label: 'Package\u00a0Name', minWidth: 50 },
  { id: 'deposit', label: 'Amount\u00a0Invested', minWidth: 50 },
  {
    id: 'interest',
    label: 'Interest Rate',
    minWidth: 50,
    // align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'profitPerMonth',
    label: 'Profit Per Month',
    minWidth: 50,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'investmentDuration',
    label: 'Investment Duration',
    minWidth: 50,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'maturityFullDate',
    label: 'Investment Maturity lDate',
    minWidth: 50,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  }
];


  

function createData(cumulativeProfit, deposit, interest, investmentDate, investmentDuration, maturityFullDate, profitPerMonth) {
  // const profit = cumulativeProfit   
  // const imgs = deposit / interest;
  return { cumulativeProfit, deposit, interest, investmentDate, investmentDuration, maturityFullDate, profitPerMonth };
}
console.log(investments)
// cumulativeProfit, currentDate, deposit, interest,
//     investmentDate, investmentDuration, maturityFullDate,
//     package, profitPerMonth}

const rows = investments.map((item, i)=>{
  const id = item._id
  return createData( id, item.cumulativeProfit, item.deposit, item.interest, item.investmentDate, item.investmentDuration, 
    item.maturityFullDate, item.profitPerMonth )
})

// console.log('arr', arr)

//  const rows = [
   
// //   createData('India', 'IN', 1324171354, 3287263),
// //   createData('China', 'CN', 1403500365, 9596961),
// //   createData('Italy', 'IT', 60483973, 301340),
// //   createData('United States', 'US', 327167434, 9833520),
// //   createData('Canada', 'CA', 37602103, 9984670),
// //   createData('Australia', 'AU', 25475400, 7692024),
// //   createData('Germany', 'DE', 83019200, 357578),
// //   createData('Ireland', 'IE', 4857000, 70273),
// //   createData('Mexico', 'MX', 126577691, 1972550),
// //   createData('Japan', 'JP', 126317000, 377973),
// //   createData('France', 'FR', 67022000, 640679),
// //   createData('United Kingdom', 'GB', 67545757, 242495),
// //   createData('Russia', 'RU', 146793744, 17098246),
// //   createData('Nigeria', 'NG', 200962417, 923768),
// //   createData('Brazil', 'BR', 210147125, 8515767),
// ];

    // cumulativeProfit: 0
    // currentDate: "2021-10-22T11:44:38.816Z"

    // deposit: 200000
    // interest: 0.15

    // investmentDate: "2021-10-22T09:59:46.303Z"
    // investmentDuration: 0

    // maturityFullDate: "2022-04-22T09:59:46.303Z"

    // package: "Premium"
    // profitPerMonth: 30000
    // userId: "617150e936976c9e4bd231af"
    // username: "smartglaxx"
    // _id: "61728b92cb0e258f36875eba"
    useEffect(()=>{
        fetchInvestments(`${url}/${userId}/${username}/investments`)
    },[])


      const [page, setPage] = React.useState(0);
      const [rowsPerPage, setRowsPerPage] = React.useState(5);
    
      const handleChangePage = (event, newPage) => {
        setPage(newPage);
      };
    
      const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
      };
    


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
        <Link to="/createinvestment/:{userId}/:{username}" className={classes.dashboardLink}><DashboardButton>New Investment</DashboardButton></Link>
            <Link to="/investment/:{userId}/:{username}/investments" className={classes.dashboardLink}><DashboardButton>Investments</DashboardButton></Link>
        </Grid>

        <Grid container>
            <Grid item>

            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>

            </Grid>
        </Grid>
    
    </div>
    </>)
}

export default Investments


//   // const cumulativeProfit = item.cumulativeProfit
// const deposit = item.deposit
// const interest = item.interest
// const investmentDate = item.investmentDate
// const investmentDuration = item.investmentDuration
// const maturityFullDate = item.maturityFullDate
// const profitPerMonth = item.profitPerMonth

