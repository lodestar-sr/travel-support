import React, { FC } from 'react'
import { Controller } from 'react-hook-form'

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker'
import { Typography } from '@mui/material'

import { DATE_FORMAT } from '../../contants'

interface Props {
  label: string
  error?: boolean
  helperText?: string
  control: any
  name: string
  onChange: any
}

export const DatePicker: FC<Props> = ({
  label,
  error,
  helperText,
  control,
  name,
  onChange,
}) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <>
          <Typography sx={{ mb: 0.5 }}>{label}</Typography>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <MobileDatePicker
              sx={{
                '& input': {
                  padding: '8px 0',
                  textAlign: 'center',
                },
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'secondary.light',
                },
              }}
              disablePast
              format={DATE_FORMAT}
              {...field}
              onChange={(value) => {
                field.onChange(value)
                onChange && onChange(value)
              }}
            />
          </LocalizationProvider>
        </>
      )}
    />
  )
}
