// Libraries
import Image from 'next/image'
import ReactModal from 'react-modal'

// Styles
import classes from './Modal.module.scss'

// Assets
import CloseIcon from './../../assets/close.svg'

const styles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    minWidth: '300px',
    width: '30%',
    transform: 'translate(-50%, -50%)',
    borderRadius: 10,
    padding: '20px 30px',
    fontFamily: 'Nunito',
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
}

// ReactModal.setAppElement("#root");

interface ModalProps {
  isOpen: boolean
  close: () => void
  children?: React.ReactNode
}

const Modal = (props: ModalProps) => {
  return (
    <ReactModal isOpen={props.isOpen} style={styles}>
      <div className={classes.header}>
        <p>Transaction Error</p>
        <Image
          src={CloseIcon}
          alt="Close Icon"
          className={classes.closeIcon}
          onClick={props.close}
        />
      </div>
      <div className={classes.content}>{props.children}</div>
    </ReactModal>
  )
}

export default Modal
