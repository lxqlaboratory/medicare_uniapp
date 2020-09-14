import request from '@/common/request.js'

export function login(data) {
	return request.request({
		url: '/auth/webLogin',
		method: 'POST',
		data: data
	})
}
export function MenuList(data) {
	return request.request({
		url: '/auth/getUniappMenuList',
		method: 'POST',
		data: data
	})
}
export function unbounding(data) {
	return request.request({
		url: '/auth/unbounding',
		method: 'POST',
		data: data
	})
}


export function judgePersonClub(data) {
	return request.request({
		url: '/person/judgePersonClub',
		method: 'POST',
		data: data
	})
}


export function getAllClubs(data) {
	return request.request({
		url: '/person/getAllClubs',
		method: 'POST',
		data: data
	})
}

export function confirmClub(data) {
	return request.request({
		url: '/person/confirmClub',
		method: 'POST',
		data: data
	})
}


export function modifyPasswordSubmit(data) {
	return request.request({
		url: '/auth/modifyPasswordSubmit',
		method: 'POST',
		data: data
	})
}


export function getAllmenus(data) {
	return request.request({
		url: '/person/getAllmenus',
		method: 'POST',
		data: data
	})
}