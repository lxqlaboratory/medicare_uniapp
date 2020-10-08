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
export function physicalexaminationApplySubmit(data) {
	return request.request({
		url: '/medicare/physicalexaminationApplySubmit',
		method: 'POST',
		data: data
	})
}
export function physicalexaminationApplyView(data) {
	return request.request({
		url: '/medicare/physicalexaminationApplyView',
		method: 'POST',
		data: data
	})
}
export function physicalexaminationReportView(data) {
	return request.request({
		url: '/medicare/physicalexaminationReportView',
		method: 'POST',
		data: data
	})
}
export function collegePhysicalExaminationQuery(data) {
	return request.request({
		url: '/medicare/collegePhysicalExaminationQuery',
		method: 'POST',
		data: data
	})
}
export function collegePhysicalExaminationInfoList(data) {
	return request.request({
		url: '/medicare/collegePhysicalExaminationInfoList',
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
export function studentMedicareApplyView(data) {
	return request.request({
		url: '/medicare/studentMedicareApplyView',
		method: 'POST',
		data: data
	})
}

export function collegeMedicareApplyQuery(data) {
	return request.request({
		url: '/medicare/collegeMedicareApplyQuery',
		method: 'POST',
		data: data
	})
}
export function collegeMedicareApplyStatisticsList(data) {
	return request.request({
		url: '/medicare/collegeMedicareApplyStatisticsList',
		method: 'POST',
		data: data
	})
}

export function collegeMedicareApplyInfoList(data) {
	return request.request({
		url: '/medicare/collegeMedicareApplyInfoList',
		method: 'POST',
		data: data
	})
}


