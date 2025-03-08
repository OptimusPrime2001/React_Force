import React, { useState, useEffect } from "react";
import * as appActions from "../../core/app.store";
import * as orderAction from "../../redux/store/order/order.store";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import ListOrder from "./list-order";
import Filter from "../../components/filter/filter.view";
import DeleteDialog from "../../components/dialog-delete/dialog-delete.view";
import FooterPagination from "../../components/footer-pagination/pagination";
import { useLocation } from 'react-router-dom';
import history from "../../common/history";
import ShowNotification from "../../components/react-notifications/react-notifications";
import { NotificationMessageType, APIUrlDefault } from "../../utils/configuration";
import * as viVN from "../../language/vi-VN.json";
import CreateUpdateOrder from "./create-update-order";
import VideoView from "./video-view";
import ImportFile from "./import-file";
//--- Material Icon
import AddCircle from "@material-ui/icons/AddCircle";
import UploadIcon from "@material-ui/icons/CloudUpload";
import { getUserInfo } from "../../utils/configuration";

const OrderManagement = (props) => {
    const { showLoading } = props;
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const user = getUserInfo();
    const isAdmin = user.userRole == "ADMIN"

    const [data, setData] = useState([]);
    const [detailData, setDetailData] = useState();
    const [orderBy, setOrderBy] = useState('modifiedDate');
    const [order, setOrder] = useState('desc');
    const pageIndex = 1;
    const pageSize = 10;
    const [pagination, setPagination] = useState({});
    const [selectedId, setSelectedId] = useState(0);
    const [codeSelected, setCodeSelected] = useState('');
    const [orderStatusModel, setOrderStatusModel] = useState([]);

    //--- Dialog
    const [openAddDialog, setOpenAddDialog] = useState(false);
    const [openEditDialog, setOpenEditDialog] = useState(false);
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [openImportDialog, setOpenImportDialog] = useState(false);

    const getDetail = (id) => {
        orderAction
            .GetDetailOrder(id)
            .then((res) => {
                if (res && res.content) {
                    if (res.content.documentPath && res.content.documentPath != "null")
                        res.content.documentPath = APIUrlDefault;
                    setDetailData(res.content);
                }
            })
            .catch((err) => console.log(err));
    }

    useEffect(() => {
        getData();
    }, [location.search])

    const getData = () => {
        let params = getParamsFromQuery();
        GetListAll(params);
    }

    const getParamsFromQuery = () => {
        return {
            pageSize: queryParams.get("pageSize") || pageSize,
            pageIndex: queryParams.get("pageIndex") || pageIndex,
            sorting: queryParams.get("sorting"),
            code: queryParams.get("code"),
            userId: queryParams.get("userId"),
            fromDate: queryParams.get("fromDate"),
            toDate: queryParams.get("toDate"),
        }
    }

    const GetListAll = (params) => {
        showLoading(true);
        orderAction.GetAll(params).then(res => {
            if (res && res.content) {
                const { items, pageCount, pageIndex, pageSize, totalItemCount } = res.content || {};
                setData(items);
                setPagination({ ...pagination, pageCount, pageIndex, pageSize, totalItemCount });
            }
            showLoading(false);
        }).catch(err => {
            showLoading(false);
            console.log(err);
        })
    }

    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    const onRequestSort = (event, property) => {
        console.log(event, property)
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
        let sort = isAsc ? 'desc' : 'asc';
        let sorting = property + ' ' + sort;
        queryParams.set('sorting', sorting)
        history.push({
            search: queryParams.toString(),
        })
    }

    useEffect(() => { console.log('orderStatusModel', orderStatusModel) }, [orderStatusModel])

    const handleChangeCheckBox = (id) => {
        const isInArray = orderStatusModel.includes(id);
        if (!isInArray) setOrderStatusModel([...orderStatusModel, id]);
        else {
            const newList = orderStatusModel.filter(num => num !== id);
            setOrderStatusModel(newList)
        }
    }

    const handleChangeOrderStatus = (status) => {
        if (orderStatusModel.length == 0) {
            ShowNotification(
                'Chọn đơn hàng trước',
                NotificationMessageType.Warning
            );
            return;
        }
        const formData = new FormData();
        formData.append('OrderStatus', status)
        orderStatusModel.map(item => {
            formData.append('OrderIds', item)
        })
        showLoading(true);
        orderAction.UpdateOrderStatus(formData).then(res => {
            if (res && res.content) {
                setOrderStatusModel([])
                getData();
                ShowNotification(
                    'Cập nhật trạng thái đơn hàng thành công',
                    NotificationMessageType.Success
                );
            }
            showLoading(false);
        }).catch(err => {
            showLoading(false);
            console.log(err);
        })
    }

    const handleOpenAddDialog = () => {
        setOpenAddDialog(true);
    };

    const handleCloseAddDialog = () => {
        setOpenAddDialog(false);
    };

    const handleOpenEditDialog = (id) => {
        setSelectedId(id);
        getDetail(id);
        setOpenEditDialog(true);
    };

    const handleCloseEditDialog = () => {
        setOpenEditDialog(false);
        setDetailData(null);
    };

    const handleOpenDeleteDialog = (id) => {
        setSelectedId(id);
        setOpenDeleteDialog(true);
    };

    const handleCloseDeleteDialog = () => {
        setOpenDeleteDialog(false);
    };

    const handleOpenVideoDialog = (code) => {
        setCodeSelected(code);
        setIsOpen(true);
    };

    const handleCloseVideoDialog = () => {
        setIsOpen(false);
    };


    const handleDelete = () => {
        showLoading(true);
        orderAction.DeleteOrder(selectedId)
            .then(res => {
                if (res) {
                    getData();
                    handleCloseDeleteDialog();
                    ShowNotification(
                        viVN.Success.DeleteSuccess,
                        NotificationMessageType.Success
                    );
                }
                showLoading(false);
            }).catch(err => {
                handleCloseDeleteDialog();
                showLoading(false);
                err &&
                    err.errorType &&
                    ShowNotification(
                        err.errorMessage,
                        NotificationMessageType.Error
                    );
            })

    }


    return (
        <div className="position-relative">
            {isAdmin && (
                <div className="list_btn_header">
                    <div className="btn_add status" onClick={() => handleChangeOrderStatus(0)}>
                        <span className="">
                            {/* <UploadIcon className="mr-1" /> */}
                            Cập nhật đơn hàng không thành công
                        </span>
                    </div>
                    <div className="btn_add status" onClick={() => handleChangeOrderStatus(1)}>
                        <span className="">
                            {/* <UploadIcon className="mr-1" /> */}
                            Cập nhật đơn hàng thành công
                        </span>
                    </div>
                    <div className="btn_add import" onClick={() => setOpenImportDialog(true)}>
                        <span className="">
                            <UploadIcon className="mr-1" />
                            import file
                        </span>
                    </div>
                    <div className="btn_add" onClick={() => handleOpenAddDialog()}>
                        <span className="">
                            <AddCircle className="mr-1" />
                            Add new
                        </span>
                    </div>
                </div>
            )}

            <div className="filter mb-3">
                <Filter
                    isAdmin={isAdmin}
                    hasCode
                    hasUser
                    hasFromToDate
                />
            </div>
            <ListOrder
                data={data}
                createSortHandler={createSortHandler}
                order={order}
                orderBy={orderBy}
                deleteAction={handleOpenDeleteDialog}
                editAction={handleOpenEditDialog}
                viewVideo={handleOpenVideoDialog}
                handleChangeCheckBox={handleChangeCheckBox}
                orderStatusModel={orderStatusModel}
                isAdmin={isAdmin}
            />
            {pagination.totalItemCount && pagination.totalItemCount > 0 ? (
                <FooterPagination
                    showFirstLastButton
                    currentPage={pagination.pageIndex}
                    totalPage={pagination.pageCount}
                    totalItemCount={pagination.totalItemCount}
                    pageLimit={pagination.pageSize}
                />
            ) : (
                ''
            )}
            {openDeleteDialog && (
                <DeleteDialog
                    isOpen={openDeleteDialog}
                    onClose={handleCloseDeleteDialog}
                    onSuccess={handleDelete}
                    header={"Xác nhận xóa"}
                    content={"Bạn có chắc chắn muốn xóa?"}
                />
            )}
            {openAddDialog && (
                <CreateUpdateOrder
                    isOpen={openAddDialog}
                    onClose={handleCloseAddDialog}
                    refreshData={getData}
                />
            )}
            {openEditDialog && detailData && (
                <CreateUpdateOrder
                    isOpen={openEditDialog}
                    onClose={handleCloseEditDialog}
                    refreshData={getData}
                    dataSelected={detailData}
                    idSelected={selectedId}
                />
            )}
            {isOpen && (
                <VideoView
                    codeSelected={codeSelected}
                    isOpen={isOpen}
                    onClose={handleCloseVideoDialog}
                    showLoading={props.showLoading}
                />
            )}
            {openImportDialog && (
                <ImportFile
                    isOpen={openImportDialog}
                    onClose={() => setOpenImportDialog(false)}
                />
            )}

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

export default connect(mapStateToProps, mapDispatchToProps)(OrderManagement);