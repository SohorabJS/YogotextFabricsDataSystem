Now we will build frontend UI.Go to where have fabric management page. and add few menu on the page.and connect link with the backend system code.Here we link up sample type like Regular sample, Padding Sample, Head Setting Sample, T-version sample, Master Song Development Sample , Mercerise/Semi-mercerise Sample.Ok i am giving you demo of the page UI below:

create a header of fabrics data management.

Sample Data
Regular Sample Data | Padding Sample Data | Heat Setting Sample Data | Mercerise/Semi-Mercerise Sample Data | T-verson Sample Data | Master Song Development Data


Lets start to build as needed according as i told you.Build a dynamic UI. Every single sample data menu would be link with new single UI.When i click on the link of sample data menu it will bear a user on the new UI and every single page will appear with a search bar to request to server[mongDB] to rettrive data when i will search through the search bar by it might be simple_code or sample_item_code or customer name, or finishing_data or Sample Issue Data. every sample item code details will appear on the current page. Data will show well organize . Make a dynamic UI for vissualize details of sample data. Lets build like this.

Later I will add more Fabrics type Data Here.....




#nav side bar modification:
lets fix the height issues,side bar height will start bottom of the nav bar.and it will not move if i scroll. then fix the width issus between side bar and main home page. side bar and home page stay in a same div. but side bar will take 20% width and home page will take 80% width.and On the home content will scroll only . set a bg color behind of the content.Assuem content will only scroll and bg color will not move like that. lets start building.







fix the regular sample data searching part:
check backend code and UI code. where is the problem.I think they are not connect each other.While i am searching any data through sampleCode, sampleItemCode or may customer name. dont get any reasult on the search page.Its showing Failed to fetch .fix that. One thing, suppose i have same sample code with multiple sample code i need to get all related data when it comes mulitple same sample Code. then build UI that i can see those data like this: check below
this is for big screen:





Same thing do with Heat Setting sample data as you did regular sample data part : backend + UI both handle.Only i have added few data item.Otherwise all are same. lets go.Also important, when i store same sample code sample/item code, they are also able to get at the same time. 


Sample code:                 
┌──────────────────────────────────────────────────────────────┐
│ Sample Code           :sampleCode                       
│ Sample Item Code      :sampleItemCode 
| Processing Type       :processingType
| Construction          :construction
| Color                 :color
| Customer Name         :customerName
│ Required Width        :customerRequiredWidth         
│ Length Tolerance      :customerRequirementLengthPercent   
│ Width Tolerance       :customerRequirementWidthPercent                    
│ Weight Tolerance      : weightBW
| Sample Issue Date     :sampleIssueDate                  
| Sample Finishing Date :finishingDate 
| Loom                  :loomNo
| Warpping No           :warpingNo
| Yards                 :yard
| PPI                   :weavingPPI
| 
| Dryer Width           :afterDryerWidthInch
| Dryer Skew            :dryerSkewCM
| 
| A/Shringkage PPI      :afterShrinkagePPI
| A/Shringkage Skew     :afterShrinkageSkewCM
| A/Shirngkage Width    :afterShrinkageWidthInch
| PPI(+)                :ppiPlus
|
| A/Wash Skew           :afterWashSkewCM
| A/Wash Width          :afterWashWidthInch
| A/Wash PPI            :afterWashPPI
| Left Hand Box Skew (%):boxPercentLeftHand
| Right Hand Box Skew (%):boxPercentLeftHand
| A/Wash Width %        :afterWashWidthPercent
| A/Wash Length %       :afterWashLengthPercent
| 
| 
| Fabrics Process Flow   :sampleProcessingDetails
| Heat Setting Machine Setting :burnerQ , machineSpeed,   machineWidthSetting, tempSetting ;
|
└──────────────────────────────────────────────────────────────┘



Hey i need to store large amount of data set. check in the public folder/uploads/regularSampleData.csv 
have to setup for regular sample data, I dont know how to upload csv file.Just setup and push data collection name into ' regularsamples ' lets go.also install needed dependency if need for upload csv file.

i have small issue in nav_side bar. when i view in small device. side bar dont take full height top to bottom.fix the bug. and make the background transparent of sidebar.




Hey man, there are on the mongDB database server storing those datas are null:

boxPercentRightHand: null
boxPercentLeftHand: null
afterWashWidthPercent: null
afterWashLengthPercent: null
And data are not display on the client UI.fix that problem. check UI code and backend code both and fix immidiately. 



CSV file configure with the column title name:
sampleCode	sampleItemCode	processingType	construction	color	customerName	customerRequiredWidth	customerRequirementLengthPercent	customerRequirementWidthPercent	weightBW	sampleIssueDate	finishingDate	loomNo	warpingNo	yard	afterDryerWidthInch	weavingPPI	dryerSkewCM	afterShrinkageSkewCM	afterShrinkagePPI	ppiPlus	afterWashSkewCM	afterShrinkageWidthInch	boxPercentRightHand	boxPercentLeftHand	afterWashWidthPercent	afterWashLengthPercent	afterWashWidthInch	afterWashPPI	sampleProcessingDetails	Remarks

I haved made with this title column name of every single data of CSV file. Just you check , Are they matching with the name created data model for regular sample data.If may any thing i have made mistake. then fix and where was problem just identify.Because you know boxPercentRightHand	boxPercentLeftHand	afterWashWidthPercent	afterWashLengthPercent data are store as a null property. I need solution . when it shows null and on the UI section the data are empty. 





Heat Setting Sample Setup note:
1) below i am presenting heat setting sample data column title, and make sure those data column title match with created heat setting sample data model.If not match with given csv file data column, fix it immidiatly according to.
→ sampleCode	sampleItemName	constructionNo	color	customerName	customerRequiredWidth	customerRequiredWidth%	customerRequiredLength%	customerRequiredWeight	loomNo	warppingNo	yard	beforeHeatSettingWidth	afterHeatSettingWidth	afterDryerWidth	weavingPPI	afterDryerSkew	sampleIssueDate	finishingDate	afterShrinkageSkew	afterShrinkagePPI	afterShrinkagePPI+	afterWashSkew	afterShrinkageWidth	boxPercentRightHand	boxPercentLeftHand	afterWashWidthPercent	afterWashLengthPercent	afterWashWidth	afterWashPPI	burnnerQnt	m/cSpeed	machineWidthSetting	tempSetting	sampleProcessingDetails

2) before pushing data on the database server. Need to make sure those data will store in the particular data collection name is "heatsettingsamples" whice is already created in mongDB database.Every thing will go same like regular data process.How regular sample data are dealing with UI and backend.just i have added few particular field in heat setting sample data process. add them and safely check backend and UI code and build according to the need handling those data. lets go. 




thos issues are encountering with Heat Setting sample data section:
→ Hey man there is an issue with a field name "customerRequiredWidth" fix that , acually what happend listen.Assume 
customerRequiredWidth is a specific field. instead of exact value storing in this field , another data of the field name is customerRequirementWidthPercent(this data is being set in this field(customerRequiredWidth))

→ same thing happend with afterShrinkagePPI(it doesnt set exact value ) there is being set ppiPlus field value. fix also that issue.

→Occuring another issue with those field sampleIssueData and finishingData. it isnt being setting exact value.

accually what are the value in the csv file. Not being set exact value in the UI. also those value are not store as original value. check the csv file field.lets fix.