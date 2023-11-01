import React from 'react'
import {useSelector} from "react-redux"
import {Navigate, useLocation} from "react-router-dom"

const ProtectedRoute = ({children}) => {
    const {Authorized} = useSelector((state) => state.Client );
    let location = useLocation();
    if(!Authorized) {
        return <Navigate to="/" state={{ from: location}} replace />
    }
 return children

};

export default ProtectedRoute;