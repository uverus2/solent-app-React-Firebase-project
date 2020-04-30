import React from 'react';

//Components
import Bottom from "../components/Deviders/BottomDevider";
import RegisterForm from "../components/Forms/RegisterForm";
export default function LogIn() {

    const logInSubmit = (data) => {
        console.log(data)
    };

    return (
        <div className="top-wrap"> 
            <div className="content-wrap">
                <div className="logo">
                    <img src="/images/logo.png" alt=""/>
                </div>
                <RegisterForm onSubmit={logInSubmit} registerValue={true} buttonText="Register Me"/>
            </div>
            <Bottom/>
        </div>
    )
}
