const passport = require("passport");
const userService = require('../services/usersService');
const axios = require('axios');

export const facebookAuth = () => {
  return passport.authenticate("facebook", {
    session: false,
    successRedirect: "/",
    scope: ["email", "user_gender", "user_birthday"],
  });
};

export const facebookCallback = () => {
  return passport.authenticate("facebook", {
    failureRedirect: "/login",
    session: false,
  });
};

export const googleAuth = () => {
  return passport.authenticate("google", {
    session: false,
    successRedirect: "/",
    scope: ["profile", "email"],
    // "https://www.googleapis.com/auth/user.birthday.read",
    // "https://www.googleapis.com/auth/user.gender.read"]
  });
};

export const googleCallback = () => {
  return passport.authenticate("google", {
    failureRedirect: "/login",
    session: false
  });
};

const getExtraUserDataFromGoogle = async (accessToken, done) => {
  const fields = "birthdays,genders";
  const url = `https://people.googleapis.com/v1/people/me?personFields=${fields}&key=AIzaSyCZSoKAso-u3xF-IVkGZ5nBlW_Fth0JxVU&access_token=${accessToken}`;
  console.log(url);
  const googleExtraFields = await axios.get(url).catch(e => {
    const err = new Error("failed to fetch user details");
    done(err, null);
    throw err;
  });
  let birthday = null;
  console.log(googleExtraFields.data);
  const {
    genders,
    birthdays
  } = googleExtraFields.data;
  if (birthdays) {
    const {
      year,
      month,
      day
    } = birthdays[0].date;
    birthday = new Date(year, month - 1, day);
  }
  let gender = genders ? genders[0].value : null;
  console.log([gender, birthday]);
  return [gender, birthday];
};

export const handleSignIn = async (accessToken, refreshToken, profile, done) => {
  const newUser = {};
  ({
    id: newUser.id,
    displayName: newUser.displayName,
    name: {
      givenName: newUser.firstName,
      familyName: newUser.familyName
    },
    gender: newUser.gender,
    _json: {
      birthday: newUser.birthday
    },
    emails: [{
      value: newUser.email
    }],
    photos: [{
      value: newUser.picPath
    }],
    provider: newUser.provider
  } = profile);
  if (newUser.provider === "google") {
    [newUser.gender, newUser.birthday] = await getExtraUserDataFromGoogle(accessToken, done);
  }
  console.log(newUser);
  let user = await userService.getUserByEmail(newUser.email);
  if (!user) {
    console.log("does not exists creating")
    userService
      .createUser(newUser)
      .then(user => {
        return done(null, user)
      })
      .catch(e => {
        return done(new Error("failed to create user: " + e), null);
      });
  } else {
    console.log("exits done")
    return done(null, user);
  }
}
const jwt = require('jsonwebtoken');

export const generateUserToken = (req, res) => {
  const userId = req.user._id; // database id
  const user = req.user;
  const jwtSecret = process.env.JWT_SECRET;
  const token = jwt.sign({
      iat: Math.floor(Date.now() / 1000) - 30, //jwt leeway
      user: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        img: user.picPath

      },
    },
    jwtSecret, {
      expiresIn: "7 days",
      subject: userId.toString()
    }
  );
  res.cookie("mazhinToken", token, {
    domain: process.env.NODE_ENV === "production" ? COOKIE_DOMAIN : "",
    expires: token.exp * 1000,
  }).redirect('/');
}

export const getAdminsAbout = async (req, res) => {
  const users = await userService.getAboutUserProfiles();
  return res.status(200).send(users);
}

export const getProfileDetails = async (req, res) => {
  const userId = req.user.id;
  console.log(userId);
  const profile = await userService.getProfileDetailsForUserId(userId);
  if (!profile) {
      return res.status(404).send("Coulnd't fetch profile")
  }
  return res.status(200).send(profile);
}

export const setProfileDetailsForUser = async (req, res) => {
  const userId = req.user.id;
  const userDoc = {
    displayName: req.body.displayName,
    picPath: req.body.picPath,
    qas: req.body.qas
  }
  await userService.replaceUserSettings(userId, userDoc);
  return res.status(201).send("Profile settings created successfully");
}
