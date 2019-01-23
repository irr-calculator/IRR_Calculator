const React = require('react');
const Search = require('./search.jsx');

class App extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount(){
        const string = 'https://www.rent.com/california/san-francisco/apartments_condos_houses_townhouses';
        fetch(string).then((data)=>{
            console.log(data);
        })
    }
    render() {
        return (
            <Search />
        )
    }
}

module.exports = App;