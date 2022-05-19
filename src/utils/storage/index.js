const storage = window.localStorage
const UserIdKey = "user_id"
const UserNameKey = "user_name"

export default {
	setUserId: function(id) {
		return storage.setItem(UserIdKey, id)
	},

	getUserId: function() {
		return storage.getItem(UserIdKey)
	},

	removeUserId: function() {
		return storage.removeItem(UserIdKey)
	},

	setUserName: function(name) {
		return storage.setItem(UserNameKey, name)
	},

	getUserName: function() {
		return storage.getItem(UserNameKey)
	},

	removeUserName: function() {
		return storage.removeItem(UserNameKey)
	},

	logout: function() {
		return this.removeUserId && this.removeUserName()
	}
}
