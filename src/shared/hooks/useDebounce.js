import { useEffect,useState } from "react"

// https://dev.to/gabe_ragland/debouncing-with-react-hooks-jci
const useDebounce = (value, delay) => {
  // State and setters for debounced value
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(
    () => {
      // Set debouncedValue to value (passed in) after the specified delay
      const handler = setTimeout(() => {
        setDebouncedValue(value)
      }, delay)

      //Cleanup
      // ...Effects run for every render and not just once.
      //...This is why React also cleans up effects from the previous render before running the effects next time.
      // Sample context: if the value passed in changes, the previous timeout is cleared, then set again
      return () => {
        clearTimeout(handler)
      }
    },
    // Only re-call effect if value changes
    [value, delay]
  )

  return debouncedValue
}

export default useDebounce
