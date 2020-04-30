import React, {useContext} from 'react';
import userContext from "../store/userStore";
import {Link} from "react-router-dom";

//Components
import TopDevider from "../components/Deviders/TopDevider";
import Header from "../components/Header";

export default function Profile(props) {

    return (
        <div className="h-100">
            <div className="hero-styles flex-center py-2 profile-hero">
                <div className="logo ">
                    <img src="/images/logo.png" alt=""/>
                </div>
            </div>
            <TopDevider/>
            <div className="content-wrap profile-inner">
                <h1>User Profile</h1>
                <div className="details-container py-2">
                    <div>
                        <div className="flex-end">
                            <img src="/images/user-profile.png" alt=""/>
                        </div>
                    </div>
                    <div className="text-left px-3">
                        <p><span>Name:</span></p>
                        <p><span>Email:</span></p>
                        <p><span>Course:</span></p>
                        <p><span>Year of study:</span></p>
                    </div>
                </div>
                <div className="pb-2">
                    <p><span>Description:</span></p>
                    <p><span>Skills:</span></p>
                </div>
                <div className="pb-2">
                    <Link to="/profile-edit"><button className="secondary">Edit Profile</button></Link>
                </div>
            </div>
            <Header/>
        </div>
    )
}
