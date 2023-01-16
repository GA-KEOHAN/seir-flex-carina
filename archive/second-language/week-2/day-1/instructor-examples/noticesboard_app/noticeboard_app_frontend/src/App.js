import React, {useState, useEffect} from 'react';
import axios from 'axios';

import Notices from './components/Notices';

export default function App() {
  const [notices, setNotices] = useState([]);
  const [formInputs, updateFormInputs] = useState({
    author: '',
    content: '',
    title: ''
  });
  const getNotices = async ()=>{
    try{
      const response = await fetch('http://localhost:3000/notices');
      const data = await response.json();
      setNotices(data)
    }catch(error){
      console.error(error)
    }
  }
  useEffect(
    ()=>{
      (
        async function (){
           await getNotices();
        }
      )()
    }, [])
  const handleChange = (event) => {
    const updatedFormInputs = Object.assign({}, formInputs, { [event.target.id]: event.target.value})
    updateFormInputs(updatedFormInputs);
  }


  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        'http://localhost:3000/notices',
        formInputs
      );
      const createdNotice = response.data
      await updateFormInputs({
        author: '',
        title: '',
        content: ''
      })
      await setNotices([createdNotice, ...notices])
    }catch(error){
      console.error(error)
    }
  }
  return (
    <div className="App">
        <div className="container">
            <nav>
              <h4>Post a notice</h4>
              <form onSubmit={handleSubmit}>
                <label htmlFor="author">Author</label>
                <input
                  type="text"
                  id="author"
                  onChange={handleChange}
                  value={formInputs.author}
                  />
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  id="title"
                  onChange={handleChange}
                  value={formInputs.title}
                  />
                <label htmlFor="content">Content</label>
                <input
                  type="text"
                  id="content"
                  onChange={handleChange}
                  value={formInputs.content}
                  />
                <input type="submit" className="submit" />
              </form>
            </nav>
            <main>
              <Notices notices={notices}/>
            </main>
            <aside>
            </aside>
        </div>
        <footer />
    </div>
  );
}
