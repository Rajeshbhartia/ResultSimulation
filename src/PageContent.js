import React, { Component } from 'react';
import FileInput from './FIleInput';
import PdfGeneratorInterface from "./PdfGeneratorInterface";
import { Button, TextField, Typography, Paper, Grid, Link } from '@material-ui/core';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import DefaultGradingTable from './DefaultGradingTable';
import Faq from './Faq';
// import DrawCanves from './DrawCanves';
import sampleFile from "./resource/sample_marks_file.xls";
import UploadImage from './UploadImage';
import ErrorIcon from '@material-ui/icons/ErrorOutlineRounded';
import DrawCharts from './DrawCharts';
// import Stepper from "./Stepper"
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import BackIcon from '@material-ui/icons/ArrowBack';


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
        showComp: "initial_comp",
        uploadPhoto: {},
        // showCheckBoxComp: false,
        activeStep: 0
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

    generatePDF = () => {
        let tableRowsArr = JSON.parse(JSON.stringify(this.state.tableRowsArr))
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
            this.state.description,
            this.state.uploadPhoto
        );
        pdfInterface.downloadTableAsPDF()
    };

    handleChange = (e) => {
        let payload = { ...this.state.payload }
        if (e.target.checked)
            payload[e.target.name] = e.target.checked
        else {
            delete payload[e.target.name]
        }
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
        let gradingArray = []
        data.forEach((item, i) => {
            let singleGrade = [item.value[1].value, item.value[2].value, item.value[3].value]
            gradingArray.push(singleGrade)
        })
        this.setState({
            gradingArray
        })
    }

    setDescription = (e) => {
        this.setState({
            description: e.target.value
        })
    }

    setImageData = (id, url) => {
        let uploadPhoto = { ...this.state.uploadPhoto }
        uploadPhoto[id] = url
        this.setState({
            uploadPhoto
        })
    }

    onSubmit = (e) => {
        e.preventDefault();
        if (this.state.tableHeadersArr.length !== 0) {
            this.handleNext()
            this.setState({
                // showCheckBoxComp: true,
                setError: ""
            })
        }
        else {
            this.setState({
                setError: "Please upload your file for result generation"
            })
        }
    }

    getFileInput = () => {
        return (
            <Grid container style={{ flexGrow: 1 }} spacing={2}>
                <Grid item xs={12}>
                    <Grid container spacing={2}>
                        <Grid item style={{ width: 450 }} >
                            <form onSubmit={this.onSubmit}>
                                <FileInput getData={this.getData} ref={(r) => { this.fileInputRef = r }} />
                                <UploadImage id="upload_logo" label="Upload Logo" setData={this.setImageData} />
                                <UploadImage id="upload_signature" label="Upload Signature" setData={this.setImageData} />

                                <TextField
                                    onChange={this.setName}
                                    label={"Enter Institute Name"}
                                    value={this.state.instituteName}
                                    required variant="outlined"
                                    style={{ margin: "12px 0px" }}
                                    fullWidth
                                />

                                <TextField
                                    onChange={this.setDescription}
                                    label={"Description"}
                                    variant="outlined"
                                    style={{ margin: "12px 0px 24px 0px" }}
                                    value = {this.state.description}
                                    multiline
                                    fullWidth
                                />
                                {this.state.setError && (
                                    <div style={{ display: "flex", alignItems: "center", color: "red", marginBottom: 16 }}>
                                        <ErrorIcon style={{ height: "0.6em", width: "0.6em", marginRight: 8 }} />
                                        <Typography variant="subtitle2">
                                            {this.state.setError}
                                        </Typography>
                                    </div>
                                )}
                                <Button
                                    variant="contained"
                                    color="primary"
                                    type="submit"
                                    style={{ float: "right" }}
                                >
                                    Submit
                                </Button>
                            </form>
                        </Grid>

                        <div style={{ width: 1, background: "#d8d8d8", margin: "0px 16px" }}></div>

                        <Grid item style={{ width: 200 }} >
                            <div style={{ marginBottom: "10px", display: "flex", flexDirection: "column" }}>
                                <Typography variant="h6" component="span">
                                    Sample Marks File
                                </Typography>

                                <Link href={sampleFile} download>
                                    Click to download
                                </Link>
                            </div>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        )
    }

    onShowStatClick = () => {
        let tableRowsArr = JSON.parse(JSON.stringify(this.state.tableRowsArr))
        // calculate grade
        let subArr = Object.keys(this.state.payload);
        tableRowsArr.forEach((item, index) => {
            item.cgpa = this.calculateCGPA(item)
            subArr.forEach((data) => {
                let marking = parseInt(data.replace(/[^\d]/g, ''), 10) || 100
                let percentMark = (item[data] * 100) / marking
                let gc = this.gradeCalculator(percentMark)
                let sGrade = gc.slice(0, (gc.indexOf("|") - 1))
                item[data] = { grade: sGrade, marks: item[data] }
            })
        })
        tableRowsArr.sort(function (a, b) { return b.cgpa - a.cgpa });
        tableRowsArr.forEach((item, index) => {
            item.position = index + 1
        })
        this.setState({
            picData: tableRowsArr,
            showComp: "canvas"
        })
    }

    switchComp = (showComp) => {
        this.setState({
            showComp
        })
    }


    //stepper method
    getSteps() {
        return ['Upload Marks', 'Select Marks Column'];
    }

    getStepContent(stepIndex) {
        let fileInput = this.getFileInput()

        switch (stepIndex) {
            case 0:
                return <Paper children={fileInput} elevation={1} style={{ minHeight: 200, padding: 16, marginBottom: 16 }} />
            case 1:
                return this.step2Content();
            default:
                return 'Unknown stepIndex';
        }
    }

    step2Content = () => {
        return (
            <Paper style={{ padding: 16, margin: "16px 0px" }} >
                <Typography variant="h6" component="h2" style={{ marginBottom: "16px", fontWeight: 500 }}>
                    Select columns that contain mark
                </Typography>

                <FormGroup row>
                    {this.state.tableHeadersArr.map((item, i) => {

                        return (
                            <FormControlLabel
                                control={<Checkbox checked={this.state.payload[item]} onChange={this.handleChange} name={item} />}
                                label={item}
                                key={i}
                                style={{ minWidth: 200 }}
                            />
                        )
                    })}
                </FormGroup>

                <div style={{ display: "flex", justifyContent: "space-between", padding: "20px 0px" }}>
                    <Button
                        variant="contained"
                        // color="primary"
                        startIcon={<BackIcon />}
                        onClick={this.handleBack}>
                        Back
                    </Button>

                    <div style={{ display: "flex", justifyContent: "flex-end" }}>

                        <Button variant="outlined"
                            color="primary"
                            disabled={this.state.isBtnDis}
                            onClick={this.onShowStatClick}>
                            Show stat
                        </Button>
                        <Button
                            variant="contained"
                            color="primary"
                            disabled={this.state.isBtnDis}
                            style={{ marginLeft: 20 }}
                            onClick={this.generatePDF}
                        >
                            Download Result
                        </Button>
                    </div>
                </div>
            </Paper>
        )
    }


    handleNext = () => {
        this.setState({
            activeStep: this.state.activeStep + 1
        })
    };

    handleBack = () => {
        this.setState({
            activeStep: this.state.activeStep - 1
        })
    };

    render() {
        const steps = this.getSteps();
        return (
            <React.Fragment>
                {this.state.showComp === "initial_comp" && (
                    <>
                        <Typography variant="h4" component="h2" style={{ paddingBottom: 20 }}>
                            Upload MARKS of students to GENERATE RESULT
                        </Typography>


                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <div style={{ flex: 1, padding: "8px 32px 16px 0px" }}>
                                <div style={{ width: '100%' }}>
                                    <Stepper activeStep={this.state.activeStep} alternativeLabel>
                                        {steps.map((label) => (
                                            <Step key={label}>
                                                <StepLabel>{label}</StepLabel>
                                            </Step>
                                        ))}
                                    </Stepper>
                                </div>

                                {this.getStepContent(this.state.activeStep)}
                                
                            </div>
                            <DefaultGradingTable setFormData={this.setFormData} />
                        </div>

                    </>
                )}

                {this.state.showComp === "canvas" && <DrawCharts picData={this.state.picData} gradingArray={this.state.gradingArray} switchComp={this.switchComp} subArr={this.state.payload} />}
            </React.Fragment>
        );
    }
}

export default PageContent;