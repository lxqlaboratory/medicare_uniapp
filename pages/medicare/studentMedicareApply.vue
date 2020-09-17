<template>
	<view>
		<view v-if="isMedicareClose">
			<uni-section title="医保报名已关闭,无法在报名!" type="line" />
		</view>
		<view v-else >
			<uni-section title="请同学们仔细核对个人信息！选择缴费方式后，点击“提交”即可。如信息有误，请及时联系技术人员修改!" type="line" />
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
					<view v-if="isFree" class="input-text">免费</view>
					<view v-else class="uni-list">
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
				isFree:false,
				genderIndex:0,
				payModels: ['请选择缴费方式','校园卡扣费','现金缴费','弃保'],
				genders: ['男', '女'],
				year: '',
				isMedicareClose:false
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
						this.isMedicareClose = res.data.isMedicareClose
						this.isFee = res.data.isFee
						this.isLoading = false
						console.log(this.isMedicareClose)
					} else {
						console.log(res)
						this.isLoading = false
					}
				}).catch(err => {

				})
			},
			bindPickerGenderChange(e) {
				this.genderIndex = e.target.value
				if (this.genderIndex === 0)
					this.form.genderCode = '1';
				else
					this.form.genderCode = '2';
			},
			bindPickerModelPayChange(e) {
				this.form.modelPay = e.target.value
			},
			bindTimeChangePerBirth(e) {
				this.form.perBirth = e.target.value
			},
			getDate(type) {
				const date = new Date();
				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				let day = date.getDate();

				if (type === 'start') {
					year = year - 100;
				} else if (type === 'end') {
					year = year + 2;
				}
				month = month > 9 ? month : '0' + month;;
				day = day > 9 ? day : '0' + day;
				return `${year}-${month}-${day}`;
			},
			doSubmit() {
				studentMedicareApplySubmit({
					form: this.form,
				}).then(res => {
					console.log(res)
					if (res.re == '1') {
						uni.showModal({
							title: '提示',
							content: '保存成功'
						});
					} else {
						this.isLoading = false
						uni.showModal({
							title: '提示',
							content: '保存失败'
						});
					}
				}).catch(err => {})
			},
		}
	}
</script>

<style>

</style>
