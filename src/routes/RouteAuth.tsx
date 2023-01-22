
import { ReactElement, ReactNode } from "react";
import { Navigate, Route, RouteProps, useLocation } from "react-router-dom"
import { useAuth } from "../context/AuthContext";
import Dashboard from "../pages/Dashboard";


type RoutesProps = RouteProps & {
  isPrivate: boolean;
  component: React.ComponentType 
}

type RouterProps = {
  isPrivate?: boolean;
  children: JSX.Element;
}

export default function RouterAuth({children, isPrivate = false}: RouterProps): JSX.Element  {
  const { user } = useAuth();
  const location = useLocation();

  //  return user ? (<Navigate to="/dashboard" state={{ from: location }} replace />) : (children) 

  // if(user) {
  //   return <Navigate to='/dashboard' state={{ from: location }} replace />;
  // } else {
  //   return children;
  // }


  // return (
  //   <Route {...rest} element={
  //     isPrivate  === !!user ? (
  //       <Component />
  //     ) : (
  //       isPrivate ? <Navigate to='/' replace/> : <Dashboard />
  //     )
  //   }
  //   />
  // )

  return (
    isPrivate  === !!user ? (
      children
    ) : (
      isPrivate ? <Navigate to='/' state={{ from: location }} replace/> : 
        <Navigate to='/dashboard' state={{ from: location }} replace/>
    )
  )
}