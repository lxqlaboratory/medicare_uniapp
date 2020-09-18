<template>
	<view>
		<uni-section title="体检报告" type="line" />
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
				<view class="headView">所在单位：</view>
				<view class="input-text">{{collegeName}}</view>
			</view>
			<view class="bottomLine" />
		</view>
		
	<uni-section title="历年体检报告" type="line" />
	 <view class="item-t" v-for="(item, index) in dataList" :key="index">
	 	<view style="display: flex;flex-direction: column;justify-content: right;align-items: flex-start;width: 100%;" >
	 		<view style="margin-bottom: 3px;">
	 			年度：<text style="font-weight: bold;" >{{item.year}}</text>
	 		</view>
	 		<view style="margin-bottom: 3px;">
	 			体检卷：<text style="font-weight: bold;" >{{item.baseCheck}}</text>
	 		</view>
	 		<view style="margin-bottom: 3px;">
	 			查体单位：<text style="font-weight: bold;" >{{item.checkUnit}}</text>
	 		</view>
	 		<view style="margin-bottom: 3px;">
	 			基本套餐：<text style="font-weight: bold;" >{{item.projectName}}</text>
	 		</view>	
			<view style="margin-bottom: 3px;display: flex;flex-direction: row;">
				<view v-if="item.isCheck===true" style="color: green;" @click="donlowdExamReport(item.year,'check')" >查体报告下载</view>
				<view v-else style="color: black;"  >未上传查体报告</view>
				<view v-if="item.isAssess===true" style="color: green;margin-left: 50px;" @click="donlowdExamReport(item.year,'assess')" >评估报告下载</view>
				<view v-else style="color: black;margin-left: 50px;"  >未上传评估报告</view>
			</view>	
			<!-- <view style="margin-bottom: 3px;">
					<view style="color: blue;" >评估报告下载</view>
					
			</view> -->	
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
				perNum:'',
				perName:'',
				perIdCard:'',
				collegeName:'',
				dataList:[],
			};
		},
	
		onShow() {
			physicalexaminationReportView().then(res => {
				this.perNum = res.data.perNum
				this.perName = res.data.perName
				this.perIdCard = res.data.perIdCard
				this.collegeName = res.data.collegeName
				this.dataList = res.data.dataList
			});
		},
		methods: {
			donlowdExamReport(year, type){
				console.log(year,type)
				wx.downloadFile({
					url: 'http://localhost:8080/medicare/physicalexaminationReportDownload?year='+year+'&perIdCard='+ this.perIdCard + '&type='+ type, 
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
