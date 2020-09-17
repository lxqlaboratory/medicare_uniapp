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
export function physicalexaminationApplyProjectItemList(data) {
	return request.request({
		url: '/medicare/physicalexaminationApplyProjectItemList',
		method: 'POST',
		data: data
	})
}
