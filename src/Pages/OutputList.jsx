import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import axios from 'axios';
import TablePagination from '@mui/material/TablePagination';
import Skeleton from '@mui/material/Skeleton';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        color: "#DCA3FF",
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        color: "white"
    },
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));


const OutputList = ({ open, query, handleClose }) => {

    const [rows, setRows] = useState([]);
    const [fields, setFields] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    useEffect(() => {
        try {
            const getData = async () => {
                const apiResponse = await axios.post("http://localhost:8080/", { query: query })
                setRows(apiResponse.data.message.rows)
                setFields(apiResponse.data.message.fields)
            }
            getData();
        } catch (error) {

        }
    }, [query])

    console.log("resultRowsField", rows, fields)

    return (
        <Dialog
            open={open}
            keepMounted
            onClose={handleClose}
            aria-describedby="alert-dialog-slide-description"
            maxWidth={"lg"}
            PaperProps={{ style: { backgroundColor: '#383838' } }}
        >
            <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                    <div>
                        <Table sx={{ minWidth: 700 }} aria-label="customized table">
                            <TableHead>
                                <TableRow>
                                    {
                                        fields.length !== 0 && fields.map((field, i) => {
                                            return (
                                                <StyledTableCell key={i}>{field.name}</StyledTableCell>
                                            )
                                        })
                                    }
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    rows.length===0&&
                                    Array.from({ length: 10 }, (_, index) => (
                                        <TableRow key={index}>
                                          <TableCell>
                                            <Skeleton style={{ backgroundColor: 'white' }} variant="text" width={30} />
                                          </TableCell>
                                          <TableCell>
                                            <Skeleton style={{ backgroundColor: 'white' }} variant="text" width={100} />
                                          </TableCell>
                                          <TableCell>
                                            <Skeleton style={{ backgroundColor: 'white' }} variant="text" width={80} />
                                          </TableCell>
                                          <TableCell>
                                            <Skeleton style={{ backgroundColor: 'white' }} variant="text" width={50} />
                                          </TableCell>
                                          <TableCell>
                                            <Skeleton style={{ backgroundColor: 'white' }} variant="text" width={80} />
                                          </TableCell>
                                          <TableCell>
                                            <Skeleton style={{ backgroundColor: 'white' }} variant="text" width={60} />
                                          </TableCell>
                                        </TableRow>
                                      ))
                                }
                                {rows &&
                                    rows.length !== 0 &&
                                    rows.map((row, rowIndex) => {
                                        if(rowIndex>=page*rowsPerPage&&rowIndex<page*rowsPerPage+rowsPerPage){
                                        return (
                                            <StyledTableRow key={row.name}>
                                                {
                                                    fields.length !== 0 && fields.map((field, i) => {
                                                        return (
                                                            <StyledTableCell key={i} style={{ color: "white" }} align="right">{row[field.name]}</StyledTableCell>
                                                        )
                                                    })
                                                }
                                            </StyledTableRow>
                                        )}
                                    })}
                            </TableBody>
                        </Table>
                        <TablePagination
                            style={{ color: "white" }}
                            component="div"
                            count={rows.length}
                            page={page}
                            onPageChange={handleChangePage}
                            rowsPerPage={rowsPerPage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    </div>
                </DialogContentText>
            </DialogContent>
        </Dialog>
    )
}

export default OutputList