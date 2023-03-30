import "./App.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TablePagination,
} from "@mui/material";
import Card from "@mui/material/Card";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const TableWithPagination = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // ---------------api fetch using axios-------------
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios("https://api.publicapis.org/entries");
      setData(result.data.entries);
    };

    fetchData();
  }, []);

  console.log(data)

  // -------------pagination from mui------------------

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <>
      <Container fixed>

        <Box sx={{ mt: 4, textAlign: "center" }}>
          <Typography variant="h6">
            Api intergation using Axios and showing Api's data in table with
            pagination using Mui
          </Typography>
        </Box>

        <Card sx={{ my: 7 }}>
          {/* --------------table----------------- */}
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>API</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Auth</TableCell>
                  <TableCell>HTTPS</TableCell>
                  <TableCell>Cors</TableCell>
                  <TableCell>Link</TableCell>
                  <TableCell>Category</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((entry) => (
                    <TableRow>
                      <TableCell>{entry.API}</TableCell>
                      <TableCell>{entry.Description}</TableCell>
                      <TableCell>{entry.Auth}</TableCell>
                      <TableCell>{entry.HTTPS ? "yes" : "no"}</TableCell>
                      <TableCell>{entry.Cors}</TableCell>
                      <TableCell>{entry.Link}</TableCell>
                      <TableCell>{entry.Category}</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>

            {/* ------------pagination----------- */}
            <TablePagination
              rowsPerPageOptions={[10, 25, 50]}
              component="div"
              count={data.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              s
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </TableContainer>
        </Card>
      </Container>
    </>
  );
};

export default TableWithPagination;
