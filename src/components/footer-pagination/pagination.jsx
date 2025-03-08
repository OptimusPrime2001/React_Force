import React, { useEffect } from "react";
import Pagination from '@mui/lab/Pagination';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { useLocation } from 'react-router-dom';
import history from '../../common/history';

import './style.scss';

const FooterPagination = (props) => {
    const { totalPage, currentPage, totalItemCount, pageLimit = 10 } = props;
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);

    const handleChangeRowsPerPage = (e) => {
        queryParams.set('pageSize', e.target.value)
        history.push({
            search: queryParams.toString(),
        })
    }

    const handleChangePage = (event, value) => {
        queryParams.set('pageIndex', value)
        history.push({
            search: queryParams.toString(),
        })
    };
    return (
        <div className='div-pagination'>
            {totalItemCount && (<div class=""><div>Tổng số bản ghi : <b>{totalItemCount}</b></div></div>)}
            <div className='footer_right'>
                <div className='select-page'>
                    <div>Số hàng mỗi trang:</div>
                    <div className='rowPerPage'>
                        <Select value={pageLimit} onChange={handleChangeRowsPerPage}>
                            <MenuItem value={10}>10</MenuItem>
                            <MenuItem value={20}>20</MenuItem>
                            <MenuItem value={30}>30</MenuItem>
                        </Select>
                    </div>
                </div>

                <Pagination
                    showFirstButton
                    showLastButton
                    page={currentPage}
                    count={totalPage}
                    siblingCount={1}
                    boundaryCount={1}
                    color='primary'
                    onChange={handleChangePage}
                />
            </div>
        </div>
    );
};

export default FooterPagination;
