import React, {useEffect,useState} from 'react';
import {useHistory,useParams} from "react-router-dom";


//Components
import TopDevider from "../components/Deviders/TopDevider";
import Header from "../components/Header";
import Loader from "../components/Loader";


export default function ViewProfile(props) {
    const {readUserProfile} = props;
    const history = useHistory();
    const [loading,setLoading] = useState(true);

    const [user, setUser] = useState({});
    const [userSkills, setUserSkills] = useState([]);
    const {id} = useParams();

    const goBack = ()=> {
        history.goBack();
    };

    useEffect(() => {
        (async()=>{
            try{
                let userDataObject = {};
                const userData = await readUserProfile(id);
    
                userData.forEach(element => {
                    userDataObject = {id:element.id,...element.data()};
                });
                setUser(userDataObject);
                setUserSkills(userDataObject.skills);
                setLoading(false);
            }catch(e){
                console.log(e);
                setLoading(false);
            }
        })();
    }, []);

    if (loading) {
        return  <Loader />;
    };

    let skills = userSkills.join(" ,");
    return (
        <div className="h-100">
            <div className="hero-styles flex-center py-2 profile-hero">
                <div className="logo">
                    <img alt="logo" src="/images/logo.png" alt=""/>
                </div>
            </div>
            <TopDevider/>
            <div className="pt-2 pb-1 comment-review">
                    <a onClick={goBack}>Go back</a>
            </div>
            <div className="content-wrap profile-inner">
                <h1>{user.name}'s Profile</h1>
                <div className="details-container py-2 py-mobile-0">
                    <div>
                        <div className="flex-end">
                            <img alt="profile-image" src="/images/user-profile.png" alt=""/>
                        </div>
                    </div>
                    <div className="text-left px-3 px-mobile-0">
                        <p><span>Name: </span>{user.name} {user.surname}</p>
                        <p><span>Email: </span>{user.email}</p>
                        <p><span>Course: </span> {user.course}</p>
                        <p><span>Year of study: </span>{user.studyYear}</p>
                    </div>
                </div>
                <div className="pb-2 text-left-mobile">
                    <p><span>Description:</span><br/> {user.description}</p>
                    <p><span>Skills:</span> <br/> {skills}</p>
                </div>
            </div>
            <Header/>
        </div>
    )
}
