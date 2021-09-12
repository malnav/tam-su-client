import React from 'react'
import Modal from './Modal'
import { addConfessionAPI } from '../Services/confessionAPI'
import Cover from './Cover'

class Editor extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            title: "",
            content: "",
            imageURL: "",
            isEditorColumn: true,
            anonymous: false
        }
        this.handlePromise = this.handlePromise.bind(this)
        this.handleContent = this.handleContent.bind(this)
        this.handleTitle = this.handleTitle.bind(this)
        this.handleForm = this.handleForm.bind(this)
        this.slideToCoverSelection = this.slideToCoverSelection.bind(this)
        this.chooseCover = this.chooseCover.bind(this)
        this.handleAnonymous = this.handleAnonymous.bind(this)
    }

    chooseCover(e){
        const iURL = e.target.parentNode.firstChild.currentSrc
        this.setState({
            imageURL: iURL
        })
        this.setState(prevState =>({
            isEditorColumn: !prevState.isEditorColumn
        }))   
    }

    handleTitle(e){
        this.setState({title: e.target.value})
    }

    handleContent(e){
        this.setState({content: e.target.value})
    }

    async handlePromise(){
        try {
            const user = JSON.parse(localStorage.getItem("confessionUser"))
            const creator = user.profile._id
            const response = await addConfessionAPI({title: this.state.title,content: this.state.content,imageURL: this.state.imageURL, anonymous: this.state.anonymous, creator: creator})
            this.props.addConfession(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    handleForm(e){
        e.preventDefault()
        this.handlePromise()
        this.props.toggleEditorModal()
        this.setState({
            title: "",
            content: "",
            imageURL: "",
            isEditorColumn: true,
            anonymous: false
        })
    }

    slideToCoverSelection(e){
        this.setState(prevState =>({
            isEditorColumn: !prevState.isEditorColumn
        }))   
    }

    handleAnonymous(e){
        this.setState(prevSate =>({
            anonymous: !prevSate.anonymous
        }))
    }

    render(){
        return (
            <>
                <Modal modalSize="modal-editor" closeModal={this.props.closeEditor} isModalOpen={this.props.isEditorOpen}>
                        <div className={this.state.isEditorColumn?"modal-editor__container":"modal-editor__container modal-editor__container-show-cover"}>
                            <form className="modal-editor__container__form" onSubmit={this.handleForm}>
                                <img alt="" src={this.state.imageURL} />
                                <div className={this.state.imageURL===""?"":"change-height"}>
                                    <input value={this.state.title} placeholder="Tôi muốn nói..." onChange={this.handleTitle}></input>
                                    <textarea value={this.state.content} placeholder="Viết nhanh lẹ vào đây..." onChange={this.handleContent}></textarea>
                                    <div className="editor-button"><input name="isAnonymous" value={this.state.anonymous} onChange={this.handleAnonymous} type="checkbox"/><label>Ẩn danh</label> <button type="button" onClick={this.slideToCoverSelection} className="add-cover-button">Thêm Cover</button><button className="publish-button" type="submit">Đăng</button></div>
                                </div>
                            </form>
                            <div className="modal-editor__container__cover">
                                    <Cover chooseCover={this.chooseCover} imageURL="https://i.picsum.photos/id/146/600/200.jpg?hmac=uK8iGWKlPzhuJI5lX2LDdbLvUdFRNk1UtClJLHLXCDI" />
                                    <Cover chooseCover={this.chooseCover} imageURL="https://i.picsum.photos/id/42/600/200.jpg?hmac=_2u4I6xHGSCgRI7WFDhiS_3ae6oYZIZajR3ceFxAqpg" />
                                    <Cover chooseCover={this.chooseCover} imageURL="https://i.picsum.photos/id/352/600/200.jpg?hmac=FmqVFgXA7Ewrjk4EouZhlLYFJG7W1Wf7vWmvRy1DgzA" />
                                    <Cover chooseCover={this.chooseCover} imageURL="https://i.picsum.photos/id/878/600/200.jpg?hmac=BWWnvar4j55ErCnXW1WzPOjrtLF3Po4g5sV8L9GFnkI" />
                                    <Cover chooseCover={this.chooseCover} imageURL="https://i.picsum.photos/id/554/600/200.jpg?hmac=nwvuVwMn5-qReckwhvuxMVy2hQmkDtSrrYb54NysjIg" />
                                    <Cover chooseCover={this.chooseCover} imageURL="https://i.picsum.photos/id/269/600/200.jpg?hmac=i85Hf_C2rEQYI9Skw-FmRSOj5WvSl9tX9y3JrKLMelQ" />
                                    <Cover chooseCover={this.chooseCover} imageURL="https://i.picsum.photos/id/875/600/200.jpg?hmac=MmPb2iYFsnNLVsj6chojJ2xpoQeOMgpFfiPyEMaiuao" />
                                    <Cover chooseCover={this.chooseCover} imageURL="https://i.picsum.photos/id/847/600/200.jpg?hmac=UFF3-RvMrDGXabEmq_i_2Kf8BHkJHlR5_KMzBCO_FhU" />
                                    <Cover chooseCover={this.chooseCover} imageURL="https://i.picsum.photos/id/48/600/200.jpg?hmac=wEId_5_DsLQB2QcZ41T_Ri7DA2HUMfaHigtdY4qjIqs" />      
                            </div>
                        </div>
                        
                </Modal>
            </>
        )
    }


}

export default Editor