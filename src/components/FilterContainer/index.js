import { useEffect, useState } from 'react';
import './index.css';
//https://cdn.furrl.in/vibes/VibeCard_HomeHunts.jpg

const FilterContainer = () => {
  const [info, setInfo] = useState([]);
  const url = 'https://api.furrl.in/api/v2/listing/getListingFilters';

  const getData = async () => {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify({ id: "#HomeHunts", entity: "vibe" })
    }
    const response = await fetch(url, options);
    if (response.ok) {
      const data = await response.json();
      const data1 = data.data.getListingFilters.easyFilters;
      //console.log(data1);
      setInfo(data1);
    }

  }
  useEffect(() => {
    getData();
  }, [])
  return (
    <div className=''>
      <div className='filter-container'>
        <div className='filter1'>
          <button className='button link active'>
          <span className=''>All</span>
          </button>

        </div>
        {info.map(each => {
          return (
            <div className='filter' key={each.uniqueId}>
              <div className='button link'>
                <span className=''>{each.name}</span>
              </div>

            </div>
          )
        })}
      </div>
    </div>
  )
}

export default FilterContainer;