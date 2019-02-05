const React = require('react');

class ResidentialRentModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = this.props.currentRow;
        this.handleCurrency = this.handleCurrency.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }
    closeModal(event) {
        event.preventDefault();
        let modal = document.getElementById(this.props.currentRow.id);
        modal.style.display = 'none';
        this.props.submitChange(this.state);
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
        const key = event.target.name;
        newState[key] = amount;
        this.setState(newState);
    }
    handleChange(event) {
        let newState = Object.assign({}, this.state);
        let amount = event.target.value;
        const key = event.target.name;
        if (key === 'vacant' && Number(amount) > Number(newState.quantity)) {
            amount = newState.quantity;
        }
        newState[key] = amount;
        this.setState(newState);
    }
    render() {
        return (
            <div className="inputWrapper">
                <div id={this.props.currentRow.id} className="modal">
                    <div className="modal-content">
                        <button className="modal-close" onClick={this.closeModal}>X</button>
                        <div className="inputWrapper">
                            <label>
                                Configuration Name
                        </label>
                            <input name="name" type="text" value={this.state.name} onChange={this.handleChange} placeholder="Enter Name Here" />
                        </div>
                        <div className="inputWrapper">
                            <label>
                                Bedrooms
                        </label>
                            <input name="bedrooms" type="number" value={this.state.bedrooms} onChange={this.handleChange} />
                        </div>
                        <div className="inputWrapper">
                            <label>
                                Bathrooms
                        </label>
                            <input name="bathrooms" type="number" value={this.state.bathrooms} onChange={this.handleChange} />
                        </div>
                        <div className="inputWrapper">
                            <label>
                                Rent ($/Month)
                        </label>
                            <input name="amount" type="text" value={this.state.amount} onChange={this.handleCurrency} placeholder="$0" />
                        </div>
                        <div className="inputWrapper">
                            <label>
                                SF
                        </label>
                            <input name="sf" type="number" value={this.state.sf} onChange={this.handleChange} />
                        </div>
                        <div className="inputWrapper">
                            <label>
                                Quantity
                        </label>
                            <input name="quantity" type="number" value={this.state.quantity} onChange={this.handleChange} />
                        </div>
                        <div className="inputWrapper">
                            <label>
                                Average Occupancy (%);
                        </label>
                            <input name="occupancy" type="number" value={this.state.occupancy} onChange={this.handleChange} />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

module.exports = ResidentialRentModal;