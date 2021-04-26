import {HashRouter as Router, Route,Switch} from 'react-router-dom';
import Home from './components/home.js'
import './App.css';
import React, {Component} from 'react'
import UserProfile from './components/UserProfile.js'
import LogIn from './components/Login'
import Debit from './components/Debit'
import Credit from './components/Credit'


class App extends Component {
  constructor(){
    super();
    this.state = {accountBalance : 0,
      creditValue: true, // Work around so that it only renders the total credit amount from the api call only once
      currentUser: {
                    userName: 'joe_shmo',
                    memberSince: '07/23/96'
                  },
      flagValue : true, // Work around so that it only renders the total debit amount from the api call only once
      
      };
  }

  mockLogIn = (logInInfo) => {
    const newUser = {...this.state.currentUser}
    newUser.userName = logInInfo.userName
    this.setState({currentUser: newUser})
  }

  dynamicBalance = (balanceInfo, sentinel)=>{
    let newBalance = this.state.accountBalance
    newBalance = newBalance - balanceInfo;
    if(this.state.flagValue){
      this.setState({accountBalance : newBalance, flagValue:sentinel})
    }
  }
  
  balanceAddition = (balance) =>{
    let newBalance = this.state.accountBalance
    newBalance = newBalance - balance;
    this.setState({accountBalance: newBalance});
  }


  dynamicCredit = (info, sentinel) =>{
    let newBalance = this.state.accountBalance
    newBalance = newBalance + info;
    if(this.state.creditValue){
      this.setState({accountBalance : newBalance, creditValue:sentinel});
    }
  }

  creditAddition = (balance) =>{
    let newBalance = this.state.accountBalance
    newBalance = newBalance + balance;
    this.setState({accountBalance: newBalance});
  }
  

  render(){
    const HomeComponent = () => (<Home accountBalance = {this.state.accountBalance} />);
    const UserProfileComponent = () => (<UserProfile userName = {this.state.currentUser.userName} memberSince = {this.state.currentUser.memberSince} />);
    const LogInComponent = () => (<LogIn user={this.state.currentUser} mockLogIn={this.mockLogIn} />);
    const DebitComponent = () => (<Debit dynamicBalance = {this.dynamicBalance} accountBalance = {this.state.accountBalance} balanceAddition = {this.balanceAddition} />);
    const CreditComponent = ()=>(<Credit dynamicCredit = {this.dynamicCredit} accountBalance = {this.state.accountBalance} creditAddition = {this.creditAddition} />);
    return (
      <Router>
          <div>
            <Switch>
            <Route exact path="/" render={HomeComponent}/>
            <Route exact path="/userProfile" render={UserProfileComponent}/>
            <Route exact path="/login" render={LogInComponent}/>
            <Route exact path="/debit" render={DebitComponent} />
            <Route exact path="/credit" render={CreditComponent} />
            </Switch>
          </div>
        </Router>
   );
  }
}

export default App;
