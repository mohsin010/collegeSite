import React from 'react'

class UploadNotice extends React.Component {
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
            <div id='grand-main'>
                {/* <tr> */}
                {/* <td> */}
                    <div className='n-main'>
                        <div align='left' className='ndate'><span className='ndatebody'>{this.props.time}</span></div>
                        <div align='left' className='ntitle'><a href=''>{this.props.linkadress}</a></div>
                    <button className='btnn' onClick={this.onRemoveComponent}>X</button>
                    </div>
                {/* </td> */}
                {/* </tr> */}
                <hr />


            </div>
        )
    }
}
export default UploadNotice;