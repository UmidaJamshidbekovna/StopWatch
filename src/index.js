import React, {Component} from "react";
import ReactDom from 'react-dom';

class Index extends React.Component{

    state={
        hour:0,
        minute:0,
        second:0,
        startDisabled:false,
        interval:'',
        savedInterval:[]
    }

    onStartClicked=()=>{

        this.setState({
            startDisabled:true
        })

        let i = setInterval(()=>{
            const {hour, minute, second} = this.state;

            if (second===59){

                if (minute===59){
                    this.setState({
                        second: 0,
                        minute: 0,
                        hour: hour+1
                    })
                }else {
                    this.setState({
                        second: 0,
                        minute: minute+1
                    })
                }
            }else {
                this.setState({
                    second: second+1
                })
            }
        }, 1000)

        this.setState({
            interval:i
        })
    }

    onStopClicked=()=>{
        clearInterval(this.state.interval)

        this.setState({
            startDisabled:false
        })
    }

    onIntervalClicked=()=>{
        const {savedInterval, minute, hour, second}= this.state;
        savedInterval.push(hour + ':' + minute + ':' + second)
        this.setState({
            savedInterval,
        })
    }

    onClearClicked=()=>{
        this.onStopClicked()

        this.setState({
            second:0,
            minute:0,
            hour:0
        })
    }

    render() {
        return(
            <div>
                <div className="container">
                    <div className="col-md-6 offset-3">
                        <div className="card my-4" >

                            <div className="card-header" >
                                <h1>StopWatch</h1>
                            </div>

                            <div className="card-body">
                                <h4 className={'text-center'}>{this.state.hour} : {this.state.minute} : {this.state.second}</h4>
                            </div>

                            <div className="card-footer">
                                <div className="row">
                                    <div className="col-md-3">
                                        <button className="btn btn-success" onClick={this.onStartClicked} disabled={this.startDisabled}>Start</button>
                                    </div>
                                    <div className="col-md-3">
                                        <button className="btn btn-warning" onClick={this.onStopClicked} >Stop</button>
                                    </div>
                                    <div className="col-md-3">
                                        <button className="btn btn-primary" onClick={this.onIntervalClicked} disabled={this.startDisabled}>Interval</button>
                                    </div>
                                    <div className="col-md-3">
                                        <button className="btn btn-danger" onClick={this.onClearClicked}>Clear</button>
                                    </div>
                                </div>
                            </div>

                            {this.state.savedInterval.map((item,index) => <p key={index}>{item}</p>)}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

ReactDom.render(
    <Index/>,
    document.getElementById('root')
)