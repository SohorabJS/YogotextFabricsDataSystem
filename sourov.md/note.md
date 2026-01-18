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

