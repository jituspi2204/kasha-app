export const login = (data) => {
    return{
        type : "LOGIN",
        payload : {
            jwt : data.jwt,
            userType : data.userType
        }
    }
}

export const register = () => {

}

export const newUser = () => {

}

export const logout  = () => {
    
}


export const loadUser = (data) => {
    return {
        type : "LOAD_USER",
        payload : {
            jwt : data.jwt,
            user : data.user
        }
    }
}