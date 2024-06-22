// import { useState } from 'react';

// import Box from '@mui/material/Box';
// import Link from '@mui/material/Link';
// import Card from '@mui/material/Card';
// import Stack from '@mui/material/Stack';
// import Button from '@mui/material/Button';
// import Divider from '@mui/material/Divider';
// import TextField from '@mui/material/TextField';
// import Typography from '@mui/material/Typography';
// import IconButton from '@mui/material/IconButton';
// import LoadingButton from '@mui/lab/LoadingButton';
// import { alpha, useTheme } from '@mui/material/styles';
// import InputAdornment from '@mui/material/InputAdornment';

// import { useRouter } from 'src/routes/hooks';

// import { bgGradient } from 'src/theme/css';

// import Logo from 'src/components/logo';
// import Iconify from 'src/components/iconify';

// // ----------------------------------------------------------------------

// export default function LoginView() {
//   const theme = useTheme();

//   const router = useRouter();

//   const [showPassword, setShowPassword] = useState(false);

//   const handleClick = () => {
//     router.push('/dashboard');
//   };

//   const renderForm = (
//     <>
//       <Stack spacing={3}>
//         <TextField name="email" label="Email address" />

//         <TextField
//           name="password"
//           label="Password"
//           type={showPassword ? 'text' : 'password'}
//           InputProps={{
//             endAdornment: (
//               <InputAdornment position="end">
//                 <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
//                   <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
//                 </IconButton>
//               </InputAdornment>
//             ),
//           }}
//         />
//       </Stack>

//       <Stack direction="row" alignItems="center" justifyContent="flex-end" sx={{ my: 3 }}>
//         <Link variant="subtitle2" underline="hover">
//           Forgot password?
//         </Link>
//       </Stack>

//       <LoadingButton
//         fullWidth
//         size="large"
//         type="submit"
//         variant="contained"
//         color="inherit"
//         onClick={handleClick}
//       >
//         Login
//       </LoadingButton>
//     </>
//   );

//   return (
//     <Box
//       sx={{
//         ...bgGradient({
//           color: alpha(theme.palette.background.default, 0.9),
//           imgUrl: '/assets/background/overlay_4.jpg',
//         }),
//         height: 1,
//       }}
//     >
//       <Logo
//         sx={{
//           position: 'fixed',
//           top: { xs: 16, md: 24 },
//           left: { xs: 16, md: 24 },
//         }}
//       />

//       <Stack alignItems="center" justifyContent="center" sx={{ height: 1 }}>
//         <Card
//           sx={{
//             p: 5,
//             width: 1,
//             maxWidth: 420,
//           }}
//         >
//           <Typography variant="h4">Sign in to Minimal</Typography>

//           <Typography variant="body2" sx={{ mt: 2, mb: 5 }}>
//             Don’t have an account?
//             <Link variant="subtitle2" sx={{ ml: 0.5 }}>
//               Get started
//             </Link>
//           </Typography>

//           <Stack direction="row" spacing={2}>
//             <Button
//               fullWidth
//               size="large"
//               color="inherit"
//               variant="outlined"
//               sx={{ borderColor: alpha(theme.palette.grey[500], 0.16) }}
//             >
//               <Iconify icon="eva:google-fill" color="#DF3E30" />
//             </Button>

//             <Button
//               fullWidth
//               size="large"
//               color="inherit"
//               variant="outlined"
//               sx={{ borderColor: alpha(theme.palette.grey[500], 0.16) }}
//             >
//               <Iconify icon="eva:facebook-fill" color="#1877F2" />
//             </Button>

//             <Button
//               fullWidth
//               size="large"
//               color="inherit"
//               variant="outlined"
//               sx={{ borderColor: alpha(theme.palette.grey[500], 0.16) }}
//             >
//               <Iconify icon="eva:twitter-fill" color="#1C9CEA" />
//             </Button>
//           </Stack>

//           <Divider sx={{ my: 3 }}>
//             <Typography variant="body2" sx={{ color: 'text.secondary' }}>
//               OR
//             </Typography>
//           </Divider>

//           {renderForm}
//         </Card>
//       </Stack>
//     </Box>
//   );
// } 

import { useState } from 'react';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
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

export default function LoginView() {
  const theme = useTheme();

  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);


  const handleSubmit = async (e) => {
    e.preventDefault();
    // setLoading(true);
    console.log(JSON.stringify({ username, password }))
    try {
      const response = await fetch('http://localhost:8000/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });


      if (!response.ok) {
        throw new Error('Login failed');
      }

      const data = await response.json();
      localStorage.setItem('token', data.token);
      localStorage.setItem('role', data.role);
      router.push('/');
      // Optionally redirect to dashboard or another route
      // history.push('/dashboard');
    } catch (error) {
      console.error('Error logging in:', error);
      // Handle error (e.g., show error message)
    }

    // setLoading(false);
  };

  const handleSignUpClick = () => {
    router.push("/register");
  };

  // taking username and password form and request a endpoint login for token
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const renderForm = (
    <>
      <Stack spacing={3}>
        <TextField name="username" label="Username" value={username}
        onChange={handleUsernameChange} />

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

      <Stack direction="row" alignItems="center" justifyContent="flex-end" sx={{ my: 3 }}>
        <Link variant="subtitle2" underline="hover">
          Forgot password?
        </Link>
      </Stack>

      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        color="inherit"
        onClick={handleSubmit}
      >
        Login
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
          <Typography variant="h4">SIGN IN</Typography>

          <Typography variant="body2" sx={{ mt: 2, mb: 5 }}>
            Don’t have an account?
            <Link variant="subtitle2" sx={{ ml: 0.5 }} onClick={handleSignUpClick}>
              Get started
            </Link>
          </Typography>
          {renderForm}
        </Card>
      </Stack>
    </Box>
  );
}