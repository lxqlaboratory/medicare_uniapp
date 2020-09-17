<template>
	<view>
		<view>
			<uni-section title="个人信息" type="line" />

			<view class="adBaseView">
				<view class="adRowView">
					<view class="headView">身份证号</view>
					<view style="width: 70%;"><input class="input" v-model="apply.perIdCard" readOnly='true' /></view>
				</view>
				<view class="bottomLine" />
			</view>

			<view class="adBaseView">
				<view class="adRowView">
					<view class="headView">工号</view>
					<view style="width: 70%;"><input class="input" v-model="apply.perNum" readOnly='true' /></view>
				</view>
				<view class="bottomLine" />
			</view>

			<view class="adBaseView">
				<view class="adRowView">
					<view class="headView">单位</view>
					<view style="width: 70%;"><input class="input" v-model="apply.collegeName" readOnly='true' /></view>
				</view>
				<view class="bottomLine" />
			</view>

			<view class="adBaseView">
				<view class="adRowView">
					<view class="headView">姓名</view>
					<view style="width: 70%;"><input class="input" v-model="apply.perName" readOnly='true' /></view>
				</view>
				<view class="bottomLine" />
			</view>

			<view class="adBaseView">
				<view class="adRowView">
					<view class="headView"><view class="mustView" >*</view>性别</view>
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
				<view class="headView"><view class="mustView" >*</view>出生日期</view>
				<view >
					<picker mode="time" :value="apply.perBirth" start="00:00" end="24:00" @change="bindTimeChangePerBirth">
						<view>{{apply.perBirth}}</view>
					</picker>
				</view>
			</view>
			<view class="bottomLine"/>
		</view>
			
		<view class="adBaseView">
			<view class="adRowView">
				<view class="headView"><view class="mustView" >*</view>婚姻状态</view>
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
				<view class="headView"><view class="mustView" >*</view>联系方式</view>
				<view style="width: 70%;"><input class="input" v-model="apply.mobilePhone" /></view>
				</view>
				<view class="bottomLine" />
			</view>
		</view>
		<view class="adBaseView">
			<view class="adRowView">
				<view class="headView"><view class="mustView" >*</view>查体单位</view>
				<view style="width: 70%;">
					<picker class="input" @change="bindchangeCheckUnit" :value="checkUnitIndex" :range="checkUnitList" :range-key="'unitNum'">
						<view class="uni-input">{{checkUnitList[checkUnitIndex].unitName}}</view>
					</picker>
				</view>
			</view>
			<view class="bottomLine"/>
		</view>	

		<button class="button-cell2" @click="navigateNextPage">下一步</button>
	</view>
	</view>
</template>

<script>
	import {
		physicalexaminationApply
	} from '@/api/medicare.js'
	export default {
		data() {
			return {
				apply: {
					perNum:'',
					perName:'',
					perIdCard:'',
					genderCode:'',
					collegeName:'',
					perBirth:'',
					marryState:'',
					mobilePhone:'',
					cardNum:'',
					checkUnit:'',
				},
				marryIndex: 0,
				genderIndex: 0,
				checkUnitIndex:0,
				marryStates: ['未婚', '已婚'],
				genders: ['男', '女'],
				checkUnitList:[],
				isPhysicalClose:'',
				year:'',

			}
		},
		onShow: function(e) {
			physicalexaminationApply().then(res => {
				if (res.re == 1) {
					this.apply = res.data.apply
					if(this.apply.genderCode === '1'){
						this.genderIndex = 0
					}else{
						this.genderIndex = 1
					}
					if(this.apply.marryState === '0'){
						this.marryIndex = 0
					}else{
						this.marryIndex = 1
					}
					this.checkUnitIndex = res.data.checkUnitIndex
					this.checkUnitList = res.data.chekUnitList
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
				if(this.genderIndex===0) 
					this.apply.genderCode = '1';
				else 
					this.apply.genderCode = '2';
			},
			bindPickerMarryChange(e){
				this.marryIndex = e.target.value
				if(this.marryIndex === 0){
					this.apply.marryState = '0'
				}else {
					this.apply.marryState = '1'
				}
			},
		   bindTimeChangePerBirth(e){
			   this.apply.perBirth = e.target.value
		   },
			bindchangeCheckUnit(e){
				this.checkUnitIndex = e.target.value				 
				this.apply.checkUnit = this.checkUnitList[this.checkUnitIndex].unitNum
			},
			navigateNextPage(){
				//在同一个medicare目录下
				uni.navigateTo({
					url:'./physicalexaminationApplyNext'
				})
				
				// 在不同目录下
				// uni.navigateTo({
				// 	url:'../base/baseInfo'
				// })
			},
			saveQualificationInfo() {
				saveQualificationInfo({
					form: this.apply,
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
