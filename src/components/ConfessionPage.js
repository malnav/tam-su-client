import React, { Component } from 'react'
import { withRouter } from 'react-router'
import { getConfessionDetailAPI, updateConfessionLikeAPI } from '../Services/confessionAPI'
import { getConfessionCommentAPI, addCommentAPI } from '../Services/commentAPI'
import Moment from 'react-moment'
import anonymous from '../image/anonymous.jpeg';


import {RiThumbUpLine, RiThumbUpFill} from 'react-icons/ri'


export class ConfessionPage extends Component {

    constructor(props) {
        super(props)
        this.state = {
            commentContent : "",
            loading: true,
            confession: {
                creator: {}
            },
            comment: [{
                creator: {}
            }],
            isLiked:false,
        }
        this.handleSubmitButton = this.handleSubmitButton.bind(this)
        this.handleTextarea = this.handleTextarea.bind(this)
        this.submitComment = this.submitComment.bind(this)
        this.updateConfessionLike = this.updateConfessionLike.bind(this)
        
    }

    updateConfessionLike(){

        const id = this.props.match.params.id

        const localUser = localStorage.getItem("confessionUser")
        if(localUser){

            //get current user ID
            const userID = JSON.parse(localUser).profile._id

            //update on server
            updateConfessionLikeAPI(id, userID).then(confession =>
            {
                    
                    if(confession.status === 200){
                        this.setState(prevState => {
                            let confession = JSON.parse(JSON.stringify(prevState.confession))
                            const indexOfUserID = confession.like.indexOf(userID)
                            if(indexOfUserID>-1){
                                confession.like.splice(indexOfUserID, 1)
                                this.setState({isLiked: false})
                                // this.setState(prevState => { return {isLiked: prevState.isLiked}})
                            } else {
                                confession.like.push(userID)
                                this.setState({isLiked: true})
                                // this.setState(prevState => { return {isLiked: !prevState.isLiked}})
                            }
                            return {confession: confession}
                        });
                    }
                }       
            )
        } else {
            this.props.openLogin()
        }        
    }

    isloggedIn(){
        
    }

    submitComment(){
        
        //get current user id
        const localUser = localStorage.getItem("confessionUser")
        if(localUser){
            const creator = JSON.parse(localUser).profile._id
            
            //get current confession
            const confession = this.state.confession._id

            //get content of comment
            const content = this.state.commentContent

            //submit to api
            addCommentAPI({creator, confession,content}).then(c =>{
                // console.log(c)
                this.setState({
                    comment: [...this.state.comment,c.data]
                })
            })
            this.setState({commentContent: ""})
        } else {
            this.props.openLogin()
        }
    }

    handleTextarea(e){
        this.setState({commentContent: e.target.value})
    }

    handleSubmitButton(e){
        e.preventDefault();
        this.submitComment();
    }


    componentDidMount() {

        try {
            //get id from url
            const id = this.props.match.params.id
            console.log(this.props.match)
            // console.log("🚀 ~ id", id)
            
            

            //get confession
            getConfessionDetailAPI(id).then(c => {
                // console.log("🚀 ~ confession", c.data)
                this.setState({
                    confession: c.data,
                })
                const localUser = localStorage.getItem("confessionUser")
                if(localUser){
                    const userID = JSON.parse(localUser).profile?._id
                    const index = this.state.confession.like.indexOf(userID)
                    index > -1
                    ? this.setState(prevState => { return {isLiked: !prevState.isLiked}})
                    : this.setState(prevState => { return {isLiked: prevState.isLiked}})
    
                }
               
                 //get comment of confession, comment creator
                getConfessionCommentAPI(id).then(comments => {
                    
                    this.setState({
                        comment: comments.data,
                        //stop loading when finish getting data
                        loading: false
                    })

                    // console.log("🚀 ~ comments", comments.data)

                })

            })
        } catch (error) {
            console.log(error)
        }
    }


    render() {

        return (
            <div className="single-confession">
                {this.state.loading ?
                    (
                        <h1>Loading data...</h1>
                    )
                    : (
                        <>
                        <div className="single-confession">
                            <div className="single-confession__content">
                                <img alt="cover" src="https://picsum.photos/700/200" />  

                                <div className="confession-content">
                                    <div className="confession-content__author">
                                        {
                                        !this.state.confession.anonymous
                                            ? (<>
                                                <img alt="author" src={this.state.confession.creator.photo} />
                                                <span>{this.state.confession.creator.name}</span></>
                                            )
                                            :(
                                                <><img alt="anonymous" src={anonymous} /> <span>Ẩn Danh</span></> 
                                            )
                                        }
                                    </div>
                                    <p className="confession-content__title"><b>{this.state.confession.title}</b></p>
                                    <p className="confession-content__main">{this.state.confession.content}</p>
                                    <div className="confession-content__bottom">
                                        <button onClick={this.updateConfessionLike}>
                                            {
                                                this.state.isLiked
                                                ? <><RiThumbUpFill /><span> Bạn đã thích</span></>
                                                : <><RiThumbUpLine /><span> thích</span></>
                                            }
                                            
                                        </button>
                                        <div>
                                            <span>{this.state.confession.like.length} Lượt Thích</span>
                                            <span>{this.state.comment.length} Bình Luận </span>
                                            <span><Moment fromNow>{this.state.confession.createdAt}</Moment></span>
                                        </div>
                                       
                                    </div>
                                    <form onSubmit={this.handleSubmitButton}>
                                        <textarea value={this.state.commentContent} onChange={this.handleTextarea} placeholder="Chia sẻ suy nghĩ của bạn ở đây"/>
                                        <button type="submit">Đăng</button>
                                    </form>
                                    
                                    <div className="confession-comments">
                                        {this.state.comment.sort((a,b)=> 
                                            b.createAt - a.createAt).map(c => (
                                            <div className="confession-comments-single">
                                                <div className="confession-comments-single__left">
                                                    <img alt="creator" src={c.creator.photo} />
                                                </div>
                                                <p className="confession-comments-single__right"><b>{c.creator.name}</b>&#160;{c.content}</p>
                                            </div>
                                            )
                                        )}
                                    </div>
                                </div>
                                
                                
                            </div>
                            
                            
                        </div>

                        </>
                    )
                }
            </div>
        )
    }
}

export default withRouter(ConfessionPage)
// createAt:
// like: [],
// anonymous: true,
//  _id: 
//  title: 
// imageURL:
// ------------
// creator: {
//       photo: 
//       _id: 
//       name: 
//       email: 
// }