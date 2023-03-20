import { createContext, FC, useEffect } from 'react'

import { useFieldArray, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'

import Form from './components/Form'
import dayjs from 'dayjs'
import { useNavigate } from 'react-router-dom'
import { useQueryParams } from '../../hooks/useQueryParams'
import { useCustomSearchParams } from '../../hooks/useCustomSearchParams'
import { queryObjSerialize } from '../../utils'
import { City, FormValues } from '../../interface'

interface Props {}

export const homeContext = createContext({})

const validationSchema = Yup.object().shape({
  cityOfOrigin: Yup.object()
    .shape({
      name: Yup.string().required('You must choose the city of origin'),
      long: Yup.number(),
      lat: Yup.number(),
    })
    .required('You must choose the city of origin')
    .test(
      'You must choose the city of origin',
      'You must choose the city of origin',
      (value) => {
        return !!value.name
      }
    ),
  passengers: Yup.number()
    .typeError('Passengers must be a number')
    .test('test-passengers', 'Select passengers', (value = 0) => {
      return value > 0
    })
    .required('Select passengers'),
  date: Yup.date().required('Select date'),
  citiesOfDestination: Yup.array().of(
    Yup.object()
      .shape({
        name: Yup.string().required('You must choose the city of origin'),
        long: Yup.number(),
        lat: Yup.number(),
      })
      .required('You must choose the city of origin')
  ),
})

const Home: FC<Props> = (props) => {
  const {
    control,
    formState: { errors, isValid },
    watch,
    setValue,
    setError,
    handleSubmit,
    trigger,
  } = useForm<FormValues>({
    mode: 'all',
    defaultValues: {
      cityOfOrigin: { name: '' },
      passengers: 0,
      date: null,
      citiesOfDestination: [{ name: '' }],
    },
    resolver: yupResolver(validationSchema, {
      stripUnknown: true,
      abortEarly: false,
    }),
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'citiesOfDestination',
  })

  const navigate = useNavigate()

  const watchPassengers = watch('passengers')
  const watchCityOfOrigin = watch('cityOfOrigin')
  const watchCitiesOfDestination = watch('citiesOfDestination')

  const { searchAsObject }: any = useCustomSearchParams()
  const { queryParams, setQueryParams } = useQueryParams()

  useEffect(() => {
    initData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const initData = () => {
    const { date, cityOfOrigin, citiesOfDestination, passengers }: any =
      searchAsObject
    const initDate: any = dayjs(date)

    setValue('date', initDate)
    setValue('passengers', Number(passengers) || 0)
    setValue('cityOfOrigin', {
      name: cityOfOrigin || '',
    })

    if (citiesOfDestination)
      setValue(
        'citiesOfDestination',
        citiesOfDestination.split(',').map((item: string) => ({ name: item }))
      )
  }

  const onAddDestionation = () => {
    append({
      name: '',
    })
  }

  const onRemoveDestination = (index: number) => {
    remove(index)
    handleSetQueryParams(
      'citiesOfDestination',
      watchCitiesOfDestination
        ?.map((item) => item.name)
        .filter((item, idx) => idx !== index)
    )
  }

  const isValidNumber = (value: string | number) => Number.isInteger(value)

  const handleSetQueryParams = (key: string, value: any) => {
    setQueryParams({
      ...searchAsObject,
      ...queryParams,
      [key]: value,
    })
  }

  const onDecreasePassengers = () => {
    if (!watchPassengers) return
    if (!isValidNumber(Number(watchPassengers))) return

    setValue('passengers', Number(watchPassengers) - 1)
    handleSetQueryParams('passengers', Number(watchPassengers) - 1)
    trigger('passengers')
  }

  const onIncreasePassengers = () => {
    if (!isValidNumber(Number(watchPassengers))) return

    setValue('passengers', Number(watchPassengers) + 1)
    handleSetQueryParams('passengers', Number(watchPassengers) + 1)
    trigger('passengers')
  }

  const onPassengersChange = (e: React.SyntheticEvent) => {
    const value = (e.target as HTMLInputElement).value

    if (!isValidNumber(Number(value))) return

    handleSetQueryParams('passengers', Number(value))
    trigger('passengers')
  }

  const onCityOriginChange = (data: City) => {
    if (data) handleSetQueryParams('cityOfOrigin', data.name)
    trigger('cityOfOrigin')
  }

  const onCitiesDestinationChange = (data: City) => {
    if (data)
      handleSetQueryParams(
        'citiesOfDestination',
        watchCitiesOfDestination?.map((item) => item.name)
      )
    trigger('citiesOfDestination')
  }

  const onDateChange = (value: string) => {
    const date = dayjs(value).format('MM/DD/YYYY')
    handleSetQueryParams('date', date)
    trigger('date')
  }

  const onSubmit = () => {
    navigate(`/result?${queryObjSerialize(searchAsObject)}`)
  }

  return (
    <homeContext.Provider
      value={{
        onPassengersChange,
        onCityOriginChange,
        onDateChange,
        watchCityOfOrigin,
        onCitiesDestinationChange,
        watchCitiesOfDestination,
        setError,
      }}
    >
      <Form
        {...{
          control,
          errors,
          fields,
          onSubmit: handleSubmit(onSubmit),
          onAddDestionation,
          onRemoveDestination,
          isValid,
          onDecreasePassengers,
          onIncreasePassengers,
        }}
      />
    </homeContext.Provider>
  )
}

export default Home
