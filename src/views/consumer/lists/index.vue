<template>
    <div>
        <el-card class="!border-none" shadow="never">
            <el-form ref="formRef" class="mb-[-16px]" :model="queryParams" :inline="true">
                <el-form-item class="w-[280px]" label="用户信息">
                    <el-input
                        v-model="queryParams.keyword"
                        placeholder="账号/昵称/手机号码"
                        clearable
                        @keyup.enter="resetPage"
                    />
                </el-form-item>
                <el-form-item label="注册时间">
                    <daterange-picker
                        v-model:startTime="queryParams.create_time_start"
                        v-model:endTime="queryParams.create_time_end"
                    />
                </el-form-item>
                <!--                <el-form-item class="w-[280px]" label="注册来源">-->
                <!--                    <el-select v-model="queryParams.channel">-->
                <!--                        <el-option-->
                <!--                            v-for="(item, key) in ClientMap"-->
                <!--                            :key="key"-->
                <!--                            :label="item"-->
                <!--                            :value="key"-->
                <!--                        />-->
                <!--                    </el-select>-->
                <!--                </el-form-item>-->
                <el-form-item>
                    <el-button type="primary" @click="resetPage">查询</el-button>
                    <el-button @click="resetParams">重置</el-button>
                    <export-data
                        class="ml-2.5"
                        :fetch-fun="getUserList"
                        :params="queryParams"
                        :page-size="pager.size"
                    />
                </el-form-item>
            </el-form>
        </el-card>
        <el-card class="!border-none mt-4" shadow="never">
            <el-table size="large" v-loading="pager.loading" :data="pager.lists">
                <el-table-column label="ID" prop="sn" min-width="100" />
                <el-table-column label="头像" min-width="100">
                    <template #default="{ row }">
                        <el-avatar :src="row.avatar" :size="50" />
                    </template>
                </el-table-column>
                <el-table-column label="昵称" prop="nickname" min-width="100" />
                <el-table-column label="账号" prop="account" min-width="120" />
                <el-table-column label="上级" prop="parent_user" min-width="120" />
                <el-table-column label="下级" prop="subordinate_user" min-width="120" />
                <el-table-column label="余额" prop="user_money" min-width="120">
                    <template #default="{ row }">
                        <el-button
                            type="primary"
                            link
                            @click="handleMoneyLog(row)"
                        >
                            {{ row.user_money }}
                        </el-button>
                    </template>
                </el-table-column>
                <el-table-column label="冻结金额" prop="freeze_money" min-width="120" />
                <el-table-column label="今日消费" prop="today_price" min-width="120" />
                <el-table-column label="总消费" prop="total_price" min-width="120" />
                <el-table-column label="对外code" prop="external_sn" min-width="120" />
                <!--                <el-table-column label="手机号码" prop="mobile" min-width="100" />-->
                <!--                <el-table-column label="注册来源" prop="channel" min-width="100" />-->
                <el-table-column label="注册时间" prop="create_time" min-width="120" />
                <el-table-column label="操作" width="120" fixed="right">
                    <template #default="{ row }">
                        <el-button
                            v-perms="['notice/edit']"
                            type="primary"
                            link
                            @click="handleDiscount(row)"
                        >
                            折扣
                        </el-button>
                        <el-button v-perms="['user.user/detail']" type="primary" link>
                            <router-link
                                :to="{
                                    path: getRoutePath('user.user/detail'),
                                    query: {
                                        id: row.id
                                    }
                                }"
                            >
                                详情
                            </router-link>
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="flex justify-end mt-4">
                <pagination v-model="pager" @change="getLists" />
            </div>
        </el-card>
        <set-discount
            v-model:show="pageData.show"
            :value="pageData.id"
            :list="pageData.meal_list"
            @confirm="handleConfirmAdjust"
            @update-discount="handleDiscountUpdate"
        />
        <use-money-list
            v-model:show="moneyLog.show"
            :value="moneyLog.id"
            ref="childRef"
        />

    </div>
</template>
<script lang="ts" setup name="consumerLists">
import { getMealList, getUserList, saveMealList } from '@/api/consumer'
import { usePaging } from '@/hooks/usePaging'
import { getRoutePath } from '@/router'
import SetDiscount from '@/views/consumer/components/set-discount.vue'
import UseMoneyList from '@/views/consumer/components/use-money-list.vue'

const queryParams = reactive({
    keyword: '',
    channel: '',
    create_time_start: '',
    create_time_end: ''
})

const pageData = reactive({
    id: 0,
    show: false,
    meal_list: [] as Array<{
        id: any
        name: string
        type: number
        discount: any
        user_id: any
        // 其他必要字段...
    }>,
    new_list: [] as Array<{
        id: any
        name: string
        type: number
        discount: any
        user_id: any
        // 其他必要字段...
    }>
})

const moneyLog = reactive({
    id: 0,
    show: false
})

const handleDiscountUpdate = (value: any, index: any) => {
    // console.log(value)
    // console.log(index)
    //
    // const newItem = {
    //     id: pageData.meal_list[value.index].id,
    //     user_id: pageData.meal_list[value.index].user_id,
    //     discount: value.value,
    // }
    // pageData.new_list.push(newItem)
    // console.log(pageData.new_list)
    pageData.meal_list[value.index].discount = value.value
}

const handleDiscount = async (row: any) => {
    pageData.id = row.id
    const returnData = await getMealList({ user_id: row.id })
    pageData.meal_list = returnData.list
    pageData.show = true
}

const childRef = ref()
const openChilden = (id) => {
    childRef.value.getUserMoneyList(id)
}
const handleMoneyLog = async (row: any) => {
    moneyLog.id = row.id
    moneyLog.show = true

    openChilden(row.id)
}

const handleConfirmAdjust = async (value: any) => {
    // console.log(pageData.meal_list)
    await saveMealList({ list: pageData.meal_list })
    // await adjustMoney({ user_id: route.query.id, ...value })
    pageData.show = false
    getLists()
    // getDetails()
}

const { pager, getLists, resetPage, resetParams } = usePaging({
    fetchFun: getUserList,
    params: queryParams
})
onActivated(() => {
    getLists()
})

getLists()
</script>
