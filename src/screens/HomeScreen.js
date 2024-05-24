import React, { useEffect, useState }  from "react"
import useGoogleSheets from 'use-google-sheets';
import { Form, Row, Col, Container, Card, Badge, ProgressBar, Image, Table, Accordion, Button} from "react-bootstrap";
//import { AuthContextProvider, useAuthState } from './firebase'
import { getAuth } from 'firebase/auth';
import CountryFlag from "react-native-country-flag";
import Dropdown from 'react-bootstrap/Dropdown';
import { useCallback } from 'react'
import database from '../firebase';
import { getDatabase, update, ref, set } from 'firebase/database'




const HomeScreen = ({ match }) => {


    var SheetData = [];
    var ScheduleData = [];
    //var BettingData = [];
  
    const [sheetData, setData] = useState({});
  
    const [show, setShow] = useState(false);
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  
    const WriteTo = (user,id,team,score) => {



    update(ref(database, user), {
        
        
        [id + team]:[team,score]
       
      });}


    const Push = (user,team,score) => {
        database.ref(user).set(
            
            {
                id: data.nr,
                game: [team,score]
               
              }
        
        ).catch(alert);
    }


    const country = "pl";
  
    const { data, loading, error } = useGoogleSheets({
        apiKey: "AIzaSyDam7-qqRfOnNqb1-mgQ45W67XF2D68YFg",
        sheetId: "1TsPyLP-WnteZXAdzbTMm3pvKz9DL0iIRFWdPpjHp4lk",
        //sheetsOptions: [{ id: 'Sheet1' }],
          });
  
      if (!loading)
    {  
  
    SheetData =  Array.from(data); 
    const GarminJSON = JSON.stringify(SheetData[0]);
    const BettingJSON = JSON.stringify(SheetData[2]);
  
    ScheduleData = Array.from(JSON.parse(GarminJSON).data);
    //BettingData = Array.from(JSON.parse(BettingJSON).data);
    
    //console.log((BettingData))
    
      
    //const sortScore = BettingData.sort((a,b) => b.poeng - a.poeng)
   
    //console.log((sortScore))
  
    

  
    }    
  
    function handleChange(evt) {
        const value = evt.target.value;

        setState({
            ...state,
            [evt.target.name]: value});
      
          console.log(evt.target.name, evt.target.value, evt.target.id);
       
        //push data to database
        WriteTo(user.email.replace(".", "_"), evt.target.id, evt.target.name, evt.target.value)


    }

    const [state, setState] = React.useState({
     
    })

    const user = getAuth().currentUser;


 

  return (
    
    
    
    <> 
    
      
{/* <h1>Your user name is: {user.email}</h1> */}

 
    <Container >
       <br />

<br />
       


{ScheduleData.map((data) => (


  <>
  
  <Card style= {data.status === "ongoing" ? {background:"#FDEBD0", width: '26rem' } : data.status === "finished" ? {background:"#D5DBDB ", width: '26rem' } : {background:"#F4F6F6", width: '26rem' } }>
    
    <Card.Body> 
 
    <Row>
        <Col className="center ml-2">
            <Row className="center mt-4"><CountryFlag isoCode={data.Home_code === "undefined" ? "de" : data.Home_code} size={25} />&nbsp;&nbsp;<h4>{data.Teamhome}</h4></Row>
            <Row className="center mt-2"><CountryFlag isoCode={data.Home_code === "undefined" ? "de" : data.Away_code} size={25} />&nbsp;&nbsp;<h4>{data.Teamaway}</h4></Row>
        </Col>


        <Col className="center ml-2">

        <Form>
          <Col className="center ml-2">
          
            <Form.Group  >
            <Form.Label></Form.Label>
            <Form.Control  
             type="number"
             style={{ width: 70, fontSize: 22, borderColor: "#ffffff", outline: "none", borderRadius: "8px" }}
             
             width="100px"
             value={state.minutes}
             name={data.Teamhome}
             id={data.nr}
             placeholder="0"
             onChange={handleChange}
            />
            <Form.Control  
             type="number"
             style={{ width: 70, fontSize: 22, borderColor: "#ffffff", outline: "none", borderRadius: "8px" }}
             
             width="100px"
             value={state.minutes}
             name={data.Teamaway}
             id={data.nr}
             placeholder="0"
             onChange={handleChange}
            />
            </Form.Group>
            </Col>
           
            </Form>

        </Col>    
    </Row>
    <br />
    <Row>
    
     <p>Game nr: {data.nr},&nbsp;&nbsp;&nbsp; {data.City} {data.Date} ,{data.Time}  </p>   
    </Row>
    </Card.Body>
    
    
    
    
    
    
    
    
    
    
    {/* <Card.Body>

      <Row>

        <Col className="ml-2 mr-2 mb-2 mt-2"><CountryFlag isoCode={data.Home_code === "undefined" ? "de" : data.Home_code} size={35} /></Col>

        <Col align="center" ><h4>{data.Teamhome}</h4></Col>
        <Col align="center" ><h4>{data.Scorehome}</h4></Col>
        <Col align="center"><h4> : </h4></Col>
        <Col align="center"><h4>{data.Scoreaway}</h4></Col>
        <Col align="center"><h4>{data.Teamaway}</h4></Col>

        <Col className="ml-2 mr-2 mb-2 mt-2"><CountryFlag isoCode={data.Away_code === "undefined" ? "de" : data.Away_code} size={35} /></Col>

      </Row>
      <Row>
      <Col align="center">{data.Date} kl. {data.Time}</Col>
      </Row>
      <Row>
      <Col align="center">{data.status}</Col>
      </Row>

      <br />

      <Dropdown align="center">
        <Dropdown.Toggle variant="secondary" id="dropdown-basic" className="ml-2 mr-2 mb-2 mt-2">
          current betting
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item href="#/action-1">Marek: <b>{data.Marek === "udefined" ? "-" : data.Marek.split(":")[0]} : {data.Marek === "udefined" ? "-" : data.Marek.split(":")[1]}</b>,  ({(data.Scorehome === data.Marek.split(":")[0] ? 1 : 0) + (data.Scoreaway === data.Marek.split(":")[1] ? 1 : 0) + (data.Scoreaway > data.Scorehome && data.Marek.split(":")[1] > data.Marek.split(":")[0] ? 2 : 0) + (data.Scoreaway < data.Scorehome && data.Marek.split(":")[1] < data.Marek.split(":")[0] ? 2 : 0) + (data.Scoreaway === data.Scorehome && data.Marek.split(":")[1] === data.Marek.split(":")[0] ? 2 : 0)}p)</Dropdown.Item>
          <Dropdown.Item href="#/action-2">Andre: <b>{data.Marek === "udefined" ? "-" : data.Marek.split(":")[0]} : {data.Marek === "udefined" ? "-" : data.Marek.split(":")[1]}</b>,  ({(data.Scorehome === data.Andre.split(":")[0] ? 1 : 0) + (data.Scoreaway === data.Andre.split(":")[1] ? 1 : 0) + (data.Scoreaway > data.Scorehome && data.Andre.split(":")[1] > data.Andre.split(":")[0] ? 2 : 0) + (data.Scoreaway < data.Scorehome && data.Andre.split(":")[1] < data.Andre.split(":")[0] ? 2 : 0) + (data.Scoreaway === data.Scorehome && data.Andre.split(":")[1] === data.Andre.split(":")[0] ? 2 : 0)}p)</Dropdown.Item>

        </Dropdown.Menu>
      </Dropdown>
    </Card.Body> */}
  </Card><br /></>

))}

        </Container>  
    </>
  )
}

export default HomeScreen