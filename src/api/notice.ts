import request from '@/utils/request'

// 公告列表
export function apiNoticeLists(params: any) {
    return request.get({ url: '/notice/lists', params })
}

// 添加公告
export function apiNoticeAdd(params: any) {
    return request.post({ url: '/notice/add', params })
}

// 编辑公告
export function apiNoticeEdit(params: any) {
    return request.post({ url: '/notice/edit', params })
}

// 删除公告
export function apiNoticeDelete(params: any) {
    return request.post({ url: '/notice/delete', params })
}

// 公告详情
export function apiNoticeDetail(params: any) {
    return request.get({ url: '/notice/detail', params })
}