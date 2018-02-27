import React, { Component } from 'react';
import './App.css';

class Search extends Component{
    constructor(props,context){
        super(props,context);
        this.search = this.search.bind(this);
    }
    search(){
        this.props.search();
    }
    render(){
        return(
            <div className="header">
                <input type="text" id="searchfield"></input>
                <button onClick={()=> this.search()}>Search</button>
            </div>
        )
    }

}
export default Search;
