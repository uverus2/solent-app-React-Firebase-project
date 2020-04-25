import React from 'react';
import "./styles/index.scss";
import {Switch,Route,useLocation,Redirect} from "react-router-dom";

// Views
import Home from "./views/Home";
import Search from "./views/Search";
import ErrorPage from "./views/Error";


// Firebase setup 

import firebase from "firebase/app";   // the firbase core lib
import 'firebase/auth'; // specific products
import firebaseConfig from "./config/firebase";  // the firebase config we set up ealier
import "firebase/firestore";

function App() {
  return (
    <div className="App">
      <Switch>
          <Route exact path="/">
            <Home/>  
          </Route> 
          <Route exact path="/search"> 
            <Search/>
          </Route>
          <Route path="*" component={ErrorPage}/>
      </Switch>
    </div>
  );
}

export default App;
