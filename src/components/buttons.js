import {Button} from '@material-ui/core'
import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles({
    heroBtn : {
        background : "#002c54",
        boxShadow: "2.8px 2.8px 2.2px rgba(0, 0, 0, 0.02),6.7px 6.7px 5.3px rgba(0, 0, 0, 0.028),12.5px 12.5px 10px rgba(0, 0, 0, 0.035),22.3px 22.3px 17.9px rgba(0, 0, 0, 0.042),41.8px 41.8px 33.4px rgba(0, 0, 0, 0.05),100px 100px 80px rgba(0, 0, 0, 0.07)",
        '&:hover':{
            color : "#16253d",
            background: "#fff"
        }
    },
    dashboardBtn:{
        background : "#002c54",
        boxShadow: "2.8px 2.8px 2.2px rgba(0, 0, 0, 0.02),6.7px 6.7px 5.3px rgba(0, 0, 0, 0.028),12.5px 12.5px 10px rgba(0, 0, 0, 0.035),22.3px 22.3px 17.9px rgba(0, 0, 0, 0.042),41.8px 41.8px 33.4px rgba(0, 0, 0, 0.05),100px 100px 80px rgba(0, 0, 0, 0.07)",
        fontSize: "0.6rem",
        color: "#fff",
        margin:"0 0.3rem",
        '&:hover':{
            color : "#16253d",
            background: "#fff"
        }
    },
    authBtn:{
        color:"#fff",
        background : "#002c54",
        boxShadow: "2.8px 2.8px 2.2px rgba(0, 0, 0, 0.02),6.7px 6.7px 5.3px rgba(0, 0, 0, 0.028),12.5px 12.5px 10px rgba(0, 0, 0, 0.035),22.3px 22.3px 17.9px rgba(0, 0, 0, 0.042),41.8px 41.8px 33.4px rgba(0, 0, 0, 0.05),100px 100px 80px rgba(0, 0, 0, 0.07)",
        fontSize: "0.6rem",
        width:"60%",
        height:"85%",
        fontSize:"0.55rem",
        marginLeft:"50%",
        transform:"translate(-50%)",
        '&:hover':{
            color : "#16253d",
            background: "#fff"
        }
    },
    loginSignupBtn:{
        color:"#fff",
        background:"red",
        background : "#002c54",
        boxShadow: "2.8px 2.8px 2.2px rgba(0, 0, 0, 0.02),6.7px 6.7px 5.3px rgba(0, 0, 0, 0.028),12.5px 12.5px 10px rgba(0, 0, 0, 0.035),22.3px 22.3px 17.9px rgba(0, 0, 0, 0.042),41.8px 41.8px 33.4px rgba(0, 0, 0, 0.05),100px 100px 80px rgba(0, 0, 0, 0.07)",
        fontSize: "0.6rem",
        width:"50%",
        height:"85%",
        fontSize:"0.7rem",
        marginLeft:"50%",
        transform:"translate(-50%)",
        '&:hover':{
            color : "#16253d",
            background: "#fff"
        }
    }
})

export function HeroButton(){
    const classes = useStyles()
    return (
        <Button className = {classes.heroBtn}>
            Get Started
        </Button>
    )
}

export function DashboardButton({children}){
    const classes = useStyles()
    return (
        <Button className = {classes.dashboardBtn}>
            {children}
        </Button>
    )
}

export function AuthButton({children}){
    const classes = useStyles()
    return (
        <Button className = {classes.authBtn}>
            {children}
        </Button>
    )
}

export function LoginSignupBtn({children}){
    const classes = useStyles()
    return (
        <Button className = {classes.loginSignupBtn} >
            {children}
        </Button>
    )
}
