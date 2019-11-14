import React, { Component } from "react";
import ReactLoading from "react-loading";
import axios from "axios";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import { withStyles } from "@material-ui/styles";
import { Container } from "@material-ui/core";
import "./DeviceTable.css";

const styles = {
  root: {
    width: "100%"
  },
  tableWrapper: {
    maxHeight: "500",
    overflow: "auto",
    maxWidth: 1100,
    margin: "100px auto"
  },
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh"
  }
};

class DeviceTable extends Component {
  state = {
    devices: [],
    isLoading: true,
    page: 0,
    rowsPerPage: 10
  };
  timeoutId = null;
  columns = [
    { id: "id", label: "Id", minWidth: 100 },
    { id: "name", label: "Name", minWidth: 200 },
    {
      id: "ip",
      label: "Ip",
      minWidth: 150,
      align: "right"
    },
    {
      id: "status",
      label: "Status",
      minWidth: 100,
      align: "right",
      format: value => value.toLocaleString()
    }
  ];

  pinger = (ip, timeout) => {
    return new Promise(res => {
      let image = new Image();
      image.onload = () => {
        res(true);
      };
      image.onerror = () => {
        res(true);
      };
      image.src = "http://" + ip;
      setTimeout(() => {
        res(false);
      }, timeout);
    });
  };

  handleChangePage = (event, newPage) => {
    this.setState({ page: newPage });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: +event.target.value });
  };

  componentDidMount() {
    axios.get("/devices").then(res => {
      this.setState(state => {
        return { ...state, devices: res.data, isLoading: false };
      });
    });
  }
  componentDidUpdate() {
    const devices = this.state.devices.map(device => {
      return this.pinger(device.ip, 3000);
    });
    Promise.all(devices).then(data => {
      const pingedDevices = this.state.devices.map((device, index) => {
        return { ...device, status: data[index] };
      });
      this.timeoutId = setTimeout(() => {
        this.setState(state => {
          return { ...state, devices: pingedDevices };
        });
      }, 3000);
    });
  }
  componentWillUnmount() {
    clearTimeout(this.timeoutId);
  }

  render() {
    const { devices, isLoading, page, rowsPerPage } = this.state;
    const { classes } = this.props;
    if (isLoading) {
      return <ReactLoading type="spin" color="red" />;
    } else {
      return (
        <Container className={classes.container}>
          <Paper className={classes.root}>
            <div className={classes.tableWrapper}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    {this.columns.map(column => (
                      <TableCell
                        key={column.id}
                        align={column.align}
                        style={{ minWidth: column.minWidth }}
                      >
                        {column.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {devices
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map(device => {
                      return (
                        <TableRow
                          hover
                          role="checkbox"
                          tabIndex={-1}
                          key={device.id}
                        >
                          {this.columns.map(column => {
                            let value = device[column.id];
                            value =
                              typeof value === "boolean"
                                ? value === false
                                  ? "Error"
                                  : "OK"
                                : value;
                            return (
                              <TableCell key={column.id} align={column.align}>
                                {column.format && typeof value === "number"
                                  ? column.format(value)
                                  : value}
                              </TableCell>
                            );
                          })}
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            </div>
            <TablePagination
              rowsPerPageOptions={[10, 25, 100]}
              component="div"
              count={devices.length}
              rowsPerPage={rowsPerPage}
              page={page}
              backIconButtonProps={{
                "aria-label": "previous page"
              }}
              nextIconButtonProps={{
                "aria-label": "next page"
              }}
              onChangePage={this.handleChangePage}
              onChangeRowsPerPage={this.handleChangeRowsPerPage}
            />
          </Paper>
        </Container>
      );
    }
  }
}

export default withStyles(styles)(DeviceTable);
