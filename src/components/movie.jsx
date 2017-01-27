import React from "react";
var posterPath = "http://image.tmdb.org/t/p/w154/";
const IMG = "http://image.tmdb.org/t/p/size";
import {store, addCart} from "./shared-state.js";

export default class extends React.Component {
    constructor(props) {
        super(props);
    }

    truncate(s){
        if(s.length > 300){
            return <span>{s.substring(0,300)}...... <span className="readMore">Read More</span></span>
        } 
        return s;
    }

    render() {
        let image;
        if(this.props.movie.backdrop_path){
            image = "http://image.tmdb.org/t/p/w780/"+this.props.movie.backdrop_path;
        } else {
            image = "https://secure.static.tumblr.com/7032fac7091015e342cc53dc7f060a57/h5hzqjh/g4Do482l2/tumblr_static_optica_pattern_05_640.png"
        }
        var cartItemDVD = {title:this.props.movie, format:"DVD", quantity:1, price: "14.95", id:this.props.movie.id+"DVD"};
        var cartItemBR = {title:this.props.movie, format:"Blu-Ray", quantity:1, price: "19.95", id:this.props.movie.id+"BlueRay"};
        return (
 
                <div className="mdl-cell mdl-cell--3-col mdl-cell--4-col-tablet mdl-cell--4-col-phone mdl-card mdl-shadow--3dp">
                    <div className="mdl-card__media">
                        <img className="posterImage" src={image}></img>
                    </div>   
                    
                    <div className="mdl-card__title">
                        <h4 className="mdl-card__title-text">{this.props.movie.title}</h4>
                    </div>   
                    <div className="mdl-card__supporting-text">
                        <span className="mdl-typography--font-light mdl-typography--subhead">{this.truncate(this.props.movie.overview)}</span>
                    </div>
                    <div className="mdl-card__actions">
                        <a className="android-link mdl-button mdl-js-button mdl-typography--text-uppercase noselect" 
                        onClick={() => store.dispatch(addCart(cartItemDVD))} >

                        BUY ON DVD
                        <i className="material-icons">chevron_right</i>
                        </a>
                        <a className="android-link mdl-button mdl-js-button mdl-typography--text-uppercase noselect" 
                        onClick={() => store.dispatch(addCart(cartItemBR))} >

                        BUY ON BLU-RAY
                        <i className="material-icons">chevron_right</i>
                        </a>
                    </div>               
                </div>      

        );
    }
}

              