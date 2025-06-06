import request from '@/utils/request'

// 订单列表
export function apiLists(params: any) {
    return request.get({ url: '/consumeRecharge/lists', params })
}

// 订单金额
export function apiSum(params: any) {
    return request.get({ url: '/consumeRecharge/sum', params })
}

// 设置为充值中
export function apiSetRecharging(params: any) {
    return request.post({ url: '/consumeRecharge/setRecharging', params })
}

// 设置为批量充值中
export function apiSetBatchRecharging(params: any) {
    return request.post({ url: '/consumeRecharge/setBatchRecharging', params })
}

// 设置为充值成功
export function apiSetSuccess(params: any) {
    return request.post({ url: '/consumeRecharge/setSuccess', params })
}

// 设置为批量充值成功
export function apiSetBatchSuccess(params: any) {
    return request.post({ url: '/consumeRecharge/setBatchSuccess', params })
}

// 设置为部分成功
export function apiSetPartSuccess(params: any) {
    return request.post({ url: '/consumeRecharge/setPartSuccess', params })
}

// 设置为充值失败
export function apiSetFail(params: any) {
    return request.post({ url: '/consumeRecharge/setFail', params })
}

// 设置为批量充值失败
export function apiSetBatchFail(params: any) {
    return request.post({ url: '/consumeRecharge/setBatchFail', params })
}

// 更新余额
export function apiGenBalance(params: any) {
    return request.post({ url: '/consumeRecharge/genBalance', params })
}

// 批量更新余额
export function apiBatchGenBalance(params: any) {
    return request.post({ url: '/consumeRecharge/batchGenBalance', params })
}
