import React, { FC } from 'react'
import { Box, IconButton, TextField, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import { Controller } from 'react-hook-form'

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  borderRadius: 4,
  backgroundColor: theme.palette.primary.main,
  padding: 4,
  '& svg': {
    width: '0.5em',
    height: '0.5em',
  },
  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
  },
})) as typeof IconButton

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-input': {
    padding: 0,
    textAlign: 'center',
  },
  '& .MuiOutlinedInput-root': {
    padding: '6px 10px',
  },
  '& .MuiOutlinedInput-notchedOutline': {
    borderColor: theme.palette.secondary.light,
  },
})) as typeof TextField

interface Props {
  label: string
  control: any
  name: string
  helperText: string
  error: boolean
  onIncrease: any
  onDecrease: any
  onChange: any
}

export const NumberInput: FC<Props> = React.forwardRef(
  (
    {
      label,
      control,
      name,
      helperText,
      error,
      onIncrease,
      onDecrease,
      onChange,
    },
    ref
  ) => {
    return (
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <>
            <Typography sx={{ mb: 0.5 }}>{label}</Typography>
            <StyledTextField
              helperText={helperText}
              error={error}
              InputProps={{
                startAdornment: (
                  <StyledIconButton onClick={onDecrease}>
                    <RemoveIcon color="secondary" />
                  </StyledIconButton>
                ),
                endAdornment: (
                  <StyledIconButton onClick={onIncrease}>
                    <AddIcon color="secondary" />
                  </StyledIconButton>
                ),
              }}
              {...field}
              onChange={(e) => {
                field.onChange(e)
                onChange && onChange(e)
              }}
            />
          </>
        )}
      />
    )
  }
)
