import React, { useState } from 'react'
import DetailedDisplay from './DetailedDisplay'

const Display = ({ filteredCountries, singleCountryInfo, setSingleCountryInfo }) => {


    if (filteredCountries.length > 10) {
        return <span>Too Many Matches</span>
    }


    if (filteredCountries.length > 1) {
        return (
            <div>
                {!singleCountryInfo && filteredCountries.map(country => {
                    return (
                        <div key={country.name.common}>
                            <p>{country.name.common}</p>
                            <button onClick={() => setSingleCountryInfo(country)}>show</button>
                        </div>
                    )
                })}
                {singleCountryInfo && <DetailedDisplay singleCountryInfo={singleCountryInfo} />}
            </div>
        )
    }


    if (filteredCountries.length === 1) {
        return (
            <>
                <DetailedDisplay singleCountryInfo={filteredCountries[0]} />
            </>
        )
    }


}

export default Display