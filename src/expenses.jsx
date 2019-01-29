const React = require('react');

class Expenses extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            taxes: '',
            maintenance: '',
            other: '',
            utilities: '',
            insurance: '',
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
                        <h3>Expenses</h3>
                        <form>
                            <div className="inputWrapper">
                                <label>
                                    Taxes ($/year)
                          </label>
                                <input name="taxes" type="text" value={this.state.taxes} onChange={this.handleCurrency} placeholder="$0" required />
                            </div>
                            <div className="inputWrapper">
                                <label>
                                    Maintenance ($/year)
                          </label>
                                <input name="maintenance" type="text" value={this.state.maintenance} onChange={this.handleCurrency} placeholder="$0" required />
                            </div>
                            <div className="inputWrapper">
                                <label>
                                    Insurance
                          </label>
                                <input name="insurance" type="text" value={this.state.insurance} onChange={this.handleCurrency} placeholder="$0" required />
                            </div>
                            <div className="inputWrapper">
                                <label>
                                    Utilities / OpEx ($/sf/year)
                          </label>
                                <input name="utilities" type="text" value={this.state.utilities} onChange={this.handleCurrency} placeholder="$0" required/>
                            </div>
                            <div className="inputWrapper">
                                <label>
                                   Other ($/year)
                          </label>
                                <input name="other" type="text" value={this.state.other} onChange={this.handleCurrency} placeholder="$0"/>
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

module.exports = Expenses;