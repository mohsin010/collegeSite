import React, { Component } from 'react';
import { connect } from 'react-redux';



class Display_Viva extends Component {

    constructor(props) {
        super(props);
        this.state = {
            groupid: this.props.login.loggedInUser.groupid,
            startDate: '',
            endDate: '',
            vivaDate: '',
            dates: [],
            display1: '',
            display2: '',
            display3: '' ,
            display4: ''
        }
        // this.getDates = this.getDates.bind(this)
    }

    handleChange = (e) => {
        debugger;
        this.setState({
            [e.target.name]: e.target.value,
            display1: false,
            display2: true
        })
        setTimeout(() => {

            console.log(this.state)

            let send = {
                groupid: this.state.groupid,
                vivaDate: this.state.vivaDate,
                display1: this.state.display1,
                display2: this.state.display2
            }

            fetch('/st_viva_select', {
                method: 'POST',
                headers: {
                    'Content-Type': 'Application/json'
                },
                body: JSON.stringify(send)
            }).then((resp) => resp.json()).then((viva) => {

                // groups = groups.sort((prev, next) => {
                //     return prev.rollno - next.rollno;
                // })
                // debugger;
                if (viva) {
                    this.setState({

                        // startDate: viva.startDate,
                        // endDate: viva.endDate,
                        vivaDate: viva.vivaDate,
                        display1: viva.display1,
                        display2: viva.display2

                    });
                } else {
                    // this.setState({ display2: 'block' })
                    console.log('Err')
                }
            })
        }, 3000);

    }


    getDates = (startDate, endDate) => {
        debugger;
        var firstDate = new Date(this.state.startDate);
        var secondDate = new Date(this.state.endDate);
        var dates = [];
        while (firstDate -1 <= secondDate - 1) {
            firstDate.setDate(firstDate.getDate() + 1); 
            var date = new Date(firstDate).toLocaleDateString()
            dates.push(date )
            // start ++
            // firstDate  = firstDate ++;
        }
        // console.log(dates)
        this.setState({
            dates: dates
        })
    }
    componentDidMount() {
        let data = {
            groupid: this.props.login.loggedInUser.groupid
        }
        fetch('/st_viva_display', {
            method: 'POST',
            headers: {
                'Content-Type': 'Application/json'
            },
            body: JSON.stringify(data)
        }).then((resp) => resp.json()).then((viva) => {

            // groups = groups.sort((prev, next) => {
            //     return prev.rollno - next.rollno;
            // })
            debugger;
            if (viva) {

                this.setState({

                    startDate: viva.startDate,
                    endDate: viva.endDate,
                    vivaDate: viva.vivaDate,
                    // vivaDate
                    display1: viva.display1,
                    display2: viva.display2,
                    display3: true,
                    display4: false
                    // display1: 'block',
                });
                this.getDates();

            } else {
                this.setState({
                    display3: false,
                    display4: true
                })
                // this.setState({ display2: 'block' })
                console.log('Err')
            }
        })
    }

    // Usage

    render() {




        return (
            <div>

                {/* <button onClick={this.getDates}>Click me</button> */}
                <div style={{display: this.state.display4 ? 'block' : 'none'}}></div>

                <div style={{display: this.state.display3 ? 'block' : 'none'}}>
                    <table id='tbl-assignment' >
                        {/* <hr className='hr' />                     */}
                        <tbody>
                            {/* <caption>Instructor's Info</caption> */}
                            {/* <hr /> */}

                            <tr>
                                {/* <th id='a_no'>No</th> */}
                                <th className='grp_id' >Group Id</th>
                                <th className='grp_id' >Viva Dataes</th>
                                <th className='grp_id' >Viva date</th>

                            </tr>

                            {/* 
                                    {this.state.vivas.map((viva) => { */}

                            <tr>
                                {/* <td  >{group.no}</td> */}

                                <td className='grp_id_v'>
                                    {this.state.groupid}
                                </td>
                                <td className='grp_id_v'>{this.state.startDate} <b>to</b> {this.state.endDate}</td>
                                <td className='grp_id_v'>
                                    <span style={{ display: this.state.display1 ? 'block' : 'none' }}>
                                        <select name='vivaDate' required value={this.state.vivaDate} onChange={this.handleChange}>
                                            <option>Select Viva Date</option>
                                            {this.state.dates.map((date) => {
                                                return <option>{date}</option>
                                            })}
                                        </select>
                                    </span>
                                    <span style={{ display: this.state.display2 ? 'block' : 'none' }}>
                                        {this.state.vivaDate}
                                    </span>
                                </td>

                                {/* <td className='show_assign'>{assignment.topic}</td> */}

                            </tr>

                            {/* })
                                    } */}
                        </tbody>
                    </table>

                </div>
            </div>

        )
    }

}
let Connected_Display_Viva = connect((store) => {

    return {
        login: store.loginReducer,
        assignments: store.login

    }
})(Display_Viva);

export default Connected_Display_Viva;
