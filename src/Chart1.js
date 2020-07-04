import React, { Component } from "react";
import Chart from "react-apexcharts";

class Chart1 extends Component {
  render() {
    return (
      <div className="app">
        <div className="row">
          <div className="mixed-chart">
            <Chart
              options={this.props.options}
              series={this.props.series}
              type="bar"
              // width="700"
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Chart1;