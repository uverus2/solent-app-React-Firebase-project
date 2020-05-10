import React, {useState,useContext} from 'react';
import {useHistory} from "react-router-dom";
import userContext from "../store/userStore";

//Components
import UpdateForm from "../components/Forms/UpdateForm";
export default function UpdateProfile(props) {
    const {updateProfile} = props;
    const [serverError, setServerErrorMessage] = useState("");
    const user = useContext(userContext);
    console.log(user);

    const history = useHistory();

    const goBack = ()=> {
        history.goBack();
    };

    const updateUserProfile = async(data) => {
        try{
            setServerErrorMessage("");
            let userData = {
                email:data.email,
                name: data.name,
                surname: data.surname,
                role:data.role,
                course: data.course,
                studyYear: data.studyYear,
                skills: data.skills.split(","),
                description: data.description
            };
            updateProfile(`${user.id}`,userData);
            window.location.replace("/profile");
        }catch(e){
            setServerErrorMessage(e.message);
        }
    };

    return (
        <div className="top-wrap mb-3"> 
            <div className="content-wrap">
            <div className="pt-2 pb-1 comment-review">
                    <a onClick={goBack}>Go back</a>
                </div>
                <div className="logo">
                    <img alt="logo" src="/images/logo.png" alt=""/>
                </div>
                <h1 className="text-center py-3">Edit Profile</h1>
                {serverError !== "" && <p className="error"> {serverError} </p>}
                <UpdateForm user={user} onSubmit={updateUserProfile} buttonText="Save Now"/>
            </div>
        </div>
    )
}
