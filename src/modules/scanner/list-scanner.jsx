import React from "react";
import * as apiConfig from "./../../api/api-config";

//--- Material Icon
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import QrCodeScannerIcon from '@material-ui/icons/CropFree';

//--- Material Control
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@material-ui/core";
import TableSortLabel from '@material-ui/core/TableSortLabel';
import dateformat from "dateformat";
import { makeStyles } from "@material-ui/core/styles";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";

const useStyles = makeStyles((theme) => ({
    root: {
        width: "100%",
    },
    paper: {
        width: "100%",
        marginBottom: theme.spacing(2),
    },
    tableContainer: {
        maxHeight: window.outerHeight - 365,
    },
    table: {
        minWidth: 750,
    },
    visuallyHidden: {
        border: 0,
        clip: "rect(0 0 0 0)",
        height: 1,
        margin: -1,
        overflow: "hidden",
        padding: 0,
        position: "absolute",
        top: 20,
        width: 1,
    },
    appBar: {
        position: "relative",
        backgroundColor: "#00923F",
    },
    title: {
        marginLeft: theme.spacing(0),
        flex: 1,
    },
    button: {
        marginRight: theme.spacing(1),
    },
    instructions: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
    closeButton: {
        position: "absolute",
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
}));

const listTableCell = [
    // { id: 'avatar', hideSortIcon: true, isSort: false, label: 'Avatar', width: '' },
    { id: 'name', hideSortIcon: true, isSort: false, label: 'Tên', width: '' },
    { id: 'qrcode', hideSortIcon: true, isSort: false, label: 'Qr code', width: '' },
    { id: 'note', hideSortIcon: true, isSort: false, label: 'Ghi chú', width: '' },
    { id: 'currentUserName', hideSortIcon: true, isSort: false, label: 'Người đang sử dụng', width: '' },
    { id: 'modified_by', hideSortIcon: true, isSort: false, label: 'Người sửa', width: '' },
    { id: 'modified_date', hideSortIcon: false, isSort: true, label: 'Ngày sửa', width: '' },
    { id: 'action', hideSortIcon: true, isSort: false, label: '', width: '17%' },
]

const ListMoods = (props) => {
    const { data, createSortHandler, orderBy, order, deleteAction, editAction, getQrAction } = props;
    const classes = useStyles();

    return (
        <div>
            <div className="list-booking">
                <div className={classes.root}>
                    <Paper className={classes.paper}>
                        <TableContainer component={Paper}>
                            <Table stickyHeader>
                                <TableHead>
                                    <TableRow>
                                        {listTableCell.map(item => (
                                            <TableCell
                                                key={item.id}
                                                className={
                                                    "pt-3 pb-3 text-nowrap " +
                                                    (item.id === "name" ? "MuiTableCell-freeze header_title" : "")
                                                }
                                            >
                                                <TableSortLabel
                                                    active={orderBy === item.id}
                                                    direction={orderBy === item.id ? order : 'asc'}
                                                    onClick={item.isSort ? createSortHandler(item.id) : null}
                                                    hideSortIcon={item.hideSortIcon}>
                                                    {item.label}
                                                </TableSortLabel>
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {data && data.length > 0 && data.map((item) => {
                                        if (!item.isDelete)
                                            return (
                                                <TableRow hover tabIndex={-1} key={item.id}>
                                                    {/* <TableCell className="cell_img">
                                                        <img src={apiConfig.api + item.documentPath} alt={item.title} />
                                                    </TableCell> */}
                                                    <TableCell className="MuiTableCell-freeze header_title">{item.name}</TableCell>
                                                    <TableCell>
                                                        <Tooltip title="Xem mã QR">
                                                            <IconButton
                                                                aria-label="edit"
                                                                onClick={() => getQrAction(item.id)}
                                                            >
                                                                <QrCodeScannerIcon className='text-primary' />
                                                            </IconButton>
                                                        </Tooltip>
                                                    </TableCell>
                                                    <TableCell>{item.note}</TableCell>
                                                    <TableCell>{`${item.currentUserName ? item.currentUserName : 'Trống'}`}</TableCell>
                                                    <TableCell>{item.modified_by}</TableCell>
                                                    <TableCell>{dateformat(item.modified_date, "dd-mm-yyyy")}</TableCell>

                                                    <TableCell className="d-flex">
                                                        <Tooltip title="Edit">
                                                            <IconButton
                                                                aria-label="edit"
                                                                onClick={() => editAction(item.id)}
                                                            >
                                                                <EditIcon className='text-primary' />
                                                            </IconButton>
                                                        </Tooltip>
                                                        <Tooltip title="Delete">
                                                            <IconButton
                                                                aria-label="delete"
                                                                onClick={() => deleteAction(item.id)}
                                                            >
                                                                <DeleteIcon className="text-danger" />
                                                            </IconButton>
                                                        </Tooltip>
                                                    </TableCell>
                                                </TableRow>
                                            )
                                    })}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Paper>
                </div>
            </div>
        </div>
    )
}

export default ListMoods;