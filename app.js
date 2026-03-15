const ABJAD = {
ا:1,ب:2,ج:3,د:4,ه:5,و:6,ز:7,ح:8,ط:9,
ي:10,ك:20,ل:30,م:40,ن:50,س:60,ع:70,ف:80,ص:90,
ق:100,ر:200,ش:300,ت:400,ث:500,خ:600,ذ:700,ض:800,ظ:900,غ:1000
};

const ZODIAC = ["الحمل","الثور","الجوزاء","السرطان","الأسد","العذراء","الميزان","العقرب","القوس","الجدي","الدلو","الحوت"];
const ELEMENTS = ["ناري","ترابي","هوائي","مائي"];
const NUMBER_MEANING = {
1:"قوة وبداية",
2:"توازن",
3:"إبداع",
4:"ثبات",
5:"حركة",
6:"انسجام",
7:"روحانية",
8:"سلطة",
9:"اكتمال"
};

function normalize(text,system){
  text = text.replace(/ابن|بن|بنت/g,"");
  text = text.replace(/[أإآ]/g,"ا");
  text = text.replace(/ة/g,"ه");
  if(system=="maghrib") text = text.replace(/ى/g,"ا");
  else text = text.replace(/ى/g,"ي");
  return text;
}

function gematria(text,system){
  text = normalize(text,system);
  let sum = 0;
  for(let c of text){
    if(ABJAD[c]) sum += ABJAD[c];
  }
  return sum;
}

function digitalRoot(n){
  while(n>9) n = n.toString().split("").reduce((a,b)=>Number(a)+Number(b));
  return n;
}

function zodiac(n){ return ZODIAC[n%12]; }
function element(n){ return ELEMENTS[n%4]; }

function wafq3(base){
  let square = [[8,1,6],[3,5,7],[4,9,2]];
  return square.map(r=>r.map(v=>v+base));
}

function renderSquare(square){
  let html = "<table>";
  square.forEach(row=>{ html += "<tr>"; row.forEach(v=>{ html += "<td>"+v+"</td>"; }); html += "</tr>"; });
  html += "</table>";
  return html;
}

function aiAnalysis(root){
  return { personality: NUMBER_MEANING[root], lucky: [root,root*3,root*7] };
}

function analyze(){
  let name = document.getElementById("name").value;
  let mother = document.getElementById("mother").value;
  let system = document.getElementById("system").value;

  let n1 = gematria(name,system);
  let n2 = gematria(mother,system);
  let total = n1+n2;
  let root = digitalRoot(total);
  let z = zodiac(root);
  let e = element(root);
  let ai = aiAnalysis(root);
  let square = wafq3(root);

  let html = "<h3>نتائج التحليل</h3>";
  html += "قيمة الاسم: "+n1+"<br>";
  html += "قيمة الأم: "+n2+"<br>";
  html += "المجموع: "+total+"<br>";
  html += "الجذر الرقمي: "+root+"<br>";
  html += "البرج: "+z+"<br>";
  html += "العنصر: "+e+"<br>";
  html += "<h3>تحليل الشخصية</h3>"+ai.personality+"<br>";
  html += "<h3>الأرقام المحظوظة</h3>"+ai.lucky.join(" , ");
  html += "<h3>الأوفاق 3×3</h3>"+renderSquare(square);

  document.getElementById("result").innerHTML = html;
}
