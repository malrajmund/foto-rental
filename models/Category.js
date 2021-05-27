const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CategorySchema = new Schema({

    parent: {
        type: Schema.Types.ObjectId,
        ref: "categories",
        default: null,
    },
    name: {
        type: String,
        required: true
    }
})

module.exports = Category = mongoose.model("category", CategorySchema);