

import React, { useEffect, useState }  from "react"
import useGoogleSheets from 'use-google-sheets';
import { Form, Row, Col, Container, Card, Badge, ProgressBar, Image, Table, Accordion, Button, FormGroup} from "react-bootstrap";
//import { AuthContextProvider, useAuthState } from './firebase'
import { getAuth } from 'firebase/auth';
import CountryFlag from "react-native-country-flag";
import Dropdown from 'react-bootstrap/Dropdown';
import { useCallback } from 'react'
import database from '../firebase';
import { getDatabase, onValue, update, ref, set, get, child, ref as ref_database, doc ,getDoc } from 'firebase/database'
import Spinner from 'react-bootstrap/Spinner';
import Alert from 'react-bootstrap/Alert';




const HomeScreen = ({ match }) => {


    var SheetData = [];
    var ScheduleData = [];
    var bettingTemplate = [];
    const BettingScore = [];
    var TotalScore = 0;


    const [sheetData, setData] = useState({});

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const bettingData = [];
    const betTempData = [];
    const scoreData = [];
    const tableAll = [];

    const teamData = [];
    const teamTempData = [];

    const user = getAuth().currentUser;
    const listRef = ref_database(database, "All/"+user.email.replace(".", "_"));
    const templateRef = ref_database(database, 'All/admin@kjor_pl');
    const scoreRef = ref_database(database,"score");
    const AllRef = ref_database(database,"All");
    

    function CalcPoints(a,b,c,d) {

        var score_A = 0;
        var score_B = 0;
        var score_res = 0;

        score_A = +(a === c) //poeng for number of goals A
        score_B = +(b === d) //poeng for number of goals B
        score_res = 2*((a === b)&&(c === d))+2*((a < b)&&(c < d))+2*((a > b)&&(c > d))
        //BettingScore.push(score_A + score_B + score_res);


        let sum = score_A + score_B + score_res;


        return sum;


    }

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
  
  }

   

    const WriteTo = (user,id,name,score) => {

      const gid = (n) => {
        if (n < 10) {
          return '0' + n
        }
        return '' + n
      }

      update(ref(database, "All/"+user.replace(".", "_")), {


        [gid(id)+"_"+name]:[name,score]

      });}


      //console.log("this is ref: "+templateRef)

      //array of all scores and teams in the template
      onValue(templateRef,(snapshot) => {

        const template = snapshot.val();

        if (template!==null){
        const t_length = Object.keys(template).length;
        //console.log(t_length)
        for (var i=0; i < t_length; i++) {
          betTempData.push(Array.from(template[Object.keys(template)[i]])[1])
          teamTempData.push(Array.from(template[Object.keys(template)[i]])[0])
        }
        //console.log(betTempData,teamTempData)
      }
      })


      //all scores and teams for the current user

      onValue(listRef, (snapshot) => {


        const data = snapshot.val();

        if (data!==null){

        const length = Object.keys(data).length;
        //console.log(length)
        for (var i=0; i < length; i++) {

          bettingData.push(Array.from(data[Object.keys(data)[i]])[1])
          teamData.push(Array.from(data[Object.keys(data)[i]])[0])
        }

        //console.log(bettingData,teamData)
      }
      })

      //read whole table of data

      onValue(AllRef, (snapshot) => {

        const everything = snapshot.val();
        const AllLength = Object.keys(everything).length;

        var a=0;
        var b=0;
        var c=0;
        var d=0;

        var n_of_games = ScheduleData.map((element)=>{
          return(element.n)
          })[0]
        
        console.log("number of games active: "+n_of_games)
        var table_real = [];
        for (var i=0; i < AllLength; i++)
        {
          var table = [];
          var score=0;

          tableAll.push(everything[Object.keys(everything)[i]])
          //console.log((everything[Object.keys(everything)[i]]))
          //console.log("score of: "+Object.keys(everything)[i])
          //console.log(tableAll[i])

          table=Object.values(tableAll[i]) //user betting
          table_real=Object.values(tableAll[0]) //fasit
          //console.log(Object.values(table[0][1]))
          for (var k=0; k < n_of_games; k++){
            a = Object.values(table[2*k][1])[0]
            b = Object.values(table[2*k+1][1])[0]
            c = Object.values(table_real[2*k][1])[0]
            d = Object.values(table_real[2*k+1][1])[0]
            //console.log(a, b, c, d)
            //console.log("Poeng for "+Object.keys(everything)[i]+" game:"+k+" score:"+ CalcPoints(a,b,c,d))
            score = score + CalcPoints(a,b,c,d)
          }
          //console.log("total score: "+score)

        //updating scire sheet
        update(ref(database, "score"), {


              [Object.keys(everything)[i]]:[score]

        });

        }
          //console.log("everything: "+ AllLength +" # " + tableAll)
      })


      onValue(scoreRef, (snapshot) => {


        const score = snapshot.val();

        if (score!==null){

        const length = Object.keys(score).length;
        //console.log(score)
        for (var i=0; i < length; i++)
        {

        scoreData.push([Array.from(score[Object.keys(score)[i]])[0],Array.from(score[Object.keys(score)[i]])[1]])
        //   teamData.push(Array.from(data[Object.keys(data)[i]])[0])
         }

        //console.log(scoreData)
      }
      })


    


    const country = "pl";

    

    const [name, setName] = useState("");
    const [email, setMail] = useState("");

    function handleSubmit(evt) {

      //const value = evt.target.value;

      evt.preventDefault();
      
      
      
      update(ref(database, "names"), {


        [email.replace(".", "_")]:[name]

      });

      alert(`The name you entered was: ${name}`)

      //WriteTo("score", evt.target.id, evt.target.name, evt.target.value)


    }
    
    function handleChange(evt) {
        const value = evt.target.value;

        setState({
            ...state,
            [evt.target.name]: value});

          //console.log(evt.target.name, evt.target.value, evt.target.id) ;

        //push data to database
        WriteTo(user.email.replace(".", "_"), evt.target.id, evt.target.name, evt.target.value)

//user.email.replace(".", "_")
    }

    const [state, setState] = React.useState({

    })






  return (



    <>


{/* ======================================= Admin Panel ================================================================================*/}

{user.email==="admin@kjor.pl" &&
 <Container >
 <br />
 <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => setMail(e.target.value)}
        style={{ width: 270, fontSize: 22, borderColor: "#ffffff", outline: "none", borderRadius: "8px" }} />
        <Form.Text className="text-muted">

        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formUsername">
        <Form.Label>Password</Form.Label>
        <Form.Control type="text" placeholder="Player name" value={name} onChange={(e) => setName(e.target.value)}
        style={{ width: 270, fontSize: 22, borderColor: "#ffffff", outline: "none", borderRadius: "8px" }} />
      </Form.Group>
      <Button variant="primary" type="submit">
        Add user
      </Button>
    </Form>
    <br />
    
</Container>

// ====================================================================================================================================
}







    <Container >
       <br />

