import React from "react";

/* 
ALbum Component
returns image container with images
*/
const Album = (props) => {
  let data = props.data;
  return (
    <div className='album'>
      {data.map((pic) => {
        return (
          <div key={pic.id} className='pic'>
            <img
              className='img-responsive'
              src={`https://farm${pic.farm}.staticflickr.com/${pic.server}/${pic.id}_${pic.secret}_n.jpg`}
              alt='loading...'
            />
          </div>
        );
      })}
    </div>
  );
};

export default Album;
