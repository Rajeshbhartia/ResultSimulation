(this["webpackJsonpresult-simulation"]=this["webpackJsonpresult-simulation"]||[]).push([[0],{101:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),l=a(9),o=a.n(l),i=(a(86),a(14)),s=a(15),c=a(16),u=a(17),d=a(142),h=a(143),m=a(49),p=a(54),f=a.n(p),g=a(48),b=a(64),v=a(34),y=a(31),C=a.n(y),k=function(e){for(var t=[],a=C.a.utils.decode_range(e).e.c+1,n=0;n<a;++n)t[n]={name:C.a.utils.encode_col(n),key:n};return t},E=a(72),O=a(137),S=a(69),w=a.n(S),A=function(e){Object(u.a)(a,e);var t=Object(c.a)(a);function a(e){var n;return Object(i.a)(this,a),(n=t.call(this,e)).state={file:{},data:[],cols:[],fileValue:""},n.handleFile=n.handleFile.bind(Object(v.a)(n)),n.handleChange=n.handleChange.bind(Object(v.a)(n)),n}return Object(s.a)(a,[{key:"refresh",value:function(){this.setState({file:{},data:[],cols:[],fileValue:""})}},{key:"handleChange",value:function(e){var t=this,a=e.target.files;a&&a[0]&&this.setState({file:a[0],fileValue:e.target.value},(function(){t.handleFile()}))}},{key:"handleFile",value:function(){var e=this,t=new FileReader,a=!!t.readAsBinaryString;t.onload=function(t){var n=t.target.result,r=C.a.read(n,{type:a?"binary":"array",bookVBA:!0}),l=r.SheetNames[0],o=r.Sheets[l],i=C.a.utils.sheet_to_json(o);e.setState({data:i,cols:k(o["!ref"])},(function(){e.props.getData(e.state.data)}))},a?t.readAsBinaryString(this.state.file):t.readAsArrayBuffer(this.state.file)}},{key:"render",value:function(){return r.a.createElement("div",{style:{paddingBottom:"16px"}},r.a.createElement(E.a,{variant:"h4",component:"h2"},"Upload An Excel File To Generate Academic Result"),r.a.createElement("br",null),r.a.createElement("div",{style:{display:"flex",alignItems:"center"}},r.a.createElement("input",{style:{display:"none"},type:"file",value:this.state.fileValue,className:"form-control",id:"file",accept:".xls,.xlsx",onChange:this.handleChange}),r.a.createElement(E.a,{style:{paddingRight:"16px"},variant:"body1",color:"initial"},"Upload File: "),r.a.createElement("label",{htmlFor:"file"},r.a.createElement(O.a,{variant:"contained",color:"default",component:"span",startIcon:r.a.createElement(w.a,null)},"Upload"))),this.state.file.name&&r.a.createElement(r.a.Fragment,null,r.a.createElement(E.a,{style:{paddingRight:"8px"},variant:"body2",color:"initial"},this.state.file.name)))}}]),a}(n.Component),j=a(70),F=a(53),_=a.n(F),D=(a(100),function e(t,a,n,r){var l=this;Object(i.a)(this,e),this._getJsPdfInstance=function(){return new _.a},this.downloadTableAsPDF=function(){l._makePDF();var e=(new Date).toISOString(),t=""!==l._topHeader?l._topHeader:"Institute";l._pdf.save("".concat(t,"_result_").concat(e,".pdf"))},this._makePDF=function(){l._makeHeaderSection(),l._makeMetaDataSection(),l._makeTableDataSection()},this._makeHeaderSection=function(){l._pdf.text(l._topHeader,100,10,"center")},this._makeMetaDataSection=function(){l._pdf.autoTable({startY:23,headStyles:{lineWidth:.1,lineColor:[0,0,0]},styles:{cellWidth:35,cellPadding:.7},didParseCell:function(e){"head"===e.section&&(e.cell.styles.fillColor="white",e.cell.styles.textColor="black",e.cell.styles.lineColor="black"),"body"===e.section&&(e.cell.styles.fillColor="white",e.cell.styles.textColor="black",e.cell.styles.lineColor="black")}})},this._makeTableDataSection=function(){l._pdf.text(l._currentActiveObject,100,55,"center"),l._pdf.setFontSize(10),l._pdf.text((new Date).toDateString(),15,20),l._pdf.autoTable({startY:60,theme:"grid",head:l._makeHeaderRow(),body:l._makeBodyRows(),headStyles:{lineWidth:.1,lineColor:[0,0,0]},styles:{cellPadding:.5,fontSize:9,tableWidth:"wrap"},didParseCell:function(e){"head"===e.section&&(e.cell.styles.fillColor="white",e.cell.styles.textColor="black",e.cell.styles.lineColor="black"),"body"===e.section&&(e.cell.styles.fillColor="white",e.cell.styles.textColor="black",e.cell.styles.lineColor="black")}})},this._makeHeaderRow=function(){return[l._tableHeaderArr.reduce((function(e,t,a){return e[t]=t,e}),{})]},this._makeBodyRows=function(){var e=new Set(l._tableHeaderArr);return l._tableBodyArr.map((function(t){var a=Object(m.a)({},t);return l._pluckSubset(a,e)}))},this._pluckSubset=function(e,t){var a,n={},r=Object(j.a)(t);try{for(r.s();!(a=r.n()).done;){var l=a.value;n[l]=e[l]}}catch(o){r.e(o)}finally{r.f()}return n},this._pdf=this._getJsPdfInstance(),this._tableHeaderArr=t,this._tableBodyArr=a,this._currentActiveObject=n,this._topHeader=r}),x=a(144),P=a(140),I=a(141),R=a(146),H=a(71),B=a(147),T=a(139),G=a(138),N=function(e){Object(u.a)(a,e);var t=Object(c.a)(a);function a(){var e;Object(i.a)(this,a);for(var n=arguments.length,l=new Array(n),o=0;o<n;o++)l[o]=arguments[o];return(e=t.call.apply(t,[this].concat(l))).state={open:!1,contentToShowInDialog:"constraintsPage",numOfGrade:1,presetForm:[]},e.handleClickOpen=function(){e.setState({open:!0})},e.handleClose=function(){e.setState({open:!1,contentToShowInDialog:"constraintsPage",numOfGrade:1,presetForm:[]})},e.makeForm=function(e){return e.value.map((function(t,a){return r.a.createElement(x.a,Object.assign({key:a,id:e.id,InputProps:{readOnly:t.readOnly,inputProps:{max:100,min:10}},variant:"outlined"},t,{style:{width:"100px",margin:"10px"}}))}))},e.handleChange=function(t){e.setState({numOfGrade:t.target.value})},e.onSubmitClick=function(t){t.preventDefault();var a=e.state,n=a.contentToShowInDialog,r=a.numOfGrade;if("constraintsPage"===n){for(var l=parseInt(100/r),o=[],i=0;i<r;i++){var s={};s.id=i,s.value=[{label:"Start",type:"number",name:"start",disabled:!0,onChange:e.onChange,value:l*i+1,required:!0},{label:"End",type:"number",name:"end",onChange:e.onChange,value:i===r-1?100:l*(i+1),disabled:i===r-1,required:!0},{label:"Grade",type:"text",name:"grade",onChange:e.onChange,value:"",required:!0},{label:"GPA",type:"text",name:"gpa",onChange:e.onChange,value:"",required:!0}],o.push(s)}e.setState({contentToShowInDialog:"inputField",presetForm:o})}else"inputField"===n?(e.props.setFormData(e.state.presetForm),e.setState({contentToShowInDialog:"resp"})):"resp"===n&&e.setState({open:!1,contentToShowInDialog:"constraintsPage",numOfGrade:1,presetForm:[]})},e.onChange=function(t){var a=Object(g.a)(e.state.presetForm);a.forEach((function(e,n){e.id==t.target.id&&e.value.forEach((function(e,r){e.name===t.target.name&&("end"===t.target.name?(e.value=t.target.value,a[n+1].value[0].value=parseInt(t.target.value)+1):e.value=t.target.value)}))})),e.setState({presetForm:a})},e}return Object(s.a)(a,[{key:"render",value:function(){var e=this,t=this.state,a=t.open,n=t.contentToShowInDialog,l=t.numOfGrade,o=t.presetForm;return r.a.createElement("div",null,r.a.createElement(O.a,{variant:"contained",color:"primary",onClick:this.handleClickOpen,style:{marginBottom:"20px"}},"Create custom Grade"),r.a.createElement(B.a,{open:a,onClose:this.handleClose,"aria-labelledby":"responsive-dialog-title"},r.a.createElement(G.a,null,"Make custom grade"),r.a.createElement(T.a,null,r.a.createElement("form",{onSubmit:this.onSubmitClick},"constraintsPage"===n&&r.a.createElement(x.a,{variant:"outlined",label:"Set Number of grade",type:"number",onChange:this.handleChange,InputProps:{inputProps:{max:10,min:1}},style:{width:"300px",margin:"10px"},value:l}),"inputField"===n&&Object.entries(o).map((function(t,a){var n=Object(H.a)(t,2),l=(n[0],n[1]);return r.a.createElement("div",{key:a},e.makeForm(l))})),"resp"===n&&r.a.createElement("div",null,"Your custom grade was submitted. Please click the Download Result button to download the result"),r.a.createElement(O.a,{autoFocus:!0,onClick:this.handleClose,color:"primary"},"Cancel"),r.a.createElement(O.a,{type:"submit",color:"primary",autoFocus:!0},"Submit")))))}}]),a}(n.Component),q=function(e){Object(u.a)(a,e);var t=Object(c.a)(a);function a(){var e;Object(i.a)(this,a);for(var n=arguments.length,r=new Array(n),l=0;l<n;l++)r[l]=arguments[l];return(e=t.call.apply(t,[this].concat(r))).state={tableHeadersArr:[],tableRowsArr:[],isBtnDis:!0,payload:{},instituteName:"",gradingArray:[[33,"F","0.00"],[40,"D","1.00"],[50,"C","2.00"],[60,"B","3.00"],[70,"A-","3.50"],[80,"A","4.00"],[100,"A+","5.00"]]},e.getData=function(t){e.setState({tableHeadersArr:Object.keys(t[0]),tableRowsArr:t})},e.generatePDF=Object(b.a)(f.a.mark((function t(){var a,n,r;return f.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:a=Object(g.a)(e.state.tableRowsArr),n=Object.keys(e.state.payload),a.forEach((function(t,a){t.cgpa=e.calculateCGPA(t),n.forEach((function(a){var n=parseInt(a.replace(/[^\d]/g,""),10)||100,r=100*t[a]/n;t[a]=t[a]+" | "+e.gradeCalculator(r)}))})),a.sort((function(e,t){return t.cgpa-e.cgpa})),a.forEach((function(e,t){e.position=t+1})),(r=Object.keys(a[0])).unshift("cgpa"),r.unshift("position"),r.splice(-2),new D(r,a,"Result",e.state.instituteName).downloadTableAsPDF(),e.refresh();case 12:case"end":return t.stop()}}),t)}))),e.refresh=function(){e.setState({tableHeadersArr:[],tableRowsArr:[],payload:{},isBtnDis:!0},(function(){e.fileInputRef.refresh()}))},e.handleChange=function(t){var a=Object(m.a)({},e.state.payload);t.target.checked?a[t.target.name]=t.target.checked:delete a[t.target.name],console.log(a);var n=!0;0!==Object.keys(a).length&&(n=!1),e.setState({payload:a,isBtnDis:n})},e.setName=function(t){e.setState({instituteName:t.target.value})},e.setFormData=function(t){console.log(t);var a=[];t.forEach((function(e,t){var n=[e.value[1].value,e.value[2].value,e.value[3].value];a.push(n)})),console.log(a),e.setState({gradingArray:a})},e}return Object(s.a)(a,[{key:"gradeCalculator",value:function(e){for(var t=0;t<this.state.gradingArray.length;t++){var a=this.state.gradingArray[t];if(e<=a[0]){e="".concat(a[1]," | ").concat(a[2]);break}}return e}},{key:"calculateCGPA",value:function(e){for(var t=Object.keys(this.state.payload),a=0,n=1,r=0;r<t.length;r++){for(var l=t[r],o=parseInt(l.replace(/[^\d]/g,""),10)||100,i=100*e[l]/o,s=0;s<this.state.gradingArray.length;s++){var c=this.state.gradingArray[s];if(i<=c[0]){0===parseFloat(c[2])&&(n=0),a+=parseFloat(c[2]);break}}if(0===n){a=0;break}}return(a/t.length).toFixed(2)}},{key:"render",value:function(){var e=this;return r.a.createElement("div",null,r.a.createElement(A,{getData:this.getData,ref:function(t){e.fileInputRef=t}}),this.state.tableHeadersArr.length>0&&r.a.createElement("div",null,r.a.createElement(E.a,{variant:"h6",component:"h2"},"Choose columns which you want for calculate grade:"),r.a.createElement(x.a,{onChange:this.setName,label:"Enter Institute Name",value:this.state.instituteName,required:!0,variant:"outlined",style:{margin:"20px 0px"}}),r.a.createElement(P.a,{row:!0},this.state.tableHeadersArr.map((function(t,a){return r.a.createElement(I.a,{control:r.a.createElement(R.a,{checked:e.state.payload.item,onChange:e.handleChange,name:t}),label:t,key:a})}))),r.a.createElement(N,{setFormData:this.setFormData})),r.a.createElement(O.a,{variant:"contained",color:"primary",disabled:this.state.isBtnDis,onClick:this.generatePDF},"Download Result"))}}]),a}(n.Component),V=function(e){Object(u.a)(a,e);var t=Object(c.a)(a);function a(){return Object(i.a)(this,a),t.apply(this,arguments)}return Object(s.a)(a,[{key:"render",value:function(){return r.a.createElement("div",null,"FAQ Page")}}]),a}(n.Component),J=function(e){Object(u.a)(a,e);var t=Object(c.a)(a);function a(){var e;Object(i.a)(this,a);for(var n=arguments.length,r=new Array(n),l=0;l<n;l++)r[l]=arguments[l];return(e=t.call.apply(t,[this].concat(r))).state={content:"home"},e.setContent=function(t){e.setState({content:t})},e}return Object(s.a)(a,[{key:"render",value:function(){var e=this,t="home"===this.state.content?.9:1,a="faq"===this.state.content?.9:1;return r.a.createElement("div",null,r.a.createElement(d.a,{position:"fixed",color:"primary",elevation:2},r.a.createElement(h.a,{style:{display:"flex",justifyContent:"space-between"}},r.a.createElement("div",null," App Name"),r.a.createElement("div",null,r.a.createElement("span",{style:{paddingRight:"20px",cursor:"pointer",opacity:t},onClick:function(){e.setContent("home")}}," Home"),r.a.createElement("span",{style:{cursor:"pointer",opacity:a},onClick:function(){e.setContent("faq")}}," Faq")))),r.a.createElement("div",{style:{marginTop:"70px",padding:"20px"}},"home"===this.state.content&&r.a.createElement(q,null),"faq"===this.state.content&&r.a.createElement(V,null)))}}]),a}(n.Component);o.a.render(r.a.createElement(J,null),document.getElementById("root"))},61:function(e,t){},81:function(e,t,a){e.exports=a(101)},86:function(e,t,a){},93:function(e,t){},94:function(e,t){}},[[81,1,2]]]);
//# sourceMappingURL=main.bd5bdc4a.chunk.js.map