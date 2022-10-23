import "date-fns";
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import "../style/dashboard.css";
import { Col, Row, Card, Typography, Divider } from 'antd';
import { queryDate } from "../functions/fullcalendar";
import Icon, { FormOutlined } from '@ant-design/icons';
import badmintonlogo from '../image/badmintonlogo3.png';
import volleyballlogo from '../image/volleyballlogo2.jpg';
import tennislogo from '../image/tennislogo.png';
import LineChart from '../chart/blinechart'


const Dashboard = () => {
    const chartyear = useSelector(state => ({ ...state.chart }))
    const dispatch = useDispatch();
    const { Title } = Typography;
    const [querydate, setquerydate] = useState({
        datestart: "",
        dateend: ""
    });

    const styles = {
        con: {
            padding: '2%',
            backgroundColor: '#cfd2cf',
            width: '100vw',
            height: '100vh'
        }
    }

    const [bookings, setbookings] = useState([]);
    
    const onChangeValues = (temp) => {
        setquerydate({
            ...querydate,
            [temp.target.name]: temp.target.value,
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch({
            type: 'SET',
            payload: {
                cyear: new Date(querydate.datestart).getFullYear()
            }
        })
        queryDate(querydate)
            .then(res => {
                const data = res.data;
                for (let i = 0; i < data.length; i++) {
                    data[i].title = data[i].title
                    data[i].start = data[i].start
                }
                setbookings(data);
            }).catch(err => {
                console.log(err)
            })
    }

    const countSportbookings = (type) => {
        let counter = 0;
        for (let i = 0; i < bookings.length; i++) {
            if (bookings[i].sportType == type) {
                counter = counter + 1;
            }
        }
        return counter
    }

    const months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
    ]

    // const [year, setYear] = useState(this.date.year())
    // const [month, setMonth] = useState(this.date.month())


    // useEffect(() => {

    // })

    return (
        <div style={styles.con}>
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                <Col span={10}>
                    <div>
                        <form onSubmit={handleSubmit}>
                            <label>Start&nbsp;</label>
                            <input type="date" onChange={onChangeValues} name="datestart" />

                            <label>&nbsp;End&nbsp;</label>
                            <input type="date" onChange={onChangeValues} name="dateend" />
                            <span>&nbsp;</span>
                            <button type="submit">Query</button>
                        </form>
                        {/* <Datetime dateformat="M" timeFormat={false} onChange={(date) => setMonth(date.month())} />
            <Datetime dateFormat="YYYY" timeFormat={false} onChange={(date) => setYear(date.year())} />
            <h5>You selected year: {year}</h5>
            <h5>You selected month: {month}</h5> */}
                        <br />
                    </div>
                </Col>
            </Row>
            <Divider></Divider>
            <div>
                {bookings == 0 ? <Title>No entries</Title> :
                    <>
                        <Row gutter={[24, 0]} justify="space-around" align="middle">
                            <div style={{ borderRadius: '25px', display: 'flex', width: '70vw', justifyContent: 'center', backgroundColor: '#f2f2f2' }}>
                                <h1>
                                    {new Date(querydate.datestart).getDate()}&nbsp;
                                    {months[new Date(querydate.datestart).getMonth()]}&nbsp;
                                    {new Date(querydate.datestart).getFullYear()}&nbsp;
                                </h1>
                                <h1>&nbsp;&nbsp;
                                    To&nbsp;&nbsp;&nbsp;
                                </h1>
                                <h1>
                                    {new Date(querydate.dateend).getDate()}&nbsp;
                                    {months[new Date(querydate.dateend).getMonth()]}&nbsp;
                                    {new Date(querydate.dateend).getFullYear()}&nbsp;
                                </h1>
                            </div>
                        </Row>
                        <br />
                        <Row className="rowgap-vbox" gutter={[24, 0]}>
                            <Col
                                xs={24}
                                sm={24}
                                md={12}
                                lg={6}
                                xl={6}
                                className="mb-24"
                            >
                                <Card bordered={false} style={{
                                    borderRadius: "20px",
                                    width: '350px',
                                    height: '175px',
                                    overflow: "hidden"
                                }}>
                                    <div className="number">
                                        <Row align="top" justify="center" gutter={[24, 0]}>
                                            <Col xs={16}>
                                                <Title level={2}>
                                                    ALL Bookings
                                                </Title>
                                                <Title level={3}>
                                                    {bookings.length}
                                                </Title>
                                            </Col>
                                            <Col xs={8}>
                                                <FormOutlined style={{ fontSize: '70px', color: '#303030' }} />
                                            </Col>
                                        </Row>
                                    </div>
                                </Card>
                            </Col>
                            <Col
                                xs={24}
                                sm={24}
                                md={12}
                                lg={6}
                                xl={6}
                                className="mb-24"
                            >
                                <Card bordered={false} style={{
                                    borderRadius: "20px",
                                    width: '350px',
                                    height: '175px',
                                    overflow: "hidden"
                                }} className="criclebox ">
                                    <div className="number">
                                        <Row align="middle" justify="center" gutter={[24, 0]}>
                                            <Col xs={16}>
                                                <Title level={2}>
                                                    Badminton
                                                </Title>
                                                <Title level={3}>
                                                    {countSportbookings('Badminton')}
                                                </Title>
                                            </Col>
                                            <Col xs={8} >
                                                <img src={badmintonlogo} width="110px" height="110px" />
                                            </Col>
                                        </Row>
                                    </div>
                                </Card>
                            </Col>
                            <Col
                                xs={24}
                                sm={24}
                                md={12}
                                lg={6}
                                xl={6}
                                className="mb-24"
                            >
                                <Card bordered={false} style={{
                                    borderRadius: "20px",
                                    width: '350px',
                                    height: '175px',
                                    overflow: "hidden"
                                }} className="criclebox ">
                                    <div className="number">
                                        <Row align="middle" justify="center" gutter={[24, 0]}>
                                            <Col xs={16}>
                                                <Title level={2}>Volleyball</Title>
                                                <Title level={3}>
                                                    {countSportbookings('Volleyball')}
                                                </Title>
                                            </Col>
                                            <Col xs={8}>

                                                <img src={volleyballlogo} width="80px" height="80px" />
                                            </Col>
                                        </Row>
                                    </div>
                                </Card>
                            </Col>
                            <Col
                                xs={24}
                                sm={24}
                                md={12}
                                lg={6}
                                xl={6}
                                className="mb-24"
                            >
                                <Card bordered={false} style={{
                                    borderRadius: "20px",
                                    width: '350px',
                                    height: '175px',
                                    overflow: "hidden"
                                }} className="criclebox ">
                                    <div className="number">
                                        <Row align="middle" justify="center" gutter={[24, 0]}>
                                            <Col xs={16}>
                                                <Title level={2}>Tennis</Title>
                                                <Title level={3}>
                                                    {countSportbookings('Tennis')}
                                                </Title>
                                            </Col>
                                            <Col xs={8}>
                                                <img src={tennislogo} width="80px" height="80px" />
                                            </Col>
                                        </Row>
                                    </div>
                                </Card>
                            </Col>
                        </Row>
                        <br/>
                        <Row gutter={[24, 0]}>
                            <Col xs={24} sm={24} className="mb-24">
                                <Card bordered={false} className="criclebox h-full">
                                    <LineChart/>
                                </Card>
                            </Col>

                        </Row>
                    </>
                }
            </div>
        </div>
    )
}


export default Dashboard;