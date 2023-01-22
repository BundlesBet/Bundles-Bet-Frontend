// libraries
import { useDispatch } from 'react-redux'
import { OverridableComponent } from '@mui/material/OverridableComponent'
import { Stack, SvgIconTypeMap, Typography } from '@mui/material'

import { setSportSelected } from 'redux/slices/user'

interface Props {
  id: number
  sportName: string
  sportImg: StaticImageData
  clickHandler?: () => void
  selectHandler?: () => void
  sportIcon: OverridableComponent<SvgIconTypeMap<{}, 'svg'>> & {
    muiName: string
  }
  sportValue: string
}

const SportCard = (props: Props) => {
  const {
    sportIcon: SportIcon,
    sportImg,
    sportName,
    id,
    clickHandler,
    sportValue,
  } = props

  const dispatch = useDispatch()

  return (
    <>
      <Stack
        onClick={() => {
          ;(props as any).selectHandler()
          dispatch(
            setSportSelected({
              icon: JSON.stringify(SportIcon),
              img: JSON.stringify(sportImg),
              sportName,
              id,
              value: sportValue,
            })
          )
          clickHandler!()
        }}
        direction="column"
        justifyContent={'center'}
        alignItems={'center'}
        sx={{ cursor: 'pointer' }}
      >
        <SportIcon sx={{ width: '40px', height: '40px', color: '#fff' }} />

        <Typography
          mt={1}
          mb={'2px'}
          fontWeight={700}
          fontSize={'16px'}
          color={'#01FFC2'}
        >
          {sportName}
        </Typography>
      </Stack>
    </>
  )
}

export default SportCard
