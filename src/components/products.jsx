import React from "react";
import "whatwg-fetch";
import MovieCard from "./movie.jsx";
    


const APIKEY = "e3231a1d9963646f334432216dfd57bf";
const BASE_URL = "https://api.themoviedb.org/3";
const DISCOVER_API = BASE_URL + "/discover/movie?api_key=" + APIKEY;
const GENRES_API = BASE_URL + "/genre/movie/list?api_key=" + APIKEY;
const TEXT_API = BASE_URL + "/search/movie?api_key=" + APIKEY + "&language=en-US&query="
const IMG = "http://image.tmdb.org/t/p/size";

var genreAPIString;
export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            results:[]
        };
    }
    componentDidMount() {
        this.getMovies();
    }
    getMovies(){
        fetch(DISCOVER_API)
                    .then(response => response.json())
                    .then(data => this.setState({movies: data}))  
                    .catch(err => alert(err.message));
        fetch(GENRES_API)
                    .then(response => response.json())
                    .then(data => this.setState({genres: data}))  
                    .catch(err => alert(err.message));
    }

    getMoviesWithGenres(){
        fetch(DISCOVER_API)
                    .then(response => response.json())
                    .then(data => this.setState({movies: data}))  
                    .catch(err => alert(err.message));
    }
    
    refreshMovies(apiCall){
        fetch(apiCall)
                    .then(response => response.json())
                    .then(data => this.setState({movies: data}))  
                    .catch(err => alert(err.message));
    }
    setGenre(genreID){
        if(genreID == 0 || genreID == ""){
            genreAPIString = DISCOVER_API+"&with_genres=";
        } else {
            genreAPIString = DISCOVER_API+"&with_genres="+genreID;
        }
        this.refreshMovies(genreAPIString);
    }
    handleChange(event){
        if(event.target.value.trim() != ""){   
            genreAPIString = TEXT_API+event.target.value;
            this.refreshMovies(TEXT_API+event.target.value);
        } else {
            genreAPIString = "";     
            this.getMovies();
        }
    }

    render() {
        var totalPages;
        var movies;          
        var movieCards;
        var nextPage;
        var previousPage;
        var genreCards;

        if(genreAPIString == ""){
            genreAPIString = ""
        }
        if(this.state.genres){
            var totalGenres = this.state.genres.genres.length;
            genreCards = this.state.genres.genres.map(genre => 
                  <button onClick={() => this.setGenre(genre.id)} className="mdl-button mdl-js-button mdl-js-ripple-effect" key={genre.id} >{genre.name}</button>
                );
        }
        if(!genreAPIString){
            genreAPIString = DISCOVER_API+"&with_genres=";
        }

     
        if (this.state.movies) {
                nextPage = this.state.movies.page+1;
                previousPage = this.state.movies.page-1;
                
                if(this.state.movies.total_results == 0){
                    totalPages = 
                    (
                    <p className="logo-font android-sub-slogan noselect">
                        No results found. 
                    </p>
                    )
                } else if(this.state.movies.total_pages ==1){
                    totalPages = 
                    (
                    <p className="logo-font android-sub-slogan noselect">
                        Page {this.state.movies.page} of {this.state.movies.total_pages}
                    </p>
                    
                    ); 
                    
                } else if(this.state.movies.page == 1){
                    totalPages = 
                    (
                    <p className="logo-font android-sub-slogan noselect">
                        <i className="material-icons" id="pagesStyle2">chevron_left</i>
                        Page {this.state.movies.page} of {this.state.movies.total_pages}
                        
                        <i className="material-icons" id="pagesStyle" onClick={() => this.refreshMovies(genreAPIString+"&page="+nextPage)}>chevron_right</i>
                    </p>
                    
                    );
                } else if(this.state.movies.page == this.state.movies.total_pages){
                    totalPages = 
                    (
                    <p className="logo-font android-sub-slogan noselect">
                        <i className="material-icons" id="pagesStyle" onClick={() => this.refreshMovies(genreAPIString+"&page="+previousPage)}>chevron_left</i>
                        Page {this.state.movies.page} of {this.state.movies.total_pages}
                    </p>
                    
                    );
                } else {
                    totalPages = 
                    (
                    <p className="logo-font android-sub-slogan noselect">
                    <i className="material-icons" id="pagesStyle" onClick={() => this.refreshMovies(genreAPIString+"&page="+previousPage)}>chevron_left</i>
                    Page {this.state.movies.page} of {this.state.movies.total_pages}
                    <i className="material-icons" id="pagesStyle" onClick={() => this.refreshMovies(genreAPIString+"&page="+nextPage)}>chevron_right</i>
                    </p>
                    );
                }


                movieCards = this.state.movies.results.map(movie => 
                
                    <MovieCard key={movie.id} movie={movie}>

                    </MovieCard>
                );
                
        }      

        return  (
        <div>
  
        <a name="top"></a>

            <div className="android-more-section">

                <div>
                    <div className="android-section-title mdl-typography--display-1-color-contrast">
                        Shop movies by Genre     
                        
                                <form className="formSearch" onSubmit={event => this.handleSubmit(event)}>
                                     <label className="mdl-button mdl-js-button mdl-button--icon" htmlFor="search-field">
                                    <i className="material-icons">search</i>
                                    </label>
                                    <div className="mdl-textfield mdl-js-textfield">
                                        <input className="mdl-textfield__input" onChange={event => this.handleChange(event)} type="text" id="sample1"></input>
                                    </div>
       
                                </form>
                    </div>
                    {totalPages}
                    <button onClick={() => this.setGenre(0)} className="mdl-button mdl-js-button mdl-js-ripple-effect" key={0}>Popular</button>
                    {genreCards}
                    <div className="android-card-container mdl-grid">

                                {movieCards}
                    </div>

                </div>
            </div>
        </div>


        );
    }
    
}

