import "date-fns";
import React, { useState, useEffect } from 'react';
import Datetime from 'react-datetime';
import moment from 'moment';
import "../style/dashboard.css";

import { queryDate } from "../functions/fullcalendar";


const Dashboard = () => {


    const [querydate, setquerydate] = useState({
        datestart:"",
        dateend: ""
    });

    const [bookings, setbookings] = useState([]);

    const onChangeValues = (temp) => {
        setquerydate({
            ...querydate,
            [temp.target.name]:temp.target.value,
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        queryDate(querydate)
        .then(res=> {
            const data = res.data;
            console.log(data)
            for (let i = 0;i < data.length; i++) {
                data[i].title = data[i].title
                data[i].start = data[i].start
            }
            setbookings(data);
        }).catch(err => {
            console.log(err)
        })
    }
    
    // const [year, setYear] = useState(this.date.year())
    // const [month, setMonth] = useState(this.date.month())
    

    // useEffect(() => {

    // })

    return (
        <div>
            <div>

            
            <form onSubmit={handleSubmit}>
                <label>Start</label>
                <input type="date" onChange={onChangeValues} name="datestart"/>
                <br/>
                <label>End</label>
                <input type="date" onChange={onChangeValues} name="dateend"/>
                <br/>
                <button type="submit"  >Query</button>
            </form>
            {/* <Datetime dateformat="M" timeFormat={false} onChange={(date) => setMonth(date.month())} />
            <Datetime dateFormat="YYYY" timeFormat={false} onChange={(date) => setYear(date.year())} />
            <h5>You selected year: {year}</h5>
            <h5>You selected month: {month}</h5> */}
            <br />
            </div>
            <div>
                {bookings === 0 ? 'No data' :  
            
                (
                 <ul>
                    {bookings.map((item) =>
                    <li key={item.title}>
                        {item.title} {item.courtNum}
                    </li>)}
                 </ul>
                )
                }
            </div>
        </div>
    )
}


export default Dashboard;