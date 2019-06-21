import React from 'react'

const Filter = ({filter, handleChange})=> {

    return (
        <div>
            <label htmlFor="coutries">Find countries:</label>
            <input
                id="countries"
                value={filter}
                onChange={handleChange}/>
        </div>
    )
}
export default Filter