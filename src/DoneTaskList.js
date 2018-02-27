import React, { Component } from 'react';
import './App.css';

class DoneTaskList extends Component{
    constructor(props, context) {
        super(props, context);
        this.createTasks = this.createTasks.bind(this);

    }
    remove(key){
        this.props.remove(key)
    }
    undone(key){
        this.props.undone(key)
    }
    edit(key){
        this.props.edit(key)
    }
    update(key){
        this.props.update(key)
    }
    createTasks(item) {
        return <div key={item.key}>
            <li id={item.key}>{item.text}<button className="button" onClick={()=>{this.undone(item.key)}}>UnDone</button>
                <button className="button" onClick={()=>this.edit(item.key)}>Edit</button>
                <button className="button" onClick={()=>this.remove(item.key)}>Delete</button>
            </li>
        </div>
    }
    render()
    {

        let task = (this.props.data).filter(x => x.status === 1).map(this.createTasks)
        return(
            <ul className="theList">{task}</ul>
        )
    }
}
export default DoneTaskList;