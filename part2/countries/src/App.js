import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'
import Display from './components/Display'
import Filter from './components/Filter'

const App = () => {
  const [countriesData, setCountriesData] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [singleCountryInfo, setSingleCountryInfo] = useState()


  const handleChange = (event) => {
    setSearchQuery(event.target.value)  
    setSingleCountryInfo('')
  }
  
  useEffect(() => {
    axios
    .get('https://restcountries.com/v3.1/all')
    .then(response => { setCountriesData(response.data); console.log(response.data) })
  }, [])
  
  
  if (!countriesData) {
    return <span>Loading Data...</span>
  }
  
  const filteredCountries = searchQuery ? countriesData.filter(country => country.name.common.toLowerCase().includes(searchQuery.toLowerCase())) : []

  return (
    <div>
      <Filter searchQuery={searchQuery} onChange={handleChange} />
      <Display filteredCountries={filteredCountries} singleCountryInfo={singleCountryInfo} setSingleCountryInfo={setSingleCountryInfo}/>
    </div>
  )
}

export default App