import React, { Component } from 'react';

class Pagination extends Component{
    constructor(props,context){
        super(props,context);
        this.renderPagination = this.renderPagination.bind(this);
        this.pagination = this.pagination.bind(this);
        this.state = {
            currentPage: 1,
        }
    }
    renderPagination(){
        let count = this.props.allItems.length
        return Math.ceil(count/5)
    }
    pagination(page){
        this.setState({
            currentPage: page
        })
        this.props.pagination(page)
    }
    render(){
        let count = this.renderPagination();
        let numberList =[];
        for(let i=1; i <= count; i++){
            numberList.push(
                <li style={{color: "blue"}} key={"page"+i} className={"page-item "+ (this.state.currentPage === i ? "active" : null)}>
                <a className="page-link"
                   onClick={()=>this.pagination(i)}>{i}</a></li>
            )
        }
        return(
            <nav aria-label="Page navigation example">
                <ul className="pagination justify-content-center">
                    {this.state.currentPage < 2 ? (
                        <li className="page-item disabled">
                            <a className="page-link">Previous</a>
                        </li>
                    ) : (
                        <li className="page-item">
                            <a style={{color: "blue"}} className="page-link" onClick={()=>this.pagination(this.state.currentPage-1)}>Previous</a>
                        </li>
                    )}
                    {numberList}
                    {
                        this.state.currentPage === Math.ceil(this.props.allItems.length/5) ?
                            (<li className="page-item disabled">
                                <a className="page-link">Next</a>
                            </li>) :
                            (<li className="page-item">
                            <a style={{color: "blue"}} className="page-link" onClick={()=>this.pagination(this.state.currentPage+1)}>Next</a>
                        </li>)
                    }

                </ul>
            </nav>
        )
    }
}
export default Pagination;