import React from "react"
import { LinkContainer } from "react-router-bootstrap"
import { Image, Navbar, Nav, Container } from "react-bootstrap"


//import SearchBox from "./SearchBox"
//import { Route } from "react-router-dom"

const Header = () => {
  

  return (

    <Navbar bg="light" expand="lg">
        <Container>
        <Navbar.Brand href="/"></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
         <Nav>
            <LinkContainer to="/score">
                <Nav.Link>Standings</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/">
                <Nav.Link>My sheet</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/logout">
                <Nav.Link>Log out</Nav.Link>
            </LinkContainer>
            {/* <LinkContainer to="/cal">
                <Nav.Link>Calendar</Nav.Link>
            </LinkContainer> */}
            
            {/* <LinkContainer to="/riegel">
                <Nav.Link>Peter Riegel</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/stats">
                <Nav.Link>Statistics</Nav.Link>
            </LinkContainer> */}
         </Nav>
        </Navbar.Collapse>
        </Container>
       </Navbar>
       

       )
}

export default Header