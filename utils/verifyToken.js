import Jwt from "jsonwebtoken";
import { createError } from "./error.js";
import dotenv from 'dotenv'
dotenv.config();

export const verifyToken = (req, rse, next) => {
    const token = req.cookies.access_token;
    if (!token) {
        return next(createError(401, "You are not authenticated"))
    }
    Jwt.verify(token, process.env.JWT, (err, user) => {
        if (err) return next(createError(403, "Token is not vaild"))
        req.user = user;
        next();
    })
}

export const verifyUser = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.id === req.params.id || req.user.isAdmin) {
            next()
        } else {
            if (err) return next(createError(403, "You are not authorized"))

        }
    })
}
export const verifyAdmin = (req, res, next) => {
    verifyToken(req, res,next, () => {
        if ( req.user.isAdmin) {
            next()
        } else {
            if (err) return next(createError(403, "You are not authorized"))

        }
    })
}