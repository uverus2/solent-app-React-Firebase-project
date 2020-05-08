import React, {useState} from 'react';
import {useHistory} from "react-router-dom";
import { useForm } from 'react-hook-form';
import { string, object,ref} from 'yup';

let schema = object().shape({
    password: string().required("Field is required").matches(/^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,"Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"),
    password2: string().oneOf([ref('password')], 'Passwords do not match'),
});

export default function UpdateProfile(props) {
    const {updateUserPassword} = props;
    const [serverError, setServerErrorMessage] = useState("");

    const { register, handleSubmit, errors } = useForm({validationSchema:schema});

    const history = useHistory();

    const goBack = ()=> {
        history.goBack();
    };

    const onSubmit = async data => {
        console.log(data);
        try{
            setServerErrorMessage("");
            updateUserPassword(`${data.password}`);
            window.location.replace("/profile");
        }catch(e){
            setServerErrorMessage(e.message);
        }
    };

    return (
        <div className="top-wrap mb-3"> 
            <div className="content-wrap">
            <div className="pt-2 pb-1 comment-review">
                    <a href="#" onClick={goBack}>Go back</a>
                </div>
                <div className="logo">
                    <img src="/images/logo.png" alt=""/>
                </div>
                <h1 className="text-center py-3">Edit Profile</h1>
                {serverError !== "" && <p className="error"> {serverError} </p>}
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-elements-wrap">
                        <div className="flex-center flex-d-column py-1">
                            <label htmlFor="Password">Password</label>
                            <input type="password" name="password" ref={register}/>
                            {errors.password && (<p className="error pt-1"> {errors.password.message} </p>)}
                        </div>
                        <div className="flex-center flex-d-column py-1">
                            <label htmlFor="Password">Re-Enter Password</label>
                            <input type="password2" name="password2" ref={register}/>
                            {errors.password2 && (<p className="error py-1"> {errors.password2.message} </p>)}
                        </div>
                        <div className="flex-center pt-3 flex-d-column">
                        <button className="secondary">Update Password</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}
