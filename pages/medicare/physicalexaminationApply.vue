<template>
	<view>
		<view>
			<uni-section title="个人信息" type="line" />

			<view class="adBaseView">
				<view class="adRowView">
					<view class="headView">身份证号</view>
					<view style="width: 70%;"><input class="input" v-model="personInfo.perIdCard" readOnly='true' /></view>
				</view>
				<view class="bottomLine" />
			</view>

			<view class="adBaseView">
				<view class="adRowView">
					<view class="headView">工号</view>
					<view style="width: 70%;"><input class="input" v-model="personInfo.perNum" readOnly='true' /></view>
				</view>
				<view class="bottomLine" />
			</view>

			<view class="adBaseView">
				<view class="adRowView">
					<view class="headView">单位</view>
					<view style="width: 70%;"><input class="input" v-model="personInfo.collegeName" readOnly='true' /></view>
				</view>
				<view class="bottomLine" />
			</view>

			<view class="adBaseView">
				<view class="adRowView">
					<view class="headView">姓名</view>
					<view style="width: 70%;"><input class="input" v-model="personInfo.perName" readOnly='true' /></view>
				</view>
				<view class="bottomLine" />
			</view>

			<view class="adBaseView">
				<view class="adRowView">
					<view class="headView">性别</view>
					<view class="uni-list">
						<view class="uni-list-cell">
							<view class="uni-list-cell-db">
								<picker @change="bindPickerGenderChange" :value="genderIndex" :range="genders">
									<view class="uni-input">{{genders[genderIndex]}}</view>
								</picker>
							</view>
						</view>
					</view>
				</view>
				<view class="bottomLine" />
			</view>
			
			
			<view class="adBaseView">
			<view class="adRowView">
				<view class="headView">婚姻状态</view>
				<view class="uni-list">
					<view class="uni-list-cell">
						<view class="uni-list-cell-db">
							<picker @change="bindPickerMarryChange" :value="marryIndex" :range="marryStates">
								<view class="uni-input">{{marryStates[marryIndex]}}</view>
							</picker>
						</view>
					</view>
				</view>
				</view>
				<view class="bottomLine" />
			</view>


            <view class="adBaseView">
			<view class="adRowView">
				<view class="headView">联系方式</view>
				<view style="width: 70%;"><input class="input" v-model="personInfo.mobilePhone" /></view>
				</view>
				<view class="bottomLine" />
			</view>
		</view>

		<button class="button-cell2" @click="submit">保存并提交</button>
		<button class="button-cell2" @click="navigateTestPage">跳转</button>
	</view>
	</view>
</template>

<script>
	import {
		physicalexaminationApplyInit
	} from '@/api/medicare.js'
	export default {
		data() {
			return {
				personInfo: {},
				marryIndex: 0,
				genderIndex: 0,
				marryStates: ['未婚', '已婚'],
				genders: ['男', '女'],

			}
		},
		onShow: function(e) {
			physicalexaminationApplyInit().then(res => {
				if (res.re == 1) {
					this.personInfo = res.data.personInfo
					if(this.personInfo.genderCode === '1'){
						this.genderIndex = 0
					}else{
						this.genderIndex = 1
					}
					if(this.personInfo.marryStateStr === '未婚'){
						this.genderIndex = 0
					}else{
						this.genderIndex = 1
					}
					
					this.isPhysicalClose = res.data.isPhysicalClose
					this.isLoading = false
				} else {
					console.log(res)
					this.isLoading = false
				}
			}).catch(err => {

			})
		},
		methods: {
			bindPickerGenderChange(e) {
				this.genderIndex = e.target.value
				this.personInfo.genderCode = this.genderIndex
			},
			bindPickerMarryChange(e){
				this.marryIndex = e.target.value
				if(this.marryIndex === '0'){
					this.personInfo.marryStateStr = '未婚'
				}else {
					this.personInfo.marryStateStr = '已婚'
				}
			},
			navigateTestPage(){
				//在同一个medicare目录下
				uni.navigateTo({
					url:'./physicalexaminationApplyView'
				})
				
				// 在不同目录下
				// uni.navigateTo({
				// 	url:'../base/baseInfo'
				// })
			},
			saveQualificationInfo() {
				saveQualificationInfo({
					form: this.personInfo,
				}).then(res => {
					console.log(res)
					if (res.re == '1') {
						uni.showModal({
							title: '提示',
							content: '保存成功'
						});
						getQualificationIno().then(res => {
							this.noAuditList = res.data.applyList
							this.haveAuditedList = res.data.unapplyList
							this.infoForm = res.data.form
							this.isCanEdit = res.data.isCanEdit
							this.isLoading = false
							console.log(res)
						}).catch(err => {

						})
					} else {
						this.isLoading = false
						uni.showModal({
							title: '提示',
							content: '保存失败'
						});
					}
				}).catch(err => {})

			},
		}
	}
</script>

<style>

</style>
