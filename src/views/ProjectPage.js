import React, {useContext} from 'react';
import userContext from "../store/userStore";

//Components
import Header from "../components/Header";
import Hero from "../components/HeroSection";

export default function Project(props) {
    return (
        <div className="h-100">
            <Hero/>
            <div className="content-wrap text-center">
                <h1 className="py-2">Project Name</h1>
                <p><span>Topic</span>TOPIC</p>
                <div className="py-2">
                    <h2 className="pb-2">Requested to Join</h2>
                        <div className="sections">
                            <p>Konstantin Ruzhev</p>
                            <div className="request py-1">
                                <button className="main">Accept</button>
                                <button className="secondary">Reject</button>
                            </div>
                        </div>
                </div>
                <div className="py-2">
                    <h2 className="pb-2">Joined Users</h2>
                    <div className="joined sections">
                        <p>Konstantin Ruzhev</p>
                        <button className="secondary">Remove</button>
                    </div>
                </div>
                <div className="py-2">
                    <h2>Description</h2>
                    <p>Description Description Description Description Description Description</p>
                </div>
                <div className="py-2">
                    <h2>Group Chat</h2>
                    <button className="main">Join Now</button>
                </div>
                <div className="py-2">
                    <h2>Roles</h2>
                    <div className="roles-wrap py-1">
                        <h5>Web Developer</h5>
                        <div className="flex-center">
                            <div className="user-roles">
                                <p>KR</p>
                            </div>
                            <div className="user-roles">
                                <p>KR</p>
                            </div>
                            <div className="user-roles">
                                <p>KR</p>
                            </div>
                            <div className="user-roles">
                                <p>KR</p>
                            </div>
                        </div>
                    </div>
                    <div className="roles-wrap py-1">
                        <h5>Web Developer</h5>
                        <div className="flex-center">
                            <div className="user-roles">
                                <p>KR</p>
                            </div>
                            <div className="user-roles">
                                <p>KR</p>
                            </div>
                            <div className="user-roles">
                                <p>KR</p>
                            </div>
                            <div className="user-roles">
                                <p>KR</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="py-2">
                    <h2>Skills Required</h2>
                    <p>Description Description Description Description Description Description</p>
                </div>
            </div>
            <Header/>
        </div>
    )
}
