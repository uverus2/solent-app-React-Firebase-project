import React, {useState, useEffect} from 'react';

// Form validation
import { useForm } from 'react-hook-form';
import { string, object, ref, array } from 'yup';
import { Multiselect } from 'react-widgets';
import { DropdownList } from 'react-widgets';

let schema = object().shape({
    name:string().required("Field is required"),
    roles:string().required("Field is required"),
    skills:string().required("Field is required"),
    description: string().required("Field is required"),
});

export default function ProjectForm(props) {

    const {onSubmit} = props;

    const [skillsValue, setskillsValue] = useState([]);
    const [skillsList, setskillsList] = useState(["Web Design", "Web Development", "Law", "Marketing", "HTML5", "CSS", "Javascript", "PHP"]);

    const [rolesValue, setRolesValue] = useState([]);
    const [rolesList, setRolesList] = useState(["Web Designer", "Web Developer"]);
    
    const changeArraySkills = (value) => {
        setskillsValue(value);
    };
    
    const handleCreateSkills = (name) => {
        setskillsValue([...skillsValue,name]);
        setskillsList([...skillsList,name]);
    };

    const changeArrayRoles = (value) => {
        setRolesValue(value);
    };
    
    const handleCreateRoles = (name) => {
        setRolesValue([...rolesValue,name]);
        setRolesList([...rolesList,name]);
    };

    const { register, handleSubmit, reset, errors } = useForm({validationSchema:schema});

    const handleInnerSubmit = data => {
        onSubmit(data);
        reset();
    };


    return (
            <form onSubmit={handleSubmit(handleInnerSubmit)}>
                <div className="form-elements-wrap">
                    <div className="flex-center flex-d-column py-1">
                        <label htmlFor="Name">Project Name</label>
                        <input type="text" name="name" ref={register}/>
                        {errors.name && (<p className="error py-1"> {errors.name.message} </p>)}
                    </div>
                    <div className="flex-center flex-d-column py-1">
                        <label htmlFor="skills">Skills List</label>
                        <input type="hidden" value={skillsValue} name="skills" ref={register} readOnly/>
                        <Multiselect className="multi" data={skillsList} value={skillsValue} allowCreate="onFilter" autoFocus={true} onCreate={name => handleCreateSkills(name)} onChange={value => changeArraySkills(value) } textField="name" />
                        {errors.skills && (<p className="error"> {errors.skills.message} </p>)}
                    </div>
                    <div className="flex-center flex-d-column py-1">
                        <label htmlFor="roles">Roles</label>
                        <input type="hidden" value={rolesValue} name="roles" ref={register} readOnly/>
                        <Multiselect className="multi" data={rolesList} value={rolesValue} allowCreate="onFilter" autoFocus={true} onCreate={name => handleCreateRoles(name)} onChange={value => changeArrayRoles(value) } textField="name" />
                        {errors.roles && (<p className="error"> {errors.roles.message} </p>)}
                    </div>
                    <div className="flex-center flex-d-column py-1">
                        <label htmlFor="description">Project Description</label>
                        <textarea type="text" name="description" ref={register} rows="4" cols="40"></textarea>
                        {errors.description && (<p className="error py-1"> {errors.description.message} </p>)}
                    </div>
                    <div className="flex-center pt-3 flex-d-column">
                        <button className="secondary">Create Now</button>
                    </div>
                </div>
            </form>
    )
}
