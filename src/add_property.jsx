const React = require('react');
const CapExModal = require ('./capex_modal.jsx');

class AddProperty extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            purchasePrice: '',
            equity: '',
            sf: 0,
            closingCosts: '',
            holdLength: 5,
            capEx: '',
            capExStart: 0,
            capExEnd: 0,
        }
        this.handleCurrency = this.handleCurrency.bind(this);
        this.handleOtherChange = this.handleOtherChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleOtherChange(event){
        let newState = Object.assign({}, this.state)
        newState[event.target.name] = event.target.value;
        this.setState(newState);
    }

    //function for handling changes in the currency fields
    handleCurrency(event) {
        let newState = Object.assign({}, this.state);
        let amount = event.target.value.replace(/[\D]/gi, '');
        if (amount.length > 3){
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
                    <h3>Acquisition</h3>
                    <form>
                        <div className="inputWrapper">
                          <label>
                            Purchase Price
                          </label>
                          <input name="purchasePrice" type="text" value={this.state.purchasePrice} onChange={this.handleCurrency} placeholder="$0" required />
                        </div>
                        <div className="inputWrapper">
                          <label>
                            Equity
                          </label>
                          <input name="equity" type="text" value={this.state.equity} onChange={this.handleCurrency} placeholder="$0" required />
                        </div>
                        <div className="inputWrapper">
                          <label>
                            Size (sf)
                          </label>
                          <input name="sf" type="number" min="0" value={this.state.sf} onChange={this.handleOtherChange} />
                        </div>
                        <div className="inputWrapper">
                            <label>
                                Closing Costs
                          </label>
                                <input name="closingCosts" type="text" value={this.state.closingCosts} onChange={this.handleCurrency} placeholder="$0" />
                        </div>
                        <div className="inputWrapper">
                            <label>
                                Hold Length ({this.state.holdLength} Years)
                          </label>
                            <input name="holdLength" type="range" min="1" max="25" value={this.state.holdLength} onChange={this.handleOtherChange} required />
                        </div>
                          < CapExModal handleCurrency={this.handleCurrency} handleOtherChange={this.handleOtherChange} state={this.state}/>

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

module.exports = AddProperty;



