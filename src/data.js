/**
 * 美食数据配置文件
 * 包含所有美食信息和城市映射
 */

// 美食数据
export const foodData = [
  {
    id: 'beijing-roast-duck',
    name: '北京烤鸭',
    city: 'beijing',
    emoji: '🦆',
    color: '#c41e3a',
    description: '色泽红润，皮脆肉嫩，被誉为"天下美味"',
    tags: ['名菜', '烤制'],
    detail: '北京烤鸭是北京最著名的传统美食之一，已有600多年历史。选用优质北京填鸭，经过烤制后皮脆肉嫩，色泽红润。通常用荷叶饼卷着鸭肉、葱丝、黄瓜丝和甜面酱食用。',
    shops: ['全聚德', '便宜坊', '大董烤鸭']
  },
  {
    id: 'beijing-zhajiang-noodles',
    name: '老北京炸酱面',
    city: 'beijing',
    emoji: '🍜',
    color: '#8b4513',
    description: '手工擀面配秘制炸酱，老北京的传统味道',
    tags: ['主食', '传统'],
    detail: '炸酱面是北京人的家常面食。面条要手工擀制，劲道有嚼劲。炸酱用黄酱和甜面酱调制，配上黄瓜丝、豆芽菜、萝卜丝等菜码，搅拌均匀后食用。',
    shops: ['海碗居', '方砖厂69号炸酱面']
  },
  {
    id: 'beijing-hotpot',
    name: '铜锅涮肉',
    city: 'beijing',
    emoji: '🍲',
    color: '#cd853f',
    description: '清汤铜锅，鲜嫩羊肉，蘸麻酱食用',
    tags: ['火锅', '冬季'],
    detail: '铜锅涮肉是北京冬季的代表性美食。使用铜锅炭火，清水锅底，配上芝麻酱、腐乳、韭菜花等调料。羊肉要选择后腿肉，切片后薄如纸。',
    shops: ['东来顺', '南门涮肉', '聚宝源']
  },
  {
    id: 'chengdu-mapo-tofu',
    name: '麻婆豆腐',
    city: 'chengdu',
    emoji: '🌶️',
    color: '#c41e1e',
    description: '麻、辣、烫、香、酥、嫩、鲜、活八字箴言',
    tags: ['川菜', '麻辣'],
    detail: '麻婆豆腐是川菜的经典代表，由陈麻婆创制。豆腐要选用嫩豆腐，牛肉末要炒酥，郫县豆瓣酱要炒出红油。关键在于火候和调料的比例。',
    shops: ['陈麻婆豆腐', '老川东']
  },
  {
    id: 'chengdu-chuanchuan',
    name: '串串香',
    city: 'chengdu',
    emoji: '🍢',
    color: '#8b0000',
    description: '竹签串菜，烫煮食用，成都特色小吃',
    tags: ['小吃', '麻辣'],
    detail: '串串香是成都街头最常见的小吃之一。将各种食材用竹签串起，放入滚烫的辣汤中涮煮。吃法自由，价格实惠，是成都人的深夜食堂。',
    shops: ['钢管厂五区小郡肝', '马路边边']
  },
  {
    id: 'chengdu-huiguorou',
    name: '回锅肉',
    city: 'chengdu',
    emoji: '🥘',
    color: '#a52a2a',
    description: '川菜之首，肥而不腻，香气浓郁',
    tags: ['川菜', '家常菜'],
    detail: '回锅肉被誉为"川菜之首"，是四川家家户户都会做的家常菜。选用五花肉，先煮后炒，加入豆瓣酱、豆豉、蒜苗等调料，色泽红亮，肥而不腻。',
    shops: ['老川馆', '陈麻婆']
  },
  {
    id: 'guangzhou-shrimp-dumpling',
    name: '虾饺',
    city: 'guangzhou',
    emoji: '🥟',
    color: '#daa520',
    description: '皮薄馅足，虾仁鲜美，早茶必备',
    tags: ['点心', '早茶'],
    detail: '虾饺是广式早茶的招牌点心。虾饺皮要用澄面制作，半透明状。馅料以鲜虾仁为主，配上肥猪肉丁，口感鲜美弹牙。',
    shops: ['点都德', '陶陶居', '广州酒家']
  },
  {
    id: 'guangzhou-roast-goose',
    name: '烧鹅',
    city: 'guangzhou',
    emoji: '🍖',
    color: '#d2691e',
    description: '皮脆肉嫩，色泽金红，广式烧腊代表',
    tags: ['烧腊', '名菜'],
    detail: '广式烧鹅是广东烧腊的代表。选用黑鬃鹅，用特制酱料腌制后挂炉烤制。皮脆肉嫩，色泽金红，配上酸梅酱食用更佳。',
    shops: ['深井烧鹅', '泮溪酒家', '炳胜品味']
  },
  {
    id: 'guangzhou-wonton-noodles',
    name: '云吞面',
    city: 'guangzhou',
    emoji: '🍜',
    color: '#f4a460',
    description: '竹升面配上鲜虾云吞，汤清味美',
    tags: ['面食', '汤品'],
    detail: '广州云吞面是传统粤式面食。面条用竹竿压制成，口感爽脆弹牙。云吞以鲜虾仁为主，配上猪肉和马蹄，汤底用大地鱼熬制。',
    shops: ['麦园', '银记肠粉', '陈添记']
  },
  {
    id: 'shanghai-xiaolongbao',
    name: '小笼包',
    city: 'shanghai',
    emoji: '🥟',
    color: '#8b0000',
    description: '皮薄汁多，鲜香四溢，上海标志性美食',
    tags: ['点心', '汤包'],
    detail: '上海小笼包是江南小吃的代表。皮薄如纸，馅大汁多。制作工艺复杂，需要将皮冻融入馅料中，蒸熟后汤汁丰富，鲜美可口。',
    shops: ['南翔馒头店', '佳家汤包', '鼎泰丰']
  },
  {
    id: 'shanghai-hongshaorou',
    name: '红烧肉',
    city: 'shanghai',
    emoji: '🍖',
    color: '#a0522d',
    description: '本帮经典，肥瘦相间，甜咸适口',
    tags: ['本帮菜', '家常菜'],
    detail: '上海红烧肉是本帮菜的经典代表。选用五花肉，先炒后烧，加入冰糖炒糖色。关键在于火候，要用小火慢炖，使肉质酥烂，色泽红亮，甜咸适口。',
    shops: ['老正兴', '绿波廊', '上海老饭店']
  },
  {
    id: 'shanghai-scallion-noodles',
    name: '葱油拌面',
    city: 'shanghai',
    emoji: '🍜',
    color: '#cd853f',
    description: '葱香浓郁，面条劲道，简单却美味',
    tags: ['面食', '小吃'],
    detail: '葱油拌面是上海人的家常面食。用小葱炒香后熬制成葱油，拌入煮好的面条。简单却美味，葱香浓郁，面条劲道，是上海人的心头好。',
    shops: ['大壶春', '光明邨']
  },
  {
    id: 'xian-roujiamo',
    name: '肉夹馍',
    city: 'xian',
    emoji: '🥙',
    color: '#8b4513',
    description: '腊汁肉夹入白吉馍，陕西特色小吃',
    tags: ['小吃', '面食'],
    detail: '肉夹馍是陕西著名小吃。白吉馍外酥里嫩，腊汁肉肥瘦相间，口感丰富。制作腊汁肉需要长时间炖煮，肉质酥烂，肥而不腻。',
    shops: ['樊记腊汁肉夹馍', '秦豫肉夹馍', '子午路张记']
  },
  {
    id: 'xian-yangroupaomo',
    name: '羊肉泡馍',
    city: 'xian',
    emoji: '🍜',
    color: '#daa520',
    description: '自己掰馍，加入羊肉高汤，香气扑鼻',
    tags: ['面食', '汤品'],
    detail: '羊肉泡馍是西安最具代表性的美食。需要将馍掰成黄豆大小的碎块，加入羊肉高汤和羊肉片。掰馍的过程是享受的一部分，汤浓肉烂，回味无穷。',
    shops: ['老孙家', '一真楼', '同盛祥']
  },
  {
    id: 'xian-biangbiang-noodles',
    name: 'Biángbiáng面',
    city: 'xian',
    emoji: '🍜',
    color: '#c41e3a',
    description: '宽如裤带，配上辣椒油和臊子，口感劲道',
    tags: ['面食', '特色'],
    detail: 'Biángbiáng面是陕西特色宽面。面条宽如裤带，手工拉制，口感劲道。配上辣椒油、西红柿酱、蒜苗等调料，香气扑鼻，味道浓郁。',
    shops: ['秦镇米皮', '柳巷面', '老碗会']
  },
  {
    id: 'chongqing-hotpot',
    name: '重庆火锅',
    city: 'chongqing',
    emoji: '🍲',
    color: '#c41e1e',
    description: '麻辣鲜香，牛油锅底，食材丰富',
    tags: ['火锅', '麻辣'],
    detail: '重庆火锅是重庆人的灵魂美食。使用牛油锅底，麻辣鲜香，食材丰富。毛肚、黄喉、鸭肠是火锅三宝，要七上八下涮烫，口感最佳。',
    shops: ['珮姐老火锅', '大龙燚', '蜀大侠']
  },
  {
    id: 'chongqing-noodles',
    name: '重庆小面',
    city: 'chongqing',
    emoji: '🍜',
    color: '#8b0000',
    description: '碱水面条，配上辣椒油和花椒，麻辣鲜香',
    tags: ['面食', '早餐'],
    detail: '重庆小面是重庆人的早餐首选。碱水面条劲道，配上辣椒油、花椒、花生碎、葱花等调料，麻辣鲜香，简单却美味。',
    shops: ['花姐小面', '胖妹面庄', '花市豌杂面']
  },
  {
    id: 'chongqing-suanlafen',
    name: '酸辣粉',
    city: 'chongqing',
    emoji: '🥘',
    color: '#a52a2a',
    description: '红薯粉条，酸辣开胃，街头小吃',
    tags: ['小吃', '酸辣'],
    detail: '酸辣粉是重庆街头小吃的代表。选用红薯粉条，酸辣开胃。汤底用醋、辣椒、花椒等调制，配上花生、香菜、葱花，酸辣可口。',
    shops: ['好又来酸辣粉', '桥头酸辣粉', '小天鹅']
  },
  {
    id: 'hangzhou-xihu-carp',
    name: '西湖醋鱼',
    city: 'hangzhou',
    emoji: '🐟',
    color: '#8b4513',
    description: '选用草鱼，糖醋调味，色泽红亮，酸甜鲜嫩',
    tags: ['浙菜', '名菜'],
    detail: '西湖醋鱼是杭州传统名菜。选用草鱼，糖醋调味，色泽红亮，酸甜鲜嫩。这道菜体现了杭州菜清淡鲜美的特点，是杭州宴席的必备菜。',
    shops: ['楼外楼', '知味观', '新白鹿']
  },
  {
    id: 'hangzhou-dongporou',
    name: '东坡肉',
    city: 'hangzhou',
    emoji: '🍖',
    color: '#cd853f',
    description: '肥瘦相间，色泽红亮，肥而不腻，入口即化',
    tags: ['浙菜', '名菜'],
    detail: '东坡肉是杭州传统名菜，相传由苏东坡创制。选用五花肉，肥瘦相间，色泽红亮，肥而不腻，入口即化。制作时要用小火慢炖，火候是关键。',
    shops: ['楼外楼', '知味观', '新白鹿']
  },
  {
    id: 'hangzhou-longjing-shrimp',
    name: '龙井虾仁',
    city: 'hangzhou',
    emoji: '🍤',
    color: '#daa520',
    description: '选用龙井新茶，虾仁鲜嫩，茶香清雅',
    tags: ['浙菜', '名菜'],
    detail: '龙井虾仁是杭州传统名菜。选用龙井新茶和鲜虾仁，茶香与虾香完美融合，口感清雅，体现了杭州菜清淡鲜美的特点。',
    shops: ['楼外楼', '知味观', '新白鹿']
  },
  {
    id: 'hot-dry-noodles',
    name: '热干面',
    city: 'wuhan',
    emoji: '🍜',
    color: '#8b4513',
    description: '碱水面条，芝麻酱调味，香气浓郁，武汉早餐首选',
    tags: ['面食', '早餐'],
    detail: '热干面是武汉人的早餐首选。碱水面条劲道，配上浓郁的芝麻酱，香气扑鼻。还可以加入酸豆角、萝卜丁等配料，口感丰富。',
    shops: ['蔡林记', '老通城', '四季美']
  },
  {
    id: 'three-delicious-bean-curd',
    name: '三鲜豆皮',
    city: 'wuhan',
    emoji: '🥟',
    color: '#cd853f',
    description: '糯米包裹香菇、火腿、虾仁，外皮酥脆',
    tags: ['小吃', '早餐'],
    detail: '三鲜豆皮是武汉特色小吃。糯米包裹香菇、火腿、虾仁等馅料，外皮酥脆，内里软糯。早餐摊上最常见，是武汉人的记忆味道。',
    shops: ['老通城', '四季美', '王师傅豆皮']
  },
  {
    id: 'jingwu-duck-neck',
    name: '精武鸭脖',
    city: 'wuhan',
    emoji: '🍲',
    color: '#c41e1e',
    description: '卤制入味，麻辣鲜香，武汉特色卤味',
    tags: ['卤味', '小吃'],
    detail: '精武鸭脖是武汉特色卤味。鸭脖卤制入味，麻辣鲜香，越啃越香。是武汉人聚会、看电视时的必备零食，也是武汉的标志性美食。',
    shops: ['精武鸭脖', '周黑鸭', '绝味鸭脖']
  }
]

