/**
 * Author: Al-Zami Rahman, last modified: 25-11-2019
 * Description: Class component for generating pdf for crudview
 */

 
import jsPDF from "jspdf";
import "jspdf-autotable";
// const base64Img = "data:image/png;base64,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"

class PDFGeneratorInterface {
    constructor(tableHeaderArr, tableBodyArr,currentActiveObject) {
         this._pdf = this._getJsPdfInstance ()
         this._tableHeaderArr = tableHeaderArr
         this._tableBodyArr = tableBodyArr
         this._currentActiveObject = currentActiveObject
    }

    _getJsPdfInstance = () => {
        return new jsPDF();
    }

    downloadTableAsPDF = () => {
        this._makePDF()
        this._pdf.save("a4.pdf");
    }

    _makePDF = () => {
        this._makeHeaderSection()
        this._makeMetaDataSection()
        this._makeTableDataSection()
    }

    _makeHeaderSection = () => {
        this._pdf.text("Pathshala", 100, 10, "center");
        // this._pdf.addImage(base64Img, "jpg", 73, 5, 8, 8);
    }

    _makeMetaDataSection = () => {
        this._pdf.autoTable({
            startY: 23,
            // theme: "",
            //html: '#printable',
            //head: headRows(),
            // body: [
            //   ["Name :", "Mr.X"],
            //   ["Email :", "valid@gmail.com"],
            //   ["Generate Date :", "12-10-3019"]
            // ],
            headStyles: {
              lineWidth: 0.1,
              lineColor: [0, 0, 0]
            },
            styles: {
              cellWidth: 35,
              cellPadding: 0.7
              //rowHeight :0
            },
            didParseCell: function(table) {
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

    _makeTableDataSection = () => {
        this._pdf.text(this._currentActiveObject, 100, 55, "center");
        this._pdf.autoTable({
          startY: 60,
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
            cellPadding: 0.5,
            fontSize : 9,
            tableWidth: 'wrap',
          },
          didParseCell: function(table) {
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

    _makeHeaderRow = () => {
        let headersObj = this._tableHeaderArr.reduce((obj,headerName,index)=>{
            obj[headerName] = headerName
            return obj
        },{})
        return [headersObj];
    }

    _makeBodyRows = () => {
        let subsetPropNames = new Set(this._tableHeaderArr)
        let body = this._tableBodyArr.map(realObj=>{
            let clonedRealObj = {...realObj}
            let subsetObj = this._pluckSubset(clonedRealObj,subsetPropNames)
            // console.log(subsetObj) 
            return subsetObj
        })
        return body;
    }

    _pluckSubset = (clonedRealObj, subsetPropNames) => {
        let subsetObj = {}
        for(let p of subsetPropNames) {
            subsetObj[p] = clonedRealObj[p]
        }
        return subsetObj
    }
}

export default PDFGeneratorInterface;