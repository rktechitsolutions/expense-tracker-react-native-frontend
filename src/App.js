import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Headers from './components/Headers/Headers';
import Home from './pages/Home/Home';
import Edit from './pages/Edit/Edit';
import Profile from './pages/Profile/Profile';
import Register from './pages/Register/Register';
import Login from './pages/Login/Login';
import Dashboard from './pages/Dashboard/Dashboard';
import Pagenotfound from './pages/Pagenotfound/Pagenotfound';
import ExpenseManagement from './pages/ExpenseManagement/ExpenseManagement';
import ExpenseListings from './pages/ExpenseListings/ExpenseListings';
import EditExpense from './pages/EditExpense/EditExpense';
import MonthlyReports from './pages/MonthlyReports/MonthlyReports';
import { Routes, Route } from "react-router-dom";
import Footer from './components/Footer';
import ExpenseCategory from './pages/ExpenseCategory/ExpenseCategory';
import EditCategoryExpense from './pages/EditCategoryExpense/EditCategoryExpense';
import ForgotPassword from './pages/ForgotPassword/ForgotPassword';
import ResetPassword from './pages/ResetPassword/ResetPassword';
import { useEffect, useState } from 'react';

function App() {
  // const [userLogged, setUserLogged] = useState(
  //   JSON.parse(localStorage.getItem("auth"))
  // );


  return (
    <>
      <Headers />
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/expensecategory' element={<ExpenseCategory />} />
        <Route path='/expensemanagement' element={<ExpenseManagement />} />
        <Route path='/expenselistings' element={<ExpenseListings />} />
        <Route path='/editcategoryexpense/:id' element={<EditCategoryExpense />} />
        <Route path='/editexpense/:id' element={<EditExpense />} />
        <Route path='/monthlyreports' element={<MonthlyReports />} />
        <Route path='/edit/:id' element={<Edit />} />
        <Route path='/userprofile/:id' element={<Profile />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/forgotpassword' element={<ForgotPassword />} />
        <Route path='/resetpassword/:id' element={<ResetPassword />} />
        <Route path='/*' element={<Pagenotfound />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
