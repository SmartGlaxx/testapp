import React, {useState} from 'react'
import { Button, Grid } from "@material-ui/core"
import { makeStyles } from "@material-ui/core"
import { useEffect } from "react"
import {Link} from 'react-router-dom'
import { FaBars } from 'react-icons/fa';
import { UseContext } from '../contexts.js/context'
import Overlay from '../pages/UtilPages/overlay'


const useStyles = makeStyles((theme) => ({
    main:{
        background:"#002c54",
        //background:"linear-gradient(to right, #667ce7, #754fa7)",
        color:"#fff",
        fontSize : "0.7rem",
        position:"relative",
        marginBottom:"auto",
        bottom:"0",
        left: "0",
        height : "auto",
        width:"100%",
        padding : "1rem",
        paddingLeft : "5rem",
        marginTop:"2rem",
        zIndex: "10",
        boxShadow: "2.8px 2.8px 2.2px rgba(0, 0, 0, 0.02), 6.7px 6.7px 5.3px rgba(0, 0, 0, 0.028),12.5px 12.5px 10px rgba(0, 0, 0, 0.035),22.3px 22.3px 17.9px rgba(0, 0, 0, 0.042), 41.8px 41.8px 33.4px rgba(0, 0, 0, 0.05), 100px 100px 80px rgba(0, 0, 0, 0.07)",
        [theme.breakpoints.down('sm')]:{
            paddingLeft : "1rem",
            textAlign : "center"
        }
    },
    footerUl:{
        listStyleType :"none",
        padding:"0rem",
      },
    footerLi:{
        margin:"0.3rem 0",
        fontSize: "0.8rem"
    },
    footerLink:{
        color:"#fff",
        textDecoration: "none",
    }
    

}))



const Footer = ()=>{
    
    const classes = useStyles()

    
    return (<Grid container className={classes.main}>
            <Grid item xs={12} sm={4}>
                Smart Invest Logo
            </Grid>
            <Grid item xs={12} sm={4}>
                <h5>Links</h5>
                <ul className={classes.footerUl}>
                    <li className={classes.footerli}>
                        <Link to='/' className={classes.footerLink}>About</Link>
                    </li>
                    <li className={classes.footerli}>
                        <Link to='/' className={classes.footerLink}>Products</Link>
                    </li>
                    <li className={classes.footerli}>
                        <Link to='/' className={classes.footerLink}>Contact</Link>
                    </li>
                </ul>
            </Grid>
            <Grid item xs={12} sm={4}>
                <h5>Links</h5>
                <ul className={classes.footerUl}>
                    <li className={classes.footerli}>
                        <Link to='/' className={classes.footerLink}>About</Link>
                    </li>
                    <li className={classes.footerli}>
                        <Link to='/' className={classes.footerLink}>Products</Link>
                    </li>
                    <li className={classes.footerli}>
                        <Link to='/' className={classes.footerLink}>Contact</Link>
                    </li>
                </ul>
            </Grid>
        </Grid>
    )
}

export default Footer