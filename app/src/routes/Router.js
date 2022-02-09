import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Nav from '../components/Nav/Nav';
import Add from '../pages/Add/Add';
import Home from '../pages/Home/Home';
import ShowData from '../pages/ShowData/ShowData';

function Router() {
	return (
		<BrowserRouter>
		<Nav/>
			<Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/incomes" element={<ShowData type='Incomes'/>} />
        <Route path="/expenses" element={<ShowData type='Expenses'/>} />
        <Route path="/add" element={<Add/>} />
      </Routes>
		</BrowserRouter>
	);
}

export default Router;
