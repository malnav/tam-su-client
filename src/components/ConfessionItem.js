import React from 'react'
import {Link} from 'react-router-dom'

import Moment from 'react-moment'
import anonymous from '../image/anonymous.jpeg';



class ConfessionItem extends React.Component{
    constructor(props){
        super(props)
        this.shortenConfession = this.shortenConfession.bind(this)
        
    }

    shortenConfession(){
        const id = this.props._id
        
        var number = Math.abs(parseInt(id.slice(0,3)) - 200)
        if(this.props.content.length > 448){
            return `${this.props.content.slice(0,200+number)}...`
            // const randomNumber = Math.floor(Math.random() * 700)
            // return `${this.props.content.slice(0,200 + randomNumber)}...`
        } else {
            return this.props.content
        }
    }




    render(){

        const content = this.shortenConfession()
        console.log(this.props)
        

        return (
            // anonymous - profile photo
                <div className='confession-item'>
                    <Link to={`detail/${this.props._id}`}>
                        <div className="confession-item__overlay">
                            <span>Xem thêm</span>
                        </div>
                    </Link>
                    
                    <div className={this.props.imageURL==="" ? "confession-item__author confession-item__author-not-absolute": "confession-item__author" }>
                        {
                            this.props.anonymous?
                             (<><img alt="anonymous" src={anonymous} /> <span>Ẩn Danh</span></> )
                            : (<><img alt="author" src={this.props.creator.photo}/><span>{this.props.creator.name}</span></>)
                        }
                    </div>
                    
                    {this.props.imageURL !=="" && <img alt="" src={this.props.imageURL} />}
                    
                    <div className="confession-item__content">
                    
                        <p>{this.props.title}</p>
                        <p>{content}</p>
                        
                    </div>
                    <div className="confession-item__info">
                            <span>
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none">
                                        <path fillRule="evenodd" clipRule="evenodd" d="M14.4568 4.04112C13.9465 3.89532 13.4071 4.14932 13.1944 4.63551L11.4182 8.6953C11.1189 9.37937 10.6332 10.0666 10.0591 10.6315C9.73613 10.9494 9.36405 11.2492 8.95658 11.4895C8.98513 11.6556 9 11.8262 9 12V18.7208C10.9662 19.2191 12.4652 19.4974 13.8747 19.5744C15.4555 19.6609 16.9683 19.4962 18.9391 19.0527C19.666 18.8891 20.238 18.2957 20.3907 17.5321L21.541 11.781C21.6647 11.1622 21.1914 10.5849 20.5604 10.5849H16.6805C15.4446 10.5849 14.5045 9.47514 14.7077 8.25607L15.2112 5.23469C15.2999 4.70287 14.9752 4.18923 14.4568 4.04112ZM8.50064 20.6575C10.5273 21.1716 12.1718 21.4844 13.7655 21.5715C15.5816 21.6707 17.2858 21.4748 19.3783 21.0039C20.9084 20.6595 22.0509 19.4293 22.3519 17.9244L23.5021 12.1732C23.8734 10.3168 22.4535 8.58487 20.5604 8.58487L16.6805 8.58487L17.184 5.56349C17.4399 4.02832 16.5027 2.54563 15.0062 2.11807C13.5333 1.69722 11.9761 2.4304 11.362 3.83387L9.58589 7.89366C9.39928 8.3202 9.0685 8.80035 8.65628 9.20602C8.43074 9.42798 8.20006 9.6089 7.97781 9.74442C7.45036 9.28166 6.75828 9 6 9H3C1.34315 9 0 10.3431 0 12V19C0 20.6569 1.34315 22 3 22H6C7.04478 22 7.96357 21.4664 8.50064 20.6575ZM3 11C2.44772 11 2 11.4477 2 12V19C2 19.5523 2.44772 20 3 20H6C6.46838 20 6.86381 19.677 6.97116 19.2404C6.98984 19.1644 7 19.0841 7 19V12C7 11.8064 6.946 11.6286 6.85273 11.4771C6.67511 11.1887 6.35916 11 6 11H3Z" fill="#293644"/>
                                </svg>
                                &nbsp;{this.props.like.length}&nbsp;Lượt thích
                            </span>
                            <span>
                                <Moment fromNow>{this.props.createdAt}</Moment>
                            </span>
                            
                    </div>


                        
    
                </div>
           
        )
    }
}

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

export default ConfessionItem