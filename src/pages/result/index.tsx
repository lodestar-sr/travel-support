import { FC, useEffect, useState } from 'react'
import { Box, Typography, Button } from '@mui/material'

import Timeline from '@mui/lab/Timeline'
import TimelineItem from '@mui/lab/TimelineItem'
import TimelineSeparator from '@mui/lab/TimelineSeparator'
import TimelineConnector from '@mui/lab/TimelineConnector'
import TimelineContent from '@mui/lab/TimelineContent'
import TimelineDot from '@mui/lab/TimelineDot'
import { useCustomSearchParams } from '../../hooks/useCustomSearchParams'
import dayjs from 'dayjs'
import { calcDistances } from '../../services'
import { useNavigate } from 'react-router-dom'
import Location from '../../assests/icons/destination.svg'

interface Props {}

const Result: FC<Props> = () => {
  const { searchAsObject } = useCustomSearchParams()
  const [result, setResult] = useState<any>({})
  const navigate = useNavigate()

  const citiesOfDestionation =
    searchAsObject.citiesOfDestination?.split(',') || []

  useEffect(() => {
    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const fetchData = async () => {
    try {
      const res: any = await calcDistances(
        searchAsObject.cityOfOrigin || '',
        citiesOfDestionation
      )

      setResult(res)
    } catch (error) {
      navigate('/error')
    }
  }

  const distanceBoxStyle = {
    padding: '4px 10px',
    border: '1px solid',
    borderColor: 'primary.dark',
    position: 'absolute',
    top: '50%',
    transform: 'translate(40%, 0)',
    borderRadius: '4px',
    minWidth: '10%',
    minHeight: '20%',
    color: 'primary.dark',
    textAlign: 'center',
    left: {
      md: '20%',
      xl: '25%',
      sm: '25%',
      xs: 0,
    },
  }

  const connectorTimelineStyle = {
    backgroundColor: 'secondary.dark',
    width: 0,
    transform: 'rotate(90deg)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    '&:before': {
      content: '"......."',
      fontSize: '26px',
      position: 'absolute',
      bottom: '50%',
      transform: 'translateY(25%)',
      color: 'secondary.dark',
    },
  }

  return (
    <Box
      sx={{
        backgroundColor: 'white',
        padding: {
          md: '62px 86px 38px',
          xs: '21px 14px',
        },
        width: {
          md: '38%',
          xs: '100%',
        },
        borderRadius: '16px',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Timeline>
        <TimelineItem>
          <TimelineSeparator>
            <TimelineDot
              variant="outlined"
              sx={{
                borderColor: 'secondary.dark',
                borderWidth: '1px',
                padding: '6px',
              }}
            />
            <TimelineConnector sx={connectorTimelineStyle} />
          </TimelineSeparator>
          <TimelineContent>
            <Typography>{searchAsObject?.cityOfOrigin}</Typography>
            <Box sx={distanceBoxStyle}>
              {result[
                `${searchAsObject?.cityOfOrigin}-${citiesOfDestionation[0]}`
              ]?.toFixed(2) || 0}{' '}
              km
            </Box>
          </TimelineContent>
        </TimelineItem>
        {citiesOfDestionation.map((city: any, index: number) => (
          <TimelineItem>
            <TimelineSeparator>
              {index === citiesOfDestionation.length - 1 ? (
                <TimelineDot
                  sx={{
                    border: 0,
                    background: 'transparent',
                    margin: 0,
                    boxShadow: 'none',
                    padding: 0,
                    paddingTop: 1.5,
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

              {index !== citiesOfDestionation.length - 1 && (
                <TimelineConnector sx={connectorTimelineStyle} />
              )}
            </TimelineSeparator>
            <TimelineContent>
              {city}
              {index !== citiesOfDestionation.length - 1 && (
                <Box sx={distanceBoxStyle}>
                  {result[
                    `${citiesOfDestionation[index]}-${
                      citiesOfDestionation[index + 1]
                    }`
                  ]?.toFixed(2) || 0}{' '}
                  km
                </Box>
              )}
            </TimelineContent>
          </TimelineItem>
        ))}
      </Timeline>
      <Box display="flex" flexDirection="column" alignItems="center">
        <Typography sx={{ color: 'primary.dark', fontWeight: 700 }}>
          {result?.totalDistance?.toFixed(2) + ' km'}
          <Typography component="span" sx={{ color: 'secondary.dark' }}>
            {' is total distance'}
          </Typography>
        </Typography>
        <Typography
          sx={{ color: 'primary.dark', fontWeight: 700, padding: '8px 0' }}
        >
          {searchAsObject?.passengers}
          <Typography component="span" sx={{ color: 'secondary.dark' }}>
            {' passengers'}
          </Typography>
        </Typography>
        <Typography sx={{ color: 'primary.dark', fontWeight: 700 }}>
          {dayjs(searchAsObject?.date).format('MMM DD, YYYY')}
        </Typography>
      </Box>
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
          width: {
            md: 'unset',
            xs: '100%',
          },
        }}
        onClick={() => navigate(-1)}
      >
        Back
      </Button>
    </Box>
  )
}

export default Result
