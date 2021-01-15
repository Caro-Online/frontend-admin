import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Avatar,
  Box,
  Button,
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
import { useNavigate } from 'react-router-dom';
import Skeleton from '@material-ui/lab/Skeleton';

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

const Results = ({ className, users, isLoading, onBlock, ...rest }) => {
  const classes = useStyles();
  let navigate = useNavigate();
  const [selectedCustomerIds, setSelectedCustomerIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    console.log(newPage, limit);
    setPage(newPage);
  };
  const onClickDetail = (e, userId) => {
    console.log(`onClickDetail`, userId);
    navigate(`/users/${userId}`);
  };

  const handleBlock = (e, user) => {
    e.stopPropagation();
    onBlock(user);
  };
  const iEnd = () => {
    const index = (page + 1) * limit;
    const length = users?.length;
    if (length > index) return index;
    return length;
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
                <TableCell>State</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell>
                    <Box alignItems="center" display="flex">
                      <Skeleton variant="circle" width={40} height={40} />
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Skeleton animation="wave" />
                  </TableCell>
                  <TableCell>
                    <Skeleton animation="wave" />
                  </TableCell>
                  <TableCell>
                    <Skeleton animation="wave" />
                  </TableCell>
                  <TableCell className={classes.tableCell}>
                    <Skeleton animation="wave" />
                  </TableCell>
                  <TableCell>
                    <Skeleton animation="wave" width={60} />
                  </TableCell>
                </TableRow>
              ) : users && users.length > 0 ? (
                users.slice(page * limit, iEnd()).map((user) => (
                  <TableRow
                    hover
                    key={user._id}
                    selected={selectedCustomerIds.indexOf(user._id) !== -1}
                    onClick={(e) => onClickDetail(e, user._id)}>
                    <TableCell>
                      <Box alignItems="center" display="flex">
                        <Avatar className={classes.avatar} src={user.imageUrl}>
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
                    <TableCell>
                      <Button
                        variant="contained"
                        color={user?.isBlock ? 'primary' : 'secondary'}
                        fullWidth
                        onClick={(e) => handleBlock(e, user)}>
                        <strong>{user?.isBlock ? 'Bỏ chặn' : 'Chặn'}</strong>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} align="center">
                    <Typography
                      color="textPrimary"
                      variant="body1"
                      align="center">
                      Không tìm thấy user nào.
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={users?.length || 1}
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
  // users: PropTypes.array.isRequired,
};

export default Results;
