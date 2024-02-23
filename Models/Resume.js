const mongoose = require('mongoose');
const express = require('express');

const resumeSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: [true, "name should be provided"],
        maxLength: 20,
        minLenght: 5
    },
    email: {
        type: String,
        required: [true, "email should be provided"],
        maxLength: 40,
        minLenght: 5
    },
    mobile: {
        type: String,
        required: true,
        maxLength: 10,
        minLenght: 10
    },
    address: {
        type: String,
        required: [true, "address should be provided"],
        maxLength: 50,
        minLenght: 5
    },
    education: {
        type: Object,
        required: [true, "you must provide your quallification"],
    },
    experience: {
        type: [Object],
        default: {}

    },
    skills: {
        type: [String],
        require: true
    },
    profession: {
        type: String,
        // required: [true, "must provide profession"],

    },
    about: {
        type: String,
        required: [true, "about should be provided"],
        // maxLength: [100, "About to be in short words"],
        // minLenght: [20, "describe something more about you"]
    },








    hobbies: {
        type: [String]
    },
    urls: {
        type: [String]
    },
    user: {
        type: mongoose.mongo.ObjectId,
        ref: 'user',
        required: [true, "resume must belog to user"]
    }

}, {
    timestamps: true,
    // virtuals: {
    //     JSON: true
    // }
})

const Resume = mongoose.model('Resume', resumeSchema)

module.exports = Resume;












