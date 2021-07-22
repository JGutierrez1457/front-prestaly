import React from 'react'
import { useHistory, useLocation } from 'react-router-dom'

function SignIn() {
    const location = useLocation();
    const history = useHistory();
    const { from  } = location.state || { from : { pathname : "/"}}
    const login = ()=>{
        history.replace(from);
    }
    return (
        <div>
            Login
            <button onClick={login}>Log In</button>
        </div>
    )
}

export default SignIn