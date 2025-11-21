import  React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TablePagination from '@mui/material/TablePagination';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';

function createData(id, firstname, lastname,email ,roles) {
  return { id, firstname, lastname, email,roles };
}

const rows = [
  createData(1, "Raj", "Kumar","raj@gmail.com" ,"Customer"),
  createData(2, "Manoj", "Jaiswal", "raj@gmail.com" ,"Admin"),
  createData(3, "Lakshay", "Singh", "raj@gmail.com" ,"Ready-only"),
  createData(4, "Amit", "Sharma", "raj@gmail.com" ,"Customer"),
  createData(5, "Ravi", "Verma","raj@gmail.com" , "Admin"),
  createData(6, "Neha", "Gupta","raj@gmail.com" , "Customer"),
  createData(7, "Pooja", "Khan","raj@gmail.com" , "Ready-only"),
  createData(8, "Vikram", "Rao", "raj@gmail.com" ,"Admin"),
  createData(9, "Sonia", "Patel", "raj@gmail.com" ,"Customer"),
];

export default function SimpleTableWithPagination() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [selected, setSelected] = React.useState([]);

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = rows.map((r) => r.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleRowClick = (event, id) => {
    // toggle selection for a row
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;

  // Pagination slice
  const visibleRows = rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <TableContainer>
          <Table aria-labelledby="simple-table" size="medium">
            <TableHead className='bg-sky-200'>
              <TableRow className=' font-semibold text-xl'>
                <TableCell padding="checkbox">
                  <Checkbox
                    color="primary"
                    indeterminate={selected.length > 0 && selected.length < rows.length}
                    checked={rows.length > 0 && selected.length === rows.length}
                    onCh ange={handleSelectAllClick}
                    inputProps={{ 'aria-label': 'select all users' }}
                  />
                </TableCell>
                <TableCell>Id</TableCell>
                <TableCell>First Name</TableCell>
                <TableCell>Last Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Roles</TableCell>
                <TableCell>Modified</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {visibleRows.map((row) => {
                const isItemSelected = isSelected(row.id);
                const labelId = `simple-table-checkbox-${row.id}`;

                return (
                  <TableRow
                    hover
                    onClick={(event) => handleRowClick(event, row.id)}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.id}
                    selected={isItemSelected}
                    sx={{ cursor: 'pointer' }}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        color="primary"
                        checked={isItemSelected}
                        inputProps={{ 'aria-labelledby': labelId }}
                        onClick={(e) => {
                          // prevent the row's onClick from toggling twice
                          e.stopPropagation();
                          handleRowClick(e, row.id);
                        }}
                      />
                    </TableCell>

                    <TableCell component="th" id={labelId} scope="row">
                      {row.id}
                    </TableCell>
                    <TableCell>{row.firstname}</TableCell>
                    <TableCell>{row.lastname}</TableCell>
                    <TableCell>{row.email}</TableCell>
                    <TableCell>{row.roles}</TableCell>

                    <TableCell>
                      <Button
                        size="small"
                        variant="outlined"
                        onClick={(e) => {
                          e.stopPropagation(); // don't toggle row selection when clicking Modify
                          // put your modify handler here
                          console.log('Modify clicked for id', row.id);
                        }}
                      >
                        Modify
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
}

