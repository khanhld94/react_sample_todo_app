import React, { Component } from 'react';
import './App.css';
import ReactDOM from "react-dom";
import Search from "./Search"
import DoneTaskList from "./DoneTaskList"
import TodoTaskList from "./TodoTaskList"
import AllTask from "./AllTask"

class Title extends Component{
    constructor(props, context) {
        super(props, context);
        this.getChecked = this.getChecked.bind(this)
    }
    getChecked(value){
        this.props.getChecked(value)
    }
    render(){
        return(
            <div>
                <hr/>
                <form>
                    <label className="radio-inline">
                        <input type="radio" name="radioname" className="optradio" defaultChecked={true} onClick={()=>this.getChecked(0)}/>AllTask
                    </label>
                    <label className="radio-inline">
                        <input type="radio" name="radioname" className="optradio" onClick={()=>this.getChecked(1)}/>Todo Task
                    </label>
                    <label className="radio-inline">
                        <input type="radio" name="radioname" className="optradio" onClick={()=>this.getChecked(2)}/>Done Task
                    </label>
                    <label className="radio-inline">
                        <input type="radio" name="radioname" className="optradio" onClick={()=>this.getChecked(3)}/>Both
                    </label>
                </form>
                <hr/>
            </div>
        );
    }
}

class RenderTask extends Component{
    constructor(props,context){
        super(props,context);
    }
    render(){
        let value = this.props.value;
        if(value === 0){
            return(
                <div>
                    <h5>All:</h5>
                    <AllTask allItems={this.props.allItems}
                             remove={this.props.remove}
                             edit={this.props.edit}
                             done={this.props.done}
                             undone={this.props.undone}
                    />
                </div>
            )
        }
        else if(value === 1){
            return(
                <div>
                    <h5>Todo:</h5>
                    <TodoTaskList data={this.props.data}
                                  remove={this.props.remove}
                                  done={this.props.done}
                                  edit={this.props.edit}/>
                </div>
            )
        }
        else if(value === 2){
            return(
                <div>
                    <h5>Done:</h5>
                    <DoneTaskList data={this.props.data}
                                  remove={this.props.remove}
                                  undone={this.props.undone}
                                  edit={this.props.edit}/>
                </div>
            )
        }
        else {
            return(
                <div>
                    <h5>Todo:</h5>
                    <TodoTaskList data={this.props.data}
                                  remove={this.props.remove}
                                  done={this.props.done}
                                  edit={this.props.edit}/>
                    <hr/>
                    <h5>Done:</h5>
                    <DoneTaskList data={this.props.data}
                                  remove={this.props.remove}
                                  undone={this.props.undone}
                                  edit={this.props.edit}/>
                </div>
            )
        }
        }
}
class TodoList extends Component {
    constructor(props, context) {
        super(props, context);
        let n=1;
        let items= [];
        function makeRandomString() {
            var text = "";
            var possible = "abcdefghijklmnopqrstuvwxyz";

            for (var i = 0; i < 7; i++)
                text += possible.charAt(Math.floor(Math.random() * possible.length));

            return text;
        }
        while (n<= 13){
            let task = {text: "task "+makeRandomString(), key: n, status: Math.round(Math.random())}
            items.push(task);
            n++
        }
        this.state = {
          items: items,
          allItems: items,
          value: 0
        };
        this.addItem = this.addItem.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
        this.changeStatus = this.changeStatus.bind(this);
        this.edit = this.edit.bind(this);
        this.update = this.update.bind(this);
        this.search = this.search.bind(this);
        this.getChecked = this.getChecked.bind(this)
    }
    addItem(e) {
        e.preventDefault();
        let itemArray = this.state.allItems;

        if (this._inputElement.value !== "") {
            itemArray.unshift({
                text: this._inputElement.value,
                key: Date.now(),
                status: 0
            });
            console.log(itemArray)
            this.setState({
                items: itemArray,
                allItems: itemArray
            });

            this._inputElement.value = "";
        }

        console.log(itemArray);

    }
    deleteItem(key) {
        let filteredItems = this.state.items.filter(function (item) {
            return (item.key !== key);
        });
        let allItems = this.state.allItems.filter(function(item){
            return (item.key !== key);
        })
        this.setState({
            items: filteredItems,
            allItems: allItems
        });
    }
    changeStatus(key){
        let array = this.state.items;
        array.filter(function (item) {
            if(item.key === key){
                item.status = item.status === 0 ? 1 : 0;
            }
            return item;
        })
        this.setState({
            items: array,
        });
    }
    edit(key){
        let array = this.state.items;
        let item = array.find(x=> x.key === key)
        let t = document.getElementById("editForm");
        if(t != null){
            ReactDOM.unmountComponentAtNode(document.getElementById("wrapper"))
        }
        ReactDOM.render(
            <div id="editForm" className="header">
                <div className="input-group">
                    <input className="form-control" id="input" defaultValue={item.text}/>
                    <span className="input-group-btn">
                     <button className="btn btn-success" onClick={() => this.update(item.key)}>Update</button>
                    </span></div>
        </div>, document.getElementById('wrapper'));
    }
    update(key){
        let array = this.state.items;
        let input = document.getElementById('input').value;
        let item = array.find(function(item){
            if(item.key === key){
                return item
            }
        })
        let allItems = this.state.allItems.find(x=> x.key === key)
        if (input === ""){
            alert("Not empty pls")
        }
        else {
            allItems.text = input
            item.text = input;
            this.setState({
                items: array,
                allItems: this.state.allItems
            })
            ReactDOM.unmountComponentAtNode(document.getElementById("wrapper"))
        }
    }
    search(){
        let arr = this.state.allItems;
        let keyword = document.getElementById('searchfield').value;
        let rs = arr.filter(function (item) {
            if(item.text.toString().toLowerCase().includes(keyword.toLowerCase())){
                return item;
            }
        })
        if(keyword === ""){
            this.setState({
                items: this.state.allItems
            })
        }
        else {
            this.setState({
                items: rs
            })
        }

    }
    getChecked(value){
        this.setState({
            value: value
        })
    }
    render(){
        return(
            <div className="todoListMain">
                <Search search={this.search}/>
                <div className="header">
                    <form className="input-group" onSubmit={this.addItem}>
                        <input className="form-control" ref={(a) => this._inputElement = a} placeholder="Enter Task Name Here"/>
                        <span className="input-group-btn">
                         <button className="btn btn-success" type="submit">Create</button>
                        </span>
                    </form>
                </div>
                <div id="wrapper"></div>
                <Title getChecked = {this.getChecked}/>
                <RenderTask data={this.state.items}
                            remove={this.deleteItem}
                            done={this.changeStatus}
                            edit={this.edit}
                            undone={this.changeStatus}
                            value={this.state.value}
                            allItems={this.state.items}
                            />
            </div>
        );
    }
}

export default TodoList;