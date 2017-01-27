import React from "react";
import "../css/main.css";
import {Link, IndexLink} from "react-router";
import ReactDOM from 'react-dom';

//import just the Redux store from our ./shared-state.js module
import {store} from "./shared-state.js";


export default class extends React.Component {
    constructor(props) {
        super(props);
        this.state = store.getState();
    }

    componentDidMount() {

        this.unsub = store.subscribe(() => this.setState(store.getState()));
    }

    componentWillUnmount() {
        this.unsub();
    }

    countPrice(){
        var totalItems = 0;
        this.state.carts.map(item => 
            totalItems += item.quantity
        )
        return totalItems;
    }

    render() {

        return  (
        <div>
                <div className="mdl-layout__container">

            <div className="mdl-layout mdl-js-layout mdl-layout--fixed-header">
                    <div className="android-header mdl-layout__header mdl-layout__header--waterfall">
                        <div className="mdl-layout__header-row">
                            <span id="pageTitle" className="android-title mdl-layout-title">
                            MOVIE SHOPPER
                            </span>
                            <div className="android-header-spacer mdl-layout-spacer"></div>
                              
                            <div className="android-navigation-container"  id="navigationpanel">
                                <nav className="android-navigation mdl-navigation">
                                    <Link className="mdl-navigation__link mdl-typography--text-uppercase" to="/" activeClassName="active">
                                    Products</Link>
                                    <Link className="mdl-navigation__link mdl-typography--text-uppercase" to="/cart" activeClassName="active">
                                    Cart({this.countPrice()})</Link>
                                </nav>
                            </div>
                        </div>
                    </div>
                    <div className="android-content mdl-layout__content">

                    <main>
                        {this.props.children}
                    </main>
                    </div>

                </div>
                </div>
            </div>
            
        );
    }
    
}



