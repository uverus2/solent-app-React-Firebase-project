import React from 'react';
import {useHistory} from "react-router-dom";

//Components
import CreateProjectForm from "../components/Forms/CreateProject";
export default function CreateProject() {

    const history = useHistory();

    const goBack = ()=> {
        history.goBack();
    };

    const createProject = (data) => {
        console.log(data)
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
                <CreateProjectForm onSubmit={createProject}/>
            </div>
        </div>
    )
}
