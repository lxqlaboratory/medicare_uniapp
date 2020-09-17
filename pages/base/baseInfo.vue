<template>
	<view>
		<view>
			<uni-section title="个人基本信息" type="line" />
			
			<view class="adBaseView">
				<view class="adRowView">
					<view class="headView">姓名</view>
					<view style="width: 70%;"><input class="input" v-model="username" placeholder="请输入你的名字" /></view>
				</view>
				<view class="bottomLine"></view>
			</view>

			<view class="adBaseView">
				<view class="adRowView">
					<view class="headView">性别</view>
					<view class="uni-list">
					            <view class="uni-list-cell">
					                <view class="uni-list-cell-db">
					                    <picker @change="bindPickerChange" :value="index" :range="array">
					                        <view class="uni-input">{{array[index]}}</view>
					                    </picker>
					                </view>
					            </view>
					</view>	
				</view>
				<view class="bottomLine" />
			</view>

             <view class="adBaseView">
             	<view class="adRowView">
             		<view class="headView">出生年月</view>    		
					 <view class="uni-list">
					            <view class="uni-list-cell">
					                <view class="uni-list-cell-db">
					                    <picker mode="date" :value="date" :start="startDate" :end="endDate" @change="bindDateChange">
					                        <view class="uni-input">{{date}}</view>
					                    </picker>
					                </view>
					            </view>
					</view>
             	</view>
             	<view class="bottomLine" />
             </view>

				
			</view>
			<view class="adBaseView">
				<view class="adRowView">
					<view class="headView">身份证号</view>
					<view style="width: 70%;"><input class="input" v-model="perIdCard" placeholder="请输入身份证号" /></view>
				</view>
				<view class="bottomLine" />
			</view>

	
			<button class="button-cell2" @click="submit">保存并提交</button> 
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
			const currentDate = this.getDate({
				format: true
			})
			return {
				array: ['男', '女'],
				index: 0,
				date: currentDate,
				perName: '',
				perIdCard: '',
				perBirthday: '',
				memberNum: '',
				badmintonLevelList: [],
				classNumm: '',
				validTime: '',
				logo: '',
				assoginage: '',
				levelCode: '',
				gendercode: '',
				activityAdress: '',
				badmintonLevelIndex: 0
			}
		},
		onShow() {

			personBaseInfoMaintainInit({}).then(res => {
				this.perName = res.data.perName
				this.perIdCard = res.data.perIdCard
				this.perBirthday = res.data.perBirthday
				this.memberNum = res.data.memberNum
				this.badmintonLevelList = res.data.badmintonLevelList
				this.validTime = res.data.validTime
				this.classNumm = res.data.classNumm
				this.assoginage = res.data.assoginage
				this.levelCode = res.data.levelCode
				this.gendercode = res.data.gendercode
				this.logo = res.data.logo
				this.activityAdress = res.data.activityAdress
				this.badmintonLevelIndex = res.data.badmintonLevelIndex
			})
		},
		computed: {
			startDate() {
				return this.getDate('start');
			},
			endDate() {
				return this.getDate('end');
			}
		},
		methods: {
			bindPickerChange: function(e) {
			            this.index = e.target.value
			        },
			bindDateChange: function(e) {
			            this.date = e.target.value
			        },
			bindchange(e) {
				this.badmintonLevelIndex = e.target.value
				this.levelCode = this.badmintonLevelList[this.badmintonLevelIndex].value
				console.log(this.levelCode)
			},
			submit() {
				var idCardReg = /^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i;
				if (!this.perIdCard || !idCardReg.test(this.perIdCard)) {
					wx.showToast({
						title: '您输入的身份证号格式有误！',
						icon: 'none',
						duration: 1500
					})

				} else {
					if (this.classNumm === '') {
						uni.showModal({
							title: '提示',
							showCancel: false,
							confirmColor: "#000000",
							content: '不能为空',
							success: function(res) {
								if (res.confirm) {

								}
							}
						});
					} else {
						personBaseInfoMaintain({
							levelCode: this.levelCode,
							perIdCard: this.perIdCard,
							logo: this.logo,
							perBirthday: this.perBirthday,
							classNumm: this.classNumm
						}).then(res => {
							if (res.re === 1) {
								uni.showModal({
									title: '提示',
									showCancel: false,
									confirmColor: "#000000",
									content: '修改成功',
									success: function(res) {
										if (res.confirm) {
										
										}
									}
								});
							}
						})
					}
				}
			},
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
			 getDate(type) {
			            const date = new Date();
			            let year = date.getFullYear();
			            let month = date.getMonth() + 1;
			            let day = date.getDate();
			
			            if (type === 'start') {
			                year = year - 60;
			            } else if (type === 'end') {
			                year = year + 2;
			            }
			            month = month > 9 ? month : '0' + month;;
			            day = day > 9 ? day : '0' + day;
			            return `${year}-${month}-${day}`;
			        }
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
