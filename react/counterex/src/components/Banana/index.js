// Write your code here
import {Component} from 'react'
import './index.css'

class FruitsCounter extends Component {
  state = {
    mangoCount: 0,
    bananaCount: 0,
  }

  onEatMango = () => {
    this.setState(prevState => ({
      mangoCount: prevState.mangoCount + 1,
    }))
  }

  onEatBanana = () => {
    this.setState(prevState => ({
      bananaCount: prevState.bananaCount + 1,
    }))
  }

  render() {
    const {mangoCount, bananaCount} = this.state

    return (
      <div className="bg-container">
        <div className="card">
          <h1 className="heading">
            Bob ate <span>{mangoCount}</span> mangoes <span>{bananaCount}</span>{' '}
            bananas
          </h1>

          <div className="fruits-container">
            <div className="fruit-card">
              <img
                className="fruit-image"
                src="https://assets.ccbp.in/frontend/react-js/mango-img.png"
                alt="mango"
              />
              <button className="button" onClick={this.onEatMango}>
                Eat Mango
              </button>
            </div>

            <div className="fruit-card">
              <img
                className="fruit-image"
                src="https://assets.ccbp.in/frontend/react-js/banana-img.png"
                alt="banana"
              />
              <button className="button" onClick={this.onEatBanana}>
                Eat Banana
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default FruitsCounter
