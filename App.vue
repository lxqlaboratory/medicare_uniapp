<script>
		
	export default {
		
		globalData: {
		            vueSessionId: '',
					dateTime: new Date(),

				// medicareurl: 'https://jkct.sdu.edu.cn/func'

					medicareurl: 'http://localhost:8080/func'

		        },
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	
	.item-t {
	
	  width: 100%;
	  padding: 15px;
	  border-bottom: 1px solid DarkGray;
	  display: flex;
	  flex-direction: row;
	  justify-content: space-between;
	  align-items: center;
	  background-color: white;
	}
	.s3top{
	  margin: 0 2vw 0 2vw;
	  height: 15vh;
	  display: flex;
	  flex-direction: column;
	  justify-content: center;
	  align-items: center;
	  font-size: 15pt;
	  font-weight: bold;
	  color: #00d8a0;
	  border-bottom: 4px solid rgba(235, 235, 235, 0.86);
	  padding: 10px 0 10px 0;
	}
	.s3top image{
	  height: 15vw;
	  width: 15vw;
	  margin-bottom: 10px;
	}

	.cloumnlist {
	
	margin-left: 30upx;
	font-size: 28upx;
	}
	.button-cell {
	
		width: 45%;
		font-size: 28upx;
		margin-top: 10upx;
		background-color: red;
	
	}
	.section{
		display: flex;
		-webkit-box-orient: horizontal;
		-webkit-box-direction: normal;
		-webkit-flex-direction: row;
		flex-direction: row;
		-webkit-box-align: center;
		-webkit-align-items: center;
		align-items: center;
		padding: 0 10px;
		height: 64px;
		background-color: #f8f8f8;
		border: 1px solid white;
        border-bottom-color: #DDDDDD;
	}
	.section2{
		display: flex;
		-webkit-box-orient: horizontal;
		-webkit-box-direction: normal;
		-webkit-flex-direction: row;
		flex-direction: row;
		-webkit-box-align: center;
		-webkit-align-items: center;
		align-items: center;
		padding: 0 10px;
		height: 50px;
		background-color: #f8f8f8;
		border: 1px solid white;
		border-bottom-color: #DDDDDD;
	}
	.stitle{
		font-size: 32rpx;
		color: #7acfa6;
        font-weight: bold;
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
	.adBaseView2 {
		width: 100%;
		background-color: #FFFFFF;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: left;
		padding-top: 20upx;
	}
	.adRowView {
		width: calc(100% - 48upx);
		display: flex;
		flex-direction: row;
		align-items: center;
		color: rgb(94, 94, 94);
	}
	.adRowView2 {
		width: calc(100% - 48upx);
		display: flex;
		flex-direction: row;
		align-items: center;
		color: rgb(94, 94, 94);
		font-weight: bold;
	}
	
	.headView {
		flex: 1;
		text-align: left;
		/* margin-left: 30upx; */
		font-size: 32upx;
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
	.bottomLine3 {
		width: 95%;
		height: 2upx;
		background-color: #DDDDDD;
	}
	.bottomLine {
		width: 95%;
		height: 2upx;
		background-color: #DDDDDD;
		margin-top: 20upx;
	}
	
	.input {
		text-align: right !important;
		font-size: 32upx !important;
	}
	
	.input-text {
		text-align: right !important;
		font-size: 32upx !important;
		color: rgb(128, 128, 128);
	}
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
	.miniButton2{
		float: right;
				 	justify-content: right;
		   font-size: medium;
		  		  margin-right: 10px;
		  
		  		    border-radius: 5px;
		  		 
		  		    color: #e64340;
		  		    background-color: #f8f8f8;
		    padding-left: 14px;
		    padding-right: 14px;
		    box-sizing: border-box;
		 border: 1upx #e64340 solid;
	

	
	}
	.row-title {
	
		font-size: medium;
		margin-right: 10px;
	}
	.row {
		height: auto;
		padding: 8px;
		weight: 100%;
		background-color: #FFFFFF;
	}	
</style>
