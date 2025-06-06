import request from '@/utils/request'

// 列表
export function apiAdLists(params: any) {
    return request.get({ url: '/ad/lists', params })
}

// 上架
export function apiAdOn(params: any) {
    return request.post({ url: '/ad/onAd', params })
}

// 批量上架
export function apiAdBatchOn(params: any) {
    return request.post({ url: '/ad/batchOnAd', params })
}

// 下架
export function apiAdOff(params: any) {
    return request.post({ url: '/ad/offAd', params })
}

// 批量下架
export function apiAdBatchOff(params: any) {
    return request.post({ url: '/ad/batchOffAd', params })
}

// 删除
export function apiAdDelete(params: any) {
    return request.post({ url: '/ad/delete', params })
}
