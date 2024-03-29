import React, { Component } from "react";
import Card from "./Card";
import "./Deck.css";
import axios from "axios";
const API_BASE_URL = "https://www.deckofcardsapi.com/api/deck";

class Deck extends Component {
  constructor(props) {
    super(props);
    this.state = { deck: null, drawn: [] };
    this.drawCard = this.drawCard.bind(this)
  }
  async componentDidMount(){
    let deck = await axios.get(`${API_BASE_URL}/new/shuffle/`)
    this.setState({ deck:deck.data })
  }

  async drawCard(){
    let deckID = this.state.deck.deck_id
    console.log(deckID)
    try{
    let cardUrl = `${API_BASE_URL}/${deckID}/draw/`;
    let cardRes = await axios.get(cardUrl)
    console.log(cardRes)
    if(!cardRes.data.success){
      throw new Error("Cards Finished!")
    }
    let card = cardRes.data.cards[0]
    this.setState(st => ({
      drawn: [
        ...st.drawn,
        {
          id: card.code,
          image: card.image,
          name: `${card.suit}`
        }
      ]
    }))
  }
  catch(err){
    alert(err)
  }

    

  }


  render(){
    const cards = this.state.drawn.map(c => (
      <Card name={c.name} image={c.image} key={c.id}/>
    ))
    return(
      <div className="Deck">
        <h1 className="Deck-title">Card Dealer</h1>
        <button onClick={this.drawCard} className="Deck-btn">Get Card</button>

        <div className="Deck-cardarea">
        {
          cards
        }
        </div>
        
      </div>
    )
  }
  

}
export default Deck;
