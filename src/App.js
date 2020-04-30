import React from 'react';
import {Switch,Route,useLocation,Redirect} from "react-router-dom";

// Styles
import 'react-widgets/dist/css/react-widgets.css';
import 'reset-css';
import "./styles/index.scss";

//Components
import Loader from "./components/Loader";

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
import Comments from "./views/Comments";
import Search from "./views/Search";
import ErrorPage from "./views/Error";


// Firebase setup 
import firebase from "firebase/app";   // the firbase core lib
import 'firebase/auth'; // specific products
import firebaseConfig from "./config/firebase";  // the firebase config we set up ealier
import "firebase/firestore";

import useAuth from "./services/useAuth";


function Protected({ authenticated, children, ...rest }) {
  let initAttemptedRoute = "/";
  initAttemptedRoute = useLocation().pathname;
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

  if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig);
  }
  const {isAuthenticated, signUpWithEmail, signInEmailUser,loading,user, signOut } = useAuth(firebase.auth);

  if (loading) {
    return  <Loader />;
  };
  
  return (
    <div className="App">
      <userContext.Provider value={user}>
        <Switch>
              <Protected authenticated={isAuthenticated} exact path="/create-project"> 
                <Create/>
              </Protected>
              <Protected authenticated={isAuthenticated} exact path="/profile"> 
                <Profile/>
              </Protected>
              <Protected authenticated={isAuthenticated} exact path="/project"> 
                <ProjectPage/>
              </Protected>
              <Protected authenticated={isAuthenticated} exact path="/comments"> 
                <Comments/>
              </Protected>
              <Protected authenticated={isAuthenticated} exact path="/profile-edit"> 
                <ProfileEdit/>
              </Protected>
              <Protected authenticated={isAuthenticated} exact path="/">
                <Home signOut={signOut}/>  
              </Protected> 
              <Protected authenticated={isAuthenticated} exact exact path="/search"> 
                <Search/>
              </Protected>
              <LogInRedirect authenticated={isAuthenticated} exact path="/login"> 
                <Login signInEmailUser={signInEmailUser}/>
              </LogInRedirect>
              <LogInRedirect authenticated={isAuthenticated} exact path="/register"> 
                <Register/>  
              </LogInRedirect>
              <Route path="*" component={ErrorPage}/>
        </Switch>
      </userContext.Provider>
    </div>
  );
}

export default App;
