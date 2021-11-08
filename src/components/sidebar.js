import { Button, makeStyles, Divider } from "@material-ui/core"
import { useState } from "react"
import { Link } from "react-router-dom"
import { UseContext } from "../contexts.js/context"
import { NavLinks} from "../utils/utilLinks"
import {FaWindowClose, FaChevronLeft, FaTh} from 'react-icons/fa';
import { useHistory } from "react-router-dom";
import styled from 'styled-components'


const Container = styled.div`
    .closeBtnMobile{
        float: right;
        margin-top: 0.2rem;
        font-size: 1.2rem;
        color: var(--text-color-2);
    }
`
const useStyles = makeStyles((theme) => ({
    main:{
        background:"linear-gradient(to right, #667ce7, #754fa7)",
        background:"#fff",
        position: "fixed",
        padding:"1rem",
        paddingLeft:"0rem",
        top: "0",
        left : "0",
        width:"13rem", 
        height : "100vh",
        zIndex : "20",
        display:"none",
        fontSize: "0.7rem",
        boxShadow: "2.8px 2.8px 2.2px rgba(0, 0, 0, 0.02), 6.7px 6.7px 5.3px rgba(0, 0, 0, 0.028),12.5px 12.5px 10px rgba(0, 0, 0, 0.035),22.3px 22.3px 17.9px rgba(0, 0, 0, 0.042), 41.8px 41.8px 33.4px rgba(0, 0, 0, 0.05), 100px 100px 80px rgba(0, 0, 0, 0.07)",

        [theme.breakpoints.down('sm')]:{
            display: "none"
        }
    },
    navLink:{
        textDecoration: "none",
        borderRadius:"0 2rem 2rem 0",
    },
    classone:{
        // height:"1.5rem",
        width: "95%",
        
        background: "none",
        
        color:"#2d375a",
        // color:"#333",
        fontWeight: "400",
        fontSize: "0.7rem",
        borderRadius:"0 2rem 2rem 0",
        display:"flex",
        alignItems: "center",
        paddingLeft:"2rem",
    },
    classtwo:{
        height:"auto",
        width: "95%",
        background:"#d3dcf9",
        // color:"#6184ff",
        color:"#608cfe",
        borderRadius:"0 2rem 2rem 0",
        boderRadius:"1rem",
        fontWeight: "400",
        fontSize: "0.7rem",
        display:"flex",
        alignItems: "center",
        paddingLeft:"2rem",
    },
    navBtnBox:{
        borderRadius:"0 2rem 2rem 0",
        
    },
    closeBtn:{
        float: "right",
        fontSize: "1rem"
    },
    sideBarTitle:{
        color : "#212121",
        fontSize :"0.9rem",
        fontWeight: "600",
        textAlign: "center"
    },
    titleLink:{
        textDecoration : 'none'
    },
    authBtn:{
        float : "right",
        color:"#000",
        fontWeight: "500",
        fontSize:"0.7rem"
    },
    container:{
        paddingTop:"2rem", 
        paddingLeft:"0rem"
    },
    name:{
        width:"100%",
        textAlign:"left",
        marginLeft:"0.8rem"
    },



    // mobile
    mainMobile:{
        background:"linear-gradient(to right, #667ce7, #754fa7)",
        background:'#fff',
        position: "fixed",
        padding:"1rem",
        paddingLeft:"0rem",
        top: "0",
        left : "0",
        width:"75vw", 
        height : "100vh",
        zIndex : "20",
        display:"none",
        boxShadow: "2.8px 2.8px 2.2px rgba(0, 0, 0, 0.02), 6.7px 6.7px 5.3px rgba(0, 0, 0, 0.028),12.5px 12.5px 10px rgba(0, 0, 0, 0.035),22.3px 22.3px 17.9px rgba(0, 0, 0, 0.042), 41.8px 41.8px 33.4px rgba(0, 0, 0, 0.05), 100px 100px 80px rgba(0, 0, 0, 0.07)",
        [theme.breakpoints.down('sm')]:{
            display: "block"
        }
    },
    navLinkMobile:{
        textDecoration: "none",
        borderRadius:"0 2rem 2rem 0",
    },
    classoneMobile:{
        // height:"3rem",
        width: "95%",
        background:"linear-gradient(to right, #667ce7, #754fa7)",
        background:"#fff",
        color:"#2d375a",
        // color:"#333",
        fontWeight: "400",
        fontSize: "0.6rem",
        //borderRadius:"0 2rem 2rem 0",
        display:"flex",
        alignItems: "center",
        paddingLeft:"2rem",
    },
    classtwoMobile:{
        // height:"3rem",
        width: "95%",
        background:"#d3dcf9",
        color:"#6184ff",
        color:"#608cfe",
        borderRadius:"0 2rem 2rem 0",
        boderRadius:"1rem",
        fontWeight: "400",
        fontSize: "0.6rem",
        display:"flex",
        alignItems: "center",
        paddingLeft:"2rem",
    },
    navBtnBoxMobile:{
        borderRadius:"0 2rem 2rem 0",
        
    },
    // closeBtnMobile:{
    //     float: "right",
    //     marginTop:"0.2rem",
    //     fontSize: "1.2rem",
    //     color:"#f55"
    // },
    sideBarTitleMobile:{
        color : "#212121",
        fontSize :"1.1rem",
        fontWeight: "500",
        textAlign: "center"
    },
    authBtnMobile:{
        float : "right",
        color:"#000",
        fontWeight: "500",
        fontSize:"0.6rem"
    },
    containerMobile:{
        paddingTop:"2rem", 
        paddingLeft:"0rem"
    },
    nameMobile:{
        width:"100%",
        textAlign:"left",
        marginLeft:"0.8rem"
    },
    icon:{
        width: "0.5rem"
    }
}))


