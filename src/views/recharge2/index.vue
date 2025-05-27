<template>
    <div>
        <!--        <el-card class="!border-none mb-4" shadow="never">-->
        <!--            <el-form-->
        <!--                class="mb-[-16px]"-->
        <!--                :model="queryParams"-->
        <!--                inline-->
        <!--            >-->
        <!--                <el-form-item label="订单号" prop="order_no">-->
        <!--                    <el-input class="w-[280px]" v-model="queryParams.order_no" clearable placeholder="请输入订单号" />-->
        <!--                </el-form-item>-->
        <!--                <el-form-item>-->
        <!--                    <el-button type="primary" @click="resetPage">查询</el-button>-->
        <!--                    <el-button @click="resetParams">重置</el-button>-->
        <!--                </el-form-item>-->
        <!--            </el-form>-->
        <!--        </el-card>-->
        <div style="display: flex;margin-bottom: 20px;margin-top: 20px;justify-content: space-around">
            <div
                style="width: 384px;height: 100px;background: #FFFFFF;box-shadow: 10px 20px 60px 1px rgba(0,0,0,0.05);border-radius: 20px 20px 20px 20px;">
                <div style="display: flex;justify-content: space-between;margin-left: 30px;margin-right: 30px">
                    <div style="margin-top: -20px;margin-left: 6px">
                        <img src="../../assets/icons/jinri.png" style="width: 60px;height: 60px" alt="">
                    </div>
                    <div
                        style="font-weight: bold;font-size: 24px;color: #000000;font-style: normal;text-transform: none;margin-top: 15px;text-align: right;">
                        {{ querySum.today_sum }}
                    </div>
                </div>
                <div
                    style="display: flex;justify-content: space-between;margin-left: 30px;margin-right: 30px;margin-top: -10px">
                    <div
                        style="font-weight: 400;font-size: 13px;color: #000000;font-style: normal;text-transform: none;margin-top: 15px">
                        今日充值金额
                    </div>
                    <div
                        style="font-weight: 400;font-size: 13px;color: #000000;font-style: normal;text-transform: none;margin-top: 15px">
                        {{ querySum.today_count }}笔
                    </div>
                </div>
            </div>
            <div
                style="width: 384px;height: 100px;background: #FFFFFF;box-shadow: 10px 20px 60px 1px rgba(0,0,0,0.05);border-radius: 20px 20px 20px 20px;">
                <div style="display: flex;justify-content: space-between;margin-left: 30px;margin-right: 30px">
                    <div style="margin-top: -20px;margin-left: 6px">
                        <img src="../../assets/icons/7day.png" style="width: 60px;height: 60px" alt="">
                    </div>
                    <div
                        style="font-weight: bold;font-size: 24px;color: #000000;font-style: normal;text-transform: none;margin-top: 15px;text-align: right;">
                        {{ querySum.seven_days_sum }}
                    </div>
                </div>
                <div
                    style="display: flex;justify-content: space-between;margin-left: 30px;margin-right: 30px;margin-top: -10px">
                    <div
                        style="font-weight: 400;font-size: 13px;color: #000000;font-style: normal;text-transform: none;margin-top: 15px">
                        7天充值金额
                    </div>
                    <div
                        style="font-weight: 400;font-size: 13px;color: #000000;font-style: normal;text-transform: none;margin-top: 15px">
                        {{ querySum.seven_days_count }}笔
                    </div>
                </div>
            </div>
            <div
                style="width: 384px;height: 100px;background: #FFFFFF;box-shadow: 10px 20px 60px 1px rgba(0,0,0,0.05);border-radius: 20px 20px 20px 20px;">
                <div style="display: flex;justify-content: space-between;margin-left: 30px;margin-right: 30px">
                    <div style="margin-top: -20px;margin-left: 6px">
                        <img src="../../assets/icons/30day.png" style="width: 60px;height: 60px" alt="">
                    </div>
                    <div
                        style="font-weight: bold;font-size: 24px;color: #000000;font-style: normal;text-transform: none;margin-top: 15px;text-align: right;">
                        {{ querySum.month_sum }}
                    </div>
                </div>
                <div
                    style="display: flex;justify-content: space-between;margin-left: 30px;margin-right: 30px;margin-top: -10px">
                    <div
                        style="font-weight: 400;font-size: 13px;color: #000000;font-style: normal;text-transform: none;margin-top: 15px">
                        30天充值金额
                    </div>
                    <div
                        style="font-weight: 400;font-size: 13px;color: #000000;font-style: normal;text-transform: none;margin-top: 15px">
                        {{ querySum.month_count }}笔
                    </div>
                </div>
            </div>
            <div
                style="width: 384px;height: 100px;background: #FFFFFF;box-shadow: 10px 20px 60px 1px rgba(0,0,0,0.05);border-radius: 20px 20px 20px 20px;">
                <div style="display: flex;justify-content: space-between;margin-left: 30px;margin-right: 30px">
                    <div style="margin-top: -20px;">
                        <img src="../../assets/icons/zj.png" style="width: 60px;height: 60px" alt="">
                    </div>
                    <div
                        style="font-weight: bold;font-size: 24px;color: #000000;font-style: normal;text-transform: none;margin-top: 15px;text-align: right;">
                        {{ querySum.all_sum }}
                    </div>
                </div>
                <div
                    style="display: flex;justify-content: space-between;margin-left: 30px;margin-right: 30px;margin-top: -10px">
                    <div
                        style="font-weight: 400;font-size: 13px;color: #000000;font-style: normal;text-transform: none;margin-top: 15px">
                        总充值金额
                    </div>
                    <div
                        style="font-weight: 400;font-size: 13px;color: #000000;font-style: normal;text-transform: none;margin-top: 15px">
                        {{ querySum.all_count }}笔
                    </div>
                </div>
            </div>


        </div>
        <el-card class="!border-none" v-loading="pager.loading" shadow="never">

            <!--            <el-button-->
            <!--                v-perms="['recharge/delete']"-->
            <!--                :disabled="!selectData.length"-->
            <!--                @click="handleDelete(selectData)"-->
            <!--            >-->
            <!--                删除-->
            <!--            </el-button>-->
            <el-form
                class="mb-[-16px]"
                :model="queryParams"
                inline
            >
                <el-form-item label="订单号" prop="order_no">
                    <el-input class="w-[280px]" v-model="queryParams.order_no" clearable placeholder="请输入订单号" />
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="resetPage">查询</el-button>
                    <el-button @click="resetParams">重置</el-button>
                    <el-button @click="handleClear" type="primary">
                        <template #icon>
                            <icon name="el-icon-delete" />
                        </template>
                        清空未支付订单
                    </el-button>
                </el-form-item>
            </el-form>
            <div class="mt-4">
                <el-table :data="pager.lists" @selection-change="handleSelectionChange">
