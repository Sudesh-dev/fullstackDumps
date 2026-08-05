// Write your code here
import {Component} from 'react'
import './index.css'

class Speedometer extends Component {
  state = {count: 0}

  onAccelerate = () => {
    this.setState(speed => {
      if (speed.count < 200) {
        return {count: speed.count + 10}
      }
    })
  }

  onBrake = () => {
    this.setState(speed => {
      if (speed.count > 0) {
        return {count: speed.count - 10}
      }
    })
  }

  render() {
    const {count} = this.state
    return (
      <div className="bg-container">
        <h1 className="header">Speedometer</h1>
        <img
          className="image"
          src="https://assets.ccbp.in/frontend/react-js/speedometer-img.png"
          alt="speedometer"
        />
        <h2>Speed is {count}mph</h2>
        <p>Min limit is 0mph, Max limit is 200mph</p>
        <div>
          <button className="btn accelerate-btn" onClick={this.onAccelerate}>
            Accelerate
          </button>
          <button className="btn brake-btn" onClick={this.onBrake}>
            Apply Brake
          </button>
        </div>
      </div>
    )
  }
}

export default Speedometer
