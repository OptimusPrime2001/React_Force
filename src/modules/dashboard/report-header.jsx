import React, { useState } from 'react'
import { UrlCollection } from '../../common/url-collection';
import history from '../../common/history';
import { useLocation } from 'react-router-dom';
import { useMediaQuery } from "react-responsive";
import { MuiPickersUtilsProvider, KeyboardDatePicker } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import DateRangeIcon from "@material-ui/icons/DateRange";
import dateformat from "dateformat";
import { TextField } from "@material-ui/core";
import { getUserInfo } from "../../utils/configuration";

const formatDateParams = (input) => {
    const [month, day, year] = input.split('-');
    const formattedDate = new Date(`${year}-${month}-${day}T00:00:00Z`)

    const options = {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        timeZoneName: 'short',
        timeZone: 'Asia/Bangkok', // Chọn múi giờ cho Đông Dương
    };
    return formattedDate.toLocaleString('en-US', options);
}

const ReportHeader = (props) => {
    const { title } = props;
    const user = getUserInfo();
    const isAdmin = user.userRole == "ADMIN"
    const currentLocation = useLocation();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const date = new Date();
    const today = new Date(
        date.getUTCFullYear(),
        date.getUTCMonth(),
        date.getDate(),
        date.getHours(),
        date.getMinutes(),
        0,
        0
    );

    const isDesktopOrLaptop = useMediaQuery({
        query: "(min-width: 1224px)",
    });

    const fromDateDefault = queryParams.get('fromDate') ?
        formatDateParams(queryParams.get('fromDate')) :
        today;
    const toDateDefault = queryParams.get('toDate') ?
        formatDateParams(queryParams.get('toDate')) :
        today;

    const [isfromTo, setIsFromTo] = useState(queryParams.get('isfromTo'));
    const [validationError, setValidationError] = useState('');
    const [fromDate, setFromDate] = useState(fromDateDefault);
    const [toDate, setToDate] = useState(toDateDefault);

    const listReport = [
        {
            id: 1,
            name: 'Xếp hạng nhân viên',
            url: UrlCollection.TopUser,
            selected: UrlCollection.TopUser == currentLocation.pathname,
        },
        {
            id: 2,
            name: 'Báo cáo của tôi',
            url: UrlCollection.MyReport,
            selected: UrlCollection.MyReport == currentLocation.pathname,
        },
        {
            id: isAdmin ? 3 : 0,
            name: 'Báo cáo tổng',
            url: UrlCollection.AllReport,
            selected: UrlCollection.AllReport == currentLocation.pathname,
        },
    ]

    const listFilter = [
        {
            name: '7 ngày qua',
            value: 'isWeek',
            selected: queryParams.get('isWeek')
        },
        {
            name: '30 ngày qua',
            value: 'isMonth',
            selected: queryParams.get('isMonth')
        },
        {
            name: '1 năm qua',
            value: 'isYear',
            selected: queryParams.get('isYear')
        },
        {
            name: 'Tùy chọn',
            value: 'isfromTo',
            selected: queryParams.get('isfromTo')
        },
    ]

    const pushParams = () => {
        history.push({
            search: queryParams.toString(),
        })
    }

    const refeshParams = () => {
        queryParams.delete('isWeek')
        queryParams.delete('isYear')
        queryParams.delete('isMonth')
        queryParams.delete('isfromTo')
        queryParams.delete('fromDate')
        queryParams.delete('toDate')
    }

    const handleChangeFilter = (value) => {
        if (value == 'isfromTo') {
            setIsFromTo(true);
        } else {
            setIsFromTo(false);
            refeshParams();
            queryParams.set(value, true)
            pushParams();
        }
    }

    const handleChange = (url) => {
        history.push(url)
    }

    const handleFromDateChange = (date) => {
        setFromDate(date)
        if (isDateRangeValid(date, toDate)) {
            refeshParams();
            queryParams.set('isfromTo', true)
            queryParams.set('fromDate', dateformat(date, "mm-dd-yyyy"));
            queryParams.set('toDate', dateformat(toDate, "mm-dd-yyyy"));
            pushParams();
        }
    };

    const handleToDateChange = (date) => {
        setToDate(date)
        if (isDateRangeValid(fromDate, date)) {
            refeshParams();
            queryParams.set('isfromTo', true)
            queryParams.set('fromDate', dateformat(fromDate, "mm-dd-yyyy"));
            queryParams.set('toDate', dateformat(date, "mm-dd-yyyy"));
            pushParams();
        }
    };

    const isDateRangeValid = (startDate, endDate) => {
        if (startDate && endDate && startDate > endDate) {
            setValidationError('Ngày bắt đầu phải nhỏ hơn hoặc bằng ngày kết thúc');
            return false
        } else {
            setValidationError('');
            return true
        }
    }

    const renderDateFilter = () => (
        <div className='filter_dateft'>
            <div className="">
                <div className="filter_item">
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                            label="Từ ngày"
                            id="fromDate"
                            name="fromDate"
                            onChange={(date) => date && handleFromDateChange(date)}
                            value={fromDate}
                            format="dd/MM/yyyy"
                            fullWidth
                            error={Boolean(validationError)}
                            helperText={validationError}
                            showTodayButton={true}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    variant="standard"
                                    fullWidth
                                    margin="normal"
                                    required
                                    InputProps={{
                                        endAdornment: <DateRangeIcon />,
                                    }}
                                />
                            )}
                        />
                    </MuiPickersUtilsProvider>
                </div>
            </div>
            <div className="">
                <div className="filter_item">
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                            label="Đến ngày"
                            id="toDate"
                            name="toDate"
                            onChange={(date) => date && handleToDateChange(date)}
                            value={toDate}
                            format="dd/MM/yyyy"
                            fullWidth
                            error={Boolean(validationError)}
                            helperText={validationError}
                            showTodayButton={true}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    variant="standard"
                                    fullWidth
                                    margin="normal"
                                    required
                                    InputProps={{
                                        endAdornment: <DateRangeIcon />,
                                    }}
                                />
                            )}
                        />
                    </MuiPickersUtilsProvider>
                </div>
            </div>
        </div>
    );

    return (
        <>
            <div className='report_header'>
                {/* {listReport.find(x => x.url == currentLocation.pathname).name} */}
                {/* <select
                    class="form-select form-select-lg mb-3 mt-3 p-2"
                    aria-label=".form-select-lg example"
                    onChange={e => handleChange(e.target.value)}

                >

                    {listReport.map(item => {
                        if (item.id) return (
                            <option
                                key={item.id}
                                value={item.url}
                                selected={item.selected}
                            >
                                {item.name}
                            </option>
                        )
                    })}
                </select> */}
                {!isDesktopOrLaptop && (
                    <div className='report_header_breadcrumb'>
                        <span className='unactive' onClick={() => history.push(UrlCollection.Report)}>
                            Báo cáo
                        </span>
                        <span>/</span>
                        <span className='active'>{title}</span>
                    </div>
                )}

                <div className='report_filter'>
                    <select
                        class="form-select form-select-lg p-2"
                        aria-label=".form-select-lg example"
                        onChange={e => handleChangeFilter(e.target.value)}

                    >

                        {listFilter.map((item, index) => (
                            <option
                                key={index}
                                value={item.value}
                                selected={item.selected}
                            >
                                {item.name}
                            </option>
                        ))}
                    </select>
                </div>
                {isfromTo && isDesktopOrLaptop && renderDateFilter()}
            </div>
            {isfromTo && !isDesktopOrLaptop && renderDateFilter()}
        </>
    )
}

export default ReportHeader
