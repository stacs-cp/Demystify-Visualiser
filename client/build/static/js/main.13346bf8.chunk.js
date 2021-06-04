(this["webpackJsonpdemystify-visualiser"]=this["webpackJsonpdemystify-visualiser"]||[]).push([[0],{61:function(t,e,r){},87:function(t,e,r){"use strict";r.r(e);var s=r(0),i=r.n(s),n=r(23),a=r.n(n),o=(r(61),r(6)),l=r(7),c=r(32),h=r(9),u=r(8),p=r(16),d=r.n(p),g=r(24),b=r(95),j=r(99),m=r(100),x=r(97),f=r(92),O=r(93),v=r(43),y=r.n(v);function k(){return S.apply(this,arguments)}function S(){return(S=Object(g.a)(d.a.mark((function t(){var e;return d.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,y.a.get("examples");case 2:return e=t.sent,t.abrupt("return",e.data);case 4:case"end":return t.stop()}}),t)})))).apply(this,arguments)}function w(t){return C.apply(this,arguments)}function C(){return(C=Object(g.a)(d.a.mark((function t(e){var r;return d.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,y.a.get("examples/".concat(e));case 2:return r=t.sent,t.abrupt("return",r.data);case 4:case"end":return t.stop()}}),t)})))).apply(this,arguments)}var N=r(1),B=function(t){Object(h.a)(r,t);var e=Object(u.a)(r);function r(t){var s;return Object(o.a)(this,r),(s=e.call(this,t)).readFile=function(){var t=Object(g.a)(d.a.mark((function t(e){var r;return d.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:e.preventDefault(),(r=new FileReader).onload=function(){var t=Object(g.a)(d.a.mark((function t(e){var r;return d.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:try{r=e.target.result,s.props.setInput(JSON.parse(r))}catch(i){s.props.setError()}case 1:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}(),r.readAsText(e.target.files[0]);case 4:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}(),s.state={isLoading:!0,examples:[]},s}return Object(l.a)(r,[{key:"componentDidMount",value:function(){var t=this;k().then((function(e){return t.setState({examples:e},(function(){return t.setState({isLoading:!1})}))}))}},{key:"getExamples",value:function(){var t=Object(g.a)(d.a.mark((function t(){var e,r;return d.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,k();case 2:return e=t.sent,t.prev=3,r=e.map((function(t){return Object(N.jsx)(b.a.Item,{children:t})})),t.abrupt("return",r);case 8:return t.prev=8,t.t0=t.catch(3),t.abrupt("return",Object(N.jsx)(j.a,{className:"m-0",variant:"warning",children:"Error fetching examples."}));case 11:case"end":return t.stop()}}),t,null,[[3,8]])})));return function(){return t.apply(this,arguments)}}()},{key:"chooseExample",value:function(){var t=Object(g.a)(d.a.mark((function t(e){var r;return d.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,w(e);case 2:r=t.sent,this.props.setInput(r);case 4:case"end":return t.stop()}}),t,this)})));return function(e){return t.apply(this,arguments)}}()},{key:"render",value:function(){var t=this;return Object(N.jsx)(m.a,{className:"mt-3 pt-3",children:Object(N.jsxs)(x.a,{variant:"flush",children:[Object(N.jsx)(x.a.Item,{children:Object(N.jsxs)(f.a,{className:"d-flex justify-content-center",children:[Object(N.jsx)("p",{className:"mx-4",children:"  Load Demystify output from JSON file:"}),Object(N.jsx)("input",{type:"file",onChange:function(e){return t.readFile(e)}})]})}),Object(N.jsx)(x.a.Item,{children:Object(N.jsxs)(f.a,{className:"d-flex justify-content-center",children:[Object(N.jsx)("p",{className:"mx-4 pt-2",children:"Or choose a preloaded example:"}),Object(N.jsxs)(b.a,{onSelect:function(e){return t.chooseExample(e)},children:[Object(N.jsx)(b.a.Toggle,{variant:"success",id:"dropdown-basic",children:"Examples"}),Object(N.jsx)(b.a.Menu,{children:this.state.isLoading?Object(N.jsx)("div",{className:"d-flex justify-content-center",children:Object(N.jsx)(O.a,{animation:"border"})}):this.state.examples.map((function(e){return Object(N.jsx)(b.a.Item,{eventKey:e,onClick:function(){return t.chooseExample(e)},children:e},e)}))})]})]})})]})})}}]),r}(i.a.Component),L=r(94),z=r(13),I=r(96),E=r(55),M=function(t){Object(h.a)(r,t);var e=Object(u.a)(r);function r(){var t;Object(o.a)(this,r);for(var s=arguments.length,i=new Array(s),n=0;n<s;n++)i[n]=arguments[n];return(t=e.call.apply(e,[this].concat(i))).state={currentStep:t.props.currentStep},t}return Object(l.a)(r,[{key:"nextStep",value:function(){var t=this.state.currentStep+1;t<=this.props.maxSteps&&(this.setState({currentStep:t}),this.props.setCurrentStep(t))}},{key:"lastStep",value:function(){var t=this.state.currentStep-1;t>=0&&(this.setState({currentStep:t}),this.props.setCurrentStep(t))}},{key:"componentDidUpdate",value:function(t){t.currentStep!==this.props.currentStep&&this.setState({currentStep:this.props.currentStep})}},{key:"render",value:function(){return Object(N.jsx)(m.a,{className:this.props.className,children:Object(N.jsxs)(I.a,{inline:!0,onSubmit:function(t){return t.preventDefault()},className:"d-flex justify-content-between",children:[Object(N.jsxs)(E.a,{variant:"primary",onClick:this.lastStep.bind(this),children:["Last ",this.props.stepName]}),Object(N.jsxs)(I.a.Group,{children:[Object(N.jsxs)(I.a.Label,{className:"w-70 mr-2",children:["Current ",this.props.stepName,":"]}),Object(N.jsx)(I.a.Label,{className:"w-70 mr-2",children:this.state.currentStep+1})]}),Object(N.jsxs)(E.a,{variant:"primary",onClick:this.nextStep.bind(this),children:["Next ",this.props.stepName]})]})})}}]),r}(i.a.Component),D=r(56),A=function(t){Object(h.a)(r,t);var e=Object(u.a)(r);function r(t){var s;return Object(o.a)(this,r),(s=e.call(this,t)).state={highlighted:s.props.highlighted},s}return Object(l.a)(r,[{key:"toggleHighlight",value:function(){this.setState((function(t){return{highlighted:!t.highlighted}})),this.props.highlightExplanation()}},{key:"componentDidUpdate",value:function(t){t.highlighted!==this.props.highlighted&&this.setState({highlighted:this.props.highlighted})}},{key:"render",value:function(){var t=this.props,e=t.value,r=t.status;return Object(N.jsx)(D.a,{className:"m-0 p-0",style:{color:"involved"===r?"blue":"negative"===r?"red":"positive"===r?"green":"black",textDecoration:"negative"===r?"line-through":"none",fontWeight:"positive"===r?"bolder":"normal",fontStyle:"involved"===r?"italic":"normal",backgroundColor:this.state.highlighted?"cornsilk":null},onMouseEnter:this.toggleHighlight.bind(this),onMouseLeave:this.toggleHighlight.bind(this),children:e})}}]),r}(i.a.Component),H=function(t){Object(h.a)(r,t);var e=Object(u.a)(r);function r(){return Object(o.a)(this,r),e.apply(this,arguments)}return Object(l.a)(r,[{key:"render",value:function(){var t=this.props.borders?this.props.borders:{border:"2px solid lightgray",marginBottom:"-2px",marginLeft:"-2px"},e=this.props.margin?this.props.margin:{};return Object(N.jsx)(D.a,{className:"m-0 p-0",children:Object(N.jsxs)("div",{style:Object(z.a)(Object(z.a)(Object(z.a)({},t),e),{},{display:"flex",justifyContent:"center",alignItems:"center",backgroundImage:this.props.background,backgroundSize:"100% 100%"}),children:[this.props.cornerNumber&&Object(N.jsx)("div",{style:Object(z.a)({position:"absolute",fontWeight:"bolder",color:"white",backgroundColor:"#0275d8",borderRadius:"10px",minWidth:"1vw",fontSize:"0.8vw",paddingRight:"1px",paddingLeft:"1px",zIndex:"2"},this.props.cornerNumber.style),children:this.props.cornerNumber.value}),this.props.rightLabel&&Object(N.jsx)("div",{style:{position:"absolute",top:"35%",right:"-5%",fontSize:"2vw"},children:this.props.rightLabel}),this.props.bottomLabel&&Object(N.jsx)("div",{style:{position:"absolute",bottom:"-15%",right:"42%",fontSize:"2vw"},children:this.props.bottomLabel}),Object(N.jsxs)("div",{style:Object(z.a)(Object(z.a)({},this.props.innerBorders),{},{padding:"0px",width:"100%",display:"flex",justifyContent:"center",alignItems:"center"}),children:[this.props.children,Object(N.jsx)("div",{style:{display:"block",paddingBottom:"100%"}})]})]})})}}]),r}(i.a.Component),T=function(t){Object(h.a)(r,t);var e=Object(u.a)(r);function r(){return Object(o.a)(this,r),e.apply(this,arguments)}return Object(l.a)(r,[{key:"render",value:function(){return Object(N.jsx)(f.a,{style:this.props.style,className:"p-0 m-0 d-flex flex-direction-row align-items-center justify-content-center",children:this.props.children})}}]),r}(i.a.Component),F=function(t){Object(h.a)(r,t);var e=Object(u.a)(r);function r(t){var s;return Object(o.a)(this,r),(s=e.call(this,t)).state={highlighted:s.props.highlighted},s}return Object(l.a)(r,[{key:"isSingleton",value:function(){var t=this.props.cellContent.cellRows;return 1===t.length&&1===t[0].cellValues.length}},{key:"getSingletonValue",value:function(){return this.props.cellContent.cellRows[0].cellValues[0].value}},{key:"componentDidUpdate",value:function(t){t.highlighted!==this.props.highlighted&&this.setState({highlighted:this.props.highlighted})}},{key:"highlight",value:function(t){this.props.highlight(t)}},{key:"chooseBackground",value:function(){var t=this.props,e=t.literalBackgrounds,r=t.cellBackground,s=this.isSingleton(),i=this.getSingletonValue();return e&&s?e[i.toString()]:r||null}},{key:"getFontSize",value:function(t){var e=this.props.literalSize;return e?(console.log((e*t).toString()+"vw"),(e*t).toString()+"vw"):t.toString()+"vw"}},{key:"isHidden",value:function(t){var e=this.props.hiddenLiterals;return e&&e.includes(t)}},{key:"render",value:function(){var t=this,e=this.props,r=e.cellContent,s=e.cellBorders,i=e.cellInnerBorders,n=e.cellMargin,a=e.cornerNumber,o=e.rightLabel,l=e.bottomLabel,c=e.literalSize,h=this.state.highlighted,u=this.isSingleton(),p=this.getSingletonValue();return Object(N.jsx)(H,{background:this.chooseBackground(),borders:s,innerBorders:i,margin:n,size:c,cornerNumber:a,rightLabel:o,bottomLabel:l,children:u?!this.isHidden(p)&&Object(N.jsx)("h1",{style:{fontSize:this.getFontSize(2)},children:p}):Object(N.jsx)(L.a,{fluid:!0,className:"p-0 align-items-center",children:r.cellRows.map((function(e,r){return Object(N.jsx)(T,{style:{fontSize:t.getFontSize(1)},children:e.cellValues.map((function(e,r){return Object(N.jsx)(A,{value:e.value,status:e.status,highlighted:e.explanations.includes(h.toString()),highlightExplanation:function(){return t.highlight(e.explanations)}},r)}))},r)}))})})}}]),r}(i.a.Component),U=function(t){Object(h.a)(r,t);var e=Object(u.a)(r);function r(){return Object(o.a)(this,r),e.apply(this,arguments)}return Object(l.a)(r,[{key:"getIndex",value:function(t,e,r){return t?t[e][r]:null}},{key:"render",value:function(){var t=this,e=this.props,r=e.highlighted,s=e.highlight,i=e.rows,n=e.literalBackgrounds,a=e.cellBorders,o=e.cellInnerBorders,l=e.cellBackgrounds,c=e.cellMargin,h=e.literalSize,u=e.cornerNumbers,p=e.rightLabels,d=e.bottomLabels,g=e.hiddenLiterals,b=e.rowsums,j=e.endrowsums,x=e.colsums,f=e.endcolsums;return Object(N.jsx)(m.a,{className:"mt-3 p-5",children:Object(N.jsxs)(L.a,{fluid:!0,style:{minWidth:"400px",padding:"0px"},children:[Object(N.jsxs)(T,{children:[Object(N.jsx)(D.a,{xs:1,className:"m-0 p-0"}),b&&Object(N.jsx)(D.a,{className:"m-0 p-0"}),i[0].cells.map((function(t,e){return Object(N.jsx)(D.a,{className:"m-0 p-0",children:Object(N.jsx)("small",{className:"text-muted",children:e+1})},e)})),j&&Object(N.jsx)(D.a,{className:"m-0 p-0"})]}),x&&Object(N.jsxs)(T,{children:[Object(N.jsx)(D.a,{xs:1,className:"m-0 p-0"}),Object(N.jsx)(H,{}),x.map((function(t,e){return Object(N.jsx)(H,{children:Object(N.jsx)("h3",{style:{fontSize:"3vw",color:"gray"},children:t})})})),j&&Object(N.jsx)(H,{})]}),i.map((function(e,i){return Object(N.jsxs)(T,{children:[Object(N.jsx)(D.a,{xs:1,className:"m-0 p-0",children:Object(N.jsx)("small",{className:"text-muted",children:i+1})},i),b&&Object(N.jsx)(H,{children:Object(N.jsx)("h3",{style:{fontSize:"3vw",color:"gray"},children:b[i]})}),e.cells.map((function(e,b){return Object(N.jsx)(F,{cellContent:e,row:i,column:b,highlighted:r,highlight:s,cellBorders:t.getIndex(a,i,b),cellInnerBorders:t.getIndex(o,i,b),cellBackground:t.getIndex(l,i,b),cornerNumber:t.getIndex(u,i,b),rightLabel:t.getIndex(p,i,b),bottomLabel:t.getIndex(d,i,b),cellMargin:c,literalBackgrounds:n,literalSize:h,hiddenLiterals:g})})),j&&Object(N.jsx)(H,{children:Object(N.jsx)("h3",{style:{fontSize:"3vw",color:"gray"},children:j[i]})})]},i)})),f&&Object(N.jsxs)(T,{children:[Object(N.jsx)(D.a,{xs:1,className:"m-0 p-0"}),Object(N.jsx)(H,{}),f.map((function(t,e){return Object(N.jsx)(H,{children:Object(N.jsx)("h3",{style:{fontSize:"3vw",color:"gray"},children:t})})})),j&&Object(N.jsx)(H,{})]})]})})}}]),r}(i.a.Component),R=r(98),V=function(t){Object(h.a)(r,t);var e=Object(u.a)(r);function r(t){var s;return Object(o.a)(this,r),(s=e.call(this,t)).state={highlighted:s.props.highlighted},s}return Object(l.a)(r,[{key:"highlight",value:function(){this.setState({highlighted:!0}),this.props.highlight()}},{key:"deHighlight",value:function(){this.setState({highlighted:!1}),this.props.highlight()}},{key:"componentDidUpdate",value:function(t){t.highlighted!==this.props.highlighted&&this.setState({highlighted:this.props.highlighted})}},{key:"render",value:function(){var t=this.state.highlighted?{backgroundColor:"cornsilk"}:null,e=this.props,r=e.decision,s=e.reason,i=e.index;return Object(N.jsxs)(x.a.Item,{style:t,onMouseEnter:this.highlight.bind(this),onMouseLeave:this.deHighlight.bind(this),children:[r,Object(N.jsx)("br",{}),s]},i)}}]),r}(i.a.Component),J=function(t){Object(h.a)(r,t);var e=Object(u.a)(r);function r(){return Object(o.a)(this,r),e.apply(this,arguments)}return Object(l.a)(r,[{key:"render",value:function(){var t=this,e=this.props,r=e.simpleDeductions,s=e.deductions,n=e.otherChoices,a=e.smallestMUSSize;return Object(N.jsxs)(i.a.Fragment,{children:[Object(N.jsx)(m.a,{className:"mt-3",children:r?Object(N.jsxs)(R.a,{defaultActiveKey:"1",children:[Object(N.jsxs)(m.a.Header,{children:[Object(N.jsxs)("h5",{children:["Made ",r.length," simple deductions."]}),Object(N.jsx)(R.a.Toggle,{as:E.a,variant:"link",eventKey:"0",children:"Show/Hide"})]}),Object(N.jsx)(R.a.Collapse,{eventKey:"0",children:Object(N.jsx)(x.a,{style:{maxHeight:"60vh",overflowY:"scroll"},children:r.map((function(e,r){return Object(N.jsx)(V,{highlighted:t.props.highlighted.includes(r.toString()),decision:e.decision,reason:e.reason,index:r,highlight:function(){return t.props.highlight(r)}},r)}))})})]}):s&&Object(N.jsxs)(i.a.Fragment,{children:[Object(N.jsx)(m.a.Header,{children:Object(N.jsx)("h5",{children:"Made the following deduction:"})}),Object(N.jsxs)(m.a.Body,{children:[Object(N.jsx)("div",{className:"mb-3",children:Object(N.jsx)("b",{children:s.decision})}),Object(N.jsx)(x.a,{style:{maxHeight:"75vh",overflowY:"scroll"},children:s.reason.map((function(e,r){return Object(N.jsx)(V,{highlighted:t.props.highlighted.includes(r.toString()),reason:e,index:r,highlight:function(){return t.props.highlight(r)}},r)}))})]})]})}),n&&Object(N.jsxs)(m.a,{className:"mt-3",children:[Object(N.jsx)(m.a.Header,{children:Object(N.jsxs)("b",{children:["Found ",n.length+1," choices in total for this step:"]})}),Object(N.jsxs)(m.a.Body,{children:[Object(N.jsxs)("div",{className:"mb-3",children:["See the alternative deductions with MUS size ",a,":"]}),Object(N.jsx)(M,{stepName:"Alt",className:"p-3",setCurrentStep:this.props.setAlternative,maxSteps:n.length,currentStep:this.props.currentAlternative}),Object(N.jsx)("div",{children:Object(N.jsx)("small",{className:"text-muted",children:"(Note: different MUSs may result in deductions that look identical)"})})]})]})]})}}]),r}(i.a.Component),W=function(t){Object(h.a)(r,t);var e=Object(u.a)(r);function r(t){var s;return Object(o.a)(this,r),(s=e.call(this,t)).state={x:s.props.params.x,y:s.props.params.y,colsums:s.props.params.colsums,rowsums:s.props.params.rowsums,treecount:s.props.params.treecount},s}return Object(l.a)(r,[{key:"getBackgrounds",value:function(){for(var t={},e=1;e<=this.state.treecount;e++)t["-"+e.toString()]="url(/images/tree.png)",t[e.toString()]="url(/images/tent.png)";return t}},{key:"getCellBorders",value:function(){for(var t=[],e=0;e<this.state.x;e++){t[e]=[];for(var r=0;r<this.state.y;r++)t[e].push({borderTop:0===e?"2px solid black":"2px solid lightgray",borderBottom:e===this.state.x-1?"2px solid black":"2px solid lightgray",borderLeft:0===r?"2px solid black":"2px solid lightgray",borderRight:r===this.state.y-1?"2px solid black":"2px solid lightgray",marginLeft:"-2px",marginBottom:"-2px"})}return t}},{key:"render",value:function(){return console.log("here"),Object(N.jsx)(U,{highlight:this.props.highlight,highlighted:this.props.highlighted,rows:this.props.rows,colsums:this.state.colsums,rowsums:this.state.rowsums,literalBackgrounds:this.getBackgrounds(),cellBorders:this.getCellBorders()},this.props.key)}}]),r}(i.a.Component),G=function(t){Object(h.a)(r,t);var e=Object(u.a)(r);function r(t){var s;return Object(o.a)(this,r),(s=e.call(this,t)).state={},s}return Object(l.a)(r,[{key:"render",value:function(){return Object(N.jsx)(U,{highlight:this.props.highlight,highlighted:this.props.highlighted,rows:this.props.rows},this.props.key)}}]),r}(i.a.Component),K=function(t){Object(h.a)(r,t);var e=Object(u.a)(r);function r(t){var s;return Object(o.a)(this,r),(s=e.call(this,t)).state={grid:s.props.params.grid,hints:s.props.params.hints},s}return Object(l.a)(r,[{key:"getCellBorders",value:function(){for(var t=[],e=0;e<9;e++){t[e]=[];for(var r=0;r<9;r++)t[e].push({borderTop:e%3===0?"2px solid black":"2px solid lightgray",borderBottom:8===e?"2px solid black":"2px solid lightgray",borderLeft:r%3===0?"2px solid black":"2px solid lightgray",borderRight:8===r?"2px solid black":"2px solid lightgray",marginLeft:"-2px",marginBottom:"-2px"})}return t}},{key:"getCellInnerBorders",value:function(){for(var t=[],e=this.state.grid,r=0;r<9;r++){t[r]=[];for(var s=0;s<9;s++)t[r].push({borderTop:0===r||e[r-1][s]!==e[r][s]?"2px dashed black":"2px dashed white",borderBottom:8===r||e[r+1][s]!==e[r][s]?"2px dashed black":"2px dashed white",borderLeft:0===s||e[r][s-1]!==e[r][s]?"2px dashed black":"2px dashed white",borderRight:8===s||e[r][s+1]!==e[r][s]?"2px dashed black":"2px dashed white",margin:"3px"})}return t}},{key:"getCornerNumbers",value:function(){for(var t=[],e=this.state,r=e.hints,s=e.grid,i=0,n=0;n<9;n++){t[n]=[];for(var a=0;a<9;a++)s[n][a]===i+1?(t[n].push({value:r[i],style:{top:"0%",left:"0%"}}),i++):t[n].push({value:null,style:{top:"0%",left:"0%"}})}return console.log(t),t}},{key:"render",value:function(){return Object(N.jsx)(U,{highlight:this.props.highlight,highlighted:this.props.highlighted,rows:this.props.rows,colsums:this.state.colsums,rowsums:this.state.rowsums,cellBorders:this.getCellBorders(),cellInnerBorders:this.getCellInnerBorders(),literalSize:.7,cornerNumbers:this.getCornerNumbers()},this.props.key)}}]),r}(i.a.Component),_=function(t){Object(h.a)(r,t);var e=Object(u.a)(r);function r(t){var s;return Object(o.a)(this,r),(s=e.call(this,t)).state={x:s.props.params.x_max,y:s.props.params.y_max,rowsums:s.props.params.horzsums,colsums:s.props.params.vertsums,blanks:s.props.params.blanks},s}return Object(l.a)(r,[{key:"getDiagonalGradient",value:function(t,e){return"linear-gradient(to bottom left, ".concat(t,", ").concat(t," 49%, lightgray 49%, lightgray 51%, ").concat(e," 51%, ").concat(e,")")}},{key:"getBackgrounds",value:function(){for(var t=this.state,e=t.rowsums,r=t.colsums,s=t.blanks,i=[],n=0;n<this.state.x;n++){i[n]=[];for(var a=0;a<this.state.y;a++)0!==e[n][a]?0!==r[n][a]?i[n].push(this.getDiagonalGradient("white","white")):i[n].push(this.getDiagonalGradient("white","lightblue")):0!==r[n][a]?i[n].push(this.getDiagonalGradient("lightblue","white")):0===s[n][a]?i[n].push("linear-gradient(lightblue, lightblue)"):i[n].push("none")}return i}},{key:"getCornerNumbers",value:function(){for(var t=[],e=this.state,r=e.rowsums,s=e.colsums,i=e.x,n=e.y,a={fontWeight:"bolder",color:"gray",backgroundColor:"none",fontSize:"1.4vw"},o=0;o<i;o++){t[o]=[];for(var l=0;l<n;l++)0!==r[o][l]?t[o].push({value:r[o][l],style:Object(z.a)({top:"20%",right:"20%"},a)}):o>0&&0!==s[o-1][l]?t[o].push({value:s[o-1][l],style:Object(z.a)({top:"-30%",left:"20%"},a)}):t[o].push({value:null,style:Object(z.a)({top:"-30%",left:"20%"},a)})}return console.log(t),t}},{key:"render",value:function(){return Object(N.jsx)(U,{highlight:this.props.highlight,highlighted:this.props.highlighted,rows:this.props.rows,cellBackgrounds:this.getBackgrounds(),cornerNumbers:this.getCornerNumbers(),hiddenLiterals:[0]},this.props.key)}}]),r}(i.a.Component),P=function(t){Object(h.a)(r,t);var e=Object(u.a)(r);function r(t){var s;return Object(o.a)(this,r),(s=e.call(this,t)).state={grid:s.props.params.blocks,gridSize:s.props.params.grid},s}return Object(l.a)(r,[{key:"getCellBorders",value:function(){for(var t=[],e=this.state,r=e.grid,s=e.gridSize,i=0;i<s;i++){t[i]=[];for(var n=0;n<s;n++)t[i].push({borderTop:0===i||r[i-1][n]!==r[i][n]?"2px solid black":"2px solid lightgray",borderBottom:i===s-1||r[i+1][n]!==r[i][n]?"2px solid black":"2px solid lightgray",borderLeft:0===n||r[i][n-1]!==r[i][n]?"2px solid black":"2px solid lightgray",borderRight:n===s-1||r[i][n+1]!==r[i][n]?"2px solid black":"2px solid lightgray",marginLeft:"-2px",marginBottom:"-2px"})}return t}},{key:"getBackgrounds",value:function(){return{1:"url(/images/star.png)"}}},{key:"render",value:function(){return Object(N.jsx)(U,{highlight:this.props.highlight,highlighted:this.props.highlighted,rows:this.props.rows,colsums:this.state.colsums,rowsums:this.state.rowsums,cellBorders:this.getCellBorders(),literalBackgrounds:this.getBackgrounds()},this.props.key)}}]),r}(i.a.Component),Y=r(44),Z=function(t){Object(h.a)(r,t);var e=Object(u.a)(r);function r(t){var s;return Object(o.a)(this,r),(s=e.call(this,t)).state={lessThans:s.props.params.lt,size:s.props.params.SIZE},s}return Object(l.a)(r,[{key:"getRightLabels",value:function(){for(var t=[],e=this.state,r=e.size,s=e.lessThans,i=0;i<r;i++){t[i]=[];for(var n=0;n<r;n++)t[i].push(null)}var a,o=Object(Y.a)(s);try{for(o.s();!(a=o.n()).done;){var l=a.value,c=l[0],h=l[1],u=l[2],p=l[3];c===u&&(h<p?t[c-1][h-1]="<":t[u-1][p-1]=">")}}catch(d){o.e(d)}finally{o.f()}return console.log(t),t}},{key:"getBottomLabels",value:function(){for(var t=[],e=this.state,r=e.size,s=e.lessThans,i=0;i<r;i++){t[i]=[];for(var n=0;n<r;n++)t[i].push(null)}var a,o=Object(Y.a)(s);try{for(o.s();!(a=o.n()).done;){var l=a.value,c=l[0],h=l[1],u=l[2],p=l[3];h===p&&(c<u?t[c-1][h-1]="\u2227":t[u-1][p-1]="\u2228")}}catch(d){o.e(d)}finally{o.f()}return t}},{key:"render",value:function(){return Object(N.jsx)(U,{highlight:this.props.highlight,highlighted:this.props.highlighted,rows:this.props.rows,cellMargin:{margin:"20px"},rightLabels:this.getRightLabels(),bottomLabels:this.getBottomLabels()},this.props.key)}}]),r}(i.a.Component),q=function(t){Object(h.a)(r,t);var e=Object(u.a)(r);function r(t){var s;return Object(o.a)(this,r),(s=e.call(this,t)).state={colsums:s.props.params.colsums,rowsums:s.props.params.rowsums,grid:s.props.params.therms},s}return Object(l.a)(r,[{key:"getBackgrounds",value:function(){for(var t=this.state.grid,e=[],r=this.state.grid.length,s=this.state.grid[0].length,i=0;i<r;i++){e[i]=[];for(var n=0;n<s;n++){var a=Math.floor(t[i][n]/10),o=i>0?Math.floor(t[i-1][n]/10):null,l=i<r-1?Math.floor(t[i+1][n]/10):null,c=n>0?Math.floor(t[i][n-1]/10):null,h=n<s-1?Math.floor(t[i][n+1]/10):null;t[i][n]%10==1?(console.log(a),o===a?e[i].push("url(/images/themHeadN.png"):c===a?e[i].push("url(/images/themHeadW.png"):h===a?e[i].push("url(/images/themHeadE.png"):l===a&&e[i].push("url(/images/themHeadS.png")):o===a&&l!==a?e[i].push("url(/images/themTipS.png"):l===a&&o!==a?e[i].push("url(/images/themTipN.png"):o===a&&l===a?e[i].push("url(/images/themV.png"):h===a&&c!==a?e[i].push("url(/images/themTipW.png"):c===a&&h!==a?e[i].push("url(/images/themTipE.png"):h===a&&c===a&&e[i].push("url(/images/themH.png")}}return console.log(e),e}},{key:"getCellBorders",value:function(){for(var t=[],e=0;e<9;e++){t[e]=[];for(var r=0;r<9;r++)t[e].push({borderTop:0===e?"2px solid black":"2px solid lightgray",borderBottom:e===this.state.x-1?"2px solid black":"2px solid lightgray",borderLeft:0===r?"2px solid black":"2px solid lightgray",borderRight:r===this.state.y-1?"2px solid black":"2px solid lightgray",marginLeft:"-2px",marginBottom:"-2px"})}return t}},{key:"render",value:function(){return Object(N.jsx)(U,{highlight:this.props.highlight,cellBackgrounds:this.getBackgrounds(),highlighted:this.props.highlighted,colsums:this.state.colsums,rowsums:this.state.rowsums,rows:this.props.rows,cellBorders:this.getCellBorders()},this.props.key)}}]),r}(i.a.Component),Q=function(t){Object(h.a)(r,t);var e=Object(u.a)(r);function r(t){var s;return Object(o.a)(this,r),(s=e.call(this,t)).state={size:s.props.params.SIZE,rowsums:s.props.params.CLUES[0].map((function(t){return 0===t?null:t})),colsums:s.props.params.CLUES[1].map((function(t){return 0===t?null:t})),endrowsums:s.props.params.CLUES[2].map((function(t){return 0===t?null:t})),endcolsums:s.props.params.CLUES[3].map((function(t){return 0===t?null:t}))},s}return Object(l.a)(r,[{key:"render",value:function(){return Object(N.jsx)(U,{highlight:this.props.highlight,highlighted:this.props.highlighted,rows:this.props.rows,colsums:this.state.colsums,endcolsums:this.state.endcolsums,rowsums:this.state.rowsums,endrowsums:this.state.endrowsums},this.props.key)}}]),r}(i.a.Component),X=function(t){Object(h.a)(r,t);var e=Object(u.a)(r);function r(t){var s;return Object(o.a)(this,r),(s=e.call(this,t)).state={currentStep:0,highlightedLiterals:-1,highlightedExplanations:[],currentAlternative:0,type:s.props.type,params:s.props.params,inputObject:s.props.inputObject},s}return Object(l.a)(r,[{key:"highlightLiteral",value:function(t){this.setState((function(e){return{highlightedLiterals:e.highlightedLiterals===t?-1:t}}))}},{key:"highlightExplanation",value:function(t){this.setState((function(e){return{highlightedExplanations:JSON.stringify(e.highlightedExplanations)===JSON.stringify(t)?[]:t}}))}},{key:"setCurrentStep",value:function(t){this.setState({currentStep:t,currentAlternative:0})}},{key:"setAlternative",value:function(t){this.setState({currentAlternative:t})}},{key:"chooseBoard",value:function(t){switch(this.state.type){case"tents.eprime":return Object(N.jsx)(W,Object(z.a)({},t));case"binairo.eprime":return Object(N.jsx)(G,Object(z.a)({},t));case"nice_killer.eprime":return Object(N.jsx)(K,Object(z.a)({},t));case"star-battle.eprime":return Object(N.jsx)(P,Object(z.a)({},t));case"kakuro.eprime":return Object(N.jsx)(_,Object(z.a)({},t));case"nfutoshiki.eprime":return Object(N.jsx)(Z,Object(z.a)({},t));case"thermometer.eprime":return Object(N.jsx)(q,Object(z.a)({},t));case"skyscrapers.eprime":return Object(N.jsx)(Q,Object(z.a)({},t));default:return Object(N.jsx)(U,Object(z.a)({},t))}}},{key:"render",value:function(){var t=0===this.state.currentAlternative?this.state.inputObject[this.state.currentStep]:this.state.inputObject[this.state.currentStep].otherChoices[this.state.currentAlternative-1],e={params:this.state.params,highlight:this.highlightExplanation.bind(this),key:this.state.highlightedLiterals,highlighted:this.state.highlightedLiterals,rows:t.puzzleState.matrices[0].rows};return Object(N.jsxs)(i.a.Fragment,{children:[Object(N.jsx)(M,{className:"mt-3 p-3",stepName:"step",setCurrentStep:this.setCurrentStep.bind(this),maxSteps:this.state.inputObject.length-1,currentStep:this.state.currentStep}),Object(N.jsxs)(f.a,{className:"mb-4",children:[Object(N.jsx)(D.a,{xs:12,md:8,lg:8,xl:6,children:this.chooseBoard(e)}),Object(N.jsxs)(D.a,{children:[t.skippedDeductions&&Object(N.jsx)(m.a,{className:"mt-3",children:Object(N.jsx)(m.a.Body,{children:Object(N.jsx)("small",{children:"Skipped some obvious deductions."})})}),Object(N.jsx)(J,{highlight:this.highlightLiteral.bind(this),simpleDeductions:t.simpleDeductions,deductions:t.deductions,highlighted:this.state.highlightedExplanations,otherChoices:this.state.inputObject[this.state.currentStep].otherChoices,smallestMUSSize:this.state.inputObject[this.state.currentStep].smallestMUSSize,setAlternative:this.setAlternative.bind(this),currentAlternative:this.state.currentAlternative})]})]})]})}}]),r}(i.a.Component),$=function(t){Object(h.a)(r,t);var e=Object(u.a)(r);function r(){var t;Object(o.a)(this,r);for(var s=arguments.length,n=new Array(s),a=0;a<s;a++)n[a]=arguments[a];return(t=e.call.apply(e,[this].concat(n))).state={inputObject:[],type:"",params:{},error:!1},t.render=function(){return Object(N.jsx)(L.a,{fluid:!0,style:{textAlign:"center"},children:0===t.state.inputObject.length||t.state.error?Object(N.jsxs)(i.a.Fragment,{children:[Object(N.jsx)("h1",{className:"mt-3",children:"Demystify Visualiser"}),Object(N.jsx)(B,{setInput:t.setInput.bind(Object(c.a)(t)),setError:t.setError.bind(Object(c.a)(t))}),t.state.error&&Object(N.jsx)(j.a,{variant:"warning",className:"mt-3 p-4 text-center",children:"Could not read the input file (ensure it is a JSON file produced by Demystify)."})]}):Object(N.jsx)(X,{inputObject:t.state.inputObject,type:t.state.type,params:t.state.params})})},t}return Object(l.a)(r,[{key:"setInput",value:function(t){var e=this;this.setState({inputObject:t.steps,type:t.name,params:t.params},(function(){return!(e.state.inputObject&&e.state.type&&e.state.params)&&e.setError()}))}},{key:"setError",value:function(){this.setState({error:!0})}},{key:"conponentDidUpdate",value:function(t,e){e.error&&this.setState({error:!1})}}]),r}(i.a.Component),tt=function(t){t&&t instanceof Function&&r.e(3).then(r.bind(null,101)).then((function(e){var r=e.getCLS,s=e.getFID,i=e.getFCP,n=e.getLCP,a=e.getTTFB;r(t),s(t),i(t),n(t),a(t)}))};r(86);a.a.render(Object(N.jsx)(i.a.StrictMode,{children:Object(N.jsx)($,{})}),document.getElementById("root")),tt()}},[[87,1,2]]]);
//# sourceMappingURL=main.13346bf8.chunk.js.map