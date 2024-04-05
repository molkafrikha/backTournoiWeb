const User = require('../models/userModel.js');
const asyncHandler = require('express-async-handler');
const emailValidator = require('email-validator');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const generateToken = require('../utils/generateToken.js');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/uploads/'); // Répertoire où les images seront stockées
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); // Nom de fichier unique pour éviter les collisions
  },
});

// Middleware Multer pour le téléchargement d'images
const upload = multer({ storage: storage });

exports.userRegister = asyncHandler(async (req, res) => {
  const { fullname, email, password, image, role } = req.body;

  const valid_email = emailValidator.validate(email);

  if (valid_email) {
    // Utilisez le middleware Multer pour gérer le téléchargement d'images
    upload.single('file')(req, res, async function (err) {
      if (err instanceof multer.MulterError) {
        // Une erreur s'est produite lors du téléchargement de l'image
        res.status(400);
        throw new Error('Image upload failed!');
      } else if (err) {
        // Une erreur s'est produite pour une autre raison
        res.status(500);
        throw new Error('Server error!');
      }

      const image = req.file ? req.file.path : ''; // Chemin de l'image téléchargée

      const user = await User.create({
        fullname,
        email,
        password,
        image,
        role
      });

      if (user) {
        res.status(201).json({
          status: 'Registration successful!',
          message: 'Waiting for confirmation by admin', // Message ajouté après l'enregistrement
        });
      } else {
        res.status(403);
        throw new Error('Registration failed!');
      }
    });
  } else {
    res.status(403);
    throw new Error('Invalid Email!');
  }
});

exports.userLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user || !(await user.matchPassword(password))) {
    res.status(401);
    throw new Error('Invalid email or password');
  }

  // Check if the user is confirmed by the admin
  if (!user.confirmedByAdmin) {
    res.status(403);
    throw new Error('User account not confirmed by admin');
  }
  res.status(200).json({
    email: user.email,
    role: user.role,
    token: generateToken({ id: user._id }),
  });
});

exports.userEmailVerify = asyncHandler(async (req, res) => {
  const { id } = jwt.verify(req.params.token, process.env.EMAIL_SECRET);
  
  if (id) {
    const updatedUser = await User.findByIdAndUpdate(id, { confirmed: true });
    if (updatedUser) {
       return res.redirect(`http://localhost:5173/login`);        // localhost
      //return res.redirect(`${process.env.PROD_CLIENT}/login`);         
    } else {
      res.status(404);
      console.log("user non modified")
    }
  } else {
    res.status(404);
    throw new Error('Invalid token!');
  }
});

exports.getResetPasswordLink = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email: email });
  if (user) {
    const transporter = nodemailer.createTransport({
      host: 'smtp-relay.sendinblue.com',
      port: 587,
      
      auth: {
        user: "molka90.frikha90@gmail.com",
        pass: "xsmtpsib-807fb659dd4ff941d830591db5bcdca8305b297f638d3a9c72920d80c4dbe4c8-4DVzXdwUTLAkp8y6"
      },
    });

    const token = await jwt.sign({ id: user._id }, process.env.EMAIL_SECRET, {
      expiresIn: '30min',
    });

     const url = `http://localhost:5173/createNewPassword/${token}`;    //localhost
    //const url = `${process.env.PROD_CLIENT}/createNewPassword/${token}`;

    const emailSent = await transporter.sendMail({
      from: 'molkafrikha1999@gmail.com',
      to: email,
      subject: 'Reset Password',
      text: 'Reset your password for React ToDo app.',
      html: `<p>Please click this link to reset password. <a href="${url}">${url}</a></p>`,
    });
    if (emailSent) {
      res.status(201).json({
        status: 'Password reset email sent.',
        message: `Password reset link was sent to ${email}.`,
      });
    } else {
      res.status(403);
      throw new Error('Password reset failed, Email sending failed!');
    }
  } else {
    res.status(403);
    throw new Error('There is no account associated with this email!');
  }
});

exports.resetPassword = asyncHandler(async (req, res) => {
  const { id } = jwt.verify(req.params.token, process.env.EMAIL_SECRET);
  if (id) {
    let { newPass, conPass } = req.body;
    if (newPass === conPass) {
      const salt = await bcrypt.genSalt(10);
      newPass = await bcrypt.hash(newPass, salt);
      const updatedUser = await User.findByIdAndUpdate(id, {
        password: newPass,
      });
      updatedUser.save();
      if (updatedUser) {
        res.status(200);
        res.json({ status: 'Password reset successfully!' });
      } else {
        res.status(404);
        throw new Error('Password reset failed!');
      }
    } else {
      res.status(404);
      throw new Error('Password does not match!');
    }
  } else {
    res.status(404);
    throw new Error('User not found!');
  }
});
