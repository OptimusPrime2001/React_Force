import React, { useEffect, useState } from 'react'
import * as dashboardAction from "../../redux/store/dashboard/dashboard.store";
import Planning from './planning.view';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@material-ui/core";
import TableSortLabel from '@material-ui/core/TableSortLabel';
import dateformat from "dateformat";
import { makeStyles } from "@material-ui/core/styles";
import ReportHeader from './report-header';
import { useLocation } from 'react-router-dom';

import './dashboard.scss'

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
    { id: 'date', hideSortIcon: true, isSort: false, label: 'Ngày', width: '' },
    { id: 'success', hideSortIcon: true, isSort: false, label: 'Hoàn thành', width: '' },
    { id: 'fail', hideSortIcon: true, isSort: false, label: 'Lỗi', width: '' },
    { id: 'total', hideSortIcon: true, isSort: false, label: 'Tổng', width: '' },
    { id: 'orderSuccess', hideSortIcon: true, isSort: false, label: 'Đơn hàng thành công', width: '' },
    { id: 'orderFail', hideSortIcon: true, isSort: false, label: 'Đơn hàng không thành công', width: '' },
]

const MyReport = () => {
    const classes = useStyles();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);

    const [data, setData] = useState([])

    const getTopUser = async (params) => {
        try {
            const { content } = await dashboardAction.GetMyReport(params);
            if (content && content.length > 0) {
                setData(content);
            }
            else {
                setData([])
            }
        }
        catch (e) { }
    }

    useEffect(() => {
        getData();
    }, [location.search])

    const getData = () => {
        let params = getParamsFromQuery();
        getTopUser(params);
    }

    const getParamsFromQuery = () => {
        if (!queryParams.size) return {
            isWeek: true,
        }
        else return {
            isWeek: queryParams.get("isWeek"),
            isMonth: queryParams.get("isMonth"),
            isYear: queryParams.get("isYear"),
            isfromTo: queryParams.get("isfromTo"),
            fromDate: queryParams.get("fromDate"),
            toDate: queryParams.get("toDate"),
        }
    }

    return (
        <div className='dashboard_container'>
            <ReportHeader title="Báo cáo của tôi"/>
            {/* <Planning
                data={data}
                isTopUser
            /> */}
            <div className="list_report">
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
                                                    (item.id === "title" ? "MuiTableCell-freeze header_title" : "")
                                                }
                                            >
                                                {item.label}
                                                {/* <TableSortLabel
                                                    active={orderBy === item.id}
                                                    direction={orderBy === item.id ? order : 'asc'}
                                                    onClick={item.isSort ? createSortHandler(item.id) : null}
                                                    hideSortIcon={item.hideSortIcon}
                                                >
                                                    {item.label}
                                                </TableSortLabel> */}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {data && data.length > 0 && data.map((item, index) => {
                                        if (!item.isDelete)
                                            return (
                                                <TableRow hover tabIndex={-1} key={item.id}>
                                                    <TableCell className="MuiTableCell-freeze minw-90">{dateformat(item.date, "dd-mm-yyyy")}</TableCell>
                                                    <TableCell>{item.success}</TableCell>
                                                    <TableCell>{item.fail}</TableCell>
                                                    <TableCell>{item.total}</TableCell>
                                                    <TableCell>{item.orderSuccess}</TableCell>
                                                    <TableCell>{item.orderFail}</TableCell>
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

export default MyReport
