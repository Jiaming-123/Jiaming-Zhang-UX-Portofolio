type Surface={x:number;y:number;width:number;height:number;radius:number;fill:string;stroke?:string;shadow?:boolean}
type Crop={x:number;y:number;width:number;height:number;radius?:number}
export type NativePhoneFrame={surfaces:Surface[];crops:Crop[];cornerRadius?:number;hasNavigation?:boolean;paths?:{d:string;fill:string}[]}
const navy='#1d3b63',white='#fff',pale='#e3e9f1',cream='#fff8e8',lilac='#efeeff',green='#e8f5ee',line='#dfe4ee'
const box=(x:number,y:number,width:number,height:number,fill=white,radius=40,stroke?:string):Surface=>({x,y,width,height,fill,radius,stroke})
const crop=(x:number,y:number,width:number,height:number,radius?:number):Crop=>({x,y,width,height,radius})
const coin=(x:number,y:number,size:number)=>[box(x,y,size,size,'#ffe34d',size/2),box(x+8,y+8,size-16,size-16,'#ffae00',(size-16)/2)]
const bottom:Surface[]=[box(0,1546,786,182,'#f8f8f8',0),box(0,1544,786,3,'#d6d6d6',0)]
const navigation=[crop(72,1569,58,56),crop(217,1569,60,56),crop(512,1569,58,56),crop(660,1569,59,56),crop(309,1506,170,170,85)]
const status=crop(563,22,207,64)
const back=crop(30,96,94,106)
const avatar=(x:number,y:number,size:number)=>crop(x,y,size,size,size/2)
const name=(x:number,y:number,width=250,height=50)=>crop(x,y,width,height)
const pills=(rows:string[][],xs:number[],ys:number[],widths:number[],height:number,selected?:[number,number])=>rows.flatMap((row,i)=>row.map((_,j)=>box(xs[j],ys[i],widths[j],height,selected?.[0]===i&&selected[1]===j?navy:white,25,line)))
const frame=(surfaces:Surface[],crops:Crop[],nav=true):NativePhoneFrame=>{
 const splits=surfaces.filter(s=>s.x===88&&s.width===382&&s.height===112&&s.fill===white)
 return {
  surfaces:[...surfaces.filter(s=>!splits.includes(s)).map(s=>({...s,shadow:(s.width>=620&&s.height>=90&&s.radius>=24)||(s.width>=300&&s.height>=100&&s.radius>=24&&[pale,'#b2cdef'].includes(s.fill))})),...(nav?bottom:[])],
  crops:[status,...crops,...(nav?navigation:[])],hasNavigation:nav,
  paths:splits.map(s=>({fill:white,d:`M116 ${s.y} H475 L448 ${s.y+112} H116 Q88 ${s.y+112} 88 ${s.y+84} V${s.y+28} Q88 ${s.y} 116 ${s.y} Z`})),
 }
}
const homeHeader=[name(40,100,175,52),crop(411,117,136,66,33),crop(309,250,64,68)]
const homeSurfaces=[box(559,123,118,56,pale,16),box(694,110,80,80,navy,40)]

