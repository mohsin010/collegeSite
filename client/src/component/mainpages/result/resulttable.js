import React from 'react'

class ResultTable extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            visible: true

        }
    }


    render() {

        // console.log("im Hell")
        return (
            <div className='main-c' id='s-view' {...this.state.visible}  >
                <p align='left' id={'result-title'} className={'p-r'}><b>Result</b></p>
                <div id='r-view'>

                    <table className={'tbl-result-view'} border='2px' border='collapse' >
                        <tbody>
                            <tr>
                                <th>Name:</th>
                                <td className={'r-td'}></td>

                            </tr>
                            <tr>
                                <th>Roll No:</th>
                                <td className={'r-td'}></td>
                            </tr>
                            <tr>
                                <th>Father Name:</th>
                                <td className={'r-td'}></td>

                                {/* <td className={'p-pic'}></td> */}

                            </tr>
                            <tr>
                                <th>Group ID:</th>
                                <td className={'r-td'}></td>
                            </tr>
                            <tr>
                                <th>Marks:</th>
                                <td className={'r-td'}></td>
                            </tr>
                            <tr>
                                <th>Grade:</th>
                                <td className={'r-td'}></td>
                            </tr>

                        </tbody>
                    </table>

                </div>

            </div>
        )
    }
}
export default ResultTable;