import { Link } from 'react-router-dom';
import { ReactComponent as LogoDark } from 'src/assets/images/logos/dark-logo.svg';
import { Typography, styled } from '@mui/material';

const LinkStyled = styled(Link)(() => ({
  height: '70px',
  width: '180px',
  overflow: 'hidden',
  display: 'block',
}));

const Logo = () => {
  return (
    <>
      <Typography align="center" fontSize={22} pt={3}>
        LMS
      </Typography>
      <Typography align="center" fontSize={14} pb={3}>
        Learning Management System
      </Typography>
    </>
    // <LinkStyled to="/">
    //   {/* <LogoDark height={70} /> */}
    // </LinkStyled>
  );
};

export default Logo;
