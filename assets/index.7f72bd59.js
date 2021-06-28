import{t as e,q as t,o as r,R as a,c as l,E as c,r as n,a as s,d as i,b as o,e as m}from"./vendor.3aa0184c.js";const d=e.model("block",{click:e.boolean,act:e.boolean}),u=e.model("clicker",{index:e.number,list:e.array(d),start:e.boolean}).actions((e=>({increase(){console.log("increase"),e.start&&(e.index>1e3?e.start=!1:(e.list[e.index].act=!0,e.index+=1))},click:function(){e.index>1e3||(e.list[e.index].click=!0,e.list[e.index].act=!0,e.index+=1)},startCount(){e.start=!0},reset(){e.start=!1,e.list.forEach((e=>e.act=e.click=!1)),e.index=0}}))),p=t.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  height: 1rem;
  padding: 13px;
  .progress-block {
    flex-shrink: 0;
    width: 5px;
    height: 1rem;
    &.active {
      background-color: yellow;
    }
    &.active.merge {
      background-color: green;
    }
    background-color: #efefef;
  }
`,k=r((e=>a.createElement("div",{className:l("progress-block",{merge:e.ele.click,active:e.ele.act})}))),x=r((e=>a.createElement(p,{className:"progress"},e.pinned.map(((e,t)=>a.createElement(k,{ele:e,key:t,i:t}))))));var E=r((function(){const[e]=c.exports.useState((()=>u.create({index:0,list:n(0,1e3).map((e=>({click:!1,act:!1}))),start:!1}))),[t]=c.exports.useState((()=>u.create({index:0,list:n(0,1e3).map((e=>({click:!1,act:!1}))),start:!1}))),r=c.exports.useMemo((()=>s(e.click,1200)),[]),l=c.exports.useMemo((()=>i(t.click,1200)),[]);return c.exports.useEffect((()=>{let r=-1;const a=o((()=>{e.start?r=setInterval(e.increase,100):(clearInterval(r),e.reset())}));let l=-1;const c=o((()=>{t.start?l=setInterval(t.increase,100):(clearInterval(l),t.reset())}));return()=>{clearInterval(r),clearInterval(l),a(),c()}}),[]),a.createElement("div",{className:"App"},a.createElement("button",{onClick:()=>{t.reset(),e.reset()}},"reset"),a.createElement("button",{onClick:()=>{t.startCount(),e.startCount()}},"start"),a.createElement("h3",null,"debounce progress~"),a.createElement("button",{onClick:l},"click"),a.createElement("div",null,a.createElement(x,{pinned:t.list})),a.createElement("br",null),a.createElement("h3",null,"throttle progress~"),a.createElement("button",{onClick:r},"click"),a.createElement("div",null,a.createElement(x,{pinned:e.list})))}));m.render(a.createElement(a.StrictMode,null,a.createElement(E,null)),document.getElementById("root"));
