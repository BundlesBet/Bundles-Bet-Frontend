import React from 'react'
import { Box, Modal, Stack, Typography } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'

// contexts and hooks
import { useMetamask } from 'contexts/Metamask'
import { useCopyToClipboard } from 'usehooks-ts'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'

// assets

type Props = {
  open: boolean
  handleClose: (state: boolean) => void
}

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: '#1C1C26',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
}

const crossButton = {
  color: '#3A3A4B',
  cursor: 'pointer',
  position: 'absolute' as 'absolute',
  top: '8px',
  right: '8px',
}

const BetPlacedSuccessModal = (props: Props) => {
  const { handleClose, open } = props
  const { account } = useMetamask()
  const trimmedAccount = account.slice(0, 5) + '...' + account.slice(-5)
  const [value, copy] = useCopyToClipboard()
  const copyToClipBoard = () => {
    copy(account)
  }

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <div>
          <CloseIcon
            sx={crossButton}
            onClick={() => handleClose(false)}
            fontSize="medium"
          />
        </div>
        <Stack direction="column" spacing={4} mb={2}>
          <CheckCircleIcon sx={{ backgroundColor: '#00FFC2' }} />
          <Typography fontSize={'24px'} textAlign={'center'}>
            Bet Placed
          </Typography>
          <Typography fontSize={'20px'} color="secondary" textAlign={'center'}>
            1234.7 $BUND
          </Typography>
          <Typography
            fontSize={'16px'}
            color="primary.light"
            textAlign={'center'}
          >
            {trimmedAccount}
          </Typography>
        </Stack>
      </Box>
    </Modal>
  )
}

export default BetPlacedSuccessModal
