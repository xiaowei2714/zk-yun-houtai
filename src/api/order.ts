import request from '@/utils/request'

// 订单列表
export function apiOrderLists(params: any) {
    return request.get({ url: '/order/lists', params })
}

// 添加订单
export function apiOrderAdd(params: any) {
    return request.post({ url: '/order/add', params })
}

// 编辑订单
export function apiOrderEdit(params: any) {
    return request.post({ url: '/order/edit', params })
}

// 删除订单
export function apiOrderDelete(params: any) {
    return request.post({ url: '/order/delete', params })
}

// 订单详情
export function apiOrderDetail(params: any) {
    return request.get({ url: '/order/detail', params })
}