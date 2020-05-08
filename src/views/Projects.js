import React, {useContext,useEffect,useState} from 'react';
import userContext from "../store/userStore";
import {Link} from "react-router-dom";

//Components
import Hero from "../components/HeroSection";
import Card from "../components/Card";
import Loader from "../components/Loader";

export default function Projects (props){
    const user = useContext(userContext);

    const [allJoinedInfo, setJoinedInfo] = useState([]);
    const [allOwnedInfo, setOwnedInfo] = useState([]);
    const [loading,setLoading] = useState(true);

    const {readCreatedProjects,readJoinedProjects} = props;

    useEffect(() => {
        (async () => {
            try{

                const containJoined = [];
                const containOwned = [];

                const joined = await readJoinedProjects(user.id);
                const created = await readCreatedProjects(user.id);

                joined.forEach(i => containJoined.push({id:i.id,...i.data()}));
                created.forEach(i => containOwned.push({id:i.id,...i.data()}));

                setJoinedInfo(containJoined);
                setOwnedInfo(containOwned);
                setLoading(false);
            }catch(e){
                console.log(e);
                setLoading(false);
            }
        })();
    }, []);

    console.log(allJoinedInfo)
    const joinedCard = allJoinedInfo.map(i => {
        return <Card key={i.id} changeStatus={false} continueButton={true} getUserStatus={false} project={i} user={user}/>;
    });
    const ownedCard = allOwnedInfo.map(i => {
        return <Card key={i.id} changeStatus={false} continueButton={true} getUserStatus={false} project={i} user={user}/>;
    });

    if (loading) {
        return  <Loader />;
    };

    return(
      <div> 
        <Hero/>
        <div className="text-center content-wrap">
                <h1>My Projects</h1>
                <div className="py-2">
                    <h2>Joined Projects</h2>
                    {joinedCard.length > 0 ? (
                        <div className="cards-container py-1">
                            {joinedCard}
                        </div>
                    ): <h3 className="py-1">You have not joined any projects so far</h3>}
                </div>
                <div className="py-2">
                    <h2>Created Projects</h2>
                    {ownedCard.length > 0 ? (
                        <div className="cards-container py-1">
                            {ownedCard}
                        </div>
                    ): <h3 className="py-1">You have not created any projects so far</h3>}

                </div>
                <div className="py-2">
                        <h2>Create a project</h2>
                        <Link to="/create-project"><button className="main">Begin</button></Link>
                </div>
        </div>
       </div>
    );
}