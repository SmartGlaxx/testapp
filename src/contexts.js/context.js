import React, {useContext, useEffect, useReducer} from 'react'
import { reducer } from '../reducers.js/reducer'
import Actions from '../utils/actions'
import axios from 'axios'
const { AUTHENTICATED, MENUACTION, MENUDESKTOPACTION, OVERLAYACTION, USERCREATED, USERVERIFIED,
LOGINDETAIL, USERDETAIL , USERFULLDATA, SETPACKAGEDATA, SETINVESTMENTDEPOSITED,
 USERAUTHDATA, REGISTERED, SETLOADING } = Actions 

const AppContext = React.createContext()

const authJsonData = ()=>{
    if(localStorage.getItem('authenticated')){
        const authData = JSON.parse(localStorage.getItem('authenticated'))
        if(authData == 'true'){
            return true
        }else{
            return false
        }
    }else{
        return false
    }
}
const getUserCreated = ()=>{
    if(localStorage.getItem('userCreated')){
        const userData = JSON.parse(localStorage.getItem('userCreated'))
        if(userData == 'true'){
            return true
        }else{
            return false
        }
    }else{
        return false
    }
}
const getUserVerified= ()=>{
    if(localStorage.getItem('userVerified')){
        const userData = JSON.parse(localStorage.getItem('userVerified'))
        if(userData == 'true'){
            return true
        }else{
            return false
        }
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

const getUserdata = ()=>{
    if(localStorage.getItem('userData')){
        const userdataValue = JSON.parse(localStorage.getItem('userData'))
        return userdataValue
    }else{
        return {}
    }
}

const getUserAuthdata = ()=>{
    if(localStorage.getItem('userAuthData')){
        const userAuthdDtaValue = JSON.parse(localStorage.getItem('userAuthData'))
        return userAuthdDtaValue
    }else{
        return {}
    }
}


const InitialState = {
    loading : false,
    userCreated : getUserCreated(), 
    userVerified : getUserVerified(),
    authenticated: authJsonData(),
    menuState : false,
    overlayState : false,
    registered : false,
    signupDetails : {},
    loginDetail : loginJsonData(),
    userDetail : '',
    userAuthData : getUserAuthdata(),
    userFullData : getUserdata(),
    packageData: getPackagedata(),
    inevstementDeposited : false
}
export const AppProvider = ({children})=>{
    const [state, dispatch] = useReducer(reducer, InitialState)
    const url = 'https://investapp3.herokuapp.com/api/v1/auth/users/'
    const url2 = 'https://investapp3.herokuapp.com/api/v1/users'

    // const fetchCreatedUsers=async(url)=>{
    //     await axios.get(url)
    //    .then(res =>{
    //     const usersCreated =  res.data.usersData
    //     usersCreated.filter(user =>{
    //       if(user.email === state.loginDetail || user.username === state.loginDetail){
              
    //         dispatch({type : USERCREATED , payload: true})
    //         dispatch({type : USERFULLDATA, payload : user})
    //       }else{            
    //         dispatch({type : USERCREATED , payload: false})
    //       }
    //     })
        
    //   })
    //   }
    //   useEffect(()=>{
    //     fetchCreatedUsers(url) 
    //   },[state.loginDetail])
// console.log(state.userFullData)

// console.log('signupDetails',state.signupDetails)
const fetchUserData = async(url)=>{
   
    await axios(url).then(response => {
        const {usersAuth} = response.data
       
        usersAuth.map(userAuth =>{
            
            if(userAuth.email === state.signupDetails.email || userAuth.username === state.signupDetails.username){ 
                let storageValue
                if(state.userAuthData.email){
                    storageValue = userAuth
                    localStorage.setItem('userAuthData', JSON.stringify(storageValue))
                }else if(!state.userAuthData.email){
                    storageValue = {}
                    localStorage.setItem('userAuthData', JSON.stringify(storageValue))
                }

                 dispatch({type : USERAUTHDATA, payload : userAuth})
            }
            else{
                return
            }
        })
       
    })
    
}
useEffect(()=>{
    fetchUserData(url)
},[state.registered, state.authenticated,  state.signupDetails, state.loginDetail])

const fetchCreatedUsers=async(url2)=>{
    await axios.get(url2)
   .then(res =>{
    const usersCreated =  res.data.usersData
    usersCreated.filter(user =>{
         if(state.authenticated){
            let storageValue
            if(user.email === state.loginDetail || user.username === state.loginDetail){
                storageValue = 'true'
                localStorage.setItem('userCreated', JSON.stringify(storageValue))
                dispatch({type: USERCREATED, payload: true})
                dispatch({type: USERFULLDATA, payload: user})

                if(user.smsVerified == true){
                    localStorage.setItem('userVerified', JSON.stringify(storageValue))
                }else{
                    storageValue = 'false'
                    localStorage.setItem('userVerified', JSON.stringify(storageValue))
                }
            }else{      
                storageValue = 'false'
                localStorage.setItem('userCreated', JSON.stringify(storageValue))      
                setUserCreated(false)
            }
         }
    })
        
  })
  }
  useEffect(()=>{
    fetchCreatedUsers(url2) 
  },[state.userVerified, state.authenticated,  state.loginDetail])
 


    // const setLoading = (value)=>{
    //    dispatch({type: SETLOADING, payload: value})
    // }
  

    const setAuthenticated =(value)=>{
        let storageValue
        if(value== true){
            storageValue = 'true'
            localStorage.setItem('authenticated', JSON.stringify(storageValue))
        }else if(value==false){
            storageValue = 'false'
            localStorage.setItem('authenticated', JSON.stringify(storageValue))
            localStorage.setItem('userCreated', JSON.stringify(storageValue))
            localStorage.setItem('userVerified', JSON.stringify(storageValue))
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
        let storageValue 
        if(value == true){
            storageValue = 'true'
            localStorage.setItem('userCreated', JSON.stringify(storageValue))
        }else if(value == false){
            storageValue = 'false'
            localStorage.setItem('userCreated', JSON.stringify(storageValue))
        }
        dispatch({type: USERCREATED, payload: value})
     }
     const setUserVerified = (value)=>{
        let storageValue 
        if(value == true){
            storageValue = 'true'
            localStorage.setItem('userVerified', JSON.stringify(storageValue))
            localStorage.setItem('authenticated', JSON.stringify(storageValue))
            localStorage.setItem('userCreated', JSON.stringify(storageValue))
        }else if(value == false){
            storageValue = 'false'
            localStorage.setItem('userVerified', JSON.stringify(storageValue))
        }
        dispatch({type: USERVERIFIED, payload: {value}})
     }
    const setLoginDetail = (value, detail)=>{
         if(state.authenticated == false){
            localStorage.setItem('login', JSON.stringify(value)) 
            localStorage.setItem('userAuthData', JSON.stringify(detail)) 
              
         }else if(state.authenticated == true){
            localStorage.setItem('login', JSON.stringify(''))
            localStorage.setItem('userAuthData', JSON.stringify({})) 
         }
        
        dispatch({type: LOGINDETAIL, payload: {value,detail}})
     }
     const setUserDetail = (value)=>{
        dispatch({type: USERDETAIL, payload: value})
     }

     const setUserFullData =(values)=>{
        if(values){
            localStorage.setItem('userData', JSON.stringify(values)) 
              
         }else{
            localStorage.setItem('userData', JSON.stringify({}))
               
         }
        dispatch({type : USERFULLDATA, payload: values})
     }

     const setInvestmentDeposited = (value)=>{
        dispatch({type : SETINVESTMENTDEPOSITED , payload : value})
     }
     const setPackageData =(value)=>{
         localStorage.setItem('packagedata', JSON.stringify(value))
         dispatch({type: SETPACKAGEDATA, payload : value})
     }

     const setRegistered = (value1, value2)=>{
         dispatch({type : REGISTERED , payload : {value1, value2}})
     }


    //  start from setRegistered

    return <AppContext.Provider value={{
        ...state,  setAuthenticated, setOverlayState, setMenuState, setMenuDesktopState,
        setLoginDetail, setUserDetail, setUserCreated, setUserVerified, setUserFullData, setPackageData, setInvestmentDeposited,
        setRegistered
    }}>
    {children}
    </AppContext.Provider>
}

export const UseContext = ()=>{
    return useContext(AppContext)
}