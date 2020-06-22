import jsPDF from "jspdf";
import "jspdf-autotable";

class PDFGeneratorInterface {
  constructor(tableHeaderArr, tableBodyArr, currentActiveObject, TopHeader, Description, Photo) {
    this._pdf = this._getJsPdfInstance()
    this._tableHeaderArr = tableHeaderArr
    this._tableBodyArr = tableBodyArr
    this._currentActiveObject = currentActiveObject
    this._topHeader = TopHeader
    this._description = Description
    this._photo = Photo
  }

  _getJsPdfInstance = () => {
    return new jsPDF();
  }

  downloadTableAsPDF = () => {
    this._makePDF()
    let d = new Date().toISOString()
    let insName = this._topHeader !== "" ? this._topHeader : "Institute"
    this._pdf.save(`${insName}_result_${d}.pdf`);
  }

  _makePDF = () => {
    this._makeHeaderSection()
    this._makeTableDataSection()
    this._makeSingleDataTable()
  }

  _makeHeaderSection = () => {
    this._pdf.setFontSize(20)
    this._pdf.text(this._topHeader, 100, 10, "center");
    this._pdf.setFontSize(12)
    this._pdf.text(this._description, 100, 15, "center");
  }

  _makeTableDataSection = () => {
    this._pdf.setFontSize(16)
    this._pdf.text(this._currentActiveObject, 100, 40, "center");
    this._pdf.setFontSize(10)
    var width = this._pdf.internal.pageSize.getWidth();
    var height = this._pdf.internal.pageSize.getHeight();

    if (this._photo.upload_logo) {
      this._pdf.addImage(this._photo.upload_logo, '', 15, 5, 20, 20)
    }
    if (this._photo.upload_signature) {
      this._pdf.addImage(this._photo.upload_signature, '', width - 40, height - 20, 30, 10)
    }
    this._pdf.text(new Date().toDateString(), width - 40, height - 5);

    this._pdf.autoTable({
      startY: 45,
      // margin: {top: 10},
      theme: "grid",
      //html: '#printable',
      head: this._makeHeaderRow(),
      body: this._makeBodyRows(),
      headStyles: {
        lineWidth: 0.1,
        lineColor: [0, 0, 0]
      },
      styles: {
        cellPadding: 0.75,
        fontSize: 10,
        tableWidth: 'wrap',
      },
      didParseCell: function (table) {
        if (table.section === "head") {
          table.cell.styles.fillColor = "white";
          table.cell.styles.textColor = "black";
          table.cell.styles.lineColor = "black";
        }
        if (table.section === "body") {
          table.cell.styles.fillColor = "white";
          table.cell.styles.textColor = "black";
          table.cell.styles.lineColor = "black";
        }
      }
    });
  }


  _makeSingleDataTable = () => {
    this._tableBodyArr.forEach((item, i) => {
      this._pdf.addPage();
      // this._pdf.setFontSize(20)
      // this._pdf.text(this._topHeader, 100, 20, "center");
      this._makeHeaderSection()
      // this._pdf.text(new Date().toDateString(), 15, 20);
      var width = this._pdf.internal.pageSize.getWidth();
      var height = this._pdf.internal.pageSize.getHeight();
      
      if (this._photo.upload_logo) {
        this._pdf.addImage(this._photo.upload_logo, '', 15, 10, 20, 20)
      }
      if (this._photo.upload_signature) {
        this._pdf.addImage(this._photo.upload_signature, '', width - 40, height - 25, 30, 10)
      }
      this._pdf.setFontSize(10)
      this._pdf.text(new Date().toDateString(), width - 40, height - 10);

      this._pdf.autoTable({
        startY: 45,
        theme: "grid",
        body: this._makeSingleRes(item),
        styles: {
          cellPadding: 2,
          fontSize: 16,
        },
        didParseCell: function (table) {
          if (table.section === "body") {
            table.cell.styles.fillColor = "white";
            table.cell.styles.textColor = "black";
            table.cell.styles.lineColor = "darkgray";
          }
        }
      });
    })

  }

  _makeSingleRes = (singleRow) => {
    let arr = []
    Object.entries(singleRow).forEach(([key, value]) => {
      let obj = {}
      obj.key = key;
      obj.value = value
      arr.push(obj)
    })
    console.log(arr)
    return arr
  }

  _makeHeaderRow = () => {
    let headersObj = this._tableHeaderArr.reduce((obj, headerName, index) => {
      obj[headerName] = headerName
      return obj
    }, {})
    return [headersObj];
  }

  _makeBodyRows = () => {
    let subsetPropNames = new Set(this._tableHeaderArr)
    let body = this._tableBodyArr.map(realObj => {
      let clonedRealObj = { ...realObj }
      let subsetObj = this._pluckSubset(clonedRealObj, subsetPropNames)
      return subsetObj
    })
    return body;
  }



  _pluckSubset = (clonedRealObj, subsetPropNames) => {
    let subsetObj = {}
    for (let p of subsetPropNames) {
      subsetObj[p] = clonedRealObj[p]
    }
    return subsetObj
  }
}

export default PDFGeneratorInterface;