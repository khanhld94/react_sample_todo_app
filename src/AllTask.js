import React, { Component } from 'react';
import Pagination from "./Pagination"

class AllTask extends Component{
    constructor(props,context){
        super(props,context);
        this.display = this.display.bind(this);
        this.pagination = this.pagination.bind(this)
        this.state={
            currentPage: 1
        }
    }
    display(item) {
        return <div key={item.key}>
            <li id={item.key}>{item.text}
            {item.status === 1 ?
                (
                <span className="icon" onClick={()=>{this.props.undone(item.key)}}><i style={{color:"green"}} className="fa-lg fa fa-check-circle"></i></span>
                )
                :
                (
                    <span className="icon" onClick={()=>{this.props.done(item.key)}}><i style={{color:"red"}} className="fa fa-lg fa-ban"></i></span>
                )}
                <button className="button btn-sm" onClick={()=>this.props.edit(item.key)}>Edit</button>
                <button className="button btn-sm btn-danger" onClick={()=>this.props.remove(item.key)}>Delete</button>
            </li>
        </div>
    }
    pagination(page){
        this.setState({
            currentPage: page
        })
    }


    render(){
        let allItem = this.props.allItems
        let pagiItem
        if(this.state.currentPage - 1 === Math.floor(allItem.length/5)){
            pagiItem = allItem.slice(5*(this.state.currentPage-1), allItem.length)
        }
        else{
            pagiItem = allItem.slice(5*(this.state.currentPage-1),5*this.state.currentPage)
        }
        let task = allItem.length <= 5 ? allItem.map(this.display)
            : pagiItem.map(this.display)
        return(
            <div>
                <ul className="theList">{task}</ul>
                <Pagination allItems={this.props.allItems}
                            pagination={this.pagination}/>
            </div>
        )
    }
}
export default AllTask;