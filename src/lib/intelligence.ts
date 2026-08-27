import type { DashboardData, Risk } from "./types";

const stores = ["Sector 62","Sector 63","Indirapuram","Vaishali","Greater Noida","Sector 18"];
const products = ["Amul Taaza Milk 1L","Coca-Cola 750ml","Fresh Bananas 1kg","Britannia Bread","Tata Salt 1kg","Surf Excel 1kg"];
function seeded(n:number){ const x=Math.sin(n*999)*10000; return x-Math.floor(x); }
export function riskLevel(stock:number,demand:number):Risk { const coverage=stock/Math.max(demand,1); return coverage<.35?"Critical":coverage<.7?"High":coverage<1.15?"Medium":"Low"; }
export function reorderQuantity(predicted:number,safety:number,available:number){ return Math.max(0,Math.ceil(predicted+safety-available)); }
export function dashboardData(now=new Date()):DashboardData {
  const hour=now.getUTCHours(); const demand=[];
  for(let i=0;i<24;i++){ const base=350+Math.sin((i-7)/3)*75+seeded(i)*35; demand.push({label:`${String(i).padStart(2,"0")}:00`,actual:i<=hour?Math.round(base):null,forecast:i>=hour?Math.round(base*(1.08+seeded(i+30)*.08)):null}); }
  const risks=products.map((product,i)=>{const stock=18+Math.round(seeded(i+60)*80),expected=62+Math.round(seeded(i+80)*90);return {product,sku:`SS-${1200+i}`,store:stores[i],stock,demand:expected,hours:Math.max(2,Math.round(stock/(expected/24))),risk:riskLevel(stock,expected),reorder:reorderQuantity(expected,Math.ceil(expected*.2),stock)}}).sort((a,b)=>b.reorder-a.reorder);
  const atRisk=risks.filter(x=>x.risk==="High"||x.risk==="Critical").length;
  return {updatedAt:now.toISOString(),kpis:[{label:"Inventory value",value:"₹84.2L",delta:"+3.2% vs last week",tone:"green"},{label:"Today's orders",value:"12,842",delta:"+8.4% vs baseline",tone:"yellow"},{label:"Predicted demand",value:"18,492",delta:"Next 24 hours",tone:"blue"},{label:"Products at risk",value:String(atRisk),delta:"Needs attention",tone:"red"},{label:"Overstock risk",value:"14",delta:"₹1.8L tied up",tone:"orange"},{label:"Inventory health",value:"87%",delta:"Healthy",tone:"green"}],demand,risks,insights:["Demand is trending 8.4% above the recent baseline.",`${atRisk} priority products need replenishment attention.`,"Sector 62 has the highest inventory pressure today.","Cold beverages show the strongest weather-linked uplift."],stores:stores.map((name,i)=>({name,orders:950+Math.round(seeded(i+110)*1900),health:72+Math.round(seeded(i+120)*25),risk:i<1?"Critical":i<3?"Medium":"Low"})),alerts:[{title:"Critical stock-out risk",detail:"Amul Taaza Milk · Sector 62",severity:"Critical",time:"8 min ago"},{title:"Demand spike detected",detail:"Cold Beverages · Sector 18 · +42%",severity:"High",time:"12 min ago"},{title:"Rain signal received",detail:"4 stores may see increased instant-food demand",severity:"Medium",time:"21 min ago"}]};
}