<br />



{ScheduleData.map((data) => (


  <>

  <Card style= {data.status === "ongoing" ? {background:"#FDEBD0", width: '26rem' } : data.status === "finished" ? {background:"#D5DBDB ", width: '26rem' } : {background:"#F4F6F6", width: '26rem' } }>

    <Card.Body>

    <Row>

        <Col className="center ml-2">
            <Row className="center mt-4"><CountryFlag isoCode={data.Home_code === "undefined" ? "de" : data.Home_code} size={25} />&nbsp;&nbsp;<h4>{data.Teamhome}</h4>&nbsp;&nbsp;<h4 style={{color:"red"}}>{(data.status != "not started") && betTempData[(2*data.nr-1)-1]}</h4></Row>
            <Row className="center mt-2"><CountryFlag isoCode={data.Home_code === "undefined" ? "de" : data.Away_code} size={25} />&nbsp;&nbsp;<h4>{data.Teamaway}</h4>&nbsp;&nbsp;<h4 style={{color:"red"}}>{(data.status != "not started") && betTempData[(2*data.nr)-1]}</h4></Row>
        </Col>


        <Col className="center ml-2">

        <Form>
          <Col className="center ml-2">

            <Form.Group  >
            <Form.Label></Form.Label>
            <Form.Control
             type="number"
             style={{ width: 70, fontSize: 22, borderColor: "#ffffff", outline: "none", borderRadius: "8px" }}
             //disabled={true}
             width="100px"
             value={state.minutes}
             name={"A_" + data.Teamhome}

             disabled={data.status != "not started"} //disable form when blocked

             id={data.nr}
             placeholder= {bettingData[(2*data.nr-1)-1]} //transposing numbers for pairs of teams
             onChange={handleChange}
            />
            <Form.Control
             type="number"
             style={{ width: 70, fontSize: 22, borderColor: "#ffffff", outline: "none", borderRadius: "8px" }}

             width="100px"
             value={state.minutes}
             name={"B_"+data.Teamaway}

             disabled={data.status != "not started"} //disable form when blocked

             id={data.nr}
             placeholder={bettingData[(2*data.nr)-1]} //transposing numbers for pairs of teams
             onChange={handleChange}
            />
            </Form.Group>
            </Col>

            </Form>

        </Col>
    </Row>
    <br />
    <Row>

     <p>Game nr: {data.nr},&nbsp;&nbsp;&nbsp; {data.City} {data.Date} ,{data.Time}  </p>&nbsp;&nbsp;&nbsp;{(data.status === "ongoing") && <><Spinner animation="grow" variant="danger" size="sm"/>&nbsp;<p>Live</p></>}
    </Row>
    {data.status != "not started" && <Alert variant={"info"}>
          Points earned in this game: {CalcPoints(bettingData[(2*data.nr-1)-1], bettingData[(2*data.nr)-1], betTempData[(2*data.nr-1)-1], betTempData[(2*data.nr)-1],data.nr)}<br />
          Total: {TotalScore}
        </Alert>}
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