import React, { createContext, useEffect, useState } from 'react'
import axios from 'axios';

export const addData = createContext();
export const updateData = createContext();
export const updateExpenseData = createContext();
export const updateExpenseCategoryData = createContext();
export const deltData = createContext();
export const authData = createContext();
export const addExpense = createContext();
export const deltExpData = createContext();

const ContextProvider = ({ children }) => {

    const [useradd, setUseradd] = useState("");
    const [expenseadd, setExpenseadd] = useState("");
    const [update, setUpdate] = useState("");
    const [updateexp, setUpdateExp] = useState("");
    const [updateexpcategory, setUpdateExpCategory] = useState("");
    const [delte, setDelet] = useState("");
    const [delteexp, setDeletExp] = useState("");
    const [auth, setAuth] = useState({
        user: null,
        token: ""
    });

    // default axios
    axios.defaults.headers.common["Authorization"] = auth?.token;

    useEffect(() => {
        const data = localStorage.getItem('auth')
        if (data) {
            const parseData = JSON.parse(data);
            setAuth({
                ...auth,
                user: parseData.user,
                token: parseData.token
            })
        }
        // eslint-disable-next-line
    }, []);

    return (
        <>
            <authData.Provider value={[auth, setAuth]}>
                <addData.Provider value={{ useradd, setUseradd }}>
                    <updateData.Provider value={{ update, setUpdate }}>
                        <updateExpenseData.Provider value={{ updateexp, setUpdateExp }}>
                            <updateExpenseCategoryData.Provider value={{ updateexpcategory, setUpdateExpCategory }}>
                                <deltData.Provider value={{ delte, setDelet }}>
                                    <deltExpData.Provider value={{ delteexp, setDeletExp }}>
                                        <addExpense.Provider value={{ expenseadd, setExpenseadd }}>
                                            {children}
                                        </addExpense.Provider>
                                    </deltExpData.Provider>
                                </deltData.Provider>
                            </updateExpenseCategoryData.Provider>
                        </updateExpenseData.Provider>
                    </updateData.Provider>
                </addData.Provider>
            </authData.Provider>
        </>
    )
}

export default ContextProvider