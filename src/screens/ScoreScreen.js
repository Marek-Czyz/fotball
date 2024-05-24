import React, { useEffect, useState }  from "react"
import useGoogleSheets from 'use-google-sheets';
import { Form, Row, Col, Container, Card, Badge, ProgressBar, Image, Table, Accordion, Button} from "react-bootstrap";

const ScoreScreen = ({ match }) => {

    var SheetData = [];
    
    var BettingData = [];
    
    
    
    const { data, loading, error } = useGoogleSheets({
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
    
      
    const sortScore = BettingData.sort((a,b) => b.poeng - a.poeng)
   
    //console.log((sortScore))
  
    

  
    }    

    return (





        <Card>
            <Card.Header>
              
            </Card.Header>
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
              {BettingData.map((data,i) =>(
              <>
                <tr>
                  <td>{i+1}</td>
                  <td>{data.navn}</td>
                  <td>{data.poeng}</td>
                </tr>
                <tr></tr>
              </>
              ))}
              </tbody>
            </Table>    
              </Card.Body>
         
          </Card>
        
        )

}


export default ScoreScreen