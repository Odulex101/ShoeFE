// import React from 'react'
// import Header from '../components/Header'
// import Hero from '../components/Hero/Hero'

// const Landing = () => {
//   return (
//     <div>
//       {/* <Header /> */}
//       <Hero />
//     </div>
//   )
// }

// export default Landing

import React from "react";
import Hero from "../components/Hero/Hero";
import FeaturedProducts from "../components/FeaturedProducts/FeaturedProducts";

const Landing = () => {
  return (
    <>
      <Hero />
      <FeaturedProducts />
    </>
  );
};

export default Landing;



