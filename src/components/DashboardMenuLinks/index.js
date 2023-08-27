import React, { useState } from 'react';
import {
    MDBIcon,
    MDBCollapse,
    MDBRipple,
    MDBListGroup,
    MDBListGroupItem,
    MDBTabsLink
} from 'mdb-react-ui-kit';
import './dashboard.css';
import { useNavigate } from 'react-router-dom';
function DashboardMenuLinks({ active }) {
    const [showShow, setShowShow] = useState(false);
    const navigate = useNavigate();

    const toggleShow = () => setShowShow(!showShow);
    const handlelogout = () => {
        localStorage.removeItem("auth");
        navigate('/login');
    }
    return (
        <>
            <div className='w-25 custom-body-name'>
                <MDBCollapse show={showShow} tag="nav" className="d-lg-block bg-white sidebar">
                    <div className="position-sticky">
                        <MDBListGroup flush className="mx-3 mt-4">
                            <MDBRipple rippleTag='span'>
                                {active === "dashboard" ? <MDBListGroupItem tag='a' href='/dashboard' action className='border-0 border-bottom rounded rounded' active> <MDBIcon fas icon="tachometer-alt me-3" />
                                    Dashboard
                                </MDBListGroupItem> : <MDBListGroupItem tag='a' href='/dashboard' action className='border-0 border-bottom rounded rounded'><MDBIcon fas icon="tachometer-alt me-3" />
                                    Dashboard
                                </MDBListGroupItem>
                                }
                            </MDBRipple>

                            <MDBRipple rippleTag='span'>
                                {active === "expensecategory" ? <MDBListGroupItem tag='a' href='/expensecategory' action className='border-0 border-bottom rounded' active aria-current='true'>
                                    <MDBIcon fas icon="chart-area me-3" />
                                    Expense Categories
                                </MDBListGroupItem> : <MDBListGroupItem tag='a' href='/expensecategory' action className='border-0 border-bottom rounded' aria-current='true'>
                                    <MDBIcon fas icon="chart-area me-3" />
                                    Expense Categories
                                </MDBListGroupItem>
                                }
                            </MDBRipple>

                            <MDBRipple rippleTag='span'>
                                {active === "expensemanagement" ? <MDBListGroupItem tag='a' href='/expensemanagement' action className='border-0 border-bottom rounded' active aria-current='true'>
                                    <MDBIcon fas icon="chart-area me-3" />
                                    Expense Management
                                </MDBListGroupItem> : <MDBListGroupItem tag='a' href='/expensemanagement' action className='border-0 border-bottom rounded' aria-current='true'>
                                    <MDBIcon fas icon="chart-area me-3" />
                                    Expense Management
                                </MDBListGroupItem>
                                }
                            </MDBRipple>

                            <MDBRipple rippleTag='span'>
                                {active === "expenselistings" ? <MDBListGroupItem tag='a' href='/expenselistings' action className='border-0 border-bottom rounded' active>
                                    <MDBIcon fas icon="lock me-3" />
                                    Expense Listings
                                </MDBListGroupItem> : <MDBListGroupItem tag='a' href='/expenselistings' action className='border-0 border-bottom rounded'>
                                    <MDBIcon fas icon="lock me-3" />
                                    Expense Listings
                                </MDBListGroupItem>
                                }
                            </MDBRipple>

                            <MDBRipple rippleTag='span'>
                                {active === "monthlyreports" ? <MDBListGroupItem tag='a' href='/monthlyreports' action className='border-0 border-bottom rounded' active>
                                    <MDBIcon fas icon="chart-line me-3" />
                                    Monthly Reports
                                </MDBListGroupItem> : <MDBListGroupItem tag='a' href='/monthlyreports' action className='border-0 border-bottom rounded'>
                                    <MDBIcon fas icon="chart-line me-3" />
                                    Monthly Reports
                                </MDBListGroupItem>
                                }
                            </MDBRipple>

                            {/* <MDBRipple rippleTag='span'>
                                <MDBListGroupItem tag='a' href='#' action className='border-0 border-bottom rounded'>
                                    <MDBIcon fas icon="chart-pie me-3" />
                                    SEO
                                </MDBListGroupItem>
                            </MDBRipple> */}

                            {/* <MDBRipple rippleTag='span'>
                                <MDBListGroupItem tag='a' href='#' action className='border-0 border-bottom rounded'>
                                    <MDBIcon far icon="chart-bar me-3" />
                                    Orders
                                </MDBListGroupItem>
                            </MDBRipple> */}

                            {/* <MDBRipple rippleTag='span'>
                                <MDBListGroupItem tag='a' href='#' action className='border-0 border-bottom rounded'>
                                    <MDBIcon fas icon="globe me-3" />
                                    International
                                </MDBListGroupItem>
                            </MDBRipple> */}

                            {/* <MDBRipple rippleTag='span'>
                                <MDBListGroupItem tag='a' href='#' action className='border-0 border-bottom rounded'>
                                    <MDBIcon fas icon="building me-3" />
                                    Partners
                                </MDBListGroupItem>
                            </MDBRipple> */}

                            {/* <MDBRipple rippleTag='span'>
                                <MDBListGroupItem tag='a' href='#' action className='border-0 border-bottom rounded'>
                                    <MDBIcon fas icon="calendar me-3" />
                                    Calendar
                                </MDBListGroupItem>
                            </MDBRipple> */}

                            {/* <MDBRipple rippleTag='span'>
                                <MDBListGroupItem tag='a' href='#' action className='border-0 border-bottom rounded'>
                                    <MDBIcon fas icon="users me-3" />
                                    Users
                                </MDBListGroupItem>
                            </MDBRipple> */}

                            <MDBRipple rippleTag='span'>
                                <MDBListGroupItem tag='button' action className='border-0 rounded'>

                                    <MDBTabsLink onClick={handlelogout}><MDBIcon fas icon="power-off me-3" /> Logout</MDBTabsLink>
                                </MDBListGroupItem>
                            </MDBRipple>
                        </MDBListGroup>
                    </div>
                </MDBCollapse>
            </div>
        </>
    )
}
export default DashboardMenuLinks;