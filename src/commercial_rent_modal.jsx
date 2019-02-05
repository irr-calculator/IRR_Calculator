const React = require('react');

class CommercialRentModal extends React.Component {
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
    const key= event.target.name;
    newState[key] = amount;
    this.setState(newState);
  }
  handleChange(event) {
    let newState = Object.assign({}, this.state);
    const key = event.target.name;
    newState[key] = event.target.value;
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
                        Tenant Name / Unit Number
                </label>
                    <input name="name" type="text" value={this.state.name} onChange={this.handleChange} placeholder="Enter Name Here" />
                </div>
                <div className="inputWrapper">
                    <label>
                        SF Leased
                </label>
                    <input name="sf" type="number" value={this.state.sf} onChange={this.handleChange}/>
                </div>
                <div className="inputWrapper">
                    <label>
                        Move In Date (Month Relative To Model Start)
                </label>
                    <input name="moveIn" type="number" value={this.state.moveIn} onChange={this.handleChange}/>
                </div>
                <div className="inputWrapper">
                    <label>
                        Move Out Date (Month Relative To Model Start)
                </label>
                    <input name="moveOut" type="number" value={this.state.moveOut} onChange={this.handleChange}/>
                </div>
                <div className="inputWrapper">
                    <label>
                        Amount ($)
                </label>
                    <input name="amount" type="text" value={this.state.amount} onChange={this.handleCurrency} placeholder="$0" />
                </div>
                <div className="inputWrapper">
                    <label>
                        Rental Rate Type
                </label>
                    <select name="type" onChange={this.handleChange}>
                        <option name="type" value="$/sf/yr">$/SF/Year</option>
                        <option name="type" value="$/sf/month">$/SF/Month</option>
                        <option name="type" value="$/month">$/Month</option>
                    </select>
                </div>
            </div>
          </div>
        </div>
      )
  }
}

module.exports = CommercialRentModal;