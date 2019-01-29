const React = require('react');

const Cashflow = (props) =>{
    const addCurrency =(stuff) => {
        const args = stuff;
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
    const calculateFinalIncome = ()=> {
        let income = props.state.income;
        let finalYearIncome = 0;
        let allIncome = 0;
        let termInMonths = props.state.acquisition.holdLength * 12;
        if (income.commercialRent.length > 0){
            for (let i = 0; i < income.commercialRent.length; i+= 1) {
                if (income.commercialRent[i].moveOut >= termInMonths) {
                    if (income.commercialRent[i].type = '$/sf/yr') {
                        let amount = income.commercialRent[i].amount;
                        amount = Number(amount.replace(/[\D]/gi, ''));
                        amount = amount * Number(income.commercialRent[i].sf);
                        let length = Math.floor((Number(termInMonths) - Number(income.commercialRent[i].moveIn)) / 12);
                        for (let i = 0; i < length; i ++) {
                            const inflation = (Number(props.state.options.inflateRents) / 100);
                            amount = amount * (inflation + 1);
                            allIncome += amount;
                        }
                        finalYearIncome += amount
                    }
                }
            }
        }
        if (income.residentialRent.length > 0){

        }
        if (income.otherRent.length > 0){

        }
        allIncome = Math.floor(allIncome);
        if (allIncome.length > 3) {
            let reverse = allIncome.split('').reverse().join('');
            allIncome = reverse.replace(/\d\d\d/gi, '$&' + ',').split('').reverse().join('');
            if (allIncome[0] === ',') {
                allIncome = allIncome.slice(1, allIncome.length);
            }
        }
        allIncome = '$' + allIncome;

        let total = Math.floor(finalYearIncome);
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
    const calculateFinalIncome2 = () => {
        let income = props.state.income;
        let finalYearIncome = 0;
        let allIncome = 0;
        let termInMonths = props.state.acquisition.holdLength * 12;
        if (income.commercialRent.length > 0) {
            for (let i = 0; i < income.commercialRent.length; i += 1) {
                if (income.commercialRent[i].moveOut >= termInMonths) {
                    if (income.commercialRent[i].type = '$/sf/yr') {
                        let amount = income.commercialRent[i].amount;
                        amount = Number(amount.replace(/[\D]/gi, ''));
                        amount = amount * Number(income.commercialRent[i].sf);
                        let length = Math.floor((Number(termInMonths) - Number(income.commercialRent[i].moveIn)) / 12);
                        for (let i = 0; i < length; i++) {
                            const inflation = (Number(props.state.options.inflateRents) / 100);
                            amount = amount * (inflation + 1);
                            allIncome += amount;
                        }
                        finalYearIncome += amount
                    }
                }
            }
        }
        if (income.residentialRent.length > 0) {

        }
        if (income.otherRent.length > 0) {

        }
        allIncome = Math.floor(allIncome);
        if (allIncome.length > 3) {
            let reverse = allIncome.split('').reverse().join('');
            allIncome = reverse.replace(/\d\d\d/gi, '$&' + ',').split('').reverse().join('');
            if (allIncome[0] === ',') {
                allIncome = allIncome.slice(1, allIncome.length);
            }
        }
        allIncome = '$' + allIncome;
        return allIncome;
    }


    if (props.isShowing === true) {
        let totalGross = calculateFinalIncome2();
        let totalAcquisition = addCurrency([props.state.acquisition.purchasePrice, props.state.acquisition.closingCosts]);
        let totalEquity = addCurrency([props.state.acquisition.equity]);
        let totalFinancing = addCurrency([props.state.financing.loanAmount, props.state.financing.secondLoan.amount, props.state.financing.thirdLoan.amount]);
        let finalYearGross = calculateFinalIncome();
        return (
            <div className="form-area">
                <div className="back-button" onClick={props.backwards}>
                    <div className="next-button-text">
                        Back
                </div>
                </div>
                <div className="input-area">
                    <h3>IRR Key Metrics</h3>
                    <table className="key-metrics-table">
                        <tr className="key-metrics-row"><td className="key-metrics-cell">Acquisition: {totalAcquisition}</td><td className="key-metrics-cell">Total Gross Cashflow: {totalGross}</td></tr>
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

module.exports = Cashflow;
