import React, { useState } from "react";
import * as apiConfig from "../../api/api-config";

//--- Material Icon
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import VideoIcon from "@material-ui/icons/VideoLibrary";

//--- Material Control
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Checkbox, } from "@material-ui/core";
import TableSortLabel from '@material-ui/core/TableSortLabel';
import dateformat from "dateformat";
import { makeStyles } from "@material-ui/core/styles";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import { lookupOrderStatus, lookupStatus } from "../../utils/helper";
import { UrlCollection } from "../../common/url-collection";
import history from "../../common/history";

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
    { id: 'code', hideSortIcon: true, isSort: false, label: 'Mã đơn', width: '' },
    { id: 'userName', hideSortIcon: true, isSort: false, label: 'Người phụ trách', width: '' },
    { id: 'totalWeight', hideSortIcon: true, isSort: false, label: 'Tổng trọng lượng (gram)', width: '' },
    { id: 'status', hideSortIcon: false, isSort: true, label: 'Trạng thái', width: '' },
    { id: 'orderStatus', hideSortIcon: false, isSort: true, label: 'Trạng thái đơn hàng', width: '' },
    { id: 'start', hideSortIcon: false, isSort: true, label: 'Thời gian bắt đầu', width: '' },
    { id: 'end', hideSortIcon: false, isSort: true, label: 'Thời gian kết thúc', width: '' },
    { id: 'note', hideSortIcon: true, isSort: false, label: 'Xem video', width: '' },
    { id: 'action', hideSortIcon: true, isSort: false, label: '', width: '17%' },
]

const ListMoods = (props) => {
    const { data, createSortHandler, orderBy, order, deleteAction, editAction, handleChangeCheckBox, isAdmin, orderStatusModel } = props;
    const classes = useStyles();

    const getStatus = (id) => {
        return lookupStatus.find(x => x.id == id).name
    }

    const getOrderStatus = (id) => {
        return lookupOrderStatus.find(x => x.id == id).name
    }

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
                                                    (item.id === "code" ? "MuiTableCell-freeze header_title" : "")
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
                                                    <TableCell className="MuiTableCell-freeze">{item?.code}</TableCell>
                                                    <TableCell>{item?.userName}</TableCell>
                                                    <TableCell>{item?.totalWeight}</TableCell>
                                                    <TableCell>{getStatus(item?.status)}</TableCell>
                                                    <TableCell>{getOrderStatus(item?.orderStatus)}</TableCell>
                                                    <TableCell>{dateformat(item?.start, "dd/mm/yyyy - HH:MM:ss", true)}</TableCell>
                                                    <TableCell>{dateformat(item?.end, "dd/mm/yyyy - HH:MM:ss", true)}</TableCell>
                                                    <TableCell>
                                                        <Tooltip title="Xem video">
                                                            <IconButton
                                                                aria-label="edit"
                                                                onClick={() => history.push(`${UrlCollection.OrderVideo}/${item.code}`)}
                                                            >
                                                                <VideoIcon className='text-primary' />
                                                            </IconButton>
                                                        </Tooltip>
                                                    </TableCell>
                                                    {isAdmin && (
                                                        <TableCell className="d-flex">

                                                            <Checkbox
                                                                checked={orderStatusModel.includes(item.id)}
                                                                onChange={() => handleChangeCheckBox(item.id)}
                                                                color="primary"
                                                                inputProps={{ "aria-label": "secondary checkbox" }}
                                                                className="p-0 mt-0 mr-3"
                                                            />

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
                                                    )}
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