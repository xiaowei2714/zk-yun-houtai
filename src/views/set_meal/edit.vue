<template>
    <div class="edit-popup">
        <popup
            ref="popupRef"
            :title="popupTitle"
            :async="true"
            width="1050px"
            @confirm="handleSubmit"
            @close="handleClose"
        >
            <el-form ref="formRef" :label-position="'top'" :model="formData" label-width="90px" :rules="formRules">
                <div style="display: flex;">
                    <div>
                        <el-form-item prop="name">
                            <template #label>
                                <span>套餐名称 <small style="color: red; font-size: 10px;margin-left: 8px">填写的时候带数字面值且只有面值的数字，比如“100元”“快充100”“四川100电费"</small></span>
                            </template>
<!--                            <span slot="label">填写的时候带数字面值且只有面值的数字，比如“100元”“快充100”“四川100电费"</span>-->
                            <el-input v-model="formData.name" clearable placeholder="请输入套餐名称" />
                        </el-form-item>
                    </div>

                </div>
                <div style="display: flex;">
                    <div style="">
                        <el-form-item label="类型" prop="type">
                            <el-select v-model="formData.type" style="width: 100px" placeholder="请选择">
                                <el-option label="话费" :value="1"></el-option>
                                <el-option label="电费" :value="2"></el-option>
                                <el-option label="话费快充" :value="3"></el-option>
                            </el-select>
                        </el-form-item>
                    </div>
                    <div style="margin-left: 20px">
                        <el-form-item label="显示端" prop="show_type">
                            <el-select v-model="formData.show_type" style="width: 130px" placeholder="请选择">
                                <el-option label="全端显示" :value="1"></el-option>
                                <el-option label="安卓端显示" :value="2"></el-option>
                                <el-option label="苹果端显示" :value="3"></el-option>
                            </el-select>
                        </el-form-item>
                    </div>
                    <div style="margin-left: 20px">
                        <el-form-item label="每日产品限制" prop="day_astrict_num">
                            <el-input v-model="formData.day_astrict_num" type="number" clearable placeholder="请输入每日产品限制" />
                        </el-form-item>
                    </div>
                    <div style="margin-left: 20px">
                        <el-form-item label="同时存在订单" prop="meanwhile_order_num">
                            <el-input v-model="formData.meanwhile_order_num" type="number" clearable placeholder="请输入同时存在订单" />
                        </el-form-item>
                    </div>
                    <div style="margin-left: 20px">
                        <el-form-item label="排序" prop="sort">
                            <el-input v-model="formData.sort" type="number" clearable placeholder="请输入排序" />
                        </el-form-item>
                    </div>
                </div>
                <div style="display: flex;margin-top: 10px">
                    <div>
                        <el-form-item label="价格" prop="price">
                            <el-input v-model="formData.price" type="number" clearable placeholder="请输入价格" />
                        </el-form-item>
                    </div>
                    <div style="margin-left: 20px">
                        <el-form-item label="折扣" prop="discount">
                            <template #label>
                                <span>折扣 <small style="color: #999999; font-size: 10px;margin-left: 8px">店铺最高可设置的售价，0代表不限制</small></span>
                            </template>
                            <el-input v-model="formData.discount" type="number" clearable placeholder="请输入折扣" />
                        </el-form-item>
                    </div>
                    <div style="margin-left: 20px">
                        <el-form-item label="运营商" prop="operator">
                            <template #label>
                                <span>运营商 <small style="color: #999999; font-size: 10px;margin-left: 8px">话费/流量必选</small></span>
                            </template>
                            <el-checkbox-group v-model="formData.operator">
                                <el-checkbox label="移动"></el-checkbox>
                                <el-checkbox label="电信"></el-checkbox>
                                <el-checkbox label="联通"></el-checkbox>
                                <el-checkbox label="虚拟"></el-checkbox>
                            </el-checkbox-group>
                        </el-form-item>
                    </div>
                </div>

                <div style="display: flex;margin-top: 10px">
                    <div>
                        <el-form-item label="禁止下单省份" prop="forbid_buy_city">
                            <template #label>
                                <span>禁止下单省份 <small style="color: #999999; font-size: 10px;margin-left: 8px">话费/流量/电费生效</small></span>
                            </template>
                            <el-input v-model="formData.forbid_buy_city" style="width: 400px" clearable placeholder="多个用英文,隔开，如:广东省,福建省" />
                        </el-form-item>
                    </div>
                </div>

                <div style="display: flex;margin-top: 10px">
                    <div>
                        <el-form-item label="允许下单号段" prop="allow_buy_nums">
                            <template #label>
                                <span>允许下单号段 <small style="color: #999999; font-size: 10px;margin-left: 8px">话费/流量生效</small></span>
                            </template>
                            <el-input v-model="formData.allow_buy_nums" style="width: 400px" clearable placeholder="多个用英文,隔开，如：147,171" />
                        </el-form-item>
                    </div>
                    <div style="margin-left: 20px">
                        <el-form-item label="禁止下单号段" prop="forbid_buy_nums">
                            <template #label>
                                <span>禁止下单号段 <small style="color: #999999; font-size: 10px;margin-left: 8px">话费/流量生效</small></span>
                            </template>
                            <el-input v-model="formData.forbid_buy_nums" style="width: 400px" clearable placeholder="多个用英文,隔开，如：147,171" />
                        </el-form-item>
                    </div>
                </div>
                <div>
                    <div style="display: flex;align-items: center">
                        <div>用户必填信息</div>
                        <el-input v-model="pageData.name" style="width: 200px;margin-left: 10px" clearable placeholder="请输入组件名称" />
                        <el-input v-model="pageData.tip" style="width: 250px;margin-left: 10px" clearable placeholder="请输入组件提示内容" />
                        <el-button type="primary" style="margin-left: 10px" @click="addInfo">新增</el-button>
