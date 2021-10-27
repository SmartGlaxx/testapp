import React, {useContext, useEffect, useReducer} from 'react'
import { reducer } from '../reducers.js/reducer'
import Actions from '../utils/actions'
const { AUTHENTICATED, MENUACTION, MENUDESKTOPACTION, OVERLAYACTION, USERCREATED, 
LOGINDETAIL, USERDETAIL , SETUSERFULLDATA, SETPACKAGEDATA } = Actions 

const AppContext = React.createContext()

const authJsonData = ()=>{
    if(localStorage.getItem('authenticated')){
        const authData = JSON.parse(localStorage.getItem('authenticated'))
        const strToBool =  (authData == 'true')
        return strToBool
    }else{
        return false
    }
}
const loginJsonData = ()=>{
    if(localStorage.getItem('login')){
        const loginName = JSON.parse(localStorage.getItem('login'))
        return loginName
    }else{
        return ''
    }
}
const getPackagedata = ()=>{
    if(localStorage.getItem('packagedata')){
        const packagedataValue = JSON.parse(localStorage.getItem('packagedata'))
        return packagedataValue
    }else{
        return {}
    }
}

const InitialState = {
    userCreated : false,
    authenticated: authJsonData(),
    menuState : false,
    overlayState : false,
    loginDetail : loginJsonData(),
    userDetail : '',
    userFullData : {},
    packageData: getPackagedata()
}
export const AppProvider = ({children})=>{
    const [state, dispatch] = useReducer(reducer, InitialState)

    const setLoading = (value)=>{
        // dispatch later
    }

    const setAuthenticated =(value)=>{
        let storageValue
        if(value== true){
            storageValue = 'true'
            localStorage.setItem('authenticated', JSON.stringify(storageValue))
        }else if(value==false){
            storageValue = 'false'
            localStorage.setItem('authenticated', JSON.stringify(storageValue))
        }
        
        dispatch({type: AUTHENTICATED , payload : value})
    }
    const setMenuState = (value)=>{
        dispatch({type: MENUACTION, payload: value})
    }
    const setMenuDesktopState = (value)=>{
        dispatch({type: MENUDESKTOPACTION, payload: value})
    }
    
    const setOverlayState = (value)=>{     
       dispatch({type: OVERLAYACTION, payload: value})
    }
    const setUserCreated = (value)=>{
        dispatch({type: USERCREATED, payload: value})
     }
     const setLoginDetail = (value)=>{
         if(state.authenticated == false){
            localStorage.setItem('login', JSON.stringify(value)) 
              
         }else if(state.authenticated == true){
            localStorage.setItem('login', JSON.stringify(''))
               
         }
        
        dispatch({type: LOGINDETAIL, payload: value})
     }
     const setUserDetail = (value)=>{
        dispatch({type: USERDETAIL, payload: value})
     }

     const setUserFullData =(values)=>{
        dispatch({type : SETUSERFULLDATA, payload: values})
     }

     const setInvestmentDeposited = (value)=>{
        // dispatch later
     }
     const setPackageData =(value)=>{
         localStorage.setItem('packagedata', JSON.stringify(value))
         dispatch({type: SETPACKAGEDATA, payload : value})
     }

    return <AppContext.Provider value={{
        ...state, setLoading, setAuthenticated, setOverlayState, setMenuState, setMenuDesktopState, setUserCreated,
        setLoginDetail, setUserDetail, setUserFullData, setPackageData
    }}>
    {children}
    </AppContext.Provider>
}

export const UseContext = ()=>{
    return useContext(AppContext)
}