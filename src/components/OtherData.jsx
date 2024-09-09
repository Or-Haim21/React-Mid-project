import {useEffect, useState} from 'react'

const OtherData = ({user,callback}) => {

  const [street, setStreet] = useState(user.street || '');
  const [city, setCity] = useState(user.city || '');
  const [zipcode, setZipcode] = useState(user.zipcode || '');

  //Update the other data changed in user component.
  useEffect (() => {
    callback({ street, city, zipcode })
  },[street,city,zipcode])


  return (
    <div className='other-data'>
        <label className='label-text'>Street: </label>
        <input type="text" defaultValue={street} onChange={e => setStreet(e.target.value)}/><br/>

        <label className='label-text'>City: </label> 
        <input type="text" defaultValue={city} onChange={e => setCity(e.target.value)}/><br/>

        <label className='label-text'>Zip Code: </label>
        <input type="text" defaultValue={zipcode} onChange={e => setZipcode(e.target.value)}/><br/>
    </div>
  )
}

export default OtherData