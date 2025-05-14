import request from '@/utils/request'

// 分站列表
export function apiSubstationLists(params: any) {
    return request.get({ url: '/substation/lists', params })
}

// 添加分站
export function apiSubstationAdd(params: any) {
    return request.post({ url: '/substation/add', params })
}

// 编辑分站
export function apiSubstationEdit(params: any) {
    return request.post({ url: '/substation/edit', params })
}

// 删除分站
export function apiSubstationDelete(params: any) {
    return request.post({ url: '/substation/delete', params })
}

// 分站详情
export function apiSubstationDetail(params: any) {
    return request.get({ url: '/substation/detail', params })
}