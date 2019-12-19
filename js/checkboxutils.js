function getCheckBoxRes(checkboxid){	
	var rdsObj=document.getElementsByClassName(checkboxid);
	var checkVal=new Array();
	
	var k=0;	
	for(var i=0;i<rdsObj.length;i++){		
		if(rdsObj[i].checked){
			var map={};
			map['id']=rdsObj[i].value;
			map['name']=rdsObj[i].name;
			
			checkVal[k]=map;			
			k++;
		}
	}	
	return checkVal;
}
