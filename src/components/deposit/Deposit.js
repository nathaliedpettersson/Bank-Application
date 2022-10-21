import React from 'react';

export default class Deposit extends React.Component {

    // Global variables
    inputAmount = 0;
    totalAmount = 0;

    getDepositAmount = (e) => {
        this.inputAmount = parseInt(e.target.value);
    }

    // Method for handling form
    onSubmitAmount = (e) => {
        e.preventDefault();
        this.totalAmount = this.totalAmount + this.inputAmount;
        console.log(this.totalAmount);
        this.props.getTotalDeposit(this.totalAmount);
    }

    render() {
        return (
            <div className="deposit-container">
                <form onSubmit={this.onSubmitAmount}>
                    <input className="input-deposit" type="number" placeholder="Amount" required onChange={this.getDepositAmount} />
                    <input className="submit-btn" type="submit" value="Deposit" />
                </form>
            </div>
        )
    }
}