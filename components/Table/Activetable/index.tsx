import * as React from 'react'
import { useState } from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import {
  Box,
  Button,
  ButtonGroup,
  IconButton,
  Stack,
  TableFooter,
  TablePagination,
  Tooltip,
  Typography,
  useTheme,
} from '@mui/material'
import { useBoolean } from 'usehooks-ts'
import FirstPageIcon from '@mui/icons-material/FirstPage'
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft'
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight'
import LastPageIcon from '@mui/icons-material/LastPage'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'

import ConfirmBetModal from 'components/Modals/ConfirmBetModal'
import { useMetamask } from 'contexts/Metamask'

import { FR, US } from 'assets'

const tableHeadStyle = {
  '& .MuiTableCell-root': {
    borderBottom: '1px solid #282835',
    color: '#7D7D8D',
  },
}

const tableBodyStyle = {
  '& .MuiTableCell-root': {
    borderBottom: '1px solid #282835',
    borderTop: '1px solid #282835',
  },
}

interface TablePaginationActionsProps {
  count: number
  page: number
  rowsPerPage: number
  onPageChange: (
    event: React.MouseEvent<HTMLButtonElement>,
    newPage: number
  ) => void
}

function TablePaginationActions(props: TablePaginationActionsProps) {
  const theme = useTheme()
  const { count, page, rowsPerPage, onPageChange } = props

  const handleFirstPageButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, 0)
  }

  const handleBackButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, page - 1)
  }

  const handleNextButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, page + 1)
  }

  const handleLastPageButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1))
  }

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? (
          <LastPageIcon sx={{ color: page === 0 ? '#7D7D8D' : '#fff' }} />
        ) : (
          <FirstPageIcon sx={{ color: page === 0 ? '#7D7D8D' : '#fff' }} />
        )}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === 'rtl' ? (
          <KeyboardArrowRight sx={{ color: page === 0 ? '#7D7D8D' : '#fff' }} />
        ) : (
          <KeyboardArrowLeft sx={{ color: page === 0 ? '#7D7D8D' : '#fff' }} />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? (
          <KeyboardArrowLeft
            sx={{
              color:
                page >= Math.ceil(count / rowsPerPage) - 1 ? '#7D7D8D' : '#fff',
            }}
          />
        ) : (
          <KeyboardArrowRight
            sx={{
              color:
                page >= Math.ceil(count / rowsPerPage) - 1 ? '#7D7D8D' : '#fff',
            }}
          />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? (
          <FirstPageIcon
            sx={{
              color:
                page >= Math.ceil(count / rowsPerPage) - 1 ? '#7D7D8D' : '#fff',
            }}
          />
        ) : (
          <LastPageIcon
            sx={{
              color:
                page >= Math.ceil(count / rowsPerPage) - 1 ? '#7D7D8D' : '#fff',
            }}
          />
        )}
      </IconButton>
    </Box>
  )
}

const rows = [
  {
    sport: 'Football',
    match: { team1: 'US', team2: 'FR' },
    bid: 0.1,
    poolFaces: 2,
    selectedTeam: 'Manchester United',
    action: ' Bet Now',
  },
  {
    sport: 'Football',
    match: { team1: 'Canada', team2: 'Greece' },
    bid: 0.1,
    poolFaces: 2,
    selectedTeam: 'Manchester United',
    action: ' Bet Now',
  },
  {
    sport: 'Football',
    match: { team1: 'Greece', team2: 'Germany' },
    bid: 0.1,
    poolFaces: 2,
    selectedTeam: 'Manchester United',
    action: ' Bet Now',
  },
  {
    sport: 'Football',
    match: { team1: 'France', team2: 'India' },
    bid: 0.1,
    poolFaces: 2,
    selectedTeam: 'Manchester United',
    action: ' Bet Now',
  },
  {
    sport: 'Football',
    match: { team1: 'Canada', team2: 'Greece' },
    bid: 0.1,
    poolFaces: 2,
    selectedTeam: 'Manchester United',
    action: ' Bet Now',
  },
  {
    sport: 'Football',
    match: { team1: 'Portugal', team2: 'Brazil' },
    bid: 0.1,
    poolFaces: 2,
    selectedTeam: 'Manchester United',
    action: ' Bet Now',
  },
]

