import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import 'dotenv/config';

import User from '../models/users.model';

const signIn = async (req, res) => {
    const { email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });

        if (!existingUser) return res.status(404).send("This email address is not registered with us");

        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);

        if (!isPasswordCorrect) return res.status(400).send("Invalid credentials");

        // using jsonwebtoken to store the email address and id of the user
        const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, process.env.JWT_KEY, { expiresIn: "1h" });

        res.status(500).send({ result: existingUser, token });
    } catch (err) {
        res.status(500).send(err);
    }
}

const signUp = async (req, res) => {
    const { email, password, confirmPassword, firstName, lastName } = req.body;

    try {
        if (password !== confirmPassword) return res.status(400).send("Passwords do not match");

        const existingUser = await User.find({ email });
        if (existingUser) return res.status(400).send("This email is already registered with us");

        const hashedPassword = await bcrypt.hash(password, 12);
        const result = await User.create({ email, password: hashedPassword, name: `${firstName} ${lastName}` });

        const token = jwt.sign({ email: result.email, id: result._id }, process.env.JWT_KEY, { expiresIn: "1h" });
        res.status(200).send({ result, token });

        return res.status(200).send(result);
    } catch (err) {
        res.status(500).send(err);
    }
}