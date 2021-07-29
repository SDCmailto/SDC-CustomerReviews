import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';

ReactDOM.render(<App />, document.getElementById("reviews"))
//calls render on component and inserts html into target div
// ReactDOM.hydrate(<App />, document.getElementById("reviews"))
  //skips that step because html content already there
    //assumes that node is already rendered

//server-side rendering is useful for:
  //allows page to load much more quickly
  //scan a page for content to add to preview
  //allows search engine to index your site

  //instead of an html file that generates static steps
    //use functions to create static steps in code
    //minify (webpack in production mode)
    //compress

//client-side rendering is useful for:
//const renderComponents