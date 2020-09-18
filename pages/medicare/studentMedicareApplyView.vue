<template>
	<view>
		<view>
            <view class="section2">
            			   <view class="stitle">
            				   报名信息
            			   </view>
            </view>
			<view class="adBaseView">
				<view class="adRowView">
					<view class="headView">学号</view>
					<view class="input-text">{{form.perNum}}</view>
				</view>
				<view class="bottomLine" />
			</view>
			<view class="adBaseView">
				<view class="adRowView">
					<view class="headView">姓名</view>
					<view class="input-text">{{form.perName}}</view>
				</view>
				<view class="bottomLine" />
			</view>
			<view class="adBaseView">
				<view class="adRowView">
					<view class="headView">身份证号</view>
					<view class="input-text">{{form.perIdCard}}</view>
				</view>
				<view class="bottomLine" />
			</view>
			<view class="adBaseView">
				<view class="adRowView">
					<view class="headView">性别</view>
					<view class="input-text">{{form.genderCodeName}}</view>
				</view>
				<view class="bottomLine" />
			</view>
			<view class="adBaseView">
				<view class="adRowView">
					<view class="headView">出生日期</view>
					<view class="input-text">{{form.perBirth}}</view>
				</view>
				<view class="bottomLine" />
			</view>
			<view class="adBaseView">
				<view class="adRowView">
					<view class="headView">联系方式</view>
					<view class="input-text">{{form.mobilePhone}}</view>
				</view>
				<view class="bottomLine" />
			</view>
			<view class="adBaseView">
				<view class="adRowView">
					<view class="headView">所在学院</view>
					<view class="input-text">{{form.collegeName}}</view>
				</view>
				<view class="bottomLine" />
			</view>
			<view class="adBaseView">
				<view class="adRowView">
					<view class="headView">所学专业</view>
					<view class="input-text">{{form.majorName}}</view>
				</view>
				<view class="bottomLine" />
			</view>
			<view class="adBaseView">
				<view class="adRowView">
					<view class="headView">所学年级</view>
					<view class="input-text">{{form.grade}}</view>
				</view>
				<view class="bottomLine" />
			</view>
			<view class="adBaseView">
				<view class="adRowView">
					<view class="headView">所学班级</view>
					<view class="input-text">{{form.perClass}}</view>
				</view>
				<view class="bottomLine" />
			</view>
			<view class="adBaseView">
				<view class="adRowView">
					<view class="headView">缴费状态</view>
					<view class="input-text">{{form.payStatus}}</view>
				</view>
				<view class="bottomLine" />
			</view>
			<view class="adBaseView">
				<view class="adRowView">
					<view class="headView">缴费方式</view>
					<view class="input-text">{{form.modelPayName}}</view>
				</view>
				<view class="bottomLine" />
			</view>
		</view>
	</view>
</template>

<script>
	import {
		studentMedicareApplyView
	} from '@/api/medicare.js'
	export default {
		data() {
			return {
				form: {
					medicareId:'',
					perNum: '',
					perName: '',
					perIdCard: '',
					genderCodeName: '',
					perBirth:'',
					mobilePhone: '',
					modelPayName:'',
					payStatus:'',
					collegeNum:'',
					collegeName:'',
					majorNum:'',
					majorName: '',
					grade: '',
					perClass:'',
					cardNum:'',
					isFree:''
				},
				isEmpty:'0',
				year: '',
			}
		},
		onShow: function(e) {
			this.fetchData()
		},
		methods: {
			fetchData() {
				studentMedicareApplyView().then(res => {
					if (res.re == 1) {
						this.form = res.data.form
						this.isEmpty = res.data.isEmpty
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
