</template>
			<view class="adBaseView">
				<view class="adRowView">
					<view class="headView">
						<view class="mustView">*</view>缴费方式
					</view>
					<view v-if="form.isFree===true" class="input-text">form.modelPayName</view>
					<view v-else class="uni-list">
						<view class="uni-list-cell">
							<view class="uni-list-cell-db">
								<picker @change="bindPickerModelPayChange" :value="form.modelPay" :range="payModels">
									<view class="uni-input">{{payModels[form.modelPay]}}</view>
								</picker>
							</view>
						</view>
					</view>
				</view>
				<view class="bottomLine" />
			</view>
			<view  v-for="(item,index) in statisticList"  :key="index">
					<view class="row">
						<text class="row-title">缴费模式: </text>
						<text>{{item.modelPayName}}</text>
					</view>
					<view class="row">
						<text class="row-title">已缴费人数: </text>
						<text>{{item.count0}}</text>
					</view>
					<view class="row">
						<text class="row-title">未缴费人数: </text>
						<text>{{item.count1}}</text>
					</view>
				<view class="bottomLine3"></view>
			</view>
			<view  v-for="(item,index) in studentList"  :key="index">
					<view class="row">
						<text class="row-title">学号姓名: </text>
						<text>{{item.perNum}}</text>
					</view>
					<view class="row">
						<text class="row-title">姓名: </text>
						<text>{{item.perName}}</text>
					</view>
					<view class="row">
						<text class="row-title">专业: </text>
						<text>{{item.majorName}}</text>
					</view>
					<view class="row">
						<text class="row-title">班级: </text>
						<text>{{item.perClass}}</text>
					</view>
					<view class="row">
						<text class="row-title">联系电话: </text>
						<text>{{item.mobilePhone}}</text>
					</view>
				<view class="bottomLine3"></view>
			</view>
		</view>
</template>
<script>
	import {
		collegeMedicareApplyQuery
	} from '@/api/medicare.js'
	import {
		collegeMedicareApplyStatisticsList
	} from '@/api/login.js'
	export default {
		data() {
			return {
				perTypeCode:1,
				grade:'',
				gradeIndex:0,
				gradeList:[],
				year:'',
				collegeNum:'',
				modelPay:'0',
				payStatus:'0',
				studentList:[]
			}
		},
		
		methods: {
			onLoad(option) {
				this.perTypeCode = option.perTypeCode;
				collegeMedicareApplyQuery({
					perTypeCode:this.perTypeCode,
				}).then(res => {
					this.year = reds.data.year
					this.collegeNum = res.data.collegeNum
					this.grade = res.data.grade
					this.gradeIndex = res.data.gradeIndex
					this.gradeList = res.data.gradeList
					this.statisticsList = res.data.statisticsList
				}).catch(err => {					
				})		
			},
			
			swtich(dataItemNum,payStatus){
				console.log(dataItemNum)
				uni.navigateTo({
					url: '/pages/medicare/details?grade='+this.grade+'&dataItemNum='+dataItemNum+'&payStatus='+payStatus+'&mTypeCode='+this.mTypeCode
				})
			},
				
				
			search(){
				searchUndergraduate({
					mTypeCode:this.mTypeCode,
					grade:this.grade
				}).then(res => {
					this.list = res.data
				}).catch(err => {
					
				})
			},
			optionChange:function(e){
				this.optiontIndex = e.target.value;
				this.grade = this.options[this.optiontIndex];
				console.log(this.grade);
				showTotal({
					mTypeCode:this.mTypeCode,
					grade:this.grade
				}).then(res => {
					this.perPaid = res.data.perPaid
					this.perUnpaid = res.data.perUnpaid
					this.abanPaid = res.data.abanPaid
					this.governPaid = res.data.governPaid
					this.governUnpaid = res.data.governUnpaid
					this.schPaid = res.data.schPaid
					this.schUnpaid = res.data.schUnpaid
					this.unApply = res.data.unApply
					// console.log(this.stuList)
					// this.current = this.stuList.length + 1
				}).catch(err => {
					
				})
			}
			
		}
	}
</script>

<style>
</style>
