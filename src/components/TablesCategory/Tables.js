import React from 'react'
import './table.css'
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';
import Dropdown from 'react-bootstrap/Dropdown';
import Badge from 'react-bootstrap/Badge';
import Paginations from '../Pagination/Paginations';
import { BASE_URL } from '../../services/helper';
import { NavLink } from 'react-router-dom';
import { statuschangefunc } from '../../services/Apis';
import { ToastContainer, toast } from 'react-toastify';

const Tables = ({ listData, deleteCategoryExpense, fetchExpData, handlePrevious, handleNext, page, pageCount, setPage }) => {
  // console.log(listData);
  const handleChange = async (id, status) => {
    const response = await statuschangefunc(id, status);
    if (response.status === 200) {
      fetchExpData();
      toast.success("Status updated successfully")
    } else {
      toast.error("Failed to save")
    }
  }

  return (
    <>
      <div className="container">
        <Row>
          <div className="col mt-2">
            <Card className='shadow'>
              <Table className='align-items-center' responsive='sm'>
                <thead className='thead-dark'>
                  <tr className='table-dark'>
                    <th>Sl No</th>
                    <th>Category Name</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    listData.length > 0 ? listData.map((element, index) => {
                      return (
                        <>
                          <tr>
                            <td>{index + 1}</td>
                            <td>{element.name}</td>
                            <td>
                              <Dropdown className='text-center'>
                                <Dropdown.Toggle variant='light' className='action' id="dropdown-basic">
                                  <i className='fa-solid fa-ellipsis-vertical'></i>
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                  <Dropdown.Item>
                                    <NavLink to={`/editcategoryexpense/${element._id}`} className="text-decoration-none" style={{ width: '100%', display: 'block !important' }} >
                                      <i className='fa-solid fa-pen-to-square' style={{ color: "blue" }}></i> <span>Edit</span>
                                    </NavLink>
                                  </Dropdown.Item>
                                  <Dropdown.Item>
                                    <div onClick={() => deleteCategoryExpense(element._id)}>
                                      <i className='fa-solid fa-trash' style={{ color: "red" }}></i> <span>Delete</span>
                                    </div>
                                  </Dropdown.Item>
                                </Dropdown.Menu>
                              </Dropdown>
                            </td>
                          </tr>
                        </>
                      )
                    }) : <div className='no_data text-center'>No Data Found</div>
                  }
                </tbody>
              </Table>
              <Paginations
                handlePrevious={handlePrevious}
                handleNext={handleNext}
                page={page}
                pageCount={pageCount}
                setPage={setPage}
              />
            </Card>
          </div>
        </Row>
        <ToastContainer />
      </div>
    </>
  )
}

export default Tables