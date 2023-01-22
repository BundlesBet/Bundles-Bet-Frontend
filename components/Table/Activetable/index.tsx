import { useEffect, useState } from 'react'
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
import id from 'date-fns/esm/locale/id/index.js'

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
  const [rowsPerPage, setRowsPerPage] = useState(20)
  const [selectedTeam, setSelectedTeam] = useState('Select Team')
  const [selectTeam, setSelectTeam] = useState<
    Array<{ id: string; selection: number }>
  >([])
  const [selectCount, setSelectCount] = useState(0)
  const [transactionSuccess, setTransactionSuccess] = useState(false)
  const [loader, setLoader] = useState(true)
  useEffect(() => {
    let newTeamArr: any = []

    for (let i = 0; i < rows.length; i++) {
      newTeamArr.push({ id: '0', selection: -2 })
    }

    setSelectTeam(newTeamArr)
    setLoader(false)
  }, [])

  const handleSelectTeam = (rowId: number, id: string, selection: number) => {
    console.log(id, selection, rowId)
    if (selectTeam[rowId].selection === -2) {
      console.log('hi')
      setSelectCount(selectCount + 1)
      const updateState = selectTeam
      updateState[rowId] = { id, selection }
      setSelectTeam(updateState)
    } else {
      console.log('hello')
      const updateState = selectTeam
      updateState[rowId] = { id, selection }
      setSelectTeam(updateState)
    }
  }
  const setTeamSelections = () => {}

  const cancelConfirmBetModal = () => {
    setValue((x: boolean) => !x)
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

  if (loader) {
    return <></>
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
                  <Stack
                    direction={'row'}
                    justifyContent="center"
                    alignItems={'center'}
                    spacing={2}
                  >
                    <Image
                      height={40}
                      width={40}
                      src={row.teamA.logo}
                      alt="homeTeamLogo"
                    />
                    <Button
                      onClick={() => handleSelectTeam(key, row.id, 0)}
                      variant="contained"
                      sx={{
                        color: '#FFFFFF',
                        background: '#282835',
                        p: 2,
                        '&:hover': {
                          backgroundColor: '#00FFC2',
                          color: '#111',
                        },
                        border:
                          selectTeam[key].selection === 0
                            ? '2px solid #00FFC2'
                            : '',
                      }}
                    >
                      {' '}
                      {row.teamA.abbreviation}
                    </Button>
                  </Stack>
                </TableCell>
                <TableCell sx={{ color: '#fff' }} align="center">
                  <Stack
                    direction={'row'}
                    justifyContent="center"
                    alignItems={'center'}
                    spacing={2}
                  >
                    <Image
                      height={40}
                      width={40}
                      src={row.teamB.logo}
                      alt="awayTeamLogo"
                    />
                    <Button
                      onClick={() => handleSelectTeam(key, row.id, 1)}
                      variant="contained"
                      sx={{
                        color: '#FFFFFF',
                        background: '#282835',
                        p: 2,
                        '&:hover': {
                          backgroundColor: '#00FFC2',
                          color: '#111',
                        },
                        border:
                          selectTeam[key].selection === 1
                            ? '2px solid #00FFC2'
                            : '',
                      }}
                    >
                      {' '}
                      {row.teamB.abbreviation}
                    </Button>
                  </Stack>
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
