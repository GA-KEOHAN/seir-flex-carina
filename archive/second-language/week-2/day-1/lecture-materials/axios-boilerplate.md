---
track: "Second Language"
title: "Refactor from Fetch to Axios"
week: 2
day: 1
type: "lecture"
---



# Refactor from Fetch to Axios

```js
    try{
      const response = await fetch('http://localhost:300/notices', {
        body: JSON.stringify(formInputs),
        method: 'POST',
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json'
        }
      })
      const data = response.json()
      updateFormInputs({
        author: '',
        content: '',
        title: ''
      })
      setNotices([data, ...notices])
    }catch(error){
      console.error(error)
    }
```

```js
// send a POST request
 try{
  const response = await axios.post('http://localhost:3000/notices', formInputs);
  const data = response.data;
  updateFormInputs({
        author: '',
        content: '',
        title: ''
      })
      setNotices([data, ...notices])
  } catch(error){
  console.error(error)
}
```
