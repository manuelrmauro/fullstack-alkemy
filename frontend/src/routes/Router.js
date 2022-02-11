import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Nav from '../components/Nav/Nav';
import Add from '../pages/Add/Add';
import Home from '../pages/Home/Home';
import Loading from '../pages/Loading/Loading';
import LogOrSingIn from '../pages/LogOrSignIn/LogOrSignIn';
import ShowData from '../pages/ShowData/ShowData';
import { startCheking } from '../redux/actions/authActions';
import PrivateRoute from './PrivateRoute';

function Router() {

  const dispatch = useDispatch();
  const { checking, id } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(startCheking());
  }, [dispatch]);

  if (checking) {
    return <Loading />;
  }

	return (
		<BrowserRouter>
		{!!id && <Nav/>}
		{!!id ? 
		<Routes>
			<Route path="/" element={<PrivateRoute isAuthenticated={!!id}><Home/></PrivateRoute>} />
			<Route path="/incomes" element={<PrivateRoute isAuthenticated={!!id}><ShowData type='Incomes'/></PrivateRoute>} />
			<Route path="/expenses" element={<PrivateRoute isAuthenticated={!!id}><ShowData type='Expenses'/></PrivateRoute>} />
			<Route path="/add" element={<PrivateRoute isAuthenticated={!!id}><Add/></PrivateRoute>} />
			<Route path="*" element={<Navigate replace to='/'/>} />
		</Routes> :
		<Routes>
			<Route path="/" element={<LogOrSingIn isRegister={true}/>} />
			<Route path="/login" element={<LogOrSingIn/>} />
			<Route path="*" element={<Navigate replace to='/'/>} />
		</Routes>
		}	
		</BrowserRouter>
	);
}

export default Router;
