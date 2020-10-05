<template>
	<view>
		<view v-if="isPhysicalClose===1">
			<view class="section2">
				<view class="stitle" style="color: #7acfa6;">
					查体报名时间已关闭，不能再报名！
				</view>
			</view>
		</view>
		<view v-else>
			<view class="adBaseView">
				<view class="adRowView">
					<view class="headView">身份证号</view>
					<view class="input-text">{{form.perIdCard}}</view>
				</view>
				<view class="bottomLine" />
			</view>

			<view class="adBaseView">
				<view class="adRowView">
					<view class="headView">工号</view>
					<view class="input-text">{{form.perNum}}</view>
				</view>
				<view class="bottomLine" />
			</view>

			<view class="adBaseView">
				<view class="adRowView">
					<view class="headView">单位</view>
					<view class="input-text">{{form.collegeName}}</view>
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
						<view class="mustView">*</view>婚姻状态
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
					<view class="headView">体检券</view>
					<view class="input-text">{{form.checkDes}}</view>
				</view>
				<view class="bottomLine" />
			</view>
			<view class="adBaseView">
				<view class="adRowView">
					<view class="headView">
						<view class="mustView">*</view>查体单位
					</view>
					<view style="width: 70%;">
						<picker class="input" @change="bindchangeCheckUnit" :value="checkUnitIndex" :range="checkUnitList" :range-key="'label'">
							<view class="uni-input">{{checkUnitList[checkUnitIndex].label}}</view>
						</picker>
					</view>
				</view>
				<view class="bottomLine" />
			</view>

			<view class="adBaseView">
				<view class="adRowView">
					<view class="headView">
						<view class="mustView">*</view>查体套餐
					</view>
					<view style="width: 70%;">
						<picker class="input" @change="bindchangeProject" :value="projectIndex" :range="projectList" :range-key="'label'">
							<view class="uni-input">{{projectList[projectIndex].label}}</view>
						</picker>
					</view>
				</view>
				<view class="bottomLine" />
			</view>
			<uni-collapse @change="change">
				<uni-collapse-item title="展开查看查体项">
					<view class="adBaseView2" v-for="items in itemList" :key="items">
						<view class="cloumnlist">
							{{items}}
						</view>
						<view class="bottomLine" />
					</view>
				</uni-collapse-item>

			</uni-collapse>

			<button class="button-cell2" @click="doSubmit">立即报名</button>
		</view>
	</view>
</template>

<script>
	import uniCollapse from '@/components/uni-collapse/uni-collapse.vue'
	import uniCollapseItem from '@/components/uni-collapse-item/uni-collapse-item.vue'
	import {
		uniList
	} from '@/components/uni-list/uni-list.vue'
	import {
		uniListItem
	} from '@/components/uni-list-item/uni-list-item.vue'
	import {
		physicalexaminationApply
	} from '@/api/medicare.js'
	import {
		physicalexaminationApplyProjectList
	} from '@/api/medicare.js'
	import {
		physicalexaminationApplyProjectItemList
	} from '@/api/medicare.js'
	import {
		physicalexaminationApplySubmit
	} from '@/api/medicare.js'
	export default {
		components: {
			uniList,
			uniCollapse,
			uniCollapseItem,
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
				showProject: false,
				form: {
					perNum: '',
					perName: '',
					perIdCard: '',
					genderCode: '',
					collegeName: '',
					perBirth: '',
					marryState: '',
					mobilePhone: '',
					cardNum: '',
					checkUnit: '',
					checkDes: '',
					baseCheck: '',
					addedCheck: '',
					projectId: '',
				},
				marryIndex: 0,
				genderIndex: 0,
				checkUnitIndex: -1,
				projectIndex: -1,
				marryStates: ['未婚', '已婚'],
				genders: ['男', '女'],
				checkUnitList: [],
				projectList: [],
				itemList: [],
				isPhysicalClose: 0,
				year: '',
				isCollege:'0'

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
		onLoad(option) {
			this.form.perNum = option.perNum
			this.isCollege = option.isCollege
			this.fetchData()
		},
		methods: {
			change(e) {
				console.log(e)
			},
			switchChange(e) {

				if (e.value === true) {

					this.showProject = true
				} else if (e.value === false) {
					this.showProject = false
				}
			},
			fetchData() {

				physicalexaminationApply({
					perNum:this.perNum
				}).then(res => {
					this.showProject = false
					if (res.re == 1) {
						this.isPhysicalClose = res.data.isPhysicalClose
						console.log(this.isPhysicalClose)
						this.form = res.data.form
						if (this.form.genderCode === '1') {
							this.genderIndex = 0
						} else {
							this.genderIndex = 1
						}
						if (this.form.marryState === '0') {
							this.marryIndex = 0
						} else {
							this.marryIndex = 1
						}
						this.checkUnitIndex = res.data.checkUnitIndex
						this.checkUnitList = res.data.checkUnitList
						this.projectIndex = res.data.projectIndex
						this.projectList = res.data.projectList
						this.itemList = res.data.itemList
						console.log(this.itemList)
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
					this.form.genderCode = '1';
				else
					this.form.genderCode = '2';
			},
			bindPickerMarryChange(e) {
				this.marryIndex = e.target.value
				if (this.marryIndex === 0) {
					this.form.marryState = '0'
				} else {
					this.form.marryState = '1'
				}
			},
			bindTimeChangePerBirth(e) {
				this.form.perBirth = e.target.value
			},
			bindchangeCheckUnit(e) {
				this.checkUnitIndex = e.target.value
				this.form.checkUnit = this.checkUnitList[this.checkUnitIndex].value
				physicalexaminationApplyProjectList({
					checkUnit: this.form.checkUnit,
					baseCheck: this.form.baseCheck,
					genderCode: this.form.genderCode,
					marryState: this.form.marryState,
					perBirth: this.form.perBirth

				}).then(res => {
					this.projectIndex = res.data.projectIndex
					this.projectList = res.data.projectList
					this.itemList = res.sdata.itemList
				})

			},
			bindchangeProject(e) {
				this.projectIndex = e.target.value
				this.form.projectId = this.projectList[this.projectIndex].value

				physicalexaminationApplyProjectItemList({
					projectId: this.form.projectId
				}).then(res => {
					this.itemList = res.data

				})
			},
			doSubmit() {
				if(this.form.mobilePhone===undefined || this.form.mobilePhone==='') {
					this.isLoading = false
					uni.showModal({
						title: '提示',
						content: '手机号不能为空！',
						showCancel: false,
					});					
				}else if(this.form.checkUnit==='0000' || this.form.projectId==='0') {
					this.isLoading = false
					uni.showModal({
						title: '提示',
						content: '没有选择查体单位和查体套餐，不能提交！',
						showCancel: false,
					});					
				}else {
					physicalexaminationApplySubmit({
						form: this.form,
					}).then(res => {
						console.log(res)
						if (res.re == '1') {
							var flag = this
							uni.showModal({
								title: '提示',
								content: '保存成功',
								showCancel: false,
								success: function(res) {
									if (res.confirm) {
										if(flag.isCollege==='1') {
											uni.navigateTo({
												url: './collegePhysicalExaminationQuery',
											})											
										}else {
										uni.navigateTo({
											url: './physicalexaminationApplyView',
										})
										}
									}
								}

							});
						} else {
							this.isLoading = false
							uni.showModal({
								title: '提示',
								content: '保存失败'
							});
						}
					}).catch(err => {})
				}
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
