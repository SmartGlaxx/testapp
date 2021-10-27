
import { Redirect } from "react-router";
import { UseContext } from "../../contexts.js/context";

const AuthWrapper = ({children})=>{
    const {authenticated} = UseContext()

    if(!authenticated){
        return window.location.href = '/'
    }
    return <>{children}</>
}

export default AuthWrapper