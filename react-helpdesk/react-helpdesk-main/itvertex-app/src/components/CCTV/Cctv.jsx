import { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Table from 'react-bootstrap/Table';
import { Link } from 'react-router-dom';
import CctvItem from './CctvItem';
import Pagination from 'react-bootstrap/Pagination';
import Dropdown from 'react-bootstrap/Dropdown';
import { left } from '@popperjs/core';

export default function Customer() {
    const [search, setSearch] = useState("");
    const [cctvdata, setCctvdata] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [numPerPage, setNumPerPage] = useState(5);

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
            const result = json.data.filter((item) => item.ipc_address.includes(search) || item.ipc_name.includes(search));

            setCctvdata(result);
            setCurrentPage(0); // Reset to the first page when the search changes
        }
        fetchData();

    }, [search]);

    const totalPages = Math.ceil(cctvdata.length / numPerPage);
    const startIndex = currentPage * numPerPage;
    const endIndex = startIndex + numPerPage;

    const handlePageSelect = (page) => {
        setCurrentPage(page);
    };

    const handleNumPerPageSelect = (selectedNum) => {
        setNumPerPage(selectedNum);
        setCurrentPage(0); // Reset to the first page when the number of rows per page changes
    };

    const firstPage = () => {
        setCurrentPage(0);
    };

    const lastPage = () => {
        setCurrentPage(totalPages - 1);
    };

    const showAllData = () => {
        setNumPerPage(cctvdata.length);
        setCurrentPage(0);
    };

    return (
        <div style={{ background: '#eaeaea', width: '100%', minHeight: '100vh'}}>
            <Link className="btn btn-success btn-sm" to="/cctv/create" style={{ marginLeft: '3rem', marginTop: '40px' }}>+เพิ่มข้อมูล CCTV</Link>

            <InputGroup style={{ marginLeft: '3rem', marginTop: '30px', width: '40%' }}>
                <Form.Control
                    placeholder="ค้นหา IP address หรือ ชื่อกล้อง CCTV"
                    aria-label="ค้นหา IP address หรือ ชื่อกล้อง CCTV"
                    aria-describedby="basic-addon2"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </InputGroup>

            <div style={{ margin: '3rem', marginTop: '1rem' }}>
                <Table striped bordered hover>
                    <thead>
                        <tr role="row" className="bg-secondary text-white">
                            <th tabIndex="0" rowSpan="1" colSpan="1" style={{ width: '5%', textAlign: 'center' }}>IP Address</th>
                            <th tabIndex="0" rowSpan="1" colSpan="1" style={{ width: '5%', textAlign: 'center' }}>CCTV Name</th>
                            <th tabIndex="0" rowSpan="1" colSpan="1" style={{ width: '5%', textAlign: 'center' }}>Status</th>
                            <th tabIndex="0" rowSpan="1" colSpan="1" style={{ width: '5%', textAlign: 'center' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Array.isArray(cctvdata) && cctvdata.length > 0 ? (
                            cctvdata.slice(startIndex, endIndex).map((item, index) => (
                                <CctvItem key={item.ipc_id} index={index + 1} {...item} />
                            ))
                        ) : (
                            <tr style={{ textAlign: 'center' }}>
                                <td colSpan="6">ไม่พบข้อมูลที่ค้นหา</td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            </div>
            <div className='container mt-3 border-bottom' style={{ marginLeft:'50px'}}>
                <Pagination>
                    <Pagination.First onClick={firstPage} />
                    <Pagination.Prev disabled={currentPage === 0} onClick={() => setCurrentPage(currentPage - 1)} />
                    {Array.from({ length: totalPages }, (_, index) => (
                        <Pagination.Item
                            key={index}
                            active={index === currentPage}
                            onClick={() => handlePageSelect(index)}
                        >
                            {index + 1}
                        </Pagination.Item>
                    ))}
                    <Pagination.Next disabled={currentPage === totalPages - 1} onClick={() => setCurrentPage(currentPage + 1)} />
                    <div style={{ marginRight: '10px' }}>
                        <Pagination.Last onClick={lastPage} />
                    </div>
                    <Dropdown className="float-end">
                        <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                            Rows per page: {numPerPage}
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item onClick={() => handleNumPerPageSelect(5)}>5</Dropdown.Item>
                            <Dropdown.Item onClick={() => handleNumPerPageSelect(10)}>10</Dropdown.Item>
                            <Dropdown.Item onClick={() => handleNumPerPageSelect(15)}>15</Dropdown.Item>
                            <Dropdown.Item onClick={showAllData}>All</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Pagination>
            </div>
        </div>

    );
}