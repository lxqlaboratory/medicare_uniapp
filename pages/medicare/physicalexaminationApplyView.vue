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
		<uni-collapse @change="change">
			<uni-collapse-item title="友情提示">
				<view class="adBaseView2" v-for="(items,index) in promptList" :key="index">
					<view class="cloumnlist">
						{{index+1}}.{{items}}
					</view>
					<view class="bottomLine" />
				</view>
			</uni-collapse-item>
		</uni-collapse>
		<uni-collapse @change="change">
			<uni-collapse-item title="注意事项">
				<view class="adBaseView2" v-for="(items,index) in noticeList" :key="index">
					<view class="cloumnlist">
						{{index+1}}.{{items}}
					</view>
					<view class="bottomLine" />
				</view>
			</uni-collapse-item>
		</uni-collapse>
		<uni-collapse @change="change">
			<uni-collapse-item title="查体项目">
				<view class="adBaseView2" v-for="items in itemList" :key="items">
					<view class="cloumnlist">
						{{items}}
					</view>
					<view class="bottomLine" />
				</view>
			</uni-collapse-item>
		</uni-collapse>
		
		<button  type='primary'  class='s3bu' style="margin-top:15px;background-color:rgb(18,150,219)" @click="call()">
			<image src="/static/image/icon_clinic_tel_l.png"></image>
			<view>联系电话</view>
		</button>
		
		<!-- <button class="button-cell2" @click="call()">联系电话</button> -->
	</view>


</template>

<script>
	import uniCollapse from '@/components/uni-collapse/uni-collapse.vue'
	import uniCollapseItem from '@/components/uni-collapse-item/uni-collapse-item.vue'
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
			uniCollapse,
			uniCollapseItem,
			uniListItem
		},
		data() {
			return {
				perName: '',
				checkName: '',
				projectName: '',
				checkPlace: '',
				checkTelephone: '',
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
			call() {
				uni.makePhoneCall({
						// 手机号
						phoneNumber: this.checkTelephone,
						// 成功回调
						success: (res) => {
							console.log('调用成功!')
						},
						// 失败回调
						fail: (res) => {
							console.log('调用失败!')
							this.call_phone();//重复调用一次
						}
					});
			},
			change(e) {
				console.log(e)
			},
			switchChange(e) {

				if (e.value === true) {

					console.log('qqqq' + this.itemList)
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

<style scoped>
.s3bu{
  line-height: 5vh;
  width: 40vw;
  border-radius: 5px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
.s3bu image{
  margin-right: 10px;
  height: 4vh;
  width: 4vh;
}
</style>
