const defaultstate = {
    user: {
        
    },
    jwt : null,
    userType : "customer"
}


const reducer  = (state = defaultstate ,action ) => {
    if(action.type === 'LOGIN'){
        return {
            ...state,
            jwt : action.payload.jwt,
            userType : action.payload.userType
        }
    }else if(action.type === 'REGISTER'){

    }else if(action.type === 'ADD_USER'){

    }else if(action.type === "LOAD_USER"){
        return {
            ...state,
            jwt : action.payload.jwt,
            user : action.payload.user
        }
    }else{
        return state;
    }
}


export default reducer;