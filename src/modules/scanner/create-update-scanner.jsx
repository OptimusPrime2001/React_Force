/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { DropzoneArea } from 'material-ui-dropzone'
import AutocompleteMui from "../../components/autocomplete-mui/autocomplete-mui";

//--- Action
import * as scannerAction from "../../redux/store/scanner/scanner.store";
import * as viVN from "../../language/vi-VN.json";
import { getLookupUser } from "../../utils/helper";

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

function CreateUpdateScanner(props) {
    const classes = useStyles();

    const {
        isOpen,
        onClose,
        refreshData,
        idSelected,
        dataSelected,
    } = props;

    const [gallery, setGallery] = useState([]);
    const [currentUser, setCurrentUser] = useState({})
    const [userModal, setUserModal] = useState([]);

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
                setCurrentUser(res.content.items.find(x => x.id == dataSelected?.currentUserId))
            }
        })
    }

    const onSubmit = async (data) => {
        if (!data) {
            return;
        }
        console.log('data', data)
        if (dataSelected?.id) data.id = dataSelected.id;
        if(currentUser?.id) data.currentUserId = currentUser.id
        try {
            const { content } = await (idSelected ? scannerAction.UpdateScanner(data) : scannerAction.CreateScanner(data));
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
                                <div className="row mb-4">
                                    <div className="col-md-6">
                                        <label className="text-dark">
                                            Tên<span className="required"></span>
                                        </label>
                                        <TextField
                                            variant="outlined"
                                            inputRef={register({ required: true, maxLength: 150 })}
                                            name="name"
                                            error={errors.name && errors.name.type === "required"}
                                            fullWidth
                                            type="text"
                                            className="form-control"
                                            inputProps={{ maxLength: 150 }}
                                            defaultValue={dataSelected?.name}
                                            onChange={(e) =>
                                                setValue("name", e.target.value)
                                            }
                                        />
                                        {errors.name && errors.name.type === "required" && (
                                            <span className="error">Trường này là bắt buộc</span>
                                        )}
                                        {errors.name && errors.name.type === "maxLength" && (
                                            <span className="error">Trường này không quá 150 ký tự</span>
                                        )}
                                    </div>
                                    <div className="col-md-6">
                                        <label className="text-dark">
                                            Code<span className="required"></span>
                                        </label>
                                        <TextField
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
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="row">
                                    <div className="col-md-6">
                                        <label className="text-dark">
                                            Người đang sử dụng
                                        </label>
                                        <AutocompleteMui
                                            name="currentUserId"
                                            listData={userModal}
                                            handleChange={onChangeCurrentUser}
                                            value={currentUser}
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="text-dark">
                                            Ảnh
                                        </label>
                                        <TextField
                                            variant="outlined"
                                            inputRef={register({ maxLength: 150 })}
                                            name="image"
                                            error={errors.image && errors.image.type === "required"}
                                            fullWidth
                                            type="text"
                                            className="form-control"
                                            inputProps={{ maxLength: 150 }}
                                            defaultValue={dataSelected?.image}
                                            onChange={(e) =>
                                                setValue("image", e.target.value)
                                            }
                                        />
                                        {/* {errors.image && errors.image.type === "required" && (
                                            <span className="error">Trường này là bắt buộc</span>
                                        )}
                                        {errors.image && errors.image.type === "maxLength" && (
                                            <span className="error">Trường này không quá 150 ký tự</span>
                                        )} */}
                                    </div>
                                </div>
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

export default connect(null, mapDispatchToProps)(CreateUpdateScanner);
