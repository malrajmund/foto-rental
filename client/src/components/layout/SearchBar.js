import React, { useState } from "react";
import { FormGroup, Input, Form, Button, Row, Col } from "reactstrap";
import "../../stylesheets/SearchBar.css";

function SearchBar() {
  return (
    <div>
      <Form className='search_form'>
        <FormGroup>
          <Row>
            <Col sm='5' className='search_input'>
              <Input
                type='text'
                name='searchbar'
                id='searchbar'
                placeholder='Czego szukasz?'
              ></Input>
            </Col>
            <Col sm='5' className='search_input'>
              <Input type='select' name='item_category' id='item_category'>
                <option selected>Wszystkie kategorie</option>
                <optgroup label='Aparaty cyfrowe'>
                  <option>Bezlusterkowce</option>
                  <option>Lustrzanki</option>
                </optgroup>
                <optgroup label='Kamery kinowe'>
                  <option>Zestawy</option>
                  <option>Samo body</option>
                </optgroup>
                <optgroup label='Obiektywy'>
                  <option>Stałoogniskowe</option>
                  <option>Zmiennoogniskowe</option>
                  <option>Zestawy</option>
                </optgroup>
                <optgroup label='Statywy, monopody, itp.'>
                  <option>Statywy</option>
                  <option>Monopody</option>
                  <option>Gimbale</option>
                  <option>Stabilizatory</option>
                </optgroup>
                <optgroup label='Nośniki danych'>
                  <option>Karty pamięci</option>
                  <option>Dyski</option>
                </optgroup>
              </Input>
            </Col>
            <Col sm='2' className='search_input'>
              <Button type='submit' name='search_button' id='search_button'>
                Szukaj
              </Button>
            </Col>
          </Row>
        </FormGroup>
      </Form>
    </div>
  );
}
export default SearchBar;
