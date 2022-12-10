import { Button, Stack, Typography } from '@mui/material'
import { NextPage } from 'next'
import Head from 'next/head'
import router from 'next/router'

interface Props {}

const error: NextPage<Props> = ({}) => {
  return (
    <>
      <Head>
        <title> 404 Page Not Found</title>
      </Head>
      <Stack
        spacing={2}
        direction="column"
        alignItems="center"
        justifyContent="center"
        sx={{ height: '100vh' }}
      >
        <Typography variant="h1" color="primary">
          404
        </Typography>
        <Typography color="primary.light">Page Not Found</Typography>
        <Button
          onClick={() => router.push('/')}
          variant="contained"
          size="large"
          color="secondary"
          sx={{ p: 3 }}
        >
          Go To Home Page
        </Button>
      </Stack>
    </>
  )
}

export default error
