import React, { useEffect } from 'react'
import { Container, Row, Col, Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faChartBar, faCalendar } from '@fortawesome/free-solid-svg-icons';

function Dashboard() {


    useEffect(() => {
        document.body.style.backgroundColor = '#fff'
    }, [])

    const names = ['SANGWA', 'Emmanuel', 'SANGWA', 'Emmanuel', 'SANGWA', 'Emmanuel', 'SANGWA', 'Emmanuel', 'SANGWA', 'Emmanuel'
        , 'SANGWA', 'Emmanuel', 'SANGWA', 'Emmanuel', 'SANGWA', 'Emmanuel', 'SANGWA', 'Emmanuel', 'SANGWA', 'Emmanuel'
        , 'SANGWA', 'Emmanuel', 'SANGWA', 'Emmanuel', 'SANGWA', 'Emmanuel', 'SANGWA', 'Emmanuel', 'SANGWA', 'Emmanuel']
    return (
        <div style={{ marginLeft: "50px" }}>
            <Container fluid>
                <h1 className="mt-4">Dashboard</h1>
                <Row>
                    <Col md={4}>
                        <Card>
                            <Card.Body>
                                <div className="d-flex justify-content-between align-items-center">
                                    <div>
                                        <FontAwesomeIcon icon={faUsers} size="3x" />
                                        <h3 className="mt-3">Users</h3>
                                    </div>
                                    <h1>50</h1>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={4}>
                        <Card>
                            <Card.Body>
                                <div className="d-flex justify-content-between align-items-center">
                                    <div>
                                        <FontAwesomeIcon icon={faChartBar} size="3x" />
                                        <h3 className="mt-3">Sales</h3>
                                    </div>
                                    <h1>$10,000</h1>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={4}>
                        <Card>
                            <Card.Body>
                                <div className="d-flex justify-content-between align-items-center">
                                    <div>
                                        <FontAwesomeIcon icon={faCalendar} size="3x" />
                                        <h3 className="mt-3">Events</h3>
                                    </div>
                                    <h1>5</h1>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>


        </div>
    )
}

export default Dashboard
