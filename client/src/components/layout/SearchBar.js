import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { FormGroup, Input, InputGroup, InputGroupAddon, InputGroupText, Form, Button, Row, Col, } from "reactstrap";
import "../../stylesheets/SearchBar.css";
import search_img from "../../img/icons/baseline_search_black_18dp.png";
import { connect } from "react-redux";
import { getCategories } from '../../actions/category';

const SearchBar = ({ category: { categories }, getCategories }) => {
  useEffect(() => {
    getCategories();
  }, [getCategories]);
  const [searchData, setSearchData] = useState({
    text: window.sessionStorage.getItem('text'),
    category: window.sessionStorage.getItem('category'),
  });
  const { text, category } = searchData;
  const onSubmit = async (e) => {
    e.preventDefault();
    window.sessionStorage.setItem("text", text);
    window.sessionStorage.setItem("category", category);
    window.location.href = '/search/results';
  };
  return (
    <Form className='search_form' onSubmit={(e) => onSubmit(e)}>
      <FormGroup><Row>
        <Col xs='5' className='search_input'>
          <InputGroup>
            <Input type='search' id='searchbar' placeholder='Czego szukasz?'
              name='text' value={text} onChange={(e) => {
                setSearchData({ ...searchData, [e.target.name]: e.target.value });
              }} />
            {!text ?
              <InputGroupAddon addonType='prepend'>
                <InputGroupText type='text' id='search_addon'>
                  <img height='24' src={search_img} alt='search_icon' />
                </InputGroupText>
              </InputGroupAddon> : null}
          </InputGroup>
        </Col>
        <Col xs='5' className='search_input'>
          <Input type='select' name='category' id='category' value={category}
            onChange={(e) => { setSearchData({ ...searchData, [e.target.name]: e.target.value }); }}>
            <option value={0} selected>Wszystkie kategorie</option>
            {categories.map((category) => <option value={category._id}>{category.name}</option>)}
          </Input>
        </Col>
        <Col xs='2' className='search_input'>
          <Button type='submit' name='search_button' id='search_button'>Szukaj</Button>
        </Col>
      </Row></FormGroup>
    </Form>
  );
};
SearchBar.propTypes = {
  getCategories: PropTypes.func.isRequired,
  category: PropTypes.object.isRequired
}
const mapStateToProps = (state) => ({ category: state.category })
export default connect(mapStateToProps, { getCategories })(SearchBar);
