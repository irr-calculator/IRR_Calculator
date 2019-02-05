const React = require('react');
const InputRentalRow = require('./input_rental_row.jsx');
const CommercialRentModal = require('./commercial_rent_modal.jsx');
const ResidentialRentModal = require('./residential_rent_modal.jsx');
const ResidentialRow = require('./residential_rent_row.jsx');

class IncomeTable extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            commercialRent: [],
            residentialRent: [],
            otherRent: [],
            nextCommercialId: 1,
            nextOtherId:1,
            nextResidentialId:1,
        }
        this.addRow = this.addRow.bind(this);
        this.submitChange = this.submitChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    addRow(event){
        event.preventDefault();
        const type = event.target.name;
        if (type === 'commercial') {
            let newState = Object.assign({}, this.state);
            let newRow = {
                id: 'c' + newState.nextCommercialId,
                name: '',
                sf: 0,
                moveIn: 0,
                moveOut: 0,
                type: '$/sf/yr',
                amount: 0,
                serviceType: 'Full Service',
                isFirstOpen: true,
            };
            newState.nextCommercialId += 1;
            newState.commercialRent.push(newRow);
            this.setState(newState);
        }
        if (type === 'other') {
            let newState = Object.assign({}, this.state);
            let newRow = {
                id: 'o' + newState.nextOtherId,
                start: 0,
                end: this.props.state.acquisition.holdLength,
                unit: '$/month',
                amount: 0,
                isFirstOpen: true,
            };
            newState.nextOtherId += 1;
            newState.otherRent.push(newRow);
            this.setState(newState);
        }
        if (type === 'residential') {
            const newState = Object.assign({}, this.state);
            let newRow = {
                id: 'r' + newState.nextResidentialId,
                name: '',
                bedrooms: 0,
                bathrooms: 1,
                sf: 0,
                type: '$/month',
                quantity: 0,
                occupancy: 0,
                amount: '',
                isFirstOpen: true,
            };
            newState.nextResidentialId += 1;
            newState.residentialRent.push(newRow);
            this.setState(newState);
        }
    }
    openModal (event){
        event.preventDefault();
        let row = event.target.name;
        const modal = document.getElementById(row);
        modal.style.display = 'block';
    }
    submitChange(object){
        const id = object.id;
        const type = id.split(/\d/gi)[0];
        if (type === 'c') {
            for (let i = 0; i < this.state.commercialRent.length; i++) {
                if (this.state.commercialRent[i].id === id) {
                    let newState = Object.assign({}, this.state);
                    newState.commercialRent[i] = object;
                    this.setState(newState);
                }
            }
        }
        if (type === 'o') {
            for (let i = 0; i < this.state.otherRent.length; i++) {
                if (this.state.otherRent[i].id === id) {
                    const newState = Object.assign({}, this.state);
                    newState.otherRent[i] = object;
                    this.setState(newState);
                }
            }
        }
        if (type === 'r') {
            for (let i = 0; i < this.state.residentialRent.length; i++) {
                if (this.state.residentialRent[i].id === id) {
                    const newState = Object.assign({}, this.state);
                    newState.residentialRent[i] = object;
                    this.setState(newState);
                }
            }
        }
    }
    componentDidUpdate() {
        for (let i = 0; i < this.state.commercialRent.length; i++) {
            if (this.state.commercialRent[i].isFirstOpen === true) {
                let newState = Object.assign({}, this.state);
                newState.commercialRent[i].isFirstOpen = false;
                const modal = document.getElementById(newState.commercialRent[i].id);
                this.setState(newState);
                modal.style.display = 'block';
            }
        }
        for (let i = 0; i < this.state.residentialRent.length; i++) {
            if (this.state.residentialRent[i].isFirstOpen === true) {
                let newState = Object.assign({}, this.state);
                newState.residentialRent[i].isFirstOpen = false;
                const modal = document.getElementById(newState.residentialRent[i].id);
                this.setState(newState);
                modal.style.display = 'block';
            }
        }
    }
    handleSubmit(event) {
        event.preventDefault();
        console.log(this.state);
        this.props.advanceEntry(this.state);
    }

    render(){
        if (this.props.isShowing === true) {
            return (
                <div className="form-area">
                    <div className="back-button" onClick={this.props.backwards}>
                        <div className="next-button-text">
                            Back
                  </div>
                    </div>
                    <div className="input-area">
                              <h3>Commercial Rent</h3>
                                {this.state.commercialRent.map((row) => {
                                    return <CommercialRentModal currentRow={row} submitChange={this.submitChange}/>
                                })}
                                {this.state.residentialRent.map((row) => {
                                    return <ResidentialRentModal currentRow={row} submitChange={this.submitChange} />
                                })}
                              <table className='income-table'>
                                <tbody>
                                <tr><th>Name</th><th>Size</th><th>Rate</th><th>Move In/Out</th><th>Lease Type</th></tr>

                                {this.state.commercialRent.map((row) => {
                                    return <InputRentalRow key={row.id} currentRow={row} openModal={this.openModal}/>
                                })}
                                </tbody>
                                </table>
                                <button name="commercial" onClick={this.addRow}>Add Row</button>
                        <h3>Residential Rent</h3>
                        <table className='income-table'>
                            <tbody>
                                <tr><th>Config.</th><th>Size</th><th>Rate</th><th>Bedroom/Bath</th><th>Quantity</th></tr>

                                {this.state.residentialRent.map((row) => {
                                    return <ResidentialRow key={row.id} currentRow={row} openModal={this.openModal} />
                                })}
                            </tbody>
                        </table>
                        <button name="residential" onClick={this.addRow}>Add Row</button>
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

module.exports = IncomeTable;