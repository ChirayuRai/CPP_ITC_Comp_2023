//the resolvers are used to assign business logic to the graphql schema
//for example, the user query below corresponds with the user(..) field defined in the query type
//in schema.js //the { input } is the input from the client which has to conform to the input parameter of input type
//UserInput defined in the schema. the resolvers get executed whenever a query is made with the query name matching one of the
//query fields defined in the query type (schema.js)
module.exports = {
  Query: {
    async usersByUniversity(_, { input }, { models }) {
      console.log("Input:", input);
      try {
        const user = await models.User.findOne({
          profile: {
            university: input.profile.university,
          },
          //lastName: input.lastName,
        }).exec();
        console.log("User:", user);
        return user;
      } catch (error) {
        console.error("Error in user resolver:", error);
        throw error;
      }
    },
    async userByUsername(_, { username }, { models }) {
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
        // firstName: input.firstName,
        // lastName: input.lastName,
        username: input.username,
        password: input.password,
        email: input.email,
        //createdAt: input.createdAt, handled using Date.now in db/user.js
      });

      try {
        await newUser.save();
        return newUser;
      } catch (err) {
        console.error("Error creating user:", err);
        throw new Error("Failed to create user");
      }
    },
    addUserProfile: async (_, { input }, { models }) => {
      //convert the following to find
      // const newProfile = new models.User({
      //   //the field names here have to correspond with the field names in the mongoose
      //   //schema defined in user.js
      // });

      try {
        const filter = { username: input.username };
        const update = {
          //username: input.username,
          //password: input.password,
          name: input.name,
          bio: input.biography,
          university: input.university,
          major: input.major,
          sleepTime: input.sleepTime,
          hygiene: input.cleanliness,
          hobbies: input.hobbies,
          smoke: input.smoking,
          pets: input.pets,
        };

        const options = { new: true, upsert: true };

        const updatedProfile = await models.User.findOneAndUpdate(
          filter,
          update,
          options
        );

        if (!updatedProfile) {
          throw new Error("Failed to update user profile");
        }

        return updatedProfile;
      } catch (err) {
        console.error("Error updating user profile:", err);
        throw new Error("Failed to update user profile");
      }
    },
  },
};
