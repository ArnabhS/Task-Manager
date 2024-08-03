const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
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
    },
    subscription: {
      type: Boolean,
      default: false,
    },
    stripeCustomerId: {
      type: String,
    },
    stripeSubscriptionId: {
      type: String,
    },
    subscriptionStatus: {
      type: String,
      enum: ['active', 'past_due', 'canceled', 'unpaid', 'trialing', 'incomplete', 'incomplete_expired'],
      default: 'incomplete',
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model('User', userSchema);

module.exports = User;
