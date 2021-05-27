import Offers from "../offers/Offers";
import React from "react";
import "../../stylesheets/MainPage.css";
import SearchBar from "../layout/SearchBar";
import CategoryList from "../misc/CategoryList";

const Landing = () => {
  window.sessionStorage.setItem("text", "");
  window.sessionStorage.setItem("category", "");
  return (
    <div className='mainpage_container'>
      <div className='background_image'>
        <div className='centered'>
          <h3 className='title'>Najlepsza w Polsce metoda</h3>
          <h3 className='subtitle'>wypożyczania sprzętu Foto/Video</h3>
          <div className='search_bar'>
            <SearchBar />
          </div>
          <div className='front_text'>
            <p>Wystaw własny sprzęt</p>
            <p><a className='front_link' href='/OfferForm'>Zacznij zarabiać</a></p>
          </div>
        </div>
      </div>
      <div className='lists_container'>
        <Offers />
        <CategoryList />
      </div>
    </div>
  );
};

export default Landing;
