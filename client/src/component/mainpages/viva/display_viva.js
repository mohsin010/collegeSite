import React, { Component } from 'react';
import { connect } from 'react-redux';



class Display_Viva extends Component {

    constructor(props) {
        super(props);
        this.state = {
            groupid: this.props.login.loggedInUser.groupid,
            startDate: '',
            endDate: '',
            vivaDate: ''
        }
        this.getDates = this.getDates.bind(this)
    }

    getDates =  (startDate, endDate) =>{
        var firstDate = new Date(this.state.startDate);
        var secondDate =  new Date(this.state.endDate);
        var dates = [];

        while (firstDate < secondDate) {
            firstDate.setDate(firstDate.getDate());
            dates.push(new Date(firstDate))
        }
        console.log(dates)
    }

    // Usage

    render() {


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
            // debugger;
            if (viva) {
                this.setState({

                    startDate: viva.startDate,
                    endDate: viva.endDate,
                    // vivaDate
                    // display3: groups.display3,
                    // display4: groups.display4,
                    // display1: 'block',
                });
            } else {
                // this.setState({ display2: 'block' })
                console.log('Err')
            }
        })
        return (
            <div>

            <button onClick={this.getDates}>Click me</button>
                

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
                                <select>
                                    <option>Select Viva Date</option>
                                </select>
                            </td>

                            {/* <td className='show_assign'>{assignment.topic}</td> */}

                        </tr>

                        {/* })
                                    } */}
                    </tbody>
                </table>

            </div>
            // </div>

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
