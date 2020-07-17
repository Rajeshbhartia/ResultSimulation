import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Paper, Typography, TextField, Button, Link } from '@material-ui/core';
import AppLogo from "./resource/app_logo.png"
import MakeQuery from './MakeQuery';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

const useStyles = theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        minHeight: "100vh",
        '& > *': {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            margin: "auto",
            width: theme.spacing(50),
            height: "auto",
            padding: "48px 32px",
        },
    },
    "@media (max-width: 599px)": {
        root: {
            '& > *': {
                width: theme.spacing(40),
                padding: "48px 16px",
            },
        }
    },

    input: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
    image: {
        height: 80,
        width: 80
    },
    header: {
        padding: "16px 0px"
    },
    btmWp: {
        display: "flex",
        justifyContent: "space-between",
        paddingTop: 20
    }
})

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

class Signup extends Component {

    state = {
        formData: {},
        isOpenSnackbar: false
    }

    handleSubmit = (e) => {
        e.preventDefault();
        // console.log(this.state.formData)
        this.mqRef.makeQuery('users', "post", this.state.formData, this.onSignupResp)
    }

    onSignupResp = (resp) => {
        // alert("User created successfully, Please go to signin page")
        this.setState({
            isOpenSnackbar: true
        })
    }

    closeSnackbar = () => {
        this.setState({
            isOpenSnackbar: false
        })
    }

    onChange = (e) => {
        // console.log(e.target.name, e.target.value)
        let formData = { ...this.state.formData }
        formData[e.target.name] = e.target.value
        this.setState({
            formData
        })
    }

    render() {
        const { classes } = this.props
        return (
            <div>
                <div className={classes.root}>
                    <Paper elevation={2}>
                        <img src={AppLogo} alt="Karma" className={classes.image} />

                        <Typography component="h4" variant="h4" className={classes.header}>
                            Create Account
                        </Typography>

                        <form onSubmit={this.handleSubmit}>
                            <TextField
                                fullWidth
                                variant="outlined"
                                className={classes.input}
                                name="instituteName"
                                label="Institute name"
                                type="text"
                                onChange={this.onChange}
                                required
                            />
                            <TextField
                                fullWidth
                                variant="outlined"
                                className={classes.input}
                                name="contactNumber"
                                label="Mobile no"
                                type="number"
                                onChange={this.onChange}
                                required
                            />

                            <TextField
                                fullWidth
                                variant="outlined"
                                className={classes.input}
                                name="email"
                                label="Email"
                                type="email"
                                onChange={this.onChange}
                            />

                            <TextField
                                fullWidth
                                variant="outlined"
                                className={classes.input}
                                name="password"
                                label="Password"
                                type="password"
                                required
                                onChange={this.onChange}
                            />

                            <div className={classes.btmWp}>
                                <Link style={{ cursor: "pointer" }} onClick={() => { this.props.switchComp("login") }}> Back to sign in</Link>
                                <div>
                                    <Button variant="contained" type="submit" color="primary"> Submit</Button>
                                </div>
                            </div>
                        </form>
                        <MakeQuery ref={(r) => this.mqRef = r} />

                    </Paper>
                </div>
                <Snackbar open={this.state.isOpenSnackbar} autoHideDuration={6000} onClose={this.closeSnackbar}>
                    <Alert onClose={this.handleClose} severity="success">
                        Successfylly created account
                    </Alert>
                </Snackbar>
            </div>
        );
    }
}

export default withStyles(useStyles)(Signup);