
import './global.css'

import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion'
import { useLocation, Routes, Route } from "react-router-dom";
import { Helmet } from "react-helmet";

import Home   from './pages/Home/Home'

const Container = (p) => {
	return (
		<div className="flex col bgBeige">
			<div
				className="flex col center"
				style={{
					margin   : "0%",
					overflow :"hidden",
					height   : "100%",
					position : "fixed",
					width    : "100%"
				}}
			>
				{p.children}
			</div>
		</div>
	)
}

const App = (p) => {

	const db       = p.db;
	const location = useLocation();


	return    (
		<>
			<Helmet/>
			<Container>
				<AnimatePresence exitBeforeEnter>
					<Routes location={location} key={location.pathname}>

						<Route path="/"           element={<Home   db={db} />}/>

					</Routes>

				</AnimatePresence>
			</Container>
		</>
	);
}

export default App
