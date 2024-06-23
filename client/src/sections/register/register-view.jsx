import { useState } from 'react';

import Box from '@mui/material/Box';
// import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
// import Button from '@mui/material/Button';
// import Divider from '@mui/material/Divider';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import LoadingButton from '@mui/lab/LoadingButton';
import { alpha, useTheme } from '@mui/material/styles';
import InputAdornment from '@mui/material/InputAdornment';

import { useRouter } from 'src/routes/hooks';

import { bgGradient } from 'src/theme/css';

import Logo from 'src/components/logo';
import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

export default function RegisterView() {
  const theme = useTheme();

  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState('');
  const [fullname, setFullname] = useState('');
  const [userid, setUserid] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const [loading, setLoading] = useState(false);

  const handleFullnameChange = (e) => setFullname(e.target.value);
  const handleUseridChange = (e) => setUserid(e.target.value);
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handleRoleChange = (e) => setRole(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // setLoading(true);

    try {
      const response = await fetch('http://localhost:8000/api/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: fullname,
          username: userid,
          email,
          password,
          role,
        }),
      });

      if (!response.ok) {
        throw new Error('Registration failed');
      }

      const data = await response.json();
      localStorage.setItem('token', data.token);
      router.push('/'); // Redirect to dashboard after successful registration
    } catch (error) {
      console.error('Error registering user:', error);
      // Handle error (e.g., display error message)
    }

    // setLoading(false);
  };

  const renderForm = (
    <>
      <Stack spacing={3}>
        <TextField name='fullname' label="Full Name" value={fullname} onChange={handleFullnameChange}/>
        <TextField name="userid" label="Username" value={userid} onChange={handleUseridChange}/>
        <TextField name="email" label="Email address" value={email} onChange={handleEmailChange} />

        <Select
          value={role}
          onChange={handleRoleChange}
          displayEmpty
          inputProps={{ 'aria-label': 'Role' }}
        >
          <MenuItem value="" disabled>
            Role
          </MenuItem>
          <MenuItem value="student" >Student</MenuItem>
          <MenuItem value="alumni">Alumni</MenuItem>
          <MenuItem value="volunteer">Volunteer</MenuItem>
          <MenuItem value="trustee">Trustee</MenuItem>
          <MenuItem value="NGO">NGO</MenuItem>
        </Select>

        <TextField
          name="password"
          label="Password"
          value={password}
          onChange={handlePasswordChange}
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        color="inherit"
        onClick={handleSubmit}
        style={{ marginTop: "25px" }}
      >
        Sign Up
      </LoadingButton>
    </>
  );

  return (
    <Box
      sx={{
        ...bgGradient({
          color: alpha(theme.palette.background.default, 0.9),
          imgUrl: '/assets/background/overlay_4.jpg',
        }),
        height: 1,
      }}
    >
      <Logo
        sx={{
          position: 'fixed',
          top: { xs: 16, md: 24 },
          left: { xs: 16, md: 24 },
        }}
      />

      <Stack alignItems="center" justifyContent="center" sx={{ height: 1 }}>
        <Card
          sx={{
            p: 5,
            width: 1,
            maxWidth: 420,
          }}
        >
          <Typography variant="h4">SIGN UP</Typography>

          <Typography variant="body2" sx={{ mt: 2, mb: 5 }}>
            Enter Your details Correctly
          </Typography>

          {renderForm}
        </Card>
      </Stack>
    </Box>
  );
}
