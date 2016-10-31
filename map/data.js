//----------------------------------热点数据------------------------//

var objplace=[];
var introduce = [];
//*******************************热点弹出框数据制作要求************************//
/*
*	第一行编号35中心体育馆是样例，谁做35的就不用做了。以下说明参照编号35
*	objplace[]中括号里的数字是地点编号，按从小到大顺序排列
*	placename后面引号里面填地点名字
*	placex后面中括号里面填地点x坐标，每一个中括号里面有四个数值，对应一二三四级的图相应地点的x坐标，用逗号隔开
*	相应的placey和placex一样只是x变成y坐标
*/
objplace[35] = {placename:"中心体育馆",placex:[562,1133,1989,4022],placey:[296,578,900,1522]};
objplace[1] = {placename:"护理学院",placex:[,1928,3596,7191],placey:[,524,791,1331]};
objplace[2] = {placename:"医学院",placex:[,,,],placey:[,,,]};
objplace[3] = {placename:"人体解剖楼(C区)",placex:[,1870,3486,6970],placey:[,532,808,1375]};
objplace[4] = {placename:"教学实验楼(B区)",placex:[,1841,3433,6885],placey:[,551,853,1466]};
objplace[5] = {placename:"基础医学院(A区)",placex:[,1804,3383,6711],placey:[,572,905,1528]};
objplace[6] = {placename:"公共卫生学院(A区)",placex:[,1781,3299,6613],placey:[,648,1028,1807]};
objplace[7] = {placename:"药学院(A区)",placex:[,1850,3451,6896],placey:[,701,1147,2024]};
objplace[8] = {placename:"厚山",placex:[800,1582,2917,5839],placey:[301,598,990,1710]};
objplace[9] = {placename:"情侣亭",placex:[,1552,2854,5720],placey:[,663,1068,1882]};
objplace[10] = {placename:"情侣湖",placex:[,1573,2898,5801],placey:[,691,1134,1994]};
objplace[11] = {placename:"北体育馆",placex:[753,1503,2737,5488],placey:[222,440,623,991]};
objplace[12] = {placename:"松园13号楼",placex:[,1408,2567,5131],placey:[,417,582,903]};
objplace[13] = {placename:"松园12号楼(留学生公寓)",placex:[,1444,2637,5281],placey:[,445,635,1017]};
objplace[14] = {placename:"松园8号楼",placex:[,1503,2745,5516],placey:[,490,721,1193]};
objplace[15] = {placename:"松园4号楼",placex:[,1548,2839,5687],placey:[,524,790,1318]};
objplace[16] = {placename:"松园食堂",placex:[,1358,2465,4894],placey:[,445,634,1029]};
objplace[17] = {placename:"郑州大学大学生活动中心，河南省研究生创新中心",placex:[,1288,2323,4647],placey:[,486,722,1199]};
objplace[18] = {placename:"松园11号楼",placex:[,1416,2581,5168],placey:[,470,684,1109]};
objplace[19] = {placename:"松园15号楼",placex:[,1516,2774,5567],placey:[,535,812,1369]};
objplace[20] = {placename:"松园3号楼",placex:[,1497,2745,5503],placey:[,546,835,1417]};
objplace[21] = {placename:"松园圆形广场",placex:[,1420,2590,5191],placey:[,519,782,1319]};
objplace[22] = {placename:"松园2号楼",placex:[,1456,2665,5343],placey:[,565,877,1498]};
objplace[23] = {placename:"松园14号楼",placex:[,1426,2606,5219],placey:[,570,886,1517]};
objplace[24] = {placename:"松园1号楼",placex:[,1416,2572,5159],placey:[,589,922,1592]};
objplace[25] = {placename:"松园5号楼",placex:[,1375,2500,5006],placey:[,561,865,1470]};
objplace[26] = {placename:"松园9号楼",placex:[,1324,2388,4796],placey:[,522,782,1323]};
objplace[27] = {placename:"松园10号楼",placex:[,1362,2474,4951],placey:[,500,744,1233]};

