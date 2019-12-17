import React, { Component }  from 'react';

export default class Login extends Component{

    render(){
        return(
            <div style={{backgroundColor:'red'}}>
                <form action="action_page.php" method="post">
                    <div className={"imgcontainer"}>
                        <img src="img_avatar2.png" alt="Avatar" class="avatar"/>
                    </div>

                    <div className={"container"}>
                        <label for="unaze"><b>Username</b></label>
                        <input type="text" placeholder="Enter Username" name="uname" required/>

                        <label for="psw"><b>Password</b></label>
                        <input type="password" placeholder="Enter Password" name="psw" required/>

                        <button type="submit">Login</button>
                        <input type="checkbox" checked="checked" name="remember"/>
                    </div>

                    <div className={"container"} style={{backgroundColor:'#f1f1f1'}}>
                        <button type="button" className={"cancelbtn"}>Cancel</button>
                        <span className={"psw"}>Forgot <a href={"/forgot"}>password?</a></span>
                    </div>
                </form>
            </div>
        )
    }
}