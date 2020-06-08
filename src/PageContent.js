import React, { Component } from 'react';
import FileInput from './FIleInput';
import PdfGeneratorInterface from "./PdfGeneratorInterface";
import { Button, TextField, Typography, Paper } from '@material-ui/core';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import DefaultGradingTable from './DefaultGradingTable';
import Faq from './Faq';
import DrawCanves from './DrawCanves';
import sampleFile from "./resource/sample_marks_file.xls";

class PageContent extends Component {
    state = {
        tableHeadersArr: [],
        tableRowsArr: [],
        isBtnDis: true,
        payload: {},
        instituteName: "",
        description: "",
        gradingArray: [
            [32, "F", "0.00"],
            [39, "D", "1.00"],
            [49, "C", "2.00"],
            [59, "B", "3.00"],
            [69, "A-", "3.50"],
            [79, "A", "4.00"],
            [100, "A+", "5.00"],
        ],
        picData: {},
        showComp: "initial_comp"
    }

    getData = (data) => {
        this.setState({
            tableHeadersArr: Object.keys(data[0]),
            tableRowsArr: data,
        })
    }

    gradeCalculator(data) {
        for (let index = 0; index < this.state.gradingArray.length; index++) {
            const item = this.state.gradingArray[index];
            if (data <= item[0]) {
                data = `${item[1]} | ${item[2]}`;
                break;
            }
        }
        return data
    }

    calculateCGPA(item) {
        let subArr = Object.keys(this.state.payload);
        let cgpa = 0
        let passStatus = 1
        for (let index = 0; index < subArr.length; index++) {
            const data = subArr[index];
            let marking = parseInt(data.replace(/[^\d]/g, ''), 10) || 100
            let percentMark = (item[data] * 100) / marking

            for (let index = 0; index < this.state.gradingArray.length; index++) {
                const item = this.state.gradingArray[index];
                if (percentMark <= item[0]) {
                    if (parseFloat(item[2]) === 0.00) {
                        passStatus = 0
                    }
                    cgpa += parseFloat(item[2])
                    break;
                }
            }
            if (passStatus === 0) {
                cgpa = 0.00;
                break;
            }
        }
        return (cgpa / (subArr.length)).toFixed(2)
    }

    generatePDF = async () => {
        let tableRowsArr = [...this.state.tableRowsArr];
        // calculate grade
        let subArr = Object.keys(this.state.payload);

        tableRowsArr.forEach((item, index) => {
            item.cgpa = this.calculateCGPA(item)
            subArr.forEach((data) => {
                let marking = parseInt(data.replace(/[^\d]/g, ''), 10) || 100
                let percentMark = (item[data] * 100) / marking
                item[data] = item[data] + " | " + this.gradeCalculator(percentMark)
            })
        })

        tableRowsArr.sort(function (a, b) { return b.cgpa - a.cgpa });
        tableRowsArr.forEach((item, index) => {
            item.position = index + 1
        })

        let tableHeadersArr = Object.keys(tableRowsArr[0])
        tableHeadersArr.unshift("cgpa")
        tableHeadersArr.unshift("position")
        tableHeadersArr.splice(-2)
        let pdfInterface = new PdfGeneratorInterface(
            tableHeadersArr,
            tableRowsArr,
            "Result",
            this.state.instituteName,
            this.state.description
        );
        pdfInterface.downloadTableAsPDF()

        this.refresh()
    };

    refresh = () => {
        this.setState({
            tableHeadersArr: [],
            tableRowsArr: [],
            payload: {},
            isBtnDis: true
        }, () => {
            this.fileInputRef.refresh()
        })
    }

    handleChange = (e) => {
        let payload = { ...this.state.payload }
        if (e.target.checked)
            payload[e.target.name] = e.target.checked
        else {
            delete payload[e.target.name]
        }
        console.log(payload)
        let isBtnDis = true
        if (Object.keys(payload).length !== 0) {
            isBtnDis = false
        }
        this.setState({
            payload,
            isBtnDis
        })
    }

    setName = (e) => {
        this.setState({
            instituteName: e.target.value
        })
    }

