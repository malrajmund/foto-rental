import React, { useEffect } from "react";
import PropTypes from "prop-types";
import '../../stylesheets/CategoryList.css';
import { getCategories } from '../../actions/category';
import { connect } from "react-redux";

const CategoryList = ({ getCategories, category: { categories } }) => {
    useEffect(() => {
        getCategories();
    }, [getCategories]);
    const searchCategory = category => {
        window.sessionStorage.setItem('category', category);
        window.location.href='/search/results';
    }
    return (
        <div className='category_list'>
            <div className='list_desc'>
                <p className='item_list_title'>Kategorie</p>
            </div>
            <div className='scrollable_list'>
                <div className='scrollable_row'>
                    {categories.map((category) => (
                        <button onClick={() => searchCategory(category._id)} className='scrollable_col category_card'>
                            {category.name.split('\xa0').join('')}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}

CategoryList.propTypes = {
    getCategories: PropTypes.func.isRequired,
    category: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    category: state.category
})

export default connect(mapStateToProps, { getCategories })(CategoryList);