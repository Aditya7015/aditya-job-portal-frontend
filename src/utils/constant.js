// Toggle this flag to switch between local & deployed backend
const IS_LOCAL = false;  

const LOCAL_BASE = "http://localhost:8000/api/v1";
const DEPLOYED_BASE = "https://aditya-job-portal-backend.onrender.com/api/v1";

const BASE_URL = IS_LOCAL ? LOCAL_BASE : DEPLOYED_BASE;

export const USER_API_END_POINT = `${BASE_URL}/user`;
export const JOB_API_END_POINT = `${BASE_URL}/job`;
export const APPLICATION_API_END_POINT = `${BASE_URL}/application`;
export const COMPANY_API_END_POINT = `${BASE_URL}/company`;
