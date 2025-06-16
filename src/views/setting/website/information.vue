<!-- 网站信息 -->
<template>
    <div class="website-information">
        <el-form
            ref="formRef"
            :rules="rules"
            class="ls-form"
            :model="formData"
            label-width="120px"
            scroll-to-error
        >
            <el-card shadow="never" class="!border-none">
                <el-tabs v-model="queryParams.type">
                    <el-tab-pane label="后台设置" :name="1">
                        <el-form-item label="网站名称" prop="name">
                            <div class="w-80">
                                <el-input
                                    v-model.trim="formData.name"
                                    placeholder="请输入网站名称"
                                    maxlength="30"
                                    show-word-limit
                                />
                            </div>
                        </el-form-item>
                        <el-form-item label="网站图标" prop="web_favicon" required>
                            <div>
                                <material-picker v-model="formData.web_favicon" :limit="1" />
                                <div class="form-tips">建议尺寸：100*100像素，支持jpg，jpeg，png格式</div>
                            </div>
                        </el-form-item>
                        <el-form-item label="网站LOGO" prop="web_logo" required>
                            <div>
                                <material-picker v-model.trim="formData.web_logo" :limit="1" />
                                <div class="form-tips">建议尺寸：100*100像素，支持jpg，jpeg，png格式</div>
                            </div>
                        </el-form-item>
                        <el-form-item label="登录页广告图" prop="login_image" required>
                            <div>
                                <material-picker v-model.trim="formData.login_image" :limit="1" />
                                <div class="form-tips">建议尺寸：100*100像素，支持jpg，jpeg，png格式</div>
                            </div>
                        </el-form-item>
                    </el-tab-pane>

                    <el-tab-pane label="前台设置" :name="2">
                        <el-form-item label="前台名称" prop="shop_name">
                            <div class="w-80">
                                <el-input
                                    v-model.trim="formData.shop_name"
                                    placeholder="请输入前台名称"
                                    maxlength="30"
                                    show-word-limit
                                ></el-input>
                            </div>
                        </el-form-item>
                        <el-form-item label="网站图标" prop="web_favicon" required>
                            <div>
                                <material-picker v-model="formData.h5_favicon" :limit="1" />
                                <div class="form-tips">建议尺寸：100*100像素，支持jpg，jpeg，png格式</div>
                            </div>
                        </el-form-item>
                        <el-form-item label="前台LOGO" prop="shop_logo">
                            <div>
                                <material-picker v-model="formData.shop_logo" :limit="1" />
                                <div class="form-tips">建议尺寸：100*100px，支持jpg，jpeg，png格式</div>
                            </div>
                        </el-form-item>
                        <el-form-item label="首页广告图" prop="index_banner">
                            <div>
                                <material-picker v-model="formData.index_banner" :limit="1" />
                                <div class="form-tips">建议尺寸：100*100px，支持jpg，jpeg，png格式</div>
                            </div>
                        </el-form-item>
                        <el-form-item label="参考汇率" prop="reference_rate">
                            <div class="w-80">
                                <el-input
                                    type="number"
                                    v-model.trim="formData.reference_rate"
                                    placeholder="请输入参考汇率"
                                ></el-input>
                            </div>
                        </el-form-item>
                        <el-form-item label="查询话费" prop="query_hf">
                            <div class="w-80">
                                <el-input
                                    type="number"
                                    v-model.trim="formData.query_hf"
                                    placeholder="请输入查询话费"
                                ></el-input>
                                <div class="form-tips">查询一个电话号码话费所需扣除的Y币</div>
                            </div>
                        </el-form-item>
                        <el-form-item label="查询电费" prop="query_df">
                            <div class="w-80">
                                <el-input
                                    type="number"
                                    v-model.trim="formData.query_df"
                                    placeholder="请输入查询电费"
                                ></el-input>
                                <div class="form-tips">查询一个电费所需扣除的Y币</div>
                            </div>
                        </el-form-item>
                        <el-form-item label="礼品卡折扣" prop="card_discount">
                            <div class="w-80">
                                <el-input
                                    type="number"
                                    v-model.trim="formData.card_discount"
                                    placeholder="请输入礼品卡折扣"
                                ></el-input>
                                <div class="form-tips">礼品卡折扣</div>
                            </div>
                        </el-form-item>
                        <el-form-item label="分站价格" prop="substation_price">
                            <div class="w-80">
                                <el-input
                                    type="number"
                                    v-model.trim="formData.substation_price"
                                    placeholder="请输入分站价格"
                                ></el-input>
                                <div class="form-tips">开通分站所需的Y币</div>
                            </div>
                        </el-form-item>
                        <el-form-item label="充值网络" prop="recharge_network">
                            <div class="w-80">
                                <el-input
                                    v-model.trim="formData.recharge_network"
                                    placeholder="请输入充值网络"
                                    maxlength="30"
                                    show-word-limit
                                ></el-input>
                                <div class="form-tips">充值所需要的网络</div>
                            </div>
                        </el-form-item>
                        <el-form-item label="充值地址" prop="recharge_address">
                            <div class="w-80">
                                <el-input
                                    v-model.trim="formData.recharge_address"
                                    placeholder="请输入充值地址"
                                    maxlength="60"
                                    show-word-limit
                                ></el-input>
                                <div class="form-tips">充值所需要的地址</div>
                            </div>
                        </el-form-item>
                    </el-tab-pane>

                    <el-tab-pane label="分成设置" :name="7">
                        <div class="x_title">话费充值</div>
                        <el-form-item label="一级比例" prop="phone_first_ratio">
                            <div class="w-80">
                                <el-input
                                    type="number"
                                    v-model.trim="formData.phone_first_ratio"
                                    placeholder="请输入第一级比例分成（百分制）"
                                    maxlength="30"
                                    show-word-limit
                                ></el-input>
                            </div>
                        </el-form-item>
                        <el-form-item label="二级比例" prop="phone_second_ratio">
                            <div class="w-80">
                                <el-input
                                    type="number"
                                    v-model.trim="formData.phone_second_ratio"
                                    placeholder="请输入第二级比例分成（百分制）"
                                    maxlength="30"
                                ></el-input>
                            </div>
                        </el-form-item>
                        <el-form-item label="三级比例" prop="phone_three_ratio">
                            <div class="w-80">
                                <el-input
                                    type="number"
                                    v-model.trim="formData.phone_three_ratio"
                                    placeholder="请输入第三级比例分成（百分制）"
                                    maxlength="30"
                                ></el-input>
                            </div>
                        </el-form-item>

                        <div class="x_title x_e_title">电费充值</div>
                        <el-form-item label="一级比例" prop="electricity_first_ratio">
                            <div class="w-80">
                                <el-input
                                    type="number"
                                    v-model.trim="formData.electricity_first_ratio"
                                    placeholder="请输入第一级比例分成（百分制）"
                                    maxlength="30"
                                ></el-input>
                            </div>
                        </el-form-item>
                        <el-form-item label="二级比例" prop="electricity_second_ratio">
                            <div class="w-80">
                                <el-input
                                    type="number"
                                    v-model.trim="formData.electricity_second_ratio"
                                    placeholder="请输入第二级比例分成（百分制）"
                                    maxlength="30"
                                ></el-input>
                            </div>
                        </el-form-item>
                        <el-form-item label="三级比例" prop="electricity_three_ratio">
                            <div class="w-80">
                                <el-input
                                    type="number"
                                    v-model.trim="formData.electricity_three_ratio"
                                    placeholder="请输入第三级比例分成（百分制）"
                                    maxlength="30"
                                ></el-input>
                            </div>
                        </el-form-item>

                        <div class="x_title x_q_title">话费快充</div>
                        <el-form-item label="一级比例" prop="quickly_first_ratio">
                            <div class="w-80">
                                <el-input
                                    type="number"
                                    v-model.trim="formData.quickly_first_ratio"
                                    placeholder="请输入第一级比例分成（百分制）"
                                    maxlength="30"
                                ></el-input>
                            </div>
                        </el-form-item>
                        <el-form-item label="二级比例" prop="quickly_second_ratio">
                            <div class="w-80">
                                <el-input
                                    type="number"
                                    v-model.trim="formData.quickly_second_ratio"
                                    placeholder="请输入第二级比例分成（百分制）"
                                    maxlength="30"
                                ></el-input>
                            </div>
                        </el-form-item>
                        <el-form-item label="三级比例" prop="quickly_three_ratio">
                            <div class="w-80">
                                <el-input
                                    type="number"
                                    v-model.trim="formData.quickly_three_ratio"
                                    placeholder="请输入第三级比例分成（百分制）"
                                    maxlength="30"
                                ></el-input>
                            </div>
                        </el-form-item>

                        <div class="x_title x_c_title">礼品卡</div>
                        <el-form-item label="一级比例" prop="card_first_ratio">
                            <div class="w-80">
                                <el-input
                                    type="number"
                                    v-model.trim="formData.card_first_ratio"
                                    placeholder="请输入第一级比例分成（百分制）"
                                    maxlength="30"
                                ></el-input>
                            </div>
                        </el-form-item>
                        <el-form-item label="二级比例" prop="card_second_ratio">
                            <div class="w-80">
                                <el-input
                                    type="number"
                                    v-model.trim="formData.card_second_ratio"
                                    placeholder="请输入第二级比例分成（百分制）"
                                    maxlength="30"
                                ></el-input>
                            </div>
                        </el-form-item>
                        <el-form-item label="三级比例" prop="card_three_ratio">
                            <div class="w-80">
                                <el-input
                                    type="number"
                                    v-model.trim="formData.card_three_ratio"
                                    placeholder="请输入第三级比例分成（百分制）"
                                    maxlength="30"
                                ></el-input>
                            </div>
                        </el-form-item>
                    </el-tab-pane>

                    <el-tab-pane label="邮件设置" :name="3">
                        <el-form-item label="SMTP服务器" prop="email_host">
                            <div class="w-80">
                                <el-input
                                    v-model.trim="formData.email_host"
                                    placeholder="请输入SMTP服务器"
                                    show-word-limit
                                ></el-input>
                            </div>
                        </el-form-item>
                        <el-form-item label="邮箱账号" prop="email_username">
                            <div class="w-80">
                                <el-input
                                    v-model.trim="formData.email_username"
                                    placeholder="请输入邮箱账号"
                                    show-word-limit
                                ></el-input>
                            </div>
                        </el-form-item>
                        <el-form-item label="邮箱授权码" prop="email_password">
                            <div class="w-80">
                                <el-input
                                    v-model.trim="formData.email_password"
                                    placeholder="请输入邮箱授权码"
                                    show-word-limit
                                ></el-input>
                            </div>
                        </el-form-item>
                        <el-form-item label="SMTP端口" prop="email_port">
                            <div class="w-80">
                                <el-input
                                    v-model.trim="formData.email_port"
                                    placeholder="请输入SMTP端口"
                                    show-word-limit
                                ></el-input>
                            </div>
                        </el-form-item>
                        <el-form-item label="加密方式" prop="email_encryption">
                            <div class="w-80">
                                <el-input
                                    v-model.trim="formData.email_encryption"
                                    placeholder="请输入加密方式"
                                    show-word-limit
                                ></el-input>
                            </div>
                        </el-form-item>
                        <el-form-item label="发件人邮箱" prop="email_from">
                            <div class="w-80">
                                <el-input
                                    v-model.trim="formData.email_from"
                                    placeholder="请输入发件人邮箱"
                                    show-word-limit
                                ></el-input>
                            </div>
                        </el-form-item>
                        <el-form-item label="发件人名称" prop="email_from_name">
                            <div class="w-80">
                                <el-input
                                    v-model.trim="formData.email_from_name"
                                    placeholder="请输入发件人名称"
                                    show-word-limit
                                ></el-input>
                            </div>
                        </el-form-item>
                    </el-tab-pane>

                    <el-tab-pane label="提示设置" :name="4">
                        <div class="xl:flex">
                            <el-card class="!border-none flex-1 xl:mr-4 mb-4" shadow="never">
                                <template #header>
                                    <span class="font-medium">推广页提示文字</span>
                                </template>
                                <editor class="mb-10" v-model="formData.share_tips" height="500"></editor>
                            </el-card>
                            <el-card class="!border-none flex-1 xl:mr-4 mb-4" shadow="never">
                                <template #header>
                                    <span class="font-medium">邀请奖励规则</span>
                                </template>
                                <editor class="mb-10" v-model="formData.share_rules" height="500"></editor>
                            </el-card>
                            <el-card class="!border-none flex-1 xl:mr-4 mb-4" shadow="never">
                                <template #header>
                                    <span class="font-medium">开通分站提示文字</span>
                                </template>
                                <editor class="mb-10" v-model="formData.open_substation_tips" height="500"></editor>
                            </el-card>
                        </div>
                    </el-tab-pane>

                    <el-tab-pane label="邀请设置" :name="5">
                        <el-form-item label="邀请LOGO" prop="invite_logo">
                            <div>
                                <material-picker v-model="formData.invite_logo" :limit="1" />
                                <div class="form-tips">建议尺寸：100*100px，支持jpg，jpeg，png格式</div>
                            </div>
                        </el-form-item>
                    </el-tab-pane>

                    <el-tab-pane label="客服设置" :name="6">
                        <el-form-item label="客服二维码" prop="kf_qrcode">
                            <div>
                                <material-picker v-model="formData.kf_qrcode" :limit="1" />
                                <div class="form-tips">建议尺寸：100*100px，支持jpg，jpeg，png格式</div>
                            </div>
                        </el-form-item>
                        <el-form-item prop="kf_mobile">
                            <div class="w-80">
                                <el-input
                                    v-model.trim="formData.kf_mobile"
                                    show-word-limit
                                ></el-input>
                            </div>
                        </el-form-item>
                        <el-form-item prop="kf_time">
                            <div class="w-80">
                                <el-input
                                    v-model.trim="formData.kf_time"
                                    show-word-limit
                                ></el-input>
                            </div>
                        </el-form-item>
                    </el-tab-pane>
                </el-tabs>
                <!--                <div class="text-xl font-medium mb-[20px]">后台设置</div>-->

            </el-card>
            <!--            <el-card shadow="never" class="!border-none mt-4">-->
            <!--                <div class="text-xl font-medium mb-[20px]">前台设置</div>-->

            <!--            </el-card>-->
            <el-card shadow="never" class="!border-none mt-4" style="display: none">
                <div class="text-xl font-medium mb-[20px]">PC端设置</div>
                <el-form-item label="PC端LOGO" prop="pc_logo">
                    <div>
                        <material-picker v-model="formData.pc_logo" :limit="1" />
                        <div class="form-tips">建议尺寸：120*28px，支持jpg，jpeg，png格式</div>
                    </div>
                </el-form-item>
                <el-form-item label="网站标题" prop="pc_title">
                    <div class="w-80">
                        <el-input
                            v-model.trim="formData.pc_title"
                            placeholder="请输入PC端网站标题"
                            maxlength="30"
                            show-word-limit
                        />
                    </div>
                </el-form-item>
                <el-form-item label="网站图标" prop="pc_ico">
                    <div>
                        <material-picker v-model="formData.pc_ico" :limit="1" />
                        <div class="form-tips">建议尺寸：100*100像素，支持jpg，jpeg，png格式</div>
                    </div>
                </el-form-item>
                <el-form-item label="网站描述" prop="pc_desc">
                    <div class="w-80">
                        <el-input
                            v-model.trim="formData.pc_desc"
                            placeholder="请输入PC端网站描述"
                        />
                    </div>
                </el-form-item>
                <el-form-item label="网站关键词" prop="pc_keywords">
                    <div class="w-80">
                        <el-input
                            v-model.trim="formData.pc_keywords"
                            placeholder="请输入PC端网站关键词"
                        />
                    </div>
                </el-form-item>
            </el-card>
        </el-form>
        <footer-btns v-perms="['setting.web.web_setting/setWebsite']">
            <el-button type="primary" @click="handleSubmit">保存</el-button>
        </footer-btns>
    </div>
