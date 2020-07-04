import React from "react";
// import Chart from "react-apexcharts";

const { default: ReactApexChart } = require("react-apexcharts");

export default class ApexChart extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            series: [],
            options: {
                chart: {
                    type: 'bar',
                    height: 350,
                    stacked: true,
                    stackType: '100%'
                },
                responsive: [{
                    breakpoint: 480,
                    options: {
                        legend: {
                            position: 'bottom',
                            offsetX: -10,
                            offsetY: 0
                        }
                    }
                }],
                xaxis: {
                    categories: this.props.categories,
                },
                fill: {
                    opacity: 1
                },
                legend: {
                    position: 'right',
                    offsetX: 0,
                    offsetY: 50
                },
            },
        };
    }

    // componentDidUpdate(prevProps, prevState) {
    //     if(prevProps.categories.length !== this.props.categories.length){
    //         this.setState({

    //         })
    //     }
    // }


    render() {
        return (


            <div id="chart">
                <ReactApexChart options={this.state.options} series={this.props.series} type="bar" height={350} />
            </div>


        );
    }
}
