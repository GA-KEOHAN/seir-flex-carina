import React from 'react';


export default function Notices (props) {
  return (
    <div>
      {
        props.notices.map( notice =>{
          return (
            <div key={notice.id} className="notice">
              <h3>{notice.title}</h3>
               <p> {notice.content}</p>
               <small>{notice.author}</small>
            </div>
          )
        })
      }
    </div>
  );
}
