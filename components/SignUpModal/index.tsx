import React from 'react'
import { useFormik } from 'formik'
import { Box, Button, Modal, Stack, TextField, Typography } from '@mui/material'

// contexts and hooks
import { signUpValidation } from 'helpers/validation'

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

const SignUpModal = (props: Props) => {
  const { handleClose, open } = props

  console.log(open)

  const formik = useFormik({
    initialValues: {
      email: '',
      userName: '',
    },
    onSubmit: async (values) => {
      if (!formik.errors.userName || !formik.values.userName.length) {
        signUp()
      }
    },
    validationSchema: signUpValidation,
  })

  const signUp = () => {
    // api call to save the info passed
    const userData = {
      email: formik.values.email,
      userName: formik.values.userName,
    }

    // backend api call
    // currently we are only saving in local storage but
    // later on we will use api calls
    localStorage.setItem('userData', JSON.stringify(userData))

    handleClose(true)
  }

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography
          id="modalHeading"
          variant="h6"
          component="h2"
          textAlign={'center'}
          mb={3}
        >
          User Onboarding
        </Typography>
        <form onSubmit={formik.handleSubmit}>
          <Box>
            <Box>
              <Typography id="userName">
                Enter User Name<sup>*</sup>
              </Typography>
            </Box>
            <TextField
              required
              fullWidth
              size="small"
              id="userName"
              name="userName"
              margin="normal"
              variant="outlined"
              onBlur={formik.handleBlur}
              placeholder="Input User Name"
              value={formik.values.userName}
              onChange={formik.handleChange}
              sx={{ input: { color: '#fff' } }}
              helperText={formik.touched.userName && formik.errors.userName}
              error={formik.touched.userName && Boolean(formik.errors.userName)}
            />
          </Box>

          <Box>
            <Box>
              <Typography id="email">Enter Email</Typography>
            </Box>
            <TextField
              fullWidth
              size="small"
              id="email"
              name="email"
              margin="normal"
              variant="outlined"
              placeholder="Input Email"
              onBlur={formik.handleBlur}
              value={formik.values.email}
              onChange={formik.handleChange}
              sx={{ input: { color: '#fff' } }}
              helperText={formik.touched.email && formik.errors.email}
              error={formik.touched.email && Boolean(formik.errors.email)}
            />
          </Box>

          <Stack
            mt={3}
            width={'100%'}
            direction={'row'}
            justifyContent="flex-end"
            alignItems={'flex-end'}
          >
            <Button size="large" type="submit">
              Confirm
            </Button>
          </Stack>
        </form>
      </Box>
    </Modal>
  )
}

export default SignUpModal
