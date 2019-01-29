const React = require('react');

class FinancingModal extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            secondLoan: this.props.state.secondLoan,
            thirdLoan: this.props.state.thirdLoan,
            equityPartner: this.props.state.equityPartner,
        };
        this.handleCurrency = this.handleCurrency.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }
    closeModal(event){
        event.preventDefault();
        let modal = document.getElementById('modal');
        modal.style.display = 'none';
        this.props.update(this.state);
        this.setState(this.state);
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
        if (this.state.secondLoan.amount.length >= 1 || this.state.thirdLoan.amount.length >= 1 || this.state.equityPartner.amount.length >= 1) {
            let modalButton = document.getElementById('modalButton');
            modalButton.style.color = '#5a83db';
        }
        return (
            <div className="inputWrapper">
                <button id='modalButton' className="modalButton" onClick={this.openModal}> Additional Financing / Equity Partner(s)</button>
                <div id='modal' className="modal">
                    <div className="modal-content">
                        <button className="modal-close" onClick={this.closeModal}>X</button>
                        <h3>Second Loan</h3>
                        <div className="inputWrapper">
                            <label>
                                Second Loan Amount
                        </label>
                            <input name="secondLoan.amount" type="text" value={this.state.secondLoan.amount} onChange={this.handleCurrency} placeholder="$0" />
                        </div>
                        <div className="inputWrapper">
                            <label>
                                Term Length ( {this.state.secondLoan.term} Years)
                        </label>
                            <input name="secondLoan.term" type="range" min="0" max="30" value={this.state.secondLoan.term} onChange={this.handleChange} />
                        </div>
                        <div className="inputWrapper">
                            <label>
                                Ammortization Length ( {this.state.secondLoan.ammortization} Years)
                            </label>
                            <input name="secondLoan.ammortization" type="range" min="0" max="50" value={this.state.secondLoan.ammortization} onChange={this.handleChange} />
                        </div>
                        <div className="inputWrapper">
                            <label>
                                Relative Month Start Date (optional)
                            </label>
                            <input name="secondLoan.start" type="number" value={this.state.secondLoan.start} onChange={this.handleChange} />
                        </div>
                        <h3>Third Loan</h3>
                        <div className="inputWrapper">
                            <label>
                                Third Loan Amount
                        </label>
                            <input name="thirdLoan.amount" type="text" value={this.state.thirdLoan.amount} onChange={this.handleCurrency} placeholder="$0" />
                        </div>
                        <div className="inputWrapper">
                            <label>
                                Term Length ( {this.state.thirdLoan.term} Years)
                        </label>
                            <input name="thirdLoan.term" type="range" min="0" max="30" value={this.state.thirdLoan.term} onChange={this.handleChange} />
                        </div>
                        <div className="inputWrapper">
                            <label>
                                Ammortization Length ( {this.state.thirdLoan.ammortization} Years)
                            </label>
                            <input name="thirdLoan.ammortization" type="range" min="0" max="50" value={this.state.thirdLoan.ammortization} onChange={this.handleChange} />
                        </div>
                        <div className="inputWrapper">
                            <label>
                                Relative Month Start Date (optional)
                            </label>
                            <input name="thirdLoan.start" type="number" value={this.state.thirdLoan.start} onChange={this.handleChange} />
                        </div>    
                        <h3>Equity Partner / Other</h3>
                        <div className="inputWrapper">
                            <label>
                                Equity Value
                            </label>
                            <input name="equityPartner.amount" type="text" value={this.state.equityPartner.amount} onChange={this.handleCurrency} />
                        </div>
                        <div className="inputWrapper">
                            <label>
                                Percent Ownership (%)
                            </label>
                            <input name="equityPartner.ownership" type="number" value={this.state.equityPartner.ownership} onChange={this.handleChange} />
                        </div>    
                    </div>
                </div>
            </div>
        )
    }
}

module.exports = FinancingModal;