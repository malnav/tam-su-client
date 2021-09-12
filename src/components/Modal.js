import React from 'react';

class Modal extends React.Component {
  constructor(props) {
    super(props)
    this.handleClickOnModal = this.handleClickOnModal.bind(this)
  }


  //prevent click on modal closing its self
  handleClickOnModal(e) {
    e.stopPropagation()
  }

  componentDidUpdate(){
    if(this.props.isModalOpen){
      document.body.style.overflow = 'hidden';  
    }else{
      document.body.style.overflow = 'unset';
    }
  }

  render() {
    return (
      <div onClick={this.props.closeModal}
        className={`${this.props.isModalOpen ? 'modal-overlay show-modal' : 'modal-overlay'
          }`}
      >
        <div className={`modal-container ${this.props.modalSize}`} onClick={this.handleClickOnModal} >
          <button className='close-modal-btn' onClick={this.props.closeModal}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-x"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
          </button>
            {this.props.children}
        </div>
      </div>

    )
  }
}

export default Modal;