<!--                        <el-select style="width: 100px;margin-left: 10px" v-model="pageData.type" placeholder="请选择组件">-->
<!--                            <el-option label="输入框" :value="1" />-->
<!--                            <el-option label="停用" :value="2" />-->
<!--                        </el-select>-->
                    </div>
                    <div style="margin-top: 15px">
                        <el-form :inline="true" :model="formData.user_required_info">
                            <el-form-item v-for="(item, index) in formData.user_required_info" :key="index" :label="item.name">
                                <el-input disabled :placeholder="item.tip" />
                            </el-form-item>
                        </el-form>

                    </div>
                </div>
                <div>
                    <div style="display: flex;align-items: center">
                        <div>商家必填信息</div>
                        <el-input v-model="pageData.name2" style="width: 200px;margin-left: 10px" clearable placeholder="请输入组件名称" />
                        <el-input v-model="pageData.tip2" style="width: 250px;margin-left: 10px" clearable placeholder="请输入组件提示内容" />
                        <el-button type="primary" style="margin-left: 10px" @click="addInfo2">新增</el-button>
<!--                                                <el-select style="width: 100px;margin-left: 10px" v-model="pageData.type" placeholder="请选择组件">-->
<!--                                                    <el-option label="输入框" :value="1" />-->
<!--                                                    <el-option label="停用" :value="2" />-->
<!--                                                </el-select>-->
                    </div>
                    <div style="margin-top: 15px">
                        <el-form :inline="true" :model="formData.merchant_required_info">
                            <el-form-item v-for="(item, index) in formData.merchant_required_info" :key="index" :label="item.name">
                                <el-input disabled :placeholder="item.tip" />
                            </el-form-item>
                        </el-form>

                    </div>
                </div>





                <el-form-item label="状态" prop="status">
                    <el-select style="width: 100px;margin-left: 10px" v-model="formData.status" placeholder="请选择状态">
                        <el-option label="上架" :value="1" />
                        <el-option label="下架" :value="2" />
                    </el-select>
<!--                    <el-input v-model="formData.status" clearable placeholder="请输入状态" />-->
                </el-form-item>
                <el-form-item label="套餐描述" prop="desc">
                    <editor class="mb-10" v-model="formData.desc" height="500"></editor>
<!--                    <el-input v-model="formData.desc" clearable placeholder="请输入用户必填信息" />-->
                </el-form-item>
<!--                <el-form-item label="商家必填信息" prop="merchant_required_info">-->
<!--                    <el-input v-model="formData.merchant_required_info" clearable placeholder="请输入商家必填信息" />-->
<!--                </el-form-item>-->



            </el-form>
        </popup>
    </div>
</template>

<script lang="ts" setup name="setMealEdit">
import type { FormInstance } from 'element-plus'
import Popup from '@/components/popup/index.vue'
import { apiSetMealAdd, apiSetMealEdit, apiSetMealDetail } from '@/api/set_meal'
import { timeFormat } from '@/utils/util'
import type { PropType } from 'vue'
defineProps({
    dictData: {
        type: Object as PropType<Record<string, any[]>>,
        default: () => ({})
    }
})
const emit = defineEmits(['success', 'close'])
const formRef = shallowRef<FormInstance>()
const popupRef = shallowRef<InstanceType<typeof Popup>>()
const mode = ref('add')


// 弹窗标题
const popupTitle = computed(() => {
    return mode.value == 'edit' ? '编辑套餐' : '新增套餐'
})

// 表单数据
const formData = reactive({
    id: '',
    name: '',
    type: '',
    show_type: '',
    price: '',
    discount: '',
    operator: [],
    forbid_buy_city: '',
    sort: '',
    day_astrict_num: '',
    meanwhile_order_num: '',
    user_required_info: [],
    merchant_required_info: [],
    allow_buy_nums: '',
    forbid_buy_nums: '',
    status: '',
    desc: '',
})

const pageData = reactive({
    name: '',
    name2: '',
    tip: '',
    tip2: '',
    // type: ''
})

const addInfo = () => {
    formData.user_required_info.push({
        name: pageData.name,
        tip: pageData.tip
    });
    pageData.name = '';
    pageData.tip = '';
}

const addInfo2 = () => {
    formData.merchant_required_info.push({
        name: pageData.name2,
        tip: pageData.tip2
    });
    pageData.name2 = '';
    pageData.tip2 = '';
}


// 表单验证
const formRules = reactive<any>({

})


// 获取详情
const setFormData = async (data: Record<any, any>) => {
    for (const key in formData) {
        if (data[key] != null && data[key] != undefined) {
            //@ts-ignore
            formData[key] = data[key]
        }
    }


}

const getDetail = async (row: Record<string, any>) => {
    const data = await apiSetMealDetail({
        id: row.id
    })
    setFormData(data)
}


// 提交按钮
const handleSubmit = async () => {
    await formRef.value?.validate()
    const data = { ...formData,  }
    mode.value == 'edit'
        ? await apiSetMealEdit(data)
        : await apiSetMealAdd(data)
    popupRef.value?.close()
    emit('success')
}

//打开弹窗
const open = (type = 'add') => {
    mode.value = type
    popupRef.value?.open()
}

// 关闭回调
const handleClose = () => {
    emit('close')
}



defineExpose({
    open,
    setFormData,
    getDetail
})
</script>
