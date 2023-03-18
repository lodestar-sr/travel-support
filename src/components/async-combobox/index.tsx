import React, { FC } from 'react'
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'
import CircularProgress from '@mui/material/CircularProgress'
import { styled } from '@mui/material/styles'
import ClearIcon from '../../assests/icons/clear-icon.svg'
import { Typography } from '@mui/material'
import { Controller } from 'react-hook-form'
import { debounce } from 'lodash'

const StyledAutocomplete = styled(Autocomplete)(({ theme }) => ({
  '& .MuiAutocomplete-inputRoot': {
    padding: '8px 10px !important',
    borderRadius: 6,
    '& .MuiAutocomplete-input': {
      padding: 0,
      fontSize: 14,
    },
  },
  '& .MuiOutlinedInput-notchedOutline': {
    borderColor: theme.palette.secondary.light,
  },
  '& .MuiAutocomplete-popupIndicator': {
    display: 'none',
  },
  '& .MuiFormHelperText-root': {
    margin: '4px 0 0',
    fontSize: 14,
  },
})) as typeof Autocomplete

interface Props {
  label: string
  error: boolean
  helperText: string
  control: any
  name: string
  onChange?: any
  value?: any
  fetchData: any
  options: any
  setOptions: any
  onInputChange?: any
}

export const AsyncComboBox: FC<Props> = React.forwardRef(
  (
    {
      label,
      error,
      helperText,
      control,
      name,
      onChange,
      value,
      fetchData,
      options,
      setOptions,
      onInputChange,
    },
    ref
  ) => {
    const [open, setOpen] = React.useState(false)
    const [loading, setLoading] = React.useState(false)

    React.useEffect(() => {
      fetchData()
    }, [])

    React.useEffect(() => {
      if (error) setOpen(false)
    }, [error])

    const debounceSearch = debounce(async (keyword) => {
      setOptions([])
      setLoading(true)
      await fetchData(keyword)
      setLoading(false)
    }, 500)

    return (
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <>
            <Typography sx={{ mb: 0.5 }}>{label}</Typography>
            <StyledAutocomplete
              value={value}
              open={open}
              onOpen={() => {
                setOpen(true)
              }}
              onClose={() => {
                setOpen(false)
              }}
              isOptionEqualToValue={(option, value) =>
                option.name === value.name
              }
              getOptionLabel={(option) => option.name}
              options={options}
              loading={loading}
              clearIcon={<img src={ClearIcon} alt="Clear icon" />}
              renderInput={(params) => (
                <TextField
                  {...params}
                  helperText={helperText}
                  error={error}
                  InputProps={{
                    ...params.InputProps,
                    endAdornment: (
                      <React.Fragment>
                        {loading && (
                          <CircularProgress color="inherit" size={20} />
                        )}
                        {params.InputProps.endAdornment}
                      </React.Fragment>
                    ),
                  }}
                />
              )}
              onChange={(_, data) => {
                field.onChange(data)
                onChange && onChange(data)
              }}
              onInputChange={(e, value) => {
                debounceSearch(value)
                onInputChange && onInputChange(value)
              }}
            />
          </>
        )}
      />
    )
  }
)
