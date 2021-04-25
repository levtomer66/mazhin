const { db } = require("../initialize/db")

export const getAboutUserProfiles = async () => {
  const users = await (await db).collection("users").find({}).toArray();
  return users
}

export const getUserByEmail = async (email) => {
  // const collection = await db.collection('users')
  const user = await (await db).collection("users").findOne({email: email});
  return user;
}

export const createUser = async (userObj) => {
    console.log("want to create pra:" + userObj)
    const user = await ((await db).collection("users").updateOne({}, { $set: userObj },{upsert: true}));
    if (user.result.nModified < 0) {
      throw new Error("User upsert failed")
    }
    console.log(`${user.result.nModified} document inserted`);
    return user;
}

export const getProfileDetailsForUserId = async (userId) => {
  return await (await db).collection('users').findOne({id: userId}, {projections: {profile: true}});
}

export const replaceUserSettings = async (userId, doc) => {
  await (await db).collection('users').updateOne({id: userId}, { $set: doc }, { upsert: true });
}
