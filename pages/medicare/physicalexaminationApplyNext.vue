<template>
	<view>
套餐选择	{{marryIndex}} {{genderIndex}}	
	</view>
</template>

<script>
	export default {
		data() {
			return {
				marryIndex: '',
				genderIndex: '',
			}
		},
		onLoad(options) {
			this.marryIndex = options.marryIndex
			this.genderIndex = options.genderIndex
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
