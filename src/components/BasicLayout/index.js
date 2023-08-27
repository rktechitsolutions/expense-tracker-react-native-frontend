import { Button, Card, Container, Link, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import './basic.css';
import logoImg from '../../assets/images/expenses-calculation-6482746-5373624.png';
import { useNavigate } from "react-router-dom";

function BasicLayout({ image, children }) {
    const items = JSON.parse(localStorage.getItem('auth'));

    const user_id = items === null ? "" : items.user.user_id;
    const navigate = useNavigate();

    // items === null && navigate('/login')

    const handlelogout = () => {
        localStorage.removeItem("auth");
        navigate('/login');
    }

    return (
        <>
            <Box>
                <Card className="box-bg-color">
                    <Container>
                        <Box className="outer-header">
                            <img src={logoImg} alt="Expense Logo" className="expense-logo" />
                            <Box className="menu-bar-outer-header">
                                Expense Calculator
                            </Box>
                        </Box>
                        {
                            user_id !== "" &&
                            <Button variant="primary" type="submit" className="sign-out-btn" onClick={handlelogout}>
                                <i className="fa fa-solid fa-power-off"></i> &nbsp;Sign Out
                            </Button>
                        }
                    </Container>
                </Card>
            </Box>
        </>
    )
}
export default BasicLayout;