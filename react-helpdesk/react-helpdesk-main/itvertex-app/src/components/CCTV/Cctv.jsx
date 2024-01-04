import { useState , useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Table from 'react-bootstrap/Table';
import { Link } from 'react-router-dom';
import CctvItem from './CctvItem';

export default function Customer() {
    const [search,setSearch] = useState("");
    const [cctvdata, setCctvdata] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const response = await fetch(   
                "http://localhost:4080/api/cctv_read_all",
                {
                    method: "GET",
                    headers: {
                        Accept: "application/json",
                        'Content-Type': 'application/json',
                        Authorization: "Bearer " + localStorage.getItem("access_token")
                    }
                }
            )            

            let json = await response.json();
            
            //* ค้นหาข้อมูล
            const result = json.data.filter((item)=> item.ipc_address.includes(search)|| item.ipc_name.includes(search));

            setCctvdata(result);
            console.log(result);
        }
        fetchData();

        
        
    }, [search]);


    return (
        <div style={{ background: '#eaeaea', width: '100%', height: '100vh' }}>
            <Link className="btn btn-success btn-sm" to="/customer/create" style={{ marginLeft: '3rem', marginTop: '40px'}}>+เพิ่มข้อมูลลูกค้า</Link>

            <InputGroup style={{ marginLeft: '3rem', marginTop: '30px', width: '40%' }}>
                <Form.Control
                    placeholder="ค้นหา IP address หรือ ชื่อกล้อง CCTV"
                    aria-label="ค้นหา IP address หรือ ชื่อกล้อง CCTV"
                    aria-describedby="basic-addon2"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </InputGroup>

            <div style={{ margin: '3rem' , marginTop: '1rem'}}>
                <Table striped bordered hover>
                    <thead>
                        <tr role="row" className="bg-secondary text-white">
                            <th tabIndex="0" rowSpan="1" colSpan="1" style={{width: '5%' , textAlign: 'center'}}>IP Address</th>
                            <th tabIndex="0" rowSpan="1" colSpan="1" style={{width: '5%' , textAlign: 'center'}}>CCTV Name</th>
                            <th tabIndex="0" rowSpan="1" colSpan="1" style={{width: '5%' , textAlign: 'center'}}>Status</th>
                            <th tabIndex="0" rowSpan="1" colSpan="1" style={{width: '5%' , textAlign: 'center'}}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Array.isArray(cctvdata) && cctvdata.length > 0 ? (
                            cctvdata.map((item, index) => (
                                <CctvItem key={item.ipc_id} index={index + 1} {...item} />
                            ))
                        ) : (
                            <tr style={{textAlign: 'center'}}>
                                <td colSpan="6">ไม่พบข้อมูลที่ค้นหา</td>
                            </tr>
                        )}
                    </tbody>    
                </Table>      
            </div>

        </div>
       
    );
}