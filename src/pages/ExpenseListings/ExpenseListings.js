import { useContext, useEffect, useState } from "react";
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import DashboardMenuLinks from "../../components/DashboardMenuLinks";
import { Box, Button, Card, Container, IconButton, Paper, TableContainer, Typography } from "@mui/material";
import { fetchexpenselist, expensedeletefunc, exportexpensetocsvfunc } from "../../services/Apis";
import Tooltip from '@mui/material/Tooltip';
import Toolbar from '@mui/material/Toolbar';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import Spiner from "../../components/Spiner/Spiner";
import Tables from "../../components/TablesExpense/Tables";
import './listings.css';
import Form from "react-bootstrap/Form"
import Dropdown from 'react-bootstrap/Dropdown';
import { useNavigate } from "react-router-dom";
import { addExpense, deltExpData, updateExpenseData } from "../../components/context/ContextProvider";
import { ToastContainer, toast } from "react-toastify"
import Alert from 'react-bootstrap/Alert';

function EnhancedTableToolbar(props) {
    const { numSelected } = props;
    const navigate = useNavigate();
    const expenseadd = () => {
        navigate('/expensemanagement');
    }
    return (
        <Toolbar
            sx={{
                pl: { sm: 2 },
                pr: { xs: 1, sm: 1 },
                ...(numSelected > 0 && {
                    bgcolor: (theme) =>
                        alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
                }),
            }}
        >
            {(
                <Typography
                    sx={{ flex: '1 1 100%' }}
                    variant="h6"
                    id="tableTitle"
                    component="div"
                    className="typo-listings-custom"
                >
                    Expense Listings
                </Typography>
            )}

            {(
                <div className='add_btn btn-expense-listing'>
                    <Button variant="primary" className="search_btn_custom_filled" onClick={expenseadd}><i className='fa fa-solid fa-plus'></i>&nbsp;Add Expense</Button>
                </div>
            )}
        </Toolbar>
    );
}

EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
};

function ExpenseListings() {
    const [listData, setListData] = useState([]);
    const [showspin, setShowSpin] = useState(true);
    const [search, setSearch] = useState("");
    const [selected, setSelected] = useState([]);
    const [sort, setSort] = useState("new");
    const [page, setPage] = useState(1);
    const [pageCount, setPageCount] = useState(0);
    const { delte, setDelet } = useContext(deltExpData);
    const { updateexp, setUpdateExp } = useContext(updateExpenseData);
    const { expenseadd, setExpenseadd } = useContext(addExpense);

    const fetchExpData = async () => {
        const items = JSON.parse(localStorage.getItem('auth'));
        const user_id = items.user.user_id;
        const response = await fetchexpenselist(user_id, page, search);
        if (response.status === 200) {
            setListData(response.data.expenselist);
            setPageCount(response.data.Pagination.pageCount);
        } else {
            console.log("error for get user data");
        }
    }



    useEffect(() => {
        fetchExpData();
        setTimeout(() => {
            setShowSpin(false);
        }, 1200)
    }, [search, page])

    const handlePrevious = () => {
        setPage(() => {
            if (page === 1) return page;
            return page - 1;
        })
    }


    const handleNext = () => {
        setPage(() => {
            if (page === pageCount) return page;
            return page + 1;
        })
    }

    const deleteExpense = async (id) => {
        const response = await expensedeletefunc(id);
        if (response.status === 200) {
            fetchExpData();
            setDelet(response.data);
        } else {
            toast.error("error");
        }
    }

    const exportexpense = async () => {
        const response = await exportexpensetocsvfunc();
        if (response.status === 200) {
            window.open(response.data.downloadUrl, "blank")
        } else {
            toast.error("Failed to Download!");
        }
    }

    return (
        <>
            {
                updateexp ?
                    <Alert variant="primary" onClose={() => setUpdateExp("")} dismissible>
                        {updateexp.expense_label.toUpperCase()} Successfully updated
                    </Alert> : ""
            }
            {
                expenseadd ?
                    <Alert variant="primary" onClose={() => setExpenseadd("")} dismissible>
                        {expenseadd.expense_label.toUpperCase()} Successfully Added
                    </Alert> : ""
            }
            <div style={{ display: 'flex' }}>
                <DashboardMenuLinks active="expenselistings" />
                <Card className="container-div pt-b-8">
                    {/* <Container> */}
                    <Box sx={{ width: '100%' }}>
                        <Paper sx={{ width: '100%', mb: 2 }}>
                            <EnhancedTableToolbar numSelected={selected.length} />
                            <div className="main_div">
                                {/* search add btn */}
                                <div className="search_add d-flex justify-content-between">
                                    <div className="search">
                                        <Form className="d-flex">
                                            <Form.Control
                                                type="search"
                                                placeholder="Search"
                                                aria-label="Search"
                                                onChange={(e) => setSearch(e.target.value)}
                                            />
                                            <Button variant="success" className='search_btn_custom'>Search</Button>
                                        </Form>
                                    </div>
                                    {/* <div className='add_btn'>
                                            <Button variant="primary" className="search_btn_custom_filled"><i className='fa fa-solid fa-plus'></i>&nbsp;Add Expense</Button>
                                        </div> */}
                                </div>
                                {/* export ,gender,status */}
                                {/* <div className="filter_div mt-4 d-flex justify-content-between flex-wrap">

                                        <div className="filter_newold">
                                            <h6>Sort by Value</h6>
                                            <Dropdown className='text-center'>
                                                <Dropdown.Toggle className='dropdown_btn' id="dropdown-basic">
                                                    <i className='fa fa-solid fa-sort'></i>
                                                </Dropdown.Toggle>
                                                <Dropdown.Menu>
                                                    <Dropdown.Item onClick={() => setSort("new")}>New</Dropdown.Item>
                                                    <Dropdown.Item onClick={() => setSort("old")}>Old</Dropdown.Item>
                                                </Dropdown.Menu>
                                            </Dropdown>
                                        </div>
                                    </div> */}
                                <div className="export_csv">
                                    <Button className="export_btn_csv" onClick={exportexpense}><i className="fa fa-solid fa-download"></i>Export to CSV</Button>
                                </div>
                            </div>
                            <TableContainer>
                                {
                                    showspin ? <Spiner /> : <Tables
                                        userdata={listData}
                                        deleteExpense={deleteExpense}
                                        fetchExpData={fetchExpData}
                                        handlePrevious={handlePrevious}
                                        handleNext={handleNext}
                                        page={page}
                                        pageCount={pageCount}
                                        setPage={setPage}
                                    />
                                }
                            </TableContainer>
                        </Paper>
                    </Box>
                    {/* </Container> */}
                </Card><ToastContainer position="top-right" />
            </div>
        </>
    )
}
export default ExpenseListings;