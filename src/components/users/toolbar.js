import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon,
  makeStyles,
} from '@material-ui/core';
import { Search as SearchIcon } from 'react-feather';

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(2),
  },
  importButton: {
    marginRight: theme.spacing(1),
  },
  exportButton: {
    marginRight: theme.spacing(1),
  },
  content: {
    padding: theme.spacing(2),
    '&:last-child': {
      paddingBottom: theme.spacing(2),
    },
  },
}));

const Toolbar = ({ className, onSearch, ...rest }) => {
  const classes = useStyles();

  const handleSearch = (keyword) => {
    onSearch(keyword);
  };
  return (
    <div className={clsx(classes.root, className)} {...rest}>
      {/* <Box display="flex" justifyContent="flex-end">
        <Button color="primary" variant="contained">
          Add user
        </Button>
      </Box> */}
      <Box mt={3}>
        <Card>
          <CardContent className={classes.content}>
            <Box maxWidth={500}>
              <TextField
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SvgIcon fontSize="small" color="action">
                        <SearchIcon />
                      </SvgIcon>
                    </InputAdornment>
                  ),
                }}
                placeholder="Search customer"
                variant="outlined"
                onChange={(e) => handleSearch(e.target.value)}
              />
            </Box>
          </CardContent>
        </Card>
      </Box>
    </div>
  );
};

Toolbar.propTypes = {
  className: PropTypes.string,
};

export default Toolbar;
