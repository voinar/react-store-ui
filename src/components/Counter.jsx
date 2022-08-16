import React from "react";
import { connect } from "react-redux"
import { increment, decrement } from '../redux/counter'

class Counter extends React.Component {
  render() {
    return (
      <>
        <div style={{color: "fuchsia", marginTop: "100px"}}>
          <h2>counter</h2>

        </div>
        <div style={{display: "flex", flexDirection: "row"}}>
            <div>
                <button onClick={() => this.props.increment()}>add</button>
            </div>
            <div>
                <div style={{margin: "0 10px"}}>{this.props.count}</div>
            </div>
            <div>
                <button onClick={() => this.props.decrement()}>remove</button>
            </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => (
    {
        count: state.counter.count
    }
)

const mapDispatchToProps = { increment, decrement }

export default connect(mapStateToProps, mapDispatchToProps)(Counter);
