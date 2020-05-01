import React, { Component }  from 'react';
import axios from 'axios';
import Map from "./Map.component";
const SERVER_ADDRESS = process.env.NODE_ENV === "development" ? 'http://localhost:5000' : "";
export default class Admin extends Component{
    constructor(props){
        super(props);
        this.state = {
            user : "",
            password : "",
            email : "",
            search : "",
            country: "",
            status: "pending",
            statusMsg:'Loading...',
            usersList: [],
            searchList: []
        };
        this.handleSubmitUpdate = this.handleSubmitUpdate.bind(this);
        this.handleSubmitSearch = this.handleSubmitSearch.bind(this);
        this.handleSubmitView = this.handleSubmitView.bind(this);
        this.handleSubmitRemove = this.handleSubmitRemove.bind(this);

        this.handleInputChangeUpdate = this.handleInputChangeUpdate.bind(this);
        this.handleInputChangeRemove = this.handleInputChangeRemove.bind(this);
        this.handleInputChangeSearch = this.handleInputChangeSearch.bind(this);
        this.renderTableData = this.renderTableData.bind(this);
        this.renderTableHeader = this.renderTableHeader.bind(this);
//        this.renderTableDataSearch = this.renderTableDataSearch.bind(this);
    }

    componentDidMount() {
        axios.get(`${SERVER_ADDRESS}/listUsers`).then((view) => {
            if(view.data.type === 'OK'){
                console.log(view.data.content);
                this.setState({usersList: view.data.content, status: 'ready'});
            }else {
                this.setState({status: 'error', statusMessage: `An error occoured:${view.data.content}`})
                console.log(view)
            }
            });
        // axios.get("http://localhost:5000/search").then((search) => {
        //     if(search.data.type === 'OK'){
        //         console.log(search.data.content);
        //         this.setState({usersList: search.data.content, status: 'ready'});
        //     }else {
        //         this.setState({status: 'error', statusMessage: `An error occoured:${search.data.content}`})
        //         console.log(search)
        //     }
        //     this.setState({searchList: search.data, status: 'ready'});
        // })
    }

    handleInputChangeUpdate(event) {
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
            }});
        console.log(update.data);
    }

    async handleSubmitRemove() {
//        console.log(this.state);
        const remove = await axios.get(`${SERVER_ADDRESS}/remove`, {
            params: {
                country: this.state.country
                //password: this.state.passToRegister,
         //       email: this.state.email
            }});
        console.log(remove.data);
    }

    async handleSubmitView() {

        const view = await axios.get(`${SERVER_ADDRESS}/listUsers`, {
            params: {
                user: this.state.userToRegister,
                password: this.state.passToRegister,
                email: this.state.email
            }})
        //   console.log(view.data);

    }


    renderTableHeader() {
        console.log(this.state.usersList)
        // let header = Object.keys(this.state.usersList[0])
        // return header.map((key, index) => {
        //     return <th key={index}>{key.toUpperCase()}</th>
        // })
    }

    renderTableData() {
        return this.state.usersList.map((user, index) => {
            const { name, password, score, email, country, rudeMessages, Permissions,numOfGames,numOfVictoryGames } = user //destructuring
            return (

                <tr key={name}>
                    <td>{name}</td>
                    <td>{password}</td>
                    <td>{score}</td>
                    <td>{email}</td>
                    <td>{country}</td>
                    <td>{Permissions}</td>
                    <td>{rudeMessages}</td>
                    <td>{numOfGames}</td>
                    <td>{numOfVictoryGames}</td>
                </tr>
            )
        })
    }

    // renderTableDataSearch() {
    //     return this.state.searchList.map((user, index) => {
    //         const { name, password, score, email, country, rudeMessages, Permissions,numOfGames,numOfVictoryGames } = user //destructuring
    //         return (
    //
    //             <tr key={name}>
    //                 <td>{name}</td>
    //                 <td>{password}</td>
    //                 <td>{score}</td>
    //                 <td>{email}</td>
    //                 <td>{country}</td>
    //                 <td>{Permissions}</td>
    //                 <td>{rudeMessages}</td>
    //                 <td>{numOfGames}</td>
    //                 <td>{numOfVictoryGames}</td>
    //             </tr>
    //         )
    //     })
    // }

    async handleSubmitSearch() {

        const search = await axios.get(`${SERVER_ADDRESS}/search`, {
            params: {
                country: this.state.country
            }});
        console.log(search.data);
    }

    render(){
        if(this.state.status !== 'ready') return (<p>{this.state.statusMessage}</p>)
        return(
            <div style={this.compStyle}>
                {/* <form onSubmit={this.handleSubmit}> */}
                <table id='usersList'>
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
                <br/>
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








                <br/>
                <form>
                    <label>
                        User name:
                        <input
                            name="country"
                            type="text"
                            onChange={this.handleInputChangeRemove}
                        />
                    </label>
                    <br/>
                    {/*<label>*/}
                    {/*    Email:*/}
                    {/*    <input*/}
                    {/*        name="email"*/}
                    {/*        type="text"*/}
                    {/*        onChange={this.handleInputChangeRemove}*/}
                    {/*    />*/}
                    {/*</label>*/}
                    {/*<br/>*/}
                    {/*<label>*/}
                    {/*    Password:*/}
                    {/*    <input*/}
                    {/*        name="passToRegister"*/}
                    {/*        // value={this.state.user}*/}
                    {/*        type="password"*/}
                    {/*        onChange={this.handleInputChangeRemove}*/}
                    {/*    />*/}
                    {/*</label>*/}

                    <br/>


                </form>
                <button onClick={this.handleSubmitRemove}>Remove Sumbit</button>
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

