import request from '@/common/request.js'

// 获取论文列表
export function physicalexaminationApplyInit(data) {
	return request.request({
		url: '/medicare/physicalexaminationApplyInit',
		method: 'POST',
		data: data
	})
}
