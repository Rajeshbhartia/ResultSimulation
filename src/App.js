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
    // console.log(this.state.payload)
    this.setState({
      tableHeadersArr: Object.keys(data[0]),
      tableRowsArr: data,
    })
  }

  generatePDF = () => {

    console.log(this.state.payload)

    // let tableHeadersArr = [...this.state.tableHeadersArr];
    let tableRowsArr = [...this.state.tableRowsArr];

    Object.keys(this.state.payload).forEach((data) => {
      tableRowsArr.forEach((item, index) => {
        switch (true) {
          case (item[data] < 40):
            item["grade" + data] = "fail"
            break;
          case (item[data] < 50):
            item["grade" + data] = "D"
            break;
          case (item[data] < 60):
            item["grade" + data] = "C"
            break;
          case (item[data] < 70):
            item["grade" + data] = "B"
            break;
          case (item[data] < 80):
            item["grade" + data] = "A"
            break;
          default:
            item["grade" + data] = "A+"
            break;
        }
      })
    })

    let pdfInterface = new PdfGeneratorInterface(
      Object.keys(tableRowsArr[0]),
      tableRowsArr,
      "Result"
    );
    pdfInterface.downloadTableAsPDF();
  };

  handleChange = (e) => {
    let payload = { ...this.state.payload }
    payload[e.target.name] = e.target.checked
    this.setState({
      payload,
      isBtnDis: false
    })
  }

  render() {
    return (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", background: "#ededed", minHeight: "100vh", flexDirection: "column" }}>
        <div style={{ padding: "20px" }}>
          <FileInput getData={this.getData} />
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
