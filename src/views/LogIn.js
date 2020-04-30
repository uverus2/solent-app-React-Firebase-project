import React, {useState} from 'react';

//Components
import Bottom from "../components/Deviders/BottomDevider";
import LogInForm from "../components/Forms/loginForm";
export default function LogIn(props) {
    const {signInEmailUser} = props;
    const [error, setError] = useState("");

    const logInSubmit = async(data) => {
        try {
          setError("");
          const { email, password } = data;
          await signInEmailUser(email, password);
        } catch (error) {
          setError(error.message);
        };
    };

    return (
        <div className="top-wrap"> 
            <div className="content-wrap">
                <div className="logo">
                    <img src="/images/logo.png" alt=""/>
                </div>
                {error !== "" && (<p className="error text-center">{error}</p>)}
                <LogInForm onSubmit={logInSubmit}/>
            </div>
            <Bottom/>
        </div>
    )
}