objplace[28] = {placename:"菊园食堂",placex:[,1194,2146,4298],placey:[,521,790,1312]};
objplace[29] = {placename:"菊园6号楼",placex:[,1257,2258,4495],placey:[,542,830,1391]};
objplace[30] = {placename:"菊园3号楼",placex:[,1321,2394,4767],placey:[,588,930,1584]};
objplace[31] = {placename:"菊园5号楼",placex:[,1239,2217,4419],placey:[,563,872,1468]};
objplace[32] = {placename:"菊园2号楼",placex:[,1310,2351,4700],placey:[,615,965,1666]};
objplace[33] = {placename:"菊园4号楼",placex:[,1213,2174,4320],placey:[,579,907,1534]};
objplace[34] = {placename:"菊园1号楼",placex:[,1275,2299,4574],placey:[,622,993,1718]};
objplace[36] = {placename:"",placex:[,,,],placey:[,,,]};
objplace[37] = {placename:"眉湖",placex:[648,1272,2315,4436],placey:[371,745,1239,2259]};
objplace[38] = {placename:"北一",placex:[,1351,2426,4929],placey:[,777,1294,2338]};
objplace[39] = {placename:"北五",placex:[,1433,2593,5187],placey:[,800,1335,2419]};
objplace[40] = {placename:"北四",placex:[,1394,2507,5023],placey:[,807,1341,2436]};
objplace[41] = {placename:"北三",placex:[,1341,2411,4812],placey:[,804,1341,2439]};
objplace[42] = {placename:"北二",placex:[,1304,2354,4756],placey:[,812,1369,2520]};
objplace[43] = {placename:"外语学院",placex:[,1237,2215,4470],placey:[,820,1379,2525]};
objplace[44] = {placename:"计算中心",placex:[,1214,2157,4368],placey:[,839,1410,2595]};
objplace[45] = {placename:"信息工程学院",placex:[,1163,2057,4154],placey:[,866,1468,2692]};
objplace[46] = {placename:"钟楼",placex:[,1287,2320,4646],placey:[,904,1551,2856]};
objplace[47] = {placename:"南一",placex:[,1090,1907,3820],placey:[,900,1582,2877]};
objplace[48] = {placename:"南二",placex:[,1145,2032,4063],placey:[,910,1561,2870]};
objplace[49] = {placename:"南三",placex:[,1123,1974,3976],placey:[,929,1596,2949]};
objplace[50] = {placename:"南四",placex:[,1113,1970,3985],placey:[,962,1667,3114]};
objplace[51] = {placename:"南五",placex:[,1101,1952,3916],placey:[,990,1722,3215]};