/** Complete surfaces replace text masks, so gradients and rounded edges stay continuous. */
export const nativePhoneFrames:Record<string,NativePhoneFrame>={
 'persona-mentor-20261025.png':{cornerRadius:0,surfaces:[box(0,0,1440,1080,'#ecf2f8',0),box(40,40,1360,1000,white,24),box(40,40,340,1000,'#gradient-persona',24),box(76,461,115,34,'#2b5b9f',18),box(76,587,268,2,'#2e5084',0),box(428,291,924,151,'#eff5ff',18),box(428,309,4,115,'#3074f6',2),box(428,517,438,2,'#e7edf5',0),box(914,517,438,2,'#e7edf5',0),box(428,787,924,198,'#f5f7fb',18)],crops:[crop(105,83,210,260,24)]},
 'persona-student-20261025.png':{cornerRadius:0,surfaces:[box(0,0,1440,1080,'#ecf2f8',0),box(40,40,1360,1000,white,24),box(40,40,340,1000,'#gradient-persona',24),box(76,427,98,34,'#2b5b9f',18),box(76,602,268,2,'#2e5084',0),box(428,291,924,151,'#eff5ff',18),box(428,309,4,115,'#3074f6',2),box(428,517,438,2,'#e7edf5',0),box(914,517,438,2,'#e7edf5',0),box(428,787,924,198,'#f5f7fb',18)],crops:[crop(102,81,210,260,24)]},
 'hero/home.png':frame([
  ...homeSurfaces,box(48,408,690,332,cream),box(88,602,610,98,white,28),box(48,764,690,334,navy),box(88,946,610,112,'#ffae00',27),box(88,946,382,112,white,27),
  box(48,1188,334,136,pale,27),box(404,1188,334,136,pale,27),box(48,1348,690,136,'#b2cdef',27),
 ],[...homeHeader,crop(649,807,55,58),crop(486,956,75,92),crop(68,1234,58,51),name(137,1250,67,54),crop(431,1234,43,53),name(490,1250,62,54),crop(83,1386,52,57),crop(644,1392,30,45)]),
 'groups/discover.png':frame([
  box(684,110,76,76,navy,38),
  box(26,248,734,96,pale,29),box(26,376,180,60,navy,31,'#222'),box(252,376,226,60,pale,31),box(524,376,230,60,pale,31),box(26,464,216,60,pale,31),box(256,464,316,60,pale,31),box(592,464,162,60,pale,31),
  box(0,550,786,2,'#eee',0),box(26,696,734,228,cream),box(26,964,734,228,cream),box(26,1232,734,228,cream),box(26,1500,734,228,cream),...[[58,840,112],[58,1108,112],[58,1376,120]].map(([x,y,w])=>box(x,y,w,52,'#e5eef4',16)),
 ],[crop(42,279,32,32),crop(706,279,34,34),crop(57,739,64,64),crop(63,1010,55,63),crop(60,1281,61,62),...[[679,848],[679,1116],[688,1384]].map(([x,y])=>crop(x,y,29,35))]),
 'groups/housing.png':frame([
  box(48,328,690,232,cream,40,'#ded9e8'),box(82,474,112,53,'#e5eef4',14),box(210,474,120,53,'#e5eef4',14),box(48,600,690,308,'#gradient-pale',40),box(48,949,690,262,'#gradient-white',40,line),box(48,1302,690,98,navy,24),
 ],[back,crop(81,377,66,63)]),
 'groups/joined.png':frame([box(48,409,690,364,cream,40,'#bfd1e9'),box(82,644,626,96,navy,45),box(48,1330,690,98,navy,24)],[back]),
 'groups/chat.png':frame([
  box(48,352,690,128,lilac,40),box(48,560,582,250,'#f0f2f9',39),box(156,838,582,250,'#b2d4ff',39),box(48,1116,582,214,'#f0f2f9',39),box(48,1358,582,179,'#f0f2f9',39),box(0,1459,786,253,white,0),box(50,1494,690,112,white,36,'#111'),box(665,1526,55,55,'#e8e8e8',28),
 ],[back,crop(45,230,68,66),crop(670,239,48,48),name(72,1139,155,39),crop(676,1535,35,36)],false),
 'mentors/discover.png':frame([
  box(666,104,76,76,navy,38),
  box(0,212,786,2,'#eee',0),box(48,264,686,96,pale,47),
  ...pills([['all','course','housing'],['bank','more']],[48,222,469],[435,515],[158,228,230],63,[0,0]),
  box(48,661,206,63,navy,32),box(271,661,130,63,white,32,line),box(419,661,152,63,white,32,line),box(590,661,125,63,white,32,line),box(48,741,117,63,white,32,line),box(183,741,173,63,white,32,line),box(0,828,786,2,'#eee',0),
  box(48,924,686,472,'#gradient-navy',40),box(80,1164,156,50,lilac,26),box(252,1164,188,50,green,26),box(80,1288,622,76,white,22),box(48,1432,686,400,'#gradient-navy',40),...coin(580,956,114),...coin(578,1466,114),
 ],[back,crop(66,297,33,33),crop(684,296,32,33),avatar(79,955,98),name(196,956,242,46),crop(409,964,34,31),name(96,1174,132,31),avatar(79,1463,98),name(194,1463,252,48),crop(401,1474,34,31),]),
 'mentors/profile.png':frame([
  box(465,234,180,52,green,28),box(48,474,296,60,lilac,26),box(360,474,296,60,lilac,26),box(48,550,296,60,lilac,26),box(360,550,296,60,lilac,26),box(48,642,690,276,'#gradient-navy',40),box(48,950,690,264,'#gradient-lilac',48),box(48,1270,690,98,navy,24),...coin(622,303,114),
 ],[back,avatar(48,229,128),name(204,233,234,48),crop(703,229,37,43),]),
 'mentors/reviews.png':frame([
  box(436,236,230,50,green,28),box(436,288,110,50,'#f4e9eb',27),box(48,394,690,580,'#gradient-navy',40),box(48,1014,690,140,'#gradient-lilac',40),box(48,1256,174,50,lilac,26),box(234,1256,190,50,lilac,26),box(436,1256,158,50,lilac,26),box(48,1436,690,170,'#f8f9fc',40),
  ...[0,1,2,3,4].flatMap(i=>[box(152,672+i*58,452,12,'#385675',6),...([372,67,6,0,0][i]?[box(152,672+i*58,[372,67,6,0,0][i],12,'#ffda65',6)]:[])]),
 ],[back,avatar(48,232,110),name(179,234,240,50),crop(78,1467,76,76,38),name(168,1469,139,36)]),
 'booking/date-mode.png':frame([
  ...[48,189,331,472,613].map((x,i)=>box(x,670,125,152,i===2?navy:'#ededed',25,line)),box(50,938,281,104,navy,24,line),box(365,938,373,104,'#ededed',24,line),
  box(38,1159,336,104,white,24,line),box(392,1159,336,104,navy,24,line),box(38,1279,336,104,white,24,line),box(392,1279,336,104,white,24,line),box(38,1448,690,98,navy,24),
 ],[back,avatar(48,355,128),name(204,354,236,50),crop(451,367,40,36),...[[76,752],[219,752],[359,752],[500,752],[645,752]].map(([x,y])=>crop(x,y,62,34))]),
 'booking/time.png':frame([
  ...pills([['1000','1030'],['1100','1330'],['1400']],[48,402],[641,761,881],[336,336],104,[0,1]),box(48,761,336,104,pale,24),box(48,1384,690,98,navy,24),
 ],[back,avatar(48,326,128),name(204,324,236,50),crop(451,338,40,36)]),
 'booking/topic.png':frame([
  ...pills([['course','subject'],['house','campus'],['study','other']],[48,402],[537,649,761],[336,336],94,[0,0]),box(48,889,690,407,cream,40,line),box(48,1384,690,98,navy,24),
 ],[back]),
 'booking/review.png':frame([box(48,565,690,219,green,40,line),box(48,817,690,263,green,40,line),box(48,1304,690,98,navy,24)],[back,avatar(48,401,128),name(204,400,236,50),crop(451,414,40,36)]),
 'booking/confirmation.png':frame([box(48,225,690,479,green,40,line),box(48,737,690,158,white,40,line),box(48,1304,690,98,navy,24)],[back,crop(96,272,81,81,41),name(75,765,205,49)]),
 'during-service/bookings-confirmed-20261002.png':frame([
  ...homeSurfaces,box(48,392,178,50,navy,25),box(242,392,120,50,pale,25),box(48,458,690,510,cream),box(528,491,178,50,green,26),box(80,778,626,98,white,28),box(48,992,690,334,navy),box(88,1174,610,112,'#ffae00',27),box(88,1174,382,112,white,27),box(48,1350,334,136,pale,27),box(404,1350,334,136,pale,27),
 ],[...homeHeader,avatar(79,674,81),name(175,674,236,40),crop(649,1035,55,58),crop(486,1184,75,92),crop(68,1395,58,51),name(137,1412,67,54),crop(431,1395,43,53),name(490,1412,62,54)]),
 'during-service/details.png':frame([box(48,226,178,50,green,26),box(48,580,690,658,'#f5f5fb',40),box(48,1274,690,258,lilac,40)],[back,avatar(48,422,96),name(163,423,204,45),crop(376,432,34,31)]),
 'during-service/live.png':frame([
  box(48,442,690,84,green,40),box(48,618,690,122,lilac,40),box(48,772,582,250,'#f0f2f9',39),box(156,1054,582,250,'#b2d4ff',39),box(48,1336,582,200,'#f0f2f9',39),box(0,1423,786,295,white,0),box(48,1486,690,112,white,36,'#111'),box(664,1517,54,54,'#e8e8e8',28),
 ],[back,avatar(48,289,96),name(163,290,203,45),crop(376,302,34,31),name(72,800,92,35),name(72,1365,92,35),crop(676,1527,35,36)],false),
 'during-service/complete.png':frame([
  box(48,226,182,50,green,26),box(168,624,110,50,'#f4e9eb',27),box(48,814,690,366,'#gradient-navy',40),box(48,1216,690,390,lilac,40),
 ],[back,avatar(48,500,96),name(163,500,203,45),crop(376,511,34,31)]),
 'during-service/feedback.png':frame([
  box(48,226,690,326,'#f5f5fb',40),box(76,474,110,50,'#f4e9eb',27),box(48,588,690,316,'#gradient-navy',40),box(48,1000,216,50,green,26),box(280,1000,104,50,'#f0f2f7',26),box(400,1000,118,50,'#f0f2f7',26),box(48,1192,198,50,lilac,26),box(262,1192,216,50,lilac,26),box(48,1258,158,50,'#f5f5f9',26),box(222,1258,188,50,'#f5f5f9',26),box(48,1434,690,110,'#f8f9fd',24,line),
 ],[back,avatar(76,254,96),name(191,254,204,45),crop(400,265,34,31),crop(156,740,477,75)]),
}
