import React, { useEffect, useState }  from "react"
import { Form, Button, Alert, Col, Card, Container} from "react-bootstrap"
import statusImage from '../Images/status.png' // relative path to image 

const InfoScreen = ({ match }) => {

  
    return (
      
      <> 
        <Container >
        <Card style= {{background:"#F8F1F5", width: '24rem'}}>
          <Card.Header>
          Poeng
          </Card.Header>
          <Card.Body>
            <b>1 p</b> for riktig antall mål<br/>
            <b>2 p</b> for riktig utfall<br/>
            <br/>
            Eksempel:  Kampen slutter <b>GER 2:1 SCO</b> <br/><br/>
            Du tippet: 2:2 - du får 1 p for GER sine mål<br/>
            Du tippet: 0:1 - du får 1 p for SCO sine mål<br/>
            Du tippet: 3:0 - du får 2p for sluttresultat<br/>
            Du tippet: 2:0 - du får 1 p for GER sine mål + 2 p for sluttresultat (tot. 3p)<br/>
            Du tippet: 2:1 - du får 4p, 1 for hvert antall mål og 2p for sluttresultat<br/><br/>
        

          </Card.Body>
          
        </Card>
        <br/>
        <Card style= {{background:"#F8F1F5", width: '24rem'}}>
          <Card.Header>
          Frister
          </Card.Header>
          <Card.Body>
            Frist for å bli med i spillet: <b>12.06.2024</b><br/>
            Frist for å legge inn score: <b>kl 00:00 på kampdagen</b> <br/>
            
            

          </Card.Body>
                    
        </Card>
        <br/>
        <Card style= {{background:"#F8F1F5", width: '24rem'}}>
          <Card.Header>
          <b>Status</b>
          </Card.Header>
          <Card.Body>
          <b>Finished</b> - Feltene for tipping er deaktivert, viser stilling, hva du har tippet og antall poeng tjent i denne kampen.<br/><br/>
          <b>Ongoing</b> - Feltene for tipping er deaktivert, viser midertidlig stilling, hva du har tippet og foreløpig antall poeng tjent i denne kampen.<br/><br/>
          <b>Not started</b> - Fremdeles mulig å endre tipping frem til midnatt før kampdagen. Viser ikke poeng.<br/><br/>
            
            
            
            <img src={statusImage}/>
            
            

          </Card.Body>
          <br/>
          
        </Card>
        </Container>
      
        
      </>
    )
  }
  
  export default InfoScreen