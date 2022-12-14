import React from "react";
import { createSearchParams, useNavigate } from 'react-router-dom'
import { Card, Col, Button, Row } from 'antd';
import badminton from "../image/badminton.jpg";
import volleyball from "../image/volleyball.jpg";
import tennis from "../image/tennis.jpg";
const SportSelection = ({ user }) => {

    const navigate = useNavigate();

    const selectBadminton = (type) => {
        navigate({
            pathname: "/bookings",
            search: createSearchParams({
                type: "Badminton"
            }).toString()
        });
    };
    const selectVolleyBall = (type) => {
        navigate({
            pathname: "/bookings",
            search: createSearchParams({
                type: "Volleyball"
            }).toString()
        });
    };
    const selectTennis = (type) => {
        navigate({
            pathname: "/bookings",
            search: createSearchParams({
                type: "Tennis"
            }).toString()
        });
    };

    const styles = {
        con: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: "100vw",
            height: "100vh"
        }
    }

    return (
        <div style={styles.con}>
            <Row gutter={{
                xs: 8,
                sm: 16,
                md: 24,
                lg: 32,
            }}>
                <Col className="sportselectbox" span={8}>
                    <Card hoverable title="Badminton" style={{ width: 300, height: 350, padding: '8px', textAlign: 'center' }}
                        cover={<img alt="badminton" src={badminton} style={{width: "284px", height: "190px" }}/>}>
                        <Button onClick={selectBadminton} type="primary" shape="round" >
                            Book now!
                        </Button>
                    </Card>
                </Col>
                <Col className="sportselectbox" span={8}>
                    <Card hoverable title="VolleyBall" style={{ width: 300, height: 350, padding: '8px', textAlign: 'center' }}
                        cover={<img alt="volleyball" src={volleyball} style={{width: "284px", height: "190px" }}/>}>
                        <Button onClick={selectVolleyBall} type="primary" shape="round" >
                            Book now!
                        </Button>
                    </Card>
                </Col>
                <Col className="sportselectbox" span={8}>
                    <Card hoverable title="Tennis" style={{ width: 300, height: 350, padding: '8px', textAlign: 'center' }}
                        cover={<img alt="badminton" src={tennis} style={{width: "284px", height: "190px" }}/>}>
                        <Button onClick={selectTennis} type="primary" shape="round" >
                            Book now!
                        </Button>
                    </Card>
                </Col>
            </Row>
        </div>
    );
}

export default SportSelection;