import React, { Component } from 'react';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
// import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
// import useMediaQuery from '@material-ui/core/useMediaQuery';
// import { useTheme } from '@material-ui/core/styles';
import { TextField } from '@material-ui/core';



class CreateForm extends Component {
    state = {
        open: false,
        contentToShowInDialog: "constraintsPage",
        numOfGrade: 1,
        presetForm: []
    }

    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({
            open: false,
            contentToShowInDialog: "constraintsPage",
            numOfGrade: 1,
            presetForm: []
        });
    };

    makeForm = (singleForm) => {
        return singleForm.value.map((item, i) => {
            return (
                <TextField
                    key={i}
                    id={singleForm.id}
                    InputProps={{
                        readOnly: item.readOnly,
                        // inputProps: { max: 100, min: 10 }
                    }}
                    variant="outlined"
                    {...item}
                    style={{ width: "100px", margin: "10px" }}
                ></TextField>
            )
        })
    }

    handleChange = (e) => {
        this.setState({ numOfGrade: e.target.value })
    }

    onSubmitClick = (e) => {
        e.preventDefault()
        const { contentToShowInDialog, numOfGrade } = this.state

        if (contentToShowInDialog === "constraintsPage") {
            let perSectionValue = parseInt(100 / numOfGrade)
            let form = [];
            for (let i = 0; i < numOfGrade; i++) {
                let obj = {}
                obj.id = i.toString();
                obj.value = [
                    { label: "Start", type: "number", name: 'start', disabled: true, onChange: this.onChange, value: (perSectionValue * i) + 1, required: true },
                    { label: "End", type: "number", name: 'end', onChange: this.onChange, value: i === numOfGrade - 1 ? 100 : perSectionValue * (i + 1), disabled: i === numOfGrade - 1 ? true : false, required: true },
                    { label: "Grade", type: "text", name: 'grade', onChange: this.onChange, value: "", required: true },
                    { label: "GPA", type: "number", name: 'gpa', onChange: this.onChange, value: "", required: true }
                ]
                form.push(obj)
            }
            this.setState({
                contentToShowInDialog: "inputField",
                presetForm: form
            })
        } else if (contentToShowInDialog === "inputField") {
            this.props.setFormData(this.state.presetForm)
            this.setState({
                contentToShowInDialog: "resp",
            })
        } else if (contentToShowInDialog === "resp") {
            this.setState({
                open: false,
                contentToShowInDialog: "constraintsPage",
                numOfGrade: 1,
                presetForm: []
            })
        }
    }

    onChange = (e) => {
        let form = [...this.state.presetForm]
        form.forEach((item, i) => {
            console.log(item.id, e.target.id)
            if (item.id === e.target.id) {
                item.value.forEach((sing, index) => {
                    if (sing.name === e.target.name) {
                        if (e.target.name === "end") {
                            sing.value = e.target.value
                            form[i + 1].value[0].value = parseInt(e.target.value) + 1
                        } else
                            sing.value = e.target.value
                    }
                })
            }
        })

        this.setState({
            presetForm: form
        })
    }

    render() {
        const { open, contentToShowInDialog, numOfGrade, presetForm } = this.state
        return (
            <div>
                <Button variant="contained" color="primary" onClick={this.handleClickOpen} style={{ marginBottom: "20px" }}>
                    Create custom Grade
                </Button>

                <Dialog
                    open={open}
                    onClose={this.handleClose}
                    aria-labelledby="responsive-dialog-title"
                >
                    <DialogTitle>{"Make custom grade"}</DialogTitle>

                    <DialogContent>
                        <form onSubmit={this.onSubmitClick}>

                            {contentToShowInDialog === "constraintsPage" && (
                                <TextField
                                    variant="outlined"
                                    label="Set Number of grade"
                                    type="number"
                                    onChange={this.handleChange}
                                    InputProps={{
                                        inputProps: { max: 10, min: 1 }
                                    }}
                                    style={{ width: "300px", margin: "10px" }}
                                    value={numOfGrade}
                                    fullWidth
                                    required
                                ></TextField>
                            )}

                            {contentToShowInDialog === "inputField" && (
                                Object.entries(presetForm).map(([key, value], i) => {
                                    return (<div key={i}>{this.makeForm(value)}</div>)
                                })
                            )}
                            {contentToShowInDialog === "resp" && (
                                <div>
                                    Your custom grade was submitted. Please click the Download Result button to download the result
                                </div>)
                            }
                            <div style={{ display: "flex", justifyContent: "flex-end", padding:"24px 8px 24px 0px"}}>
                                <Button autoFocus onClick={this.handleClose} color="primary" style={{ marginRight: 16 }}>
                                    Cancel
                                </Button>
                                <Button type="submit" color="primary" autoFocus variant="contained" >
                                    Submit
                                </Button>
                            </div>
                        </form>

                    </DialogContent>

                </Dialog>
            </div>
        );
    }
}

export default CreateForm;