import React, { FC } from 'react'
import { Box, Button, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'

interface Props {}

const Error: FC<Props> = () => {
  const navigate = useNavigate()

  return (
    <Box
      sx={{
        backgroundColor: 'white',
        padding: '62px 86px 38px',
        width: '38%',
        borderRadius: '16px',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Typography
        align="center"
        sx={{ color: 'primary.dark', padding: '100px 0' }}
      >
        Oops! Something went wrong!
      </Typography>
      <Button
        variant="contained"
        sx={{
          boxShadow: 'none',
          textTransform: 'capitalize',
          backgroundColor: 'secondary.dark',
          color: 'secondary.main',
          alignSelf: 'center',
          '&:hover': {
            backgroundColor: 'secondary.dark',
          },
          marginTop: '36px',
        }}
        onClick={() => navigate('/')}
      >
        Back
      </Button>
    </Box>
  )
}

export default Error
