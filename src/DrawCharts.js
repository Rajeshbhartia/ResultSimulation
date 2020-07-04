import React, { Component } from 'react';
import Chart1 from './Chart1';
import Chart2 from "./Chart2";
import { Typography } from '@material-ui/core';

class DrawCharts extends Component {
    state = {
        cgpaOptions: {
            chart: {
                id: "cgpa-chart"
            },
            xaxis: {
                categories: []
            }
        },
        cgpaSeries: [
            {
                name: "series-1",
                data: []
            }
        ],
        barchartSeris:[]
    }



    componentDidMount() {
        let rolls = [], grades = [];
        let cgpaOptions = { ...this.state.cgpaOptions }
        let cgpaSeries = [...this.state.cgpaSeries]

        this.props.picData.forEach(element => {
            //for cgpa graph
            if (element.roll || element.Roll) {
                let roll = element.roll || element.Roll
                rolls.push(parseInt(roll))
                grades.push(parseFloat(element.cgpa))
            }

        });

        cgpaOptions.xaxis.categories = rolls
        cgpaSeries[0].data = grades
        this.setState({
            cgpaOptions, cgpaSeries
        })
        this.makeBarchartSeries()
    }
    makeBarchartSeries(){
        let barchartSeris = []

        this.props.gradingArray.forEach((item)=>{
            let obj = {}
            obj.name = item[1]
            obj.point = {}
            barchartSeris.push(obj)
        })

        this.props.picData.forEach(element=>{
            Object.keys(this.props.subArr).forEach((sub,i)=>{
                let x =element[sub].grade
                // console.log(x)
                let index = barchartSeris.findIndex((item)=>{
                    return item.name === x
                })
                // console.log(barchartSeris)
                if(barchartSeris[index].point && barchartSeris[index].point[sub]){
                    barchartSeris[index].point[sub] = barchartSeris[index].point[sub] + 1
                }else if(barchartSeris[index].point){ 
                    // barchartSeris[index].point = {}
                    barchartSeris[index].point[sub] = 1
                }else{
                    barchartSeris[index].point = {}
                    barchartSeris[index].point[sub] = 1
                }
            })
        })
        barchartSeris.forEach(item=>{
            item.data = []
            Object.keys(this.props.subArr).forEach((sub,index)=>{
                if(item.point[sub]){
                    item.data[index] = item.point[sub]
                }else{
                    item.data[index] = 0
                }
            })
        })

        this.setState({
            barchartSeris
        })
        
    }
    render() {
        console.log(this.props)
        if(this.state.cgpaOptions.xaxis.categories.length === 0 || Object.keys(this.props.subArr).length === 0 || this.state.barchartSeris.length === 0) return null        
        return (
            <div>
                <Typography component="div" variant="h6"> Performence Per Subject </Typography>
                <Chart2 series={this.state.barchartSeris} categories = {Object.keys(this.props.subArr)}/>

                <Typography component="div" variant="h6"> CGPA Of Students </Typography>
                <Chart1 options={this.state.cgpaOptions} series={this.state.cgpaSeries} />

            </div>
        );
    }
}

export default DrawCharts;