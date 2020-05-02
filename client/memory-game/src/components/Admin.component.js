import React, { Component } from 'react';
import axios from 'axios';
import Map from "./Map.component";
import style from './styles/admin.css'

const SERVER_ADDRESS = process.env.NODE_ENV === "development" ? 'http://localhost:5000' : "";
export default class Admin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: "",
            password: "",
            email: "",
            search: "",
            country: "",
            status: "pending",
            statusMsg: 'Loading...',
            usersList: [],
            searchList: [],
            _id: "",
            rudeMassege: []
        };

        this.defaultHeader = [
            <th>_ID</th>,
            <th>NAME</th>,
            <th>PASSWORD</th>,
            <th>EMAIL</th>,
            <th>COUNTRY</th>,
            <th>PERMMISIONS</th>,
            <th>MESSAGES</th>,
            <th>RUDEMESSAGES</th>,
            <th>NUMOFGAMES</th>,
            <th>NUMOFVICTORYGAMES</th>,
            <th>ISBANNED</th>
        ]

        this.handleSubmitUpdate = this.handleSubmitUpdate.bind(this);
        this.handleInputChangeSignup = this.handleInputChangeSignup.bind(this);
        this.handleSubmitSearch = this.handleSubmitSearch.bind(this);
        this.handleSubmitView = this.handleSubmitView.bind(this);
        this.handleSubmitRemove = this.handleSubmitRemove.bind(this);
        this.handleSubmitBroadSearch = this.handleSubmitBroadSearch.bind(this);
        this.handleSubmitIsBanned = this.handleSubmitIsBanned.bind(this);
        this.handleInputChangeIsBanned = this.handleInputChangeIsBanned.bind(this);
        this.handleInputChangeUpdate = this.handleInputChangeUpdate.bind(this);
        this.handleInputChangeRemove = this.handleInputChangeRemove.bind(this);
        this.handleInputChangeSearch = this.handleInputChangeSearch.bind(this);
        this.handleSubmitBroadSearch = this.handleSubmitBroadSearch.bind(this);
        this.handleInputBroadSearch = this.handleInputBroadSearch.bind(this);
        this.renderTableData = this.renderTableData.bind(this);
        this.renderTableHeader = this.renderTableHeader.bind(this);
    }

    componentDidMount() {
        axios.get(`${SERVER_ADDRESS}/listUsers`).then((view) => {
            if (view.data.type === 'OK') {
                console.log(view.data.content);
                this.setState({ usersList: view.data.content, status: 'ready' });
            } else {
                this.setState({ status: 'error', statusMessage: `An error occoured:${view.data.content}` })
                console.log(view)
            }
        });
    }

    async handleSubmitSignup() {
        console.log(this.state);
        const response = await axios.get(`${SERVER_ADDRESS}/signup`, {
            params: {
                user: this.state.userToRegister,
                password: this.state.passToRegister,
                email: this.state.email,
                country: this.state.country,
                Permissions: this.state.Permissions,
                messages: this.state.messages,
                rudeMessages: this.state.rudeMessages,
                numOfGames: this.state.numOfGames,
                numOfVictoryGames: this.state.numOfVictoryGames,
                isBanned: this.state.isBanned,
                lat: this.state.lat,
                lng: this.state.lng


            }
        });

    }

    handleInputChangeSignup(event) {
        const target = event.target;
        const name = target.name;
        const value = target.value;
        this.setState({
            [name]: value
        })
    }

    handleInputChangeIsBanned(event) {
        const target = event.target;
        const name = target.name;
        const value = target.value;
        this.setState({
            [name]: value
        })
    }

    handleInputChangeUpdate(event) {
        const target = event.target;
        const name = target.name;
        const value = target.value;
        this.setState({
            [name]: value
        })
    }

    handleInputBroadSearch(event) {
        const target = event.target;
        const name = target.name;
        const value = target.value;
        this.setState({
            [name]: value
        })
    }

    handleInputChangeRemove(event) {
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
        const update = await axios.get(`${SERVER_ADDRESS}/update`, {
            params: {
                user: this.state.userToRegister,
                password: this.state.passToRegister,
                email: this.state.email
            }
        });
        console.log(update.data);
    }

    async handleSubmitBroadSearch() {
        console.log(this.state);
        const update = await axios.get(`${SERVER_ADDRESS}/BroadSearch`, {
            params: {
                user: this.state.userToRegister,
                country: this.state.country
            }
        });
        console.log(update.data);
        this.setState({ usersList: update.data.content });

    }

    async handleSubmitRemove() {
        const remove = await axios.get(`${SERVER_ADDRESS}/remove`, {
            params: {
                country: this.state.country
            }
        });
        console.log(remove.data);
    }

    async handleSubmitView() {

        const view = await axios.get(`${SERVER_ADDRESS}/listUsers`, {
            params: {
                user: this.state.userToRegister,
                password: this.state.passToRegister,
                email: this.state.email
            }
        })
    }


    renderTableHeader() {
        console.log(this.state.usersList)
        if (!(this.state.usersList) || !(this.state.usersList.length > 0))
            return this.defaultHeader
        let header = Object.keys(this.state.usersList[0])
        return header.filter(e => e !== 'lat' && e !== 'lng' && e !== 'score')
            .map((key, index) => {
                return <th key={index}>{key.toUpperCase()}</th>
            })
    }

    renderTableData() {
        console.log(this.state.usersList);
        return this.state.usersList.map((user, index) => {
            const { _id, name, password, score, email, country, rudeMessages, Permissions, numOfGames, numOfVictoryGames, messages, isBanned } = user //destructuring
            if (rudeMessages.length > 0) rudeMessages.map(e => `${e} `);
            console.log(isBanned);
            return (
                <tr key={_id}>
                    <td>{_id}</td>
                    <td>{name}</td>
                    <td>{password}</td>
                    {/* <td>{score}</td> */}
                    <td>{email}</td>
                    <td>{country}</td>
                    <td>{Permissions}</td>
                    <td>{messages}</td>
                    <td>{rudeMessages}</td>
                    <td>{numOfGames}</td>
                    <td>{numOfVictoryGames}</td>
                    <td>{`${isBanned}`}</td>
                </tr>
            )
        })
    }


    async handleSubmitSearch() {
        const search = await axios.get(`${SERVER_ADDRESS}/search`, {
            params: {
                country: this.state.country
            }
        });
        this.setState({ usersList: search.data.content });
    }

    async handleSubmitIsBanned() {

        const search = await axios.get(`${SERVER_ADDRESS}/isBanned`, {
            params: {
                _id: this.state._id
            }
        });
        console.log(search.data);
    }


    render() {
        if (this.state.status !== 'ready') return (<p>{this.state.statusMessage}</p>)
        return (
            <div id="admin_body">
                <a className="btn" href='/' onClick={(e) => {
                    localStorage.removeItem('user')
                }}>Logout</a>
                {/* <form onSubmit={this.handleSubmit}> */}
                <table id='users'>
                    <tbody>
                        <tr>{this.renderTableHeader()}</tr>
                        {this.renderTableData()}
                    </tbody>
                </table>
                {/*<br/>*/}
                {/*<table id='searchList'>*/}
                {/*    <tbody>*/}
                {/*    <tr>{this.renderTableHeader()}</tr>*/}
                {/*    {this.renderTableDataSearch()}*/}
                {/*    </tbody>*/}
                {/*</table>*/}
                <br />

                {/*<form>*/}
                {/*    <label>*/}
                {/*        ID name:*/}
                {/*        <input*/}
                {/*            name="_id"*/}
                {/*            type="text"*/}
                {/*            onChange={this.handleInputChangeRudeMessage}*/}
                {/*        />*/}
                {/*    </label>*/}
                {/*    <br/>*/}
                {/*    <label>*/}
                {/*        rudeMasseges:*/}
                {/*        <input*/}
                {/*            name="rudeMasseges"*/}
                {/*            type="text"*/}
                {/*            onChange={this.handleInputChangeRudeMessage}*/}
                {/*        />*/}
                {/*    </label>*/}
                {/*    <br/>*/}
                {/*</form>*/}
                {/*<button onClick={this.handleSubmitRudeMessage}>RudeMessage Sumbit</button>*/}

                <form>
                    <label>
                        User name:
                        <input
                            name="userToRegister"
                            type="text"
                            onChange={this.handleInputChangeUpdate}
                        />
                    </label>
                    <br />
                    <label>
                        Email:
                        <input
                            name="email"
                            type="text"
                            onChange={this.handleInputChangeUpdate}
                        />
                    </label>
                    <br />
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
                <label>
                    isBanned:
                    <input
                        name="_id"
                        // value={this.state.user}
                        type="text"
                        onChange={this.handleInputChangeIsBanned}
                    />
                </label>
                <button onClick={this.handleSubmitIsBanned}>IsBanned Sumbit</button>
                <label>
                    User name:
                    <input
                        name="userToRegister"
                        type="text"
                        onChange={this.handleInputBroadSearch}
                    />
                </label>
                <label>
                    country:
                    <input
                        name="country"
                        type="text"
                        onChange={this.handleInputBroadSearch}
                    />
                </label>
                <button onClick={this.handleSubmitBroadSearch}>BroadSearch Sumbit</button>
                <form>
                    <label>
                        User name:
                        <input
                            name="country"
                            type="text"
                            onChange={this.handleInputChangeRemove}
                        />
                    </label>
                </form>
                <button onClick={this.handleSubmitRemove}>Remove Sumbit</button>
                <button onClick={this.handleSubmitView}>View Sumbit</button>

                <label>
                    Search
                    <input
                        name="country"
                        type="text"
                        onChange={this.handleInputChangeSearch}
                    />
                </label>
                <button onClick={this.handleSubmitSearch}>Search Sumbit</button>

                <h1>Add users</h1>
                <form onSubmit={this.onSubmit}>
                    <input
                        placeholder="User"
                        name="userToRegister"
                        type="text"
                        onChange={this.handleInputChangeSignup}
                        required
                    />
                    <br />
                    <input
                        placeholder="Password"
                        name="passToRegister"
                        // value={this.state.user}
                        type="password"
                        onChange={this.handleInputChangeSignup}
                        required
                    />
                    <br />
                    <input
                        placeholder="Email"
                        name="email"
                        type="text"
                        onChange={this.handleInputChangeSignup}
                        required
                    />
                    <br />
                    <input
                        placeholder="Country"
                        name="country"
                        type="text"
                        onChange={this.handleInputChangeSignup}
                        required
                    />
                    <br />
                    <input
                        placeholder="Permissions"
                        name="Permissions"
                        type="text"
                        onChange={this.handleInputChangeSignup}
                        required
                    />
                    <br />
                    <button type='submit' className="login_btn login_btn-primary login_btn-block login_btn-large" onClick={this.handleSubmitSignup.bind(this)}>Add a managger</button>
                </form>

            </div>

        )
    }
}

