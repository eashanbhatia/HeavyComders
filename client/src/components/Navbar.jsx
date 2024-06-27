import React from 'react';

const Navbar = () => {
  return (
    <div className="flex flex-row bg-black w-full h-16 justify-center gap-5 sticky top-0 z-10">
      <div className="image align-middle my-auto w-[10%] pt-1">
        <img
          src="https://m.media-amazon.com/images/G/01/digital/video/web/Logo-min.png"
          alt=""
          className=""
        />
      </div>
      <div className="text text-white flex flex-row align-middle my-auto gap-5">
        <div className=""><a href="/">Home</a></div>
        <div className="">Store</div>
        <div className="">Live TV</div>
        <div className="">Categories</div>
        <div className=""><a href="/viewed">My Products</a></div>
      </div>
    </div>
  );
};

export default Navbar;
