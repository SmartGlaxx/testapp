import Actions from '../utils/actions'
const { AUTHENTICATED, MENUACTION, MENUDESKTOPACTION, OVERLAYACTION, USERCREATED,
    LOGINDETAIL, USERDETAIL ,SETUSERFULLDATA, SETPACKAGEDATA  }= Actions

export const reducer = (state, action)=>{
    switch(action.type){ 
        case MENUACTION : 
            const menuValue = !action.payload
            return {...state, menuState : menuValue}
        case MENUDESKTOPACTION : 
            const menuValueDesktop = !action.payload
            return {...state, menuState : menuValueDesktop}
        case OVERLAYACTION : 
            const overlayValue = !action.payload
            return {...state, overlayState : overlayValue}
        case USERCREATED : 
            return {...state, userCreated: action.payload}
        case AUTHENTICATED :
            return {...state, authenticated : action.payload}
        case LOGINDETAIL :
            return {...state, loginDetail : action.payload}
        case USERDETAIL :
            return {...state, userDetail : action.payload}
        case SETUSERFULLDATA :
            return {...state, userFullData : action.payload}
        case SETPACKAGEDATA :
            return {...state, packageData: action.payload}
            
            
        default : 
        return {...state}
    }
}

