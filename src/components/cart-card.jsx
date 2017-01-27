import React from "react";
var posterPath = "http://image.tmdb.org/t/p/w154/";
const IMG = "http://image.tmdb.org/t/p/size";
import {store, removeCart} from "./shared-state.js";
import {addCart, removeAll} from "./shared-state.js";

import numeral from "numeral";

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
        if(this.props.movie.title.backdrop_path){
            image = "http://image.tmdb.org/t/p/w780/"+this.props.movie.title.backdrop_path;
        } else {
            image = "https://secure.static.tumblr.com/7032fac7091015e342cc53dc7f060a57/h5hzqjh/g4Do482l2/tumblr_static_optica_pattern_05_640.png"
        }
        var divStyle = {
            backgroundImage: 'url(' + image + ')',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
        };     
        var tdStyle = {
            width: '60%'
        } 
        var tdStyle2 = {
            width: '13.3%',
            verticalAlign: 'middle',
            textAlign: 'center'
        }
        var trStyle = {
            marginBottom: '5px',
            
        }

        var supportTextStyle = {
            paddingTop: '5px',
            marginBottom: '15px',
            paddingBottom: '30px'
        }

        var textStyle = {
            paddingBottom: '15px',
            fontSize:'20px'
        }
        var divStyle2 = {
            height: '237px'
        }
        var spanStyle = {
            fontSize: '15px'
        }
        return (
            <tr style={trStyle}>
            <td style={tdStyle}>
         <section className="section--center mdl-grid mdl-grid--no-spacing ">
            <header style={divStyle} className="section__play-btn mdl-cell mdl-cell--3-col-desktop mdl-cell--2-col-tablet mdl-cell--4-col-phone mdl-color--teal-100 mdl-color-text--white">
            </header>
            <div style={divStyle2} className="mdl-card mdl-cell mdl-cell--9-col-desktop mdl-cell--6-col-tablet mdl-cell--4-col-phone">
              <div style={supportTextStyle} className="mdl-card__supporting-text">
                <h4 style={textStyle} className="mdl-card__title-text">{this.props.movie.title.title}</h4>
                <span style={spanStyle} className="mdl-typography--font-light mdl-typography--subhead">{this.truncate(this.props.movie.title.overview)}
                    
                
                </span>          
                </div>
              <div className="mdl-card__actions">

              <button onClick={() => store.dispatch(removeAll(this.props.movie.id))} className="mdl-button mdl-js-button mdl-button--primary noselect">
                Remove all
              </button>

              </div>
            </div>
          </section>   
          </td>
          <td style={tdStyle2}>{this.props.movie.format}</td>
          <td className ="noselect" style={tdStyle2}>
            <button className="mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect noselect">
            <i className="material-icons" onClick={() => store.dispatch(removeCart(this.props.movie.id))}>remove</i>
            </button>          
            {this.props.movie.quantity}
            <button className="mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect noselect">
            <i className="material-icons" onClick={() => store.dispatch(addCart(this.props.movie))}>add</i>
            </button>
          </td>
          <td style={tdStyle2}>{numeral(this.props.movie.price * this.props.movie.quantity).format('$0,0.00')}</td>
          
        </tr>
        );
    }
}

                       
     