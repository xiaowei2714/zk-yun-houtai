import request from '@/utils/request'

// 工单列表
export function apiOrderJobLists(params: any) {
    return request.get({ url: '/order_job/lists', params })
}

// 添加工单
export function apiOrderJobAdd(params: any) {
    return request.post({ url: '/order_job/add', params })
}

// 编辑工单
export function apiOrderJobEdit(params: any) {
    return request.post({ url: '/order_job/edit', params })
}

// 删除工单
export function apiOrderJobDelete(params: any) {
    return request.post({ url: '/order_job/delete', params })
}

// 工单详情
export function apiOrderJobDetail(params: any) {
    return request.get({ url: '/order_job/detail', params })
}