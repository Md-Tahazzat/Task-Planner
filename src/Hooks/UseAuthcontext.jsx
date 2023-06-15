import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";

const UseAuthcontext = () => (userInfo = useContext(AuthContext));
export default UseAuthcontext;
