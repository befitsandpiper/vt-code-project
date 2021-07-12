import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Button,
  Table,
  TableBody, 
  TableCell, 
  TableContainer,
  TableFooter,
  TableHead, 
  TableRow,
  TablePagination,
  TextField,
  Paper
} from '@material-ui/core';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
    margin: 20,
  },
});

export default function BasicTable(props) {
  const classes = useStyles();

  const [data, setData] = useState(props.data);
  const [filteredData, setFilteredData] = useState(data);
  const [filterText, setFilterText] = useState("");
  const [form, setForm] = useState({});
  const [selectedRow, setSelectedRow] = useState(null);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const addRow = (row) => {
    const newRow = {};
    keys.forEach((key) => {
      if (key === 'id') {
        newRow[key] = Math.floor(Math.random() * 1000000);
      } else {
        newRow[key] = 'new';
      }
    });
    setData([...data, newRow]);
  }
  const editRow = (row, index) => {
    setSelectedRow(index);
    setForm(row)
  }
  const removeRow = (index) => {
    const newData = [...data];
    newData.splice(index, 1);
    setData(newData);
  }

  const setCellValue = (key, value) => {
    const newForm = {...form};
    newForm[key] = value;
    setForm(newForm);
  }

  const onSave = (row) => {
    const newData = [...data];
    const index = newData.findIndex((elem) => elem.id === row.id)
    newData.splice(index, 1, form);
    setData(newData);
    setSelectedRow(null);
    setForm({});
  }

  const filter = (value) => {
    setFilterText(value);
    setSelectedRow(null);
    const newFilteredData = [];
    for (const item of data) {
      if (item.name.toLowerCase().includes(value.toLowerCase())) {
        newFilteredData.push(item);
      }
    }
    setFilteredData(newFilteredData);
  }

  useEffect(() => filter(filterText), [data]);

  const keys = Object.keys(data[0]);

  return (
    <Paper>
      {props.hasFilter && <TextField id="Search" label="Search" onChange={(e) => filter(e.target.value)}/>}
      <TableContainer className={classes.table}>
        <Table pageSize={5}>
          <TableHead>
            <TableRow>
              {keys.map((key) => 
                <TableCell>{key}</TableCell>
              )}
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
              const reactRow = index !== selectedRow
              ? <TableRow key={row.id}>
                {keys.map(key => (
                  <TableCell>{row[key]}</TableCell>
                ))}
                <TableCell>
                  <Button onClick={() => removeRow(index)}>Delete Row</Button>
                  <Button onClick={() => editRow(row, index)}>Edit Row</Button>
                </TableCell>
              </TableRow>
              : <TableRow key={row.id}>
                  {keys.map(key => {
                    if (key === "id") {
                      return <TableCell>{row.id}</TableCell>
                    }
                    return (
                      <TableCell>
                        <TextField id={key} defaultValue={form[key]} onChange={(e) => setCellValue(key, e.target.value)}/>
                      </TableCell>
                    )
                  })}
                <TableCell>
                  <Button onClick={() => onSave(row)}>Save</Button>
                </TableCell>
              </TableRow>

              return reactRow;
            })}
          </TableBody>
          <TableFooter>
            <Button onClick={() => {
              const newRow = {};
              keys.forEach((key) => {
                if (key === 'id') {
                  newRow[key] = Math.floor(Math.random() * 1000000);
                } else {
                  newRow[key] = 'new';
                }
              });
              addRow(newRow);
            }}>Add Row</Button>
          </TableFooter>
        </Table>
      </TableContainer>
      {props.hasPagination && <TablePagination
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5,10,15,20]}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />}
    </Paper>
  );
}