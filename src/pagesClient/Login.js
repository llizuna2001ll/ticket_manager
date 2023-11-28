import AuthContainer from "../components/AuthContainer";
import React from "react";
function Login() {
    const style = {
        height: '100vh',
        alignItems: 'center',
        backgroundImage: 'url("images/bg.jpg")',
        backgroundSize: 'cover',
        backgroundRepeat: 'np-repeat',
        backgroundPositionX: 'center',
        backgroundPositionY: 'left 30px',

    }
    const style2 = {
        position: 'absolute',
        top: '15%',
        left: '20%',
        width: '60%'
    }
    return (

        <div style={style}>
            <div style={style2}>
                <AuthContainer/>
            </div>
        </div>
    );
}

export default Login;
