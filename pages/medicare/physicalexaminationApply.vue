<template>
	<view>
		<view>
			<uni-section title="个人信息" type="line" />
			
			<view class="adBaseView">
				<view class="adRowView">
					<view class="headView">身份证号</view>
					<view style="width: 70%;"><input class="input" v-model="personInfo.perIdCard"  readOnly='true' /></view>
				</view>
				<view class="bottomLine"></view>
				<view class="adRowView">
					<view class="headView">工号</view>
					<view style="width: 70%;"><input class="input" v-model="personInfo.perNum"  readOnly='true' /></view>
				</view>
				<view class="bottomLine"></view>
				<view class="adRowView">
					<view class="headView">单位</view>
					<view style="width: 70%;"><input class="input" v-model="personInfo.collegeName"  readOnly='true' /></view>
				</view>
				<view class="bottomLine"></view>
				<view class="adRowView">
					<view class="headView">姓名</view>
					<view style="width: 70%;"><input class="input" v-model="personInfo.perName"  readOnly='true' /></view>
				</view>
				<view class="bottomLine"></view>
				<view class="adRowView">
					<view class="headView">性别</view>
					<view class="uni-list">
						<view class="uni-list-cell">
							<view class="uni-list-cell-db">
								<picker @change="bindPickerChange" :value="index" :range="genders">
									<view class="uni-input">{{genders[index]}}</view>
								</picker>
							</view>
						</view>
					</view>	
				</view>
				<view class="bottomLine"></view>
				<view class="adRowView">
					<view class="headView">婚姻状态</view>
					<view class="uni-list">
						<view class="uni-list-cell">
							<view class="uni-list-cell-db">
								<picker @change="bindPickerChange" :value="personInfo.marryState" :range="marryStates">
									<view class="uni-input">{{marryStates[personInfo.marryState]}}</view>
								</picker>
							</view>
						</view>
					</view>	
				</view>
				<view class="bottomLine"></view>
				<view class="adRowView">
					<view class="headView">联系方式</view>
					<view style="width: 70%;"><input class="input" v-model="personInfo.mobilePhone"   /></view>
				</view>
				<view class="bottomLine"></view>
			</view>	
			<button class="button-cell2" @click="submit">保存并提交</button> 
		</view>  
	</view>
</template>

<script>
	import  {physicalexaminationApplyInit} from '@/api/medicare.js'
	export default {
		data() {
			return {
				personInfo:{
					perIdCard:'',
				},
				isPhysicalClose:0,
				marryStates:['未婚', '已婚'],
				genders: ['男', '女'],
				
			}
		},
		onShow:function(e){		
		   physicalexaminationApplyInit().then(res => {
			   if(res.re==1){
				   this.personInfo = res.data.personInfo
				   this.isPhysicalClose = res.data.isPhysicalClose
				   this.isLoading=false
			   }
			   else{
				   console.log(res)
				   this.isLoading=false  
			   }				
			}).catch(err => {
				
			})
		},
		methods: {
			genderChange(e) {
				this.badmintonLevelIndex = e.target.value
				this.levelCode = this.badmintonLevelList[this.badmintonLevelIndex].value
				console.log(this.levelCode)
			},
			saveQualificationInfo(){
				this.isLoading=true
				console.log(this.infoForm)
				saveQualificationInfo({form:this.infoForm,applyId:this.infoForm.applyId}).then(res => {
					console.log(res)
						  		if(res.re == '1'){
									uni.showModal({
										title: '提示',
										 content: '保存成功'   
									});
									getQualificationIno().then(res => {
												   this.noAuditList = res.data.applyList
												   this.haveAuditedList = res.data.unapplyList
												   this.infoForm=res.data.form
												   this.isCanEdit=res.data.isCanEdit
												   this.isLoading=false
													console.log(res)
												}).catch(err => {
													
												})
								}
								else{
									this.isLoading=false
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

