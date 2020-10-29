import React from 'react';
import LazyLoad from 'react-lazyload';

export default function Image(props) {
  return (
    <LazyLoad>
      <img
        srcSet={
          `${props.src.replace('.jpg', '_100x.jpg')} 100w,` +
          `${props.src.replace('.jpg', '_200x.jpg')} 200w,` +
          `${props.src.replace('.jpg', '_400x.jpg')} 400w,` +
          `${props.src.replace('.jpg', '_800x.jpg')} 800w,` +
          `${props.src.replace('.jpg', '_1600x.jpg')} 1600w,`
        }
        alt={props.altText}
      />
    </LazyLoad>
  );
}
