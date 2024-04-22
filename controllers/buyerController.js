const express = require("express");
const router = express.Router();
const Buyer = require("../models/Buyer");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require('../config/key');
//@route POST api/admin
//@desc Buyer signup
//@access Public
const createBuyer = async (req, res) => {
    const { buyerPhone, buyerEmail, buyerName, password } = req.body;
    try {
        let isPhone = false
        let isMail = false
        if (buyerPhone.length > 0) {
            isPhone = await Buyer.findOne({ buyerPhone })
        } else {
            isMail = await Buyer.findOne({ buyerEmail })
        }
        // let isExist = await Buyer.findOne({ $or: [{ buyerPhone }, { buyerEmail }] });
        //see if user exists
        // console.log('isExist', isPhone, isMail)
        if (isPhone) {
            return res.status(200).json({
                message: `You are already our member with this ${buyerPhone}, Please login`,
                result: "",
                status: true,
                isSignUp: false
            });
        } else if (isMail) {
            return res.status(200).json({
                message: `You are already our member with this ${buyerEmail}, Please login`,
                result: "",
                status: true,
                isSignUp: false
            });
        }
        let buyerInfo = new Buyer({ buyerName, buyerEmail, buyerPhone, password });
        // Hash password before saving in database
        // console.log('buye', buyerInfo)
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(buyerInfo.password, salt, (err, hash) => {
                if (err) throw err;
                buyerInfo.password = hash;
                // console.log('buyerInfo', buyerInfo)
                buyerInfo.save((err, data) => {
                    if (err) {
                        res.status(500).json({
                            error: "There was a server side error!",
                        });
                    } else {
                        res.status(200).json({
                            result: data,
                            message: "Welcome to SellKon!",
                            status: true,
                            isSignUp: true
                        });
                    }
                });
            });
        });

    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
};
//buyer login
const buyerLogin = async (req, res) => {
    const { buyerPhone, buyerEmail, password } = req.body;
    try {
        let phone = null
        let mail = null
        if (buyerPhone.length > 0) {
            phone = await Buyer.findOne({ buyerPhone })
            if (phone) {
                bcrypt.compare(password, phone.password).then(isMatch => {
                    if (isMatch) {
                        const payload = {
                            id: phone._id,
                            // name: phone.name
                        };
                        jwt.sign(
                            payload,
                            keys.key,
                            {
                                expiresIn: 31556926 // 1 year in seconds
                            },
                            (err, token) => {
                                phone.password = ""
                                console.log('phone123', phone)
                                return res.status(200).json({
                                    message: `You are logged in`,
                                    result: phone,
                                    token: "Bearer " + token,
                                    status: true,
                                    isLogin: true
                                });
                            }
                        );
                    } else {
                        return res.status(200).json({
                            message: `Incorrect password`,
                            result: "",
                            status: true,
                            isLogin: false
                        });
                    }
                });
            } else {
                return res.status(200).json({
                    message: `Your phone number is n't found in system`,
                    result: "",
                    status: true,
                    isLogin: false
                });
            }

        } else if (buyerEmail.length > 0) {
            mail = await Buyer.findOne({ buyerEmail })
            if (mail) {
                bcrypt.compare(password, mail.password).then(isMatch => {
                    if (isMatch) {
                        const payload = {
                            id: mail._id,
                            // name: mail.name
                        };
                        jwt.sign(
                            payload,
                            keys.key,
                            {
                                expiresIn: 31556926 // 1 year in seconds
                            },
                            (err, token) => {
                                mail.password = ""
                                return res.status(200).json({
                                    message: `You are logged in`,
                                    result: mail,
                                    token: "Bearer " + token,
                                    status: true,
                                    isLogin: true
                                });
                            }
                        );
                    } else {
                        return res.status(200).json({
                            message: `Incorrect password`,
                            result: "",
                            status: true,
                            isLogin: false
                        });
                    }
                })
            }
        } else {
            return res.status(200).json({
                message: `Your email is n't found`,
                result: "",
                status: true,
                isLogin: false
            });
        }

    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
};
//social media login //

const socialLogin = async (req, res) => {
    const { buyerName, buyerPhone, buyerEmail, googleId, buyerImgUrl, isNewUser, providerId } = req.body;
    try {
        if (isNewUser) {
            //sign up
            let buyerInfo = new Buyer({ buyerName, buyerEmail, buyerPhone, googleId, buyerImgUrl, providerId, password: "sellKonSocial" });
            buyerInfo.save((err, data) => {
                if (err) {
                    res.status(500).json({
                        error: "There was a server side error!",
                    });
                } else {
                    // console.log('data', data)
                    const payload = {
                        id: data._id,
                        // name: mail.name
                    };
                    jwt.sign(
                        payload,
                        keys.key,
                        {
                            expiresIn: 31556926 // 1 year in seconds
                        },
                        (err, token) => {
                            // console.log('data', data)
                            data.password = ""
                            // console.log('phone123', phone)
                            return res.status(200).json({
                                message: `You are logged in`,
                                result: data,
                                token: "Bearer " + token,
                                status: true,
                                isLogin: true
                            });
                        }
                    );
                }
            });
        } else {
            const obj = await Buyer.findOne({ googleId })
            // console.log('obj', obj)
            const payload = {
                id: obj._id,
                // name: mail.name
            };
            jwt.sign(
                payload,
                keys.key,
                {
                    expiresIn: 31556926 // 1 year in seconds
                },
                (err, token) => {
                    obj.password = ""
                    // console.log('phone123', phone)
                    return res.status(200).json({
                        message: `You are logged in`,
                        result: obj,
                        token: "Bearer " + token,
                        status: true,
                        isLogin: true
                    });
                }
            );
        }

    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
};
//add delivery address
const deliveryAddress = async (req, res) => {
    const { buyerId, addressInfo } = req.body;
    try {
        let isBuyer = await Buyer.findOne({ _id: buyerId })
        // console.log('buyerId', buyerId)
        // console.log('isBuyer', isBuyer)
        if (isBuyer) {

            await Buyer.updateOne({ _id: buyerId }, { $push: { addressInfo: addressInfo } });
            return res.status(200).json({
                message: "New delivery address created",
                status: true,
            });
        } else {
            return res.status(200).json({
                message: `Your are n't found`,
                status: false,
            });
        }

    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
};
//get details delivery address
const updateDeliveryAddress = async (req, res) => {
    const { buyerId, addressId, addressInfo } = req.body;
    const { buyerName, buyerPhone, detailsAddress, district, division, isMetropolitan, nearestArea, postalCode, union, upazilla } = addressInfo || {}
    try {
        let isBuyer = await Buyer.findOne({ _id: buyerId })
        // console.log('buyerId', buyerId)
        // console.log('isBuyer', isBuyer)
        if (isBuyer) {

            let data = await Buyer.updateOne({ _id: buyerId, "addressInfo._id": addressId }, {
                $set: {
                    "addressInfo.$.buyerName": buyerName,
                    "addressInfo.$.buyerPhone": buyerPhone,
                    "addressInfo.$.detailsAddress": detailsAddress,
                    "addressInfo.$.district": district,
                    "addressInfo.$.division": division,
                    "addressInfo.$.isMetropolitan": isMetropolitan,
                    "addressInfo.$.nearestArea": nearestArea,
                    "addressInfo.$.postalCode": postalCode,
                    "addressInfo.$.union": union,
                    "addressInfo.$.upazilla": upazilla
                }
            });
            return res.status(200).json({
                result: data,
                message: "Delivery address were updated",
                status: true,
            });
        } else {
            return res.status(200).json({
                message: `Your are n't found`,
                status: false,
            });
        }

    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
};

//all Buyer
const allBuyerList = async (req, res) => {
    try {
        await Buyer.find((err, data) => {
            if (err) {
                res.status(500).json({
                    error: "There was a server side error!",
                });
            } else {
                res.status(200).json({
                    result: data,
                    message: "All buyer are showing!",
                    status: true,
                });
            }
        });
    } catch (error) {
        res.status(500).send("Server error");
    }
};
// buyer By ID//
const allBuyerById = async (req, res) => {
    await Buyer.find({ _id: req.params.id }, (err, data) => {
        if (err) {
            res.status(500).json({
                error: "There was a server side error!",
            });
        } else {
            let [obj] = data;
            res.status(200).json({
                result: obj,
                message: "All buyer by buyer id!",
                status: true,
            });
        }
    });
};

//Update buyer by id
const updateBuyer = async (req, res) => {
    await Buyer.updateOne(
        { _id: req.params.id },
        {
            $set: req.body,
        },
        (err) => {
            if (err) {
                res.status(500).json({
                    error: "There was a server side error!",
                });
            } else {
                res.status(200).json({
                    message: "User info were updated successfully!",
                    status: true,
                });
            }
        }
    );
};

//delete buyer
const deleteBuyer = async (req, res) => {
    await Buyer.deleteOne({ _id: req.params.id }, (err) => {
        if (err) {
            res.status(500).json({
                error: "There was a server side error!",
            });
        } else {
            res.status(200).json({
                message: "Buyer was deleted successfully!",
                status: true,
            });
        }
    });
};
module.exports = { socialLogin, createBuyer, buyerLogin, deliveryAddress, updateDeliveryAddress, allBuyerList, allBuyerById, updateBuyer, deleteBuyer };
