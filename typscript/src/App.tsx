import React, {useState, useEffect} from 'react';
import './App.css';
import { ItemDetail } from './components/ItemList';
import { Listing } from './components/Listing';

// const Image_batsu = process.env.PUBLIC_URL + '/batsu.jpg';
const server = process.env.API_URL || 'http://127.0.0.1:9000';

interface ItemDetail {
  id: number;
  name: string;
  category: string;
  image_filename: string;
  description: string;

};

function App() {
  // reload ItemList after Listing complete
  const [reload, setReload] = useState(true);
  // const [barcodeNumber, setBarcodeNumber] = useState(0);
  const [detail, setDetail] = useState<ItemDetail>({id: 1, name: "", category: "", image_filename: "", description: ""});

  const onValueChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      setDetail({
          ...detail, [event.target.name]: event.target.value,
      })
  }

  const [barcode, setBarcode] = useState<string>();

  const fetchDetail = () => {
    fetch(server.concat(`/items`),
        {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            console.log('GET success', data);
            setDetail(data.items[1]);
        })
        .catch(error => {
            console.error('GET error:', error)
        })
    }

  return (
    <div className="App">
      <header className="Title">
        <p className='explanation-node'>
          <b>Mercari</b>
        </p>
      </header>

      <div className='main'>
        <p className='explanation-node0'>
            <b>商品の出品</b>
          </p>
        <div className="gray-theme">
        {/* <div>
          <Listing onListingCompleted={() => setReload(true)} />
        </div> */}
          <div className="wrapper">
            <p className="explanation-node">バーコードの入力</p>
            <input className="barcode" name="barcode" type="text" onChange={(e) => setBarcode(e.target.value)}/>
            <button className="enter" onClick={fetchDetail}>ENTER</button>
          </div>
          
          <div>
            {/* <ItemList reload={reload} onLoadCompleted={() => setReload(false)} barcode_number={barcode_number} /> */}
            <ItemDetail reload={reload} onLoadCompleted={() => setReload(false)} item={detail} onValueChange={onValueChange}/>
          </div>    
        </div>

      </div>
    </div>
  );
}

export default App;
