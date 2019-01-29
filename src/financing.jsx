const React = require('react');
const FinancingModal = require('./financing_modal.jsx');

class Financing extends React.Component {
    constructor (props){
        super(props);
        this.state = {
            loanAmount: '',
            interest: 3,
            term: 5,
            ammortization: 30,
            errorMessages:['Warning: loan and equity total do not equal purchase price. Add financing, equity, or equity partner', 'Warning: loan and equity total exceeds purchase, capex, renovations and closing costs', 'Warning: Primary Loan ends during hold period and no secondary loan refinance indicated'],
            secondLoan: {
                amount: '',
                term: 5,
                ammortization: 30,
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
            },
            isFirst: true,
        }
        this.handleCurrency = this.handleCurrency.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.checkError = this.checkError.bind(this);
        this.modalUpdate = this.modalUpdate.bind(this);
        this.handleSubmit =this.handleSubmit.bind(this);
        
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
        const key = event.target.name
        newState[key] = amount;
        this.setState(newState);
    }
    handleChange(event) {
        let newState = Object.assign({}, this.state);
        newState[event.target.name] = event.target.value;
        this.setState(newState);
    }
    handleSubmit(event) {
        event.preventDefault();
        console.log(this.state);
        this.props.advanceEntry(this.state);
    }

    modalUpdate(object){
        newState = Object.assign({}, this.state);
        newState.secondLoan = object.secondLoan;
        newState.thirdLoan = object.thirdLoan;
        newState.equityPartner = object.equityPartner;
        this.setState(newState);
    }
    checkError(){
        const purchase = Number(this.props.state.acquisition.purchasePrice.replace(/[\D]/gi, ''));
        const capEx = Number(this.props.state.acquisition.capEx.replace(/[\D]/gi, ''));
        const equity = Number(this.props.state.acquisition.equity.replace(/[\D]/gi, ''));
        const primaryLoan = Number(this.state.loanAmount.replace(/[\D]/gi, ''));
        const secondLoan = Number(this.state.secondLoan.amount.replace(/[\D]/gi, ''));
        const thirdLoan = Number(this.state.thirdLoan.amount.replace(/[\D]/gi, ''));
        const difference = purchase + capEx - primaryLoan - secondLoan - thirdLoan - equity;
        if (difference > 0) {
            return this.state.errorMessages[0];
        }
        if (difference < 0) {
            return this.state.errorMessages[1];
        }
        if (this.state.loanAmount !== '' && (Number(this.state.term) < Number(this.props.state.acquisition.holdLength)) && this.state.secondLoan.amount === '') {
            return this.state.errorMessages[2];
        }
        return '';
    }

    render(){
        if (this.props.isShowing === true){
        return(
            <div className="form-area">
                <div className="back-button" onClick={this.props.backwards}>
                    <div className="next-button-text">
                        Back
                  </div>
                </div>
                <div className="input-area">
                    <h3>Financing</h3>
                    <div className="inputWrapper">
                        <label>
                            Current Principle
                          </label>
                        <input name="loanAmount" type="text" value={this.state.loanAmount} onChange={this.handleCurrency} placeholder="$0" required />
                    </div>
                    <div className="inputWrapper">
                        <label>
                            Term ({this.state.term} Years)
                        </label>
                        <input name="term" type="range" min="0" max="30" value={this.state.term} onChange={this.handleChange} required />
                    </div>
                    <div className="inputWrapper">
                        <label>
                            Ammortization ({this.state.ammortization} Years)
                        </label>
                        <input name="term" type="range" min="0" max="50" value={this.state.ammortization} onChange={this.handleChange} required />
                    </div>
                    <div className="inputWrapper">
                        <label>
                            Interest Rate (%)
                        </label>
                        <input name="interest" type="number" value={this.state.interest} onChange={this.handleChange} required />
                    </div>
                    <div className="inputWrapper">
                    <div className="error-warning">{this.checkError()}</div>
                    </div>
                    < FinancingModal update={this.modalUpdate} state={this.state}/>
                </div>
                <div className="nextButtonArea" onClick={this.handleSubmit}>
                    <div className="next-button-text">
                        Next
                  </div>
                </div>
            </div>
        )}
        else {
        return(<div></div>)
        }
    }
}

module.exports = Financing;