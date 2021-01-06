import React,{ PureComponent, useEffect } from 'react';
import setActive from "react";
import axios from 'axios';
import ReactPaginate from 'react-paginate';


const List=()=>{
    return ( <ul 
    style={{
        display:'flex',
        justifyContent:'center'
        }}>
        <input type="text" placeholder="You can search any artile here.." style={{
            width:"222px",
            border:"2px solid black",
            borderRadius:"12px",
            height:"22px"
        }}></input>
    </ul>
    );
};





export class FirstComponents extends PureComponent{

    constructor(props){
        super(props)
        this.state={
            offset:0,
            tableData:[],
            orgtableData:[],
            perPage:10,
            currentPage:0
        }
        this.handlePageClick = this.handlePageClick.bind(this);
    }

    handlePageClick = (e) => {
        const selectedPage = e.selected;
        const offset = selectedPage * this.state.perPage;

        this.setState({
            currentPage: selectedPage,
            offset: offset
        }, () => {
            this.loadMoreData()
        });

    };

    loadMoreData() {
		const data = this.state.orgtableData;
		
		const slice = data.slice(this.state.offset, this.state.offset + this.state.perPage)
		this.setState({
			pageCount: Math.ceil(data.length / this.state.perPage),
			tableData:slice
		})
	
    }

    componentDidMount(){
        this.getData();
    }
    getData() {
        axios
        .get('https://jsonplaceholder.typicode.com/comments')
        .then(res =>{
            var data = res.data;

            var slice = data.slice(this.state.offset, this.state.offset + this.state.perPage)

            this.setState({
                pageCount: Math.ceil(data.length / this.state.perPage),
                orgtableData : res.data,
                tableData:slice
            })
        });
    }

    render(){
        return(
            <div>
                 <nav
                    style={{
                        display:"grid",
                        gridTemplateColumns:"50% 50%",
                        alignItems:"center",
                        background:"#00bfff",
                        color: "white"
                        }}>
                    <h1>Any logo</h1>
                <List/>
                </nav>
                <table border="1">
                     <thead>
                     <th>Id</th>
                     <th>Name</th>
                     <th>Email</th>
                     <th>Body</th>

                     </thead>
                     <tbody>
                        {
                          this.state.tableData.map((tdata, i) => (
                            <tr>
                            <td>{tdata.id}</td>
                            <td>{tdata.name}</td>
                            <td>{tdata.email}</td>
                            <td>{tdata.body}</td>
                        </tr>
                            
                          ))
                        }
                     </tbody>
                 </table>  
                 <ReactPaginate
                    previousLabel={"prev"}
                    nextLabel={"next"}
                    breakLabel={"..."}
                    breakClassName={"break-me"}
                    pageCount={this.state.pageCount}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={this.handlePageClick}
                    containerClassName={"pagination"}
                    subContainerClassName={"pages pagination"}
                    activeClassName={"active"}/>
            </div>
        )
    }
}
export default FirstComponents