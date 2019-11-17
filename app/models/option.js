"use strict";

const Mongoose = require("mongoose");
const Schema = Mongoose.Schema;

const OptionSchema = new Schema(
    {
        title: String,
        point: Number,
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

OptionSchema.methods = {};

OptionSchema.statics = {
    getById: function (id) {
        if (id instanceof String) id = Mongoose.Types.ObjectId(id.toString());
        return this.findOne({_id: id}).exec();
    },
    getAll: function () {
        return this.find().exec();
    },
    getPoint: async function (title) {
        return (await this.findOne({title: title}).exec()).point;
    }
};

Mongoose.model("Option", OptionSchema);
