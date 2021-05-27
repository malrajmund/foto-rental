import PropTypes from "prop-types";
import { connect } from "react-redux";
import { useEffect, useState } from "react";
import { Button, Form, Input } from 'reactstrap';
import { getCategories, addCategory } from "../../actions/category";

const TempAdminPanel = ({ getCategories, addCategory, category: { categories, loading } }) => {
    useEffect(() => {
        getCategories();
    }, [getCategories]);
    const [activeParent, setActiveParent] = useState(null);
    const [activeName, setActiveName] = useState("");
    const setParent = parent => {
        if (activeParent !== parent) setActiveParent(parent);
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        addCategory(activeName, activeParent);
        window.location.reload();
    }
    return (
        <div id='asdasd'>
            <div id='dashboard_container'>
                <Form onSubmit={(e) => onSubmit(e)}>
                    <Input type='text' placeholder='nazwa kategorii' id='category_name' name='category_name' value={activeName} onChange={(e) => setActiveName(e.target.value)} />
                    <Input type='select' name='parent' id='parent' value={activeParent} onChange={(e) => setParent(e.target.value)}>
                        <option value={null}>brak rodzica</option>
                        {categories.map((category) => (
                            <option value={category._id}>{category.name}</option>
                        ))}
                    </Input>
                    <Button type='submit'>Dodaj</Button>
                </Form>
            </div>
        </div>
    )

}

TempAdminPanel.propTypes = {
    addCategory: PropTypes.func.isRequired,
    getCategories: PropTypes.func.isRequired,
    category: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
    category: state.category,
})

export default connect(mapStateToProps, { getCategories, addCategory })(TempAdminPanel);