import React, {useContext} from 'react';
import userContext from "../store/userStore";
import {useHistory} from "react-router-dom";

//Components
import Header from "../components/Header";
import Hero from "../components/HeroSection";

// Form validation
import { useForm } from 'react-hook-form';
import { string, object } from 'yup';

let schema = object().shape({
    message: string().required("Field is required")
});

export default function Project(props) {

    const history = useHistory();
    const { register, handleSubmit, reset, errors } = useForm({validationSchema:schema});

    const goBack = ()=> {
        history.goBack();
    };

    const onSubmit = data => {
        console.log(data);
        reset();
    };
    return (
        <div className="h-100">
            <Hero/>
            <div className="content-wrap text-center">
                <h1 className="py-2">Project Name</h1>
                <div className="pt-2 pb-1 comment-review">
                    <a onClick={goBack}>Go back</a>
                    <p>5 User Number</p>
                </div>
                <div className="comment-wrap m-auto py-3">
                    <div className="comment-image">
                        <p>KR</p>
                    </div>
                    <div className="comment-box comment-boxes">
                        <p>Hello guys</p>
                    </div>
                    <div className="my-comment comment-boxes">
                        <p>My comment</p>
                    </div>
                </div>
            </div>
            <form className="py-3" action="">
                {errors.message && (<p className="error text-center py-1"> {errors.message.message} </p>)}
                <div className="leave-comment m-auto">
                    <input type="text" name="message" placeholder="Type Message" ref={register}/>
                    <img src="/images/arrow-rigth.png" onClick={handleSubmit(onSubmit)} alt=""/>
                </div>
            </form>
            <Header/>
        </div>
    )
}
