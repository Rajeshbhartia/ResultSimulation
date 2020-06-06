import React, { Component } from 'react';
import CanvasJSReact from './assets/canvasjs.react';
import { Button } from '@material-ui/core';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class PieChart extends Component {

    getOccurrence(array, value) {
        var count = 0;
        array.forEach((v) => (v === value && count++));
        return count;
    }

    render() {
        let options = [];

        Object.entries(this.props.picData).forEach(([sub, value], index) => {
            let datapoint = []
            this.props.gradingArray.forEach((item, i) => {
                let x = this.getOccurrence(value, item[1])
                console.log(item[1], x, sub)
                let obj = {}
                obj.y = (x / value.length * 100).toFixed(2)
                obj.label = item[1]
                datapoint.push(obj)
            })

            let optionObj = {
                exportEnabled: true,
                animationEnabled: true,
                title: {
                    text: sub
                },
                data: [{
                    type: "pie",
                    startAngle: 75,
                    toolTipContent: "<b>{label}</b>: {y}%",
                    showInLegend: "true",
                    legendText: "{label}",
                    indexLabelFontSize: 16,
                    indexLabel: "{label} - {y}%",
                    dataPoints: datapoint
                }]
            }

            options.push(optionObj)
        })

        console.log(this.props)



        return (
            <div>
                <Button variant="contained"
                    color="primary"
                    onClick={() => this.props.switchComp("initial_comp")}>Back</Button>
                <h1>Results simulation</h1>
                {options.map((option, i) => <CanvasJSChart options={option} key={i} />)}
            </div>
        );
    }
}

export default PieChart;