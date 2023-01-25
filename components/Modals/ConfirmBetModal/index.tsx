import React from 'react'
import Image from 'next/image'
import { useCopyToClipboard } from 'usehooks-ts'
import {
  Box,
  Button,
  Divider,
  InputAdornment,
  Modal,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'

// assets
import { Link } from 'assets/index'
import { useAccount } from 'wagmi'
import { useSelector } from 'react-redux'
import { RootState } from 'redux/store'
import { createBet } from 'utils/apiCalls'

type Props = {
  open: boolean
  handleConfirm: () => void
  teamsSelected: { match: string; selection: number }[]
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

const ConfirmBetModal = (props: Props) => {
  const { handleClose, handleConfirm, open } = props

  const { address, isConnected }: any = useAccount()
  const [value, copy] = useCopyToClipboard()

  const trimmedAccount = isConnected
    ? address.slice(0, 5) + '...' + address.slice(-5)
    : 'Account'

  const userData = useSelector((state: RootState) => state.user).userData

  const poolData = useSelector((state: RootState) => state.betting).poolData

  const processTransaction = async () => {
    try {
      const body = {
        userId: userData.id,
        poolId: poolData.id,
        teamSelections: props.teamsSelected,
        betAmount: parseInt(poolData.fee),
      }

      const response = await createBet(body)
      console.log(response)

      handleClose(false)
      handleConfirm()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <div>
            <CloseIcon
              sx={crossButton}
              onClick={() => handleClose(false)}
              fontSize="medium"
            />
          </div>
          <Stack direction="column" spacing={1} mb={2}>
            <Typography fontSize={'24px'} textAlign={'center'}>
              Checkout
            </Typography>
            {/* <Typography
              fontSize={'20px'}
              color="secondary"
              textAlign={'center'}
            >
              1234.7 $BUND
            </Typography>
            <Typography
              fontSize={'16px'}
              color="primary.light"
              textAlign={'center'}
            >
              {trimmedAccount}
            </Typography> */}
          </Stack>

          <TextField
            fullWidth
            value={trimmedAccount}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end" sx={{ background: '#07070D' }}>
                  <Box sx={{ cursor: 'pointer' }}>
                    <Image
                      src={Link}
                      alt="linkIcon"
                      onClick={() => {
                        copy(address)
                      }}
                    />
                  </Box>
                </InputAdornment>
              ),
            }}
            sx={{
              color: '#7D7D8D',
              bgcolor: '#07070D',
              '& .MuiOutlinedInput-input': {
                color: '#7D7D8D',
                borderRadius: '5px',
              },
              '& .MuiOutlinedInput-notchedOutline': {
                border: 'none',
              },
            }}
          />

          <Stack mt={3} direction={'column'} spacing={3}>
            <Stack
              direction={'row'}
              justifyContent="space-between"
              alignItems={'center'}
            >
              {' '}
              <Typography color="primary.light">Buy Price </Typography>
              <Typography>{poolData.fee} $BUND</Typography>
            </Stack>
            <Divider />
            <Stack
              direction={'row'}
              justifyContent="space-between"
              alignItems={'center'}
            >
              {' '}
              <Typography color="primary.light">Total Price </Typography>
              <Typography>{poolData.fee} $BUND</Typography>
            </Stack>

            <Stack
              direction={'row'}
              justifyContent="center"
              spacing={5}
              alignItems={'center'}
            >
              {' '}
              <Button
                size="large"
                sx={{
                  p: 3,
                }}
                type="submit"
                onClick={processTransaction}
              >
                Confirm
              </Button>
              <Button
                size="large"
                type="submit"
                sx={{
                  p: 3,
                  color: '#fff',
                  background: '#282835',
                }}
              >
                Decline
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Modal>
    </>
  )
}

export default ConfirmBetModal
