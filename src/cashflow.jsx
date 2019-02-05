const React = require('react');

class Cashflow extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      monthlyIncome: [],
    }
    this.calculateMonthlyIncome = this.calculateMonthlyIncome.bind(this);
  }

  //This is a function for taking multiple currency strings, adding them and converting back to string
  addCurrency(currencyArray) {
    const args = currencyArray;
    let total = 0;
    for (let i = 0; i <= args.length; i++) {
      if (args[i] !== '' && args[i] !== undefined) {
        let amount = Number(args[i].replace(/[\D]/gi, ''));
          total += amount;
      }
    }
    total = total.toString();
    if (total.length > 3) {
      let reverse = total.split('').reverse().join('');
      total = reverse.replace(/\d\d\d/gi, '$&' + ',').split('').reverse().join('');
      if (total[0] === ',') {
        total = total.slice(1, total.length);
      }
    }
    total = '$' + total;
    return total;
  }
// This is a function to convert all of the rent to a monthly income array for processing
  calculateMonthlyIncome(){
    let rentRoll = [];
    let totalGross = 0;
    for (let i = 0; i < this.props.state.acquisition.holdLength * 12; i += 1) {
      rentRoll.push(0);
    }

    // This portion of the function handles commercial rents

    let commercialRent = this.props.state.income.commercialRent;
    for (let i = 0; i < commercialRent.length; i ++) {
      let amount = commercialRent[i].amount;
      amount = Number(amount.replace(/[\D]/gi, ''));
      if (commercialRent[i].type === '$/sf/yr') {
        amount = (amount * Number(commercialRent[i].sf)) / 12;
      }
      if (commercialRent[i].type === '$/sf/month') {
        amount = amount * Number(commercialRent[i].sf);
      }

      //amount is now a number representing the monthly income in month 0

      const leaseStart = Number(commercialRent[i].moveIn);
      const leaseLength = Number(commercialRent[i].moveOut) - leaseStart;

      // variable for tracking the inflation of rent each year

      let rentInflation = 1;
      for (let i = 0; i < leaseLength; i += 12) {
        for (let j = i; j < i+12 && j < leaseLength; j += 1) {
          rentRoll[j] += Math.round((amount * rentInflation) * 100) / 100;
          totalGross += Math.round((amount * rentInflation) * 100) / 100;
        }
        rentInflation = rentInflation * (1 + (Number(this.props.state.options.inflateRents) / 100))
      }

    }

    //This portion of the function handles residential rents

    let residentialRent = this.props.state.income.residentialRent;
    for (let k= 0; k < residentialRent.length; k += 1) {
      let totalUnits = residentialRent[k].quantity;
      let rentPerUnit = residentialRent[k].amount;
      rentPerUnit = Number(rentPerUnit.replace(/[\D]/gi, ''));
      let occupancyAsDecimal = (residentialRent[k].occupancy / 100);
      for (let l = 0; l < rentRoll.length; l += 12) {
        for (let m = l; m < l + 12; m += 1) {
          let totalMonthly = Math.round((rentPerUnit * totalUnits * occupancyAsDecimal) * 100) / 100;
          rentRoll[m] += totalMonthly;
          totalGross += totalMonthly;
        }
        rentPerUnit = Math.round(rentPerUnit * (1 + (Number(this.props.state.options.inflateRents) / 100)) * 100) / 100;
      }
    }
    

  }

  numberToMoneyString(total){
    total = total.toString();
    if (total.length > 3) {
      let reverse = total.split('').reverse().join('');
      total = reverse.replace(/\d\d\d/gi, '$&' + ',').split('').reverse().join('');
      if (total[0] === ',') {
        total = total.slice(1, total.length);
      }
    }
    total = '$' + total;
    return total;
  }

  render(){
    if (this.props.isShowing === true) {
        this.calculateMonthlyIncome()
        let totalAcquisition = this.addCurrency([this.props.state.acquisition.purchasePrice, this.props.state.acquisition.closingCosts]);
        let totalEquity = this.addCurrency([this.props.state.acquisition.equity]);
        let totalFinancing = this.addCurrency([this.props.state.financing.loanAmount, this.props.state.financing.secondLoan.amount, this.props.state.financing.thirdLoan.amount]);
        return (
            <div className="form-area">
                <div className="back-button" onClick={this.props.backwards}>
                    <div className="next-button-text">
                        Back
                </div>
                </div>
                <div className="input-area">
                    <h3>IRR Key Metrics</h3>
                    <table className="key-metrics-table">
                        <tr className="key-metrics-row"><td className="key-metrics-cell">Acquisition: {totalAcquisition}</td><td className="key-metrics-cell">Total Gross Cashflow:</td></tr>
                        <tr className="key-metrics-row"><td className="key-metrics-cell">Equity: {totalEquity}</td><td className="key-metrics-cell">Total Expenses: $</td></tr>
                        <tr className="key-metrics-row"><td className="key-metrics-cell">Financing: {totalFinancing}</td><td className="key-metrics-cell">Term: </td></tr>
                        <tr className="key-metrics-row"><td className="key-metrics-cell">Exit Price: $</td><td className="key-metrics-cell">Total NOI: $</td></tr>
                    </table>
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

module.exports = Cashflow;
