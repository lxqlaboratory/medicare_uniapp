<template>
	<view>
		<view>
			<button class="button-cell" @click="unboding">解除绑定</button>
		</view>  
	</view>
</template>

<script>
import { unbounding } from '@/api/login.js'
	import uniSection from '@/components/uni-section/uni-section.vue'
	export default {
      components: {
	    uniSection
	 },
		data() {
			return {
			}
		},
		methods: {
			unboding() {
				unbounding({}).then(res => {
					if(res.re === 1){
				uni.showModal({
					title: '提示',
					showCancel: false,
					confirmColor: "#000000",
					content: '解绑成功',
					success: function(res) {
						if (res.confirm) {
							uni.navigateTo({
								url: '../index/index'
							})
						}
					}
				});		
					}
				
				}).catch(err => {

				})
			},
		}
	}
</script>

<style scoped>
	.button-cell {

		width: 45%;
		font-size: 28upx;
		margin-top: 10upx;
		background-color: red;

	}

	.button-cell2 {
		width: 45%;
		font-size: 28upx;
		margin-top: 10upx;
		background-color: #7acfa6;
	}

	.adBaseView {
		width: 100%;
		background-color: #FFFFFF;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding-top: 20upx;
	}

	.adRowView {
		width: calc(100% - 48upx);
		display: flex;
		flex-direction: row;
		align-items: center;
		color: rgb(94, 94, 94);
	}

	.headView {
		flex: 1;
		text-align: left;
		/* margin-left: 30upx; */
		font-size: 28upx;
		/*超出一行点点点*/
		overflow: hidden;
		/*超出的部分隐藏起来。*/
		white-space: nowrap;
		/*不显示的地方用省略号...代替*/
		text-overflow: ellipsis;
		/* 支持 IE */

		display: flex;
		flex-direction: row;
		align-items: center;
	}

	.mustView {
		color: red;
		font-size: 32upx;
		margin-left: 10upx;
	}

	.bottomLine {
		width: 95%;
		height: 2upx;
		background-color: #DDDDDD;
		margin-top: 20upx;
	}

	.input {
		text-align: right !important;
		font-size: 28upx !important;
	}

	.input-text {
		text-align: right !important;
		font-size: 28upx !important;
		color: rgb(128, 128, 128);
	}
</style>
