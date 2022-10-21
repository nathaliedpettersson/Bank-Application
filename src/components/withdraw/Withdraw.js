import React from 'react';

export default class Withdraw extends React.Component {

    // Global variables for input-fields
    inputItemToWithdraw = "";
    inputCostForItem = 0;

    // Array to store everything in localStorage that is withdrawn
    myArrWithdrawList = localStorage.getItem("withdrawList") ? JSON.parse(localStorage.getItem("withdrawList")) : [];

    getMyWithdrawals = (e) => {
        this.inputCostForItem = parseInt(e.target.value);
    }

    // Had map.set & new Map(); but teacher deleted it and helped me continue with this solution instead

    // Everything under this method will happen when form is submitted
    onSubmitMyWithdrawals = (e) => {
        e.preventDefault();

        // Check current balance
        if (this.inputCostForItem > localStorage.getItem("balance", this.balance)) {
            (alert('You do not have enough money in your account'));
            return;
        }

        let checkItem = false;

        // Check if item name already exists
        for (let i = 0; i < this.myArrWithdrawList.length; i++) {
            if (this.myArrWithdrawList[i].name === this.inputItemToWithdraw) {
                checkItem = true;
            }
        }

        if (checkItem) {
            alert('This item already exists!');
        } else {

            // Create object and push to array when withdrawn
            const withdrawObject = {
                name: this.inputItemToWithdraw,
                amount: this.inputCostForItem
            }

            this.myArrWithdrawList.push(withdrawObject);

            // Add and get all withdrawals from localStorage
            localStorage.setItem("withdrawList", JSON.stringify(this.myArrWithdrawList));
            localStorage.getItem("withdrawList");

            // Get method from App.js using props
            this.props.saveMyWithdraws(this.inputItemToWithdraw, this.inputCostForItem);

        }
    }

    render() {
        return (
            <div className="withdraw-container">
                <form onSubmit={this.onSubmitMyWithdrawals}>
                    <input className="input-item" type="text" placeholder="Item" required onChange={(e) => (this.inputItemToWithdraw = e.target.value)} />
                    <input className="input-price" type="number" placeholder="Cost" required onChange={this.getMyWithdrawals} />
                    <input className="withdraw-btn" type="submit" value="Withdraw" />
                </form>
            </div>
        )
    }
}
