import React, { Component } from 'react';
import axios from 'axios';
import Map from "./Map.component";
import style from './styles/admin.css'

const SERVER_ADDRESS = process.env.NODE_ENV === "development" ? 'http://localhost:5000' : "";
export default class Admin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            _id: "",
            user: "", // name
            password: "",
            email: "",
            country: "",
            Permissions: "",
            isBanned: "",
            search: "",
            status: "pending",
            statusMsg: 'Loading...',
            usersList: [],
            searchList: [],
            rudeMassege: [],
            showEditOrRemove: false,
            editOrRemove: '',
            clickedUser: '',
            updatedUsers: [],
            shouldSplit: true
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
        this.toggleEditOrRemove = this.toggleEditOrRemove.bind(this);
        this.handleTrClick = this.handleTrClick.bind(this);
        this.SubmitEditOrRemove = this.SubmitEditOrRemove.bind(this);
    }

    componentDidMount() {
        axios.get(`${SERVER_ADDRESS}/listUsers`).then((view) => {
            if (view.data.type === 'OK') {
                this.setState({ usersList: view.data.content, status: 'ready' });
            } else {
                this.setState({ status: 'error', statusMessage: `An error occoured:${view.data.content}` })
            }
        });
    }

    async handleSubmitSignup() {
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

    toggleEditOrRemove(id) {
        this.setState({ showEditOrRemove: !this.state.showEditOrRemove })
    }

    handleTrClick(event) {
        if (this.state.editOrRemove) return
        const id = event.target.parentElement.firstElementChild.innerText;
        this.toggleEditOrRemove(id);
        this.setState({ clickedUser: id })
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
        this.setState({ [name]: value })
    }

    async handleSubmitUpdate() {
        const update = await axios.get(`${SERVER_ADDRESS}/update`, {
            params: {
                name: this.state.userToRegister,
                password: this.state.passToRegister,
                email: this.state.email
            }
        });
    }

    async handleSubmitBroadSearch() {
        const update = await axios.get(`${SERVER_ADDRESS}/BroadSearch`, {
            params: {
                user: this.state.userToRegister,
                country: this.state.country
            }
        });
        this.setState({ usersList: update.data.content });
    }

    async handleSubmitRemove() {
        const remove = await axios.get(`${SERVER_ADDRESS}/remove`, {
            params: {
                country: this.state.country
            }
        });
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
        if (!(this.state.usersList) || !(this.state.usersList.length > 0))
            return this.defaultHeader
        let header = Object.keys(this.state.usersList[0])
        return header.filter(e => e !== 'lat' && e !== 'lng' && e !== 'score')
            .map((key, index) => {
                return <th key={index}>{key.toUpperCase()}</th>
            })
    }

    tdChangeHandler(id) {
        let users = this.state.updatedUsers;
        if (users.find(usr => usr === id)) return
        else {
            users.push(id);
            console.log('adding:', id);
            this.state.updatedUsers = users;
        }
    }
    tdChangeHandlerName(event) {
        this.tdChangeHandler(event.target.parentElement.firstElementChild.innerText);
        let uList = this.state.usersList.map(e => {
            if (e._id === event.target.parentElement.firstElementChild.innerText)
                e.name = event.target.innerText
            return e;
        });
        this.state.usersList = uList
    }

    tdChangeHandlerPassword(event) {
        this.tdChangeHandler(event.target.parentElement.firstElementChild.innerText);
        let uList = this.state.usersList.map(e => {
            if (e._id === event.target.parentElement.firstElementChild.innerText)
                e.password = event.target.innerText
            return e;
        });
        this.state.usersList = uList
    }

    tdChangeHandlerEmail(event) {
        this.tdChangeHandler(event.target.parentElement.firstElementChild.innerText);
        let uList = this.state.usersList.map(e => {
            if (e._id === event.target.parentElement.firstElementChild.innerText)
                e.email = event.target.innerText
            return e;
        });
        this.state.usersList = uList
    }

    tdChangeHandlerCountry(event) {
        this.tdChangeHandler(event.target.parentElement.firstElementChild.innerText);
        let uList = this.state.usersList.map(e => {
            if (e._id === event.target.parentElement.firstElementChild.innerText)
                e.country = event.target.innerText
            return e;
        });
        this.state.usersList = uList
    }

    tdChangeHandlerPermissions(event) {
        this.tdChangeHandler(event.target.parentElement.firstElementChild.innerText);
        let uList = this.state.usersList.map(e => {
            if (e._id === event.target.parentElement.firstElementChild.innerText)
                e.Permissions = event.target.innerText
            return e;
        });
        this.state.usersList = uList
    }

    tdChangeHandlerMessages(event) {
        this.tdChangeHandler(event.target.parentElement.firstElementChild.innerText);
        let uList = this.state.usersList.map(e => {
            if (e._id === event.target.parentElement.firstElementChild.innerText)
                e.messages = event.target.innerText
            return e;
        });
        this.state.usersList = uList
    }

    tdChangeHandlerRudes(event) {
        this.tdChangeHandler(event.target.parentElement.firstElementChild.innerText);
        let uList = this.state.usersList.map(e => {
            if (e._id === event.target.parentElement.firstElementChild.innerText)
                e.rudeMessages = event.target.innerText.split(';')
            return e;
        });
        this.state.usersList = uList;
    }

    tdChangeHandlerGames(event) {
        this.tdChangeHandler(event.target.parentElement.firstElementChild.innerText);
        let uList = this.state.usersList.map(e => {
            if (e._id === event.target.parentElement.firstElementChild.innerText)
                e.numOfGames = event.target.innerText
            return e;
        });
        this.state.usersList = uList
    }

    tdChangeHandlerWins(event) {
        this.tdChangeHandler(event.target.parentElement.firstElementChild.innerText);
        let uList = this.state.usersList.map(e => {
            if (e._id === event.target.parentElement.firstElementChild.innerText)
                e.numOfVictoryGames = event.target.innerText
            return e;
        });
        this.state.usersList = uList
    }

    tdChangeHandlerBanned(event) {
        this.tdChangeHandler(event.target.parentElement.firstElementChild.innerText);
        let uList = this.state.usersList.map(e => {
            if (e._id === event.target.parentElement.firstElementChild.innerText)
                e.isBanned = event.target.innerText
            return e;
        });
        this.state.usersList = uList
    }

    renderTableData() {
        if (!(this.state.usersList instanceof Array))
            return <div></div>
        return this.state.usersList.map((user, index) => {
            const { _id, name, password, score, email, country, rudeMessages, Permissions, numOfGames, numOfVictoryGames, messages, isBanned } = user //destructuring
            let _rudes;
            if ((rudeMessages instanceof Array) && rudeMessages.length > 0) {
                _rudes = rudeMessages.map(e => e);
                for (let i = 0; i < _rudes.length - 1; i++) {
                    _rudes[i] = `${rudeMessages[i]};`
                }
            }
            return (
                <tr onClick={this.handleTrClick} key={name}>
                    <td>{_id}</td>
                    <td className={_id} suppressContentEditableWarning={true} contentEditable={this.state.editOrRemove === 'EDIT' && this.state.clickedUser === _id} onKeyUp={this.tdChangeHandlerName.bind(this)}>{name}</td>
                    <td className={_id} suppressContentEditableWarning={true} contentEditable={this.state.editOrRemove === 'EDIT' && this.state.clickedUser === _id} onKeyUp={this.tdChangeHandlerPassword.bind(this)}>{password}</td>
                    {/* <td className={_id} suppressContentEditableWarning={true} contentEditable={this.state.editOrRemove === 'EDIT' && this.state.clickedUser === _id} onKeyUp={this.tdChangeHandler.bind(this)}>{score}</td> */}
                    <td className={_id} suppressContentEditableWarning={true} contentEditable={this.state.editOrRemove === 'EDIT' && this.state.clickedUser === _id} onKeyUp={this.tdChangeHandlerEmail.bind(this)}>{email}</td>
                    <td className={_id} suppressContentEditableWarning={true} contentEditable={this.state.editOrRemove === 'EDIT' && this.state.clickedUser === _id} onKeyUp={this.tdChangeHandlerCountry.bind(this)}>{country}</td>
                    <td className={_id} suppressContentEditableWarning={true} contentEditable={this.state.editOrRemove === 'EDIT' && this.state.clickedUser === _id} onKeyUp={this.tdChangeHandlerPermissions.bind(this)}>{Permissions}</td>
                    <td className={_id} suppressContentEditableWarning={true} contentEditable={this.state.editOrRemove === 'EDIT' && this.state.clickedUser === _id} onKeyUp={this.tdChangeHandlerMessages.bind(this)}>{messages}</td>
                    <td className={_id} suppressContentEditableWarning={true} contentEditable={this.state.editOrRemove === 'EDIT' && this.state.clickedUser === _id} onKeyUp={this.tdChangeHandlerRudes.bind(this)}>{_rudes}</td>
                    <td className={_id} suppressContentEditableWarning={true} contentEditable={this.state.editOrRemove === 'EDIT' && this.state.clickedUser === _id} onKeyUp={this.tdChangeHandlerGames.bind(this)}>{numOfGames}</td>
                    <td className={_id} suppressContentEditableWarning={true} contentEditable={this.state.editOrRemove === 'EDIT' && this.state.clickedUser === _id} onKeyUp={this.tdChangeHandlerWins.bind(this)}>{numOfVictoryGames}</td>
                    <td className={_id} suppressContentEditableWarning={true} contentEditable={this.state.editOrRemove === 'EDIT' && this.state.clickedUser === _id} onKeyUp={this.tdChangeHandlerBanned.bind(this)}>{`${isBanned}`}</td>
                </tr>
            )
        })
    }

    handleBannedClicked(event) {
        if (event.target.checked)
            this.setState({ isBanned: `${event.target.checked}` })
        else
            this.setState({ isBanned: `` })
    }

    async handleSubmitSearch() {
        console.log('sending to search', this.state.user, this.state.email, this.state.country, this.state.Permissions, this.state.isBanned)
        const search = await axios.get(`${SERVER_ADDRESS}/api/search`, {
            params: {
                name: this.state.user,
                email: this.state.email,
                country: this.state.country,
                Permissions: this.state.Permissions,
                isBanned: this.state.isBanned
            }
        });
        console.log(search);
        this.setState({ usersList: search.data.content });
    }

    async handleSubmitIsBanned() {
        const search = await axios.get(`${SERVER_ADDRESS}/isBanned`, {
            params: {
                _id: this.state._id
            }
        });
    }

    saveUpdates() {
        this.setState({ status: 'updating', statusMessage: `Updating user: ${this.state.updatedUsers[0]}` })
        // [0] because we currently allow only one user to be updated at a time
        console.log("saving changes for", this.state.updatedUsers);
        new Promise((resolve, reject) => {
            resolve(this.state.usersList.filter(e => e._id === this.state.updatedUsers[0])[0]);
        }).then((user) => {
            axios.get(`${SERVER_ADDRESS}/api/update`, {
                params: {
                    _id: user._id,
                    name: user.name,
                    password: user.password,
                    email: user.email,
                    score: user.score,
                    country: user.country,
                    Permissions: user.Permissions,
                    messages: user.messages,
                    rudeMessages: user.rudeMessages.toString().replace(',', ';'),
                    numOfGames: user.numOfGames,
                    numOfVictoryGames: user.numOfVictoryGames,
                    isBanned: user.isBanned,
                    lng: user.lng,
                    lat: user.lat
                }
            })
        }).then(data => { console.log("updated successfully", data); this.setState({ status: 'ready' }) })
            .catch((err) => console.error("error updating", err))
            .finally(() => this.setState({ clickedUser: '', updatedUsers: [], editOrRemove: '' }))
    }

    SubmitEditOrRemove(e) {
        this.setState({ editOrRemove: e.target.innerText, showEditOrRemove: false })
        if (e.target.innerText === 'REMOVE')
            this.removeSelectedUser()
    }

    removeSelectedUser() {
        if (this.state.clickedUser) {
            this.setState({ status: 'deleting', statusMessage: `Deleting user: ${this.state.clickedUser}` })
            new Promise((resolve, reject) => resolve(this.state.usersList.filter(e => e._id === this.state.clickedUser)[0]))
                .then((user) => {
                    console.log(user);
                    axios.get(`${SERVER_ADDRESS}/api/remove`, {
                        params: { _id: user._id }
                    })
                }).then(data => { console.log("deleted successfully", data); this.setState({ status: 'ready' }) })
                .catch((err) => console.error("error deleting", err))
                .finally(() => { this.setState({ clickedUser: '', updatedUsers: [], editOrRemove: '' }); this.handleSubmitSearch()})//////////// BAR IS HERE
        }
    }

    onSubmit = (e) => e.preventDefault();

    render() {
        if (this.state.status !== 'ready') return (<p>{this.state.statusMessage}</p>)
        let editOrRemove = this.state.showEditOrRemove
            ? <div id='editOrRemove' style={{ display: 'absolute' }}>
                <button onClick={this.SubmitEditOrRemove}>EDIT</button>
                <button onClick={this.SubmitEditOrRemove}>REMOVE</button>
            </div>
            : <div></div>
        let saveButton = this.state.editOrRemove === 'EDIT' ? <button className="login_btn login_btn-primary login_btn-block login_btn-large admin_save" onClick={this.saveUpdates.bind(this)}>SAVE</button>
            : <div></div>
        return (
            <div id="admin_body">
                {editOrRemove}
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
                <form onSubmit={this.onSubmit}>
                    <label>
                        Search
                    <input
                            name="user"
                            type="text"
                            placeholder="Name"
                            onChange={this.handleInputChangeSearch}
                        />
                        <input
                            name="email"
                            type="text"
                            placeholder="Email"
                            onChange={this.handleInputChangeSearch}
                        />
                        <input
                            name="country"
                            type="text"
                            placeholder="Country"
                            onChange={this.handleInputChangeSearch}
                        />
                        <input
                            name="Permissions"
                            type="text"
                            placeholder="Permissions"
                            onChange={this.handleInputChangeSearch}
                        />
                    </label>
                    <label>Banned
                        <input style={{ width: 'unset' }}
                            name="isBanned"
                            type="checkbox"
                            information="User Is Banned"
                            onClick={this.handleBannedClicked.bind(this)}
                        />
                    </label>
                    <br />
                    <button onClick={this.handleSubmitSearch}>Search Sumbit</button>
                    {saveButton}
                </form>
            </div>
        )
    }
}

