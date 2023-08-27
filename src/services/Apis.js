import { commonrequest } from "./ApiCall";
import { BASE_URL } from "./helper"


export const registerfunc = async (data, header) => {
    return await commonrequest("POST", `${BASE_URL}/user/register`, data, header);
}

export const resetpwdfunc = async (data) => {
    return await commonrequest("POST", `${BASE_URL}/user/resetpwd`, data);
}

export const sendemailviabe = async (data) => {
    return await commonrequest("POST", `${BASE_URL}/user/sendemailbe`, data);
}

export const expenseaddfunc = async (data, header) => {
    return await commonrequest("POST", `${BASE_URL}/expense/add`, data, header);
}

export const categoryaddfunc = async (data, header) => {
    return await commonrequest("POST", `${BASE_URL}/category/add`, data, header);
}

export const expensereportgenerate = async (data, header) => {
    return await commonrequest("POST", `${BASE_URL}/expensereportgenerate`, data, header);
}

export const fetchexpenselist = async (id, page, search) => {
    return await commonrequest("GET", `${BASE_URL}/fetchexpenselist/?id=${id}&page=${page}&search=${search}`, "");
}

export const fetchexpensecatlist = async (id) => {
    return await commonrequest("GET", `${BASE_URL}/fetchexpensecatlist/${id}`, "");
}

export const userloginfunc = async (data) => {
    return await commonrequest("POST", `${BASE_URL}/user/login`, data);
}

export const usergetfunc = async (search, gender, stats, sort, page) => {
    return await commonrequest("GET", `${BASE_URL}/user/details?search=${search}&gender=${gender}&status=${stats}&sort=${sort}&page=${page}`, "");
    // pass query params if we want to do multiple jobs not just single param is available
}

export const getsingleexpense = async (id) => {
    return await commonrequest("GET", `${BASE_URL}/singleexpense/${id}`, "");
}

export const getsingleexpensecategory = async (id) => {
    return await commonrequest("GET", `${BASE_URL}/singleexpensecategory/${id}`, "");
}

export const getexpensecategorywise = async (id) => {
    return await commonrequest("GET", `${BASE_URL}/getexpensecategorywise/${id}`, "");
}

export const sendpasswordresetlink = async (data) => {
    return await commonrequest("POST", `${BASE_URL}/sendpasswordresetlink`, data);
}

export const getsingleuserprofile = async (id) => {
    return await commonrequest("GET", `${BASE_URL}/user/${id}`, "");
}

export const editfunc = async (id, data, header) => {
    return await commonrequest("PUT", `${BASE_URL}/user/edit/${id}`, data, header);
}

export const editcategoryfunc = async (id, data) => {
    return await commonrequest("PUT", `${BASE_URL}/editexpensecategory/${id}`, data);
}

export const editexpensefunc = async (id, data) => {
    return await commonrequest("PUT", `${BASE_URL}/editexpense/${id}`, data);
}

export const expensedeletefunc = async (id) => {
    return await commonrequest("DELETE", `${BASE_URL}/expense/delete/${id}`, {});
}

export const expensecategorydeletefunc = async (id) => {
    return await commonrequest("DELETE", `${BASE_URL}/expensecategory/delete/${id}`, {});
}

export const userdeletefunc = async (id) => {
    return await commonrequest("DELETE", `${BASE_URL}/user/delete/${id}`, {});
}

export const statuschangefunc = async (id, data) => {
    return await commonrequest("PUT", `${BASE_URL}/user/statusupdate/${id}`, { data });
}

export const exportexpensetocsvfunc = async () => {
    return await commonrequest("GET", `${BASE_URL}/userexpenseexport`, "");
}

export const exporttocsvfunc = async () => {
    return await commonrequest("GET", `${BASE_URL}/userexport`, "");
}