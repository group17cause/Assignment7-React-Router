import React, { Component } from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import AccountBalance from './AccountBalance.js'

class Debit extends Component{
    constructor(){
        super();
        this.state = {
            apiData:[],
            totalDebit: 0,
            sentinel: false
        };
    }

    FetchDebit = async ()=>{
        try{
            let response = await axios.get("https://moj-api.herokuapp.com/debits");
            this.setState({apiData:response.data});
            this.state.apiData.forEach(values => {
                this.setState(prev => ({
                    totalDebit: values.amount + prev.totalDebit
                }));
            });
            
        }
        catch (error){
            if(error.response){
                console.log(error.response.data);
            }
        }
    }

    createTable = ()=>{
       let currData = this.state.apiData;
       console.log(currData);
       let table = currData.map(tabData =>{
           
           return(
                <tr key = {tabData.id}>
                    <td>{tabData.description}</td>
                    <td>{tabData.amount}</td>
                    <td>{tabData.date}</td>
                </tr>)
       });

        
        return table;
    }

    componentDidMount(){
        this.FetchDebit();
    }


    render(){
        return(
            <div>
                <h1>Debits</h1>
                <Link to = "/"> Return Home </Link>
                <form onSubmit={this.handleSubmit}>
                    <input type = "text" onChange = {this.handleChagne}/>
                </form>
                <table>
                    <tbody>
                        {this.createTable()}
                    </tbody>
                </table>

                <h1>Account Balance</h1> 
            </div>
        );
    }
}
export default Debit;