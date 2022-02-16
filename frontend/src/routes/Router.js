import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Nav from '../components/Nav/Nav';
import Add from '../pages/Add/Add';
import Home from '../pages/Home/Home';
import Loading from '../pages/Loading/Loading';
import LogOrSingIn from '../pages/LogOrSignIn/LogOrSignIn';
import ShowData from '../pages/ShowData/ShowData';
import ConfirmEmail from '../components/ConfirmEmail/ConfirmEmail'
import { startCheking } from '../redux/actions/authActions';

function Router() {

  const dispatch = useDispatch();
  const { checking, id, email } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(startCheking());
  }, [dispatch]);

  if (checking) {
    return <Loading />;
  }

	return (
		<BrowserRouter>
		{!!id && <Nav email={email}/>}
		{!!id ? 
		<Routes>
			<Route path="/" element={<Home/>} />
			<Route path="/incomes" element={<ShowData type='Incomes'/>} />
			<Route path="/expenses" element={<ShowData type='Expenses'/>} />
			<Route path="/add" element={<Add/>} />
			<Route path='/confirm/:id' element={<ConfirmEmail />}/>
			<Route path="*" element={<Navigate replace to='/'/>} />
		</Routes> :
		<Routes>
			<Route path="/" element={<LogOrSingIn isRegister={true}/>} />
			<Route path="/login" element={<LogOrSingIn/>} />
			<Route path='/confirm/:id' element={<ConfirmEmail />}/>
			<Route path="*" element={<Navigate replace to='/'/>} />
		</Routes>
		}	
		</BrowserRouter>
	);
}

export default Router;
