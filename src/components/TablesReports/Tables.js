import React, { useState } from 'react'
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

const Tables = ({ userdata }) => {
  const [sum, setSum] = useState(0);
  var sums = 0;
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
                    <th>Category</th>
                    <th>Expense</th>
                    <th>Cost</th>
                    <th>Date</th>
                    <th>Descriptions</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    userdata.length > 0 ? userdata.map((element, index) => {
                      sums = sums + parseFloat(element.cost);
                      // setSum(sum + parseFloat(element.cost));
                      return (
                        <>
                          <tr>
                            <td>{index + 1}</td>
                            <td>{element.category}</td>
                            <td>{element.expense_label}</td>
                            <td align='right'>{element.cost}</td>
                            <td>{element.date}</td>
                            <td>{element.notes === "Nil" ? "" : element.notes}</td>

                          </tr>
                        </>
                      )
                    })
                      : <div className='no_data text-center'>No Data Found</div>

                  }
                  <tr></tr>
                  <tr>
                    <td colSpan={5} style={{ fontWeight: 'bold' }}>
                      Total Expense during Selected Period
                    </td>
                    <td colSpan={2} style={{ fontWeight: 'bold' }} align='right'>
                      {sums}
                    </td>
                  </tr>
                </tbody>
              </Table>

            </Card>
          </div>
        </Row>
        <ToastContainer />
      </div>
    </>
  )
}

export default Tables