// 城市映射
export const cityMap = {
  beijing: '北京',
  chengdu: '成都',
  chongqing: '重庆',
  guangzhou: '广州',
  hangzhou: '杭州',
  shanghai: '上海',
  wuhan: '武汉',
  xian: '西安'
}

// 城市列表（用于导航）
export const cities = [
  { id: 'all', name: '全部' },
  { id: 'beijing', name: '北京' },
  { id: 'chengdu', name: '成都' },
  { id: 'chongqing', name: '重庆' },
  { id: 'guangzhou', name: '广州' },
  { id: 'hangzhou', name: '杭州' },
  { id: 'shanghai', name: '上海' },
  { id: 'wuhan', name: '武汉' },
  { id: 'xian', name: '西安' }
]

// 标签映射（用于筛选）
export const tagMap = {
  '名菜': '名菜',
  '烤制': '烤制',
  '主食': '主食',
  '传统': '传统',
  '火锅': '火锅',
  '冬季': '冬季',
  '川菜': '川菜',
  '麻辣': '麻辣',
  '小吃': '小吃',
  '点心': '点心',
  '早茶': '早茶',
  '烧腊': '烧腊',
  '本帮菜': '本帮菜',
  '家常菜': '家常菜',
  '面食': '面食',
  '汤品': '汤品',
  '特色': '特色',
  '卤味': '卤味',
  '早餐': '早餐',
  '酸辣': '酸辣',
  '浙菜': '浙菜'
}
