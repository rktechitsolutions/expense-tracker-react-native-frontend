import { Box, Button, Card, Paper, Tab, Tabs, Typography } from "@mui/material";
import DashboardMenuLinks from "../../components/DashboardMenuLinks";
import Dropdown from 'react-bootstrap/Dropdown';
import Form from "react-bootstrap/Form"
import Row from "react-bootstrap/esm/Row";
import PropTypes from 'prop-types';
import { useEffect, useState } from "react";
import '../ExpenseListings/listings.css'
import { ToastContainer, toast } from "react-toastify"
import { useNavigate } from "react-router-dom";
import { expensereportgenerate } from "../../services/Apis";
import Spiner from "../../components/Spiner/Spiner";
import Tables from "../../components/TablesReports/Tables";

function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}
function MonthlyReports() {
    const [value, setValue] = useState(0);
    const navigate = useNavigate();
    const [showspin, setShowSpin] = useState(false);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const [month, setMonth] = useState("");
    const [monthwords, setMonthWords] = useState("");
    const [years, setYears] = useState([]);
    const [year, setYear] = useState("");
    const [report, setReportadd] = useState([]);
    const setMonths = (mon) => {
        var mnts = mon.split(',');
        const mos = mnts[0];
        const mos_words = mnts[1];
        setMonth(mos); setMonthWords(mos_words);
    }
    const getYearList = () => {
        var max = new Date().getFullYear()
        var min = max - 9
        var years = []
        for (var i = max; i >= min; i--) {
            years.push(i)
        }
        setYears(years);
    }
    useEffect(() => {
        getYearList();
    })
    const generate_report = async (e) => {
        e.preventDefault();
        const items = JSON.parse(localStorage.getItem('auth'));

        if (month === "") {
            toast.error("Month is required!");
        } else if (year === "") {
            toast.error("Year is required!");
        } else if (items.user.user_id === "") {
            toast.error("Session Expired! Please login!");
            navigate("/login")
        } else {
            setShowSpin(true);
            const data = new FormData();
            data.append("month", month);
            data.append("year", year);
            data.append("user_id", items.user.user_id);
            const response = await expensereportgenerate(data);
            if (response.status === 200) {
                setShowSpin(false);
                setReportadd(response.data.expenselist);
            } else {
                toast.error("Failed to retrieve data");
            }
        }
    }
    return (
        <>
            <div style={{ display: 'flex' }}>
                <DashboardMenuLinks active="monthlyreports" />
                <Card className="container-div">
                    <Box sx={{ width: '100%' }}>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                                <Tab label="Expense - Monthly Report" style={{ color: '#b79a6d' }} {...a11yProps(0)} />
                            </Tabs>
                        </Box>
                        <CustomTabPanel value={value} index={0} className="min-ht-cust">
                            <Form className='mt-3'>
                                <Row className='mt-3'>

                                    <Form.Group className="mb-3 col-lg-4 disp-flex" controlId="formBasicEmail">
                                        <Form.Label>Select Month: &nbsp;&nbsp;&nbsp;&nbsp;</Form.Label>
                                        <Dropdown className='text-center'>
                                            <Dropdown.Toggle className='dropdown_btn_custom scroll-dropdown-custom' id="dropdown-basic">
                                                {
                                                    monthwords === "" ?
                                                        "Select Month" :
                                                        monthwords
                                                }
                                                <i className='fa fa-solid fa-sort'></i>
                                            </Dropdown.Toggle>
                                            <Dropdown.Menu>
                                                <Dropdown.Item onClick={() => setMonths("01,January")}>January</Dropdown.Item>
                                                <Dropdown.Item onClick={() => setMonths("02,February")}>February</Dropdown.Item>
                                                <Dropdown.Item onClick={() => setMonths("03,March")}>March</Dropdown.Item>
                                                <Dropdown.Item onClick={() => setMonths("04,April")}>April</Dropdown.Item>
                                                <Dropdown.Item onClick={() => setMonths("05,May")}>May</Dropdown.Item>
                                                <Dropdown.Item onClick={() => setMonths("06,June")}>June</Dropdown.Item>
                                                <Dropdown.Item onClick={() => setMonths("07,July")}>July</Dropdown.Item>
                                                <Dropdown.Item onClick={() => setMonths("08,August")}>August</Dropdown.Item>
                                                <Dropdown.Item onClick={() => setMonths("09,September")}>September</Dropdown.Item>
                                                <Dropdown.Item onClick={() => setMonth("10,October")}>October</Dropdown.Item>
                                                <Dropdown.Item onClick={() => setMonth("11,November")}>November</Dropdown.Item>
                                                <Dropdown.Item onClick={() => setMonth("12,December")}>December</Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    </Form.Group>
                                    <Form.Group className="mb-3 col-lg-4 disp-flex" controlId="formBasicEmail">
                                        <Form.Label>Select Year: &nbsp;&nbsp;&nbsp;&nbsp;</Form.Label>
                                        <Dropdown className='text-center'>
                                            <Dropdown.Toggle className='dropdown_btn_custom scroll-dropdown-custom' id="dropdown-basic">
                                                {
                                                    year === "" ?
                                                        "Select Year" :
                                                        year
                                                } <i className='fa fa-solid fa-sort'></i>
                                            </Dropdown.Toggle>
                                            <Dropdown.Menu>
                                                {
                                                    years.length > 0 &&
                                                    years.map((yr, index) => {
                                                        return (
                                                            <Dropdown.Item onClick={() => setYear(yr)}>{yr}</Dropdown.Item>
                                                        )
                                                    })
                                                }
                                                {/* <Dropdown.Item >New</Dropdown.Item>
                                                <Dropdown.Item>Old</Dropdown.Item> */}
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    </Form.Group>

                                    <Form.Group className="mb-3 col-lg-3 disp-flex" >
                                        <Button variant="primary" type="submit" className="btn-custom-add" onClick={generate_report}  >
                                            Generate Report
                                        </Button>
                                    </Form.Group>
                                </Row>
                            </Form>
                            {
                                report.length > 0 &&
                                    showspin ? <Spiner /> : <Tables
                                    userdata={report}
                                />
                            }
                        </CustomTabPanel>

                    </Box>
                </Card><ToastContainer position="top-right" />
            </div>
        </>
    )
}
export default MonthlyReports;