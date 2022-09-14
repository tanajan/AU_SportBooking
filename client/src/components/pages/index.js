import React, {Component,useState,useEffect} from 'react'

import FullCalendar, { render } from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin, { Draggable }from "@fullcalendar/interaction" // needed for dayClick

import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Col, Row, Card, Tag, Modal, Radio} from 'antd';
import { useSearchParams } from 'react-router-dom';

import moment from 'moment'

//Functions
import {createEvent, listEvent, handlecurrentMonth, updateEvent, deleteEvent, listEventwithcon} from "../functions/fullcalendar"

import './index.css'

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
const Index = () => {
  const [searchparams] = useSearchParams();
  const selectedSport = searchparams.get("type");
  
  const { confirm } = Modal;
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalVisible1, setIsModalVisible1] = useState(false);
  const [values, setValues] = useState({
    title: '',
    par1: '',
    start: '',
    end: '',
    sportType:'',
    courtNum: ''
  })
  const [bookings, setEvents] = useState([])
  const [currentBooking, setCurrentBooking] = useState([])
  const [courtNum, setCourtNum] = useState('')

  const onCourtNumChange = ({target: {value}}) => {
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

  const sportType = [
    { id:'1',name:'Tennis', color:'#B6FFA1'},
    { id:'2',name:'Volleyball', color:'#C0F0FF'},
  ]

  useEffect(()=> {
    loadData()
  },[courtNum])

  const loadData = () => {
    listEventwithcon({courtNum})
    .then(res=>{
      setEvents(res.data)
    }).catch(err=> {
      console.log(err)
    })
  }


  const handleClick = (info)=> {
    const id = info.event._def.extendedProps._id
    console.log(id)
    setId(id)
    showModal1()
  }

  const handleDelete = () => {
    deleteEvent(id)
    .then(res=> {
      loadData()
      console.log(res)
    }).catch(err => {
      console.log(err)
    })
    setIsModalVisible1(false);
  }
  
  const handleSelect = (info) => {
    showModal();
    console.log(info)
    setValues({
      ...values,
      start:info.startStr,
      end:info.endStr,
      sportType:selectedSport,
      courtNum:courtNum
    })
  }

  const currentMonth = (info) => {
    const m = info.view.calendar.currentDataManager.data.currentDate
    const mm = moment(m).format('M')
    handlecurrentMonth({mm})
    .then(res=> {
      setCurrentBooking(res.data)
    }).catch(err=> {
      console.log(err)
    })
  }

  const onChangeValues = (e) => {
    setValues({...values,[e.target.name]:e.target.value})
  }

  const showModal = () => {
    setIsModalVisible(true);
  };


  const handleOk = () => {
    console.log(values)
    createEvent(values)
    .then(res=> {
        setValues({...values, title: '', par1: ''})
        loadData()
    }).catch (err => 
      console.log(err))
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setValues({...values, title: '', par1: ''})
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
    setIsModalVisible1(false);
  };

  const d = moment(new Date()).format('DD/MM/YYYY');
  const r = new Date()
  const fil = currentBooking.filter((item)=> {
    return d == moment(item.start).format('DD/MM/YYYY')
  })
  
  const betweenDate = currentBooking.filter((item) => {
    return r >= moment(item.start) && r < moment(item.end)
  })
  
  return (
    <div>
        <Row>
          <Col span = {6}>
            <Card>
              <div id="external-book">
              <ul>
                {sportType.map((item,index)=> 
                <li 
                    className="normal-book"
                    key={index} 
                    style = {{backgroundColor:item.color}}>
                    {item.name}
                </li>)}
              </ul>
              </div>
            </Card>
            <Card>
              <ol>
                {
                  currentBooking.map((item,index) => 
                  <li key = {index}>
                    {d == moment(item.start).format('DD/MM/YYYY')
                    ?<>{moment(item.start).format('DD/MM/YYYY') + "-" + item.title}<Tag color = "green">Today</Tag></>
                    : r >= moment(item.start) && r < moment(item.end)
                      ? <>{moment(item.start).format('DD/MM/YYYY') + "-" + item.title}<Tag color = "yellow">On going</Tag></>
                      :<>{moment(item.start).format('DD/MM/YYYY')+ "-" + item.title}</>
                  }
                  </li>)
                }
              </ol>
            </Card>
          </Col>
          <Col span = {18}>
          <Row>
            {(() => {
              switch(selectedSport) {
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
          <FullCalendar
            plugins={[ dayGridPlugin, timeGridPlugin, interactionPlugin ]}
            headerToolbar = {{
            left:'prev,next today',
            center: 'title',
            right: "dayGridMonth,timeGridWeek,timeGridDay"
        }}
        events = {bookings}
        selectable={true}
        select = {handleSelect}
        datesSet={currentMonth}
        eventClick={handleClick}
        />
        <Modal title={selectedSport} visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
            <h3>Requester</h3>
            <input name = "title" value={values.title} onChange={onChangeValues}/>
            <br></br>
            <h3>Participant 1</h3>
            <input name = "par1" value={values.par1} onChange={onChangeValues}/>
            <br></br>
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