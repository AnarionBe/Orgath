import React from 'react'
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

import {Button} from './index'

export const Modal = ({
  position,
  className = '',
  children,
  bodyClass = '',
  headerClass = '',
  onClose,
  title
}) => {
  return (
    <div className={`modal ${className} ${position}`}>
      <div className="modal__content">
        <header className={`modal__header ${headerClass}`}>
          <h1 className="modal__title">{title}</h1>
          <Button
            type="outline"
            onClick={onClose}
          ><Icon icon={faTimes} /></Button>
        </header>
        <div className={`modal__body ${bodyClass}`}>
          {children}
        </div>
      </div>
      
    </div>
  );
}