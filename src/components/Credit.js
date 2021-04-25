import React, { Component } from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import AccountBalance from './AccountBalance.js'

class Credit extends Component{
    constructor(){
        super();
        this.state = {
            apiData:[],
            totalCredit: 0,
            sentinel: false,

            credit:{
                description: "",
                amount: "",
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
            let response = await axios.get("https://moj-api.herokuapp.com/credits");
            let creditData = response.data
            let creditTotal = 0;
            creditData.forEach(cre => {
                creditTotal += cre.amount;
            })
            this.setState({apiData: creditData, totalCredit: creditTotal });
            this.props.dynamicCredit(this.state.totalCredit, this.state.sentinel);
        }
            
        catch (error){
            if(error.response){
                console.log(error.response.data);
            }
        }
    }

    handleDescription = (e) => {
        const newDesc = {...this.state.credit}
        const inputField = e.target.name
        const inputValue = e.target.value
        newDesc[inputField] = inputValue
        this.setState({credit: newDesc});
     }
 
     handleAmount = (e) => {
         const newAmt = {...this.state.credit}
        const inputField = e.target.name
        let inputValue = e.target.value;
        if(e.target.value){
            inputValue = parseInt(e.target.value)
       }
        newAmt[inputField] = inputValue;
         this.setState({credit:newAmt});
     }
     handleDate = (e)=>{
         const newDate = {...this.state.credit}
         const inputField = e.target.name 
         const inputValue = e.target.value
         newDate[inputField] = inputValue;
         this.setState({credit:newDate});
     }

     handleSubmit = (e)=>{
        e.preventDefault()
        let entry = [...this.state.newEntry];
        entry.push(this.state.credit);
        this.props.creditAddition(this.state.credit.amount);
        this.setState({newEntry: entry});
    }
    
    render(){
        return(
            <div>
                <h1>Credits</h1>
                <Link className="links" to = "/"> Return Home </Link>
                
                <form onSubmit={this.handleSubmit}> 
                <div>
                    <label htmlFor="description">Description</label>
                    <input type="text" name="description" onChange={this.handleDescription} value={this.state.credit.description} />
                </div>
                <div>
                    <label htmlFor="amount">Amount</label>
                    <input type="text" name="amount" onChange = {this.handleAmount} value = {this.state.credit.amount}/>
                </div>
                <div>
                    <label htmlFor="date">Date</label>
                    <input type="date" name="date" onChange = {this.handleDate} value = {this.state.credit.date}/>
                </div>

                    <button>Add Credit</button>
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
export default Credit;