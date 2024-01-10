import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { API_GET } from '../../api';
import { Card, Row, Col, Button, Form, FormGroup } from 'react-bootstrap';

export default function CctvDetail() {
    let params = useParams();

    const [ipAddress, setIpAddress] = useState("");
    const [cctvName, setCctvName] = useState("");
    const [ipcStatus, setIpcStatus] = useState(0);
    const [ipcStatusName, setIpcStatusName] = useState([]);
    const [validated, setValidated] = useState(false);

    useEffect(() => {
        async function fetchData() {
            const response = await API_GET("ipc_status_name");
            // let json = await response.json();
            console.log(response.data);
            setIpcStatusName(response.data);         
            
        }
        fetchData();
    }, []);

    // useEffect(() => {
    //     async function fetchData() {
    //         const response = await fetch(
    //             "http://localhost:4080/api/cctv_read_by_id/" + params.id,
    //         )
    //     }
    // }, []);

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
        }
    
        setValidated(true);
      };

    function cctvCreate(){

    }

    return (
        <>
            <div style={{ background: '#eaeaea', width: '100%', minHeight: '100vh' }}>
                <div style={{ margin: '3rem', marginTop: '5rem' }}>
                    <Card>
                        <Card.Header as="h5" className="bg-primary text-white">เพิ่มข้อมูล CCTV</Card.Header>
                        <Card.Body>
                            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                                <FormGroup as={Row} className="mb-3" controlId="formPlaintextPassword">
                                    <Form.Label column sm="2"> IP Address <span className="text-danger"> * </span> : </Form.Label>
                                    <Col sm="5"> 
                                    <Form.Control type="text" 
                                        value={ipAddress} 
                                        placeholder="Enter IP Address" 
                                        onChange={(e) => setIpAddress(e.target.value)} required/>
                                    <Form.Control.Feedback type="invalid"> Please Enter IP Address</Form.Control.Feedback>
                                    </Col>
                                </FormGroup>
                                {/*CCTV Name */}
                                <FormGroup as={Row} className="mb-3" controlId="formPlaintextPassword">
                                    <Form.Label column sm="2"> CCTV Name  <span className="text-danger"> * </span> :</Form.Label>
                                    <Col sm="5">
                                        <Form.Control type="text" 
                                            value={cctvName}
                                            placeholder="Enter CCTV Name"
                                            onChange={(e) => setCctvName(e.target.value)} required/>
                                        <Form.Control.Feedback type="invalid"> Please Enter CCTV Name</Form.Control.Feedback>
                                    </Col>
                                </FormGroup>
                                {/*IPC Status */}
                                <FormGroup as={Row} className="mb-3" controlId="validateIpcStatus">
                                    <Form.Label column sm="2"> IPC Status <span className="text-danger"> * </span> : </Form.Label>
                                    <Col sm="5">
                                        <Form.Select 
                                        value={ipcStatus} 
                                        onChange={(e) => setIpcStatus(e.target.value)} 
                                        required>
                                            <option label="Select CCTV Status"></option>
                                            {ipcStatusName.map((item, index) => (
                                                <option key={index} 
                                                        value={item.ipc_status}>
                                                {item.ipc_status_name}
                                                </option>
                                            ))
                                            }
                                        </Form.Select>
                                    </Col>
                                    <Form.Control.Feedback type="invalid">
                                        Please select IPC Status.
                                    </Form.Control.Feedback>
                                </FormGroup>
                                <hr />
                                <Button type="submit" className="sign-btn" style={{background: 'green' , border: '0'}}>บันทึก</Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </div>
            </div>
        </>
    );
}