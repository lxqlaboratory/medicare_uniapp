<template>
	<view>
		<view v-for="(item,index) in statisticsList" :key="index">
			<view class="row">
				<text class="row-title">查体单位: </text>
				<text>{{item.checkUnitName}}</text>
			</view>
			<view class="row">
				<text class="row-title">申请人数: </text>
				<text v-if="item.count===0">{{item.count}}</text>
				<text v-else style="color: #e64340;" @click="doDetail(item.checkUnit)">{{item.count}}</text>
			</view>
			<view class="bottomLine3"></view>
		</view>
		<view v-if="personList.length> 0">
			<button class="button-cell2" @click="download()">导出人员名单</button>
		</view>
		<view v-for="(item,index) in personList" :key="index">
			<view class="row">
				<text class="row-title">工号: </text>
				<text>{{item.perNum}}</text>
				<text v-if="item.projectName===''" class="miniButton2" @click="doApply(item.perNum)">报名</text>
				<text v-else class="miniButton2" @click="doApply(item.perNum)">修改</text>
			</view>
			<view class="row">
				<text class="row-title">姓名: </text>
				<text>{{item.perName}}</text>
			</view>
			<view class="row">
				<text class="row-title">体检卷: </text>
				<text>{{item.baseCheck}}</text>
			</view>
			<view class="row">
				<text class="row-title">套餐: </text>
				<text>{{item.projectName}}</text>
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
		collegePhysicalExaminationQuery
	} from '@/api/medicare.js'
	import {
		collegePhysicalExaminationInfoList
	} from '@/api/medicare.js'

	export default {
		data() {
			return {
				checkUnit:'00',
				statisticsList: [],
				personList: []
			}
		},

		methods: {
			onLoad(option) {
				collegePhysicalExaminationQuery().then(res => {
					this.statisticsList = res.data.statisticsList
					this.personList = res.data.personList
				}).catch(err => {})
			},

			doDetail(checkUnit) {
				console.log(checkUnit)
				this.checkUnit = checkUnit
				collegePhysicalExaminationInfoList({
					checkUnit: this.checkUnit,
				}).then(res => {
					this.personList = res.data
				}).catch(err => {

				})
			},
			doApply(perNum) {
				uni.navigateTo({
					url: './physicalexaminationApply?isCollege=1&perNum=' + perNum 
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
					url: getApp().globalData.medicareurl + '/medicare/exportCollegePhysicalExaminationInfoList?checkUnit='+this.checkUnit,
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
