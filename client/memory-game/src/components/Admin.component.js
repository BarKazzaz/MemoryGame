import React, { Component }  from 'react';
import axios from 'axios';
import Map from "./Map.component";

export default class Admin extends Component{
    constructor(props){
        super(props);
        this.state = {
            user : "",
            password : "",
            email : "",
            search : "",
            country: ""
        }
        this.handleSubmitUpdate = this.handleSubmitUpdate.bind(this);
        this.handleSubmitSearch = this.handleSubmitSearch.bind(this);
        this.handleSubmitView = this.handleSubmitView.bind(this);
        this.handleInputChangeUpdate = this.handleInputChangeUpdate.bind(this);
        this.handleInputChangeSearch = this.handleInputChangeSearch.bind(this);

    }

    bar(x, y){
        return x * y;
    }

    handleInputChangeUpdate(event) {
        const target = event.target;
        const name = target.name;
        const value = target.value;
        this.setState({
            [name]: value
        })
    }

    handleInputChangeSearch(event) {
        const target = event.target;
        const name = target.name;
        const value = target.value;
        this.setState({
            [name]: value
        })
    }

    async handleSubmitUpdate() {
        console.log(this.state);
        const update = await axios.get("http://localhost:5000/update", {
            params: {
                user: this.state.userToRegister,
                password: this.state.passToRegister,
                email: this.state.email
            }});
        console.log(update.data);
    }

    async handleSubmitView() {

        const view = await axios.get("http://localhost:5000/list", {
            params: {
                user: this.state.userToRegister,
                password: this.state.passToRegister,
                email: this.state.email
            }});
        console.log(view.data);
    }

    async handleSubmitSearch() {

        const search = await axios.get("http://localhost:5000/search", {
            params: {
                country: this.state.country
                // user: this.state.userToRegister,
                // password: this.state.passToRegister,
               //country: this.state.country
            }});
        console.log(search.data);
    }

        render(){
        return(
            <div style={this.compStyle}>
                {/* <form onSubmit={this.handleSubmit}> */}
                <form>
                    <label>
                        User name:
                        <input
                            name="userToRegister"
                            type="text"
                            onChange={this.handleInputChangeUpdate}
                        />
                    </label>
                    <br/>
                    <label>
                        Email:
                        <input
                            name="email"
                            type="text"
                            onChange={this.handleInputChangeUpdate}
                        />
                    </label>
                    <br/>
                    <label>
                        Password:
                        <input
                            name="passToRegister"
                            // value={this.state.user}
                            type="password"
                            onChange={this.handleInputChangeUpdate}
                        />
                    </label>



                </form>
                <button onClick={this.handleSubmitUpdate}>Update Sumbit</button>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <button onClick={this.handleSubmitView}>View Sumbit</button>
                <br/>

                <label>
                    Search
                    <input
                        name="country"
                        type="text"
                        onChange={this.handleInputChangeSearch}
                    />
                </label>
                <button onClick={this.handleSubmitSearch}>Search Sumbit</button>

            </div>

        )
    }
}
// export default Admin;