import React, {Component} from "react";

export default class Timer extends Component{
    constructor(props){
        super(props);
        this.state = {
            interval: null,
            started: false,
            minutes: props.minutes || 0,
            seconds: props.seconds || 5,
            millSeconds: props.millSeconds || 0
        }
        // the component that will use the timer. parent needs to implement have a timerListener()
        this.parentElm = props.parentElm;
        this.start = this.start.bind(this);
        this.stop = this.stop.bind(this);
        this.decMillSeconds = this.decMillSeconds.bind(this);
        this.reset = this.reset.bind(this);
    }

    start(){
        console.log("game started")
        this.setState({started: true});
        this.setState({interval: setInterval(this.decMillSeconds, 10)});
    }

    stop(){
        this.setState({started: false})
        clearInterval(this.state.interval);
    }


    decMillSeconds(){
            if(this.state.millSeconds === 0){
                if(this.state.seconds === 0){
                    if(this.state.minutes === 0){
                        console.log("alertEnd will be called now")
                        this.alertEnd();
                    }else {
                        this.setState({minutes: this.state.minutes - 1});
                        this.setState({seconds: 59});
                    }
                }else {
                    this.setState({seconds: this.state.seconds - 1});
                    this.setState({millSeconds: 99});
                }
            }else
                this.setState({millSeconds: this.state.millSeconds - 1});
        }

    reset(){
        this.setState({minutes: this.props.minutes || 0,
            seconds: this.props.seconds || 5,
            millSeconds: this.props.millSeconds || 0
        })
    }

    alertEnd(){
        console.log("time ended");
        this.stop();
        this.parentElm.timerListener("done");
        this.reset();
    }

    normalizedTime(time){
        return time < 10 ? "0" + time : "" + time
    }

    render(){
        return(
            <div style={{color:"red"}} onClick={this.state.started ? this.stop : this.start}>
                { this.normalizedTime(this.state.minutes)+":"
                +this.normalizedTime(this.state.seconds)+":"
                +this.normalizedTime(this.state.millSeconds) }
            </div>
        )
    }
}