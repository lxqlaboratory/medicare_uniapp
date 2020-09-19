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
		background-color: #7ACFA6;

	}

</style>
