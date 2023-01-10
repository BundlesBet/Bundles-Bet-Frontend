import * as React from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import {
  Box,
  Button,
  IconButton,
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

function createData(
  sport: string,
  match: string,
  bid: number,
  poolFaces: number,
  action: any
) {
  return { sport, match, bid, poolFaces, action }
}

const rows = [
  createData('NPL', 'Canada vs Greece', 126.0, 24, 'Bet Now'),
  createData('NHL', 'US vs France', 339.0, 37, 'Bet Now'),
  createData('BasketBall', 'Brazil vs Us', 262, 16.0, 'Bet Now'),
  createData('NHL', 'US vs France', 339.0, 37, 'Bet Now'),
  createData('BasketBall', 'Brazil vs Us', 262, 16.0, 'Bet Now'),
  createData('NHL', 'US vs France', 339.0, 37, 'Bet Now'),
  createData('BasketBall', 'Brazil vs Us', 262, 16.0, 'Bet Now'),
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

export default function UnActiveTable() {
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(5)

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
        <Table sx={{ minWidth: 500 }}>
          <TableHead sx={tableHeadStyle}>
            <TableRow>
              <TableCell sx={{ color: '#fff' }}>Sport</TableCell>
              <TableCell sx={{ color: '#fff' }} align="right">
                Pool Matches
              </TableCell>
              <TableCell sx={{ color: '#fff' }} align="right">
                Total Bid
              </TableCell>
              <TableCell sx={{ color: '#fff' }} align="right">
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
                <TableCell sx={{ color: '#fff' }} align="right">
                  {row.match}
                </TableCell>
                <TableCell sx={{ color: '#fff' }} align="right">
                  {row.bid} <br />{' '}
                  <Typography color="primary.light">$BUND </Typography>
                </TableCell>
                <TableCell sx={{ color: '#fff' }} align="right">
                  {row.poolFaces}
                  <br />
                  <Typography color="primary.light">Small Pool</Typography>
                </TableCell>

                <TableCell sx={{ color: '#fff' }} align="right">
                  <Button
                    disabled={true}
                    sx={{
                      background: '#282835',
                      p: 2,
                      '&:hover': {
                        backgroundColor: '#00FFC2',
                        color: '#111',
                      },
                    }}
                  >
                    Un Active
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
