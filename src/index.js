import React from "react";
import {render} from "react-dom";
import {Router, Route, IndexRoute, hashHistory} from "react-router";

import App from "./components/app.jsx";
import Cart from "./components/cart.jsx";
import Products from "./components/products.jsx";

//import our stylesheet so webpack puts it into the bundle
import "./css/main.css";


//TODO: replace the JSX here with a Router configuration
//from the react router module (already a dependency in package.json)
render((    
    <Router history={hashHistory}>
        <Route path="/" component={App}>
            <IndexRoute component={Products}></IndexRoute>
            <Route path="/cart" component={Cart}></Route>
        </Route>
    </Router>
    ), document.getElementById("app"));

