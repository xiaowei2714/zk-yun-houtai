import request from '@/utils/request'

// 套餐列表
export function apiSetMealLists(params: any) {
    return request.get({ url: '/set_meal/lists', params })
}

// 添加套餐
export function apiSetMealAdd(params: any) {
    return request.post({ url: '/set_meal/add', params })
}

// 编辑套餐
export function apiSetMealEdit(params: any) {
    return request.post({ url: '/set_meal/edit', params })
}

// 删除套餐
export function apiSetMealDelete(params: any) {
    return request.post({ url: '/set_meal/delete', params })
}

// 套餐详情
export function apiSetMealDetail(params: any) {
    return request.get({ url: '/set_meal/detail', params })
}