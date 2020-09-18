<template>
	<view>
		<view class='s3top'>
			<image src="/static/image/icon_succOrder.png"></image>
			<view>您已成功报名</view>
		</view>

		<view class="adBaseView">
			<view class="adRowView2">
				<view class="headView">您的姓名：</view>
				<view class="input-text">李学庆</view>
			</view>
			<view class="bottomLine" />
		</view>

		<view class="adBaseView">
			<view class="adRowView2">
				<view class="headView">体检单位：</view>
				<view class="input-text">齐鲁医院-济南</view>
			</view>
			<view class="bottomLine" />
		</view>

		<view class="adBaseView">
			<view class="adRowView2">
				<view class="headView">套餐类型：</view>
				<view class="input-text">套餐4</view>
			</view>
			<view class="bottomLine" />
		</view>

		<view class="adBaseView">
			<view class="adRowView2">
				<view class="headView">查体地点：</view>
				<view class="input-text">济南市历下区文化西路107号</view>
			</view>
			<view class="bottomLine" />
		</view>


		<uni-list>
			<uni-list-item :show-switch="true" title="友情提示" @switchChange="switchChange"  />
			<uni-list-item :show-switch="true" title="注意事项" @switchChange="switchChange" />
			<uni-list-item :show-switch="true" title="查体项目" @switchChange="switchChange" />
		</uni-list>

	</view>


</template>

<script>
	import {
		uniList
	} from '@/components/uni-list/uni-list.vue'
	import {
		uniListItem
	} from '@/components/uni-list-item/uni-list-item.vue'

	export default {
		components: {
			uniList,
			uniListItem
		},
		data() {
			return {
				
			}
		},
		methods: {
			switchChange(e) {
				console.log(e.value)
			}
		}
	}
</script>

<style>
</style>
