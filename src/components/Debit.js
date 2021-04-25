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
            sentinel: false,
            debit:{
                description: "",
                amount: 0,
                date: ""
            },
            newEntry : []
        };
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

    createEntry = ()=>{
        let currData = this.state.newEntry;
        console.log(currData);
        let table = currData.map((tabData, index) =>{
            
            return(
                 <tr key = {index}>
                     <td>{tabData.description}</td>
                     <td>{tabData.amount}</td>
                     <td>{tabData.date}</td>
                 </tr>)
        });
 
         
         return table;
     }

    async componentDidMount(){
        try{
            let response = await axios.get("https://moj-api.herokuapp.com/debits");
            let debitData = response.data
            let debitTotal = 0;
            debitData.forEach(deb => {
                debitTotal += deb.amount;
            })
            this.setState({apiData: debitData, totalDebit:debitTotal });
            this.props.dynamicBalance(this.state.totalDebit, this.state.sentinel);
        }
            
        catch (error){
            if(error.response){
                console.log(error.response.data);
            }
        }
    }

    handleDescription = (e) => {
       const newDesc = {...this.state.debit}
       const inputField = e.target.name
       const inputValue = e.target.value
       newDesc[inputField] = inputValue
       this.setState({debit: newDesc});
    }

    handleAmount = (e) => {
        const newAmt = {...this.state.debit}
       const inputField = e.target.name
       let inputValue = e.target.value;
       if(e.target.value){
        inputValue = parseInt(e.target.value)
       }
       
       newAmt[inputField] = inputValue;
        this.setState({debit:newAmt});
    }
    handleDate = (e)=>{
        const newDate = {...this.state.debit}
        const inputField = e.target.name 
        const inputValue = e.target.value
        newDate[inputField] = inputValue;
        this.setState({debit:newDate});
    }


    handleSubmit = (e)=>{
        e.preventDefault()
        let entry = [...this.state.newEntry];
        entry.push(this.state.debit);
        this.props.balanceAddition(this.state.debit.amount);
        this.setState({newEntry: entry});
    }


    render(){
        
        return(
            <div>
                <h1>Debits</h1>
                <Link className = "links" to = "/"> Return Home </Link>
                
                <form onSubmit={this.handleSubmit}> 
                <div>
                    <label htmlFor="description">Description</label>
                    <input type="text" name="description" onChange={this.handleDescription} value={this.state.debit.description} />
                </div>
                <div>
                    <label htmlFor="amount">Amount</label>
                    <input type="text" name="amount" onChange = {this.handleAmount} value = {this.state.debit.amount}/>
                </div>
                <div>
                    <label htmlFor="date">Date</label>
                    <input type="date" name="date" onChange = {this.handleDate} value = {this.state.debit.date}/>
                </div>
                    <button>Add debit</button>
                </form>
                <table>
                    <tbody>
                        {this.createTable()}
                        {this.createEntry()}
                    </tbody>
                    
                </table>

                <h1>Account Balance</h1> 
                <AccountBalance accountBalance = {this.props.accountBalance}/>
            </div>
        );
    }
}
export default Debit;