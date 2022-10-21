import React from "react";
import Deposit from "./components/deposit/Deposit";
import Withdraw from "./components/withdraw/Withdraw";

export default class App extends React.Component {

  // Variable for rendering withdrawals to DOM (and checking localStorage for previous withdrawals)
  renderMyList = localStorage.getItem("withdrawList") ? JSON.parse(localStorage.getItem("withdrawList")) : [];

  balance = 0;

  // Method for handling deposits
  getTotalDeposit = (totalAmount) => {
    console.log(totalAmount);

    if (localStorage.getItem("deposit")) {
      localStorage.setItem("deposit", parseInt(localStorage.getItem("deposit")) + totalAmount);
    } else {
      localStorage.setItem("deposit", totalAmount);
    }
    this.updateMyBalance(totalAmount);
  }

  // Method for updating balance when something is withdrawn
  updateMyBalance = (totalAmount) => {
    console.log(totalAmount);

    this.balance = this.balance + totalAmount;

    if (localStorage.getItem("balance")) {
      localStorage.setItem("balance", parseInt(localStorage.getItem("balance")) + totalAmount)
    } else {
      localStorage.setItem("balance", this.balance);
    }
    window.location.reload();
  }

  // Method for checking if balance is enough + save withdraw amount to localStorage
  saveMyWithdraws = (item, totalAmount) => {
    console.log(item, totalAmount);

    if (totalAmount > localStorage.getItem("balance", this.balance)) {
      (alert('You do not have enough money in your account'));
      return;
    }

    else if (localStorage.getItem("withdraw")) {
      localStorage.setItem("withdraw", parseInt(localStorage.getItem("withdraw")) + totalAmount);
    } else {
      localStorage.setItem("withdraw", totalAmount);
    }
    this.updateMyBalance(-totalAmount);
  }

  render() {
    // Variables to call in div-container to get current value of each
    const myDeposits = localStorage.getItem("deposit") ? localStorage.getItem("deposit") : 0;

    const myBalance = localStorage.getItem("balance") ?
      localStorage.getItem("balance") : 0;

    const myWithdraws = localStorage.getItem("withdraw") ?
      localStorage.getItem("withdraw") : 0;

    return (
      <div className="div-container">
        <h1 className="main-header">Banking Application React</h1>
        <h3>Deposit: ${myDeposits}</h3>
        <h3>Account balance: ${myBalance}</h3>
        <h3>Withdraw: ${myWithdraws} </h3>
        <Deposit getTotalDeposit={this.getTotalDeposit} />
        <Withdraw saveMyWithdraws={this.saveMyWithdraws} />

        <div className="my-withdrawals">
          <h3 className="list-header">List of all withdrawals ⬇️</h3>
          <ul>
            {this.renderMyList.map((value, index) => {
              return (
                <li key={index}>Product: {value.name} Price: ${value.amount}</li>
              )
            })}
          </ul>
        </div>
      </div>

    )
  }

}



