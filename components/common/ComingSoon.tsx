import { Stack, Typography, Button } from '@mui/material'
import { useRouter } from 'next/router'
import React from 'react'

type Props = {}

const ComingSoon = (props: Props) => {
  const router = useRouter()
  return (
    <>
      <Stack
        spacing={2}
        direction="column"
        alignItems="center"
        justifyContent="center"
        sx={{ height: '100vh' }}
      >
        <Typography variant="h1" color="primary">
          Coming Soon
        </Typography>
        {/* <Typography color="primary.light"></Typography> */}
        <Button
          onClick={() => router.back()}
          variant="contained"
          size="large"
          color="secondary"
          sx={{ p: 3 }}
        >
          Go Back
        </Button>
      </Stack>
    </>
  )
}

export default ComingSoon