objplace[52] = {placename:"美术学院",placex:[,1517,2776,5547],placey:[,884,1513,2771]};
objplace[53] = {placename:"法学院",placex:[,1597,2937,5867],placey:[,967,1678,3099]};
objplace[54] = {placename:"历史学院",placex:[,1456,2650,5297],placey:[,898,1539,2817]};
objplace[55] = {placename:"公共管理学院",placex:[,1577,2895,5793],placey:[,978,1695,3136]};
objplace[56] = {placename:"图书馆",placex:[678,1355,2456,4921],placey:[484,964,1670,3082]};
objplace[57] = {placename:"东大门",placex:[750,1498,2741,5479],placey:[538,1077,1898,3538]};
objplace[58] = {placename:"东二门",placex:[,1798,3338,6674],placey:[,917,1575,2894]};
objplace[59] = {placename:"生命科学学院",placex:[,1273,2294,4590],placey:[,1014,1774,3296]};
objplace[60] = {placename:"生命科学学院实验楼",placex:[,1350,2444,4890],placey:[,1083,1909,3558]};
objplace[61] = {placename:"数学与统计学院（教学楼）",placex:[,1221,2182,4370],placey:[,1018,1779,3297]};
objplace[62] = {placename:"物理工程学院（教学楼）",placex:[,1266,2280,4548],placey:[,1050,1846,3421]};
objplace[63] = {placename:"力学实验中心",placex:[,1312,2371,4740],placey:[,1154,2050,3844]};
objplace[64] = {placename:"材料科学与工程学院实验楼",placex:[,1328,2400,4794],placey:[,1100,1944,3625]};
objplace[65] = {placename:"物理工程学院实验楼",placex:[,1296,2338,4663],placey:[,1117,1976,3691]};
objplace[66] = {placename:"化学与分子工程学院实验楼",placex:[,1262,2271,4532],placey:[,1133,2012,3761]};
objplace[67] = {placename:"化学工程学院实验楼",placex:[,1228,2199,4395],placey:[,1157,2054,3850]};
objplace[68] = {placename:"水利与环境实验中心",placex:[,1198,2144,4279],placey:[,1174,2098,3932]};
objplace[69] = {placename:"物理工程学院（办公楼）",placex:[,1238,2214,4427],placey:[,1072,1886,3519]};
objplace[70] = {placename:"化学与分子工程学院（办公楼）（1-3楼）<br>管理工程学院（办公楼）<br>（4-6楼）",placex:[,1199,2145,4287],placey:[,1093,1929,3600]};
objplace[71] = {placename:"化学与分子工程学院(教学楼),管理工程学院实验中心（3-5楼）",placex:[,1171,2083,4166],placey:[,1113,1963,3668]};
objplace[72] = {placename:"材料科学与工程学院（教学楼）",placex:[,1125,1987,3982],placey:[,1078,1896,3538]};
objplace[73] = {placename:"水利与环境学院（办公楼）",placex:[,1135,2014,4028],placey:[,1132,2015,3771]};
objplace[74] = {placename:"水利与环境学院（教学楼）",placex:[,1095,1928,3854],placey:[,1094,1927,3597]};
//--------------------瑶瑶
objplace[75] = {placename:"化学工程学院教学楼",placex:[,1135,2007,4046],placey:[,1223,2195,4126]};
objplace[76] = {placename:"建筑学院教学楼",placex:[,1108,1955,3923],placey:[,1257,2260,4222]};
objplace[77] = {placename:"土木工程学院教学楼",placex:[,1069,1890,3729],placey:[,1283,2312,4319]};
objplace[78] = {placename:"机械工程学院教学楼",placex:[,1020,1782,3590],placey:[,1293,2329,4402]};
objplace[79] = {placename:"郑州大学建设办公室/化学系科学实验室",placex:[,1030,1812,3619],placey:[,1142,2023,3759]};
objplace[80] = {placename:"信息工程学院科技楼",placex:[,973,1708,3435],placey:[,1153,2070,3903]};
objplace[81] = {placename:"电工电子实验中心",placex:[,1041,1854,3661],placey:[,1172,2093,3950]};
objplace[82] = {placename:"物理化学实验楼",placex:[,993,1717,3472],placey:[,1216,2157,4077]};
objplace[83] = {placename:"工程力学系",placex:[,910,1580,3163],placey:[,1204,2150,4061]};
objplace[84] = {placename:"电气工程学院3区",placex:[,996,1716,3437],placey:[,1236,2210,4161]};
objplace[85] = {placename:"电气工程学院2区",placex:[,962,1666,3340],placey:[,1247,2238,4203]};

