import request from '@/utils/request'

// 提现列表
export function apiWithdrawLists(params: any) {
    return request.get({ url: '/withdraw/lists', params })
}

// 添加提现
export function apiWithdrawAdd(params: any) {
    return request.post({ url: '/withdraw/add', params })
}

// 编辑提现
export function apiWithdrawEdit(params: any) {
    return request.post({ url: '/withdraw/edit', params })
}

// 删除提现
export function apiWithdrawDelete(params: any) {
    return request.post({ url: '/withdraw/delete', params })
}

// 提现详情
export function apiWithdrawDetail(params: any) {
    return request.get({ url: '/withdraw/detail', params })
}

export function apiWithdrawInfo(params: any) {
    return request.get({ url: '/withdraw/info', params })
}

export function apiWithdrawSuccess(params: any) {
    return request.post({ url: '/withdraw/successt', params })
}

export function apiWithdrawFail(params: any) {
    return request.post({ url: '/withdraw/txFail', params })
}