</template>

<script lang="ts" setup name="webInformation">
import type { FormInstance } from 'element-plus'

import { getWebsite, setWebsite } from '@/api/setting/website'
import useAppStore from '@/stores/modules/app'

const formRef = ref<FormInstance>()

const appStore = useAppStore()
// 表单数据
const formData = reactive({
    name: '', // 网站名称
    web_favicon: '', // 网站图标
    web_logo: '', // 网站logo
    login_image: '', // 登录页广告图
    h5_favicon: '',
    shop_name: '',
    shop_logo: '',
    pc_logo: '',
    pc_title: '',
    pc_desc: '',
    pc_ico: '',
    pc_keywords: '',
    email_host: '',
    email_username: '',
    email_password: '',
    email_port: '',
    email_encryption: '',
    email_from: '',
    email_from_name: '',
    index_banner: '',
    reference_rate: '',
    query_hf: '',
    query_df: '',
    card_discount: '',
    share_tips: '',
    share_rules: '',
    open_substation_tips: '',
    substation_price: '',
    recharge_network: '',
    recharge_address: '',
    invite_logo: '',
    kf_qrcode: '',
    kf_mobile: '',
    kf_time: '',
    phone_first_ratio: '',
    phone_second_ratio: '',
    phone_three_ratio: '',
    electricity_first_ratio: '',
    electricity_second_ratio: '',
    electricity_three_ratio: '',
    quickly_first_ratio: '',
    quickly_second_ratio: '',
    quickly_three_ratio: '',
    card_first_ratio: '',
    card_second_ratio: '',
    card_three_ratio: '',
})

