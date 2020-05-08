import React, {useState} from 'react';

// Form validation
import { useForm } from 'react-hook-form';
import { string, object } from 'yup';
import { Multiselect } from 'react-widgets';
import { DropdownList } from 'react-widgets';
import {Link} from "react-router-dom";

let schema = object().shape({
    email: string().email("It must be a valid email").required("Field is required"),
    name:string().required("Field is required").matches(/^\S*$/, "No Spaces Allowed"),
    surname:string().required("Field is required").matches(/^\S*$/, "No Spaces Allowed"),
    role:string().required("Field is required"),
    course:string().required("Field is required"),
    studyYear:string().required("Field is required"),
    skills:string().required("Field is required"),
    description: string().required("Field is required").max(145,"Max 145 characters"),
});

export default function UpdateForm(props) {

    const {onSubmit, buttonText, user,registerValue} = props;

    let [characters, limitCharacters] = useState(145);
    const [skillsValue, setskillsValue] = useState(user.skills);
    const [skillsList, setskillsList] = useState(["Web Design", "Web Development", "Law", "Marketing", "HTML5", "CSS", "Javascript", "PHP"]);
    const [year,setStudyYear] = useState(user.studyYear);
    const changeArray = (value) => {
        setskillsValue(value);
    };
    
    const handleCreate = (name) => {
        setskillsValue([...skillsValue,name]);
        setskillsList([...skillsList,name]);
    };

    const charactersCount = (e) => {
        if(characters <= 145) {
            limitCharacters(characters = characters - 1);
        }
        if(characters <= 0) {
            limitCharacters(characters = 0);
        }
    };

    const { register, handleSubmit, errors } = useForm({validationSchema:schema});

    const handleInnerSubmit = data => {
        onSubmit(data);
    };


    const yearOptions = ["First Year", "Second Year", "Third Year", "Masters Year", "Placement Year"];

    return (
            <form onSubmit={handleSubmit(handleInnerSubmit)}>
                <div className="form-elements-wrap">
                    <div className="flex-center flex-d-column py-1">
                        <label htmlFor="Email">Email</label>
                        <input type="email" name="email" defaultValue={user.email} ref={register}/>
                        {errors.email && (<p className="error pt-1"> {errors.email.message} </p>)}
                    </div>
                    <div className="flex-center flex-d-column py-1">
                        <label htmlFor="Name">Name</label>
                        <input type="text" name="name" defaultValue={user.name} ref={register}/>
                        {errors.name && (<p className="error py-1"> {errors.name.message} </p>)}
                    </div>
                    <div className="flex-center flex-d-column py-1">
                        <label htmlFor="Surname">Surname</label>
                        <input type="text" name="surname" defaultValue={user.surname} ref={register}/>
                        {errors.surname && (<p className="error py-1"> {errors.surname.message} </p>)}
                    </div>
                    <div className="flex-center flex-d-column py-1">
                        <label htmlFor="Role">Role</label>
                        <input type="text" name="role" defaultValue={user.role} ref={register}/>
                        {errors.role && (<p className="error py-1"> {errors.role.message} </p>)}
                    </div>
                    <div className="flex-center flex-d-column py-1">
                        <label htmlFor="Course">Course</label>
                        <input type="text" name="course" defaultValue={user.course} ref={register}/>
                        {errors.course && (<p className="error py-1"> {errors.course.message} </p>)}
                    </div>
                    <div className="flex-center flex-d-column py-1">
                        <label htmlFor="Study Year">Year of study</label>
                        <DropdownList data={yearOptions} onChange={value => setStudyYear(value)} defaultValue={user.studyYear}/>
                        <input type="hidden" value={year} name="studyYear" ref={register} readOnly/>
                        {errors.studyYear && (<p className="error py-1"> {errors.studyYear.message} </p>)}
                    </div>
                    <div className="flex-center flex-d-column py-1">
                        <label htmlFor="skills">Skills</label>
                        <input type="hidden" value={skillsValue} name="skills" ref={register} readOnly/>
                        <Multiselect className="multi" data={skillsList} value={skillsValue} allowCreate="onFilter" autoFocus={true} onCreate={name => handleCreate(name)} onChange={value => changeArray(value) } textField="name" />
                        {errors.skills && (<p className="error"> {errors.skills.message} </p>)}
                    </div>
                    <div className="flex-center flex-d-column py-1">
                        <label htmlFor="description">Short Description</label>
                        <textarea type="text" name="description" defaultValue={user.description} ref={register} maxLength="145" onKeyPress={charactersCount} rows="4" cols="40"></textarea>
                        <p className="align-self-end">{characters} chars</p>
                        {errors.description && (<p className="error py-1"> {errors.description.message} </p>)}
                    </div>
                        {registerValue && (
                        <div className="flex-center pt-1 flex-d-column py-1">
                            <p>Already have an account. <Link to="/login"> Log in here </Link></p>
                        </div>
                        )}
                    <div className="flex-center pt-3 flex-d-column">
                    <button className="secondary">{buttonText}</button>
                    </div>
                </div>
            </form>
    )
}
