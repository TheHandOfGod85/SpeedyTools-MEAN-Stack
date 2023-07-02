const User = require('./../models/userModel')
const catchAsync = require('./../utils/catchAsync')
const jwt = require('jsonwebtoken')
const AppError = require('./../utils/appError')
const { promisify } = require('util')

const signToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET_KEY, {
        expiresIn: process.env.JWT_EXPIRES_IN
    })
}

exports.signup = catchAsync(async (req, res, next) => {
    const newUser = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        passwordConfirm: req.body.passwordConfirm,
        passwordChangedAt: req.body.passwordChangedAt,
        role: req.body.role
    })

    const token = signToken(newUser._id)

    res.status(201).json({
        status: 'success',
        token,
        data: {
            user: newUser
        }
    })
})

exports.login = catchAsync(async (req, res, next) => {
    const { email, password } = req.body
    if (!email || !password) {
        return next(new AppError('Please provide email and password!', 400))
    }

    const user = await User.findOne({ email }).select('+password')

    if (!user || !(await user.correctPassword(password, user.password))) {
        return next(new AppError('Incorrect email or password', 401))
    }

    const token = signToken(user._id)

    res.status(200).json({
        status: 'success',
        token
    })
})

exports.protect = catchAsync(async (req, res, next) => {
    let token
    //1) check if the token exists
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1]
    }
    if (!token) {
        return next(
            new AppError('You are not logged in, please log in to get access.', 401)
        )
    }
    //2) verification token
    const decodedToken = await promisify(jwt.verify)(token, process.env.JWT_SECRET_KEY)
    //3)Check if user still exists
    const currentUser = await User.findById(decodedToken.id)
    if (!currentUser) {
        return next(new AppError('The user does not longer exist', 401))
    }

    //4) Check if user changed password after the token was issued
    if (currentUser.changedPasswordAfter(decodedToken.iat)) {
        return next(
            new AppError('User recently changed password, please log in again', 401)
        )
    }
    req.user = currentUser
    next()
})

exports.restrictTo = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(
                new AppError('You do not have permission to perform this action', 403)
            )
        }
        next()
    }
}

exports.forgotPassword = catchAsync(async (req, res, next) => {
    //1) Get user based on posted email
    const user = await User.findOne({ email: req.body.email })
    if (!user) {
        return next(new AppError(`There is no user with this email address`, 404))
    }

    //2) generate the random reset token
    const resetToken = user.createPasswordResetToken()
    await user.save({ validateBeforeSave: false })
    //3)Send it to user`s email

    next()
})
exports.resetPassword = (req, res, next) => {}
