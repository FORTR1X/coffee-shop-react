import { useEffect, useState } from "react"
import { CartType } from "../interfaces/interfaces"

const useCart = (initialValue: Array<CartType>, key: string) => {
  const getValue = (): Array<CartType> => {
    const storage: string | null = localStorage.getItem(key)

    if (storage) {
      return JSON.parse(storage)
    }

    return initialValue
  }

  const [value, setValue] = useState<Array<CartType>>(getValue)

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value))
  }, [value])

  return [value, setValue]
}

export {useCart}