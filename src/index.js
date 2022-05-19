
import React from "react";
import ReactDOM from "react-dom/client";
import {BrowserRouter} from 'react-router-dom'
import DBLoader from 'components/DBLoader';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
		<BrowserRouter>
			<link rel="stylesheet" href="https://use.typekit.net/mfi0mww.css"/>
			<DBLoader/>
		</BrowserRouter>
  </React.StrictMode>
);



// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

