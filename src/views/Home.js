import React, {useContext} from 'react';
import userContext from "../store/userStore";
import {Link} from "react-router-dom";

//Components
import Hero from "../components/HeroSection";
import Header from "../components/Header";
import SearchForm from "../components/Forms/SearchForm";
import Card from "../components/Card";

export default function Home(props) {
    const {signOut} = props;
    const user = useContext(userContext);
    console.log(user.uid);

    const search = async(data) => {
       console.log(data);
    };

    const handleLogOut = ()=> {
        signOut();
    };
    return (
        <div className="h-100">
            <Hero/>
            <div className="content-wrap text-center">
                <h1>Welcome Name</h1>
                <div className="py-2">
                    <h2>Search for a project</h2>
                    <SearchForm onSubmit={search}/>
                </div>
                <div className="cards-container">
                    <Card/>
                    <Card/>
                    <Card/>
                    <Card/>
                </div>
                <div className="py-3">
                    <h2>Create a project</h2>
                    <Link to="/create-project"><button className="main">Begin</button></Link>
                </div>
            </div>
            <Header className=""/>
        </div>
    )
}
