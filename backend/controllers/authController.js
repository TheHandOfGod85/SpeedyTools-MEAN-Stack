const User = require('./../models/userModel')
const catchAsync = require('./../utils/catchAsync')
const jwt = require('jsonwebtoken')
const AppError = require('./../utils/appError')
const { promisify } = require('util')
const sendMail = require('./../utils/email')
const crypto = require('crypto')

const signToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET_KEY, {
        expiresIn: process.env.JWT_EXPIRES_IN
    })
}

const createSendToken = (user, statusCode, res) => {
    const token = signToken(user._id)
    // const cookieOptions = {
    //     expires: new Date(
    //         Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    //     ),
    //     httpOnly: true
    // }
    if (process.env.NODE_ENV === 'production') cookieOptions.secure = true

    // res.cookie('jwt', token, cookieOptions)

    user.password = undefined

    res.status(statusCode).json({
        status: 'success',
        token,
        data: {
            user
        }
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
    createSendToken(newUser, 201, res)
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
    createSendToken(user, 200, res)
})

exports.logout = (req, res) => {
    res.cookie('jwt', null, {
        expires: new Date(Date.now()),
        httpOnly: true,
        secure: false
    })
    res.status(200).json({
        status: 'success',
        message: 'Logged out successfully'
    })
}

exports.protect = catchAsync(async (req, res, next) => {
    let token
    //1) check if the token exists
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1]
    }
    console.log(token)
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
    if (process.env.NODE_ENV === 'production') {
        const resetURL = `${req.protocol}://${req.get(
            'host'
        )}/auth/reset-password/${resetToken}`
        const message = `Forgot your password? Submit the form with your new password to: ${resetURL}.
        \nIf you did not forget your password, please ignore this email!`
        try {
            await sendMail({
                email: user.email,
                subject: 'Your password reset token (valid for 10 mins)',
                message
            })
        } catch (error) {
            user.passwordResetToken = undefined
            user.passwordResetExpires = undefined
            await user.save({ validateBeforeSave: false })

            return next(
                new AppError('There was an error sending the email. Try again later', 500)
            )
        }
    }
    const resetURL = `${req.protocol}://4200/auth/reset-password/${resetToken}`
    const message = `Forgot your password? Submit the form with your new password to: ${resetURL}.
    \nIf you did not forget your password, please ignore this email!`
    try {
        await sendMail({
            email: user.email,
            subject: 'Your password reset token (valid for 10 mins)',
            message
        })
    } catch (error) {
        user.passwordResetToken = undefined
        user.passwordResetExpires = undefined
        await user.save({ validateBeforeSave: false })

        return next(
            new AppError('There was an error sending the email. Try again later', 500)
        )
    }

    res.status(200).json({
        status: 'success',
        message: 'Email sent'
    })
})
exports.resetPassword = catchAsync(async (req, res, next) => {
    //1) Get user based on the token
    const hashedToken = crypto.createHash('sha256').update(req.params.token).digest('hex')

    const user = await User.findOne({
        passwordResetToken: hashedToken,
        passwordResetExpires: { $gt: Date.now() }
    })
    //2)If token has not expired, and there is user, set the new password
    if (!user) {
        return next(new AppError('Invalid toke or expired!', 400))
    }
    //3)Update changePasswordAt for the current user
    user.password = req.body.password
    user.passwordConfirm = req.body.passwordConfirm
    user.passwordResetToken = undefined
    user.passwordResetExpires = undefined
    await user.save()
    //4)Log the user in, send JWT token
    createSendToken(user, 200, res)
})

exports.updatePassword = catchAsync(async (req, res, next) => {
    //1) Get user from the collection
    const user = await User.findById(req.user.id).select('+password')

    //2) Check if current password is correct
    if (!(await user.correctPassword(req.body.passwordCurrent, user.password))) {
        return next(new AppError('Your current password is wrong.', 401))
    }

    //3)If the password is correct , update the password
    user.password = req.body.password
    user.passwordConfirm = req.body.passwordConfirm
    // user.findbyidAndUpdate will not work as intedned!
    await user.save()

    //4) Log user in, send JWT
    createSendToken(user, 200, res)
})
