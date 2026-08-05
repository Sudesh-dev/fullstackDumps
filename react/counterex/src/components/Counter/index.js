import {Component} from 'react'
import './index.css'

class Counter extends Component {
  render() {
    return (
      <div className="container">
        <h1 className="heading">Counter</h1>
        <p className="count">0</p>
        <div>
          <button className="button">Increase</button>
          <button className="button">Decrease</button>
        </div>
      </div>
    )
  }
}

export default Counter
