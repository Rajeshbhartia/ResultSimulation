import jsPDF from "jspdf";
import "jspdf-autotable";

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