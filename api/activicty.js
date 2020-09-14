import request from '@/common/request.js'

export function createActivicty(data) {
	return request.request({
		url: '/activicty/createActivicty',
		method: 'POST',
		data: data
	})
}

export function activictyInstanceInit(data) {
	return request.request({
		url: '/activicty/activictyInstanceInit',
		method: 'POST',
		data: data
	})
}


export function createActivictyInstance(data) {
	return request.request({
		url: '/activicty/createActivictyInstance',
		method: 'POST',
		data: data
	})
}
export function activictyModelInit(data) {
	return request.request({
		url: '/activicty/activictyModelInit',
		method: 'POST',
		data: data
	})
}


export function memberActivictyCode(data) {
	return request.request({
		url: '/activicty/memberActivictyCode',
		method: 'POST',
		data: data
	})
}


export function transpontCode(data) {
	return request.request({
		url: '/activicty/transpontCode',
		method: 'POST',
		data: data
	})
}


export function signListInit(data) {
	return request.request({
		url: '/activicty/signListInit',
		method: 'POST',
		data: data
	})
}


export function signMember(data) {
	return request.request({
		url: '/activicty/signMember',
		method: 'POST',
		data: data
	})
}


export function memberGameCode(data) {
	return request.request({
		url: '/activicty/memberGameCode',
		method: 'POST',
		data: data
	})
}

export function gameSignListInit(data) {
	return request.request({
		url: '/activicty/gameSignListInit',
		method: 'POST',
		data: data
	})
}



export function gameSignMember(data) {
	return request.request({
		url: '/activicty/gameSignMember',
		method: 'POST',
		data: data
	})
}

export function getCourseClassList(data) {
	return request.request({
		url: '/course/getCourseClassList',
		method: 'POST',
		data: data
	})
}

export function deleteCourseClass(data) {
	return request.request({
		url: '/course/deleteCourseClass',
		method: 'POST',
		data: data
	})
}
export function getActivictyInit(data) {
	return request.request({
		url: '/activicty/getActivictyInit',
		method: 'POST',
		data: data
	})
}


export function manageActivctyM(data) {
	return request.request({
		url: '/activicty/manageActivctyM',
		method: 'POST',
		data: data
	})
}
export function deleteAc(data) {
	return request.request({
		url: '/activicty/deleteAc',

		method: 'POST',
		data: data
	})
}

export function deleteActivctyM(data) {
	return request.request({
		url: '/activicty/deleteActivctyM',
		method: 'POST',
		data: data
	})
}

				
