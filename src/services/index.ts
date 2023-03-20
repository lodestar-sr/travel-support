import { City } from '../interface'
import { cities } from './fakeData'

const preventedKeyword = 'fail'

export const getCities = (keyword: string = '') => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (keyword.toLowerCase() === preventedKeyword) {
        reject(new Error('Oops! Failed to search with this keyword.'))
      } else {
        const result = cities.filter((city) => {
          return city.name.match(keyword)
        })
        resolve(result)
      }
    }, 1000)
  })
}

export const calcDistances = (
  cityOfOrigin: string,
  cityOfDestination: string[]
) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        let result: any = {}

        result[`${cityOfOrigin}-${cityOfDestination[0]}`] = calcDistance(
          cityOfOrigin,
          cityOfDestination[0]
        )

        cityOfDestination.forEach((city: string, index) => {
          if (index < cityOfDestination.length - 1)
            result[`${city}-${cityOfDestination[index + 1]}`] = calcDistance(
              city,
              cityOfDestination[index + 1]
            )
        })

        result.totalDistance = Object.keys(result).reduce(
          (prev: number, current: string) => {
            return prev + result[current]
          },
          0
        )

        resolve(result)
      } catch (error) {
        reject(new Error('Error'))
      }
    }, 1000)
  })
}

const toRadian = (value: number) => (value * Math.PI) / 180

const R = 6371

export const calcDistance = (
  cityOfOrigin: string,
  cityOfDestination: string
) => {
  const from: City = cities.find((city) => city.name === cityOfOrigin) as City
  const to: City = cities.find(
    (city) => city.name === cityOfDestination
  ) as City

  const dLat = toRadian((to.lat || 0) - (from.lat || 0))
  const dLong = toRadian((to.long || 0) - (from.long || 0))
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadian(from.lat || 0)) *
      Math.cos(toRadian(to.lat || 0)) *
      Math.sin(dLong / 2) *
      Math.sin(dLong / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))

  return R * c
}
