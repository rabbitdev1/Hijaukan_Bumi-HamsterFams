import React from 'react';

const BrandSlider = () => {
  return (
    <div className="flex flex-row p-3 gap-3 ">
      <div className="flex overflow-hidden space-x-10 group">
        <div className="flex space-x-10 animate-loop-scroll group-hover:paused">
          {[{ 'images': require('../../assets/image/brand/utb.png'), 'title': 'Universitas Teknolog Bandung' },
            { 'images': require('../../assets/image/brand/oxigen.png'), 'title': 'UKM Oxigen' },
            { 'images': require('../../assets/image/brand/utb.png'), 'title': 'Universitas Teknolog Bandung' },
            { 'images': require('../../assets/image/brand/cekhox.png'), 'title': 'Cek Hoax' },].map((item, index) => (
              <img key={index} loading="lazy" src={item?.images} className="h-10 object-contain m-3 max-w-none" alt={item?.title} />
            ))}
        </div>
        <div className="flex space-x-10 animate-loop-scroll group-hover:paused" aria-hidden="true">
          {[{ 'images': require('../../assets/image/brand/utb.png'), 'title': 'Universitas Teknolog Bandung' },
            { 'images': require('../../assets/image/brand/oxigen.png'), 'title': 'UKM Oxigen' },
            { 'images': require('../../assets/image/brand/utb.png'), 'title': 'Universitas Teknolog Bandung' },
            { 'images': require('../../assets/image/brand/cekhox.png'), 'title': 'Cek Hoax' },].map((item, index) => (
              <img key={index} loading="lazy" src={item?.images} className="h-10 object-contain  m-3 max-w-none" alt={item?.title} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default BrandSlider;
