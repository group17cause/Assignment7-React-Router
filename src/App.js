import {BrowserRouter as Router, Route,Switch} from 'react-router-dom';
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
    this.state = {accountBalance : 14568.27,
      currentUser: {
                    userName: 'joe_shmo',
                    memberSince: '07/23/96'
                  }
      };
  }

  mockLogIn = (logInInfo) => {
    const newUser = {...this.state.currentUser}
    newUser.userName = logInInfo.userName
    this.setState({currentUser: newUser})
  }

  dynamicBalance = (balanceInfo)=>{
    let newBalance = this.state.accountBalance
    newBalance = newBalance + balanceInfo.totalDebit
    this.setState({accountBalance : newBalance})
  }

  render(){
    const HomeComponent = () => (<Home accountBalance = {this.state.accountBalance} />);
    const UserProfileComponent = () => (<UserProfile userName = {this.state.currentUser.userName} memberSince = {this.state.currentUser.memberSince} />);
    const LogInComponent = () => (<LogIn user={this.state.currentUser} mockLogIn={this.mockLogIn} />);
    const DebitComponent = () => (<Debit dynamicBalance = {this.dynamicBalance}/>);
    const CreditComponent = ()=>(<Credit/>);
    return (
      <Router>
          <div>
            <Route exact path="/" render={HomeComponent}/>
            <Route exact path="/userProfile" render={UserProfileComponent}/>
            <Route exact path="/login" render={LogInComponent}/>
            <Route exact path="/debit" render={DebitComponent} />
            <Route exact path="/credit" render={CreditComponent} />
          </div>
        </Router>
   );
  }
}

export default App;
