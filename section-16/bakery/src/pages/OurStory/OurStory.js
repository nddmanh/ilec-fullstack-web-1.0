import React from 'react';
import './OurStory.css';

export default class OurStory extends React.Component {
  render () {
    return  <>
    <div className="container-fluit">
      <div className="row">
    
        <div className="banner">
          <div id="title-image">
            <h1>OUR STORY</h1>
          </div>
          <img src="brand-header1.jpeg" />
        </div>
      </div>
    </div>
    <div className="container">
      <div className="row mt-5 mb-4">

      </div>
      <div className="col">
        <div>
          <p className="featurename">Hi, We’re BREAD BAKERY</p>
          <p className="description">
            Since its launch in the Vietnam in 2444, Bread Bakery has developed
            into a reputable bakery &amp; café franchise, specializing in
            French-Asian inspired baked goods, passionately made from the finest
            ingredients. At Bread Bakery, we offer more than 300 different kinds
            of bakery goods, including bread, pastries, cakes, desserts, and
            beverages. We bake each day to provide fresh products for our guests
            and take pride in sourcing and using carefully selected fine
            ingredients. Bread Bakery continues to expand and embrace innovation
            in all markets.
            <br />
            <br />
            Currently, there are more than 100 stores in the universe. and more
            than 1,650 stores worldwide.
          </p>
        </div>
      </div>
    </div>
  </>

    
  }
}