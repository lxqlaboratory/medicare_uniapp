<template>
	<view>
		<uni-section title="体检报告" type="line" />
		<view class="adBaseView">
			<view class="adRowView">
				<view class="headView">工号：</view>
				<view class="input-text">200799013517</view>
			</view>
			<view class="bottomLine" />
		</view>
		
		<view class="adBaseView">
			<view class="adRowView">
				<view class="headView">姓名：</view>
				<view class="input-text">李学庆</view>
			</view>
			<view class="bottomLine" />
		</view>
		
		<view class="adBaseView">
			<view class="adRowView">
				<view class="headView">所在单位：</view>
				<view class="input-text">软件学院</view>
			</view>
			<view class="bottomLine" />
		</view>
		
	<uni-section title="历年体检报告" type="line" />
	 <view class="item-t" v-for="(item, index) in orderList" :key="index">
	 	<view style="display: flex;flex-direction: column;justify-content: right;align-items: flex-start;width: 100%;" >
	 		<view style="margin-bottom: 3px;">
	 			年度：<text style="font-weight: bold;" >2019</text>
	 		</view>
	 		<view style="margin-bottom: 3px;">
	 			体检卷：<text style="font-weight: bold;" >B1</text>
	 		</view>
	 		<view style="margin-bottom: 3px;">
	 			查体单位：<text style="font-weight: bold;" >山东大学齐鲁软件学院</text>
	 		</view>
	 		<view style="margin-bottom: 3px;">
	 			基本套餐：<text style="font-weight: bold;" >套餐4</text>
	 		</view>	
			<view style="margin-bottom: 3px;display: flex;flex-direction: row;">
					<view style="color: blue;" >查体报告下载</view>
					<view style="color: blue;margin-left: 50px;" >评估报告下载</view>
			</view>	
			<!-- <view style="margin-bottom: 3px;">
					<view style="color: blue;" >评估报告下载</view>
			</view> -->	
		 	</view>	
										
	 									
	
	 		
	 </view>
	</view>
</template>

<script>
	export default {
	
		data() {
			return {
				orderList:[1,2,3],
	
			};
		},
	
		onShow() {
			viewOrder().then(res => {
				this.orderList = res.data.payList
			});
		},
		methods: {
			},
}
</script>

<style>
</style>
