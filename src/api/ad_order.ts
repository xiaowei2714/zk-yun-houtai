import request from '@/utils/request'

// 数字交易列表
export function apiAdOrderLists(params: any) {
    return request.get({ url: '/ad_order/lists', params })
}

// 添加数字交易
export function apiAdOrderAdd(params: any) {
    return request.post({ url: '/ad_order/add', params })
}

// 编辑数字交易
export function apiAdOrderEdit(params: any) {
    return request.post({ url: '/ad_order/edit', params })
}

// 删除数字交易
export function apiAdOrderDelete(params: any) {
    return request.post({ url: '/ad_order/delete', params })
}

// 数字交易详情
export function apiAdOrderDetail(params: any) {
    return request.get({ url: '/ad_order/detail', params })
}