import { useState, useEffect } from "react"

// `https://api.frankfurter.app/latest?amount=100&from=EUR&to=USD`

export default function App() {
  const [amount, setAmount] = useState(1)
  const [fromCurrency, setFromCurrency] = useState("EUR")
  const [toCurrency, setToCurrency] = useState("USD")
  const [rate, setRate] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    async function getApi() {
      try {
        setIsLoading(true)
        const response = await fetch(
          `https://api.frankfurter.app/latest?amount=${amount}&from=${fromCurrency}&to=${toCurrency}`
        )

        if (!response.ok)
          throw new Error("Something went wrong, please try again!")

        const data = await response.json()

        console.log(data)

        if (data.rates && data.rates[toCurrency.trim()]) {
          setRate(data.rates[toCurrency.trim()])
        } else {
          setRate("")
        }

        setIsLoading(false)
      } catch (err) {
        console.error(err.message)
      }
    }

    if (fromCurrency === toCurrency) return setRate(amount)
    getApi()
  }, [amount, fromCurrency, toCurrency])

  return (
    <div>
      <input
        type="text"
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
      />
      <select
        value={fromCurrency}
        onChange={(e) => setFromCurrency(e.target.value)}
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <select
        value={toCurrency}
        onChange={(e) => setToCurrency(e.target.value)}
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      {!isLoading ? (
        <p>
          {rate} {toCurrency}
        </p>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  )
}
