import Cookie from 'js-cookie'

const storage = window.localStorage

const SessionIdKey = 'sessionid'
const CsrfTokenKey = 'csrftoken'
const LogIdKey = 'logid'

const UserIdKey = "user_id"
const UserNameKey = "user_name"

export default {
  getSessionId: function() {
    return Cookie.get(SessionIdKey)
  },

  removeSessionId: function() {
    let domain = ''
    process.env.NODE_ENV === 'production' ? domain = '.jumptrading.com' : ''
    if (domain !== '') {
      return Cookie.remove(SessionIdKey, {'domain': domain})
    } else {
      return Cookie.remove(SessionIdKey)
    }
  },

  getCsrfToken: function() {
    return Cookie.get(CsrfTokenKey)
  },

  removeCsrfToken: function() {
    let domain = ''
    process.env.NODE_ENV === 'production' ? domain = '.jumptrading.com' : ''
    if (domain !== '') {
      return Cookie.remove(CsrfTokenKey, {'domain': domain})
    } else {
      return Cookie.remove(CsrfTokenKey)
    }
  },

  setLogId: function(id) {
    return Cookie.set(LogIdKey, id)
  },

  getLogId: function() {
    return Cookie.get(LogIdKey)
  },

  removeLogId: function() {
    let domain = ''
    process.env.NODE_ENV === 'production' ? domain = '.jumptrading.com' : ''
    if (domain !== '') {
      return Cookie.remove(LogIdKey, {'domain': domain})
    } else {
      return Cookie.remove(LogIdKey)
    }
  },

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
		return this.removeCsrfToken() && this.removeLogId() && this.removeUserId() && this.removeUserName()
	}
}
