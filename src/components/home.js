import React, { Component } from 'react'
import bank from "./../bank.jpg"
import AccountBalance from './AccountBalance.js'
import {Link} from 'react-router-dom'
    
    class Home extends Component {
      render() {
        return (
            <div>
              <img src={bank} alt="bank"/>
                <h1>Bank of React</h1>
               <Link className = "links" to="/userProfile">User Profile</Link>
               <Link className = "links" to="/login">Login</Link>
               <Link className = "links" to="/debit">Debits</Link> 
               <Link className = "links" to = "/credit">Credits</Link> 
               <h1>Balance</h1> <br/>
              <AccountBalance accountBalance = {this.props.accountBalance} />
            </div>
        );
      }
    }
    
    export default Home;