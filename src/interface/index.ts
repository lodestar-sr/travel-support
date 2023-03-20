export interface QueryParams {
  passengers?: number
  cityOfOrigin?: string
  citiesOfDestination?: string
  date?: string
}

export interface City {
  name: string
  long?: number
  lat?: number
}

export interface FormValues {
  cityOfOrigin: City
  passengers: number | string
  date: string | null
  citiesOfDestination: City[]
}
