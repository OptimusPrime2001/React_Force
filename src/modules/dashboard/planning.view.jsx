import React, { useCallback, useEffect } from "react";
import Highcharts from 'highcharts';
import HighchartsReact from "highcharts-react-official";
import { CircularProgress } from "@material-ui/core";
import dateformat from "dateformat";

const statementStatus = {
  old: 'Quy hoạch cũ',
  publish: 'Đã công bố',
  unPublish: 'Không công bố'
}
const planningStatus = {
  approved: 'Đã phê duyệt',
  unApproved: 'Chưa phê duyệt'
}

const Planning = React.memo((props) => {
  const { data, isTopUser } = props;

  const renderOptions = useCallback((data) => {

    const categories = data.flatMap((x) => x.user);
    const oldData = data.flatMap((x) => x.success)
    const publishData = data.flatMap((x) => x.fail)
    // const unPublishData = data.flatMap((x) => x.statementStatus.unPublish)
    // const approvedData = data.flatMap((x) => x.planningStatus.approved)
    // const unApprovedData = data.flatMap((x) => x.planningStatus.unApproved)

    const dataSeries = isTopUser ? [
      {
        name: 'Hoàn thành',
        data: oldData
      },
      {
        name: statementStatus.publish,
        data: publishData
      },
      // {
      //   name: statementStatus.unPublish,
      //   data: unPublishData
      // }
    ] : [
      // {
      //   name: planningStatus.approved,
      //   data: approvedData
      // },
      // {
      //   name: planningStatus.unApproved,
      //   data: unApprovedData
      // }
    ]
    const chartOptions = {
      chart: {
        type: 'column'
      },
      title: false,
      xAxis: {
        categories,
      },

      yAxis: {
        min: 0,
        title: false,
        stackLabels: {
          enabled: true,
          style: {
            fontWeight: 'bold',
            color: ( // theme
              Highcharts.defaultOptions.title.style &&
              Highcharts.defaultOptions.title.style.color
            ) || 'gray',
            textOutline: 'none'
          }
        }
      },
      tooltip: {
        headerFormat: '<b>{point.x}</b><br/>',
        pointFormat: '{series.name}: {point.y}<br/>Tổng: {point.stackTotal}'
      },
      plotOptions: {
        column: {
          stacking: 'normal',
          dataLabels: {
            enabled: true
          }
        }
      },
      series: dataSeries
    }
    return chartOptions;
  }, [isTopUser]);
  useEffect(() => {console.log('data',data)},[data])
  return (
    <div className="wrap__planning text-center">
      <h6 className="font-weight-bold">{isTopUser ? 'Xếp hạng nhân viên' : 'Báo cáo của tôi'}</h6>
      {data && data.length > 0 ?
        <div class="row w-100" style={{ overflowX: 'scroll'}}>
          <div class="col" style={{minWidth: '800px', overflowX: 'scroll'}}>
            <HighchartsReact highcharts={Highcharts} options={renderOptions(data)} />
          </div>
        </div>
        :
        <CircularProgress disableShrink />
      }
    </div>
  )
})

export default Planning;

