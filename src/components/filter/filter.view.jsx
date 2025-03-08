import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as appActions from "../../core/app.store";
import { useLocation } from "react-router-dom";
import { TextField, Fab, Tooltip } from "@material-ui/core";
import Autocomplete from "@mui/lab/Autocomplete";
import RefreshIcon from "@material-ui/icons/Refresh";
import exportExcelIcon from "../../assets/icon/excel.svg";
// import exportExcelIcon from "../../../../assets/icon/excel.svg";
import { MuiPickersUtilsProvider, KeyboardDatePicker } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import DateRangeIcon from "@material-ui/icons/DateRange";
import dateformat from "dateformat";
import history from "../../common/history";
import { DomainAdminSide } from "../../utils/configuration";
import { getLookupUser } from "../../utils/helper";

import "./filter.scss";

const formatDateParams = (input) => {
    const [day, month, year] = input.split('-');
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
const Filter = (props) => {
    const { showLoading,
        exportAction,
        hasCode,
        hasName,
        hasPhone,
        hasBed,
        hasService,
        hasBooking,
        hasDone,
        hasFromToDate,
        hasExport,
        hasUser,
        isAdmin,
    } = props;
    const location = useLocation();
    const url = location.pathname;
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

    const fromDateDefault = queryParams.get('fromDate') ?
        formatDateParams(queryParams.get('fromDate')) :
        '';
    const toDateDefault = queryParams.get('toDate') ?
        formatDateParams(queryParams.get('toDate')) :
        '';
    const defaultStatusValue = queryParams.get("status") === 'false' ? 1 : queryParams.get("status") === 'true' ? 2 : 0;

    const [userModel, setUserModel] = useState([]);
    const [listService, setListService] = useState([
        {
            name: 'Bấm huyệt, massage toàn thân',
            id: 1
        },
        {
            name: 'Bấm huyệt, massage 1/2 người',
            id: 2
        },
        {
            name: 'Bấm huyệt bộ phận',
            id: 3
        },
    ])
    const [serviceSelected, setServiceSelected] = useState({ id: 0, name: 'Dịch vụ' });
    const [userSelected, setUserSelected] = useState({ id: queryParams.get('userId') || 0, fullName: 'Người phụ trách' });
    const [fromDate, setFromDate] = useState(fromDateDefault || null);
    const [toDate, setToDate] = useState(toDateDefault || null);
    const [validationError, setValidationError] = useState('');
    const [codeName, setCodeName] = useState(queryParams.get('code'))

    useEffect(() => {
        hasUser && getLookupUserModal();
    }, [])

    const getLookupUserModal = () => {
        getLookupUser().then(res => {
            if (res.content && res.content.items.length > 0) {
                setUserModel(res.content.items);
                queryParams.get('userId') && setUserSelected(res.content.items.find(x => x.id == userSelected?.id))
            }
        })
    }

    const handleChangeCode = (event) => {
        if (event.key === "Enter") {
            const value = event.target.value.trim();
            queryParams.set('code', value);
            pushParams();
        }
    }

    const handleChangeName = (event) => {
        if (event.key === "Enter") {
            const value = event.target.value.trim();
            queryParams.set('name', value);
            pushParams();
        }
    }

    const handleFromDateChange = (date) => {
        setFromDate(date)
        console.log('todate', toDate)
        if (isDateRangeValid(date, toDate)) {
            queryParams.set('fromDate', dateformat(date, "mm-dd-yyyy"));
            queryParams.set('toDate', dateformat(toDate, "mm-dd-yyyy"));
            pushParams();
        }
        else return
    };

    const handleToDateChange = (date) => {
        setToDate(date)
        if (isDateRangeValid(fromDate, date)) {
            queryParams.set('fromDate', dateformat(fromDate, "mm-dd-yyyy"));
            queryParams.set('toDate', dateformat(date, "mm-dd-yyyy"));
            pushParams();
        }
        else return
    };

    const isDateRangeValid = (startDate, endDate) => {
        if (startDate && endDate && startDate < endDate) {
            console.log('startDate', startDate)
            console.log('endDate', endDate)
            setValidationError('');
            return true
        } else {
            console.log('lỗi')
            setValidationError('Ngày bắt đầu phải nhỏ hơn hoặc bằng ngày kết thúc');
            return false
        }
    }

    const handleChangeUser = (data) => {
        setUserSelected(data)
        queryParams.set('userId', data.id);
        pushParams();
    }

    const handleChangeService = (data) => {
        setServiceSelected(data)
        console.log(data)
        queryParams.set('serviceId', data.id);
        pushParams();
    }

    const handleChangeStatus = (value) => {
        const status = parseInt(value);
        switch (status) {
            case 0:
                queryParams.delete('statusId')
                break;
            case 2:
                queryParams.set('statusId', 2)
                break;
            case 3:
                queryParams.set('statusId', 3)
                break;
            default:
                queryParams.delete('statusId')
        }
        pushParams();
    }

    const handleRefresh = () => {
        // window.location.replace(DomainAdminSide + url)
        setCodeName('');
        setUserSelected({ id: 0, fullName: 'Người phụ trách' });
        setFromDate(null);
        setToDate(null);
        setValidationError('');
        history.push({
            pathname: url
        })

    }

    const pushParams = () => {
        history.push({
            search: queryParams.toString(),
        })
    }

    return (
        <div className="filter_wrapper">
            <div className="row">
                {hasCode && (
                    <div className="col-md-2">
                        <div className="filter_item">
                            <TextField
                                fullWidth
                                id="standard-basic"
                                placeholder="Nhập mã"
                                value={codeName}
                                variant="standard"
                                InputProps={{ maxLength: 200 }}
                                onChange={e => setCodeName(e.target.value)}
                                onKeyPress={handleChangeCode}
                            />
                        </div>
                    </div>
                )}
                {hasUser && isAdmin && (
                    <div className="col-md-2">
                        <div className="filter_item" style={{ margin: '2px 0 0' }}>
                            {userModel && userModel.length > 0 && (
                                <Autocomplete
                                    options={userModel}
                                    getOptionLabel={(option) =>
                                        typeof option === "string" ? option : option.fullName
                                    }
                                    value={userSelected}
                                    onChange={(event, newValue) => {
                                        handleChangeUser(newValue);
                                    }}
                                    disableClearable={true}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            name="communeId"
                                            variant="standard"
                                            size="small"
                                        />
                                    )}
                                />
                            )}
                        </div>
                    </div>
                )}
                {hasName && (
                    <div className="col-md-2">
                        <div className="filter_item">
                            <TextField
                                fullWidth
                                id="standard-basic"
                                label="Từ khóa"
                                placeholder="Nhập tên"
                                defaultValue={queryParams.get('search')}
                                type="search"
                                variant="standard"
                                InputProps={{ maxLength: 200 }}
                                onKeyPress={handleChangeName}
                            />
                        </div>
                    </div>
                )}

                {hasPhone && (
                    <div className="col-md-2">
                        <div className="filter_item">
                            <TextField
                                fullWidth
                                id="standard-basic"
                                label="Số điện thoại"
                                defaultValue={queryParams.get('search')}
                                type="search"
                                variant="standard"
                                InputProps={{ maxLength: 200 }}
                                onKeyPress={handleChangeName}
                            />
                        </div>
                    </div>
                )}

                {hasBed && (
                    <div className="col-md-2">
                        <div className="filter_item">
                            <select
                                class="form-select"
                                aria-label="Default select example"
                                onChange={e => handleChangeStatus(e.target.value)}
                                defaultValue={defaultStatusValue}
                            >
                                <option selected value={0}>Loại phòng</option>
                                <option value={3}>Phòng nam</option>
                                <option value={2}>Phòng nữ</option>
                            </select>
                        </div>
                    </div>
                )}

                {hasService && (
                    <div className="col-md-2">
                        <div className="filter_item">
                            {listService && listService.length > 0 && (
                                <Autocomplete
                                    options={listService}
                                    getOptionLabel={(option) =>
                                        typeof option === "string" ? option : option.name
                                    }
                                    value={serviceSelected}
                                    onChange={(event, newValue) => {
                                        handleChangeService(newValue);
                                    }}
                                    disableClearable={true}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            name="communeId"
                                            variant="standard"
                                            size="small"
                                        />
                                    )}
                                />
                            )}
                        </div>
                    </div>
                )}

                {hasBooking && (
                    <div className="col-md-2">
                        <div className="filter_item">
                            <select
                                class="form-select"
                                aria-label="Default select example"
                                onChange={e => handleChangeStatus(e.target.value)}
                                defaultValue={defaultStatusValue}
                            >
                                <option selected value={0}>Xác nhận đặt lịch</option>
                                <option value={3}>Đã xác nhận</option>
                                <option value={2}>Chưa xác nhận</option>
                            </select>
                        </div>
                    </div>
                )}

                {hasDone && (
                    <div className="col-md-2">
                        <div className="filter_item">
                            <select
                                class="form-select"
                                aria-label="Default select example"
                                onChange={e => handleChangeStatus(e.target.value)}
                                defaultValue={defaultStatusValue}
                            >
                                <option selected value={0}>Xác nhận đến khám</option>
                                <option value={3}>Đã đến khám</option>
                                <option value={2}>Chưa đến khám</option>
                            </select>
                        </div>
                    </div>
                )}

                {hasFromToDate && (
                    <>
                        <div className="col-md-2">
                            <div className="filter_item">
                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                    <KeyboardDatePicker
                                        id="fromDate"
                                        name="fromDate"
                                        onChange={(date) => date && handleFromDateChange(date)}
                                        value={fromDate}
                                        format="dd/MM/yyyy"
                                        fullWidth
                                        error={Boolean(validationError)}
                                        helperText={validationError}
                                        showTodayButton={true}
                                        placeholder="Từ ngày"
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                variant="standard"
                                                fullWidth
                                                margin="normal"
                                                InputProps={{
                                                    endAdornment: <DateRangeIcon />,
                                                }}
                                            />
                                        )}
                                    />
                                </MuiPickersUtilsProvider>
                            </div>
                        </div>
                        <div className="col-md-2">
                            <div className="filter_item">
                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                    <KeyboardDatePicker
                                        id="toDate"
                                        name="toDate"
                                        onChange={(date) => date && handleToDateChange(date)}
                                        value={toDate}
                                        format="dd/MM/yyyy"
                                        fullWidth
                                        error={Boolean(validationError)}
                                        helperText={validationError}
                                        showTodayButton={true}
                                        placeholder="Đến ngày"
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                variant="standard"
                                                fullWidth
                                                margin="normal"
                                                InputProps={{
                                                    endAdornment: <DateRangeIcon />,
                                                }}
                                            />
                                        )}
                                    />
                                </MuiPickersUtilsProvider>
                            </div>
                        </div>
                    </>
                )}
                <div className="col-md-2">
                    <div className="export_">
                        <Tooltip title="Làm mới">
                            <Fab
                                color="primary"
                                aria-label="filter"
                                size="small"
                                onClick={handleRefresh}
                                className="mr-3"
                            >
                                <RefreshIcon />
                            </Fab>
                        </Tooltip>
                        {hasExport && (
                            <Tooltip title="Export">
                                <img
                                    src={exportExcelIcon}
                                    alt="Export"
                                    className="cursor-pointer"
                                    onClick={exportAction}
                                    style={{
                                        width: 26,
                                        height: 26,
                                    }}
                                />
                            </Tooltip>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    isLoading: state.app.loading,
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            showLoading: appActions.ShowLoading,
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(Filter);