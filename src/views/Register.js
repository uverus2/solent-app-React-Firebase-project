import React, {useState} from 'react';

//Components
import Bottom from "../components/Deviders/BottomDevider";
import RegisterForm from "../components/Forms/RegisterForm";
export default function LogIn(props) {
    const {signUpWithEmail,storeUser} = props;
    const [serverError, setServerErrorMessage] = useState("");
    const registerUser = async(data) => {
        let userData = {
            email:data.email,
            name: data.name,
            role:data.role,
            surname: data.surname,
            course: data.course,
            studyYear: data.studyYear,
            skills: data.skills.split(","),
            description: data.description
        };
        try {
            setServerErrorMessage("");
            const user = await signUpWithEmail(data.email, data.password);
            userData.id = user.user.uid;
            await storeUser(`${user.user.uid}`, userData);
        } catch(e) {
            setServerErrorMessage(e.message);
        }
    };

    return (
        <div className="top-wrap"> 
            <div className="content-wrap">
                <div className="logo">
                    <img alt="logo" src="/images/logo.png" alt=""/>
                </div>
                {serverError !== "" && <p className="text-center error"> {serverError} </p>}
                <RegisterForm onSubmit={registerUser} registerValue={true} buttonText="Register Me"/>
            </div>
            <Bottom/>
        </div>
    )
}
