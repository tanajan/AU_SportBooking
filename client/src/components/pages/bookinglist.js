import { DatePicker, Modal, Divider, Table, message, Typography } from 'antd';
import React, { useState } from 'react'
import {  deleteEvent } from "../functions/fullcalendar"
import { queryDate, getAbacId } from "../functions/fullcalendar";
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment'
import { DeleteOutlined, UpCircleOutlined, ExclamationCircleOutlined } from '@ant-design/icons'

const BookingList = () => {
    const styles = {
        con: {
            padding: "2.5rem 1rem 1rem 1rem"
        }
    }

    const [bo, setbo] = useState([])
    const [deleteModalvisible, setdeleteModalvisible] = useState(false);
    const { confirm } = Modal;
    const { Title } = Typography;

    const getIdAbac = async (values) => {
        const gid = { gId: values }
        var userobj;
        await getAbacId(gid)
            .then(res => {
                const aid = res.data
                userobj = aid;
            }).catch(err => {
                console.log(err)
            })
        return (userobj);
    }

    const onChange = async (date, dateString) => {
        const qdate = { datestart: new Date(dateString), dateend: new Date(new Date(dateString).setDate(new Date(dateString).getDate() + 1)) }
        var data;
        await queryDate(qdate)
            .then(res => {
                data = res.data;
            }).catch(err => {
                console.log(err)
            })
        var dataset = await createDataset(data)
        setbo(dataset)
    };

    const createDataset = async (data) => {
        var dataset = []
        for (let i = 0; i < data.length; i++) {
            var reqid = await getIdAbac(data[i].requester)
            var startampm = new Date(data[i].start).getHours() >= 12 ? 'pm' : 'am';
            var startstr = new Date(data[i].start).getHours() +":"+ new Date(data[i].start).getMinutes(); + " " + startampm
            var endampm = new Date(data[i].end).getHours() >= 12 ? 'pm' : 'am';
            var endstr = new Date(data[i].end).getHours() +":"+ new Date(data[i].end).getMinutes() + " " + endampm;
            var tempdata = {
                key: i + 1,
                id: data[i]._id,
                requester: reqid[0].email.split('@')[0],
                sportType: data[i].sportType,
                courtNum: data[i].courtNum,
                start: startstr,
                end: endstr,
                par1: data[i].par1,
                par2: data[i].par2,
                par3: data[i].par3,
                par4: data[i].par4,
                par5: data[i].par5
            }
            dataset.push(tempdata)
        }
        return dataset
    }

    const canceldeleteModal = () => {
        setdeleteModalvisible(false);
    }

    const okdeleteModal = () => {
        setdeleteModalvisible(false);
    }

    const showinformationModal = (record) => {
        confirm({
            title: "Booking Information",
            content: <>
                <p>Requester : {record.requester}</p>
                <p>Pariticipant 1 : {record.par1}</p>
                <p>Pariticipant 2 : {record.par2}</p>
                <p>Pariticipant 3 : {record.par3}</p>
                <p>Pariticipant 4 : {record.par4}</p>
                <p>Pariticipant 5 : {record.par5}</p>
                <p>Sport Type : {record.sportType}</p>
                <p>Court Number : {record.courtNum}</p>
            </>,
            onOk() {

            },
            onCancel() {

            },
        });
    }

    const onDeleteBooking = (id) => {
        confirm({
            title: 'Do you Want to delete these items?',
            icon: <ExclamationCircleOutlined />,
            content: "id : " + id.requester,
            onOk() {
                handleDelete(id.id)
                window.location.reload(false);
            },
            onCancel() {

            },
        });
    }

    const handleDelete = (id) => {
        deleteEvent(id)
            .then(res => {
                message.success('Booking Deleted');
            }).catch(err => {
                console.log(err)
                message.error('Server Error');
            })
    }


    const columns = [
        {
            title: 'Requester',
            dataIndex: 'requester',
            key: 'requester',
            render: (text) => <a>{text}</a>
        },
        {
            title: 'Sport Type',
            dataIndex: 'sportType',
            key: 'sportType',
        },
        {
            title: 'Court Number',
            dataIndex: 'courtNum',
            key: 'courtNum',
        },
        {
            title: 'Start Time',
            dataIndex: 'start',
            key: 'start',
        },
        {
            title: 'End Time',
            dataIndex: 'end',
            key: 'end',
        },
        {
            title: 'Action',
            key: 'action',
            render: (record) => {
                return <>
                    <UpCircleOutlined onClick={() => {
                        showinformationModal(record)
                    }} />
                    <DeleteOutlined onClick={() => {
                        onDeleteBooking(record)
                    }} style={{ color: "red", marginLeft: "1.5rem" }} />

                </>
            }
        }
    ]

    return (
        <div style={styles.con}>
            <Title level={2}>
            Select Date
            </Title>
            <DatePicker onChange={onChange} />
            <Divider></Divider>
            <Table columns={columns} dataSource={bo}></Table>
            <Modal title="Booking Information" visible={deleteModalvisible} >
            </Modal>
        </div>
    )
}

export default BookingList;