export default function ActiveTable() {
  const { setTrue, setFalse, setValue, value } = useBoolean(false)

  const openConfirmBetModal = setTrue

  const { account } = useMetamask()
  const cancelConfirmBetModal = () => {
    setValue((x: boolean) => !x)
  }
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(5)
  const [selectedTeamName, setSelectedTeamName] = useState<any>('Select Team')
  console.log(
    '🚀 ~ file: index.tsx:193 ~ ActiveTable ~ selectedTeamName',
    selectedTeamName
  )

  const updateSelectedNftState = (name: string) => {
    setSelectedTeamName(name)
  }

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const toolTipJsx = () => {
    return (
      <Tooltip
        title={
          !account
            ? 'Connect your Wallet'
            : '' || selectedTeamName !== 'Select Team'
            ? ''
            : 'Please Select Team'
        }
        arrow
      >
        <IconButton>
          <InfoOutlinedIcon color="primary" />
        </IconButton>
      </Tooltip>
    )
  }
  return (
    <>
      <TableContainer>
        <Table sx={{ minWidth: 500 }}>
          <TableHead sx={tableHeadStyle}>
            <TableRow>
              <TableCell sx={{ color: '#fff' }}>Sport</TableCell>
              <TableCell sx={{ color: '#fff' }} align="center">
                Pool Matches
              </TableCell>
              <TableCell sx={{ color: '#fff' }} align="center">
                Selected Team
              </TableCell>
              <TableCell sx={{ color: '#fff' }} align="center">
                Total Bid
              </TableCell>
              <TableCell sx={{ color: '#fff' }} align="center">
                Pool Faces
              </TableCell>
              <TableCell sx={{ color: '#fff' }} align="right">
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody sx={tableBodyStyle}>
            {(rowsPerPage > 0
              ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : rows
            ).map((row, key) => (
              <TableRow
                key={key}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell sx={{ color: '#fff' }} component="th" scope="row">
                  {row.sport}
                </TableCell>

                <TableCell sx={{ color: '#fff' }} align="center">
                  <ButtonGroup
                    disableElevation
                    variant="contained"
                    aria-label="Disabled elevation buttons"
                  >
                    <Button
                      onClick={() => updateSelectedNftState(row.match.team1)}
                      variant="contained"
                      sx={{
                        background: '#282835',
                        p: 2,
                        '&:hover': {
                          backgroundColor: '#00FFC2',
                          color: '#FFFFFF',
                        },
                        border:
                          selectedTeamName === row.match.team1
                            ? '2px solid #00FFC2'
                            : '',
                      }}
                    >
                      {' '}
                      {row.match.team1}
                    </Button>

                    <Button
                      onClick={() => updateSelectedNftState(row.match.team2)}
                      variant="contained"
                      sx={{
                        background: '#282835',
                        p: 2,
                        '&:hover': {
                          backgroundColor: '#00FFC2',
                          color: '#FFFFFF',
                        },
                        border:
                          selectedTeamName === row.match.team2
                            ? '2px solid #00FFC2'
                            : '',
                      }}
                    >
                      {' '}
                      {row.match.team2}
                    </Button>
                  </ButtonGroup>
                </TableCell>
                <TableCell sx={{ color: '#fff' }} align="center">
                  {selectedTeamName}
                </TableCell>
                <TableCell sx={{ color: '#fff' }} align="center">
                  {row.bid} <br />{' '}
                  <Typography color="primary.light">$BUND </Typography>
                </TableCell>
                <TableCell sx={{ color: '#fff' }} align="center">
                  {row.poolFaces}
                  <br />
                  <Typography color="primary.light">Small Pool</Typography>
                </TableCell>

                <TableCell sx={{ color: '#fff' }} align="right">
                  <Button
                    onClick={openConfirmBetModal}
                    disabled={
                      account && selectedTeamName !== 'Select Team'
                        ? false
                        : true
                    }
                    sx={{
                      background: '#282835',
                      p: 2,
                      '&:hover': {
                        backgroundColor: '#00FFC2',
                        color: '#FFFFFF',
                      },
                    }}
                  >
                    {row.action}
                  </Button>
                  {!account || selectedTeamName === 'Select Team'
                    ? toolTipJsx()
                    : false}
                </TableCell>
              </TableRow>
            ))}
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                sx={{ color: '#fff' }}
                rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  inputProps: {
                    'aria-label': 'rows per page',
                  },
                  native: true,
                }}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
      <ConfirmBetModal open={value} handleClose={cancelConfirmBetModal} />
    </>
  )
}
