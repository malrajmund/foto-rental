import { Link } from "react-router-dom";
import Offers from "../offers/Offers";
import React, { useState } from "react";
import background_img from "../../img/img/background.jpg";
import "../../stylesheets/MainPage.css";
//import CategoryList from "./CategoryList";
//import ItemCardList from "./ItemCardList";
import SearchBar from "../layout/SearchBar";

const Landing = () => {
  return (
    <div>
      <div className='img_container'>
        <div className='background_image'>
          <img src={background_img} />
        </div>
        <div className='centered'>
          <h3 className='title'>Najlepsza w Polsce metoda</h3>
          <h3 className='subtitle'>wypożyczania sprzętu Foto/Video</h3>
          <div className='search_bar'>
            <SearchBar />
          </div>
          <div className='front_text'>
            <p>Wystaw własny sprzęt</p>
            <p>
              <a className='front_link' href='/login'>
                Zacznij zarabiać
              </a>
            </p>
          </div>
        </div>
      </div>
      <div className='lists_container'>
        <Offers />
      </div>
    </div>
  );
};

export default Landing;
