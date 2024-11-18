const express = require("express");
const Buyer = require("../models/Buyer");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require('../config/key');
const otpGenerator = require('otp-generator');
const OTP = require('../models/OtpEmail');
const OtpEmail = require("../models/OtpEmail");
const ForgetOtpEmail = require("../models/ForgetOtpEmail");
//@route POST api/admin
//@desc Buyer signup
//@access Public
const createBuyer = async (req, res) => {
    const { buyerPhone, buyerEmail, buyerName, password, otp } = req.body;
    try {
        let isPhone = false
        let isMail = false
        let otpObj = await OtpEmail.findOne({ email: buyerEmail }) || {}
        if (otp === otpObj?.otp) {
            let buyerInfo = new Buyer({ buyerName, buyerEmail, buyerPhone, password });

            // Hash password before saving in database
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
                            const payload = {
                                id: data._id,
                                // name: mail.name
                            };
                            data.password = ""
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
                                        message: `Sign Up Completed`,
                                        result: data,
                                        token: "Bearer " + token,
                                        status: true,
                                        isLogin: true
                                    });
                                }
                            );


                            // res.status(200).json({
                            //     result: data,
                            //     message: "Sign Up Completed, Please Login!",
                            //     status: true,
                            //     isSignUp: true
                            // });
                        }
                    });
                });
            });
        } else {
            return res.status(200).json({
                result: data,
                message: "Wrong Otp, Please try again!",
                status: true,
                isSignUp: false
            });
        }
        return 0
        // if (buyerPhone.length > 0) {
        //     isPhone = await Buyer.findOne({ buyerPhone })
        // } else {
        //     isMail = await Buyer.findOne({ buyerEmail })
        // }
        // let isExist = await Buyer.findOne({ $or: [{ buyerPhone }, { buyerEmail }] });
        //see if user exists
        // console.log('isExist', isPhone, isMail)
        // if (isPhone) {
        //     return res.status(200).json({
        //         message: `You are already our member with this ${buyerPhone}, Please login`,
        //         result: "",
        //         status: true,
        //         isSignUp: false
        //     });
        // } else if (isMail) {
        //     return res.status(200).json({
        //         message: `You are already our member with this ${buyerEmail}, Please login`,
        //         result: "",
        //         status: true,
        //         isSignUp: false
        //     });
        // }

        // console.log('buye', buyerInfo)


    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
};
//send otp through email
const sendEmailOtp = async (req, res) => {
    const { email } = req.body
    try {
        // Check if user is already present
        const checkUserPresent = await Buyer.findOne({ buyerEmail: email });
        // If user found with provided email
        if (checkUserPresent) {
            return res.status(200).json({
                message: `You are already our member with this ${email}, Please login`,
                result: "",
                status: true,
                isSignUp: false
            });
        }
        let otp = otpGenerator.generate(6, {
            upperCaseAlphabets: false,
            lowerCaseAlphabets: false,
            specialChars: false,
        });
        let result = await OTP.findOne({ otp: otp });
        while (result) {
            otp = otpGenerator.generate(6, {
                upperCaseAlphabets: false,
            });
            result = await OTP.findOne({ otp: otp });
        }
        const otpPayload = { email, otp };
        const otpBody = await OTP.create(otpPayload);
        res.status(200).json({
            result: otp,
            message: 'OTP sent successfully',
            status: true
        });
    } catch (err) {
        console.log('error', err)
    }
}
//send otp through email for forget password
const forgetPasswordOtp = async (req, res) => {
    const { buyerEmail } = req.body
    try {
        // Check if user is already present
        const checkUserPresent = await Buyer.findOne({ buyerEmail });
        // If user found with provided email
        if (checkUserPresent) {
            let otp = otpGenerator.generate(6, {
                upperCaseAlphabets: false,
                lowerCaseAlphabets: false,
                specialChars: false,
            });
            let result = await ForgetOtpEmail.findOne({ otp: otp });
            while (result) {
                otp = otpGenerator.generate(6, {
                    upperCaseAlphabets: false,
                });
                result = await OTP.findOne({ otp: otp });
            }
            const otpPayload = { email: buyerEmail, otp };
            const otpBody = await ForgetOtpEmail.create(otpPayload);
            return res.status(200).json({
                result: otp,
                message: 'OTP sent successfully',
                status: true
            });

        } else {
            return res.status(200).json({
                result: "",
                message: "You are n't our member, Please sign up",
                status: false
            });
        }

    } catch (err) {
        console.log('error', err)
    }
}
//password update after match otp 
const setPassword = async (req, res) => {
    const { buyerEmail, password, otp } = req.body;
    try {
        let otpObj = await ForgetOtpEmail.findOne({ email: buyerEmail }) || {}
        if (otp === otpObj?.otp) {
            // Hash password before saving in database
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(password, salt, (err, hash) => {
                    if (err) throw err;
                    //update password
                    Buyer.updateOne(
                        { buyerEmail },
                        {
                            $set: { password: hash },
                        },
                        (err) => {
                            if (err) {
                                res.status(500).json({
                                    error: "There was a server side error!",
                                });
                            } else {
                                res.status(200).json({
                                    message: "New password set successfully!",
                                    status: true,
                                });
                            }
                        }
                    );

                });
            });
        } else {
            return res.status(200).json({
                result: data,
                message: "Wrong Otp, Please try again!",
                status: false,
            });
        }
        return 0
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
};
//check buyer through email
const checkBuyer = async (req, res) => {
    const { buyerEmail } = req.body
    try {
        // Check if user is already present
        const checkUserPresent = await Buyer.findOne({ buyerEmail });
        // If user found with provided email
        if (checkUserPresent) {
            return res.status(200).json({
                message: ``,
                result: "",
                status: true,
                isPresent: true
            });
        } else {
            return res.status(200).json({
                message: `${buyerEmail} is n't found, Please sign up`,
                result: "",
                status: true,
                isPresent: false
            });
        }

    } catch (err) {
        console.log('error', err)
    }
}
//check buyer through phone
const checkBuyerPhone = async (req, res) => {
    const { phone } = req.body
    try {
        // Check if user is already present
        const checkUserPresent = await Buyer.findOne({ buyerPhone: phone });
        // If user found with provided email
        if (checkUserPresent) {
            return res.status(200).json({
                message: ``,
                result: checkUserPresent,
                status: true,
                isPresent: true
            });
        } else {
            return res.status(200).json({
                message: `${phone} is n't found, Please sign up`,
                result: checkUserPresent,
                status: true,
                isPresent: false
            });
        }

    } catch (err) {
        console.log('error', err)
    }
}
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
//create user without login only phone number
const createUser = async (req, res) => {
    const { addressInfo } = req.body;
    const { buyerName, buyerPhone } = addressInfo || {}
    try {
        let buyerInfo = new Buyer({ buyerName, buyerPhone, addressInfo: [addressInfo] });
        buyerInfo.save((err, data) => {
            if (err) {
                res.status(500).json({
                    error: "There was a server side error!",
                });
            }
            return res.status(200).json({
                message: `User Created`,
                result: data,
                status: true
            });
        })
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
module.exports = { socialLogin, createBuyer, buyerLogin, deliveryAddress, updateDeliveryAddress, allBuyerList, allBuyerById, updateBuyer, deleteBuyer, sendEmailOtp, checkBuyer, forgetPasswordOtp, setPassword, checkBuyerPhone, createUser };
