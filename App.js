import React, { Component } from 'react';
import './App.css';
import Home from './container/Home';
import Header from './components/Header';
import Footer from './components/Footer';
import Subscribe from './components/Subscribe';
import Space from './components/UI/Space';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import ContactUs from './container/Contact';
import AboutUs from './container/AboutUs';
import RecipeList from './container/RecipeList';
import Recipe from './components/Recipe';
import { type, data } from 'jquery';
import style from '../src/container/RecipeList/recipe.module.css';

class App extends Component {

    constructor(props) {
      super(props);
      this.state = {
        recipes: [],
      };
    }

    componentDidMount() {
      fetch('https://api.airtable.com/v0/appHnFBXX1z9BVJD9/AllRecipes?api_key=key3seLtvVXPJrYRz')
        .then((resp) => resp.json())
        .then(data => {
          console.log(data);
          this.setState({ recipes: data.records });
        })
        .catch(err => {
          //Error
        });
    }


  render() {

    return (
    <Router>
      <div className = "App">
        <Header/>
        <Route path="/" exact component={Home}/>
        <Route path="/contact-us" component={ContactUs} />
        <Route path="/recipelist" component={RecipeList} />
        <Route path="/about-us" component={AboutUs} />
        <Route path="/recipe/:recipeID" component={Recipe} />
        <Space/>
        <Subscribe/>
        <Footer/>
      </div>  
        <div>
          <h1>Recipe List</h1>
          <form className="search-form">
            <input className="search-bar" type="text" />
            <button className="search-button" type="submit">
              Search
                </button>
          </form>
          <div className="RecipeList">
            <div class="container">
                  {this.state.recipes.map(recipe => <RecipesCard {...recipe.fields} />)}
            </div>
          </div>
        </div >
    )
    </Router>
    );
  }
}

export default App;

const RecipesCard = ({ title, category, description, image }) => (
  <div className={style.recipestyle}>
    <img className={style.imagestyle} src={image[0].url} alt="Recipe Photo" />
    <div className="card-body">
      <h5 className="card-title">{title}</h5>
      <p className="card-text">{description}</p>
      <p className="card-text">
        <small className="text-muted">{category}</small>
      </p>
    </div>
  </div>
);

