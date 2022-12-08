import { createTheme } from '@mui/material'

/**
 * @returns <returns the common theme components for the application>
 */

const customTheme = createTheme({
  typography: {
    fontFamily: ['DM Sans'].join('sans-serif'),
  },
  palette: {
    primary: {
      main: '#FFFFFF',
      light: '#7D7D8D',
    },
    secondary: {
      main: '#0EB634 ', //Choose your primary and secondary colors , so you can use <Typography color="primary or color ="secondary"></Typography>
    },
  },
  components: {
    // Name of the component
    MuiButton: {
      styleOverrides: {
        // Name of the slot
        root: {
          //   Some CSS
          fontWeight: 700,
          fontSize: '14px',
          lineHeight: '18px',
          background: '#0EB634',
          borderRadius: '4px',
          color: '#FFFFFF',
          '&:hover': {
            backgroundColor: '#0EB634',
            color: '#FFFFFF',
            boxShadow: 20,
          },
        },
      },
    },
    MuiDivider: {
      variants: [
        {
          props: { variant: 'fullWidth' },
          style: {
            borderBottomWidth: 1,
            borderColor: '#282835',
            ':before': {
              borderBottomWidth: 1,
              borderColor: '#282835',
            },
            ':after': {
              borderBottomWidth: 1,
              borderColor: '#282835',
            },
          },
        },
      ],
    },
  },
})

export default customTheme
