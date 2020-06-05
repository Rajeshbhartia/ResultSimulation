import React, { Component } from 'react';
import XLSX from 'xlsx';
import { make_cols } from './MakeColumns';
import { Typography, Button } from '@material-ui/core';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';

class FileInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            file: {},
            data: [],
            cols: [],
            fileValue: ""
        }
        this.handleFile = this.handleFile.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    refresh() {
        this.setState({
            file: {},
            data: [],
            cols: [],
            fileValue: ""
        })
    }

    handleChange(e) {
        const files = e.target.files;
        if (files && files[0]) this.setState({ file: files[0], fileValue: e.target.value },()=>{
            this.handleFile()
        });
    };

    handleFile() {
        /* Boilerplate to set up FileReader */
        const reader = new FileReader();
        const rABS = !!reader.readAsBinaryString;

        reader.onload = (e) => {
            /* Parse data */
            const bstr = e.target.result;
            const wb = XLSX.read(bstr, { type: rABS ? 'binary' : 'array', bookVBA: true });
            /* Get first worksheet */
            const wsname = wb.SheetNames[0];
            const ws = wb.Sheets[wsname];
            /* Convert array of arrays */
            const data = XLSX.utils.sheet_to_json(ws);
            /* Update state */
            this.setState({ data: data, cols: make_cols(ws['!ref']) }, () => {
                this.props.getData(this.state.data)
            });

        };

        if (rABS) {
            reader.readAsBinaryString(this.state.file);
        } else {
            reader.readAsArrayBuffer(this.state.file);
        };
    }

    render() {
        return (
            <div style={{ paddingBottom:"16px" }} >

                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <input
                        style={{ display: 'none' }}
                        type="file"
                        value={this.state.fileValue}
                        className="form-control"
                        id="file"
                        accept={".xls,.xlsx"}
                        onChange={this.handleChange} />
                    <Typography style={{ paddingRight: "16px" }} variant="body1" color="initial">Upload File: </Typography>
                    <label htmlFor={"file"} >
                        <Button variant="contained" color="default" component="span" startIcon={<CloudUploadIcon />}>Upload</Button>
                    </label>
                </div>

                {this.state.file.name && (
                    <>
                        <Typography style={{ paddingRight: "8px" }} variant="body2" color="initial">{this.state.file.name}</Typography>
                        {/* <Button  onClick={this.handleFile} variant="contained" color="default" component="span" >Submit</Button> */}
                    </>
                )}
            </div>
        )
    }
}

export default FileInput;