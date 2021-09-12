import React, { Component } from 'react'
import { Masonry } from 'masonic'
import ConfessionItem  from '../components/ConfessionItem'
import { withRouter } from 'react-router'
import { getConfessionAPI, getConfessionSortedAPI} from '../Services/confessionAPI'

export class Main extends Component {
    
    componentDidMount(){  

        const by = this.props.match.params.sort
        if(by){
            getConfessionSortedAPI(by).then(res => {
                this.props.setConfessions(res.data)
            });
        }else{
            getConfessionAPI().then(res => {
                this.props.setConfessions(res.data)
                });
        }
    }
    
    render() {
        const MasonryCard = ({ data }) => (
            <ConfessionItem updateConfessionLike={this.props.updateConfessionLike}  {...data}/>
        )
        return (
            <div className="confessions-list">
                <Masonry
                    items={this.props.confessions}
                    render={MasonryCard}
                    columnGutter={10}
                    columnWidth={300}
                    overscanBy={1}
                />
            </div>
        )
    }
}

export default withRouter(Main)
