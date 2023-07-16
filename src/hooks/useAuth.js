import AuthContext from "@/contexts/AuthContext";
import { useContext } from "react";


const UseAuth = () => {
    const auth = useContext(AuthContext);
    const isClient = typeof window !== 'undefined';
    if(!isClient && !auth) return {};
    if(!auth){
        throw new Error(
            'You must wrap your application with AuthProvider to use the UseAuth'
        );
    }
    return auth;
};

export default UseAuth;