<!--                    <el-table-column type="selection" width="55" />-->
                    <el-table-column label="用户ID" prop="user_id" show-overflow-tooltip />
                    <el-table-column label="用户昵称" prop="nickname" show-overflow-tooltip />
                    <el-table-column label="金额" prop="money" show-overflow-tooltip />
                    <el-table-column label="订单描述" prop="desc" show-overflow-tooltip />
                    <el-table-column label="订单号" prop="order_no" show-overflow-tooltip min-width="140" />
                    <el-table-column label="创建时间" prop="create_time" show-overflow-tooltip min-width="120" />
                    <el-table-column label="付款时间" prop="pay_time" show-overflow-tooltip min-width="120" />
                    <el-table-column label="订单状态" prop="status" show-overflow-tooltip>
                        <template #default="{ row }">
                            <span v-if="row.status == 1">
                                待付款
                            </span>
                            <span v-else-if="row.status == 2" style="color: #F8AC59">
                                已到账
                            </span>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" width="120" fixed="right">
                        <template #default="{ row }">
                            <el-button
                                type="primary"
                                style="border-color: #5B87F0; background-color: #5B87F0"
                                @click="getLists"
                            >
                                更新
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <div class="flex mt-4 justify-end">
                <pagination v-model="pager" @change="getLists" />
            </div>
        </el-card>
        <edit-popup v-if="showEdit" ref="editRef" :dict-data="dictData" @success="getLists" @close="showEdit = false" />
    </div>
</template>

<script lang="ts" setup name="rechargeLists">
import { usePaging } from '@/hooks/usePaging'
import { useDictData } from '@/hooks/useDictOptions'
import { apiRechargeLists, apiSum, apiRechargeDelete, apiClearOrder } from '@/api/recharge'
import { timeFormat } from '@/utils/util'
import feedback from '@/utils/feedback'
import EditPopup from './edit.vue'
import { apiSetRecharging } from '@/api/consume_recharge'

const editRef = shallowRef<InstanceType<typeof EditPopup>>()
// 是否显示编辑框
const showEdit = ref(false)


// 查询条件
const queryParams = reactive({
    order_no: ''
})

// 选中数据
const selectData = ref<any[]>([])

// 汇总数据
const querySum = ref<any[]>([])

// 表格选择后回调事件
const handleSelectionChange = (val: any[]) => {
    selectData.value = val.map(({ id }) => id)
}

// 获取字典数据
const { dictData } = useDictData('')

// 分页相关
const { pager, getLists, resetParams, resetPage } = usePaging({
    fetchFun: apiRechargeLists,
    params: queryParams
})

// 汇总
const getSum = async () => {
    querySum.value = await apiSum()
}

// 添加
const handleAdd = async () => {
    showEdit.value = true
    await nextTick()
    editRef.value?.open('add')
}

// 编辑
const handleEdit = async (data: any) => {
    showEdit.value = true
    await nextTick()
    editRef.value?.open('edit')
    editRef.value?.setFormData(data)
}

// 删除
const handleDelete = async (id: number | any[]) => {
    await feedback.confirm('确定要删除？')
    await apiRechargeDelete({ id })
    getLists()
}

// 清空未支付订单
const handleClear = async (id: number | any[]) => {
    await feedback.confirm('确定要清理20分钟前未支付订单？')
    await apiClearOrder()
    getLists()
}

getLists()
getSum()
</script>

