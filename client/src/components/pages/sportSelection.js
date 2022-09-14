import React from "react";
import { createSearchParams, Link, useNavigate } from 'react-router-dom'
const SportSelection = () => {
    const navigate = useNavigate();
    const selectBadminton= (type) => {
        navigate({
            pathname: "/bookings",
            search: createSearchParams({
                type: "Badminton"
            }).toString()
        });
    };
    const selectVolleyBall= (type) => {
        navigate({
            pathname: "/bookings",
            search: createSearchParams({
                type: "Volleyball"
            }).toString()
        });
    };
    const selectTennis= (type) => {
        navigate({
            pathname: "/bookings",
            search: createSearchParams({
                type: "Tennis"
            }).toString()
        });
    };
    return (
      <div>
        <button onClick={selectBadminton}>Badminton</button>
        <button onClick={selectVolleyBall}>VolleyBall</button>
        <button onClick={selectTennis}>Tennis</button>
      </div>  
    );
}

export default SportSelection;