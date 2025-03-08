import React from 'react'
import { UrlCollection } from '../../common/url-collection'
import history from '../../common/history'
import { getUserInfo } from "../../utils/configuration";

const Report = () => {
    const user = getUserInfo();
    const isAdmin = user.userRole == "ADMIN"

    const listEntry = [
        {
            name: 'Bảng xếp hạng nhân viên',
            description: 'Xếp hạng nhân viên qua số lượng đơn hàng  (hoàn thành hoặc lỗi).',
            url: UrlCollection.TopUser,
            color: '#BB76FF',
        },
        {
            name: 'Báo cáo của tôi',
            description: 'Tổng hợp báo cáo về thời gian, số lượng đơn hàng (hoàn thành hoặc lỗi) của bạn.',
            url: UrlCollection.MyReport,
            color: '#d1c459',
        },
        {
            name: 'Báo lương của tôi',
            description: 'Tổng hợp số lượng đơn hàng dựa theo trọng lượng',
            url: UrlCollection.MySalaryReport,
            color: '#57522F',
        },
        {
            name: 'Báo cáo tổng',
            description: 'Tổng hợp báo cáo về thời gian, số lượng đơn hàng (hoàn thành hoặc lỗi) của tất cả nhân viên.',
            url: UrlCollection.AllReport,
            color: '#5AD364',
            hide: !isAdmin
        },
    ]
    return (
        <div className='report_wraper'>
            {listEntry.map((item, index) => {
                if (!item.hide) return (
                    <div
                        key={index}
                        className='report_entry'
                        style={{ backgroundColor: item.color }}
                        onClick={() => history.push(item.url)}
                    >
                        <h5>{item.name}</h5>
                        <span>{item.description}</span>
                    </div>
                )
            })}
        </div>
    )
}

export default Report
