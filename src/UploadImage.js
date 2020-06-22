import React, { Component } from 'react';
import { Typography, Button } from '@material-ui/core';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';

class UploadImage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            file: {},
            imageUrl: null
        }
    }

    handleChange = (e) => {
        this.setState({
            file:e.target.files[0]
        })
        this.getBase64(e.target.files[0], (result) => {
            this.props.setData(this.props.id, result.toString())
        });
    };

    getBase64 = (file, cb) => {
		let reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = function () {
			cb(reader.result)
		};
		reader.onerror = function (error) {
			console.log('Error: ', error);
		};
	}

    render() {
        return (
            <div style={{ paddingBottom: "30px" }} >
                <div style={{ display: 'flex', alignItems: 'center',justifyContent:"space-between" }}>
                    <input
                        style={{ display: 'none' }}
                        type="file"
                        className="form-control"
                        id={this.props.id}
                        onChange={this.handleChange} />
                    <Typography style={{ paddingRight: "16px" }} variant="body1" color="initial">{this.props.label}</Typography>
                    <label htmlFor={this.props.id} >
                        <Button variant="contained" color="default" component="span" startIcon={<CloudUploadIcon />}>Upload</Button>
                    </label>
                </div>
                <Typography style={{ float:"right"}} variant="body2" color="initial">{this.state.file.name ? this.state.file.name : ""}</Typography>
            </div>
        );
    }
}

export default UploadImage;