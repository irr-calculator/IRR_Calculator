const React = require('react');

class FinancingModal extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            secondLoan: {
                amount: '',
                term: 0,
                ammortization: '',
                start: 0,
            },
            thirdLoan: {
                amount: '',
                term: 0,
                ammortization: '',
                start: 0,
            },
            equityPartner: {
                amount: '',
                ownership: 0,
            }
        };
        this.handleCurrency = this.handleCurrency.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    closeModal(event){
        event.preventDefault();
        let modal = document.getElementById('modal');
        modal.style.display = 'none';
        if (this.state.secondLoan.amount.length >= 1 || this.state.thirdLoan.amount.length >= 1 || this.state.equityPartner.amount.length >= 1) {
            let modalButton = document.getElementById('modalButton');
            modalButton.style.color = '#5a83db';
        }
    }
    openModal(event){
        event.preventDefault();
        const modal = document.getElementById('modal');
        modal.style.display = 'block';
    }
    handleCurrency(event) {
        let newState = Object.assign({}, this.state);
        let amount = event.target.value.replace(/[\D]/gi, '');
        if (amount.length > 3) {
            let reverse = amount.split('').reverse().join('');
            amount = reverse.replace(/\d\d\d/gi, '$&' + ',').split('').reverse().join('');
            if (amount[0] === ',') {
                amount = amount.slice(1, amount.length);
            }
        }
        if (amount.length !== 0) {
            amount = '$' + amount;
        }
        const key1 = event.target.name.split('.')[0];
        const key2 = event.target.name.split('.')[1];
        newState[key1][key2] = amount;
        this.setState(newState);
    }
    handleChange(event) {
        let newState = Object.assign({}, this.state);
        const key1 = event.target.name.split('.')[0];
        const key2 = event.target.name.split('.')[1];
        newState[key1][key2] = event.target.value;
        this.setState(newState);
    }
    render(){
        return (
            <div className="inputWrapper">
                <button id='modalButton' className="modalButton" onClick={this.openModal}> Additional Financing / Equity Partner(s)</button>
                <div id='modal' className="modal">
                    <div className="modal-content">
                        <button className="modal-close" onClick={this.closeModal}>X</button>
                        <div className="inputWrapper">
                            <label>
                                Second Loan Amount
                        </label>
                            <input name="secondLoan.amount" type="text" value={this.state.secondLoan.amount} onChange={this.handleCurrency} placeholder="$0" />
                        </div>
                        <div className="inputWrapper">
                            <label>
                                Term
                        </label>
                            <input name="secondLoan.term" type="number" value={this.state.secondLoan.term} onChange={this.handleChange} />
                        </div>
                        <div className="inputWrapper">
                            <label>
                                Ammortization
                            </label>
                            <input name="secondLoan.ammortization" type="number" value={this.state.secondLoan.ammortization} onChange={this.handleChange} />
                        </div>
                        <div className="inputWrapper">
                            <label>
                                Start Date
                            </label>
                            <input name="secondLoan.start" type="number" value={this.state.secondLoan.start} onChange={this.handleChange} />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

module.exports = FinancingModal;