objplace[86] = {placename:"综合管理中心(行政楼)",placex:[395,802,1353,2717],placey:[540,1074,1907,3554]};
objplace[87] = {placename:"南门草地",placex:[395,794,1357,2705],placey:[633,1262,2288,4315]};
objplace[88] = {placename:"五星广场",placex:[333,657,1069,2153],placey:[586,1183,2091,3963]};
//--------------------------------------------------------------李兴宇
objplace[89] = {placename:"南门",placex:[310,620,938,1889],placey:[616,1232,2176,4106]};
objplace[90] = {placename:"南操",placex:[229,446,629,1278],placey:[511,1020,1762,3310]};
objplace[91] = {placename:"柳园1号楼",placex:[,664,1075,2158],placey:[,1051,1846,3437]};
objplace[92] = {placename:"柳园6号楼",placex:[,618,982,1961],placey:[,1016,1778,3297]};
objplace[93] = {placename:"柳园12号楼",placex:[,569,880,1763],placey:[,982,1703,3154]};
objplace[94] = {placename:"南体育馆",placex:[,541,836,1655],placey:[,1011,1763,3267]};
objplace[95] = {placename:"柳园23号楼",placex:[,529,806,1607],placey:[,950,1644,3028]};
objplace[96] = {placename:"柳园2号楼",placex:[,691,1128,2253],placey:[,1030,1805,3351]};
objplace[97] = {placename:"柳园7号楼",placex:[,640,1033,2067],placey:[,997,1743,3231]};
objplace[98] = {placename:"柳园13号楼",placex:[,592,934,1864],placey:[,964,1677,3091]};
objplace[99] = {placename:"柳园19号楼",placex:[,555,854,1706],placey:[,938,1620,2978]};
objplace[100] = {placename:"柳园3号楼",placex:[,731,1204,2397],placey:[,1011,1760,3262]};
objplace[101] = {placename:"柳园8号楼",placex:[,667,1076,2144],placey:[,988,1715,3174]};
objplace[102] = {placename:"柳园14号楼",placex:[,617,978,1961],placey:[,951,1645,3036]};
objplace[103] = {placename:"柳园20号楼",placex:[,580,901,1803],placey:[,924,1589,2923]};
objplace[104] = {placename:"柳园9号楼",placex:[,688,1122,2245],placey:[,972,1686,,3118]};
objplace[105] = {placename:"柳园15号楼",placex:[,642,1026,2052],placey:[,937,1616,2978]};
objplace[106] = {placename:"柳园21号楼",placex:[,604,948,1894],placey:[,908,1562,2862]};
objplace[107] = {placename:"柳园4号楼",placex:[,772,1291,2575],placey:[,975,1695,3123]};
objplace[108] = {placename:"柳园5号楼",placex:[,802,1351,2707],placey:[,964,1677,3103]};
objplace[109] = {placename:"柳园11号楼",placex:[,762,1268,2533],placey:[,931,1607,2953]};
objplace[110] = {placename:"柳园10号楼",placex:[,737,1218,2439],placey:[,947,1641,3029]};
objplace[111] = {placename:"柳园17号楼",placex:[,715,1166,2349],placey:[,899,1537,2820]};
objplace[112] = {placename:"柳园16号楼",placex:[,685,1116,2236,],placey:[,913,1570,2885]};
objplace[113] = {placename:"柳园22号楼",placex:[,673,1090,2174,],placey:[,869,1477,2705]};
objplace[114] = {placename:"柳园24号楼",placex:[,648,1044,2084],placey:[,885,1516,2776]};
objplace[115] = {placename:"风华园食堂",placex:[,609,975,1937],placey:[,845,1451,2601]};
objplace[116] = {placename:"聚英园食堂",placex:[,548,834,1669],placey:[,881,1504,2764]};