const queryParams = reactive({
    type: 1
})

// 表单验证
const rules = {
    name: [
        {
            required: true,
            message: '请输入网站名称',
            trigger: ['blur']
        }
    ],
    web_favicon: [
        {
            required: true,
            message: '请选择网站图标',
            trigger: ['change']
        }
    ],
    web_logo: [
        {
            required: true,
            message: '请选择网站logo',
            trigger: ['change']
        }
    ],
    login_image: [
        {
            required: true,
            message: '请选择登录页广告图',
            trigger: ['change']
        }
    ],
    shop_name: [
        {
            required: true,
            message: '请输入店铺/商城名称',
            trigger: ['blur']
        }
    ],
    shop_logo: [
        {
            required: true,
            message: '请选择商城LOGO',
            trigger: ['change']
        }
    ],
    pc_logo: [
        {
            required: true,
            message: '请选择PC端LOGO',
            trigger: ['change']
        }
    ],
    pc_title: [
        {
            required: true,
            message: '请输入PC端网站标题',
            trigger: ['blur']
        }
    ],
    pc_ico: [
        {
            required: true,
            message: '请选择PC端网站图标',
            trigger: ['change']
        }
    ]
}

// 获取备案信息
const getData = async () => {
    const data = await getWebsite()
    for (const key in formData) {
        //@ts-ignore
        formData[key] = data[key]
    }
}

// 设置备案信息
const handleSubmit = async () => {
    await formRef.value?.validate()
    await setWebsite(formData)
    appStore.getConfig()
    getData()
}

getData()
</script>

<style lang="scss" scoped>
.x_title {
    margin: 10px 47px;
    font-size: 15px;
    font-weight: 400;
    color: #8A2BE2;
}
.x_e_title {
    color: #FFD700;
}
.x_q_title {
    color: #4ECDC4;
}
.x_c_title {
    color: #FF4447;
}
</style>
