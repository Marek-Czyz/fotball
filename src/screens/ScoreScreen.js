import React  from "react"
import useGoogleSheets from 'use-google-sheets';
import {  Container, Card, Table } from "react-bootstrap";
import {  onValue, ref as ref_database } from 'firebase/database'
import database from '../firebase';


const ScoreScreen = ({ match }) => {

    var SheetData = [];
    
    var BettingData = [];
    //var bettingData = [];
    const scoreObjects = [];
    const names = [];


    //test av array of objects
    //const testObjects = [{no: 1, navn: "Marek", poeng: 5},{no: 2, navn: "Vincent", poeng: 7},{no: 3, navn: "Anna", poeng: 17},{no: 4, navn: "Stefan", poeng: 4}]


    ///------delete---
    
    const scoreRef = ref_database(database,"score");
    const nameRef = ref_database(database,"names");
    
    const { data, loading} = useGoogleSheets({
        apiKey: "AIzaSyDam7-qqRfOnNqb1-mgQ45W67XF2D68YFg",
        sheetId: "1TsPyLP-WnteZXAdzbTMm3pvKz9DL0iIRFWdPpjHp4lk",
        //sheetsOptions: [{ id: 'Sheet1' }],
          });
  
      if (!loading)
    {  
  
    SheetData =  Array.from(data); 
    const BettingJSON = JSON.stringify(SheetData[2]);
  
    BettingData = Array.from(JSON.parse(BettingJSON).data);
    
    //console.log((BettingData))
    
      
   
    //console.log((sortScore))
  
    //read names reference:
    onValue(nameRef,(snapshot) => {
      const data = snapshot.val();
      const length = Object.keys(data).length;
      for (var i=0; i < length; i++) {
      names.push(data[Object.keys(data)[i]])
      
      }
//console.log(names)
    })  


    //read all scores from database:
    onValue(scoreRef, (snapshot) => {


      const data = snapshot.val();
      var userObject={};
      if (data!==null){

      const length = Object.keys(data).length;
      var scoreTable = [];
      
      for (var i=0; i < length; i++) {
        var realName ="";
        scoreTable.push(data[Object.keys(data)[i]])
        //bettingData = Array.from(Object.values(scoreTable[i])) 

        for (var j=0; j < Object.keys(BettingData).length; j++) {
          
          if (BettingData[j].epost === Object.keys(data)[i]){
            realName = BettingData[j].navn
            //console.log(BettingData[j].epost," <> "+ Object.keys(data)[i])
          } else {}

        }
        userObject = {no: i, navn: realName, poeng: data[Object.keys(data)[i]][0]}
        scoreObjects.push(userObject)
        //console.log(userObject)
        //console.log("user: "+ Object.keys(data)[i] + " poeng: " + data[Object.keys(data)[i]][0])
      }

      //console.log(scoreObjects)
    }
    })
  

    


    }    

    return (

    <>
      <Container>
      <br/>
      <Card>
          
          <Card.Body>
            <Table striped bordered hover variant="light">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Navn</th>
                  <th>Poeng</th>
                </tr>
              </thead>
              <tbody>
                {scoreObjects.sort(function (b, a) {
                  return parseFloat(a.poeng) - parseFloat(b.poeng);
                }).map((data, i) => (

                  
                  <>
                   
                    <tr>
                      <td>{(data.navn!=="Admin" && i)}</td>
                      <td>{(data.navn!=="Admin" && data.navn)}</td>
                      <td>{(data.navn!=="Admin" && data.poeng)}</td>
                    </tr>
                    <tr></tr>
                  </>
                 
                  
                ))}
              </tbody>
            </Table>

            
          </Card.Body>

        </Card>
        </Container>
        </>



          


        
        )

}


export default ScoreScreen