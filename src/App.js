import React, { Component } from 'react';
import FileInput from './FIleInput';
import PdfGeneratorInterface from "./PdfGeneratorInterface";
import { Button } from '@material-ui/core';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

class App extends Component {

  state = {
    tableHeadersArr: [],
    tableRowsArr: [],
    isBtnDis: true,
    payload: {}
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
        data = `${data} | 0.00 | fail`
        break;
      case (data < 40):
        data = `${data} | 1.00 | D`
        break;
      case (data < 50):
        data = `${data} | 2.00 | C`
        break;
      case (data < 60):
        data = `${data} | 3.00 | B`
        break;
      case (data < 70):
        data = `${data} | 3.50 | A-`
        break;
      case (data < 80):
        data = `${data} | 4.00 | A`
        break;
      default:
        data = `${data} | 5.00 | A+`
        break;
    }
    return data
  }

  calculateCGPA(item) {
    let subArr = Object.keys(this.state.payload);
    let cgpa = 0
    for (let index = 0; index < subArr.length; index++) {
      const data = subArr[index];
      if (item[data] < 33) {
        cgpa = 0;
        break
      } else if (item[data] < 40)
        cgpa += 1.00
      else if (item[data] < 50)
        cgpa += 2.00
      else if (item[data] < 60)
        cgpa += 3.00
      else if (item[data] < 70)
        cgpa += 3.50
      else if (item[data] < 80)
        cgpa += 4.00
      else
        cgpa += 5.00
    }
    return (cgpa / (subArr.length)).toFixed(2)
  }

  generatePDF = async () => {
    let tableRowsArr = [...this.state.tableRowsArr];
    // calculate grade
    tableRowsArr.forEach((item, index) => {
      let subArr = Object.keys(this.state.payload);
      item.cgpa = this.calculateCGPA(item)
      subArr.forEach((data) => {
        item[data] = this.gradeCalculator(item[data])
      })
    })

    tableRowsArr.sort(function (a, b) { return b.cgpa - a.cgpa });

    tableRowsArr.forEach((item, index) => {
      item.position = index + 1
    })

    let tableHeadersArr =  Object.keys(tableRowsArr[0])
    tableHeadersArr.unshift("cgpa")
    tableHeadersArr.unshift("position")
    tableHeadersArr.splice(-2)
    let pdfInterface = new PdfGeneratorInterface(
      tableHeadersArr,
      tableRowsArr,
      "Result"
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
