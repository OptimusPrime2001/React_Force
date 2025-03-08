/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { DropzoneArea } from 'material-ui-dropzone'
import AutocompleteMui from "../../components/autocomplete-mui/autocomplete-mui";
import { MuiPickersUtilsProvider, KeyboardDateTimePicker } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import DateRangeIcon from "@material-ui/icons/DateRange";
import dateformat from "dateformat";

//--- Action
import * as orderAction from "../../redux/store/order/order.store";
import * as viVN from "../../language/vi-VN.json";
import { getLookupUser } from "../../utils/helper";
import { lookupOrderStatus, lookupStatus } from "../../utils/helper";

//--- Material Control
import {
    DialogActions,
    Button,
    TextField,
    DialogContent,
    DialogTitle,
    Dialog,
    makeStyles,
    Typography,
    IconButton,
} from "@material-ui/core";

//--- Material Icon
import CloseIcon from "@material-ui/icons/Close";
import SaveIcon from "@material-ui/icons/Save";

//--- Notifications
import ShowNotification from "../../components/react-notifications/react-notifications";
import { NotificationMessageType } from "../../utils/configuration";
import * as appActions from "../../core/app.store";
//--- Styles

const useStyles = makeStyles((theme) => ({
    closeButton: {
        position: "absolute",
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
}));

function CreateUpdateOrder(props) {
    const classes = useStyles();

    const {
        isOpen,
        onClose,
        refreshData,
        idSelected,
        dataSelected,
    } = props;

    const [fromDate, setFromDate] = useState(dataSelected?.start ?? null);
    const [toDate, setToDate] = useState(dataSelected?.end ?? null);
    const [validationError, setValidationError] = useState('');
    const [gallery, setGallery] = useState([]);
    const [currentUser, setCurrentUser] = useState({})
    const [userModal, setUserModal] = useState([]);
    const [currentStatus, setCurrentStatus] = useState(lookupStatus.find(x => x.id == dataSelected?.status));
    const [currentOrderStatus, setCurrentOrderStatus] = useState(lookupOrderStatus.find(x => x.id == dataSelected?.orderStatus));

    const { register, handleSubmit, setError, errors, clearErrors, setValue } = useForm({
        mode: "all",
        reValidateMode: "onBlur",
    });

    useEffect(() => {
        getLookupUserModal();
    }, [])

    const getLookupUserModal = () => {
        getLookupUser().then(res => {
            if (res.content && res.content.items.length > 0) {
                setUserModal(res.content.items);
                setCurrentUser(res.content.items.find(x => x.id == dataSelected?.userId))
            }
        })
    }

    const onSubmit = async (data) => {
        if (!data) {
            return;
        }
        console.log('data', data)
        if (dataSelected?.id) data.id = dataSelected.id;
        if (currentUser?.id) data.userId = currentUser.id;
        if (currentStatus?.id) data.status = currentStatus.id;
        if (currentOrderStatus?.id) data.orderStatus = currentOrderStatus.id;
        if (fromDate) data.start = fromDate;
        if (toDate) data.end = toDate;
        try {
            const { content } = await (idSelected ? orderAction.UpdateOrder(data) : orderAction.CreateOrder(data));
            if (content && content.status) {
                ShowNotification(
                    viVN.Success.NewsEditSuccess,
                    NotificationMessageType.Success
                );
                refreshData();
                onClose();
            }
        }
        catch (err) {
            refreshData();
            onClose();
            ShowNotification(
                err.errorMessage,
                NotificationMessageType.Error
            );
        }
    };

    const onChangeCurrentUser = (value) => {
        setCurrentUser(value);
    }

    const onChangeCurrentStatus = (value) => {
        setCurrentStatus(value);
    }

    const onChangeCurrentOrderStatus = (value) => {
        setCurrentOrderStatus(value);
    }

    const handleFromDateChange = (date) => {
        setFromDate(date)
        console.log('todate', toDate)
        if (isDateRangeValid(date, toDate)) {
            // queryParams.set('fromDate', dateformat(date, "dd-mm-yyyy"));
            // queryParams.set('toDate', dateformat(toDate, "dd-mm-yyyy"));
            // pushParams();
        }
    };

    const handleToDateChange = (date) => {
        setToDate(date)
        if (isDateRangeValid(fromDate, date)) {
            // queryParams.set('fromDate', dateformat(fromDate, "dd-mm-yyyy"));
            // queryParams.set('toDate', dateformat(date, "dd-mm-yyyy"));
            // pushParams();
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

    return (
        <div>
            <Dialog open={isOpen} onClose={onClose} fullWidth={true} maxWidth="md">
                <DialogTitle disableTypography className="border-bottom">
                    <Typography variant="h6">{idSelected ? 'Chỉnh sửa' : 'Thêm mới'}</Typography>
                    <IconButton
                        aria-label="close"
                        className={classes.closeButton}
                        onClick={onClose}
                    >
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>

                <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
                    {true && (
                        <DialogContent className="pt-4 pb-2">
                            <div className="form-group">
                                <div className="row">
                                    <div className="col-md-6">
                                        <label className="text-dark">
                                            Code<span className="required"></span>
                                        </label>
                                        <TextField
                                            // disabled={dataSelected?.code}
                                            variant="outlined"
                                            inputRef={register({ required: true, maxLength: 150 })}
                                            name="code"
                                            error={errors.code && errors.code.type === "required"}
                                            fullWidth
                                            type="text"
                                            className="form-control"
                                            inputProps={{ maxLength: 150 }}
                                            defaultValue={dataSelected?.code}
                                            onChange={(e) =>
                                                setValue("code", e.target.value)
                                            }
                                        />
                                        {errors.code && errors.code.type === "required" && (
                                            <span className="error">Trường này là bắt buộc</span>
                                        )}
                                        {errors.code && errors.code.type === "maxLength" && (
                                            <span className="error">Trường này không quá 150 ký tự</span>
                                        )}
                                    </div>
                                    <div className="col-md-6">
                                        <label className="text-dark">
                                            Nhân viên
                                        </label>
                                        <AutocompleteMui
                                            name="userId"
                                            listData={userModal}
                                            handleChange={onChangeCurrentUser}
                                            value={currentUser}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="filter_item">
                                            <label className="text-dark">
                                                Từ ngày<span className="required"></span>
                                            </label>
                                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                                <KeyboardDateTimePicker

                                                    id="fromDate"
                                                    name="fromDate"
                                                    onChange={(date) => date && handleFromDateChange(date)}
                                                    value={fromDate}
                                                    format="dd/MM/yyyy - HH:mm:ss"
                                                    fullWidth
                                                    error={Boolean(validationError)}
                                                    helperText={validationError}
                                                    showTodayButton={true}
                                                    renderInput={(params) => (
                                                        <TextField
                                                            {...params}
                                                            variant="outlined"
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
                                    <div className="col-md-6">
                                        <div className="filter_item">
                                            <label className="text-dark">
                                                Đến ngày<span className="required"></span>
                                            </label>
                                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                                <KeyboardDateTimePicker

                                                    id="toDate"
                                                    name="toDate"
                                                    onChange={(date) => date && handleToDateChange(date)}
                                                    value={toDate}
                                                    format="dd/MM/yyyy - HH:mm:ss"
                                                    fullWidth
                                                    error={Boolean(validationError)}
                                                    helperText={validationError}
                                                    showTodayButton={true}
                                                    renderInput={(params) => (
                                                        <TextField
                                                            {...params}
                                                            variant="outlined"
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

                                    <div className="col-md-6">
                                        <label className="text-dark">
                                            Trạng thái
                                        </label>
                                        <AutocompleteMui
                                            name="status"
                                            listData={lookupStatus}
                                            handleChange={onChangeCurrentStatus}
                                            value={currentStatus}
                                        />
                                    </div>

                                    <div className="col-md-6">
                                        <label className="text-dark">
                                            Trạng thái đơn hàng
                                        </label>
                                        <AutocompleteMui
                                            name="orderStatus"
                                            listData={lookupOrderStatus}
                                            handleChange={onChangeCurrentOrderStatus}
                                            value={currentOrderStatus}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="form-group">

                            </div>
                            <div className="form-group">
                                <label className="text-dark">
                                    Ghi chú
                                </label>
                                <textarea
                                    name="note"
                                    rows="5"
                                    ref={register({ maxLength: 500 })}
                                    className={
                                        "form-control" +
                                        (errors.note && errors.note.type === "required"
                                            ? " is-invalid"
                                            : "")
                                    }
                                    maxLength="500"
                                    defaultValue={dataSelected?.note}
                                ></textarea>
                                {/* {errors.note && errors.note.type === "required" && (
                                    <span className="error">Trường này là bắt buộc</span>
                                )}
                                {errors.note && errors.note.type === "maxLength" && (
                                    <span className="error">Trường này không quá 500 ký tự</span>
                                )} */}

                            </div>
                            {/* <div className="form-group">
                                <div className="row">
                                    <div className="col-12">
                                        <label className="text-dark fw-6">
                                            Ảnh avatar
                                        </label>
                                        <DropzoneArea
                                            filesLimit={1}
                                            acceptedFiles={['image/*']}
                                            maxFileSize={500000000}
                                            onChange={(files) => setGallery(files)}
                                            showFileNames={true}
                                            initialFiles={[dataSelected?.documentPath]}
                                        />
                                    </div>
                                </div>
                            </div> */}

                        </DialogContent>
                    )}

                    <DialogActions className="border-top">
                        <Button
                            type="button"
                            onClick={onClose}
                            variant="contained"
                            startIcon={<CloseIcon />}
                        >
                            Hủy
                        </Button>
                        <Button
                            type="submit"
                            color="primary"
                            variant="contained"
                            startIcon={<SaveIcon />}
                        >
                            Lưu
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        </div>
    );
}
const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            showLoading: appActions.ShowLoading,
        },
        dispatch
    );

export default connect(null, mapDispatchToProps)(CreateUpdateOrder);
