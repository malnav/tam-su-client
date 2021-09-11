import React, { Component } from 'react'

export class Cover extends Component {

    render() {
        return (
            <>
                <div className="cover">
                    <img alt="cover" src={this.props.imageURL} />
                    <button onClick={this.props.chooseCover} className="choose-cover-btn">Choose</button>
                </div>
            </>
        )
    }
}

export default Cover




