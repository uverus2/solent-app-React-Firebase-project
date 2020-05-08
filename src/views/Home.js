import React, {useContext,useState} from 'react';
import userContext from "../store/userStore";
import {Link} from "react-router-dom";

//Components
import Hero from "../components/HeroSection";
import SearchForm from "../components/Forms/SearchForm";
import Card from "../components/Card";

export default function Home(props) {
    const {readProjects,userStatus,getUserStatus,searchProjectsByRole} = props;
    const user = useContext(userContext);

    const [allProjects, setAllProjects] = useState([]);

    const showAllProjects = async() => {
        try{
            let projectsArray = [];
            const projects = await readProjects();
            projects.forEach(i => projectsArray.push({id:i.id,...i.data()}));
            const filterResults = projectsArray.filter(i => user.id !== i.owner);
            setAllProjects(filterResults);
         }catch(e){
             console.log(e)
         }
    }
    const search = async(data) => {
       try{
            let projectsArray = [];
            const projects = await searchProjectsByRole(data.role.toLowerCase());
            projects.forEach(i => projectsArray.push({id:i.id,...i.data()}));
            const filterResults = projectsArray.filter(i => user.id !== i.owner);
            setAllProjects(filterResults);
       }catch(e){

       }
    };

    
    const projects = allProjects.map(i => {
       return <Card getUserStatus={getUserStatus} changeStatus={userStatus} user={user} project={i} key={i.id}/>
    });

    return (
        <>
        <div>
            <Hero/>
            <div className="content-wrap text-center">
                <h1>Welcome {user.name}</h1>
                <div className="py-2">
                    <h2>Search for a project</h2>
                    <SearchForm role={user.role} onSubmit={search}/>
                    <button onClick={showAllProjects} className="secondary">Show All</button>
                </div>
                <div className="cards-container">
                    {projects}
                </div>
                <div className="py-3">
                    <h2>Create a project</h2>
                    <Link to="/create-project"><button className="main">Begin</button></Link>
                </div>
            </div>
        </div>
        </>
    )
}
