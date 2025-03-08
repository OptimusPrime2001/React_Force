import React, { useState, useEffect } from "react";
import * as appActions from "../../core/app.store";
import * as cameraAction from "../../redux/store/camera/camera.store";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import ListCamera from "./list-camera";
import Filter from "../../components/filter/filter.view";
import DeleteDialog from "../../components/dialog-delete/dialog-delete.view";
import FooterPagination from "../../components/footer-pagination/pagination";
import { useLocation } from 'react-router-dom';
import history from "../../common/history";
import ShowNotification from "../../components/react-notifications/react-notifications";
import { NotificationMessageType, APIUrlDefault } from "../../utils/configuration";
import * as viVN from "../../language/vi-VN.json";
import CreateUpdateCamera from "./create-update-camera";

//--- Material Icon
import AddCircle from "@material-ui/icons/AddCircle";

const CameraManagement = (props) => {
    const { showLoading } = props;
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);

    const [data, setData] = useState([]);
    const [detailData, setDetailData] = useState();
    const [orderBy, setOrderBy] = useState('modifiedDate');
    const [order, setOrder] = useState('desc');
    const pageIndex = 1;
    const pageSize = 10;
    const [pagination, setPagination] = useState({});
    const [selectedId, setSelectedId] = useState(0);
    //--- Dialog
    const [openAddDialog, setOpenAddDialog] = useState(false);
    const [openEditDialog, setOpenEditDialog] = useState(false);
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

    const getDetail = (id) => {
        cameraAction
            .GetDetailCamera(id)
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
            name: queryParams.get("name"),
        }
    }

    const GetListAll = (params) => {
        showLoading(true);
        cameraAction.GetAll(params).then(res => {
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

    const handleDelete = () => {
        showLoading(true);
        cameraAction.DeleteCamera(selectedId)
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
            <div className="list_btn_header">
                <div className="btn_add" onClick={() => handleOpenAddDialog()}>
                    <span className="">
                        <AddCircle className="mr-1" />
                        Add new
                    </span>
                </div>
            </div>
            <div className="filter mb-3">
                <Filter
                    hasName
                />
            </div>
            <ListCamera
                data={data}
                createSortHandler={createSortHandler}
                order={order}
                orderBy={orderBy}
                deleteAction={handleOpenDeleteDialog}
                editAction={handleOpenEditDialog}
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
                <CreateUpdateCamera
                    isOpen={openAddDialog}
                    onClose={handleCloseAddDialog}
                    refreshData={getData}
                />
            )}
            {openEditDialog && detailData && (
                <CreateUpdateCamera
                    isOpen={openEditDialog}
                    onClose={handleCloseEditDialog}
                    refreshData={getData}
                    dataSelected={detailData}
                    idSelected={selectedId}
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

export default connect(mapStateToProps, mapDispatchToProps)(CameraManagement);