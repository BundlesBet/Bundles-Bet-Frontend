import { useState } from 'react'
import { useBoolean } from 'usehooks-ts'
import {
  Box,
  Button,
  ButtonGroup,
  IconButton,
  Stack,
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
import Image from 'next/image'

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

type team = {
  id: number
  bid: number
  sport: string
  action: string
  selectedTeam: string
  match: { team1: string; team2: string }
}

interface ActiveTableProps {
  matchData: any
}

export default function ActiveTable(props: ActiveTableProps) {
  const { setTrue, setValue, value } = useBoolean(false)
  const { matchData } = props

  const rows = matchData.matches
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
              <TableCell sx={{ color: '#fff', pt: 0 }} align="center">
                Home Team
              </TableCell>
              <TableCell sx={{ color: '#fff', pt: 0 }} align="center">
                Away Team
              </TableCell>

              <TableCell sx={{ color: '#fff', pt: 0 }} align="center">
                Selected Team
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody sx={tableBodyStyle}>
            {(rowsPerPage > 0
              ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : rows
            ).map((row: any, key: any) => (
              <TableRow
                key={key}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell sx={{ color: '#fff' }} align="center">
                  <Button
                    startIcon={
                      <Image
                        src={row.teamA.logo}
                        alt="homeTeamLogo"
                        layout="fill"
                      />
                    }
                    // onClick={() => {
                    //   updateSelectedMatchState(row)
                    //   setSelectedTeam(row.match.team1)
                    // }}
                    variant="contained"
                    sx={{
                      color: '#FFFFFF',
                      background: '#282835',
                      p: 2,
                      '&:hover': {
                        backgroundColor: '#00FFC2',
                        color: '#111',
                      },
                      // border:
                      //   selectedRow.match.team1 === row.match.team1
                      //     ? '2px solid #00FFC2'
                      //     : '',
                    }}
                  >
                    {' '}
                    {row.teamA.abbreviation}
                  </Button>
                </TableCell>
                <TableCell sx={{ color: '#fff' }} align="center">
                  <Button
                    startIcon={
                      <Image
                        src={row.teamB.logo}
                        alt="awayTeamLogo"
                        layout="fill"
                      />
                    }
                    // onClick={() => {
                    //   updateSelectedMatchState(row)
                    //   setSelectedTeam(row.match.team2)
                    // }}
                    variant="contained"
                    sx={{
                      color: '#FFFFFF',
                      background: '#282835',
                      p: 2,
                      '&:hover': {
                        backgroundColor: '#00FFC2',
                        color: '#111',
                      },
                      // border:
                      //   selectedRow.match.team2 === row.match.team2
                      //     ? '2px solid #00FFC2'
                      //     : '',
                    }}
                  >
                    {' '}
                    {row.teamB.abbreviation}
                  </Button>
                </TableCell>
                <TableCell sx={{ color: '#fff' }} align="center">
                  {selectedTeam}
                </TableCell>
              </TableRow>
            ))}
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
            <TableRow>
              <TableCell align="right" colSpan={3}>
                <Button
                  onClick={openConfirmBetModal}
                  sx={{
                    color: '#FFFFFF',
                    background: '#282835',
                    p: 2,
                    '&:hover': {
                      backgroundColor: '#00FFC2',
                      color: '#111',
                    },
                  }}
                >
                  Bet Now
                </Button>
              </TableCell>
            </TableRow>
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
