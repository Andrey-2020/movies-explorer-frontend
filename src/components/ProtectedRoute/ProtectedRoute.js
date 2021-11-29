import React from 'react';
import { Redirect, Route } from 'react-router-dom';
const ProtectedRoute = ({ isLogged, loading, ...routeProps }) => {
    return  (loading ?  <div>'...Loading'</div> : (isLogged ? <Route {...routeProps} /> : <Redirect to="/" /> ) )
   
};
export default ProtectedRoute;