import React, {useContext} from 'react';
import userContext from "../store/userStore";
import {Link} from "react-router-dom";


//Components
import TopDevider from "../components/Deviders/TopDevider";
import Header from "../components/Header";

export default function Profile(props) {
    const user = useContext(userContext);
    console.log(user);

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
                <div className="details-container py-2 py-mobile-0">
                    <div>
                        <div className="flex-end">
                            <img src="/images/user-profile.png" alt=""/>
                        </div>
                    </div>
                    <div className="text-left px-3 px-mobile-0">
                        <p><span>Name: </span>{user.name} {user.surname}</p>
                        <p><span>Email: </span>{user.email}</p>
                        <p><span>Course: </span> {user.course}</p>
                        <p><span>Year of study: </span>{user.studyYear}</p>
                    </div>
                </div>
                <div className="pb-2 text-left-mobile">
                    <p><span>Description:</span> <br/> {user.description}</p>
                    <p><span>Skills:</span> <br/> {user.skills.join(" ,")}</p>
                </div>
                <div className="pb-2 flex-center flex-d-column">
                    <Link className="pb-1" to="/password-edit"> <button className="main">Edit Password</button></Link>
                    <Link to="/profile-edit"><button className="secondary">Edit Profile</button></Link>
                </div>
            </div>
            <Header/>
        </div>
    )
}
