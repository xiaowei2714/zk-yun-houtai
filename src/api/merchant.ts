import request from '@/utils/request'

// 商家列表
export function apiMerchantLists(params: any) {
    return request.get({ url: '/merchant/lists', params })
}

// 添加商家
export function apiMerchantAdd(params: any) {
    return request.post({ url: '/merchant/add', params })
}

// 编辑商家
export function apiMerchantEdit(params: any) {
    return request.post({ url: '/merchant/edit', params })
}

// 删除商家
export function apiMerchantDelete(params: any) {
    return request.post({ url: '/merchant/delete', params })
}

// 商家详情
export function apiMerchantDetail(params: any) {
    return request.get({ url: '/merchant/detail', params })
}