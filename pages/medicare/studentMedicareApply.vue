<template>
	<view>
		<view>
			<uni-section title="报名信息" type="line" />

			<view class="adBaseView">
				<view class="adRowView">
					<view class="headView">学号</view>
					<view class="input-text">{{form.perNum}}</view>
				</view>
				<view class="bottomLine" />
			</view>
			<view class="adBaseView">
				<view class="adRowView">
					<view class="headView">姓名</view>
					<view class="input-text">{{form.perName}}</view>
				</view>
				<view class="bottomLine" />
			</view>
			<view class="adBaseView">
				<view class="adRowView">
					<view class="headView">身份证号</view>
					<view class="input-text">{{form.perIdCard}}</view>
				</view>
				<view class="bottomLine" />
			</view>
			<view class="adBaseView">
				<view class="adRowView">
					<view class="headView">
						<view class="mustView">*</view>性别
					</view>
					<view class="uni-list">
						<view class="uni-list-cell">
							<view class="uni-list-cell-db">
								<picker @change="bindPickerGenderChange" :value="genderIndex" :range="genders">
									<view class="uni-input">{{genders[genderIndex]}}</view>
								</picker>
							</view>
						</view>
					</view>
				</view>
				<view class="bottomLine" />
			</view>
			<view class="adBaseView">
				<view class="adRowView">
					<view class="headView">
						<view class="mustView">*</view>出生日期
					</view>
					<view>
						<picker mode="date" :value="form.perBirth" :start="startDate" :end="endDate" @change="bindTimeChangePerBirth">
							<view>{{form.perBirth}}</view>
						</picker>
					</view>
				</view>
				<view class="bottomLine" />
			</view>
			<view class="adBaseView">
				<view class="adRowView">
					<view class="headView">
						<view class="mustView">*</view>联系方式
					</view>
					<view style="width: 70%;"><input class="input" v-model="form.mobilePhone" /></view>
				</view>
				<view class="bottomLine" />
			</view>
			<view class="adBaseView">
				<view class="adRowView">
					<view class="headView">所在学院</view>
					<view class="input-text">{{form.collegeName}}</view>
				</view>
				<view class="bottomLine" />
			</view>
			<view class="adBaseView">
				<view class="adRowView">
					<view class="headView">所学专业</view>
					<view class="input-text">{{form.majorName}}</view>
				</view>
				<view class="bottomLine" />
			</view>
			<view class="adBaseView">
				<view class="adRowView">
					<view class="headView">所学年级</view>
					<view class="input-text">{{form.grade}}</view>
				</view>
				<view class="bottomLine" />
			</view>
			<view class="adBaseView">
				<view class="adRowView">
					<view class="headView">所学班级</view>
					<view class="input-text">{{form.perClass}}</view>
				</view>
				<view class="bottomLine" />
			</view>
			<view class="adBaseView">
				<view class="adRowView">
					<view class="headView">缴费状态</view>
					<view class="input-text">{{form.payStatus}}</view>
				</view>
				<view class="bottomLine" />
			</view>
			<view class="adBaseView">
				<view class="adRowView">
					<view class="headView">
						<view class="mustView">*</view>缴费方式
					</view>
					<view class="uni-list">
						<view class="uni-list-cell">
							<view class="uni-list-cell-db">
								<picker @change="bindPickerModelPayChange" :value="form.modelPay" :range="payModels">
									<view class="uni-input">{{payModels[form.modelPay]}}</view>
								</picker>
							</view>
						</view>
					</view>
				</view>
				<view class="bottomLine" />
			</view>
			<button class="button-cell2" @click="doSubmit()">提交</button>
		</view>
	</view>
</template>

<script>
	import {
		uniList
	} from '@/components/uni-list/uni-list.vue'
	import {
		uniListItem
	} from '@/components/uni-list-item/uni-list-item.vue'
	import {
		studentMedicareApply
	} from '@/api/medicare.js'
	import {
		studentMedicareApplySubmit
	} from '@/api/medicare.js'
	export default {
		components: {
			uniList,
			uniListItem
		},
		data() {
			const currentDate = this.getDate({
				format: true
			})
			return {

				date: currentDate,
				start: currentDate,
				end: currentDate,
				form: {
					medicareId:'',
					perNum: '',
					perName: '',
					perIdCard: '',
					genderCode: '',
					perBirth:'',
					mobilePhone: '',
					modelPay:0,
					modelPayName:'',
					payStatus:'',
					collegeNum:'',
					collegeName:'',
					majorNum:'',
					majorName: '',
					grade: '',
					perClass:'',
					cardNum:'',
					isFree:''
				},
				isFree:'0',
				genderIndex:0,
				payModels: ['请选择缴费方式','校园卡扣费','现金缴费','弃保'],
				genders: ['男', '女'],
				year: '',
				isMedicareClose:''
			}
		},
		computed: {
			startDate() {
				return this.getDate('start');
			},
			endDate() {
				return this.getDate('end');
			}
		},
		onShow: function(e) {
			this.fetchData()
		},
		methods: {
			fetchData() {
				studentMedicareApply().then(res => {
					if (res.re == 1) {
						this.form = res.data.form
						if (this.form.genderCode === '1') {
							this.genderIndex = 0
						} else {
							this.genderIndex = 1
						}
						this.isFee = res.data.isFee
						this.isLoading = false
					} else {
						console.log(res)
						this.isLoading = false
					}
				}).catch(err => {

				})
			},
		}
	}
</script>

<style>

</style>
