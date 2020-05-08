import React, {useContext,useEffect,useState} from 'react';
import userContext from "../store/userStore";
import {useHistory,useParams,Link} from "react-router-dom";

//Components
import Header from "../components/Header";
import Hero from "../components/HeroSection";

// Form validation
import { useForm } from 'react-hook-form';
import { string, object } from 'yup';

let schema = object().shape({
    message: string().required("Field is required")
});

export default function Project(props) {
    const {addComment, allComments,commentsAdded} = props;
    let {id,userNumber} = useParams();
    const user = useContext(userContext);

    const [commentsInfo, setCommentsInfo] = useState([]);

    const history = useHistory();
    
    const { register, handleSubmit, reset, errors } = useForm({validationSchema:schema});

    const goBack = ()=> {
        history.goBack();
    };

    useEffect(() => {
        (async()=> {
            try{
                let allUserComments = [];
                const retrivedComments = await allComments(id);
                retrivedComments.forEach(i => allUserComments.push({id:i.id,...i.data()}));
                setCommentsInfo(allUserComments);
            }catch(e){
                console.log(e);
            }
        })();
    }, []);


useEffect(() => {
        (async()=> {
            try{
                const consoleCB = (doc) => {
                    let emptyArray = [];
                    doc.forEach(i => emptyArray.push({...i.data()}));
                    console.log(emptyArray)
                    setCommentsInfo(emptyArray);
                }
                await commentsAdded(id,consoleCB);
            }catch(e){
                console.log(e);
            }
        })();
    }, [commentsAdded]);

    const onSubmit = async (data,e) => {
        try{
            e.preventDefault();
            const comment = {
                userID:user.id,
                time: new Date(),
                comment:data.message,
                initials: user.name.charAt(0) + user.surname.charAt(0)
            };
            await addComment(id,comment);
            reset();
        }catch(e){
            console.log(e)
        }
    };

    const chatRoom = commentsInfo.map(i => {
        let counter = Math.random().toString(36).substring(7);
        if(i.userID === user.id){
            return(
                <div key={counter} className="m-auto my-comment-wrap">
                    <div  className=" my-comment comment-boxes">
                        <p>{i.comment}</p>
                    </div>
                </div>
            );
        }else{
            return(
                <div key={counter} className="comment-wrap m-auto">
                    <Link to={`/user-profile/${i.userID}`}>
                        <div  className="comment-image">
                            <p>{i.initials}</p> 
                        </div>
                    </Link>
                    <div className="comment-box comment-boxes">
                        <p>{i.comment}</p> 
                    </div>
                </div>
            );
        }
    });

    const onKeyPress = (event) => {
        if (event.which === 13) {
          event.preventDefault();
        }
    }

    return (
        <div className="h-100">
            <Hero/>
            <div className="content-wrap text-center">
                <h1 className="py-2">Project Name</h1>
                <div className="pt-2 pb-1 comment-review">
                    <a onClick={goBack}>Go back</a>
                    <p>Users in chat: {userNumber}</p>
                </div>
                <div className="py-3">
                    {chatRoom}
                </div>
            </div>
            <form onKeyPress={onKeyPress} className="py-3">
                {errors.message && (<p className="error text-center py-1"> {errors.message.message} </p>)}
                <div className="leave-comment m-auto">
                    <input type="text" name="message" placeholder="Type Message" ref={register}/>
                    <img src="/images/arrow-rigth.png" onClick={handleSubmit(onSubmit)} alt=""/>
                </div>
            </form>
            <Header/>
        </div>
    )
}
