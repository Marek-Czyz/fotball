import React, { useState } from "react";
import { useCallback } from 'react'
import { getAuth, signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth'
import { Form, Button, Alert, Col} from "react-bootstrap"
import FormContainer from "../components/FormContainer"


const Login = () => {

 const [authorized, setAuth] = useState("")  //frontend info containing message and type alert depending on the user being authenticated or not
 const [emailFound, setFound] = useState("") //frontend info containing message and type alert depending on the user being found in database or not
 const [isShown, setShown] = useState(false) //hides the part of the screen containing password recovery

 const resetPassword = useCallback(async e => {
    e.preventDefault()
    const auth = getAuth()
    const {recoverEmail} = e.target.elements
    try {
      await sendPasswordResetEmail(auth, recoverEmail.value)
      setFound(["Recovery e-mail sent to " +recoverEmail.value, "success"])
      console.log(e.code)
  } catch (e){
      console.log(e.code)
      setFound(["Your e-mail: "+recoverEmail.value+ " was not found in database", "danger"])
  }
 },[])
 

 const handleSubmit = useCallback(async e => {
    e.preventDefault()

    const { email, password } = e.target.elements
    const auth = getAuth()
    try {
      await signInWithEmailAndPassword(auth, email.value, password.value)
      console.log(email.value, password.value)
      
    } catch (e) {

      setAuth(["Wrong e-mail or password","danger"])
    }
    //  authorized ? setAuth(["Logged in","success"]) :  setAuth(["Wrong e-mail or password","danger"])
    // console.log(e.message)


}, [])

  
    
    //isAuthenticated ? setAuth(["Authorization successfull","success"]) : setAuth(["Wrong e-mail or password","danger"])

  return (
    
  
    <>
    <br/>
    
    <FormContainer>
    <Form onSubmit={handleSubmit}>
        
         <Form.Group controlId="phone">
          <Form.Label><h3>Please log in</h3></Form.Label>
          <Form.Control name="email" placeholder="email" type="email"></Form.Control>
        </Form.Group>

        <Form.Group controlId="password">
          <Form.Label></Form.Label>
          <Form.Control name="password" placeholder="password" type="password"></Form.Control>
        </Form.Group>
        <br/>
        <Col align="center">
            <Button type="submit" variant="primary" align="center">
          Logg inn
         </Button></Col>
         <br/>
          <Alert key={1} variant={authorized[1]}>
          {authorized[0]}
          </Alert>
       </Form> 
    <Form>
        <Col align="center">
         <Button type="submit" variant="light" onClick={()=> setShown(true)} >
          Password reset
         </Button></Col>
        <br/>
    </Form>
    
    {isShown && (
            <>
             <Form onSubmit={resetPassword}>
                <Form.Group controlId="recoverEmail">
                <Form.Label>Enter your e-mail and click "Reset my password"</Form.Label>
                <Form.Control name="recoverEmail" placeholder="e-mail" type="email" ></Form.Control>
                </Form.Group>
                <br/>
                <Col align="center">
                    <Button type="submit" variant="light">
                     Reset my password
                    </Button></Col>
                    <br/>
                    <Alert key={1} variant={emailFound[1]}>
                    {emailFound[0]}
                    </Alert>
                </Form>

            </>
          )}
    

    </FormContainer>


    </>
  )
}
export default Login