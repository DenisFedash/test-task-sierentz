import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { data } from '../../data';
import { nanoid } from 'nanoid';

export default function BasicTable() {
  const tableData = Object.entries(data);
  const years = Array.from(
    new Set(tableData.flatMap(n => Object.keys(n[1].G)))
  ).sort((a, b) => a - b);

  const columns = Array.from(
    new Set(tableData.flatMap(n => Object.values(n[1].G).flatMap(Object.keys)))
  ).sort();
  console.log(tableData);
  return (
    <TableContainer component={Paper}>
      <Table sx={{ maxWidth: 850 }} aria-label="simple table">
        <TableHead>
          <TableRow key={nanoid()}>
            <TableCell rowSpan={2} key={nanoid()} align="center">
              regions
            </TableCell>
            {years.map(year => (
              <TableCell colSpan={columns.length} key={nanoid()} align="center">
                {year}
              </TableCell>
            ))}
          </TableRow>
          <TableRow key={nanoid()}>
            {years.flatMap(x =>
              columns.map(letter => (
                <TableCell key={nanoid()} align="center">
                  {letter}
                </TableCell>
              ))
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {tableData.map(([region, { G }]) => (
            <TableRow key={nanoid()}>
              <TableCell key={nanoid()}>{region}</TableCell>
              {years.flatMap(values =>
                columns.map(value => (
                  <TableCell key={nanoid()} align="center">
                    {G[values]?.[value]?.value ?? 0}
                  </TableCell>
                ))
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
