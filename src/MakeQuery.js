import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { CircularProgress } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Axios from "axios";
import ErrorIcon from '@material-ui/icons/Error';

let url = "https://afternoon-depths-64658.herokuapp.com/api/v1/"

const useStyles = theme => ({
    //styles for showing loading icon start
    loaderCircle: {
        display: 'flex',
        '& > * + *': {
            marginLeft: theme.spacing(2),
        },
    }
    , loaderContainer: {
        position: "fixed",
        zIndex: 1,
        left: 0,
        top: 0,
        width: "100%",
        height: "100%",
        overflow: "auto",
        backgroundColor: "rgba(0, 0, 0, 0.1)"
    }
    , loaderWrapper: {
        display: "flex",
        height: "100%",
        justifyContent: "center",
        flexDirection: "column"
    }
    , loader: {
        display: "flex",
        justifyContent: "center",
        flexDirection: "row"
    },

    //styles for showing printQstatus
    root: {
        display: 'flex',
        alignItems: 'center',
        marginTop: "40px",
        textTransform: "capitalize"
    },
    icon: {
        paddingRight: theme.spacing(1)
    }
});

class MakeQuery extends Component {

    state = {
        showLoadingIcon: false,
        errorMessage: null,

    }

    showLoader = () => {
        this.setState({
            showLoadingIcon: true
        });
    }

    hideLoader = () => {
        this.setState({
            showLoadingIcon: false
        });
    }

    setMessage = errorMessage => {
        let msg = errorMessage
        this.setState({ errorMessage: msg });
    }

    async makeQuery(object, requestType, args, cb) {
        try {
            console.log(object, args)
            this.showLoader()
            let resp = await Axios[requestType](`${url}${object}`, args)
            this.hideLoader()
            cb(resp.data)
        } catch (resp) {
            this.hideLoader()
            this.setMessage("Something went wrong")
        }
    }

    render() {
        const { classes } = this.props;
        return (
            <div>
                {this.state.showLoadingIcon && (<div className={classes.loaderContainer}>
                    <div className={classes.loaderWrapper}>
                        <div className={classes.loader}>
                            <div className={classes.loaderCircle}>
                                <CircularProgress
                                    size={100}
                                    thickness={4}
                                />
                            </div>
                        </div>
                    </div>
                </div>)}
                {this.state.errorMessage && (<Typography variant="body2" color="error" className={classes.root}>
                    <ErrorIcon className={classes.icon} />
                    {this.state.errorMessage}
                </Typography>)}
            </div>
        );
    }
}

export default withStyles(useStyles)(MakeQuery);