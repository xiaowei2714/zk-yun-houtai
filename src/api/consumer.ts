import request from '@/utils/request'

// 用户列表
export function getUserList(params: any) {
    return request.get({ url: '/user.user/lists', params }, { ignoreCancelToken: true })
}

// 用户详情
export function getUserDetail(params: any) {
    return request.get({ url: '/user.user/detail', params })
}

// 用户编辑
export function userEdit(params: any) {
    return request.post({ url: '/user.user/edit', params })
}

// 修改密码
export function setPassword(params: any) {
    return request.post({ url: '/user.user/resetPassword', params })
}

export function getMealList(params: any) {
    return request.get({ url: '/user.user/getMealList', params })
}

// 用户编辑
export function adjustMoney(params: any) {
    return request.post({ url: '/user.user/adjustMoney', params })
}

export function saveMealList(params: any) {
    return request.post({ url: '/user.user/saveMealList', params })
}

// 账单
export function getUserMoneyLog(params: any) {
    return request.get({ url: '/user.user/userMoneyLog', params })
}