objplace[117] = {placename:"荷园25号楼(商业街)",placex:[,846,1436,2884],placey:[,941,1625,2992]};
objplace[118] = {placename:"荷园10号楼",placex:[,710,1178,2370],placey:[,844,1442,2621]};
objplace[119] = {placename:"荷园一餐厅",placex:[,682,1100,2190],placey:[,810,1342,2420]};
objplace[120] = {placename:"荷园2号楼",placex:[,847,1425,2855],placey:[,901,1542,2830]};
objplace[121] = {placename:"荷园6号楼",placex:[,799,1342,2685],placey:[,872,1492,2715]};
objplace[122] = {placename:"荷园11号楼",placex:[,755,1264,2528],placey:[,822,1386,2552]};
objplace[123] = {placename:"荷园7号楼",placex:[,811,1364,2707],placey:[,851,1439,2596]};
objplace[124] = {placename:"荷园3号楼",placex:[,856,1463,2922],placey:[,878,1502,2758]};
objplace[125] = {placename:"荷园4号楼",placex:[,901,1545,3091],placey:[,861,1468,2690]};
objplace[126] = {placename:"荷园22号楼(商业街)",placex:[,959,1647,3279],placey:[,864,1487,2727]};
objplace[127] = {placename:"荷园5号楼",placex:[,928,1608,3213],placey:[,853,1456,2671]};
objplace[128] = {placename:"荷园8号楼",placex:[,853,1473,2931],placey:[,822,1418,2533]};
objplace[129] = {placename:"荷园9号楼",placex:[,881,1512,2998],placey:[,817,1378,2506]};
objplace[130] = {placename:"荷园12号楼",placex:[,824,1397,2821],placey:[,791,1319,2402]};
objplace[131] = {placename:"荷园澡堂",placex:[,739,1222,2451],placey:[,772,1287,2292]};
objplace[132] = {placename:"荷园二餐厅",placex:[,788,1331,2671],placey:[,757,1240,2217]};
objplace[133] = {placename:"荷园13号楼",placex:[,878,1520,3025],placey:[,786,1327,2402]};
objplace[134] = {placename:"小西门1号",placex:[560,1119,1985,3960],placey:[268,539,817,1374]};
objplace[135] = {placename:"小西门2号",placex:[685,1373,2491,4984],placey:[192,386,513,763]};

objplace[136] = {placename:"",placex:[,,,],placey:[,,,]};
objplace[137] = {placename:"",placex:[,,,],placey:[,,,]};
objplace[138] = {placename:"",placex:[,,,],placey:[,,,]};
objplace[139] = {placename:"",placex:[,,,],placey:[,,,]};
objplace[140] = {placename:"",placex:[,,,],placey:[,,,]};
objplace[141] = {placename:"教育系（3、4楼）,马克思主义学院（1、2、5楼）",placex:[,1599,2942,5886],placey:[,932,1609,2959]};
objplace[142] = {placename:"文科园",placex:[740,,,],placey:[455,,,]};
objplace[143] = {placename:"理科园",placex:[587,,,],placey:[537,,,]};
objplace[144] = {placename:"",placex:[,,,],placey:[,,,]};
objplace[145] = {placename:"",placex:[,,,],placey:[,,,]};
objplace[146] = {placename:"",placex:[,,,],placey:[,,,]};
objplace[147] = {placename:"",placex:[,,,],placey:[,,,]};
objplace[148] = {placename:"",placex:[,,,],placey:[,,,]};
objplace[149] = {placename:"",placex:[,,,],placey:[,,,]};
objplace[150] = {placename:"",placex:[,,,],placey:[,,,]};
objplace[151] = {placename:"松园(四期)",placex:[697,,,],placey:[238,,,]};
objplace[152] = {placename:"医科院",placex:[926,,,],placey:[271,,,]};
objplace[153] = {placename:"松园7号楼",placex:[,1469,2683,5370],placey:[,499,746,1252]};
objplace[154] = {placename:"松园6号楼",placex:[,1400,2560,5133],placey:[,541,826,1392]};
objplace[155] = {placename:"郑州大学后勤集团物业管理公司",placex:[,1456,2663,5336],placey:[,601,939,1620]};
objplace[156] = {placename:"基础医学院(D区)和口腔医学院(D区1楼)",placex:[,1754,3274,6554],placey:[,599,947,1637]};
objplace[157] = {placename:"公共卫生学院(B区)",placex:[,1826,3386,6793],placey:[,646,1041,1815]};
objplace[158] = {placename:"药学院(B区)",placex:[,1881,3503,7009],placey:[,679,1098,1937]};
objplace[159] = {placename:"小青车站",placex:[,1505,2756,5527],placey:[,591,922,1598]};
objplace[160] = {placename:"",placex:[,,,],placey:[,,,]};
objplace[161] = {placename:"菊园",placex:[628,,,],placey:[289,,,]};
objplace[162] = {placename:"北核心教学区",placex:[698,,,],placey:[390,,,]};
objplace[163] = {placename:"中心教学区",placex:[609,,,],placey:[410,,,]};
objplace[164] = {placename:"南教学区",placex:[554,,,],placey:[453,,,]};
objplace[165] = {placename:"钟楼广场",placex:[634,,,],placey:[456,,,]};
objplace[166] = {placename:"",placex:[,,,],placey:[,,,]};
objplace[167] = {placename:"",placex:[,,,],placey:[,,,]};
objplace[168] = {placename:"",placex:[,,,],placey:[,,,]};
objplace[169] = {placename:"",placex:[,,,],placey:[,,,]};
objplace[170] = {placename:"",placex:[,,,],placey:[,,,]};

