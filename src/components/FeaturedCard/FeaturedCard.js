import React from 'react';
import './FeaturedCard.scss';

const FeaturedCard = ({ featured }) => {
  const { store, pieOfTheDay } = featured;
  return(
   <div className="FeaturedCard">
     <div className="FeaturedCard-name">
        <div className="FeaturedCard-label">{store.displayName}</div>
        <div className="FeaturedCard-label FeaturedCard-rating">{store.rating}♥</div>
     </div>
    <div className="FeaturedCard-address">
      <div className="FeaturedCard-label"><a href={`tel:+${store.mobile}`}>{store.mobile}</a></div>
      <div className="FeaturedCard-label">
        <a
          href={`https://www.google.com.au/maps?q=${store.coords.latitude},${store.coords.longitude}`}
          target="_blank">{store.address}
        </a>
      </div>
    </div>
     <div className="FeaturedCard-frame">
       <h3>Pie of the day:</h3>
       <div className="FeaturedCard-pies">
         <div className="FeaturedCard-pie">
           <div className="FeaturedCard-label">{pieOfTheDay.displayName}</div>
           <div className="FeaturedCard-label">{pieOfTheDay.priceString}</div>
           <div className="FeaturedCard-label">{`Stock:${pieOfTheDay.quantity}`}</div>
         </div>
       </div>
     </div>
   </div>
  );
}

export default FeaturedCard;
