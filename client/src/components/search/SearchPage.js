import SearchBar from "../layout/SearchBar";
import "../../stylesheets/SearchPage.css";
import { Col, Container, Row, Label, Input, Spinner, Pagination, PaginationItem, PaginationLink, CardGroup } from "reactstrap";
import SearchPageItem from "./SearchPageItem";
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getOffers } from "../../actions/offer";
import { getCategories } from "../../actions/category";

const SearchPage = ({ getOffers, getCategories, category: { categories }, offer: { offers, loading } }) => {
  useEffect(() => {
    getOffers();
  }, [getOffers]);
  useEffect(() => {
    getCategories();
  }, [getCategories]);
  const [activeCategory, setActiveCategory] = useState(window.sessionStorage.getItem("category"));
  const setCategory = category => {
    if (activeCategory !== category) {
      setActiveCategory(category);
      setActivePage(1);
    };
  }
  var activeCategoryName = "";
  if (activeCategory !== 0) {
    categories.map((category) => {
      if (category._id === activeCategory) {
        activeCategoryName = category.name.split('\xa0').join('');
        window.scrollTo(0, 0);
      }
    })
  }


  const [activePage, setActivePage] = useState(1)
  const setPage = page => {
    if (!activePage !== page) {
      setActivePage(page);
      window.scrollTo(0, 0);
    }
  }
  const nextPage = () => {
    setPage(activePage + 1);
  }
  const previousPage = () => {
    setPage(activePage - 1);
  }


  const [activeSort, setActiveSort] = useState('1');
  const setSort = sort => {
    if (activeSort !== sort) setActiveSort(sort);
  }
  const sessionStorageText = window.sessionStorage.getItem("text") === null ? "" : window.sessionStorage.getItem("text").split(" ").join("").toLowerCase();

  var category_children = [];
  const findChildren = id => {
    categories.map((category) => {
      if (category.parent === id) {
        category_children.push(category);
        findChildren(category._id)
      }
    })
  }
  if (!loading) findChildren(activeCategory);
  const checkCategory = id => {
    var check = false;
    if (activeCategory === id) check = true;
    else {
      category_children = [];
      findChildren(activeCategory);
      category_children.map((category) => {
        if (category._id === id) check = true;
      })
    }
    return check;
  }
  var resultArray = [];
  const countItems = () => {
    offers.forEach((element, index) => {
      if (element.offerName.split(" ").join("").toLowerCase().includes(sessionStorageText)) {
        if (!activeCategoryName) resultArray.push(element);
        else if (checkCategory(element.category)) resultArray.push(element);
      }
    });
    switch (activeSort) {
      case '1':
        return resultArray.sort((a, b) => a.date < b.date ? 1 : -1);
      case '2':
        return resultArray.sort((a, b) => a.date > b.date ? 1 : -1);
      case "3":
        return resultArray.sort((a, b) => a.pricePerDay > b.pricePerDay ? 1 : -1);
      case "4":
        return resultArray.sort((a, b) => a.pricePerDay < b.pricePerDay ? 1 : -1);
      case "5":
        return resultArray.sort((a, b) => a.pricePerWeek > b.pricePerWeek ? 1 : -1);
      case "6":
        return resultArray.sort((a, b) => a.pricePerWeek < b.pricePerWeek ? 1 : -1);
      default:
        return resultArray;
    }
  };
  var branch = [];
  const findParent = id => {
    categories.map((category) => {
      if (category._id === id) {
        branch.push(category);
        if (category.parent) findParent(category.parent);
      }
    })
  }
  if (!loading) findParent(activeCategory);
  countItems();
  const [itemsOnPage, setItemsOnPage] = useState(20);
  const setItems = items => {
    if (itemsOnPage !== items) {
      setItemsOnPage(items);
      setPage(1);
    }
  }

  var pages = Math.ceil(resultArray.length / itemsOnPage);

  const paginationItem = (i, isActive) => 
    <PaginationItem active={isActive} className='searchpage_pagination_item'>
      <PaginationLink className='searchpage_pagination_link' onClick={() => setPage(i)}>{i}</PaginationLink>
    </PaginationItem>
  

  const pagination = (
    <Pagination className='searchpage_pagination'>
      {activePage !== 1 ? <>
        <PaginationItem className='searchpage_pagination_item'>
          <PaginationLink className='searchpage_pagination_link' first onClick={() => setPage(1)} />
        </PaginationItem>
        <PaginationItem className='searchpage_pagination_item'>
          <PaginationLink className='searchpage_pagination_link' previous onClick={() => previousPage()} />
        </PaginationItem></> : <>
          <PaginationItem disabled className='searchpage_pagination_item'>
            <PaginationLink className='searchpage_pagination_link' first />
          </PaginationItem>
          <PaginationItem className='searchpage_pagination_link' disabled className='searchpage_pagination_item'>
            <PaginationLink className='searchpage_pagination_link' previous />
          </PaginationItem></>}
      {activePage === 1 ? <>{paginationItem(1, true)}
        {[...Array(pages)].length > 1 ? <>{paginationItem(2, false)}
          {[...Array(pages)].length > 2 ? paginationItem(3, false) : null}
        </> : null}</> : <>
          {activePage === pages ? <>
            {[...Array(pages)].length > 2 ? paginationItem(pages - 2, false) : null}
            {[...Array(pages)].length > 1 ? paginationItem(pages - 1, false) : null}
            {paginationItem(pages, true)}</> : <>
              {[...Array(pages)].length > 2 ? <>
                {paginationItem(activePage - 1, false)}
                {paginationItem(activePage, true)}
                {paginationItem(activePage + 1, false)}
              </> : null}
            </>}
        </>}
      {activePage !== pages ? <>
        <PaginationItem className='searchpage_pagination_item'>
          <PaginationLink className='searchpage_pagination_link' next onClick={() => nextPage()} />
        </PaginationItem>
        <PaginationItem className='searchpage_pagination_item'>
          <PaginationLink className='searchpage_pagination_link' last onClick={() => setPage(pages)} />
        </PaginationItem></> : <>
          <PaginationItem disabled className='searchpage_pagination_item'>
            <PaginationLink className='searchpage_pagination_link' next />
          </PaginationItem>
          <PaginationItem disabled className='searchpage_pagination_item'>
            <PaginationLink className='searchpage_pagination_link' last />
          </PaginationItem></>}
    </Pagination>
  );


  return (
    <div id='searchpage_container'>
      <div id='searchpage_searchinfo'>
        <Container fluid>
          <Row id='searchpage_first_row'>
            <Col lg='6'>
              <span id='searchinfo_title'>
                {sessionStorageText ? <>"{sessionStorageText}"</> : "Wszystko"}{" w "}
                {activeCategoryName ? `"` + activeCategoryName + `"` : <>Wszystkie kategorie</>}{" "}
              </span>
              <p id='searchinfo_subtitle'>
                ({resultArray.length} ofert
                {{
                  1: <>a</>,
                  2: <>y</>,
                  3: <>y</>,
                  4: <>y</>,
                }[resultArray.length]}{", " + pages} stron
                {{
                  1: <>a</>,
                  2: <>y</>,
                  3: <>y</>,
                  4: <>y</>,
                }[pages]}), ofert na stronę:
                {[...Array(3)].map((x, i) =>
                  <>{itemsOnPage === (i + 1) * 20 ? <button disabled className='items_button active_items_button'>{itemsOnPage}</button> :
                    <button className='items_button' onClick={() => setItems((i + 1) * 20)}>{(i + 1) * 20}</button>}</>
                )}
              </p>
              <div className='cat_breadcrumb'>
                <button className='no_style_button breadcrumb_button' onClick={(e) => setCategory("")}>FotoRental</button>
                {branch.length ? <>
                  {branch.slice(0).reverse().map((category) => <>/
                    {category._id === activeCategory ? <button className='no_style_button_disabled breadcrumb_button' disabled>{category.name.split('\xa0').join('')}</button> :
                      <button className='no_style_button breadcrumb_button' onClick={(e) => setCategory(category._id)}>{category.name.split('\xa0').join('')}</button>}</>
                  )}</> : <>/<button className='no_style_button_disabled breadcrumb_button' disabled>Wszystkie kategorie</button></>}
              </div>
            </Col>
            <Col lg='6'>
              <div id='searchpage_searchbar'><SearchBar /></div>
            </Col>
          </Row>
        </Container>
        <Container fluid>
          <Row>
            <Col sm='5' md='3' className='no_padding_col'>
              <div id='searchinfo_col'>
                <Label for='sorttype_select'>Sortowanie</Label>
                <Input type='select' name='sorttype_select' id='sorttype_select' value={activeSort}
                  onChange={(e) => setSort(e.target.value)}>
                  <option value='1'>data dodania: od najmłodszej</option>
                  <option value='2'>data dodania: od najstarszej</option>
                  <option value='3'>cena za dzień: od najniższej</option>
                  <option value='4'>cena za dzień: od najwyższej</option>
                  <option value='5'>cena za tydzień: od najniższej</option>
                  <option value='6'>cena za tydzień: od najwyższej</option>
                </Input>
                <div id='categories_container'>
                  {branch.length ? <p id='categories_title'>Podkategorie:</p> : null}
                  {branch.slice(0).reverse().map((category) =>
                    <p>{category._id === activeCategory ? <button className='no_style_button_disabled' disabled>{category.name}</button> :
                      <button className='no_style_button' onClick={(e) => setCategory(category._id)}>{category.name}</button>}</p>)}
                  {category_children.map((category) => <p><button className='no_style_button' onClick={(e) => setCategory(category._id)}>{category.name}</button></p>)}
                </div>
                <div id='categories_container'>
                  <p id='categories_title'>Wszystkie kategorie:</p>
                  {categories.map((category) =>
                    <p>{category._id === activeCategory ? <button className='no_style_button_disabled' disabled>{category.name}</button> :
                      <button className='no_style_button' onClick={(e) => setCategory(category._id)}>{category.name}</button>}</p>)}
                </div>
              </div>
            </Col>
            <Col sm='7' md='9' className='no_padding_col'>
              {loading ?
                <div id='searchresult_col'>
                  <Spinner color='primary' className='load_spinner' />
                </div> : <>
                  {resultArray.length ? <>
                    {pagination}
                    <div id='searchresult_col'>
                      <CardGroup>
                        {resultArray.map((item, i) => <>
                          {i < activePage * itemsOnPage && i >= (activePage - 1) * itemsOnPage ?
                            <SearchPageItem key={item._id} item={item} /> : null}</>)}
                      </CardGroup>
                    </div>
                    {pagination}
                  </> :
                    <div id='searchresult_col'>
                      <div className='empty_searchresults'>
                        <h1 className='display-3'>
                          Nie znaleziono ofert o podanych kryteriach
                          wyszukiwania
                          </h1>
                      </div>
                    </div>
                  }</>
              }
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

SearchPage.propTypes = {
  getOffers: PropTypes.func.isRequired,
  getCategories: PropTypes.func.isRequired,
  category: PropTypes.object.isRequired,
  offer: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  offer: state.offer,
  category: state.category,
});

export default connect(mapStateToProps, { getOffers, getCategories })(SearchPage);
