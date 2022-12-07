// libraries
import Image from 'next/image'
import { OverridableComponent } from '@mui/material/OverridableComponent'
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Stack,
  SvgIconTypeMap,
  Typography,
} from '@mui/material'
import { SportsFootball, SportsSoccer } from '@mui/icons-material'
// contexts and hooks

// styles

// assets

interface Props {
  sportName: string
  sportImg: StaticImageData
  sportIcon: OverridableComponent<SvgIconTypeMap<{}, 'svg'>> & {
    muiName: string
  }
}

const SportCard = (props: Props) => {
  const { sportIcon: SportIcon, sportImg, sportName } = props
  return (
    <Card
      sx={{
        maxWidth: 200,
        borderRadius: '4px',
        position: 'relative',
        background: '#0EB634',
        ':hover': { cursor: 'pointer' },
      }}
    >
      <CardMedia>
        <Image
          src={sportImg}
          width={'220px'}
          height={'280px'}
          objectFit="fill"
          alt="sport image"
        />
      </CardMedia>

      <Box
        position={'absolute'}
        height={'260px'}
        width={'140px'}
        top={100}
        left={5}
        sx={{
          backdropFilter: 'blur(2px)',
          transform: 'matrix(-0.5, 0.87, 0.87, 0.5, 0, 0)',
          background:
            'linear-gradient(186.78deg, #07070D 17.47%, rgba(7, 7, 13, 0) 125.64%)',
        }}
      ></Box>
      <Stack position={'absolute'} top={150} left={20}>
        <SportIcon sx={{ width: '40px', height: '40px', color: '#fff' }} />

        <Typography
          mt={1}
          mb={'2px'}
          fontWeight={700}
          fontSize={'16px'}
          color={'#0EB634'}
        >
          {sportName}
        </Typography>

        <Typography fontWeight={400} fontSize={'14px'} color={'#fff'}>
          Bettings Open
        </Typography>
      </Stack>
    </Card>
  )
}

export default SportCard
