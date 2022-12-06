// libraries
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from '@mui/material'
import cricket from 'assets/cricket.png'
import Image from 'next/image'

// contexts and hooks

// styles

// assets

interface Props {}

const SportCard = (props: Props) => {
  return (
    <Card
      sx={{
        maxWidth: 200,
        ':hover': { cursor: 'pointer' },
      }}
    >
      <CardMedia sx={{ display: 'inline' }}>
        <Image
          objectFit="fill"
          src={cricket}
          alt="cc"
          width={'200px'}
          height={'250px'}
        />
      </CardMedia>
      {/* <CardContent>
        <Typography variant="body2" color="text.secondary">
          Lizards are a widespread group of squamate reptiles, with over 6,000
          species, ranging across all continents except Antarctica
        </Typography>
      </CardContent> */}
    </Card>
  )
}

export default SportCard
