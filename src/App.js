import React, { Component } from 'react';
import FileInput from './FIleInput';
import PdfGeneratorInterface from "./PdfGeneratorInterface";
import { Button } from '@material-ui/core';

class App extends Component {

  state = {
    tableHeadersArr: [],
    tableRowsArr: [],
    isBtnDis: true
  }

  getData = (data) => {

    data.forEach((item, i) => {
      switch (true) {
        case (item.Marks < 40):
          item.grade = "fail"
          break;
        case (item.Marks < 50):
          item.grade = "D"
          break;
        case (item.Marks < 60):
          item.grade = "C"
          break;
        case (item.Marks < 70):
          item.grade = "B"
          break;
        case (item.Marks < 80):
          item.grade = "A"
          break;
        default:
          item.grade = "A+"
          break;
      }
    })


    this.setState({
      tableHeadersArr: Object.keys(data[0]),
      tableRowsArr: data,
      isBtnDis: false
    })
  }

  generatePDF = () => {
    let pdfInterface = new PdfGeneratorInterface(
      this.state.tableHeadersArr,
      this.state.tableRowsArr,
      "Result"
    );
    pdfInterface.downloadTableAsPDF();
  };

  render() {
    return (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", background: "#ededed", minHeight: "100vh", flexDirection: "column" }}>
        <div style={{ padding: "20px" }}>

          <FileInput getData={this.getData} />
        </div>
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
