const React = require('react');

class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({ value: event.target.value });
    }

    handleSubmit(event){
        event.preventDefault();
        console.log(this.state.value);
    }

    render() {
        return(
            <form className="searchFrame" onSubmit={this.handleSubmit}>
              <label>
                  Enter Zipcode 
              <input type="text" value={this.state.value} onChange={this.handleChange} className="searchBar"/>
              </label>
              <input type="submit" value="Submit"/>
            </form>
        )
    }
}

module.exports = Search;
