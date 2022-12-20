import * as React from 'react'
import { formatInTimeZone } from 'date-fns-tz'
import {
  Box,
  Button,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  useTheme,
} from '@mui/material'
import LastPageIcon from '@mui/icons-material/LastPage'
import FirstPageIcon from '@mui/icons-material/FirstPage'
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft'
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight'

import { useRouter } from 'next/router'

function createData(
  sport: string,
  contest: string,
  contestEntry: number,
  totalPricePool: number,
  entry: number,
  action: string
) {
  return { sport, contest, contestEntry, totalPricePool, entry, action }
}

const rows = [
  createData('Football', 'NFL showdown', 15, 40000, 1445, 'Enter'),
  createData('Football', 'NBA showdown', 35, 6000, 114, 'Enter'),
  createData('Football', 'NFL Best Down', 55, 80000, 1967, 'Enter'),
  createData('Football', 'NFL Fadeaway', 65, 90000, 23452, 'Enter'),
]

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

export default function ViewMatchTable() {
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(5)
  const router = useRouter()
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
  return (
    <>
      <TableContainer>
        <Table sx={{ minWidth: 300 }}>
          <TableHead sx={tableHeadStyle}>
            <TableRow>
              <TableCell sx={{ color: 'primary.light' }} align="center">
                Contest
              </TableCell>

              <TableCell sx={{ color: 'primary.light' }} align="center">
                Prize Pool
              </TableCell>
              <TableCell sx={{ color: 'primary.light' }} align="center">
                Entries
              </TableCell>
              <TableCell sx={{ color: 'primary.light' }} align="center">
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
                <TableCell sx={{ color: '#fff' }} align="center">
                  {row.contest}
                </TableCell>

                <TableCell sx={{ color: '#fff' }} align="center">
                  {row.totalPricePool}
                  <br />
                  <Typography color="primary.light">$BUND</Typography>
                </TableCell>
                <TableCell sx={{ color: '#fff' }} align="center">
                  {row.entry}
                </TableCell>

                <TableCell sx={{ color: '#fff' }} align="center">
                  <Button
                    onClick={() => router.push('/select-pool')}
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
                    {row.action}
                  </Button>
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
    </>
  )
}
