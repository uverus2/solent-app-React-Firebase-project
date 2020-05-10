import React, {useState} from 'react';
import {Switch,Route,Redirect} from "react-router-dom";

// Styles
import 'react-widgets/dist/css/react-widgets.css';
import 'reset-css';
import "./styles/index.scss";

//Components
import Loader from "./components/Loader";
import Header from "./components/Header";

//Store 
import userContext from "./store/userStore";

// Views
import Login from "./views/LogIn";
import Register from "./views/Register";
import Create from "./views/CreateProject";
import ProfileEdit from "./views/UpdateProfile";
import Home from "./views/Home";
import ProjectPage from "./views/ProjectPage";
import Profile from "./views/Profile";
import UpdatePassword from "./views/UpdatePassword";
import Comments from "./views/Comments";
import ErrorPage from "./views/Error";
import MyProjects from "./views/Projects";
import ViewProfile from "./views/ViewProfile";


// Firebase setup 
import firebase from "firebase/app";   // the firebase core lib
import 'firebase/auth'; // specific products
import firebaseConfig from "./config/firebase";  // the firebase config we set up earlier
import "firebase/firestore";

// Custom hooks
import useProject from "./services/useProject";
import useMyProject from "./services/useMyProjects";
import useAuth from "./services/useAuth";
import useComments from "./services/useComments";
import useProfile from "./services/useProfile";


function IncludeHeader(props) {
  const {signOut} = useAuth(firebase.auth);
  return(
    <>
      {props.children}
      <Header signOut={signOut}/>
    </>
  );
}


function Protected({ authenticated, children, ...rest }) {
  // let initAttemptedRoute = "/";
  // initAttemptedRoute = useLocation().pathname;
  return (
  <Route {...rest} render={({ location }) => authenticated ? ( children) : ( <Redirect to={{ pathname: "/login", state: { from: location }}}/>)}/>
  );
}

function LogInRedirect({ authenticated, children, ...rest }) {
  return (
    <Route {...rest} render={({ location }) => !authenticated ? ( children) : ( <Redirect to={{ pathname: "/", state: { from: location }}}/> )}/>
  );
}

function App() {

  const [userInfo, setUserInfo] = useState({})

  if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig);
  }

  const {readUserProfile} = useProfile(firebase.firestore);
  const {readCreatedProjects,readJoinedProjects} = useMyProject(firebase.firestore)
  const {addComment,commentsAdded, allComments} = useComments(firebase.firestore);
  const {createProject,removeUser,getAcceptedUsers, readProjects,searchProjectsByRole,getAwaitingUsers,userStatusUpdate, readSingleProject,userStatus,getUserStatus, getProjectRoles, addUserToRole, insertUserToProject} = useProject(firebase.firestore)
  const {isAuthenticated, updateUserPassword, getAllUserInformation, signUpWithEmail,updateUser, getUserInformation, additionalInformation, signInEmailUser,loading,user} = useAuth(firebase.auth, firebase.firestore);
  
  if(user.uid && Object.keys(userInfo).length <= 0 ){
    (async() => {
      try{
        const userInfo = await getUserInformation(`${user.uid}`);
        setUserInfo(userInfo.data());
      }catch(e){
          console.log(e)
      }
    })();
  };


  if (loading) {
    return  <Loader />;
  };

  return (
    <div className="App">
      <userContext.Provider value={userInfo}>
        <Switch>
              <Protected authenticated={isAuthenticated} exact path="/create-project"> 
                <Create createProject={createProject}/>
              </Protected>
              <Protected authenticated={isAuthenticated} exact path="/profile">
              <IncludeHeader children={<Profile/>}/>
              </Protected>
              <Protected authenticated={isAuthenticated} exact path="/project/:id">
                <IncludeHeader children={<ProjectPage getAcceptedUsers={getAcceptedUsers} userStatus={userStatus} removeUserProject={removeUser} getProjectRoles={getProjectRoles} addUserToRole={addUserToRole} insertUserToProject={insertUserToProject} changeStatus={userStatusUpdate} getAllUserInformation={getAllUserInformation} getAwaitingUsers={getAwaitingUsers} getUserStatus={getUserStatus} readSingleProject={readSingleProject}/>}/>
              </Protected>
              <Protected authenticated={isAuthenticated} exact path="/user-profile/:id">
                <IncludeHeader children={<ViewProfile readUserProfile={readUserProfile}/>}/>
              </Protected>
              <Protected authenticated={isAuthenticated} exact path="/projects">
                <IncludeHeader children={<MyProjects readCreatedProjects={readCreatedProjects} readJoinedProjects={readJoinedProjects} />}/>
              </Protected>
              <Protected authenticated={isAuthenticated} exact path="/comments/:id&:userNumber"> 
                <IncludeHeader children={<Comments commentsAdded={commentsAdded} addComment={addComment} allComments={allComments}/>}/>
              </Protected>
              <Protected authenticated={isAuthenticated} exact path="/profile-edit"> 
                <ProfileEdit updateProfile={updateUser}/>
              </Protected>
              <Protected authenticated={isAuthenticated} exact path="/password-edit"> 
                <UpdatePassword updateUserPassword={updateUserPassword}/>
              </Protected>
              <Protected authenticated={isAuthenticated} exact path="/">
                <IncludeHeader children={<Home searchProjectsByRole={searchProjectsByRole} getUserStatus={getUserStatus} userStatus={userStatus} readProjects={readProjects}/>}/>
              </Protected> 
              <LogInRedirect authenticated={isAuthenticated} exact path="/login"> 
                <Login signInEmailUser={signInEmailUser}/>
              </LogInRedirect>
              <LogInRedirect authenticated={isAuthenticated} exact path="/register"> 
                <Register storeUser={additionalInformation} signUpWithEmail={signUpWithEmail}/>  
              </LogInRedirect>
              <Route path="*" component={ErrorPage}/>
        </Switch>
      </userContext.Provider>
    </div>
  );
}

export default App;
