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
              <div className="input-group">
                <input type="text" className="form-control" id="searchfield"
                       placeholder="Search Here"
                       onChange={()=> this.search()}/>
              </div>
            </div>
        )
    }

}
export default Search;