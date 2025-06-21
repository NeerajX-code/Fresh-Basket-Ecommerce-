import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const Authwrapper = ({ children }) => {
const {user} = useSelector((state) => state.user);
    useEffect(() => {
     
    }, [user])
    
     return user ? children : <Navigate to="/Login" />
}

export default Authwrapper