// import React, { useContext } from "react";
// import { Navigate } from 'react-router';
// import { Route} from 'react-router-dom';
// import { AuthContext } from "../Context/AuthContext";

// function PrivateRoute({component:Component, ...rest}){
//     const { user } = useContext(AuthContext);

//     return (
//      <Route {...rest} render={props => {
//         return user ? <Component {...props}/> : <Navigate to="login"/> 
//      }} />
//    );
// }

// export default PrivateRoute;


import React, { useContext, useEffect } from "react";
import { Route, useNavigate } from 'react-router-dom';
import { AuthContext } from "../Context/AuthContext";

function PrivateRoute({component:Component}){
    const { user } = useContext(AuthContext);
    console.log('user inside Private Route', user);
    const navigate = useNavigate();
    
    useEffect(() => {
        if(!user){
          navigate('/login');
        }
    });

    return (
       <div>
           <Component />
       </div> 
   );
}

export default PrivateRoute;
