<template>
	<view>
		<view v-if="isMedicareClose===true">
			<view class="section2">
				<view class="stitle">
					医保报名已关闭,无法在报名!
				</view>
			</view>
		</view>
		<view v-else>

			<view class="section">
				<view class="stitle">
					请仔细核对个人信息！选择缴费方式,若选择弃保请选择已缴保地区，点击“提交”即可，弃保请提交后下载弃保声明。如信息有误请联系学院修改!
				</view>
			</view>

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
					<view v-if="form.isFree===true" class="input-text">form.modelPayName</view>
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
			<view v-if="form.modelPay==='2'" class="adBaseView">
				<view class="adRowView" @click="handleTap('picker1')">
					<view class="headView">请选择缴保省</view>
					<view class="input-text">{{form.province}}</view>
				</view>
				<view class="adRowView" @click="handleTap('picker2')">
					<view class="headView">请选择缴保市</view>
					<view class="input-text">{{form.city}}</view>
				</view>
				<view class="adRowView" @click="handleTap('picker3')">
					<view class="headView">请选择缴保区</view>
					<view class="input-text">{{form.town}}</view>
				</view>
				<lb-picker ref="picker1" mode="multiSelector" :list="list" :level="1" @confirm="confirmProvince">
				</lb-picker>
				<lb-picker ref="picker2" mode="multiSelector" :list="list" :level="2" @confirm="confirmCity">
				</lb-picker>
				<lb-picker ref="picker3" mode="multiSelector" :list="list" :level="3" @confirm="confirmTown">
				</lb-picker>
			</view>
			<button class="button-cell2" @click="doSubmit()">提交</button>
			<button v-if="form.modelPay==='2'" class="button-cell2" @click="download()">弃保声明下载</button>
		</view>
	</view>
</template>

<script>
	import LbPicker from '@/components/lb-picker'
	import areaData from "../../api/base/area-data-min.js"
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
			LbPicker,
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
					medicareId: '',
					perNum: '',
					perName: '',
					perIdCard: '',
					genderCode: '',
					perBirth: '',
					mobilePhone: '',
					modelPay: 0,
					modelPayName: '',
					payStatus: '',
					collegeNum: '',
					collegeName: '',
					majorNum: '',
					majorName: '',
					grade: '',
					perClass: '',
					cardNum: '',
					isFree: '',
					province: '',
					city: '',
					town: '',
				},
				province: '',
				city: '',
				town: '',
				list: areaData,
				value1: '',
				value7: '',
				value8: '',
				value9: '',
				value10: '',
				value11: '',
				isFree: false,
				genderIndex: 0,
				payModels: ['未选择', '个人缴费', '弃保'],
				genders: ['男', '女'],
				year: '',
				isMedicareClose: false,
				isCollege: '0',
				perTypeCode: '1',
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
		onLoad(option) {
			this.form.perNum = option.perNum
			this.isCollege = option.isCollege
			this.perTypeCode = option.perTypeCode
			this.fetchData()
		},
		methods: {
			fetchData() {
				studentMedicareApply({
					perNum: this.form.perNum,
				}).then(res => {
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
				if (this.genderIndex === '0')
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
			handleTap(picker) {
				this.$refs[picker].show()
			},
			confirmProvince(item) {

				this.form.province = item.item[0].label
				this.value1 = this.sheng
			},
			confirmCity(item) {
				this.value7 = item.item[0].label
				this.value8 = item.item[1].label
				this.form.city = this.value7 + '-' + this.value8
			},
			confirmTown(item) {

				this.value9 = item.item[0].label
				this.value10 = item.item[1].label
				this.value11 = item.item[2].label
				this.form.town = this.value9 + '-' + this.value10 + '-' + this.value11
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
				// console.log(this.payModels[this.form.modelPay])
				if (this.form.mobilePhone === undefined || this.form.mobilePhone === '') {
					uni.showModal({
						title: '提示',
						content: '联系方式不能为空',
						showCancel: false
					});
				} else if (this.form.perBirth === undefined || this.form.perBirth === '') {
					uni.showModal({
						title: '提示',
						content: '出生日期不能为空',
						showCancel: false
					});
				} else if (this.form.modelPay === '0') {
					uni.showModal({
						title: '提示',
						content: '请选择缴费方式',
						showCancel: false
					});
				} else {
					studentMedicareApplySubmit({
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
										if (flag.isCollege === '1') {
											uni.navigateTo({
												url: './collegeMedicareApplyQuery?perTypeCode=' + flag.perTypeCode,
											})
										} else {
											uni.navigateTo({
												url: './studentMedicareApplyView',
											})
										}
									}
								}
							});
						} else {
							this.isLoading = false
							uni.showModal({
								title: '提示',
								content: '保存失败',
								showCancel: false
							});
						}
					}).catch(err => {})
				}
			},

			download() {
				wx.downloadFile({
					url: getApp().globalData.medicareurl + '/medicare/downloadAbandonMedicareCertificate',
					header: {
						"Content-Type": "application/json",
						"Cookie": "JSESSIONID=" + getApp().globalData.vueSessionId
					},
					success: (res) => {
						if (res.statusCode === 200) {
							var filePath = res.tempFilePath;
							wx.openDocument({
								filePath: filePath,
								fileType: 'pdf',
								showMenu: true,
								success: function(res) {
									console.log('打开文档成功')
								},
								fail: function(res) {
									console.log(res);
								},
								complete: function(res) {
									console.log(res);
								}
							})
							uni.showToast({
								title: `下载成功`,
								icon: 'none'
							})
						}
					}
				});
			}
		},
	}
</script>

<style>

</style>
