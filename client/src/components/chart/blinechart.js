import React, { useState, useEffect } from 'react'
import ReactApexChart from "react-apexcharts";
import { Typography } from "antd";
import { MinusOutlined } from "@ant-design/icons";
import lineChart from "./blinechart_config.js";
import { chartDate } from "../functions/fullcalendar";
import { useSelector } from 'react-redux'

const LineChart = () => {
    const { Title } = Typography;
    const yearforchart = useSelector(state => ({ ...state.chart }))
    const badmintonNum = [];
    const volleyballnum = [];
    const tennisnum = [];
    const [aya,setaya] = useState();
    const countSportbookings = (type, bookinglist) => {
        let counter = 0;
        for (let i = 0; i < bookinglist.data.length; i++) {
            if (bookinglist.data[i].sportType == type) {
                counter = counter + 1;
            }
        }
        return counter
    }

    const prepareDate = async () => {
        for (let i = 1; i < 13; i++) {
            let stdate = new Date(yearforchart.cyear + "-" + i + "-1")
            let enddate = new Date();
            if (i === 12) {
                enddate = new Date((yearforchart.cyear + 1) + "-" + (1) + "-1")
            } else {
                enddate = new Date(yearforchart.cyear + "-" + (i + 1) + "-1")
            }
            let qdate = { startdate: { stdate }, enddate: { enddate } }
            var cbookings = await chartDate(qdate)
            var countbad = countSportbookings('Badminton', cbookings)
            badmintonNum.push(countbad)
            var countvol = countSportbookings('Volleyball', cbookings)
            volleyballnum.push(countvol)
            var counten = countSportbookings('Tennis', cbookings)
            tennisnum.push(counten)
        }

        var series = [
            {
                name: "Badmintons",
                data: badmintonNum,
                offsetY: 0,
            },
            {
                name: "Volleyball",
                data: volleyballnum,
                offsetY: 0,
            },
            {
                name: "Tennis",
                data: tennisnum,
                offsetY: 0,
            },
        ]
        
        setaya(series)
        console.log(series)
    }
    useEffect(() => {
        prepareDate()
    }, [])

    console.log("This is state aya")
    console.log(aya)
    return (
        <>
            <div className="linechart">
                <div>
                    <Title level={2}>Number of Bookings of {yearforchart.cyear}</Title>
                </div>
                <div className="sales">
                    <ul>
                        <li>{<MinusOutlined style={{ color: 'blue' }} />} Badminton</li>
                        <li>{<MinusOutlined style={{ color: 'green' }} />} Volleyball</li>
                        <li>{<MinusOutlined style={{ color: 'orange' }} />} Tennis</li>
                    </ul>
                </div>
            </div>

            <ReactApexChart
                className="full-width"
                options={lineChart.options}
                series={aya}
                type="area"
                height={350}
                width={"100%"}
            />
        </>
    );
}

export default LineChart;