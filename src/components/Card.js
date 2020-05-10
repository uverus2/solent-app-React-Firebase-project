import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";

export default function Card(props) {
    const {project, getUserStatus,user,continueButton} = props;
    let [status,setStatus] = useState({});

    if(continueButton){
        status.status = "accept";
    }
    useEffect(() => {
        let didCancel = false;
        (async()=> {
            try{
                if(getUserStatus){
                let userData = {}
                const userStatusData = await getUserStatus(project.id,user.id);
                userStatusData.forEach(i => userData = {id:i.id,...i.data()});
                if (!didCancel) {
                    setStatus(userData)
                  }
                }
            }catch(e){
                console.log(e)
            }
        })();
        return () => {
            didCancel = true;
          };
    }, [user]);

    console.log(project)
    return (
        <div className="card-wrap">
            <div className="card-header py-1">
                <p><span>Active Users: </span>{project.users.length}</p>
                {typeof status.status === "undefined" && (<Link to={`/project/${project.id}`}> <button className="secondary">View Project</button> </Link>)}
                {status.status === "awaiting" && (<Link to={`/project/${project.id}`}> <button className="secondary">Awaiting</button> </Link>)}
                {status.status === "accept" && (<Link to={`/project/${project.id}`}> <button className="secondary">Continue</button> </Link>)}
                {status.status === "reject" && (<p className="error">You have been Rejected</p>)}
            </div>
            <div className="text-center">
                <h2>{project.name}</h2>
                <hr/>
            </div>
            <div className="card-image py-1">
                <img alt="card-main" src="/images/card-image.png" alt=""/>
            </div>
            <div className="card-details py-1">
                <p><span>Topic: </span>{project.topic}</p>
                <p className="capital"><span>Roles: </span>{project.roles.join(" ,")}</p>
            </div>
        </div>
    )
};

Card.defaultProps = {
    continueButton : false
}