    setFormData = (data) => {
        console.log(data)
        let gradingArray = []
        data.forEach((item, i) => {
            let singleGrade = [item.value[1].value, item.value[2].value, item.value[3].value]
            gradingArray.push(singleGrade)
        })
        console.log(gradingArray)
        this.setState({
            gradingArray
        })
    }

    setDescription = (e) => {
        this.setState({
            description: e.target.value
        })
    }

    getFileInput = () => {
        return (
            <div>

                <FileInput getData={this.getData} ref={(r) => { this.fileInputRef = r }} />
                <div style={{ marginBottom: "10px", }}>
                    <Typography variant="h6" component="span">
                        Sample Marks File
                    </Typography>
                    <a href={sampleFile} style={{ marginLeft: 8 }} download>Click to download</a>
                </div>

                {this.state.tableHeadersArr.length > 0 && (
                    <div>
                        <div>
                            < TextField
                                onChange={this.setName}
                                label={"Enter Institute Name"}
                                value={this.state.instituteName}
                                required variant="outlined"
                                style={{ margin: "20px 0px", width: 300 }}
                            />
                        </div>
                        < TextField
                            onChange={this.setDescription}
                            label={"Description"}
                            required variant="outlined"
                            style={{ margin: "20px 0px", width: 300 }}
                            multiline
                        />


                        <Typography variant="h6" component="h2">
                            Select columns that contain mark
                        </Typography>
                        <FormGroup row>
                            {this.state.tableHeadersArr.map((item, i) => {
                                return (
                                    <FormControlLabel
                                        control={<Checkbox checked={this.state.payload.item} onChange={this.handleChange} name={item} />}
                                        label={item}
                                        key={i}
                                        style={{ minWidth: 200 }}
                                    />
                                )
                            })}

                        </FormGroup>
                    </div>
                )}

                <Button
                    variant="contained"
                    color="primary"
                    disabled={this.state.isBtnDis}
                    onClick={this.generatePDF}
                >
                    Download Result
                </Button>
                <Button variant="contained"
                    color="primary"
                    disabled={this.state.isBtnDis}
                    style={{ marginLeft: 20 }}
                    onClick={this.onShowStatClick}> Show stat </Button>
            </div>
        )
    }

    onShowStatClick = () => {
        console.log(this.state)
        let tableRowsArr = [...this.state.tableRowsArr];
        // calculate grade
        let subArr = Object.keys(this.state.payload);
        let picData = {}

        subArr.forEach((data) => {
            picData[data] = []
        })

        tableRowsArr.forEach((item, index) => {
            subArr.forEach((data) => {
                let marking = parseInt(data.replace(/[^\d]/g, ''), 10) || 100
                let percentMark = (item[data] * 100) / marking
                let gc = this.gradeCalculator(percentMark)
                let sGrade = gc.slice(0, (gc.indexOf("|") - 1))
                picData[data].push(sGrade)
            })
        })
        console.log(picData, this.state.gradingArray)
        this.setState({
            picData,
            showComp: "canvas"
        })
    }

    switchComp = (showComp) => {
        this.setState({
            showComp
        })
    }

    render() {
        let fileInput = this.getFileInput()
        return (
            <React.Fragment>
                {this.state.showComp === "initial_comp" && (
                    <>
                        <Typography variant="h4" component="h2" style={{ paddingBottom: 20 }}>
                            Upload MARKS of students to GENERATE RESULT
                        </Typography>

                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <div style={{ flex: 1, padding: "8px 32px 16px 0px" }}>
                                <Paper children={fileInput} elevation={1} style={{ minHeight: 200, padding: 16, marginBottom: 16, display: "flex", alignItems: "center", justifyContent: "center" }} />
                                <Faq />
                            </div>
                            <DefaultGradingTable setFormData={this.setFormData} />
                        </div>
                    </>
                )}

                {this.state.showComp === "canvas" && <DrawCanves picData={this.state.picData} gradingArray={this.state.gradingArray} switchComp={this.switchComp} />}
            </React.Fragment>
        );
    }
}

export default PageContent;