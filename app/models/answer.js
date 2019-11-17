"use strict";

const Mongoose = require("mongoose");
const Schema = Mongoose.Schema;

const AnswerSchema = new Schema(
    {
        mail: String,
        company: String
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

AnswerSchema.methods = {};

AnswerSchema.statics = {
    getById: function (id) {
        if (id instanceof String) id = Mongoose.Types.ObjectId(id.toString());
        return this.findOne({_id: id}).exec();
    },
    getAll: function () {
        return this.findOne().exec();
    }
};

Mongoose.model("Answer", AnswerSchema);
