import React from 'react'

class UploadDocument extends React.Component {
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
            <div className='grand-main'>
                {/* <tr> */}
                {/* <td> */}
                    <div id='n-main'>
                        <div align='left' id='ntitle'><a href=''>{this.props.linkadress}</a></div>
                        <button id='btnn' onClick={this.onRemoveComponent}>X</button>
                    </div>
                {/* </td> */}
                {/* </tr> */}
                <hr />


            </div>
        )
    }
}
export default UploadDocument;