const React = require('react');
const AddProperty = require('./add_property.jsx');
const Financing = require('./financing.jsx');
const IncomeTable = require('./income-table.jsx');
const Expenses = require('./expenses.jsx');
const Options = require('./model_options.jsx');

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            position: 0,
            currentlyShowing: [true, false, false, false, false, false],
            acquisition: {
                purchasePrice: '',
                equity: '',
                sf: 0,
                closingCosts: '',
                holdLength: 0,
                capEx: '',
                capExStart: 0,
                capExEnd: 0,
                cashFlowDuringCapEx: true,
            },
            financing: {
                loanAmount: '',
                interest: 3,
                term: 5,
                ammortization: 30,
                loans: [],
            },
        }
        this.advanceEntry = this.advanceEntry.bind(this);
        this.backEntry = this.backEntry.bind(this);
    }
    //Button to advance content to the next entry frame
    advanceEntry(object){
        let newState = Object.assign({}, this.state);
        if (newState.position === 1) {
            newState.acquisition = object;
        }
        if (newState.position === 2) {
            newState.financing = object;
        }
        newState.currentlyShowing[newState.position] = false;
        newState.position += 1;
        newState.currentlyShowing[newState.position] = true;
        this.setState(newState);
    }
    backEntry(){
        let newState = Object.assign({}, this.state);
        newState.currentlyShowing[newState.position] = false;
        newState.position -=1;
        newState.currentlyShowing[newState.position] = true;
        this.setState(newState);
    }

    //function to check if the get started button is requireds
    startButton(){
        if (this.state.currentlyShowing[0] === true) {
            return <button className="advanceButton" onClick={this.advanceEntry}>Get Started</button>
        }
    }

    render() {
        const button = this.startButton();
        return (
            <div className="centerFrame">
              {button}
              <AddProperty backwards={this.backEntry} handleCurrency={this.handleCurrency} advanceEntry={this.advanceEntry} isShowing={this.state.currentlyShowing[1]} />
              <Financing backwards={this.backEntry}advanceEntry={this.advanceEntry} isShowing={this.state.currentlyShowing[2]} state={this.state}/>
              <IncomeTable backwards={this.backEntry} advanceEntry={this.advanceEntry} isShowing={this.state.currentlyShowing[3]} state={this.state} />
                <Expenses backwards={this.backEntry} advanceEntry={this.advanceEntry} isShowing={this.state.currentlyShowing[4]} state={this.state} />
                <Options backwards={this.backEntry} advanceEntry={this.advanceEntry} isShowing={this.state.currentlyShowing[5]} state={this.state} />
            </div>
        )
    }
}

module.exports = App;