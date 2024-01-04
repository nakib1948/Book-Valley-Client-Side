import React from 'react';

const HeaderTitle = ({ title, description }) => {
  return (
    <div className="text-center" data-aos="flip-up" data-aos-duration="500">
      <h1 className="text-2xl font-semibold uppercase text-gray-900 tracking-wide">
        {title}
       
      </h1>
      <p className="mx-auto w-2/4 text-lg italic font-normal font-serif text-gray-500 mt-2">
          {description}
        </p>
      <div className="bg-blue-300 h-1 w-24 mx-auto mt-1"></div>
    </div>
  );
};

export default HeaderTitle;
