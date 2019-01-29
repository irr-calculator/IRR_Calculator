const React = require('react');
const CapExModal = require('./capex_modal.jsx');

class Options extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            capRate: 5,
            inflateExp: 3,
            inflateRents: 3,
            resLease: 12,
            closingCosts: '',
            resVac: 85,
        }
        this.handleCurrency = this.handleCurrency.bind(this);
        this.handleOtherChange = this.handleOtherChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleOtherChange(event) {
        let newState = Object.assign({}, this.state)
        newState[event.target.name] = event.target.value;
        this.setState(newState);
    }

    //function for handling changes in the currency fields
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
        const key = event.target.name;
        if (key === 'equity') {
            const equityValue = Number(event.target.value.replace(/[\D]/gi, ''));
            const priceValue = Number(this.state.purchasePrice.replace(/[\D]/gi, ''));
            if (equityValue > priceValue) {
                amount = this.state.purchasePrice;
            }
        }
        newState[key] = amount;
        this.setState(newState);
    }

    handleSubmit(event) {
        event.preventDefault();
        console.log(this.state);
        this.props.advanceEntry(this.state);
    }

    render() {
        if (this.props.isShowing === true) {
            return (
                <div className="form-area">
                    <div className="back-button" onClick={this.props.backwards}>
                        <div className="next-button-text">
                            Back
                  </div>
                    </div>
                    <div className="input-area">
                        <h3>Model Options</h3>
                        <form>
                            <div className="inputWrapper">
                                <label>
                                    Exit Cap Rate (%)
                          </label>
                                <input name="capRate" type="number" value={this.state.capRate} onChange={this.handleOtherChange} required />
                            </div>
                            <div className="inputWrapper">
                                <label>
                                    Inflate Expenses (%)
                          </label>
                                <input name="inflateExp" type="number" value={this.state.inflateExp} onChange={this.handleOtherChange} required />
                            </div>
                            <div className="inputWrapper">
                                <label>
                                    Increase Rents on Rollover (%)
                          </label>
                                <input name="inflateRents" type="number" value={this.state.inflateRents} onChange={this.handleOtherChange} required />
                            </div>
                            <div className="inputWrapper">
                                <label>
                                    Closing Costs
                          </label>
                                <input name="closingCosts" type="text" value={this.state.closingCosts} onChange={this.handleCurrency} placeholder="$0" />
                            </div>
                            <div className="inputWrapper">
                                <label>
                                    Residential Lease Length
                          </label>
                                <input name="resLease" type="number" value={this.state.resLease} onChange={this.handleOtherChange} required />
                            </div>
                            <div className="inputWrapper">
                                <label>
                                    Average Res Vacancy (%)
                          </label>
                                <input name="resVac" type="number" value={this.state.resVac} onChange={this.handleOtherChange} required />
                            </div>
                        </form>
                    </div>
                    <div className="nextButtonArea" onClick={this.handleSubmit}>
                        <div className="next-button-text">
                            Next
                  </div>
                    </div>
                </div>
            )
        } else {
            return (
                <div></div>
            )
        }
    }
}

module.exports = Options;