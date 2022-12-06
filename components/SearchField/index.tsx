import Stack from '@mui/material/Stack'
import { Autocomplete, Paper, TextField } from '@mui/material'

import { sportsList } from 'utils'

export default function SportSearch() {
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
        options={sportsList.map(
          (option: { sportName: string }) => option.sportName
        )}
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
      />
    </Stack>
  )
}
