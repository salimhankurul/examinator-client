import PropTypes from 'prop-types';
import NextLink from 'next/link';
import { Box, Typography, Unstable_Grid2 as Grid } from '@mui/material';
import { Logo } from 'src/components/logo';

// TODO: Change subtitle text

export const Layout = (props) => {
  const { children } = props;

  return (
    <Box
      component="main"
      xs={12}
      sx={{
        display: 'flex',
        alignContent: 'center',
        alignItems: 'center',
      }}
    >
      <Grid
        container
        xs={12}
      >
        <Grid
          xs={12}
          sx={{
            backgroundColor: 'background.paper',
            display: 'flex',
            flexDirection: 'column',
            position: 'relative'
          }}
        >
          <Box
            component="header"
            sx={{
              left: 0,
              p: 3,
              position: 'fixed',
              top: 0,
              width: '100%'
            }}
          >
            <Box
              component={NextLink}
              href="/"
              sx={{
                display: 'inline-flex',
                height: 32,
                width: 32
              }}
            >
              <Logo />
            </Box>
          </Box>
          {children}
        </Grid>
      </Grid>
    </Box>
  );
};

Layout.prototypes = {
  children: PropTypes.node
};