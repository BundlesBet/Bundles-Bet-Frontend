import React from 'react'
// import { useCopyToClipboard } from 'usehooks-ts'
import CloseIcon from '@mui/icons-material/Close'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import { Box, Modal, Stack, Typography } from '@mui/material'

// contexts and hooks
import { useMetamask } from 'contexts/Metamask'

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
  borderRadius: '8px',
  boxShadow: '0px 40px 40px rgba(0, 0, 0, 0.6)',
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
  // const [value, copy] = useCopyToClipboard()
  // const copyToClipBoard = () => {
  //   copy(account)
  // }

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <div>
          <CloseIcon
            sx={crossButton}
            fontSize="medium"
            onClick={() => handleClose(false)}
          />
        </div>

        <Stack direction="column" spacing={1} justifyContent={'center'}>
          <CheckCircleIcon
            sx={{
              mb: 2,
              mx: 'auto',
              width: '68px',
              height: '68px',
              color: '#00FFC2',
            }}
          />
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
