import { FC, useContext, useState } from 'react'

import Timeline from '@mui/lab/Timeline'
import TimelineItem from '@mui/lab/TimelineItem'
import TimelineSeparator from '@mui/lab/TimelineSeparator'
import TimelineConnector from '@mui/lab/TimelineConnector'
import TimelineContent from '@mui/lab/TimelineContent'
import TimelineDot from '@mui/lab/TimelineDot'
import HighlightOffIcon from '@mui/icons-material/HighlightOff'
import Location from '../../../assests/icons/destination.svg'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import { getCities } from '../../../services'

import { Grid, Box, Button, IconButton, Typography } from '@mui/material'

import { AsyncComboBox, DatePicker, NumberInput } from '../../../components'
import { homeContext } from '..'

interface Props {
  control: any
  errors: any
  fields: any
  onRemoveDestination: any
  onAddDestionation: any
  onSubmit: () => void
  isValid: boolean
  onDecreasePassengers: any
  onIncreasePassengers: any
}

const Form: FC<Props> = ({
  control,
  errors,
  fields,
  onRemoveDestination,
  onAddDestionation,
  onSubmit,
  isValid,
  onDecreasePassengers,
  onIncreasePassengers,
}) => {
  const {
    onDateChange,
    onPassengersChange,
    onCityOriginChange,
    watchCityOfOrigin,
    onCitiesDestinationChange,
    watchCitiesOfDestination,
    setError,
  }: any = useContext(homeContext)

  const [options, setOptions] = useState([])
  const [destinationFieldIndexs, setDestinationFieldIndexs] = useState<any>([])

  const fetchCities = async (keyword: string = '') => {
    try {
      const res: any = await getCities(keyword)
      setOptions(res)
    } catch (error) {
      destinationFieldIndexs.forEach((item: number) => {
        setError(`citiesOfDestination[${item}]`, {
          type: 'custom',
          message: String(error),
        })
      })
    }
  }

  const onInputDestinationChange = (index: number) => {
    if (destinationFieldIndexs.includes(index)) return

    setDestinationFieldIndexs([...destinationFieldIndexs, index])
  }

  return (
    <Box
      component="form"
      sx={{
        backgroundColor: 'white',
        padding: '62px 86px 38px',
        width: '38%',
        borderRadius: '16px',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Timeline position="right" sx={{ margin: '-10px 0' }}>
        <TimelineItem
          sx={{
            position: 'relative',
            ':before': {
              display: 'none',
            },
            padding: '10px 0',
          }}
        >
          <TimelineSeparator>
            <TimelineDot
              variant="outlined"
              sx={{
                borderColor: 'secondary.dark',
                borderWidth: '1px',
                padding: '6px',
              }}
            />
            <TimelineConnector
              sx={{
                backgroundColor: 'secondary.dark',
                width: 0,
                transform: 'rotate(90deg)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                position: 'relative',
                '&:before': {
                  content: '"........."',
                  fontSize: '26px',
                  position: 'absolute',
                  bottom: '50%',
                  transform: 'translateY(25%)',
                  marginLeft: '16px',
                  color: 'secondary.dark',
                },
              }}
            />
          </TimelineSeparator>
          <TimelineContent sx={{ position: 'relative', paddingLeft: '48px' }}>
            <Box>
              <Grid
                container
                justifyContent="space-between"
                alignItems="center"
              >
                <Grid item xs={7} md={7}>
                  <AsyncComboBox
                    control={control}
                    name="cityOfOrigin"
                    label="City of origin"
                    error={!!errors.cityOfOrigin}
                    helperText={errors.cityOfOrigin?.message || ''}
                    onChange={onCityOriginChange}
                    value={watchCityOfOrigin}
                    options={options}
                    setOptions={setOptions}
                    fetchData={fetchCities}
                  />
                </Grid>
                <Grid item xs={4} md={4}>
                  <Grid container sx={{ ml: 5 }}>
                    <Grid item md={7}>
                      <NumberInput
                        control={control}
                        name="passengers"
                        label="Passengers"
                        error={!!errors.passengers}
                        helperText=""
                        onDecrease={onDecreasePassengers}
                        onIncrease={onIncreasePassengers}
                        onChange={onPassengersChange}
                      />
                    </Grid>
                    <Typography color="error">
                      {errors.passengers?.message || ''}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Box>
          </TimelineContent>
        </TimelineItem>
        {fields.map((field: any, index: any) => (
          <TimelineItem
            key={field.id}
            sx={{
              position: 'relative',
              ':before': {
                display: 'none',
              },
              padding: '10px 0',
            }}
          >
            <TimelineSeparator>
              {index === fields.length - 1 ? (
                <TimelineDot
                  sx={{
                    border: 0,
                    background: 'transparent',
                    margin: 0,
                    boxShadow: 'none',
                    padding: 0,
                    paddingTop: 1,
                  }}
                >
                  <img src={Location} alt="Destination" />
                </TimelineDot>
              ) : (
                <TimelineDot
                  variant="outlined"
                  sx={{
                    borderColor: 'secondary.dark',
                    borderWidth: '1px',
                    padding: '6px',
                  }}
                />
              )}

              {index !== fields.length - 1 && (
                <TimelineConnector
                  sx={{
                    backgroundColor: 'secondary.dark',
                    width: 0,
                    transform: 'rotate(90deg)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    position: 'relative',
                    color: 'secondary.dark',
                    '&:before': {
                      content: '"........."',
                      fontSize: '26px',
                      position: 'absolute',
                      bottom: '50%',
                      transform: 'translateY(25%)',
                      marginLeft: '16px',
                    },
                  }}
                />
              )}
            </TimelineSeparator>
            <TimelineContent sx={{ position: 'relative', paddingLeft: '48px' }}>
              <Box>
                <Grid
                  container
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Grid item xs={7} md={7}>
                    <Box
                      display="flex"
                      alignItems="flex-end"
                      position="relative"
                    >
                      <Box width="100%">
                        <AsyncComboBox
                          value={watchCitiesOfDestination[index]}
                          control={control}
                          name={`citiesOfDestination.${index}`}
                          label="City of destination"
                          error={!!errors.citiesOfDestination?.[index]}
                          helperText={
                            errors.citiesOfDestination?.[index]?.message || ''
                          }
                          onChange={onCitiesDestinationChange}
                          fetchData={fetchCities}
                          options={options}
                          setOptions={setOptions}
                          onInputChange={() => onInputDestinationChange(index)}
                        />
                      </Box>
                      {index > 0 && (
                        <IconButton
                          sx={{
                            position: 'absolute',
                            padding: '0',
                            margin: '6px 0',
                            right: -36,
                          }}
                          onClick={() => onRemoveDestination(index)}
                        >
                          <HighlightOffIcon
                            fontSize="small"
                            sx={{
                              color: 'primary.dark',
                            }}
                          />
                        </IconButton>
                      )}
                    </Box>
                  </Grid>
                  {index === 0 && (
                    <Grid item xs={4} md={4}>
                      <Grid container sx={{ ml: 5 }}>
                        <Grid item xs={7}>
                          <DatePicker
                            control={control}
                            error={!!errors.date}
                            helperText={errors.date?.message || ''}
                            name="date"
                            label="Date"
                            onChange={(date: any) => onDateChange(date)}
                          />
                        </Grid>
                      </Grid>
                    </Grid>
                  )}
                </Grid>
              </Box>
            </TimelineContent>
          </TimelineItem>
        ))}
        <TimelineItem
          sx={{
            position: 'relative',
            ':before': {
              display: 'none',
            },
          }}
        >
          <TimelineSeparator>
            <TimelineDot
              sx={{
                border: 0,
                background: 'transparent',
                margin: 0,
                boxShadow: 'none',
                padding: 0,
                paddingTop: 1,
              }}
            >
              <AddCircleOutlineIcon
                fontSize="small"
                sx={{ color: 'primary.dark' }}
              />
            </TimelineDot>
          </TimelineSeparator>
          <TimelineContent sx={{ paddingLeft: '48px' }}>
            <Button
              sx={{
                textTransform: 'initial',
                color: 'primary.dark',
                padding: 0,
              }}
              color="primary"
              variant="text"
              onClick={onAddDestionation}
            >
              Add destination
            </Button>
          </TimelineContent>
        </TimelineItem>
      </Timeline>
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
        }}
        disabled={!isValid}
        onClick={onSubmit}
      >
        Submit
      </Button>
    </Box>
  )
}

export default Form
