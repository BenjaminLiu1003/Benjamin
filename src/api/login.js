import http from '@/utils/network/http'
import { MAX_DISPLAY_ENTRIES } from '@/constant'

export function login(username, password) {
	const url = "/account/login"
	const data = {
		"username": username,
		"password": password
	}
	return http.get('quoter/all', {from: 0, to:MAX_DISPLAY_ENTRIES - 1})
	// return http.post(url, data)
}

export function logout() {
	const url = "/account/logout"
	return http.post(url)
}