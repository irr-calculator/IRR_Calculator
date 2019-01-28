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
            loans: [],
            errorMessages:['loan and equity total do not equal purchase price add financing, equity, or equity partner', 'loan term is less than property hold time add financing']
        }
        this.handleCurrency = this.handleCurrency.bind(this);
        this.handleChange = this.handleChange.bind(this);
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
                    <div className="error-warning">{this.state.errorMessages[0]}</div>
                    </div>
                    < FinancingModal />
                </div>
                <div className="nextButtonArea" onClick={this.props.forward}>
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