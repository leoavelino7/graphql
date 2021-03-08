import User from '../../../models/User'
import { USER_ADDED } from './channels'

export default {
  User: {
    fullName: (user) => `${user.firstName} ${user.lastName}`
  },
  Query: {
    users: () => User.find(),
    user: (_, { id }) => User.findById(id)
  },
  Mutation: {
    createUser: async (_, { data }, { pubsub }) => {
      const user = await User.create(data)

      pubsub.publish(USER_ADDED, {
        [USER_ADDED]: user
      })

      return user
    },
    updateUser: (_, { id, data }) => User.findOneAndUpdate(id, data, { new: true }),
    deleteUser: async (_, { id }) => !!(await User.findOneAndDelete(id))
  },
  Subscription: {
    [USER_ADDED]: {
      subscribe: (obj, args, { pubsub }) => pubsub.asyncIterator(USER_ADDED)
    }
  }
}