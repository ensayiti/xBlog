---
title: "API (Axios)"
subtitle: "GET, POST, DELETE method with Axios."
date: "01-03-2023"
---

# API Consume dengan metode GET dengan Axios
### Objektif:
- Melakukan consume API dan memasukan ke dalam komponen Card
- Menggunakan metode GET, POST, dan DELETE.
- Menggunakan useState dan useEffect
- Menggunakan Dummy API
- [Full Code here..](https://github.com/samsleepingatparty/api-axios)

### GET

**1. Import pada App.js**

```javascript
import React, { useState, useEffect } from "react";
import axios from "axios";
```   

**2. Memasukan fungsi create axios, serta base URL untuk API**

```javascript
const client = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com/posts", // Input URL API
});
```

**3. Membuat hooks dengan useEffect**

```javascript
const App = () => {
  const [posts, setPosts] = useState([]);

  // GET
  useEffect(() => {
    const fetchPost = async () => {
      try {
        let response = await client.get("?_limit=3"); // Contoh untuk mengambil 3 data
        setPosts(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchPost();
  }, []);
```

**4. Memasukan data ke dalam komponen**

```javascript
  return (
    <div className="app">
      <nav>
        <h1>POSTS APP</h1>
      </nav>

      {/* POSTS LIST */}
      <div className="posts-container">
        <h2>All Posts</h2>
        {posts.map((post) => {
          return (
            <div className="post-card" key={post.id}>
              <h2 className="post-title">{post.title}</h2>
              <p className="post-body">{post.body}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default App;
```

---

### DELETE

**1. Membuat hooks DELETE**

```javascript
const App = () => {
  const [posts, setPosts] = useState([]);

  // GET
  useEffect(() => {
    const fetchPost = async () => {
      try {
        let response = await client.get("?_limit=3"); // Contoh untuk mengambil 3 data
        setPosts(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchPost();
  }, []);
  
    // DELETE
  const deletePost = async (id) => {
    try {
      await client.delete(`${id}`);
      setPosts(
        posts.filter((post) => {
          return post.id !== id;
        })
      );
    } catch (error) {
      console.log(error);
    }
  };
```

**2. Memasukan fungsi delete ke dalam komponen**

```javascript
      {/* POSTS LIST */}
      <div className="posts-container">
        <h2>All Posts</h2>
        {posts.map((post) => {
          return (
            <div className="post-card" key={post.id}>
              <h2 className="post-title">{post.title}</h2>
              <p className="post-body">{post.body}</p>
              <div className="button">
                <div className="delete-btn" onClick={() => deletePost(post.id)}> // Fungsi DELETE
                  Delete
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default App;
```  

---

### POST

**1. Membuat const**

```javascript
const App = () => {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
```   

**2. Memasukan handle untuk Form Submit dan POST**

```javascript
  // GET
  ...

  // DELETE
  ...

  // Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    addPosts(title, body);
  };

  // POST
  const addPosts = async (title, body) => {
    try {
      let response = await client.post('', {
        title: title,
        body: body,
      });
      setPosts([response.data, ...posts])''
      setTitle('');
      setBody('');
    } catch (error) {
      console.log(error);
    }
  };
```

**3. Membuat form submit**

```javascript
  return (
    <div className="app">
      <nav>
        <h1>POSTS APP</h1>
      </nav>

      {/* Submit From */}
      <div className="add-post-container">
        <form onSubmit={handleSubmit}>
          <input type="text" className="form-control" value={title} onChange={(e) => setTitle(e.target.value)} />
          <textarea name="" id="" className="form-control" cols={10} rows={8} value={body} onChange={(e) => setBody(e.target.value)}></textarea>
          <button type="submit">Add Post</button>
        </form>
      </div>
```

---

**CSS (index.css)** 

```css
@import url('https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,200;0,300;0,400;0,600;0,700;1,300&display=swap');

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  width: 100%;
  background-color: #ddd;
  font-family: 'Nunito', sans-serif;
  overflow: scroll;
}

.app {
  margin: auto;
  width: 40%;
}

@media (max-width: 500px) {
  .app {
    margin: auto;
    width: 90%;
  }
}

nav {
  text-align: center;
  padding: 30px 0;
}

form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-control,
button {
  padding: 20px;
  border-radius: 5px;
}

form button {
  background-color: blue;
  color: #fff;
  border: none;
  cursor: pointer;
}

.posts-container {
  margin-top: 50px;
}

.posts-container h2 {
  margin: 15px 0;
}

.post-card {
  background-color: #fff;
  padding: 20px;
  border-radius: 5px;
  margin-bottom: 20px;
}

.delete-btn {
  margin-top: 10px;
  background-color: red;
  color: #fff;
  padding: 15px 40px;
  border-radius: 5px;
  display: inline-block;
  cursor: pointer;
}
```  