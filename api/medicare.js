import request from '@/common/request.js'

// 获取论文列表
export function physicalexaminationApply(data) {
	return request.request({
		url: '/medicare/physicalexaminationApply',
		method: 'POST',
		data: data
	})
}
export function physicalexaminationApplyProjectList(data) {
	return request.request({
		url: '/medicare/physicalexaminationApplyProjectList',
		method: 'POST',
		data: data
	})
}
export function studentMedicareApply(data) {
	return request.request({
		url: '/medicare/studentMedicareApply',
		method: 'POST',
		data: data
	})
}

export function studentMedicareApplySubmit(data) {
	return request.request({
		url: '/medicare/studentMedicareApplySubmit',
		method: 'POST',
		data: data
	})
}

