import logo from './logo.svg';
import './App.css';
import React from "react";
import Header from "./components/Header"

import Login from "./components/Login.js"
import { AuthContextProvider, useAuthState } from './firebase'
import { HashRouter, Route, Switch, Navigate, Routes, Redirect  } from "react-router-dom"

import LogoutScreen from "./screens/LogoutScreen"
import HomeScreen from "./screens/HomeScreen"
import ScoreScreen from "./screens/ScoreScreen"
import InfoScreen from "./screens/InfoScreen"

//---- login code -------

const AuthenticatedRoute = ({ component: C, ...props }) => {
  const { isAuthenticated } = useAuthState()
  console.log(`AuthenticatedRoute: ${isAuthenticated}`)
  return (
    <Route
      {...props}
      render={routeProps =>
        isAuthenticated ? <C {...routeProps} /> : <Redirect to="/Login" />
      }
    />
  )
}    

const UnauthenticatedRoute = ({ component: C, ...props }) => {
  const { isAuthenticated } = useAuthState()
  console.log(`UnauthenticatedRoute: ${isAuthenticated}`)
  return (
    <Route
      {...props}
      render={routeProps =>
        !isAuthenticated ? <C {...routeProps} /> : <Redirect to="/" />
      }
    />
  )
}

// ----- end of login code ----------

function App() {
  return (
    
    <AuthContextProvider>
    <HashRouter  basename={process.env.PUBLIC_URL}>
      <Header/>
        <Switch>
        
          <AuthenticatedRoute  path="/" component={HomeScreen} exact/>
          <UnauthenticatedRoute  path="/Login" component={Login} exact/>
          <UnauthenticatedRoute path="/logout" component={Login} exact/>
          <AuthenticatedRoute  path="/score" component={ScoreScreen} exact/>
          <AuthenticatedRoute  path="/info" component={InfoScreen} exact/>
          {/* <AuthenticatedRoute path="/calculator" component={PaceScreen} exact/> */}
          {/* <Route path={process.env.PUBLIC_URL + '/stats'} component={StatsScreen}></Route> */}
          
        </Switch>
    </HashRouter>
    </AuthContextProvider>

  );
}

export default App;
