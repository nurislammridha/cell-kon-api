const express = require("express");
const jwt = require("jsonwebtoken");
const keys = require('../config/key');

//buyer login
const adminLogin = async (req, res) => {
    const { email, password } = req.body;
    try {
        if (email === "support@sellkon.com") {
            if (password === "sellkon@#2024COM") {
                const payload = {
                    email, password
                };
                jwt.sign(
                    payload,
                    keys.key,
                    {
                        expiresIn: 31556926 // 1 year in seconds
                    },
                    (err, token) => {
                        return res.status(200).json({
                            message: `You are logged in`,
                            result: "",
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

        } else {
            return res.status(200).json({
                message: `Your email is n't found`,
                result: "",
                status: false,
                isLogin: false
            });
        }

    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
};

module.exports = { adminLogin };
