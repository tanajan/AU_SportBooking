import React, { useState, useEffect } from 'react'

import FullCalendar, { render } from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from "@fullcalendar/interaction" // needed for dayClick

import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Col, Row, Card, Typography, Modal, Radio, message } from 'antd';
import { useSearchParams } from 'react-router-dom';
import { useSelector } from 'react-redux'
import moment from 'moment'

//Functions
import { createEvent, checkUser, handlecurrentMonth, deleteEvent, listEventwithcon } from "../functions/fullcalendar"

import './index.css'

const styles = {
  con: {
      backgroundColor: "#f2f2f2",
      padding: "250px",
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: "100vw",
      height: "60vh"
  }
}

const courtNumBad = [
  {
    label: '1',
    value: 'B1'
  },
  {
    label: '2',
    value: 'B2'
  },
  {
    label: '3',
    value: 'B3'
  },
  {
    label: '4',
    value: 'B4'
  }
]

const courtNumTenVol = [
  {
    label: '1',
    value: 'TV1'
  },
  {
    label: '2',
    value: 'TV2'
  }
]
const Index = ({ user }) => {
  const [searchparams] = useSearchParams();
  const selectedSport = searchparams.get("type");
  const tempuser = useSelector(state => ({ ...state }))
  const { confirm } = Modal;
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalVisible1, setIsModalVisible1] = useState(false);
  const [values, setValues] = useState({
    requester: '',
    par1: '',
    par2: '',
    par3: '',
    par4: '',
    par5: '',
    start: '',
    end: '',
    sportType: '',
    title:'',
    courtNum: ''
  })
  const [bookings, setEvents] = useState([])
  const [currentBooking, setCurrentBooking] = useState([])
  console.log(bookings)
  const [courtNum, setCourtNum] = useState('')
  const onCourtNumChange = ({ target: { value } }) => {
    setCourtNum(value);
    loadData()
  }

  const showConfirm = () => {
    confirm({
      title: 'Do you Want to delete these items?',
      icon: <ExclamationCircleOutlined />,
      content: 'Test',
      onOk() {
        handleDelete()
      },
      onCancel() {
        handleCancel1()
      },
    });
  };


  const [id, setId] = useState('')

  const { Title } = Typography;
  
  const sportType = [
    { id: '1', name: 'Tennis', color: '#B6FFA1' },
    { id: '2', name: 'Volleyball', color: '#C0F0FF' },
  ]

  useEffect(() => {
    loadData()
  }, [courtNum])

  const loadData = () => {
    listEventwithcon({ courtNum })
      .then(res => {
        setValues({ ...values, requester: tempuser.user.user.googleId })
        setEvents(res.data)
      }).catch(err => {
        console.log(err)
      })
  }


  const handleClick = (info) => {
    const id = info.event._def.extendedProps._id
    console.log(id)
    setId(id)
    showModal1()
  }

  const handleDelete = () => {
    deleteEvent(id)
      .then(res => {
        loadData()
        console.log(res)
      }).catch(err => {
        console.log(err)
      })
    setIsModalVisible1(false);
  }

  const handleSelect = (info) => {
    const tday = new Date()
    /*Check Court num*/
    if (courtNum == '') {
      message.error("You need to select Court Number!")
    } else {
      /*Check Saturday*/
      if (tday.getDay() == 6) {
        message.error("Sport Center is closed on Saturday!")
      } else {
        /*Check Available time*/
        if (tday.getHours >= 8 && tday.getHours <= 20) {
          showModal();
          setValues({
            ...values,
            start: info.startStr,
            end: info.endStr,
            sportType: selectedSport,
            title: selectedSport,
            courtNum: courtNum
          })
        } else {
          message.error("Sorry! We are open from 8 AM to 8 PM")
        }
      }
    }
  }
  const handleAdminSelect = (info) => {
    showModal();

    setValues({
      ...values,
      start: info.startStr,
      end: info.endStr,
      sportType: selectedSport,
      title: selectedSport,
      courtNum: courtNum
    })
    console.log(values)
  }

  const currentMonth = (info) => {
    const m = info.view.calendar.currentDataManager.data.currentDate
    const mm = moment(m).format('M')
    handlecurrentMonth({ mm })
      .then(res => {
        console.log(res.data)
        setCurrentBooking(res.data)
      }).catch(err => {
        console.log(err)
      })
  }

  const onChangeValues = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }

  const showModal = () => {
    setIsModalVisible(true);
  };

  const isOverlapped = (info) => {
    var temp_booking = currentBooking;
    for (let i = 0; i < temp_booking.length; i++) {
      const Abooking = temp_booking[i];
      //start-time in between any of the events
      if (info.start > Abooking.start && info.end < Abooking.end) {
        message.error("Time conflicted! Select new booking time!")
        return true;
      }
      //end-time in between any of the events
      if (info.end > Abooking.start && info.end < Abooking.end) {
        message.error("Time conflicted! Select new booking time!")
        return true;
      }
      //any of the events in between/on the start-time and end-time
      if (info.start <= Abooking.start && info.end >= Abooking.end) {
        message.error("Time conflicted! Select new booking time!")
        return true;
      }
    }
    return false;
  }

  const handleOk = async () => {
    if (values.courtNum == "") {
      message.error("Court Number need to be selected!")
      setValues({ ...values, par1: '', par2: '', par3: '', par4: '', par5: '' })
      setIsModalVisible(false);
    } else {
      if (isOverlapped(values)) {
        setValues({ ...values, par1: '', par2: '', par3: '', par4: '', par5: '' })
        setIsModalVisible(false);
      } else {

        var parnum = checkParticipant();
        var bookingperiod = (moment(values.end)).diff(moment(values.start)) / 60000
        if (Math.floor(bookingperiod / 30) > Math.floor(parnum / 2)) {
          message.error("Not enough number of participants!")
        } else {
          var checkuserexistance = await checkUserExist(values)
          if (checkuserexistance) {
            console.log(values)
            createEvent(values)
              .then(res => {
                setValues({ ...values, par1: '', par2: '', par3: '', par4: '', par5: '' })
                loadData()
              }).catch(err =>
                console.log(err))
            setIsModalVisible(false);
          } else {
            message.error("We don't have these users in our system")
          }
        }
      }
    }
  };

  const handleCancel = () => {
    setValues({ ...values, par1: '', par2: '', par3: '', par4: '', par5: '' })
    setIsModalVisible(false);
  };

  const showModal1 = () => {
    setIsModalVisible1(true);
  };

  const handleOk1 = () => {
    // updateEvent(formData)
    // .then(res=>{
    //   console.log(res)
    // }).catch(errr =>{
    //   console.log(err)
    // })
    setIsModalVisible1(false);
  };

  const handleCancel1 = () => {
    setValues({ ...values, par1: '', par2: '', par3: '', par4: '', par5: '' })
    setIsModalVisible1(false);
  };

  const checkUserExist = async (info) => {
    var emaillist = []
    if (info.par1 != '') {
      var strong = '{"email":"' + info.par1 + '@au.edu"}'
      var emailobj = JSON.parse(strong)
      emaillist.push(strong)
    }

    if (info.par2 != '') {
      strong = '{"email":"' + info.par2 + '@au.edu"}'
      emailobj = JSON.parse(strong)
      emaillist.push(strong)
    }

    if (info.par3 != '') {
      strong = '{"email":"' + info.par3 + '@au.edu"}'
      emailobj = JSON.parse(strong)
      emaillist.push(strong)
    }

    if (info.par4 != '') {
      strong = '{"email":"' + info.par4 + '@au.edu"}'
      emailobj = JSON.parse(strong)
      emaillist.push(strong)
    }

    if (info.par5 != '') {
      strong = '{"email":"' + info.par5 + '@au.edu"}'
      emailobj = JSON.parse(strong)
      emaillist.push(strong)
    }
    var i = 0;
    var checkst = []
    for (let i = 0; i < emaillist.length; i++) {
      await checkUser(JSON.parse(emaillist[i]))
        .then(res => {
          const curuser = res.data;
          if (Object.keys(curuser).length === 0) {
            checkst.push(false)
          } else {
          }
        }).catch(err => {
          console.log(err)
        })
    }
    if (checkst.includes(false)) {
      return false
    } else {
      return true
    }
  }

  const checkParticipant = () => {
    var totalpar = 1;
    if (values.par1 != "") {
      totalpar += 1;
    }
    if (values.par2 != "") {
      totalpar += 1;
    }
    if (values.par3 != "") {
      totalpar += 1;
    }
    if (values.par4 != "") {
      totalpar += 1;
    }
    if (values.par5 != "") {
      totalpar += 1;
    }
    return totalpar;
  }

  const d = moment(new Date()).format('DD/MM/YYYY');
  const r = new Date()
  const fil = currentBooking.filter((item) => {
    return d == moment(item.start).format('DD/MM/YYYY')
  })


  return (
    <div className='main-booking' style={styles.con}>
      <Row gutter={{
        xs: 8,
        sm: 16,
        md: 24,
        lg: 32,
      }}>
        {/* <Col span={6}> */}
          {/* <Card>
            {tempuser.user ? <>{tempuser.user.userlv == "ADMIN" ?
              <h2>Current Booking</h2>
              : <><h2>Your Booking</h2></>}</> : <></>} */}
            {/* <div id="external-book">
              <ul>
                {sportType.map((item,index)=> 
                <li 
                    className="normal-book"
                    key={index} 
                    style = {{backgroundColor:item.color}}>
                    {item.name}
                </li>)}
              </ul>
              </div> */}
          {/* </Card> */}
          {/* <Card>
            {tempuser.user ? <>{tempuser.user.userlv == "ADMIN" ?
              <ol>
                {
                  currentBooking.map((item, index) =>
                    <li key={index}>
                      {d == moment(item.start).format('DD/MM/YYYY')
                        ? <>{moment(item.start).format('DD/MM/YYYY') + "-" + item.title + item.courtNum}<Tag color="green">Today</Tag></>
                        : r >= moment(item.start) && r < moment(item.end)
                          ? <>{moment(item.start).format('DD/MM/YYYY') + "-" + item.title + item.courtNum}<Tag color="yellow">On going</Tag></>
                          : <>{moment(item.start).format('DD/MM/YYYY') + "-" + item.title + item.courtNum}</>
                      }
                    </li>)
                }
              </ol>
              : <></>}</> : <></>}
          </Card> */}
        {/* </Col> */}
        
        <Col span={24}>
          <Row>

            <h3>Court Number :  </h3>

            {(() => {
              switch (selectedSport) {
                case "Volleyball":
                  return (
                    <Radio.Group options={courtNumTenVol} onChange={onCourtNumChange} value={courtNum} optionType="button" buttonStyle='solid' />
                  );
                case "Badminton":
                  return (
                    <Radio.Group options={courtNumBad} onChange={onCourtNumChange} value={courtNum} optionType="button" buttonStyle='solid' />
                  );
                case "Tennis":
                  return (
                    <Radio.Group options={courtNumTenVol} onChange={onCourtNumChange} value={courtNum} optionType="button" buttonStyle='solid' />
                  );
                default:
                  return null;
              }
            })()}
          </Row>
          <br />
          {tempuser.user ? <>{tempuser.user.userlv == "ADMIN" ?
            <FullCalendar
              plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
              headerToolbar={{
                left: 'prev,next today',
                center: 'title',
                right: "dayGridMonth,timeGridWeek,timeGridDay"
              }}
              allDaySlot={false}
              slotMinTime="08:00:00"
              slotMaxTime="20:00:00"
              slotDuration="00:30:01"
              initialView='dayGridMonth'
              events={bookings}
              selectable={true}
              snapDuration={true}
              select={handleAdminSelect}
              datesSet={currentMonth}
              eventClick={handleClick}
            />
            : <FullCalendar
              plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
              initialView='timeGridDay'
              allDaySlot={false}
              slotMinTime="08:00:00"
              slotMaxTime="20:00:00"
              slotDuration="00:30:01"
              events={bookings}
              selectable={true}
              select={handleSelect}
              datesSet={currentMonth}
              eventClick={handleClick}
            />}</> : <></>}
          <Modal title={selectedSport + "     Court : " + courtNum} visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
            <Row>
              <Col span={12}><h3>Requester</h3></Col>
              <Col span={12}><h3>ID</h3></Col>
            </Row>
            <Row>
              <Col span={12}><h4>{tempuser.user.user.name}</h4></Col>
              <Col span={12}><h4>{tempuser.user.user.email.slice(0, 8)}</h4></Col>
            </Row>
            <Row>
              <Col span={12}><h3>Participant 1 ID</h3></Col>
              <Col span={12}><input name="par1" value={values.par1} onChange={onChangeValues} /></Col>
            </Row>
            <Row>
              <Col span={12}><h3>Participant 2 ID</h3></Col>
              <Col span={12}><input name="par2" value={values.par2} onChange={onChangeValues} /></Col>
            </Row>
            <Row>
              <Col span={12}><h3>Participant 3 ID</h3></Col>
              <Col span={12}><input name="par3" value={values.par3} onChange={onChangeValues} /></Col>
            </Row>
            <Row>
              <Col span={12}><h3>Participant 4 ID</h3></Col>
              <Col span={12}><input name="par4" value={values.par4} onChange={onChangeValues} /></Col>
            </Row>
            <Row>
              <Col span={12}><h3>Participant 5 ID</h3></Col>
              <Col span={12}><input name="par5" value={values.par5} onChange={onChangeValues} /></Col>
            </Row>

          </Modal>
          <Modal title="Booking Information" visible={isModalVisible1} onOk={handleOk1} onCancel={handleCancel1}
            footer={[
              <button onClick={handleCancel1}>Cancel</button>,
              <button onClick={showConfirm}> Delete</button>]}>

          </Modal>
        </Col>
      </Row>
    </div>
  )
}

export default Index;