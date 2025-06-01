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

// 取消数字交易
export function apiAdOrderCancel(params: any) {
    return request.post({ url: '/ad_order/cancelOrder', params })
}

// 取消数字交易
export function apiAdOrderBatchCancel(params: any) {
    return request.post({ url: '/ad_order/batchCancelOrder', params })
}

// 成功数字交易
export function apiAdOrderComplete(params: any) {
    return request.post({ url: '/ad_order/completeOrder', params })
}

// 成功数字交易
export function apiAdOrderBatchComplete(params: any) {
    return request.post({ url: '/ad_order/batchCompleteOrder', params })
}

// 删除数字交易
export function apiAdOrderDelete(params: any) {
    return request.post({ url: '/ad_order/delete', params })
}

// 数字交易详情
export function apiAdOrderDetail(params: any) {
    return request.get({ url: '/ad_order/detail', params })
}
