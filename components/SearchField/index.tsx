import Stack from '@mui/material/Stack'
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'
import { Autocomplete, Paper, TextField } from '@mui/material'

import { sportsList, sportsListType } from 'utils'
import { setSportSelected } from 'redux/slices/user'

export default function SportSearch() {
  const router = useRouter()
  const dispatch = useDispatch()

  return (
    <Stack
      spacing={2}
      sx={{
        width: 400,
        backgroundColor: '#1C1C26',
      }}
    >
      <Autocomplete
        freeSolo
        PaperComponent={({ children }) => (
          <Paper
            style={{
              color: '#fff',
              background: '#1C1C26',
              fontFamily: 'DM Sans',
            }}
          >
            {children}
          </Paper>
        )}
        id="sport search"
        // options={sportsList.map((option: sportsListType) => option.sportName)}
        options={sportsList}
        getOptionLabel={(option) => (option as sportsListType).sportName}
        renderInput={(params) => (
          <TextField
            {...params}
            label={'Search Sport'}
            sx={{
              input: { color: '#fff' },
            }}
            InputLabelProps={{
              style: { color: '#fff' },
            }}
            InputProps={{
              ...params.InputProps,
              type: 'search',
            }}
          />
        )}
        onChange={(e, option) => {
          const obj = {
            id: (option as sportsListType).id,
            sportName: (option as sportsListType).sportName,
            img: JSON.stringify((option as sportsListType).img),
            icon: JSON.stringify((option as sportsListType).icon),
          }
          dispatch(setSportSelected(obj))
          localStorage.setItem('selectedSport', JSON.stringify(obj))
          router.push(`/viewSportPools/${(option as sportsListType).id}`)
        }}
      />
    </Stack>
  )
}
