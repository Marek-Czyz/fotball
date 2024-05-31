import React, { useEffect, useState }  from "react"
import { Form, Button, Alert, Col} from "react-bootstrap"
//import {auth} from 'firebase/auth'
import { Redirect, Navigate } from "react-router-dom";
//import auth from '@react-native-firebase/auth';
//import firebase from "firebase/app"
import { getAuth } from 'firebase/auth';

//const auth = firebase.auth()

const LogoutScreen = ({ match }) => {

  
  return (
    
    <> 
      
    {getAuth().signOut().then(() => <Redirect to="/Login" />)}
    
    
      
    </>
  )
}

export default LogoutScreen