objplace[171] = {placename:"文学院",placex:[,1430,2603,5196],placey:[,910,1562,2872]};
objplace[172] = {placename:"新闻与传播学院",placex:[,1451,2649,5272],placey:[,927,1597,2922]};
objplace[173] = {placename:"商学院",placex:[,1479,2698,5404],placey:[,938,1616,2979]};
objplace[174] = {placename:"信息管理学院",placex:[,1523,2787,5579],placey:[,974,1685,3121]};
objplace[175] = {placename:"旅游管理学院",placex:[,1547,2837,5666],placey:[,983,1710,3168]};
objplace[176] = {placename:"数学与统计学院（办公楼）",placex:[,1186,2119,4239],placey:[,1041,1824,3390]};
objplace[177] = {placename:"郑州大学就业指导中心",placex:[,1188,2121,4240],placey:[,1074,1891,3527]};
objplace[178] = {placename:"材料科学与工程学院（办公楼）",placex:[,1154,2054,4105],placey:[,1060,1861,3457]};

objplace[179] = {placename:"",placex:[,,,],placey:[,,,]};
objplace[180] = {placename:"",placex:[,,,],placey:[,,,]};
//--------------------------------------------------------------------------------李杏宇
objplace[181] = {placename:"柳园",placex:[327,,,],placey:[472,,,]};
objplace[182] = {placename:"南操篮球场",placex:[,538,826,1661],placey:[,1098,1929,3595]};
objplace[183] = {placename:"厕所",placex:[156,308,358,668],placey:[493,983,1688,3154]};
objplace[184] = {placename:"女澡堂",placex:[,,573,1122],placey:[,,1688,3129]};
objplace[185] = {placename:"游泳池",placex:[,,537,1101],placey:[,,1668,3071]};

objplace[186] = {placename:"",placex:[,,,],placey:[,,,]};
objplace[187] = {placename:"",placex:[,,,],placey:[,,,]};
objplace[188] = {placename:"",placex:[,,,],placey:[,,,]};
objplace[189] = {placename:"",placex:[,,,],placey:[,,,]};
objplace[190] = {placename:"",placex:[,,,],placey:[,,,]};

objplace[191] = {placename:"工科园",placex:[513,,,],placey:[606,,,]};
objplace[192] = {placename:"化学工程学院(办公)",placex:[,1142,2025,4057],placey:[,1250,2236,4226]};
objplace[193] = {placename:"建筑学院(办公)",placex:[,1101,1948,3900],placey:[,1270,2280,4308]};
objplace[194] = {placename:"土木工程学院(办公)",placex:[,1063,1874,3754],placey:[,1293,2329,4406]};
objplace[195] = {placename:"机械工程学院(办公)",placex:[,1013,1771,3573],placey:[,1320,2382,4500]};
objplace[196] = {placename:"锅炉房",placex:[,1070,1883,3769],placey:[,1198,2150,4043]};
objplace[197] = {placename:"电气工程学院1区",placex:[,913,1559,3152],placey:[,1239,2222,4184]};

