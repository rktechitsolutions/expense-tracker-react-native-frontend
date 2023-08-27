import { Box, Button, Card, Select, Tab, Tabs, TextField, Typography } from "@mui/material";
import DashboardMenuLinks from "../../components/DashboardMenuLinks";
import PropTypes from 'prop-types';
import { useContext, useEffect, useState } from "react";
import Form from "react-bootstrap/Form"
import Row from "react-bootstrap/esm/Row";
import { useNavigate } from "react-router-dom";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { ToastContainer, toast } from "react-toastify"
import moment from "moment";
import { addExpense } from "../../components/context/ContextProvider";
import { expenseaddfunc, fetchexpensecatlist } from "../../services/Apis";
import '../ExpenseListings/listings.css';
import Dropdown from 'react-bootstrap/Dropdown';

import 'react-toastify/dist/ReactToastify.css';

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

function ExpenseManagement() {
    const [value, setValue] = useState(0);
    const { expenseadd, setExpenseadd } = useContext(addExpense);
    const [catlistdata, setCatListData] = useState([]);
    const [categoryExp, setCategory] = useState("");

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const [inputdata, setInputData] = useState({
        expense_label: "",
        cost: "",
        notes: ""
    });
    // console.log(inputdata);

    const [showspin, setShowSpin] = useState(true);
    const [date, setDate] = useState("");
    const [user_id, setUserId] = useState("");

    // const { useradd, setUseradd } = useContext(addData);

    const navigate = useNavigate();

    const setInputValue = (e) => {
        const { name, value } = e.target;
        setInputData({ ...inputdata, [name]: value })
    }

    const setFechaDesde = (x, event) => {
        const dts = moment(x.toJSON()).format('DD-MM-YYYY');
        setDate(dts);
    }


    const items = JSON.parse(localStorage.getItem('auth'));

    // const logincheck = localStorage.getItem("auth") === null ? navigate('/login') : items.user.user_id;

    const u_id = localStorage.getItem("auth") === null ? navigate('/login') : items.user.user_id;
    // const u_id = ids.user.user_id
    // console.log(categoryExp);
    const handleSubmit = async (e) => {
        e.preventDefault();
        // user_id
        const items = JSON.parse(localStorage.getItem('auth'));
        // setUserId(items.user.user_id);
        // console.log(items.user.user_id);
        // console.log(user_id);
        const { expense_label, cost, notes } = inputdata;
        if (expense_label === "") {
            toast.error("Expense Tag is required!");
        } else if (cost === "") {
            toast.error("Cost is required!");
        }
        else if (date === "") {
            toast.error("Date is required!");
        } else if (items.user.user_id === "") {
            toast.error("Session Expired! Please login!");
            navigate("/login")
        } else if (categoryExp === "" || categoryExp === null) {
            toast.error("Select Category!");
        } else {
            const data = new FormData();
            data.append("expense_label", expense_label);
            data.append("cost", cost);
            data.append("notes", notes);
            data.append("date", date);
            data.append("category", categoryExp);
            data.append("user_id", items.user.user_id);
            const response = await expenseaddfunc(data);
            if (response.status === 200) {
                setInputData({
                    ...inputdata,
                    expense_label: "",
                    cost: "",
                    notes: "",
                    date: ""
                });
                setExpenseadd(response.data);
                navigate("/expenselistings")
            } else {
                toast.error("Failed to save data");
                toast.error(response.response.data);
            }
        }
    }

    const expenseCategoryGet = async (u_id) => {
        const response = await fetchexpensecatlist(u_id);
        // console.log(response.status);
        if (response.status === 200) {
            setCatListData(response.data.singleexpensedata);
            //   console.log(response);
        } else {
            console.log("error");
        }
    }

    useEffect(() => {
        expenseCategoryGet(u_id);
    }, [u_id])

    return (
        <>
            <div style={{ display: 'flex' }}>
                <DashboardMenuLinks active="expensemanagement" />
                <Card className="container-div">
                    <Box sx={{ width: '100%' }}>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                                <Tab label="Expense Addition" style={{ color: '#b79a6d' }} {...a11yProps(0)} />
                            </Tabs>
                        </Box>
                        <CustomTabPanel value={value} index={0}>
                            <Form className='mt-3'>
                                <Row className='mt-3'>
                                    <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
                                        <Form.Label>Expense Category</Form.Label>
                                        <Dropdown className='text-center'>
                                            <Dropdown.Toggle className='dropdown_btn_custom w-100 text-align-left' id="dropdown-basic" title={categoryExp}>
                                                {categoryExp === "" ?
                                                    "Select Category"
                                                    : categoryExp}
                                                <i className='fa fa-solid fa-chevron-down'></i>
                                            </Dropdown.Toggle>
                                            <Dropdown.Menu>
                                                {
                                                    catlistdata.length > 0 &&
                                                    catlistdata.map((category) => {
                                                        return (
                                                            <Dropdown.Item onClick={() => setCategory(category.name)}>{category.name}</Dropdown.Item>
                                                        )
                                                    })

                                                }
                                                {/* <Dropdown.Item >New</Dropdown.Item>
                                                <Dropdown.Item>Old</Dropdown.Item> */}
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    </Form.Group>
                                    <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
                                        <Form.Label>Expense Tag</Form.Label>
                                        <Form.Control type="text" name='expense_label' value={inputdata.expense_label} onChange={setInputValue} placeholder='Expense Tag' />
                                    </Form.Group>
                                    <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
                                        <Form.Label>Date</Form.Label><br></br>
                                        <LocalizationProvider dateAdapter={AdapterDayjs} className="mb-3 col-lg-12">
                                            <DatePicker name='date' value={inputdata.date} onChange={(x, event) => setFechaDesde(x, event)} defaultDate={new Date()} />
                                        </LocalizationProvider>
                                    </Form.Group>
                                    <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
                                        <Form.Label>Cost</Form.Label>
                                        <div style={{ display: 'flex' }}>
                                            <div class="input-group-prepend"><span class="input-group-text">د.إ</span></div>
                                            <Form.Control type="text" name='cost' value={inputdata.cost} onChange={setInputValue} placeholder='Cost' />
                                        </div>
                                    </Form.Group>
                                    <Form.Group className="mb-3 col-lg-12" controlId="formBasicEmail">
                                        <Form.Label>Description<sub>(Optional)</sub></Form.Label><br></br>
                                        <TextField className="mb-3 col-lg-12"
                                            id="outlined-multiline-flexible"
                                            name="notes"
                                            label="Notes"
                                            multiline
                                            maxRows={4} value={inputdata.notes} onChange={setInputValue}
                                        />
                                        {/* <Form.Control type="text" name='mobile' value={inputdata.mobile} onChange={setInputValue} placeholder='Notes' /> */}
                                    </Form.Group>
                                    <Form.Group className="mb-3 col-lg-12" >
                                        <Button variant="primary" type="submit" className="btn-custom-add" onClick={handleSubmit} >
                                            Add Expense
                                        </Button>
                                    </Form.Group>
                                </Row>
                            </Form>
                        </CustomTabPanel>

                    </Box>
                </Card><ToastContainer position="top-right" />
            </div>
        </>
    )
}
export default ExpenseManagement;