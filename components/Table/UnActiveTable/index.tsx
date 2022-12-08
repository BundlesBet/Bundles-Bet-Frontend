import * as React from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import { Button, Typography } from '@mui/material'

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

export default function UnActiveTable() {
  return (
    <TableContainer>
      <Table sx={{ minWidth: 300 }}>
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
          {rows.map((row) => (
            <TableRow
              key={row.match}
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
                  sx={{
                    background: '#282835',
                    p: 2,
                    '&:hover': {
                      backgroundColor: '#0EB634',
                      color: '#FFFFFF',
                    },
                  }}
                >
                  {row.action}
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
