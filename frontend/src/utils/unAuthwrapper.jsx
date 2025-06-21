import React from 'react'

const UnAuthwrapper = () => {
 const {user} = useSelector((state) => state.user);
     return user ? children : <Navigate to="/Login" />
}

export default UnAuthwrapper