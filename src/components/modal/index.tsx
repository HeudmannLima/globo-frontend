import React, { useState, useEffect } from 'react';
import { userData } from '../../contexts/AuthContext'
import ReactFrom from 'react-dom';

import './modal.css'

interface ModalProps {
  isShowing: boolean;
  toggle: (arg0?: userData) => void;
}

const Modal: React.FC<ModalProps> = ({ isShowing, toggle, children }) => { 
  useEffect(() => {
    const listner = function (e: KeyboardEvent ) {
      if (e.key === 'Escape' || e.key === 'Esc' || e.keyCode === 27) {
        e.preventDefault();
        e.stopPropagation();

        isShowing && toggle();
      }
    }

    window.addEventListener('keyup', listner)

    return (() => {
      window.removeEventListener('keyup', listner)
    })

  }, [isShowing, toggle])

  return (
    isShowing ? ReactFrom.createPortal(
      <div className="modal-overlay">
        <div className="modal-wrapper">
          <div className="modal">
            {children}
          </div>
        </div>
      </div>, document.body
    ) : null
  )
}

interface ModalHeaderProps {
  toggle: (arg0?: userData) => void;
}

export const ModalHeader: React.FC<ModalHeaderProps> = ({ toggle, children }) => (
  <div className="modal-header">
    {children || 'Title'}    
  </div>
)

export const ModalBody: React.FC = ({ children }) => (
  <div className="modal-body">
      {children}
  </div>
)

export const ModalFooter: React.FC = ({ children }) => (
  <div className="modal-footer">
    {children}
  </div>
)

export const useModal = () => {
  const [isShowing, setIsShowing] = useState(false);

  function toggle(arg0?: userData) {
    setIsShowing(!isShowing);
  }

  return {
    isShowing,
    toggle,
  }
}

export default Modal;