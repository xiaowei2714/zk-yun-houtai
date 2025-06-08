<template>
    <div>
        <el-card class="!border-none mb-4" shadow="never">
            <el-form
                class="mb-[-16px]"
                :model="queryParams"
                inline
            >
                <el-form-item label="单号" prop="sn">
                    <el-input class="w-[280px]" v-model="queryParams.sn" clearable placeholder="请输入单号" />
                </el-form-item>
                <el-form-item label="充值账户" prop="account">
                    <el-input-tag class="w-[280px]" v-model="queryParams.account" clearable placeholder="请输入充值账户"
                                  :tag-type="tagType"
                                  :tag-effect="tagEffect" />
                </el-form-item>
                <el-form-item label="运营商" prop="account_type">
                    <el-select style="width: 150px;margin-left: 10px" v-model="queryParams.account_type"
                               placeholder="请选择运营商">
                        <el-option label="全部" :value="0" />
                        <el-option label="移动" :value="1" />
                        <el-option label="联通" :value="2" />
                        <el-option label="电信" :value="3" />
                        <el-option label="虚拟" :value="4" />
                    </el-select>
                    <!--                    <el-input class="w-[280px]" v-model="queryParams.account_type" clearable placeholder="请输入运营商" />-->
                </el-form-item>
                <el-form-item label="状态" prop="status">
                    <el-select style="width: 150px;margin-left: 10px" v-model="queryParams.status"
                               placeholder="请选择状态">
                        <el-option label="全部" :value="0" />
                        <el-option label="待充值" :value="1" />
                        <el-option label="充值中" :value="2" />
                        <el-option label="充值成功" :value="3" />
                        <el-option label="部分成功" :value="5" />
                        <el-option label="充值失败" :value="4" />
                    </el-select>
                </el-form-item>
                <el-form-item label="时间" prop="start_time">
                    <daterange-picker
                        v-model:startTime="queryParams.start_time"
                        v-model:endTime="queryParams.end_time"
                    />
                </el-form-item>
                <el-form-item label="类型" prop="type">
                    <el-select style="width: 150px;margin-left: 10px" v-model="queryParams.type"
                               placeholder="请选择类型">
                        <el-option label="全部" :value="0" />
                        <el-option label="话费" :value="1" />
                        <el-option label="电费" :value="2" />
                        <el-option label="话费快充" :value="3" />
                        <el-option label="礼品卡" :value="4" />
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="findData">查询</el-button>
                    <el-button @click="resetParams">重置</el-button>
                    <export-data
                        class="ml-2.5"
                        :fetch-fun="apiLists"
                        :params="queryParams"
                        :page-size="pager.size"
                    />
                </el-form-item>
            </el-form>
        </el-card>
        <el-card class="!border-none" v-loading="pager.loading" shadow="never">
            <div style="display: flex;align-items: center;">
                <el-button
                    :disabled="!selectData.length"
                    type="primary"
                    @click="handleBatchGenBalance(selectData)"
                >
                    批量查询余额
                </el-button>
                <el-button
                    :disabled="!selectData.length"
                    type="warning"
                    @click="handleBatchRecharging(selectData)"
                >
                    批量充值中
                </el-button>
                <el-button
                    :disabled="!selectData.length"
                    type="success"
                    @click="handleBatchSuccess(selectData)"
                >
                    批量成功
                </el-button>
                <el-button
                    :disabled="!selectData.length"
                    type="danger"
                    @click="handleBatchFail(selectData)"
                >
                    批量失败
                </el-button>
                <div style="margin-left: 20px">结果总金额：<span>￥{{ querySum.sum }}</span></div>
            </div>

            <div class="mt-4">
                <el-table :data="pager.lists" @selection-change="handleSelectionChange">
                    <el-table-column type="selection" width="55" />
                    <el-table-column label="单号" prop="sn" show-overflow-tooltip min-width="180" />
                    <el-table-column label="用户ID" prop="user_show" show-overflow-tooltip min-width="120" />
                    <el-table-column label="充值账户" prop="account_show" show-overflow-tooltip min-width="110" />
                    <el-table-column label="运营商" prop="account_type_show" show-overflow-tooltip min-width="70" />
                    <el-table-column label="名称" prop="name_show" show-overflow-tooltip />
                    <el-table-column label="金额" prop="price" show-overflow-tooltip />
                    <el-table-column label="充值前余额" prop="up_price" show-overflow-tooltip min-width="95" />
                    <el-table-column label="充值后余额" prop="down_price" show-overflow-tooltip min-width="95" />
                    <el-table-column label="到账金额" prop="balances_price" show-overflow-tooltip />
                    <el-table-column label="支付金额" prop="pay_price" show-overflow-tooltip min-width="100">
                        <template #default="{ row }">
                            <span style="color: #EB8E26">{{ row.pay_price }}Y币</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="类型" prop="type" show-overflow-tooltip min-width="82">
                        <template #default="{ row }">
                            <span v-if="row.type == 1" style="color: #8A2BE2;">
                                话费
                            </span>
                            <span v-else-if="row.type == 2" style="color: #FFD700">
                                电费
                            </span>
                            <span v-else-if="row.type == 3" style="color: #4ECDC4;">
                                话费快充
                            </span>
                            <span v-else-if="row.type == 4" style="color: #FF4447">
                                礼品卡
                            </span>
                            <span v-else></span>
                        </template>
                    </el-table-column>
                    <el-table-column label="状态" prop="status" show-overflow-tooltip min-width="82">
                        <template #default="{ row }">
                            <span v-if="row.status == 1">
                                待充值
                            </span>
                            <span v-else-if="row.status == 2" style="color: #F8AC59">
                                充值中
                            </span>
                            <span v-else-if="row.status == 3" style="color: #1AB394;">
                                充值成功
                            </span>
                            <span v-else-if="row.status == 4" style="color: #E24555">
                                充值失败
                            </span>
                            <span v-else-if="row.status == 5" style="color: #8d2aa2">
                                部分成功
                            </span>
                            <span v-else></span>
                        </template>
                    </el-table-column>
                    <el-table-column label="时间" prop="start_time" min-width="210">
                        <template #default="{ row }">
                            <span v-if="row.ctime != ''" style="color: red;">
                                耗时：{{ row.ctime }}<br />
                            </span>
                            <span>支付：{{ row.time }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作管理员" prop="admin_name" show-overflow-tooltip min-width="95" />
                    <el-table-column label="操作" width="250" fixed="right">
                        <template #default="{ row }">
                            <el-button
                                type="primary"
                                style="border-color: #5B87F0; background-color: #5B87F0"
                                @click="handleGenBalance(row.id)"
                            >
                                更新
                            </el-button>
                            <el-button
                                type="primary"
                                style="border-color: #1AB394; background-color: #1AB394"
                                @click="handleSuccess(row.id)"
                            >
                                成功
                            </el-button>
                            <el-button
                                type="primary"
                                style="width: 80px; padding-left: 0; border-color: #5B87F0; background-color: #E6EDFD; color: #5B87F0"
                                @click="handleShow(row)"
                            >
                                充值中
                                <i v-if="!row.sa" class="triangle"></i>
                                <i v-else class="active"></i>
                            </el-button>
                            <div v-if="row.sa" class="dropdown-content">
                                <a @click="handleRecharging(row.id)" class="first-a" tabindex="0">充值中</a>
                                <a @click="handlePartSuccess(row)" class="first-a" tabindex="0">部分成功</a>
                                <a @click="handleFail(row.id)" tabindex="0">失败</a>
                            </div>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <div class="flex mt-4 justify-end">
                <pagination v-model="pager" @change="getLists" />
            </div>
        </el-card>

        <part-success
            v-model:show="pageData.show"
            :id="pageData.id"
            :price="pageData.price"
            :pay_price="pageData.pay_price"
            @confirm="handlePartConfirm"
        />

    </div>
</template>

<script lang="ts" setup name="orderLists">
import { usePaging } from '@/hooks/usePaging'
import { useDictData } from '@/hooks/useDictOptions'
import {
    apiLists,
    apiSum,
    apiSetRecharging,
    apiSetBatchRecharging,
    apiSetSuccess,
    apiSetBatchSuccess,
    apiSetFail,
    apiSetBatchFail,
    apiGenBalance,
    apiBatchGenBalance, apiSetPartSuccess
} from '@/api/consume_recharge'
import feedback from '@/utils/feedback'
import type { TagProps } from 'element-plus'
import PartSuccess from '@/views/consume_recharge/components/part-success.vue'

// 是否显示编辑框
const showEdit = ref(false)

// 查询条件
const queryParams = reactive({
    sn: '',
    account: [],
    account_type: '',
    status: '',
    start_time: '',
    end_time: '',
    type: ''
})

// 查询出的数据
const querySum = reactive({
    sum: '0.00'
})

// 选中数据
const selectData = ref<any[]>([])

const tagType = ref<TagProps['type']>('primary')
const tagEffect = ref<TagProps['effect']>('plain')

const pageData = reactive({
    id: 0,
    price: '',
    pay_price: '',
    show: false,
})
// 表格选择后回调事件
const handleSelectionChange = (val: any[]) => {
    selectData.value = val.map(({ id }) => id)
}

// 获取字典数据
const { dictData } = useDictData('')

// 分页相关
const { pager, getLists, resetParams, resetPage } = usePaging({
    fetchFun: apiLists,
    params: queryParams
})

const findData = async () => {
    resetPage()
    getSum()
}

// 设置充值中
const handleRecharging = async (id: number | any[]) => {
    await feedback.confirm('确定要设置充值中？')
    await apiSetRecharging({ id })
    getLists()
}

// 设置批量充值中
const handleBatchRecharging = async (data: any[]) => {
    const ids = []
    data.map(item => {
        ids.unshift(item)
    })

    await feedback.confirm('确定要设置批量充值中？')
    await apiSetBatchRecharging({ ids })
    getLists()
}

// 设置成功
const handleSuccess = async (id: number | any[]) => {
    await feedback.confirm('确定要设置成功？')
    await apiSetSuccess({ id })
    getLists()
}

// 设置批量成功
const handleBatchSuccess = async (data: any[]) => {
    const ids = []
    data.map(item => {
        ids.unshift(item)
    })

    await feedback.confirm('确定要设置批量成功？')
    await apiSetBatchSuccess({ ids })
    getLists()
}

// 点击部分成功
const handlePartSuccess = async (row: any) => {
    pageData.id = row.id
    pageData.price = row.price
    pageData.pay_price = row.pay_price
    pageData.show = true
}

// 部分成功表单提交
const handlePartConfirm = async (value: any) => {
    await feedback.confirm('确定要设置部分成功？')
    pageData.show = false
    await apiSetPartSuccess(value)
    getLists()
}

// 设置失败
const handleFail = async (id: number | any[]) => {
    await feedback.confirm('确定要设置失败？')
    await apiSetFail({ id })
    getLists()
}

// 设置批量失败
const handleBatchFail = async (data: any[]) => {
    const ids = []
    data.map(item => {
        ids.unshift(item)
    })

    await feedback.confirm('确定要设置批量失败？')
    await apiSetBatchFail({ ids })
    getLists()
}

// 更新余额
const handleGenBalance = async (id: number | any[]) => {
    await feedback.confirm('确定要更新余额？')
    await apiGenBalance({ id })
    getLists()
}

// 批量更新余额
const handleBatchGenBalance = async (data: any[]) => {
    const ids = []
    data.map(item => {
        ids.unshift(item)
    })

    await feedback.confirm('确定要批量更新余额？')
    await apiBatchGenBalance({ ids })
    getLists()
}

// 展示全部
const handleShow = async (data: any) => {
    data.sa = !data.sa
}

const getSum = async () => {
    const tmp = await apiSum(queryParams)
    querySum.sum = tmp.sum
}

getLists()
getSum()
</script>

<style>
/* CSS绘制小三角‌:ml-citation{ref="1,4" data="citationList"} */
.triangle, .active {
    position: absolute;
    right: 22px;
    top: 50%;
    transform: translateY(-50%);
    width: 0;
    height: 0;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-top: 6px solid #5B87F0;
    transition: transform 0.3s;
}

.active {
    top: 13%;
    transform: translateY(-50%) rotate(180deg);
}

.dropdown-content {
    position: relative;
    width: 90px;
    background: #fff;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    margin-top: 5px;
    margin-left: 137px;
    border: 1px solid #5B87F0;
    border-radius: 4px;
    transition: opacity 0.3s;
    z-index: 100;
}

.dropdown-content a {
    display: block;
    margin: 0 15px;
    padding: 10px 0;
    color: #333;
    text-decoration: none;
    transition: background 0.2s;
    text-align: center;
    z-index: 200;
    cursor: pointer;
}

.first-a {
    border-bottom: 1px solid #5B87F0;
}

.dropdown-content a:hover {
    background: #f8f9fa;
}
</style>

