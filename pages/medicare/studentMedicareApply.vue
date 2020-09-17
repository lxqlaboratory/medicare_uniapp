<template>
	<view>
		<view>
			<uni-section title="个人信息" type="line" />

			<view class="adBaseView">
				<view class="adRowView">
					<view class="headView">学号</view>
					<view class="input-text">{{apply.perNum}}</view>
				</view>
				<view class="bottomLine" />
			</view>
			<view class="adBaseView">
				<view class="adRowView">
					<view class="headView">姓名</view>
					<view class="input-text">{{apply.perName}}</view>
				</view>
				<view class="bottomLine" />
			</view>
			<view class="adBaseView">
				<view class="adRowView">
					<view class="headView">身份证号</view>
					<view class="input-text">{{apply.perIdCard}}</view>
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
						<picker mode="date" :value="apply.perBirth" :start="startDate" :end="endDate" @change="bindTimeChangePerBirth">
							<view>{{apply.perBirth}}</view>
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
					<view style="width: 70%;"><input class="input" v-model="apply.mobilePhone" /></view>
				</view>
				<view class="bottomLine" />
			</view>
			<view class="adBaseView">
				<view class="adRowView">
					<view class="headView">所在学院</view>
					<view class="input-text">{{apply.collegeName}}</view>
				</view>
				<view class="bottomLine" />
			</view>
			<view class="adBaseView">
				<view class="adRowView">
					<view class="headView">所学专业</view>
					<view class="input-text">{{apply.collegeName}}</view>
				</view>
				<view class="bottomLine" />
			</view>
			<view class="adBaseView">
				<view class="adRowView">
					<view class="headView">所学年级</view>
					<view class="input-text">{{apply.collegeName}}</view>
				</view>
				<view class="bottomLine" />
			</view>
			<view class="adBaseView">
				<view class="adRowView">
					<view class="headView">所学班级</view>
					<view class="input-text">{{apply.collegeName}}</view>
				</view>
				<view class="bottomLine" />
			</view>
			<view class="adBaseView">
				<view class="adRowView">
					<view class="headView">缴费状态</view>
					<view class="input-text">{{apply.collegeName}}</view>
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
								<picker @change="bindPickerMarryChange" :value="marryIndex" :range="marryStates">
									<view class="uni-input">{{marryStates[marryIndex]}}</view>
								</picker>
							</view>
						</view>
					</view>
				</view>
				<view class="bottomLine" />
			</view>
			<button class="button-cell2" @click="navigateNextPage">提交</button>
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
				apply: {
					perNum: '',
					perName: '',
					perIdCard: '',
					genderCode: '',
					perBirth:'',
					mobilePhone: '',
					modelPay:'',
					payStatus:'',
					collegeNum:''
					collegeName:'',
					majorNum:'',
					majorName: '',
					grade: '',
					perClass:'',
					cardNum:'',
				},
				isFree:'0',
				payModelIndex: 0,
				payModels: ['请选择缴费方式','校园卡扣费','现金缴费','弃保'],
				genders: ['男', '女'],
				year: '',

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
			switchChange(e) {
				console.log(e.value)
				if (e.value === true) {
					this.showProject = true
				} else if (e.value === false) {
					this.showProject = false
				}
			},
			fetchData() {
				studentMedicareApply().then(res => {
					this.showProject = false
					if (res.re == 1) {
						this.apply = res.data.apply
						if (this.apply.genderCode === '1') {
							this.genderIndex = 0
						} else {
							this.genderIndex = 1
						}
						if (this.apply.marryState === '0') {
							this.marryIndex = 0
						} else {
							this.marryIndex = 1
						}
						this.checkUnitIndex = res.data.checkUnitIndex
						this.checkUnitList = res.data.checkUnitList
						this.projectIndex = res.data.projectIndex
						this.projectList = res.data.projectList
						this.isPhysicalClose = res.data.isPhysicalClose
						this.isLoading = false
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
					this.apply.genderCode = '1';
				else
					this.apply.genderCode = '2';
			},
			bindPickerMarryChange(e) {
				this.marryIndex = e.target.value
				if (this.marryIndex === 0) {
					this.apply.marryState = '0'
				} else {
					this.apply.marryState = '1'
				}
			},
			bindTimeChangePerBirth(e) {
				this.apply.perBirth = e.target.value
			},
			bindchangeCheckUnit(e) {
				this.checkUnitIndex = e.target.value
				this.apply.checkUnit = this.checkUnitList[this.checkUnitIndex].value
				physicalexaminationApplyProjectList({
					checkUnit: this.apply.checkUnit,
					baseCheck: this.apply.baseCheck,
					genderCode: this.apply.genderCode,
					marryState: this.apply.marryState,
					perBirth: this.apply.perBirth

				}).then(res => {
					this.projectIndex = res.data.projectIndex
					this.projectList = res.data.projectList
				})

			},
			bindchangeProject(e) {
				this.projectIndex = e.target.value
				this.apply.projectId = this.projectList[this.projectIndex].value

				physicalexaminationApplyProjectItemList({
					projectId: this.apply.projectId
				}).then(res => {
					this.itemList = res.data

				})
			},
			navigateNextPage() {
				//在同一个medicare目录下
				uni.navigateTo({
					url: './physicalexaminationApplyNext?genderCode=' + this.apply.genderCode + '&perBirth=' + this.apply.perBirth +
						'&marryState=' + this.apply.marryState + '&checkUnit=' + this.apply.checkUnit
				})

				// 在不同目录下
				// uni.navigateTo({
				// 	url:'../base/baseInfo'
				// })
			},
			saveQualificationInfo() {
				saveQualificationInfo({
					form: this.apply,
				}).then(res => {
					console.log(res)
					if (res.re == '1') {
						uni.showModal({
							title: '提示',
							content: '保存成功'
						});
						getQualificationIno().then(res => {
							this.noAuditList = res.data.applyList
							this.haveAuditedList = res.data.unapplyList
							this.infoForm = res.data.form
							this.isCanEdit = res.data.isCanEdit
							this.isLoading = false
							console.log(res)
						}).catch(err => {

						})
					} else {
						this.isLoading = false
						uni.showModal({
							title: '提示',
							content: '保存失败'
						});
					}
				}).catch(err => {})

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
		}
	}
</script>

<style>

</style>
