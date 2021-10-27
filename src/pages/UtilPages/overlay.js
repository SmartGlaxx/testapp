import { makeStyles } from "@material-ui/core"
import { UseContext } from "../../contexts.js/context"


const useStyles = makeStyles((theme) => ({
    main:{
        background:"rgba(30,20,60, 0.6)",
        position: "fixed",
        top: "0",
        left : "0",
        width:"100vw", 
        height : "100vh",
        zIndex:"15",
    }
    
})) 


const Overlay = ()=>{
    const classes= useStyles()
    const {setOverlayState, overlayState, setMenuState, menuState} = UseContext()

    const setMenu =()=>{
        setMenuState(menuState)
        setOverlayState(overlayState)
    }

    return(<div>
        {overlayState && 
        <span onClick={setMenu}>
            <div className={classes.main}></div>
        </span>
        }
    </div>)
}

export default Overlay