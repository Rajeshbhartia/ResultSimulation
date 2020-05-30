import React, { Component } from 'react';
import FileInput from './FIleInput';
import PdfGeneratorInterface from "./PdfGeneratorInterface";
import { Button, TextField } from '@material-ui/core';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

class App extends Component {

  state = {
    tableHeadersArr: [],
    tableRowsArr: [],
    isBtnDis: true,
    payload: {},
    instituteName: ""
  }

  getData = (data) => {
    this.setState({
      tableHeadersArr: Object.keys(data[0]),
      tableRowsArr: data,
    })
  }

  gradeCalculator(data) {
    switch (true) {
      case (data < 33):
        data = `0.00 | fail`
        break;
      case (data < 40):
        data = `1.00 | D`
        break;
      case (data < 50):
        data = `2.00 | C`
        break;
      case (data < 60):
        data = `3.00 | B`
        break;
      case (data < 70):
        data = `3.50 | A-`
        break;
      case (data < 80):
        data = `4.00 | A`
        break;
      default:
        data = `5.00 | A+`
        break;
    }
    return data
  }

  calculateCGPA(item) {
    let subArr = Object.keys(this.state.payload);
    let cgpa = 0
    for (let index = 0; index < subArr.length; index++) {
      const data = subArr[index];
      let marking = parseInt(data.replace(/[^\d]/g, ''), 10) || 100
      let percentMark = (item[data] * 100) / marking

      if (percentMark < 33) {
        cgpa = 0;
        break
      } else if (percentMark < 40)
        cgpa += 1.00
      else if (percentMark < 50)
        cgpa += 2.00
      else if (percentMark < 60)
        cgpa += 3.00
      else if (percentMark < 70)
        cgpa += 3.50
      else if (percentMark < 80)
        cgpa += 4.00
      else
        cgpa += 5.00
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
      this.state.instituteName
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
    this.setState({
      payload,
      isBtnDis: false
    })
  }

  setName = (e) => {
    this.setState({
      instituteName: e.target.value
    })
  }

  render() {
    return (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", background: "#ededed", minHeight: "100vh", flexDirection: "column" }}>
        <div style={{ padding: "20px" }}>
          <FileInput getData={this.getData} ref={(r) => { this.fileInputRef = r }} />
        </div>

        {this.state.tableHeadersArr.length > 0 && (
          <div>
            <div>
              Choose columns which you want for calculate grade:
            </div>
            < TextField
              onChange={this.setName}
              label={"Enter Institute Name"}
              value={this.state.instituteName}
              required variant="outlined"
              style={{ margin: "20px 0px" }}
            />

            <FormGroup row>
              {this.state.tableHeadersArr.map((item, i) => {
                return (
                  <FormControlLabel
                    control={<Checkbox checked={this.state.payload.item} onChange={this.handleChange} name={item} />}
                    label={item}
                    key={i}
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
      </div>
    );
  }
}

export default App;
