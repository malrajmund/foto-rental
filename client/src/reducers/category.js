import {
    GET_CATEGORIES,
    GET_CATEGORY,
    CATEGORY_ERROR,
    ADD_CATEGORY,
} from "../actions/types";

const initialState = {
    categories: [],
    loading: true,
    error: {},
};

export default function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case ADD_CATEGORY:
            return {
                ...state,
                categories: [...state.categories, payload],
                loading: false,
            };
        case GET_CATEGORIES:
            var categories = payload;
            var mapped_categories = [];
            const mapCategories = (id, iterate) => {
                categories.map((category) => {
                    if (category.parent === id) {
                        var dash = "";
                        for (var i = 0; i < iterate; i++) {
                            dash += "\xa0\xa0\xa0\xa0"
                        }
                        category.name = dash + category.name;
                        mapped_categories.push(category);
                        mapCategories(category._id, iterate + 1);
                    }
                })
            }
            categories.map((category) => {
                if (!category.parent) {
                    mapped_categories.push(category);
                    mapCategories(category._id, 1);
                }
            })
            return {
                ...state,
                categories: mapped_categories,
                loading: false,
            };
        case GET_CATEGORY:
            return {
                ...state,
                categories: payload,
                loading: false,
            };
        case CATEGORY_ERROR:
            return {
                ...state,
                error: payload,
                loading: false,
            };
        default:
            return state;
    }
}