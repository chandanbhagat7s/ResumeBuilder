const mongoose = require('mongoose');
const express = require('express');

const resumeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "name should be provided"],
        maxLength: 20,
        minLenght: 5
    },
    address: {
        type: String,
        required: [true, "address should be provided"],
        maxLength: 40,
        minLenght: 5
    },
    About: {
        type: String,
        required: [true, "about should be provided"],
        maxLength: 100,
        minLenght: 20
    },
    mobile: {
        type: String,
        required: true,
        maxLength: 10,
        minLenght: 10
    },
    email: {
        type: String,
        required: [true, "email should be provided"],
        maxLength: 40,
        minLenght: 5
    },
    experience: {
        type: Object,
        default: {}

    },
    DOB: {
        type: String,
        required: true
    },
    skills: {
        type: Array,
        require: true
    },
    fresher: {
        type: Boolean
    },
    hobbies: {
        type: Array
    },
    workedAs: {
        type: Array

    },
    languages: {
        type: Array

    }

}, {
    timestamps: true,
    // virtuals: {
    //     JSON: true
    // }
})

const Resume = mongoose.model('Resume', resumeSchema)

module.exports = Resume;












