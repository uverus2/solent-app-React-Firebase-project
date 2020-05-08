import React, {useState,useContext} from 'react';
import {useHistory} from "react-router-dom";
import userContext from "../store/userStore";

//Components
import CreateProjectForm from "../components/Forms/CreateProject";
export default function CreateProject(props) {
    const {createProject} = props;
    const user = useContext(userContext);
    console.log(user);

    const [serverError, setServerErrorMessage] = useState("");

    const history = useHistory();

    const goBack = ()=> {
        history.goBack();
    };

    const createNewProject = async(data) => {
        try {
            setServerErrorMessage("");
            const projectData = {
                name:data.name,
                skills:data.skills.split(","),
                topic:data.topic,
                roles:data.roles.split(","),
                description:data.description,
                owner:user.id,
                users:[]
            };

            await createProject(projectData);
            window.location.replace("/");
            
        } catch(e) {
            setServerErrorMessage(e.message);
        }
    };

    return (
        <div className="top-wrap"> 
            <div className="content-wrap">
                <div className="pt-2 pb-1 comment-review">
                    <a onClick={goBack}>Go back</a>
                </div>
                <div className="logo">
                    <img src="/images/logo.png" alt=""/>
                </div>
                <h1 className="text-center py-3">Create a Project</h1>
                {serverError !== "" && <p className="text-center error"> {serverError} </p>}
                <CreateProjectForm onSubmit={createNewProject}/>
            </div>
        </div>
    )
}