//Desktop


export const Sidebar = ()=>{
    const classes = useStyles()
    const {setAuthenticated, authenticated, setOverlayState, overlayState, setLoginDetail, setMenuState, 
        menuState, setInvestments } = UseContext()
    const [clickedBtnIndex,setClickedBtnIndex] = useState()
    const history = useHistory()


    const setIndex = (value)=>{
        setClickedBtnIndex(value)

    }
    
    const setMenu =()=>{
        setMenuState(menuState)
        setOverlayState(overlayState)
    }
    const setLoginValues =(status, detail)=>{
        setAuthenticated(status)
        setLoginDetail(detail)
        setInvestments("", false)
        history.push('/')
    }
    return(<div >
        <div className={classes.main} >
            <div ><FaChevronLeft onClick={setMenu} className={classes.closeBtn}/></div>
        <Link to='/' className={classes.titleLink}><div className={classes.sideBarTitle}>Smart Invest</div></Link>
        <div className={classes.container}>
        {NavLinks.map((item, i) =>{
            const {id, name, icon, link} = item
            const index = i + 1
            return  <div key={id} className={classes.navBtnBox}>
               <Link to={link} className={classes.navLink}>
                   <Button className={ index == clickedBtnIndex ? classes.classtwo : classes.classone} onClick={()=>setIndex(id)}>
                   <span>{icon}</span><div className={classes.nameMobile}>{name}</div></Button>
                </Link>
            </div>
        })}
        </div>
         {authenticated ? 
        <Button onClick={()=>setLoginValues(false, '')} className={classes.authBtn}>Logout</Button> :
        <>
            <Link to={'../login'}><Button className={classes.authBtn}>Login</Button></Link>
            <Link to={'../login'}><Button className={classes.authBtn}>Register</Button></Link>
        </>
        }
        </div>
        
    </div>)
}




//Mobile
export const SidebarMobile = ()=>{
    const classes = useStyles()
    const {setAuthenticated, authenticated, setOverlayState, overlayState, setLoginDetail, setMenuState, 
        menuState, setInvestments } = UseContext()
    const [clickedBtnIndex,setClickedBtnIndex] = useState()
    const history = useHistory()

    
    const setIndex = (value)=>{
        setClickedBtnIndex(value)
        setMenuState(menuState)
    }
    
    const setMenu =()=>{
        setMenuState(menuState)
        setOverlayState(overlayState)
    }
    const setLoginValues =(status, detail)=>{
        setAuthenticated(status)
        setLoginDetail(detail)
        setInvestments("", false)
        history.push('/')
    }
    return(<Container >
        {menuState && <div className={classes.mainMobile} >
            <div ><FaChevronLeft onClick={setMenu} className="closeBtnMobile"/></div>
        <div className={classes.sideBarTitleMobile}>Smart Invest</div>
        <div className={classes.containerMobile}>
        {NavLinks.map((item, i) =>{
            const {id, name, icon, link} = item
            const index = i + 1
            return  <div key={id} className={classes.navBtnBoxMobile}>
               <Link to={link} className={classes.navLink}>
                   <Button className={ index == clickedBtnIndex ? classes.classtwoMobile : classes.classoneMobile} onClick={()=>setIndex(id)}>
                   <span>{icon}</span><div className={classes.nameMobile}>{name}</div></Button>
                </Link>
            </div>
        })}
        {authenticated &&
        <Link to='/dashboard' className={classes.navLink}>
            {/* <Button className={classes.classoneMobile}> */}
            <Button className={ classes.classoneMobile}>
            <span className={ classes.icon}><FaTh /></span><div className={classes.nameMobile}>My Dashboard</div></Button>
        </Link>
        }
        </div>
        <Divider />
         {authenticated ? 
        <Button onClick={()=>setLoginValues(false, '')} className={classes.authBtnMobile}>Logout</Button> :
        <>
            <Link to={'../login'}><Button className={classes.authBtnMobile} onClick={setMenu} >Login</Button></Link>
            <Link to={'../signup'}><Button className={classes.authBtnMobile} onClick={setMenu} >Register</Button></Link>
        </>
        }
        </div>}
        
    </Container>)
}
