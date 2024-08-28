import { check, validationResult } from 'express-validator';
import { ROLE } from '../utils/constants.js';
export const loginValidator = [
    check('email')
        .isEmail()
        .withMessage('Invalid email address format')
        .normalizeEmail()
        .notEmpty()
        .withMessage('Email is required'),

    check('password')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters long')
        .notEmpty()
        .withMessage('Password is required'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

export const registerValidator = [
    check('name')
        .notEmpty()
        .withMessage('Name is required'),
    check('email')
        .isEmail()
        .withMessage('Invalid email address format')
        .normalizeEmail()
        .notEmpty()
        .withMessage('Email is required'),

    check('password')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters long')
        .notEmpty()
        .withMessage('Password is required'),

    check('role')
        .optional()
        .isIn([ROLE.ADMIN_ROLE, ROLE.USER_ROLE])
        .withMessage('Role must be one of the following: Admin, User'),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];


export const updateUserValidator = [
    check('name')
        .optional()
        .isLength({ min: 1 })
        .withMessage('Name must be at least 1 characters long'),

    check('email')
        .optional()
        .isEmail()
        .withMessage('Invalid email address format')
        .normalizeEmail()
        .isLength({ min: 1 })
        .withMessage('email ntent must be at least 1 characters long'),
    check('role')
        .optional()
        .isIn([ROLE.ADMIN_ROLE, ROLE.USER_ROLE])
        .withMessage('Role must be one of the following: Admin, User'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];
