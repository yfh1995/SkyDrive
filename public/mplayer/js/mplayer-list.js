/**
 * 播放列表
 * @type {Array}
 * 请用数组来定义总列表
 * 再用二维数组定义每个列表
 * 其中列表里的每首歌需用对象定义
 * 请在每个列表中的第一个元素定义列表信息（必须位于第一位）
 * 列表信息必须有一个basic属性，值为true
 * 还要有一个name属性，值为列表名称
 * 可选参数为singer、image，用于为定义的该属性的歌曲调用
 * 每首歌必须有name、src、lrc三个属性
 * src为歌曲相对于index.html的相对路径或绝对路径
 * 可选singer和image属性
 * 在每首歌没有定义singer或image时将使用列表的singer或image
 * 请确保一定有一个被定义
 * 其中name为歌曲名称
 * src为歌曲文件路径
 * lrc为歌词，请用\n或\r将每行歌词隔开，否则无法识别
 */
var mplayer_song = [[
	{
		"basic":true,
		"name":"播放列表1",
		"singer":"未知",
		"singer":"未知"
	}
],
[
	{
		"basic":true,
		"name":"播放列表2",
		"singer":"许嵩",
		"img":"http://imgcache.qq.com/music/photo/album_500/97/500_albumpic_1492897_0.jpg"
	},
	{
		"name":"平行宇宙",
		"src":"http://ws.stream.qqmusic.qq.com/107506656.m4a?fromtag=46",
		"lrc":"[ar:许嵩]\n[ti:平行宇宙]\n[00:00.45]作曲 : 许嵩\n[00:01.76]作词 : 许嵩\n[00:03.58]我梦见我轻盈自由的腾空\n[00:09.70]随后画面切到我背着你遨游\n[00:15.89]你眼睛开始闪烁点点星光\n[00:22.60]可能是美梦来的太突然了吧\n[00:28.11]那时候在一起的时间很多\n[00:34.26]只不过珍惜的意义还没搞懂\n[00:40.55]虽然说 如今已经分开很久\n[00:46.92]有时候 还是不经意想你的笑容\n[00:55.78]深爱过 所以没有再联络\n[01:02.05]不回头 因为勉强的笑很难受\n[01:08.01]深爱过 真心感谢你陪我度过\n[01:14.50]那几年 苦中有甜的生活\n[01:29.62]床头柜 躺着一本老旧相册\n[01:35.79]也就是 闲极的时候才翻一翻\n[01:41.91]还养着你走时留下的小狗\n[01:48.54]长大后 它心事重重不太活泼\n[01:54.21]这条路我们没能走到最后\n[02:00.42]朋友说 是个意外的意料之中\n[02:06.48]有时相信在某个平行的宇宙\n[02:13.08]你的爱还一如既往陪在我左右\n[02:21.86]深爱过 所以没有再联络\n[02:28.03]不回头 因为勉强的笑很难受\n[02:34.24]深爱过 真心感谢你陪我度过那几年\n[02:43.60]深爱过 所以没有再联络\n[02:49.66]不回头 因为勉强的笑很难受\n[02:55.68]深爱过 真心感谢你陪我度过\n[03:01.90]那几年 苦中有甜的生活\n[03:08.18]多年后再想起你\n[03:12.28]镜子里一副流泪的笑容",
		"time":"03:29"

	},
	{
		"name":"摆脱",
		"src":"http://ws.stream.qqmusic.qq.com/107506657.m4a?fromtag=46",
		"lrc":"[ar:许嵩]\n[ti:摆脱]\n[00:00.21]许嵩 - 摆脱\n[00:01.62]作曲 : 许嵩\n[00:03.29]作词 : 许嵩\n[00:22.19]摆脱了二十出头的叛逆\n[00:24.77]摆脱不了倔强的脾气\n[00:27.35]摆脱了十足乏味的交际\n[00:29.93]摆脱不了群居属性\n[00:32.55]摆脱了听到谣言的揪心\n[00:35.13]摆脱不了听美言的暗喜\n[00:37.70]摆脱得了儿女私情\n[00:40.24]摆脱不了内分泌\n[00:42.65]谁有天大力气\n[00:44.63]可以拎着自己飞呀\n[00:47.81]拎着自己头发直到双脚都离地\n[00:53.07]谁有天大力气\n[00:54.94]可以拎着自己飞呀\n[00:58.22]所有力不从心都是摆脱不了自己\n[01:14.37]摆脱了对健康的在意\n[01:16.85]摆脱不了对死亡的恐惧\n[01:19.43]摆脱了生活的压力\n[01:21.96]摆脱不了人似浮萍\n[01:24.68]摆脱了那些世俗的追求\n[01:27.31]摆脱不了无求所引发的孤寂\n[01:29.91]这首歌摆脱了锻字练句\n[01:32.34]摆脱不了小心机\n[01:34.87]谁有天大力气\n[01:36.68]可以拎着自己飞呀\n[01:39.97]拎着自己头发直到双脚都离地\n[01:45.23]谁有天大力气\n[01:47.10]可以拎着自己飞呀\n[01:50.39]所有力不从心都是摆脱不了自己\n[02:27.10]谁有天大力气\n[02:28.88]可以拎着自己飞呀\n[02:32.12]拎着自己头发直到双脚都离地\n[02:37.27]谁有天大力气\n[02:39.10]可以拎着自己飞呀\n[02:42.28]所有力不从心都是摆脱不了自己\n[02:47.78]谁有天大力气\n[02:49.70]可以拎着自己飞呀\n[02:52.89]拎着自己头发直到双脚都离地\n[02:58.16]谁有天大力气\n[03:00.03]可以拎着自己飞呀\n[03:03.31]所有力不从心都是摆脱不了自己\n[03:08.78]谁有天大力气\n[03:10.55]可以拎着自己飞呀\n[03:13.73]拎着自己头发直到双脚都离地\n[03:19.05]谁有天大力气\n[03:21.07]可以拎着自己飞呀\n[03:24.00]所有力不从心都是摆脱不了自己"
	},
	{
		"name":"早睡身体好",
		"src":"http://ws.stream.qqmusic.qq.com/107506653.m4a?fromtag=46",
		"lrc":"[ar:许嵩]\n[ti:早睡身体好]\n[00:00.50]许嵩 - 早睡身体好\n[00:03.28]作曲 : 许嵩\n[00:04.75]作词 : 许嵩\n[00:32.72]姑娘你看你\n[00:34.84]一到家就哭泣\n[00:38.17]为流言几句\n[00:40.75]真的有点儿傻气\n[00:45.71]你脑子聪明\n[00:47.12]但躲不了世俗的雨\n[00:50.66]“想开点”是我送你的雨衣\n[00:58.34]他们太理性\n[01:00.79]每秒都在权衡利弊\n[01:03.58]你独自失语\n[01:06.36]撑到坚强癌晚期\n[01:11.10]夜色已浓郁\n[01:13.03]耗着也不会有惊喜\n[01:15.70]“快睡吧”是我善意的提醒\n[01:23.29]早睡身体好 睡前别吃太饱\n[01:29.50]早睡身体好 伤心容易感冒\n[01:35.82]早睡身体好 有什么值得烦恼\n[01:42.29]早睡身体好 明天还要起早\n[02:15.16]不爱被问起\n[02:17.28]那些终极命题\n[02:20.67]夏虫不可语冰\n[02:23.03]不仁的生存场域\n[02:28.01]你脑子聪明\n[02:29.64]总在替未来焦虑\n[02:32.37]“歇着吧”是我送你的药剂\n[02:40.85]三十楼望去\n[02:42.58]街道上人如蝼蚁\n[02:46.31]每个人都有\n[02:48.58]各自的恐惧和野心\n[02:53.18]死想要的 常常得不到\n[02:55.63]不想了的时候哗哗哗都来了\n[02:58.84]躺下吧 做些快乐的事情\n[03:05.74]早睡身体好 睡前别吃太饱\n[03:11.95]早睡身体好 伤心容易感冒\n[03:18.24]早睡身体好 有什么值得烦恼\n[03:24.92]早睡身体好 明天还要起早\n[03:31.42]早睡身体好 睡前别吃太饱\n[03:37.39]早睡身体好 伤心容易感冒\n[03:43.81]早睡身体好 有什么值得烦恼\n[03:50.22]早睡身体好 明天还要起早"
	},
	{
		"name":"奇谈",
		"src":"http://ws.stream.qqmusic.qq.com/107506654.m4a?fromtag=46",
		"lrc":"[ar:许嵩]\n[ti:奇谈]\n[00:00.22]许嵩 - 奇谈\n[00:01.07]词：许嵩\n[00:01.77]曲：许嵩\n[00:39.09]兽皮不要掀开你说能孵蛋\n[00:42.80]壁画不要破坏能进博物馆\n[00:46.51]猎人要吃素菜野鹿在期待\n[00:50.21]我一字一句都要意在言外\n[00:54.11]精美砾石一块打造要气派\n[00:57.71]粗糙历史一段座次怎么摆\n[01:01.52]丛林放一把火要抵御夜寒\n[01:05.02]趋炎附势的物种注定要淘汰\n[01:11.00]你靠不靠谱\n[01:13.38]靠不靠谱\n[01:15.29]可别答复\n[01:16.49]心里都清楚\n[01:18.39]你靠不靠谱\n[01:20.82]靠不靠谱\n[01:22.62]脑袋返祖\n[01:24.09]扯碎遮羞布\n[01:59.74]兽皮不要掀开你说能孵蛋\n[02:03.35]壁画不要破坏能进博物馆\n[02:07.10]猎人要吃素菜野鹿在期待\n[02:10.81]我一字一句都要意在言外\n[02:14.62]精美砾石一块打造要气派\n[02:18.30]粗糙历史一段座次怎么摆\n[02:22.16]丛林放一把火要抵御夜寒\n[02:25.56]趋炎附势的物种注定要淘汰\n[02:29.70]你靠不靠谱\n[02:32.12]靠不靠谱\n[02:33.98]可别答复\n[02:35.18]心里都清楚\n[02:37.24]你靠不靠谱\n[02:39.57]靠不靠谱\n[02:41.43]脑袋返祖\n[02:42.75]扯碎遮羞布\n[02:59.70]你靠不靠谱\n[03:02.03]靠不靠谱\n[03:03.98]可别答复\n[03:05.18]心里都清楚\n[03:07.28]你靠不靠谱\n[03:09.44]靠不靠谱\n[03:11.44]脑袋返祖\n[03:12.64]扯碎遮羞布"
	},
	{
		"name":"幻胖",
		"src":"http://ws.stream.qqmusic.qq.com/107506655.m4a?fromtag=46",
		"lrc":"[ar:许嵩]\n[ti:幻胖]\n[00:00.37]许嵩 - 幻胖\n[00:01.17]词：许嵩\n[00:01.92]曲：许嵩\n[00:21.81]得闲宁可散步\n[00:23.11]也不敢刷朋友圈\n[00:24.67]因为有的姑娘\n[00:25.62]总爱发自拍的照片\n[00:27.07]她们腰肢纤纤\n[00:28.27]她们的脸很尖\n[00:29.59]可她们总是会说\n[00:30.99]胖了胖了真纠结\n[00:32.59]一开始会以为这不过是\n[00:34.25]一种谦虚表演\n[00:35.25]后来却发现\n[00:36.00]她们真的超级关心\n[00:37.25]体重的增减\n[00:38.24]花了很多的钱\n[00:39.35]为健身房做贡献\n[00:40.82]对着镜子唏嘘\n[00:41.82]自己又胖了一圈\n[00:43.12]一起出去约个饭\n[00:44.32]姑娘却只点蔬菜\n[00:45.64]吃的比在太古里\n[00:46.73]化缘的尼姑还要清淡\n[00:48.42]CD尽情缩水\n[00:49.52]虽九死其犹未悔\n[00:50.82]反正约会时候\n[00:51.92]自我感觉要美\n[00:53.33]哎呀哎呀\n[00:53.98]赘肉看起来还是有点多\n[00:55.87]哎呀哎呀\n[00:56.57]什么时候才能变得洒脱\n[00:58.57]对比现实和小说\n[00:59.82]飞燕的轻盈虽然不错\n[01:00.94]可好像也不能\n[01:01.94]不在乎是否好摸\n[01:03.81]幻胖的女孩\n[01:05.61]需要好好的吃饭\n[01:08.11]脸圆圆的蛮可爱\n[01:10.77]干嘛要骨瘦如柴\n[01:14.07]幻胖的女孩\n[01:15.93]她的名字叫当代\n[01:18.53]自以为过度丰满\n[01:21.23]让盛唐情何以堪\n[01:35.03]秋千细腰女\n[01:36.18]摇曳逐风斜\n[01:40.49]眼看着快要入夏\n[01:41.79]衣服越穿越少啦\n[01:43.34]怎样的身材\n[01:44.24]才能让每条裙子百搭\n[01:45.69]百搭眼神不够自信\n[01:47.39]怎样都是白搭\n[01:48.82]没事别管旁人的想法\n[01:50.99]反正我们每天\n[01:51.89]遇到傻瓜的概率\n[01:52.99]比买彩票不中奖的概率\n[01:54.55]还要来得大\n[01:55.80]当你的城市忽然\n[01:56.90]冒出了第二个CBD\n[01:58.40]当你每天重复的劳作\n[01:59.95]不停贡献GDP\n[02:01.23]想要个转机\n[02:02.49]想改善外形\n[02:03.64]朋友反复指点你\n[02:04.79]提提颜值能带来福气\n[02:06.39]对自己挑剔越来越挑剔\n[02:09.00]陷入完美主义\n[02:09.90]忘了什么才是最要紧\n[02:11.59]躺在风尚的洪流里\n[02:12.95]躺在理性的缺席里\n[02:14.30]躺在各种社交网络\n[02:15.40]表演和被赞的死循环里\n[02:22.06]幻胖的女孩\n[02:23.81]需要好好的吃饭\n[02:26.41]脸圆圆的蛮可爱\n[02:29.01]干嘛要骨瘦如柴\n[02:32.27]幻胖的女孩\n[02:34.12]她的名字叫当代\n[02:36.82]自以为过度丰满\n[02:39.61]让盛唐情何以堪\n[02:43.11]幻胖的女孩\n[02:44.61]需要好好的吃饭\n[02:47.31]脸圆圆的蛮可爱\n[02:49.82]干嘛要骨瘦如柴\n[02:53.17]幻胖的女孩\n[02:55.07]她的名字叫当代\n[02:57.68]自以为过度丰满\n[03:00.33]让盛唐\n[03:14.13]幻胖的女孩\n[03:16.79]干瘪的饰带\n[03:14.21]幻胖的女孩\n[03:16.67]干瘪的饰带\n[03:24.39]幻胖的女孩\n[03:27.05]干瘪的饰带"
	},
	{
		"name":"摄影艺术",
		"src":"http://ws.stream.qqmusic.qq.com/107188869.m4a?fromtag=46",
		"time":"04:27",
		"lrc":"[ar:许嵩]\n[ti:摄影艺术]\n[00:00.03]许嵩 - 摄影艺术\n[00:01.20]词：许嵩\n[00:01.86]曲：许嵩\n[00:09.70]面朝大海\n[00:11.12]我站成了大海\n[00:13.24]你在我里面浮沉\n[00:17.03]回忆是一条狂犬\n[00:19.46]追咬了许多年\n[00:21.63]却还没掌握进退分寸\n[00:26.66]时光流转\n[00:28.03]谁还用日记本\n[00:30.21]往事有底片为证\n[00:34.05]拍照别开闪光灯\n[00:36.48]窥探爱人灵魂\n[00:38.63]要信自己的感觉够真\n[00:43.72]你带领着我穿透了黄昏\n[00:51.20]逆着光\n[00:52.32]闭上了一只眼\n[00:54.29]开启摄影的天分\n[01:00.13]拍过我的人\n[01:01.65]傻笑得多诚恳\n[01:04.22]摁下了快门\n[01:05.84]晓得心动不长存\n[01:08.57]拍过我的人\n[01:10.18]体谅了我的冷\n[01:12.76]热情没及格\n[01:14.33]真性情得高分\n[01:16.96]拍过我的人\n[01:18.67]走前还留了吻\n[01:21.25]花心思调整\n[01:22.87]爱和怨的白平衡\n[01:25.55]爱过你的人\n[01:27.17]躺在相片里等\n[01:29.75]面孔已褪色\n[01:31.41]缅怀却更深沉\n[01:36.85]镜头挺狠\n[01:38.11]岁月比它还狠\n[01:40.19]特写呈上了皱纹\n[01:44.00]情爱里受的熬煎\n[01:46.53]没修得共枕眠\n[01:48.70]却慢慢修得沉默不言\n[01:53.49]相见恨晚\n[01:55.05]相处有没恨短\n[01:57.18]别刻意夸大缘分\n[02:01.12]拍照不用想太深\n[02:03.55]什么霎那间的永恒\n[02:05.73]谁咬定自己不是过客\n[02:10.63]你带领着我穿透了黄昏\n[02:18.19]逆着光\n[02:19.31]闭上了一只眼\n[02:21.33]开启摄影的天分\n[02:27.22]拍过我的人\n[02:28.64]傻笑得多诚恳\n[02:31.27]摁下了快门\n[02:32.84]晓得心动不长存\n[02:35.58]拍过我的人\n[02:37.15]体谅了我的冷\n[02:39.77]热情没及格\n[02:41.39]真性情得高分\n[02:44.03]拍过我的人\n[02:45.65]走前还留了吻\n[02:48.33]花心思调整\n[02:49.89]爱和怨的白平衡\n[02:52.57]爱过你的人\n[02:54.19]躺在相片里等\n[02:56.78]面孔已褪色\n[02:58.34]缅怀却更深沉\n[03:06.08]一座城市的神秘景点\n[03:09.72]早让你拍腻\n[03:14.32]像原始的恋人\n[03:16.85]被开发完所有可能性\n[03:22.82]数码时代用千万像素\n[03:26.63]制造出当我把你放大\n[03:30.49]到底后只剩马赛克的失意\n[03:41.56]拍过我的人\n[03:43.03]傻笑得多诚恳\n[03:45.66]摁下了快门\n[03:47.22]晓得心动不长存\n[03:49.91]拍过我的人\n[03:51.53]体谅了我的冷\n[03:54.11]热情没及格\n[03:55.73]真性情得高分\n[03:58.36]拍过我的人\n[04:00.03]走前还留了吻\n[04:02.61]花心思调整\n[04:04.22]爱和怨的白平衡\n[04:06.90]爱过你的人\n[04:08.53]躺在相片里等\n[04:11.10]面孔已褪色\n[04:12.98]缅怀却更深沉"
	},
	{
		"name":"最佳歌手",
		"src":"http://ws.stream.qqmusic.qq.com/106501705.m4a?fromtag=46",
		"lrc":"[ar:许嵩]\n[ti:最佳歌手]\n[00:00.14]许嵩 - 最佳歌手\n[00:01.24]作词：许嵩\n[00:02.09]作曲：许嵩\n[00:03.09]我们最好的遇见\n[00:06.47]是现在这样的四月\n[00:10.67]柳絮抚着那条街\n[00:14.43]像大雪一样的热烈\n[00:18.58]你轻轻唱起我的歌\n[00:22.38]我受宠若惊的喜悦\n[00:26.78]绝佳的歌艺里面\n[00:30.33]多少故事做铺垫\n[00:38.75]我们最好的告别\n[00:42.45]是现在这样没红眼\n[00:46.70]因你而起的一泓喜悲\n[00:49.95]权当年轻留个纪念\n[00:54.66]清晨回笼做了梦\n[00:58.51]你成明星开演唱会\n[01:02.57]场馆里歌迷很多\n[01:05.87]我被人潮推到尽头\n[01:10.43]你在台上唱着我的创作\n[01:14.49]布局谋篇像本悲情小说\n[01:18.59]你太擅长表演\n[01:21.54]表情淡漠反倒有催泪效果\n[01:26.50]我在台下已经开始感动\n[01:30.55]大屏幕里忽然给我镜头\n[01:35.05]微笑挥挥手\n[01:37.30]多懂事的观众\n[01:59.10]初见和告别之间\n[02:02.46]回想只剩星星点点\n[02:06.51]曾以为刻骨细节\n[02:10.21]在骨灰里面怎么捡\n[02:14.62]沿着环路兜一圈\n[02:18.37]循环放你唱过的歌\n[02:22.53]心里的舞台已启幕\n[02:26.08]主角登场引来掌声雷动\n[02:30.43]你在台上唱着我的创作\n[02:34.48]布局谋篇像本悲情小说\n[02:38.63]你太擅长表演\n[02:41.39]表情淡漠反倒有催泪效果\n[02:46.29]我在台下已经开始感动\n[02:50.44]大屏幕里忽然给我镜头\n[02:55.00]微笑挥挥手\n[02:57.30]多懂事的观众\n[03:02.31]你在台上唱着我的创作\n[03:06.56]布局谋篇像本悲情小说\n[03:10.51]你太擅长表演\n[03:13.51]表情淡漠反倒有催泪效果\n[03:18.37]我在台下已经开始感动\n[03:22.37]整个世界全是你的镜头\n[03:26.87]听完这一首\n[03:29.17]就理性的退后\n[03:38.82]直到某一天碰面\n[03:42.32]在某家餐厅或商店\n[03:46.82]你挽着他和我擦肩\n[03:50.17]还好 我手也有人牵\n[03:54.83]广播里响起的歌\n[03:58.23]是“恍若隔世”的注解\n[04:02.53]最佳歌手的头衔\n[04:06.09]大致上有了人选\n[04:10.64]最佳歌手的感言\n[04:14.34]记得要慢慢念"
	},
	{
		"name":"雅俗共赏",
		"src":"http://ws.stream.qqmusic.qq.com/106034300.m4a?fromtag=46",
		"lrc":"[ar:许嵩]\n[ti:雅俗共赏]\n[00:00.45]许嵩 - 雅俗共赏\n[00:02.05]词曲：许嵩\n[00:16.05]是否每一部戏都看得完整场\n[00:22.95]是否每一天过得都有多难忘\n[00:29.90]表情迟钝可能因为比较爱想\n[00:36.85]不擅长眉目表达\n[00:42.61]总在盼望 总在失望\n[00:46.06]日子还不都这样\n[00:49.56]俗的无畏 雅的轻狂\n[00:53.06]还不都是一副臭皮囊\n[00:59.86]他们说快写一首情歌雅俗共赏\n[01:04.31]落笔传神还要容易传唱\n[01:07.71]上得厅堂也下得厨房\n[01:10.81]就像我一直在找的姑娘\n[01:14.67]快写一首情歌雅俗共赏\n[01:18.17]打完字谜还要接着打榜\n[01:21.62]如果胡同弄堂全都播放\n[01:24.82]气韵里居然添了些孤芳自赏\n[01:46.90]是否每一场美梦醒来都很爽\n[01:53.26]是否每一次成熟都徒增了业障\n[02:00.11]比痛和痒更多的\n[02:03.36]是不痛不痒\n[02:07.31]所以我爱进剧场\n[02:13.06]总在盼望 总在失望\n[02:16.56]日子还不都这样\n[02:19.86]俗的无畏 雅的轻狂\n[02:23.41]还不都是一副臭皮囊\n[02:29.62]他们说快写一首情歌雅俗共赏\n[02:34.72]落笔传神还要容易传唱\n[02:38.22]上得厅堂也下得厨房\n[02:41.27]就像我一直在找的姑娘\n[02:45.17]快写一首情歌雅俗共赏\n[02:48.62]打完字谜还要接着打榜\n[02:52.08]如果胡同弄堂全都播放\n[02:55.23]气韵里居然添了些孤芳自赏\n[03:02.98]谁的故事有营养\n[03:06.08]大俗或大雅的都在理直气壮\n[03:09.98]洒狗血或白雪的现场\n[03:13.83]都邀我观赏\n[03:15.43]还真是大方\n[03:20.03]快写一首情歌雅俗共赏\n[03:23.39]落笔传神还要容易传唱\n[03:26.84]上得厅堂也下得厨房\n[03:30.29]就像我一直在找的姑娘\n[03:33.89]有没有一种生活雅俗共赏\n[03:37.29]情节起伏跌宕让人向往\n[03:40.79]满纸荒唐中窥见满脸沧桑\n[03:44.09]触到神经就要懂得鼓掌\n[03:47.44]别说一不在乎二没期望\n[03:50.90]太超脱 中枪中奖感觉会一样"
	},
	{
		"name":"燕归巢",
		"src":"http://ws.stream.qqmusic.qq.com/105575471.m4a?fromtag=46",
		"lrc":"[ar:许嵩]\n[ti:燕归巢]\n[00:08.97]许嵩 - 燕归巢\n[00:15.54]作词：许嵩\n[00:18.96]作曲：许嵩\n[00:20.96]制作人：许嵩\n[00:48.09]雨后江岸天破晓\n[00:51.49]老舟新客知多少\n[00:54.99]远山见竹林芳草\n[00:58.04]晨风抚绿了芭蕉\n[01:02.19]寒梅落尽把冬了\n[01:05.74]衔春的燕想归巢\n[01:09.34]沿途的景 牵挂的人\n[01:12.89]两情迢迢\n[01:16.45]柳叶桨溅桃花浪\n[01:19.20]汀州里鹤眺远方\n[01:23.63]饮一盏岁月留香\n[01:26.23]唱一曲往事飞扬\n[01:30.80]山水间歌声回荡\n[01:34.40]回荡思念的滚烫\n[01:38.00]去年的家书两行\n[01:41.10]读来又热了眼眶\n[01:45.17]云水边静沐暖阳\n[01:48.47]烟波里久违的故乡\n[01:52.32]别来无恙\n[01:54.87]你在心上\n[02:28.41]雨后江岸天破晓\n[02:31.72]老舟新客知多少\n[02:35.28]远山见竹林芳草\n[02:38.34]晨风抚绿了芭蕉\n[02:42.50]寒梅落尽把冬了\n[02:46.05]衔春的燕想归巢\n[02:49.73]沿途的景 牵挂的人\n[02:53.20]两情迢迢\n[02:56.81]柳叶桨溅桃花浪\n[02:59.41]汀州里鹤眺远方\n[03:03.86]饮一盏岁月留香\n[03:06.62]唱一曲往事飞扬\n[03:11.07]山水间歌声回荡\n[03:14.68]回荡思念的滚烫\n[03:18.23]去年的家书两行\n[03:21.39]读来又热了眼眶\n[03:25.49]云水边静沐暖阳\n[03:28.79]烟波里久违的故乡\n[03:32.61]别来无恙\n[03:35.13]你在心上\n[03:40.73]儿时的窗 苍老的墙\n[03:44.18]是否偷换了方向\n[03:47.84]堂前的你和我相逢时\n[03:50.54]会沉默还是会诉尽衷肠\n[03:57.60]山水间歌声回荡\n[04:01.26]回荡思念的滚烫\n[04:04.76]去年的家书两行\n[04:07.82]读来又热了眼眶\n[04:11.89]云水边静沐暖阳\n[04:15.34]烟波里久违的故乡\n[04:19.93]别来无恙\n[04:21.48]你在心上\n[04:29.99]别来无恙\n[04:33.40]你在心上\n"
	}
]];