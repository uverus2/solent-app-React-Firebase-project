import React from 'react';
import {useHistory} from "react-router-dom";
//Components
import RegisterForm from "../components/Forms/RegisterForm";
export default function LogIn() {

    const history = useHistory();

    const goBack = ()=> {
        history.goBack();
    };

    const updateProfile = (data) => {
        console.log(data);
    };

    return (
        <div className="top-wrap mb-3"> 
            <div className="content-wrap">
            <div className="pt-2 pb-1 comment-review">
                    <a onClick={goBack}>Go back</a>
                </div>
                <div className="logo">
                    <img src="/images/logo.png" alt=""/>
                </div>
                <h1 className="text-center py-3">Edit Profile</h1>
                <RegisterForm onSubmit={updateProfile} buttonText="Save Now"/>
            </div>
        </div>
    )
}
