import { useState } from 'react'
import { useBoolean } from 'usehooks-ts'
import {
  Box,
  Button,
  ButtonGroup,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  Tooltip,
  Typography,
  useTheme,
} from '@mui/material'
import LastPageIcon from '@mui/icons-material/LastPage'
import FirstPageIcon from '@mui/icons-material/FirstPage'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft'
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight'

import { useMetamask } from 'contexts/Metamask'

import ConfirmBetModal from 'components/Modals/ConfirmBetModal'
import BetPlacedSuccessModal from 'components/Modals/BetPlacedSuccessModal'

const tableHeadStyle = {
  '& .MuiTableCell-root': {
    color: '#7D7D8D',
    borderBottom: '1px solid #282835',
  },
}

const tableBodyStyle = {
  '& .MuiTableCell-root': {
    borderTop: '1px solid #282835',
    borderBottom: '1px solid #282835',
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
    id: 1,
    sport: 'Football/Soccer',
    match: { team1: 'US', team2: 'FR' },
    bid: 0.1,
    poolFaces: 2,
    selectedTeam: 'Manchester United',
    action: ' Bet Now',
  },
  {
    id: 2,
    sport: 'Football/Soccer',
    match: { team1: 'Canada', team2: 'Greece' },
    bid: 0.1,
    poolFaces: 2,
    selectedTeam: 'Manchester United',
    action: ' Bet Now',
  },
  {
    id: 3,
    sport: 'Football/Soccer',
    match: { team1: 'Greece', team2: 'Germany' },
    bid: 0.1,
    poolFaces: 2,
    selectedTeam: 'Manchester United',
    action: ' Bet Now',
  },
  {
    id: 4,
    sport: 'Football/Soccer',
    match: { team1: 'France', team2: 'India' },
    bid: 0.1,
    poolFaces: 2,
    selectedTeam: 'Manchester United',
    action: ' Bet Now',
  },
  {
    id: 5,
    sport: 'Football/Soccer',
    match: { team1: 'Argentina', team2: 'Iceland' },
    bid: 0.1,
    poolFaces: 2,
    selectedTeam: 'Manchester United',
    action: ' Bet Now',
  },
  {
    id: 6,
    sport: 'Football/Soccer',
    match: { team1: 'Portugal', team2: 'Brazil' },
    bid: 0.1,
    poolFaces: 2,
    selectedTeam: 'Manchester United',
    action: ' Bet Now',
  },
]

type team = {
  id: number
  bid: number
  sport: string
  action: string
  selectedTeam: string
  match: { team1: string; team2: string }
}

export default function ActiveTable() {
  const { setTrue, setValue, value } = useBoolean(false)

  const openConfirmBetModal = setTrue

  const { account } = useMetamask()

  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [selectedTeam, setSelectedTeam] = useState('Select Team')
  const [transactionSuccess, setTransactionSuccess] = useState(false)
  const [selectedRow, setSelectedRow] = useState<team>({
    id: 0,
    bid: 0,
    sport: '',
    action: '',
    selectedTeam: '',
    match: { team1: '', team2: '' },
  })

  const cancelConfirmBetModal = () => {
    setValue((x: boolean) => !x)
  }

  const updateSelectedMatchState = (team: team) => {
    setSelectedRow(team)
  }

  const handleConfirmTransaction = () => {
    setTransactionSuccess(true)
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

  const toolTipJsx = (rowId: number) => {
    return (
      <Tooltip
        title={
          !account
            ? 'Connect your Wallet'
            : Object.keys(selectedRow).length === 0 || rowId !== selectedRow.id
            ? 'Please Select Team'
            : ''
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
              <TableCell sx={{ color: '#fff', pt: 0 }}>Sport</TableCell>

              <TableCell sx={{ color: '#fff', pt: 0 }} align="center">
                Pool Matches
              </TableCell>

              <TableCell sx={{ color: '#fff', pt: 0 }} align="center">
                Selected Team
              </TableCell>

              <TableCell sx={{ color: '#fff', pt: 0 }} align="center">
                Total Bid
              </TableCell>

              <TableCell sx={{ color: '#fff', pt: 0 }} align="center">
                Pool Faces
              </TableCell>

              <TableCell sx={{ color: '#fff', pt: 0 }} align="center">
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
                      onClick={() => {
                        updateSelectedMatchState(row)
                        setSelectedTeam(row.match.team1)
                      }}
                      variant="contained"
                      sx={{
                        color: '#FFFFFF',
                        background: '#282835',
                        p: 2,
                        '&:hover': {
                          backgroundColor: '#00FFC2',
                          color: '#FFFFFF',
                        },
                        border:
                          selectedRow.match.team1 === row.match.team1
                            ? '2px solid #00FFC2'
                            : '',
                      }}
                    >
                      {' '}
                      {row.match.team1}
                    </Button>

                    <Button
                      onClick={() => {
                        updateSelectedMatchState(row)
                        setSelectedTeam(row.match.team2)
                      }}
                      variant="contained"
                      sx={{
                        color: '#FFFFFF',
                        background: '#282835',
                        p: 2,
                        '&:hover': {
                          backgroundColor: '#00FFC2',
                          color: '#FFFFFF',
                        },
                        border:
                          selectedRow.match.team2 === row.match.team2
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
                  {selectedTeam}
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

                <TableCell sx={{ color: '#fff' }} align="left">
                  <Button
                    onClick={openConfirmBetModal}
                    disabled={
                      account &&
                      Object.keys(selectedRow).length > 0 &&
                      row.id === selectedRow.id
                        ? false
                        : true
                    }
                    sx={{
                      color: '#FFFFFF',
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
                  {!account ||
                  Object.keys(selectedRow).length === 0 ||
                  row.id !== selectedRow.id
                    ? toolTipJsx(row.id)
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

      <ConfirmBetModal
        open={value}
        handleConfirm={handleConfirmTransaction}
        handleClose={cancelConfirmBetModal}
      />

      <BetPlacedSuccessModal
        open={transactionSuccess}
        handleClose={setTransactionSuccess}
      />
    </>
  )
}
