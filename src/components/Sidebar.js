import React, { Component } from 'react'
import Setting from './Setting'
import { Link } from 'react-router-dom'

export class Sidebar extends Component {



    
    render() {
        return (
            <div className={!this.props.isSidebarShow ? "side-bar" : "side-bar show-side-bar"}>
                <div className="side-bar__top">
                    <input type="text" placeholder="Tìm tâm sự" />
                    <ul>
                        <li><a href="/sortbylike">Nhiều lượt thích</a></li>
                        {/* <li><a href="/sortbycomment">Sôi nổi</a></li> */}
                        <li><a href="/sortbydate">Mới nhất</a></li>
                    </ul>
                </div>

                <div className="side-bar__bottom" >
                    <Setting />
                    <span>
                        {this.props.currentUser?.profile?.name}
                    </span>
                    <button onClick={this.props.signOut}>Thoát</button>
                </div>

                 {/* <label className="switch">
                                <input type="checkbox" />
                                <span className="slider round"></span>
                </label> */}
            </div>
        )
    }
}

export default Sidebar
