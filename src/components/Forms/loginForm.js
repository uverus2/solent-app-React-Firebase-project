import React from 'react';

// Form validation
import { useForm } from 'react-hook-form';
import { string, object } from 'yup';

let schema = object().shape({
    email: string().email("It must be a valid email").required("Field is required").max(20,"Only 6 characters"),
    password: string().required("Field is required").min(6, "Password must be larger than 7 characters")
});

export default function LoginForm(props) {

    const {onSubmit} = props;

    const { register, handleSubmit, reset, errors } = useForm({validationSchema:schema});

    const handleInnerSubmit = data => {
        onSubmit(data);
        reset();
    };

    return (
            <form onSubmit={handleSubmit(handleInnerSubmit)}>
                <div className="form-elements-wrap">
                    <div className="flex-center flex-d-column py-1">
                        <label htmlFor="Email">Email</label>
                        <input type="email" name="email" ref={register}/>
                        {errors.email && (<p className="error py-1"> {errors.email.message} </p>)}
                    </div>
                    <div className="flex-center flex-d-column py-1">
                        <label htmlFor="Password">Password</label>
                        <input type="password" name="password" ref={register}/>
                        {errors.password && (<p className="error py-1"> {errors.password.message} </p>)}
                    </div>
                    <div className="flex-center pt-3 flex-d-column">
                        <button className="main">Log In</button>
                    </div>
                </div>
            </form>
    )
}
