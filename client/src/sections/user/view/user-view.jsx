/* eslint-disable perfectionist/sort-imports */
/* eslint-disable import/no-unresolved */
import React, { useState, useEffect } from 'react';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
// import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import TableBody from '@mui/material/TableBody';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { CircularProgress } from '@mui/material';

// import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';
import TableNoData from '../table-no-data';
import UserTableHead from '../user-table-head';
import TableEmptyRows from '../table-empty-rows';
import UserTableToolbar from '../user-table-toolbar';
import { emptyRows, applyFilter, getComparator } from '../utils';

export default function UserPage() {
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/scholarshipRequests/');
        const data = await response.json();
        setStudents(data.filter(student => student.approvedBy.length === 0));
        setLoading(false);
      } catch (error) {
        console.error('Error fetching students:', error);
        setLoading(false);
      }
    };
    fetchStudents();
  }, []);

  const handleApprove = async (id) => {
    try {
      const response = await fetch(`http://localhost:8000/api/scholarshipRequests/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ approvedBy: ['volunteer'] }),
      });

      if (response.ok) {
        setStudents(students.filter(student => student._id !== id));
      } else {
        console.error('Failed to approve student');
      }
    } catch (error) {
      console.error('Error approving student:', error);
    }
  };

  const handleSort = (event, id) => {
    const isAsc = orderBy === id && order === 'asc';
    if (id !== '') {
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(id);
    }
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = students.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const dataFiltered = applyFilter({
    inputData: students,
    comparator: getComparator(order, orderBy),
    filterName,
  });

  const notFound = !dataFiltered.length && !!filterName;

  if (loading) {
    return (
      <Container>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Users</Typography>
      </Stack>

      <Card>
        <UserTableToolbar
          numSelected={selected.length}
          filterName={filterName}
          onFilterName={handleFilterByName}
        />

        <Scrollbar>
          <TableContainer sx={{ overflow: 'unset' }}>
            <Table sx={{ minWidth: 800 }}>
              <UserTableHead
                order={order}
                orderBy={orderBy}
                rowCount={students.length}
                numSelected={selected.length}
                onRequestSort={handleSort}
                onSelectAllClick={handleSelectAllClick}
                headLabel={[
                  { id: 'name', label: 'Name' },
                  { id: 'email', label: 'Email' },
                  { id: 'course', label: 'Course' },
                  { id: 'collegeName', label: 'College Name' },
                  { id: 'incomeStatement', label: 'Income Statement' },
                  { id: 'marksheet', label: 'Marksheet' },
                  { id: 'actions', label: 'Actions' },
                ]}
              />
              <TableBody>
                {dataFiltered
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <TableRow key={row._id}>
                      <TableCell>{row.name}</TableCell>
                      <TableCell>{row.email}</TableCell>
                      <TableCell>{row.course}</TableCell>
                      <TableCell>{row.collegeName}</TableCell>
                      <TableCell>
                        <a href={`http://localhost:8000/${row.incomeStatement}`} target="_blank" rel="noopener noreferrer">
                          View
                        </a>
                      </TableCell>
                      <TableCell>
                        <a href={`http://localhost:8000/${row.incomeStatement}`} target="_blank" rel="noopener noreferrer">
                          View
                        </a>
                      </TableCell>
                      <TableCell>
                        <Select
                          defaultValue=""
                          onChange={(e) => handleApprove(row._id)}
                        >
                          <MenuItem value="">Select</MenuItem>
                          <MenuItem value="approved">Approve</MenuItem>
                          <MenuItem value="rejected">Reject</MenuItem>
                        </Select>
                      </TableCell>
                    </TableRow>
                  ))}

                <TableEmptyRows height={77} emptyRows={emptyRows(page, rowsPerPage, students.length)} />

                {notFound && <TableNoData query={filterName} />}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <TablePagination
          page={page}
          component="div"
          count={students.length}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>
    </Container>
  );
}
