import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Nav from '../components/Nav/Nav';
import Add from '../pages/Add/Add';
import Home from '../pages/Home/Home';
import LogOrSingIn from '../pages/LogOrSignIn/LogOrSignIn';
import ShowData from '../pages/ShowData/ShowData';
import PrivateRoute from './PrivateRoute';

function Router() {

	const id = false

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
