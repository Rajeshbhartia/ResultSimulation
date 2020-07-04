import React, { Component } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import CreateForm from './CreateForm';
import { Typography } from '@material-ui/core';

const tHead = ["range", "grade", "gpa"]

const rows = [
    { range: "0 - 32", grade: "F", gpa: "0.00" },
    { range: "33 - 39", grade: "D", gpa: "1.00" },
    { range: "40 - 49", grade: "C", gpa: "2.00" },
    { range: "50 - 59", grade: "B", gpa: "3.00" },
    { range: "60 - 69", grade: "A-", gpa: "3.50" },
    { range: "70 - 79", grade: "A", gpa: "4.00" },
    { range: "80 - 100", grade: "A+", gpa: "5.00" },
];


class DefaultGradingTable extends Component {
    render() {
        return (
            <div>
                <Typography variant="h6" component="h2" style={{ marginBottom: 20 }}>
                    Default Grades
                </Typography>
                <TableContainer component={Paper} style={{ width: "auto", marginBottom: 20 }}>
                    <Table aria-label="simple table" style={{ minWidth: "300px" }} size='small'>
                        <TableHead>
                            <TableRow>
                                {tHead.map((item, i) => <TableCell key={i} style={{ textTransform: "capitalize" }}>{item}</TableCell>)}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row, index) => (
                                <TableRow key={index}>
                                    {tHead.map((item, i) => <TableCell component="th" scope="row" key ={i}>{row[item]}</TableCell>)}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

                <CreateForm setFormData={this.props.setFormData} />

            </div>
        );
    }
}

export default DefaultGradingTable;