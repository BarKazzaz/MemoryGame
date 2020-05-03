import React, { Component } from "react";
import Map from "./Map.component";
import { SimplePieChart } from "./simplePieChart";

const SERVER_ADDRESS = process.env.NODE_ENV === "development" ? 'http://localhost:5000' : "";

export default class About extends Component {
    constructor(props) {
        super(props);
        this.state = {
            countries: []
        }
    }
    componentDidMount() {
        fetch(`${SERVER_ADDRESS}/api/getAllCountries`)
            .then(res => res.json())
            .then(data => { console.log(data); return new Promise((resolve, reject) => resolve(data)) })
            .then(data => this.setState({ status: 'ready', countries: data.content }))
            .then(() => { console.log(this.state.countries) })
            .catch(err => { console.log(err) });
    }
    render() {
        if (!this.state.countries)
            return <p>loading</p>
        return (
            <div>
                <h1>Welcome to our game!</h1>
                <h2>We have users all around the world</h2>
                <div style={{ height: '75vh' }}>
                    <Map countries={this.state.countries} />
                </div>
                <div className='pie' id='countriesPie'>
                    <p>Users chart:</p>
                    <SimplePieChart data={this.state.countries} />
                </div>
                <p style={{ color: 'red' }}>Found a bug? Got banned?</p>
                <p style={{ color: 'red' }}>contact us at barkazzaz@gmail.com</p>
            </div>
        )
    }
}