const mongoose = require("mongoose");
// const crypto = require("crypto");
const userRolesEnum = require('../../config/auth')

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    age: Number,
    role: {
      type: String,
      enum: Object.values(userRolesEnum),
      default: userRolesEnum.USER,
    },
    avatar: String,
    token: String,
    passwordResetToken: String,
    passwordResetTokenExp: Date,
  },
  {
    timestamps: true,
    versionKey: false,
  }
);


// userSchema.pre("save", async function (next) {
//     if (this.isNew) {
//         const emailHash = crypto.createHash("md5").update(this.email).digest("hex")
//         this.avatarUrl = `https://www.gravatar.com/avatar/${emailHash}.jpg?d=retro`;
//   }
//     next();
// });

const User = mongoose.model("User", userSchema)

module.exports = User