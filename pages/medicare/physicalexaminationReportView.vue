<template>
	<view>
		<view class="adBaseView">
			<view class="adRowView">
				<view class="headView">工号：</view>
				<view class="input-text">{{perNum}}</view>
			</view>
			<view class="bottomLine" />
		</view>

		<view class="adBaseView">
			<view class="adRowView">
				<view class="headView">姓名：</view>
				<view class="input-text">{{perName}}</view>
			</view>
			<view class="bottomLine" />
		</view>

		<view class="adBaseView">
			<view class="adRowView">
				<view class="headView">身份证号：</view>
				<view class="input-text">{{perIdCard}}</view>
			</view>
			<view class="bottomLine" />
		</view>

		<view class="item-t" v-for="(item, index) in dataList" :key="index">
			<view style="display: flex;flex-direction: column;justify-content: right;align-items: flex-start;width: 100%;">
				<view style="margin-bottom: 3px;">
					年度：<text style="font-weight: bold;">{{item.year}}</text>
				</view>
				<view style="margin-bottom: 3px;">
					体检卷：<text style="font-weight: bold;">{{item.baseCheck}}</text>
				</view>
				<view style="margin-bottom: 3px;">
					申请状态：<text style="font-weight: bold;">{{item.applyState}}</text>
				</view>
				<view style="margin-bottom: 3px;">
					查体单位：<text style="font-weight: bold;">{{item.checkUnit}}</text>
				</view>
				<view style="margin-bottom: 3px;">
					基本套餐：<text style="font-weight: bold;">{{item.projectName}}</text>
				</view>
				<view style="margin-bottom: 3px;display: flex;flex-direction: row;">
					<view v-if="item.isCheck===true" style="color: green;" @click="donlowdExamReport(item.year,'check')">查体报告下载</view>
					<view v-else style="color: black;">未上传查体报告</view>
					<view v-if="item.isAssess===true" style="color: green;margin-left: 50px;" @click="donlowdExamReport(item.year,'assess')">评估报告下载</view>
					<view v-else style="color: black;margin-left: 50px;">未上传评估报告</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		physicalexaminationReportView
	} from '@/api/medicare.js'
	export default {

		data() {
			return {
				perNum: '',
				perName: '',
				perIdCard: '',
				dataList: [],
			};
		},

		onShow() {
			physicalexaminationReportView().then(res => {
				this.perNum = res.data.perNum
				this.perName = res.data.perName
				this.perIdCard = res.data.perIdCard
				this.dataList = res.data.dataList
			});
		},
		methods: {
			donlowdExamReport(year, type) {
				wx.downloadFile({
					url: getApp().globalData.medicareurl + '/medicare/physicalexaminationReportDownload?year=' + year +
						'&perIdCard=' + this.perIdCard + '&type=' + type,
						header: {
							"Content-Type": "application/json",
							"Cookie": "JSESSIONID=" + getApp().globalData.vueSessionId
						},
						
					success: (res) => {
						if (res.statusCode === 200) {
							var filePath = res.tempFilePath;
							console.log(filePath);
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
