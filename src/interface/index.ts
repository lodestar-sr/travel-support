export interface QueryParams {
  passengers?: number
  cityOfOrigin?: string
  citiesOfDestination?: string
  date?: string
}

export interface City {
  name: string
  long: number
  lat: number
}
