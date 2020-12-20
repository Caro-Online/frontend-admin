import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Avatar,
  Box,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  makeStyles,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {},
  avatar: {
    marginRight: theme.spacing(2),
  },
  redDot: {
    height: theme.spacing(1),
    width: theme.spacing(1),
    backgroundColor: 'red',
    borderRadius: '50%',
  },
  greenDot: {
    height: theme.spacing(1),
    width: theme.spacing(1),
    backgroundColor: 'lightgreen',
    borderRadius: '50%',
  },
  tableCell: {},
}));

const Results = ({ className, users, ...rest }) => {
  const classes = useStyles();
  const [selectedCustomerIds, setSelectedCustomerIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <PerfectScrollbar>
        <Box minWidth={1050}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Cup</TableCell>
                <TableCell className={classes.tableCell}>Online</TableCell>
                <TableCell>Registration date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.slice(0, limit).map((user) => (
                <TableRow
                  hover
                  key={user._id}
                  selected={selectedCustomerIds.indexOf(user._id) !== -1}>
                  <TableCell>
                    <Box alignItems="center" display="flex">
                      <Avatar className={classes.avatar} src={user.avatarUrl}>
                        {user.name
                          .replace(/\s+/, ' ')
                          .split(' ')
                          .slice(0, 2)
                          .map((v) => v && v[0].toUpperCase())
                          .join('')}
                      </Avatar>
                      <Typography color="textPrimary" variant="body1">
                        {user.name}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.cup}</TableCell>
                  <TableCell className={classes.tableCell}>
                    {user.isOnline}
                    <div className={classes.redDot}></div>
                  </TableCell>
                  <TableCell>
                    {moment(user.createdAt).format('DD/MM/YYYY')}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={users.length}
        onChangePage={handlePageChange}
        onChangeRowsPerPage={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

Results.propTypes = {
  className: PropTypes.string,
  customers: PropTypes.array.isRequired,
};

export default Results;
