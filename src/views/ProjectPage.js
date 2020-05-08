import React, {useContext, useEffect, useState} from 'react';
import userContext from "../store/userStore";
import {useParams} from "react-router-dom";
import {Link} from "react-router-dom";

//Components
import Hero from "../components/HeroSection";
import Loader from "../components/Loader";

export default function Project(props) {
    const {readSingleProject,getUserStatus,userStatus,removeUserProject,getAcceptedUsers, changeStatus,getAwaitingUsers,getAllUserInformation, getProjectRoles, addUserToRole, insertUserToProject} = props;
    const user = useContext(userContext);
    const [projectInfo, setProjectInfo] = useState([]);
    const [userInfo, setUserInfo] = useState([]);
    const [projectSkills, setProjectSkills] = useState([]);
    const [status,setStatus] = useState({});
    const [onwerInfo,setOnwerInfo] = useState({});
    const [joinedUsers, setJoinedUsers] = useState([]);
    const [rolesInfo,setRolesInfo] = useState([]);
    const [loading,setLoading] = useState(true);
    let {id} = useParams();

    useEffect(() => {
        (async() => {
            try{
                let allAwaitingUsers = [];
                let allJoinedUsers = [];
                let allRoles = [];
                let AwaitingUsersInfo = [];
                let joinedUsersInfo = [];
                const awaitingUsers = await getAwaitingUsers(id);
                const project = await readSingleProject(id);
                const roles = await getProjectRoles(id);
                awaitingUsers.forEach(i => allAwaitingUsers.push({id:i.id,...i.data()}));
                roles.forEach(i => allRoles.push({id:i.id,...i.data()}));

                const joined = await getAcceptedUsers(id);
                joined.forEach(i => allJoinedUsers.push({id:i.id,...i.data()}));
                await allAwaitingUsers.forEach(async i => {
                    try{
                        const users = await getAllUserInformation(i.userID);
                        users.forEach(user => AwaitingUsersInfo.push({id:user.id,...user.data()}));
                        setUserInfo([...AwaitingUsersInfo]);
                    }catch(e) {
                        console.log(e);
                    }
                });

                let ownerObject = {};
                const onwerData = await getAllUserInformation(project.data().owner);
                onwerData.forEach(user => ownerObject = {id:user.id,...user.data()});

                await allJoinedUsers.forEach(async i => {
                    try{
                        const users = await getAllUserInformation(i.userID);
                        users.forEach(user => joinedUsersInfo.push({id:user.id,...user.data()}));
                        setJoinedUsers([...joinedUsersInfo]);
                    }catch(e) {
                        console.log(e);
                    }
                });

                setRolesInfo(allRoles);
                setOnwerInfo(ownerObject);
                setProjectInfo(project.data());
                setProjectSkills(project.data().skills);
                setLoading(false)
            }catch(e) {
                console.log(e);
                setLoading(false)
            }
        })();
    }, []);

    useEffect(() => {
        let didCancel = false;
        (async()=> {
            try{
                let userData = {}
                const userStatusData = await getUserStatus(id,user.id);
                userStatusData.forEach(i => userData = {id:i.id,...i.data()});
                if (!didCancel) {
                    setStatus(userData)
                  }
            }catch(e){
                console.log(e)
            }
        })();
        return () => {
            didCancel = true;
          };
    }, [user]);

    let skills = projectSkills.join(" ,");

    const removeAcceptUser = async (action,user) => {
        try{
            console.log(action);
            const data = {
                userID:user.id,
                status: `${action}`
            };

            await changeStatus(id,data.userID, data.status);

            if(action === "accept"){
                const initials = user.name.charAt(0) + user.surname.charAt(0);
                const rolesData = {
                    role:user.role,
                    initials:initials.toUpperCase(),
                    userID:user.id
                }
                rolesInfo.push(rolesData);
                setRolesInfo(rolesInfo);

                joinedUsers.push(user);
                setJoinedUsers(joinedUsers);

                await addUserToRole(id,rolesData)
                await insertUserToProject(id,data.userID);
            }
            const removeUser = userInfo.filter(i => i.id !== user.id);
            setUserInfo(removeUser);
        }catch(e){
            console.log(e)
        }
    };

    const awaitingApprovalUsers = userInfo.map(i => {
        return (
        <div key={i.id} className="sections">
            <Link to={`/user-profile/${i.id}`}> <p>{i.name} {i.surname}</p> </Link>
            <div className="request py-1">
                <button onClick={() => removeAcceptUser("accept",i)} className="main">Accept</button>
                <button onClick={() => removeAcceptUser("reject",i)} className="secondary">Reject</button>
            </div>
        </div>
        )
    });

    const renderRoles = rolesInfo.map(i => {
        let counter = Math.random().toString(36).substring(7);
        return(
            <div key={counter} className="roles-wrap py-1">
            <h5>{i.role}</h5>
            <div className="flex-center">
               <Link to={`/user-profile/${i.userID}`}> 
                    <div className="user-roles">
                        <p>{i.initials}</p>
                    </div>
                </Link>
            </div>
        </div>
        )
    });


    const removeUserClick = async(userID, projectID) => {
        try{
            const filterOutOfJoin = joinedUsers.filter(i => i.id !== userID);
            const filterOutOfRoles = rolesInfo.filter(i => i.userID !== userID);
            setJoinedUsers(filterOutOfJoin);
            setRolesInfo(filterOutOfRoles);
            setStatus("reject");
            await removeUserProject(projectID,userID);
        }catch(e){
            console.log(e);
        }
    }

    const showAllJoined = joinedUsers.map(i => {
        let counter = Math.random().toString(36).substring(7);
        return(
            <div key={counter} className="joined sections">
                <p>{i.name} {i.surname}</p>
                <button onClick={() => removeUserClick(i.id, id)} className="secondary">Remove</button>
            </div>
        )
    });

    let joinButton = "";
    const onClick = async(e) => {
        try{
            const data = {
                userID:user.id,
                status: "awaiting"
            };
            await userStatus(id,data);
            setStatus(data);
        }catch(e){
            console.log(e);
        };
    }

    if (loading) {
        return  <Loader />;
      };


    if(user.id !== projectInfo.owner){
        if(typeof status.status === "undefined"){
            joinButton = <button onClick={onClick} className="secondary">Join Project</button>
        }
    }

    return (
        <div className="">
            <Hero/>
            <div className="content-wrap text-center">
                <h1 className="py-2">{projectInfo.name}</h1>
                <p><span>Topic: </span>{projectInfo.topic}</p>
                <div className="py-2">
                    <h2 className="py-1">Project Owner: {onwerInfo.name} {onwerInfo.surname}</h2>
                    <p className="py-1"> <span> Year of study: </span> {onwerInfo.studyYear}</p>
                    <Link className="py-1" to={`/user-profile/${onwerInfo.id}`}>  <button className="main">View Profile</button> </Link>
                </div>
                {status.status === "awaiting" && <h3 className="py-2" > You are Awaiting for Approval to join </h3>}
                {joinButton}
                {user.id === projectInfo.owner && awaitingApprovalUsers.length > 0 && (<> 
                    <div className="py-2">
                        <h2 className="pb-2">Requested to Join</h2>
                        {awaitingApprovalUsers}
                    </div>
                </>)}
                {user.id === projectInfo.owner && (
                    <div className="py-2">
                            <h2 className="pb-2">Joined Users</h2>
                            {showAllJoined}
                    </div>
                )}
                <div className="py-2">
                    <h2>Description</h2>
                    <p>{projectInfo.description}</p>
                </div>
                {status.status === "accept" || user.id === projectInfo.owner ? (
                    <div className="py-2">
                        <h2>Group Chat</h2>
                       <Link to={`/comments/${id}&${projectInfo.users.length}`}> <button className="main">Join Now</button> </Link>
                    </div>
                ) : ""}
                <div className="py-2">
                    <h2>Roles</h2>
                    {renderRoles}
                </div>
                <div className="py-2">
                    <h2>Skills Required</h2>
                    <p>{skills}</p>
                </div>
            </div>
        </div>
    )
}
