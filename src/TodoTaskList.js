import React, { Component } from 'react';
import './App.css';

class TodoTaskList extends Component{
    constructor(props, context) {
        super(props, context);
        this.createTasks = this.createTasks.bind(this);

    }
    remove(key){
        this.props.remove(key)
    }
    done(key){
        this.props.done(key)
    }
    edit(key){
        this.props.edit(key)
    }
    update(key){
        this.props.update(key)
    }
    createTasks(item) {
        return <div key={item.key}>
            <li id={item.key}>{item.text}<button className="button btn-sm btn-success" onClick={()=>{this.done(item.key)}}>Done</button>
                <button className="button btn-sm" onClick={()=>this.edit(item.key)}>Edit</button>
                <button className="button btn-sm btn-danger" onClick={()=>this.remove(item.key)}>Delete</button>
            </li>
        </div>
    }
    render()
    {

        let task = (this.props.data).filter(x => x.status === 0).map(this.createTasks)
        return(
            <ul className="theList">{task}</ul>
        )
    }
}
export default TodoTaskList;