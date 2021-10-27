import Header from "../../components/header"
import { makeStyles } from "@material-ui/core"
import { Redirect } from "react-router"
import { mergeClasses } from "@material-ui/styles"

const useStyles = makeStyles((theme) =>({
    main:{
        height:"auto",
        display: "grid",
        padding: "5rem 5rem 8rem",
        justifyContent : "center",
       // background: "linear-gradient(125deg, #873ab7, #58319c)",
       backgroundImage : `linear-gradient(123deg,  blue, #2233ff, rgba(225,225,225, 0.7)), url(${Image})`,
       backgroundPosition: 'center',
       backgroundAttachment : 'fixed',
       backgroundSize: 'cover',
       //objectFit: "cover",
       backgroundRepeat: "no-repeat"
    },
}))



const ComfirmEmail = ()=>{
    const classes = useStyles()

    if(!document.referrer.includes('/signup')){
        return <Redirect to= '/'/>
    }

    return<div>
        <Header />
        <div className={classes.main}>
            <h2>Notification</h2>
            <p>An email has been sent to the email address you provided. Follow the link attached to it to comfirm your registertion.</p>
        </div>
    </div>
}

export default ComfirmEmail