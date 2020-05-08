import React from 'react';

// Form validation
import { useForm } from 'react-hook-form';
import { string, object } from 'yup';

let schema = object().shape({
    role: string().required("Field is required")
});

export default function LoginForm(props) {

    const {onSubmit,role} = props;

    const { register, handleSubmit, reset, errors } = useForm({validationSchema:schema});

    const handleInnerSubmit = data => {
        onSubmit(data);
        reset();
    };

    return (
            <form onSubmit={handleSubmit(handleInnerSubmit)}>
                <div className="form-elements-wrap">
                    <div className="flex-center flex-d-column py-1">
                        <label htmlFor="role">Role</label>
                        <input type="text" name="role" defaultValue={role} ref={register}/>
                        {errors.role && (<p className="error py-1"> {errors.role.message} </p>)}
                    </div>
                    <div className="flex-center pt-3 flex-d-column">
                        <button className="main">Search</button>
                    </div>
                </div>
            </form>
    )
}
