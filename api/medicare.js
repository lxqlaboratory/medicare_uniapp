import request from '@/common/request.js'

// 获取论文列表
export function physicalexaminationApply(data) {
	return request.request({
		url: '/medicare/physicalexaminationApply',
		method: 'POST',
		data: data
	})
}
