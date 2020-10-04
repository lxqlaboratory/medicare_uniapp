<template>
	<view>
		<view class="adBaseView">
			<view class="adRowView">
				<view class="headView">年级</view>
				<view class="uni-list">
					<view class="uni-list-cell">
						<view class="uni-list-cell-db">
							<picker @change="bindPickerGrade" :value="grade" :range="gradeList">
								<view class="uni-input">{{gradeList[gradeIndex]}}</view>
							</picker>
						</view>
					</view>
				</view>
			</view>
			<view class="bottomLine" />
		</view>
		<view v-for="(item,index) in statisticsList" :key="index">
			<view class="row">
				<text class="row-title">缴费模式: </text>
				<text>{{item.modelPayName}}</text>
			</view>
			<view class="row">
				<text class="row-title">已缴费人数: </text>
				<text v-if="item.count1==='0'">{{item.count1}}</text>
				<text v-else style="color: #e64340;" @click="doDetail(item.modelPay,'1')">{{item.count1}}</text>
			</view>
			<view class="row">
				<text class="row-title">未缴费人数: </text>
				<text v-if="item.count0==='0'">{{item.count0}}</text>
				<text v-else style="color: #e64340;" @click="doDetail(item.modelPay,'0')">{{item.count0}}</text>
			</view>
			<view class="bottomLine3"></view>
		</view>
		<view v-if="studentList.length> 0">
			<button class="button-cell2" @click="download()">导出学生名单</button>
		</view>
		<view v-for="(item,index) in studentList" :key="index">
			<view class="row">
				<text class="row-title">学号: </text>
				<text>{{item.perNum}}</text>
			</view>
			<view class="row">
				<text class="row-title">姓名: </text>
				<text>{{item.perName}}</text>
			</view>
			<view v-if="perTypeCode==='2'" class="row">
				<text class="row-title">专业: </text>
				<text>{{item.majorName}}</text>
			</view>
			<view class="row">
				<text class="row-title">班级: </text>
				<text>{{item.perClass}}</text>
			</view>
			<view class="row">
				<text class="row-title">联系电话: </text>
				<text>{{item.mobilePhone}}</text>
			</view>
			<view class="row">
				<button type='primary' class='s3bu' style="margin-top:15px;background-color:#7acfa6" @click="call(item.mobilePhone)">
					<image src="/static/image/icon_clinic_tel_l.png"></image>
					<view>联系电话</view>
				</button>
			</view>
			<view class="bottomLine3"></view>
		</view>
	</view>
</template>
<script>
	import {
		collegeMedicareApplyQuery
	} from '@/api/medicare.js'
	import {
		collegeMedicareApplyStatisticsList
	} from '@/api/medicare.js'
	import {
		collegeMedicareApplyInfoList
	} from '@/api/medicare.js'

	export default {
		data() {
			return {
				perTypeCode: 1,
				grade: '',
				gradeIndex: 0,
				gradeList: [],
				year: '',
				collegeNum: '',
				modelPay: '0',
				payStatus: '0',
				statisticsList: [],
				studentList: []
			}
		},

		methods: {
			onLoad(option) {
				this.perTypeCode = option.perTypeCode
				console.log(this.perTypeCode)
				collegeMedicareApplyQuery({
					perTypeCode: this.perTypeCode,
				}).then(res => {
					this.year = res.data.year
					this.collegeNum = res.data.collegeNum
					this.grade = res.data.grade
					this.gradeIndex = res.data.gradeIndex
					this.gradeList = res.data.gradeList
					this.statisticsList = res.data.statisticsList
					this.studentList = res.data.studentList
				}).catch(err => {})
			},

			bindPickerGrade(e) {
				this.gradeIndex = e.target.value
				this.grade = this.gradeList[this.gradeIndex]
				collegeMedicareApplyStatisticsList({
					perTypeCode: this.perTypeCode,
					year: this.year,
					collegeNum: this.collegeNum,
					grade: this.grade
				}).then(res => {
					this.statisticsList = res.data.statisticsList
					this.studentList = res.data.studentList
					console.log(this.statisticsList)
				}).catch(err => {})
			},
			doDetail(modelPay, payStatus) {
				collegeMedicareApplyInfoList({
					perTypeCode: this.perTypeCode,
					year: this.year,
					collegeNum: this.collegeNum,
					grade: this.grade,
					modelPay: modelPay,
					payStatus: payStatus,
				}).then(res => {
					this.studentList = res.data
				}).catch(err => {

				})
			},
			call(mobilePhone) {
				uni.makePhoneCall({
					// 手机号
					phoneNumber: mobilePhone,
					// 成功回调
					success: (res) => {
						console.log('调用成功!')
					},
					// 失败回调
					fail: (res) => {
						console.log('调用失败!')
						this.call_phone(); //重复调用一次
					}
				});
			},
			download() {
				wx.downloadFile({
					url: getApp().globalData.medicareurl + '/medicare/exportCollegeMedicareApplyInfoList?year='+this.year + '&perTypeCode='+this.perTypeCode+'&grade='+this.grade+'&collegeNum='+this.collegeNum +'&modelPay='+this.modelPay +'&payStatus='+this.payStatus,
					header: {
						"Content-Type": "application/json",
						"Cookie": "JSESSIONID=" + getApp().globalData.vueSessionId
					},
					success: (res) => {
						if (res.statusCode === 200) {
							var filePath = res.tempFilePath;
							wx.openDocument({
								filePath: filePath,
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
