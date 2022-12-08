import 'react-toastify/dist/ReactToastify.css'

import { toast } from 'react-toastify'
toast.configure()

export const _alert = toast
export const error = (msg: string): React.ReactText =>
  toast(msg, { type: 'error', autoClose: 5000, hideProgressBar: true })
export const info = (msg: string): React.ReactText =>
  toast(msg, { type: 'info', autoClose: 5000, hideProgressBar: true })
export const success = (msg: string): React.ReactText =>
  toast(msg, { type: 'success', autoClose: 5000, hideProgressBar: true })
