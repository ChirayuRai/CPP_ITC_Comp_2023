module.exports = {
  Query: {
    async user(_, { input }, { models }) {
      console.log("Input:", input);
      try {
        const user = await models.User.findOne({
          lastName: input.lastName,
        }).exec();
        console.log("User:", user);
        return user;
      } catch (error) {
        console.error("Error in user resolver:", error);
        throw error;
      }
    },
    async usertest(_, { username }, { models }) {
      console.log("Input:", username);
      try {
        const user = await models.User.findOne({
          username: username,
        }).exec();
        console.log("User:", user);
        return user;
      } catch (error) {
        console.error("Error in user resolver:", error);
        throw error;
      }
    },
    async usertestID(_, { userID }, { models }) {
      console.log("Input:", userID);
      try {
        const user = await models.User.findOne({
          _id: userID,
        }).exec();
        console.log("User:", user);
        return user;
      } catch (error) {
        console.error("Error in user resolver:", error);
        throw error;
      }
    },
  },
  Mutation: {
    addUser: async (_, { input }, { models }) => {
      const newUser = new models.User({
        //the field names here have to correspond with the field names in the mongoose
        //schema defined in user.js
        _id: input.id,
        firstName: input.firstName,
        lastName: input.lastName,
        username: input.username,
        email: input.email,
        createdAt: input.createdAt,
      });

      try {
        await newUser.save();
        return newUser;
      } catch (err) {
        console.error("Error creating user:", err);
        throw new Error("Failed to create user");
      }
    },
  },
};
