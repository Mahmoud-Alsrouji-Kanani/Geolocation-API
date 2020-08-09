import React from 'react';
import ReactDOM from 'react-dom';
import SeasonDisplay from './SeasonDisplay';
import Spinner from './Spinner';

class App extends React.Component {
    /*constructor(props) {
        super(props); // this is to make sure that constructor of the React.Component class gets called

        // THIS IS THE ONLY TIME WE DO DIRECT ASSIGNMENT TO this.state
        this.state = { lat: null, errorMessage: '' };
    }*/

    state = { lat: null, errorMessage: '', time: new Date().toLocaleTimeString() };

    componentDidMount() {
        console.log('My component was rendered to the screen');
        window.navigator.geolocation.getCurrentPosition(
            (position) => {
                console.log(position.coords.latitude);
                // update the state only through setState
                this.setState({ lat: position.coords.latitude });
            },
            (err) => {
                this.setState({ errorMessage: err.message });
            }
        );

        setInterval(() => {
            const currTime = new Date().toLocaleTimeString();
            this.setState({ time: currTime });
        }, 1000)
    }

    componentDidUpdate() {
        console.log('My component was just updated - it rerendered!');
    }

    renderContent() {
        if(this.state.errorMessage && !this.state.lat) {
            return <div>Error: { this.state.errorMessage }</div>
        }
        if(!this.state.errorMessage && this.state.lat) {
            return <SeasonDisplay lat={this.state.lat} />
        }
        return (
            <Spinner message="Please accept the location request" />
        );
    }

    render() {
        return <div>
            <span style={{ position: 'absolute', left: 'calc(50% - 100px)', top: '10px' }}>The time is: { this.state.time }</span>
            { this.renderContent() }
        </div>
    }
}

ReactDOM.render(
    <App />,
    document.querySelector('#root')
);