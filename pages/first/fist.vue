<template>
	<view>


		<view class="main-core">

			<view class="main-core-item" v-for="item in list" :key=item.resId>
				<view @click="swtich(item.cmd)">
					<image class="core-item-icon" :src="item.image"></image>
					<text class="core-item-name">{{item.name}}</text>
				</view>

			</view>

		</view>




	</view>
</template>

<script>
	import {
		MenuList
	} from '@/api/login.js'
	export default {
		data() {
			return {
				texta: '',
				funcBlockList: [],
				show: false,
				list: []
			}
		},
		onShow() {

			MenuList({}).then(res => {
				this.list = res.data
			}).catch(err => {

			})
		},
		methods: {
			swtich(url) {
				console.log(url)
				uni.navigateTo({
					url: '../' + url
				})
			}
		}
	}
</script>

<style lang='scss'>
	.main-core {
		background-color: white;
		display: flex;
		flex-flow: row wrap;
		align-content: flex-start;
		height: 18%;
		overflow: hidden;

	}

	.main-core-item {
		display: flex;
		flex-flow: column wrap;
		justify-content: center;
		align-items: center;
		box-sizing: border-box;
		width: 30%;
		height: 170upx;
	}

	.core-item-icon {
		display: block;
		width: 85upx;
		height: 85upx;
		margin: 15upx auto;
	}

	.core-item-name {
		display: block;

		font-size: 20upx;
	}

	.title {
		position: relative;
		padding-bottom: 10upx;
		text-align: center;
		background-color: #C8C7CC;

	}

	.text {
		font-weight: 500;
		font-size: 30upx;

	}

	.container {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		margin-bottom: 30rpx;
	}

	.history-section {
		padding: 30upx 0 0;
		width: 700rpx;
		margin-top: 30upx;
		background: #fff;
		border-radius: 20upx;

		.sec-header {
			border-bottom: 1px solid #cccccc;
			display: flex;
			align-items: center;
			font-size: $font-base;
			color: #303133;
			line-height: 40upx;
			/* margin-left: 30upx; */
			width: 100%;
			padding: 1px 1px 10px 10px;

			.yticon {
				font-size: 44upx;
				color: #5eba8f;
				margin-right: 16upx;
				line-height: 40upx;
			}
		}

		.h-list {
			display: flex;
			flex-direction: row;
			flex-wrap: wrap;
			padding-top: 10px;
			/* border: 1px solid #007AFF; */
			/* padding: 10rpx; */
			/* white-space: nowrap;
			padding: 30upx 30upx 0; */
			/* image{
				display:inline-block;
				width: 160upx;
				height: 160upx;
				
				border-radius: 10upx;
			} */
		}
	}

	.function-item {
		margin-bottom: 10px;
		width: 175rpx;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		height: auto;
		/* border: 1px solid #007AFF; */
	}

	.tit {
		font-size: $font-base+2upx;
		color: #f7d680;
		margin-bottom: 28upx;

		.yticon {
			color: #f6e5a3;
			margin-right: 16upx;
		}
	}

	.core-item-icon {
		display: block;
		width: 85upx;
		height: 85upx;
		/* margin: 15upx auto; */
	}
</style>
