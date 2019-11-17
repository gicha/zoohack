"use strict";

const Mongoose = require("mongoose");
const Schema = Mongoose.Schema;

const FormSchema = new Schema(
    {
        company: String,
        answers: {type: Schema.Types.ObjectId, ref: "Answer"},
        summary: String,
    },
    {
        toObject: {
            transform: function (doc, ret, options) {
                delete ret.__v;
                return ret;
            }
        }
    }
);

FormSchema.methods = {};

FormSchema.statics = {
    getById: function (id) {
        if (id instanceof String) id = Mongoose.Types.ObjectId(id.toString());
        return this.findOne({_id: id}).exec();
    },
    getAll: function () {
        return this.findOne().exec();
    }
};

Mongoose.model("Form", FormSchema);
