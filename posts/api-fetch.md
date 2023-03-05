---
title: "API Fetch"
subtitle: "Consume API with fetch method to Table."
date: "01-03-2023"
---

# API Consume dengan metode Fetch
### Objektif:
- Melakukan consume API dan memasukan ke dalam Table
- Menggunakan metode Fetch, dan API Dummy Gunung
- [Full Code here..](https://github.com/samsleepingatparty/api-fetch)

### Steps:

**1. Import pada App.js**

```javascript
import  React, { useState, useEffect } from  'react';
import  './style.css';
```

**2. Edit pada const app, tepat dimana melakukan metode Fetch** 

```javascript
const App = () => {
  const [gunung, setGunung] = useState([]);

  useEffect(() => {
    fetch('https://indonesia-public-static-api.vercel.app/api/volcanoes')
      .then((res) => res.json())
      .then((data) => setGunung(data))
      .catch((err) => {
        if (err.name === 'AbortError') {
          console.log('fetch aborted.');
        }
      });
  }, []);
```    

**3. Edit bagian return  dengan kode html**

```javascript
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Nama</th>
            <th>Bentuk</th>
            <th>Tinggi(meter)</th>
            <th>Estimasi</th>
            <th>Geolokasi</th>
          </tr>
        </thead>
        <tbody>
          {gunung.map((guning) => (
            <tr key={guning.id}>
              <td>{guning.nama}</td>
              <td>{guning.bentuk}</td>
              <td>{guning.tinggi_meter}</td>
              <td>{guning.estimasi_letusan_terakhir}</td>
              <td>{guning.geolokasi}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default App;
```

---    

**Penjelasan**

```javascript    
<tbody>
          {gunung.map((guning) => (
            <tr key={guning.id}>
              <td>{guning.nama}</td>
              <td>{guning.bentuk}</td>
              <td>{guning.tinggi_meter}</td>
              <td>{guning.estimasi_letusan_terakhir}</td>
              <td>{guning.geolokasi}</td>
            </tr>
          ))}
</tbody>
```

* `Pada bagian ini {gunung.map_ dilakukan sesuai dengan _const [gunung, setGunung] = useState([]);`

* `Di bagian (guning) adalah variable yang dibuat sendiri.`

* `Pada bagian <tr key={guning.id}> id adalah id yang diambil dari API.`

* `nama, bentuk, tinggi_meter, estiamsi_letusan_terakhir, dan geolokasi sesuai dengan data yang ada di API`

---    

**CSS**

```css
   h1,
   p {
     font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
       Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
   }

   table {
     font-family: arial, sans-serif;
     border-collapse: collapse;
     width: 100%;
   }

   td,
   th {
     border: 1px solid #dddddd;
     text-align: left;
     padding: 8px;
   }

   tr:nth-child(even) {
     background-color: #dddddd;
   }
```