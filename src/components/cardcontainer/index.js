import { useEffect, useState } from 'react';
import Cards from '../card';
//https://cdn.furrl.in/vibes/VibeCard_HomeHunts.jpg


const CardContainer = () => {
  const [info, setInfo] = useState([]);
  const url = 'https://api.furrl.in/api/v2/listing/getListingProducts';
  const getData = async () => {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify({ "input": { "page": 1, "pageSize": 10, "filters": [], "id": "#HomeHunts", "entity": "vibe" } })
    }
    const response = await fetch(url, options);
    if (response.ok) {
      const data = await response.json();
      const data1 = data.data.getListingProducts;
      //console.log(data1);
      setInfo(data1.products);
      //console.log(pr);
    }

  }

  useEffect(() => {
    getData();
  }, [])
  return (
    <div className=''>
      <Cards data={info} />
    </div>
  )
}

export default CardContainer;