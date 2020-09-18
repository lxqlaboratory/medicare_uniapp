<template>
	<view>
		<view class='s3top'>
			<image src="/static/image/icon_succOrder.png"></image>
			<view>您已成功报名</view>
		</view>

		<view class="adBaseView">
			<view class="adRowView2">
				<view class="headView">您的姓名：</view>
				<view class="input-text">{{perName}}</view>
			</view>
			<view class="bottomLine" />
		</view>

		<view class="adBaseView">
			<view class="adRowView2">
				<view class="headView">体检单位：</view>
				<view class="input-text">{{checkName}}</view>
			</view>
			<view class="bottomLine" />
		</view>

		<view class="adBaseView">
			<view class="adRowView2">
				<view class="headView">套餐类型：</view>
				<view class="input-text">{{projectName}}</view>
			</view>
			<view class="bottomLine" />
		</view>

		<view class="adBaseView">
			<view class="adRowView2">
				<view class="headView">查体地点：</view>
				<view class="input-text">{{checkPlace}}</view>
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
	import {
		physicalexaminationApplyView
	} from '@/api/medicare.js'

	export default {
		components: {
			uniList,
			uniListItem
		},
		data() {
			return {
				perName: '',
				checkName: '',
				projectName: '',
				checkPlace: '',
				checkTelephone:'',
				promptList: [],
				noticeList: [],
				itemList: [],
				year: '',
			}
		},
		onShow: function(e) {
			this.fetchData()
		},
		methods: {
			change(e){
				console.log(e)
			},
			switchChange(e) {
				
				if (e.value === true) {
					
					console.log('qqqq'+this.itemList)
					this.showProject = true
				} else if (e.value === false) {
					this.showProject = false
				}
			},
			fetchData() {

				physicalexaminationApplyView().then(res => {
					this.showProject = false
					if (res.re == 1) {
						this.perName = res.data.perName
						this.checkName = res.data.checkName
						this.checkPlace = res.data.checkPlace
						this.checkTelephone = res.data.checkTelephone
						this.projectName = res.data.projectName
						this.promptList = res.data.promptList
						this.noticeList = res.data.noticeList
						this.itemList = res.data.itemList
						this.isLoading = false
					} else {
						console.log(res)
						this.isLoading = false
					}
				}).catch(err => {

				})
			},
		}
	}
</script>

<style>

</style>
