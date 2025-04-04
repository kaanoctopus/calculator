const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const User = require("../models/User");
const JWT_SECRET = process.env.JWT_SECRET;

const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE || "gmail",
    auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
    },
});

class AuthService {
    async forgotPassword(email) {
        const user = await User.findOne({ email });
        if (!user) throw new Error("User not found");

        const resetToken = crypto.randomBytes(20).toString("hex");
        const resetPasswordExpires = Date.now() + 3600000;

        user.resetPasswordToken = resetToken;
        user.resetPasswordExpires = resetPasswordExpires;
        await user.save();

        const resetUrl = `https://calculatoroctopus.netlify.app/?token=${resetToken}`;

        const mailOptions = {
            to: user.email,
            from: process.env.EMAIL_FROM,
            subject: "Password Reset",
            text: `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n
            Please click on the following link, or paste this into your browser to complete the process:\n\n
            ${resetUrl}\n\n
            If you did not request this, please ignore this email and your password will remain unchanged.\n`,
        };

        await transporter.sendMail(mailOptions);
        return { message: "Password reset email sent" };
    }

    async resetPassword(token, newPassword) {
        const user = await User.findOne({
            resetPasswordToken: token,
            resetPasswordExpires: { $gt: Date.now() },
        });

        if (!user)
            throw new Error("Password reset token is invalid or has expired");

        user.password = await bcrypt.hash(newPassword, 10);
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;
        await user.save();

        return { message: "Password has been reset" };
    }
    async register(firstName, lastName, email, password) {
        const existingUser = await User.findOne({ email });
        if (existingUser) throw new Error("User already exists");

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            firstName,
            lastName,
            email,
            password: hashedPassword,
        });

        await newUser.save();
        return { message: "User registered successfully" };
    }

    async login(email, password) {
        const user = await User.findOne({ email });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            throw new Error("Invalid credentials");
        }

        const token = jwt.sign({ id: user._id }, JWT_SECRET, {
            expiresIn: "7d",
        });
        return {
            token,
            user: {
                id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
            },
        };
    }

    async getMe(userId) {
        const user = await User.findById(userId).select("-password");
        if (!user) throw new Error("User not found");
        return user;
    }

    async updateProfile(userId, firstName, lastName) {
        await User.findByIdAndUpdate(userId, { firstName, lastName });
        return { message: "Profile updated" };
    }

    async deleteAccount(userId) {
        await User.findByIdAndDelete(userId);
        return { message: "Account deleted" };
    }
}

module.exports = AuthService;
