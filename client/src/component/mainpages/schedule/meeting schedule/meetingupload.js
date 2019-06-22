import React from 'react'
import '../viva schedule/viva.css';

class UploadMeeting extends React.Component {
    constructor(props){
        super(props);
        this.onRemoveComponent = this.onRemoveComponent.bind(this)
    }
    onRemoveComponent(e){
        e.preventDefault();
        this.props.deleteComponent(this.props.component)
    }

     
    

    render() {

        // console.log("im Hell")
        return (
            <div id='v-grand-main'>
                {/* <tr> */}
                {/* <td> */}
                    <div className='v-main'>
                        <div align='left' className='vdate'><span className='vdatebody'>{this.props.time}</span></div>
                        <div align='left' className='vtitle'><a href=''>{this.props.linkadress}</a></div>
                    <button className='vbtnn' onClick={this.onRemoveComponent}>X</button>
                    </div>
                {/* </td> */}
                {/* </tr> */}
                <hr />


            </div>
        )
    }
}
export default UploadMeeting;