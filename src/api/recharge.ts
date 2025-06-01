import request from '@/utils/request'

// 充值列表
export function apiRechargeLists(params: any) {
    return request.get({ url: '/recharge/lists', params })
}

// 汇总数据
export function apiSum() {
    return request.get({ url: '/recharge/sum' })
}

export function apiClearOrder() {
    return request.get({ url: '/recharge/clear' })
}

export function apiOrderSuccess(params: any) {
    return request.post({ url: '/recharge/setSuccess', params })
}

export function apiOrderBatchSuccess(params: any) {
    return request.post({ url: '/recharge/setBatchSuccess', params })
}

// 添加充值
export function apiRechargeAdd(params: any) {
    return request.post({ url: '/recharge/add', params })
}

// 编辑充值
export function apiRechargeEdit(params: any) {
    return request.post({ url: '/recharge/edit', params })
}

// 删除充值
export function apiRechargeDelete(params: any) {
    return request.post({ url: '/recharge/delete', params })
}

// 充值详情
export function apiRechargeDetail(params: any) {
    return request.get({ url: '/recharge/detail', params })
}
