import React from "react";

const About = () => {
  return (
    <div className="about-container">
      <h1 className="fade-in">About FoodFire</h1>
      <p className="slide-in">
        Welcome to <strong>FoodFire</strong> — your ultimate destination for
        ordering food online! We connect foodies with top-rated restaurants in
        your area, offering lightning-fast delivery, real-time order tracking,
        and amazing discounts.
      </p>

      <p className="slide-in delay-1">
        Our mission is to make food delivery{" "}
        <strong>simpler, faster, and smarter</strong>. Whether you're craving
        biryani, burgers, or bubble tea — FoodFire has got you covered.
      </p>

      <p className="slide-in delay-2">
        We partner with local restaurants to bring delicious meals right to your
        doorstep. Explore our app and enjoy a seamless ordering experience!
      </p>
    </div>
  );
};

export default About;
