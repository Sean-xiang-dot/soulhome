// 毛选语录数据 - 58句精选
const maoQuotes = [
    {
        text: "世上无难事，只要肯登攀。",
        source: "《水调歌头·重上井冈山》",
        meaning: "世界上没有办不到的事情，关键在于是否有决心和毅力去攀登。"
    },
    {
        text: "星星之火，可以燎原。",
        source: "《星星之火，可以燎原》",
        meaning: "微小的力量，只要坚持不懈，也能发展成巨大的声势。"
    },
    {
        text: "战略上要藐视敌人，战术上要重视敌人。",
        source: "《关于目前党的政策中的几个重要问题》",
        meaning: "面对困难要有必胜的信心，但在具体行动上要谨慎对待。"
    },
    {
        text: "下定决心，不怕牺牲，排除万难，去争取胜利。",
        source: "《愚公移山》",
        meaning: "一旦下定决心，就要勇往直前，克服一切困难。"
    },
    {
        text: "一切反动派都是纸老虎。",
        source: "《和美国记者安娜·路易斯·斯特朗的谈话》",
        meaning: "看似强大的困难，其实并不可怕，只要敢于面对就能战胜。"
    },
    {
        text: "没有调查，就没有发言权。",
        source: "《反对本本主义》",
        meaning: "不了解实际情况，就无法做出正确的判断和决策。"
    },
    {
        text: "从群众中来，到群众中去。",
        source: "《关于领导方法的若干问题》",
        meaning: "要善于倾听和学习，把智慧集中起来，再回到实践中去。"
    },
    {
        text: "事物总是一分为二的。",
        source: "《党内团结的辩证方法》",
        meaning: "任何事情都有两面性，要学会全面看待问题。"
    },
    {
        text: "前途是光明的，道路是曲折的。",
        source: "《关于重庆谈判》",
        meaning: "虽然过程可能艰难，但只要坚持，终会迎来光明。"
    },
    {
        text: "虚心使人进步，骄傲使人落后。",
        source: "《中国共产党第八次全国代表大会开幕词》",
        meaning: "保持谦逊的态度才能不断成长，自满只会停滞不前。"
    },
    {
        text: "好好学习，天天向上。",
        source: "为少年儿童题词",
        meaning: "持续学习，每天都在进步，是人生最好的状态。"
    },
    {
        text: "自己动手，丰衣足食。",
        source: "为南泥湾题词",
        meaning: "依靠自己的努力，就能创造美好的生活。"
    },
    {
        text: "不打无准备之仗。",
        source: "《论持久战》",
        meaning: "做任何事情都要有所准备，才能提高成功的概率。"
    },
    {
        text: "集中优势兵力，各个歼灭敌人。",
        source: "《集中优势兵力，各个歼灭敌人》",
        meaning: "把力量集中在关键点上，逐一解决问题。"
    },
    {
        text: "百花齐放，百家争鸣。",
        source: "《关于正确处理人民内部矛盾的问题》",
        meaning: "包容不同的声音和想法，才能激发创造力。"
    },
    {
        text: "实事求是。",
        source: "《改造我们的学习》",
        meaning: "从实际出发，探求事物的本质规律。"
    },
    {
        text: "知无不言，言无不尽。",
        source: "《论联合政府》",
        meaning: "知道的就说，说了就说透彻，坦诚是最好的沟通。"
    },
    {
        text: "惩前毖后，治病救人。",
        source: "《整顿党的作风》",
        meaning: "从过去的错误中吸取教训，帮助自己和他人成长。"
    },
    {
        text: "百花齐放，推陈出新。",
        source: "《在延安文艺座谈会上的讲话》",
        meaning: "在继承中创新，在创新中发展。"
    },
    {
        text: "团结—批评—团结。",
        source: "《关于正确处理人民内部矛盾的问题》",
        meaning: "通过坦诚的沟通解决问题，最终达到更好的团结。"
    },
    {
        text: "凡是敌人反对的，我们就要拥护；凡是敌人拥护的，我们就要反对。",
        source: "《和中央社、扫荡报、新民报三记者的谈话》",
        meaning: "要有独立判断的能力，不盲从他人。"
    },
    {
        text: "调查就像'十月怀胎'，解决问题就像'一朝分娩'。",
        source: "《反对本本主义》",
        meaning: "充分的准备是成功的基础。"
    },
    {
        text: "群众是真正的英雄。",
        source: "《〈农村调查〉的序言和跋》",
        meaning: "要向身边的人学习，每个人都有值得学习的地方。"
    },
    {
        text: "没有文化的军队是愚蠢的军队。",
        source: "《论联合政府》",
        meaning: "知识和智慧是力量的源泉。"
    },
    {
        text: "夺取全国胜利，这只是万里长征走完了第一步。",
        source: "《在中国共产党第七届中央委员会第二次全体会议上的报告》",
        meaning: "取得一点成绩不要骄傲，更长的路还在前方。"
    },
    {
        text: "务必使同志们继续地保持谦虚、谨慎、不骄、不躁的作风。",
        source: "《在中国共产党第七届中央委员会第二次全体会议上的报告》",
        meaning: "成功时更要保持清醒和谦逊。"
    },
    {
        text: "一个人做点好事并不难，难的是一辈子做好事。",
        source: "《吴玉章同志六十寿辰祝词》",
        meaning: "坚持是最难能可贵的品质。"
    },
    {
        text: "读书是学习，使用也是学习，而且是更重要的学习。",
        source: "《中国革命战争的战略问题》",
        meaning: "实践是最好的学习方式。"
    },
    {
        text: "感觉到了的东西，我们不能立刻理解它，只有理解了的东西才更深刻地感觉它。",
        source: "《实践论》",
        meaning: "理性认识比感性认识更深刻。"
    },
    {
        text: "矛盾存在于一切事物的发展过程中。",
        source: "《矛盾论》",
        meaning: "有问题是正常的，关键是如何面对和解决。"
    },
    {
        text: "外因是变化的条件，内因是变化的根据。",
        source: "《矛盾论》",
        meaning: "外部环境很重要，但内心的力量才是根本。"
    },
    {
        text: "事物的性质，主要地是由取得支配地位的矛盾的主要方面所规定的。",
        source: "《矛盾论》",
        meaning: "抓住问题的关键，才能找到解决之道。"
    },
    {
        text: "在危险环境中表示绝望的人，在黑暗中看不见光明的人，只是懦夫与机会主义者。",
        source: "《论持久战》",
        meaning: "即使在最困难的时候，也要保持希望。"
    },
    {
        text: "武器是战争的重要的因素，但不是决定的因素，决定的因素是人不是物。",
        source: "《论持久战》",
        meaning: "人的意志和智慧比物质条件更重要。"
    },
    {
        text: "战争的目的不是别的，就是保存自己，消灭敌人。",
        source: "《论持久战》",
        meaning: "保护自己，战胜困难，是生存的智慧。"
    },
    {
        text: "主动权不是任何天才家所固有的，而是智慧和勇气所产生的。",
        source: "《抗日游击战争的战略问题》",
        meaning: "主动把握机会，需要智慧和勇气。"
    },
    {
        text: "有利的情况和主动的恢复，产生于'再坚持一下'的努力之中。",
        source: "《抗日游击战争的战略问题》",
        meaning: "很多时候，成功就在于多坚持一下。"
    },
    {
        text: "我们的同志在困难的时候，要看到成绩，要看到光明，要提高我们的勇气。",
        source: "《为人民服务》",
        meaning: "困难时更要看到希望，保持勇气。"
    },
    {
        text: "人总是要死的，但死的意义有不同。",
        source: "《为人民服务》",
        meaning: "生命的价值在于意义，而不在于长短。"
    },
    {
        text: "因为我们是为人民服务的，所以，我们如果有缺点，就不怕别人批评指出。",
        source: "《为人民服务》",
        meaning: "虚心接受批评，才能不断进步。"
    },
    {
        text: "一切革命队伍的人都要互相关心，互相爱护，互相帮助。",
        source: "《为人民服务》",
        meaning: "人与人之间要相互支持和关爱。"
    },
    {
        text: "要使全体青年们懂得，我们的国家现在还是一个很穷的国家。",
        source: "《关于正确处理人民内部矛盾的问题》",
        meaning: "认清现实，脚踏实地，才能改变现状。"
    },
    {
        text: "世界是在进步的，前途是光明的，这个历史的总趋势任何人也改变不了。",
        source: "《关于重庆谈判》",
        meaning: "相信未来，相信进步的力量。"
    },
    {
        text: "我们应当把世界进步的情况和光明的前途，常常向人民宣传。",
        source: "《关于重庆谈判》",
        meaning: "传播正能量，让更多人看到希望。"
    },
    {
        text: "什么叫工作，工作就是斗争。",
        source: "《关于重庆谈判》",
        meaning: "工作就是不断克服困难的过程。"
    },
    {
        text: "我们不但善于破坏一个旧世界，我们还将善于建设一个新世界。",
        source: "《在中国共产党第七届中央委员会第二次全体会议上的报告》",
        meaning: "勇于改变，勇于创造新的可能。"
    },
    {
        text: "我们能够学会我们原来不懂的东西。",
        source: "《在中国共产党第七届中央委员会第二次全体会议上的报告》",
        meaning: "学习的能力是无限的，永远不要停止学习。"
    },
    {
        text: "我们的任务是过河，但是没有桥或没有船就不能过。",
        source: "《关心群众生活，注意工作方法》",
        meaning: "目标明确后，要找到正确的方法。"
    },
    {
        text: "不解决桥或船的问题，过河就是一句空话。",
        source: "《关心群众生活，注意工作方法》",
        meaning: "方法和工具同样重要。"
    },
    {
        text: "群众生产，群众利益，群众经验，群众情绪，这些都是领导干部们应时刻注意的。",
        source: "《为群众服务》",
        meaning: "关注身边的人和事，才能做出正确的决策。"
    },
    {
        text: "艰苦的工作就像担子，摆在我们的面前，看我们敢不敢承担。",
        source: "《关于重庆谈判》",
        meaning: "勇于承担责任，是成长的必经之路。"
    },
    {
        text: "有些同志不愿意多想困难。但是困难是事实，有多少就得承认多少。",
        source: "《关于重庆谈判》",
        meaning: "正视困难，才能找到解决的办法。"
    },
    {
        text: "不能只要好的，把困难向人民宣传一下，没有什么坏处。",
        source: "《关于重庆谈判》",
        meaning: "坦诚面对困难，才能获得理解和支持。"
    },
    {
        text: "办法是跟着方针来的。",
        source: "《反对日本进攻的方针、办法和前途》",
        meaning: "方向明确了，方法自然会找到。"
    },
    {
        text: "事情有大道理，有小道理，一切小道理都归大道理管着。",
        source: "《反对日本进攻的方针、办法和前途》",
        meaning: "抓住主要矛盾，次要问题自然迎刃而解。"
    },
    {
        text: "我们的同志不论到什么地方，都要和群众的关系搞好，要关心群众。",
        source: "《关于领导方法的若干问题》",
        meaning: "与人为善，关心他人，是处世之道。"
    },
    {
        text: "凡属正确的领导，必须是从群众中来，到群众中去。",
        source: "《关于领导方法的若干问题》",
        meaning: "倾听和学习，是最好的成长方式。"
    },
    {
        text: "丢掉幻想，准备斗争。",
        source: "《丢掉幻想，准备斗争》",
        meaning: "面对现实，做好充分的准备。"
    }
];

// 塔罗牌数据 - 78张完整牌组
const tarotCards = [
    // 大阿尔卡纳 (22张)
    { id: 0, name: "愚人", nameEn: "The Fool", type: "major", keywords: "开始、自由、纯真、冒险", meaning: "新的起点，充满信心地踏上旅程，拥抱未知，活在当下。", image: "🃏" },
    { id: 1, name: "魔术师", nameEn: "The Magician", type: "major", keywords: "意志力、技能、专注、表现", meaning: "能力高超，资源充足，将想法变为现实，沟通能力强。", image: "🎩" },
    { id: 2, name: "女祭司", nameEn: "The High Priestess", type: "major", keywords: "直觉、灵性、内在声音", meaning: "相信直觉，探索内在智慧，隐藏的潜力与秘密。", image: "🌙" },
    { id: 3, name: "皇后", nameEn: "The Empress", type: "major", keywords: "丰盛、创造力、滋养、自然", meaning: "丰收、富足、创造力、感官享受、关爱与滋养。", image: "👑" },
    { id: 4, name: "皇帝", nameEn: "The Emperor", type: "major", keywords: "稳定、权威、控制、纪律", meaning: "权力、稳定、纪律、领导力，通过规则达成目标。", image: "⚔️" },
    { id: 5, name: "教皇", nameEn: "The Hierophant", type: "major", keywords: "传统、教育、信仰、知识", meaning: "遵循传统，寻求指引，精神信仰，融入团体。", image: "📿" },
    { id: 6, name: "恋人", nameEn: "The Lovers", type: "major", keywords: "爱、选择、平衡、团结", meaning: "重要的选择，真爱，价值观一致，和谐的伙伴关系。", image: "💕" },
    { id: 7, name: "战车", nameEn: "The Chariot", type: "major", keywords: "成功、决心、自律、控制力", meaning: "通过意志力取得成功，掌控局势，前进，胜利。", image: "🏆" },
    { id: 8, name: "力量", nameEn: "Strength", type: "major", keywords: "勇气、自信、同情、内在力量", meaning: "内心的力量，以温和的方式克服挑战，勇气与同情。", image: "🦁" },
    { id: 9, name: "隐士", nameEn: "The Hermit", type: "major", keywords: "自我反省、孤独、寻找真理", meaning: "自我反思，寻求内在真理，独处以获得智慧。", image: "🏔️" },
    { id: 10, name: "命运之轮", nameEn: "Wheel of Fortune", type: "major", keywords: "变化、命运、运气、转机", meaning: "命运的转折，好运，新的周期开始，把握机遇。", image: "☸️" },
    { id: 11, name: "正义", nameEn: "Justice", type: "major", keywords: "公平、责任、真相、因果", meaning: "公平公正，因果报应，平衡，做出正确决定。", image: "⚖️" },
    { id: 12, name: "倒吊人", nameEn: "The Hanged Man", type: "major", keywords: "牺牲、等待、新视角", meaning: "自愿牺牲，换位思考，等待时机，精神觉醒。", image: "🙃" },
    { id: 13, name: "死神", nameEn: "Death", type: "major", keywords: "转变、结束、放手、新生", meaning: "不可避免的结束，深刻的转变，放手迎接新生。", image: "💀" },
    { id: 14, name: "节制", nameEn: "Temperance", type: "major", keywords: "平衡、耐心、和谐、适度", meaning: "平衡和谐，融合对立面，耐心，找到中间道路。", image: "🏺" },
    { id: 15, name: "恶魔", nameEn: "The Devil", type: "major", keywords: "欲望、束缚、沉迷、无力", meaning: "沉迷、束缚、物质欲望、感觉被困。", image: "😈" },
    { id: 16, name: "高塔", nameEn: "The Tower", type: "major", keywords: "剧变、崩溃、颠覆、觉醒", meaning: "突如其来的剧变，打破幻想，必要的破坏与觉醒。", image: "🗼" },
    { id: 17, name: "星星", nameEn: "The Star", type: "major", keywords: "希望、灵感、治愈、信念", meaning: "希望与信心，灵感涌现，心灵平静，对未来乐观。", image: "⭐" },
    { id: 18, name: "月亮", nameEn: "The Moon", type: "major", keywords: "幻觉、潜意识、困惑、秘密", meaning: "面对恐惧，探索潜意识，幻觉，不确定性。", image: "🌕" },
    { id: 19, name: "太阳", nameEn: "The Sun", type: "major", keywords: "快乐、成功、活力、真理", meaning: "快乐与成功，活力充沛，积极乐观，纯真。", image: "☀️" },
    { id: 20, name: "审判", nameEn: "Judgement", type: "major", keywords: "觉醒、重生、反思、清算", meaning: "自我反省与觉醒，因果清算，重要的决定，重生。", image: "📯" },
    { id: 21, name: "世界", nameEn: "The World", type: "major", keywords: "完成、成就、圆满、和谐", meaning: "圆满成功，旅程完成，达成目标，整合与和谐。", image: "🌍" },
    
    // 权杖牌组 (14张)
    { id: 22, name: "权杖王牌", nameEn: "Ace of Wands", type: "wands", keywords: "新开始、灵感、活力", meaning: "新的创意和激情，充满活力的新起点。", image: "🔥" },
    { id: 23, name: "权杖二", nameEn: "Two of Wands", type: "wands", keywords: "计划、决策、冒险", meaning: "在计划与行动之间，需要做出重要决策。", image: "⚡" },
    { id: 24, name: "权杖三", nameEn: "Three of Wands", type: "wands", keywords: "进展、远见、扩张", meaning: "初步成果显现，展望未来，准备扩张。", image: "🌊" },
    { id: 25, name: "权杖四", nameEn: "Four of Wands", type: "wands", keywords: "稳定、庆祝、家庭和谐", meaning: "稳定和庆祝的时刻，享受成果。", image: "🎉" },
    { id: 26, name: "权杖五", nameEn: "Five of Wands", type: "wands", keywords: "竞争、冲突、自我挑战", meaning: "面临竞争和挑战，需要展现能力。", image: "⚔️" },
    { id: 27, name: "权杖六", nameEn: "Six of Wands", type: "wands", keywords: "胜利、认可、自信", meaning: "获得胜利和认可，自信满满。", image: "🏇" },
    { id: 28, name: "权杖七", nameEn: "Seven of Wands", type: "wands", keywords: "防御、坚持、保护", meaning: "需要坚守立场，保护自己的成果。", image: "🛡️" },
    { id: 29, name: "权杖八", nameEn: "Eight of Wands", type: "wands", keywords: "快速行动、进展、突然变化", meaning: "事情快速发展，变化突如其来。", image: "🏹" },
    { id: 30, name: "权杖九", nameEn: "Nine of Wands", type: "wands", keywords: "韧性、坚持、接近成功", meaning: "虽然疲惫但仍坚持，成功就在眼前。", image: "🌉" },
    { id: 31, name: "权杖十", nameEn: "Ten of Wands", type: "wands", keywords: "负担、压力、责任过重", meaning: "承担过多责任，感到压力重重。", image: "🏋️" },
    { id: 32, name: "权杖侍从", nameEn: "Page of Wands", type: "wands", keywords: "活力、新想法、冒险精神", meaning: "充满热情和创意，勇于探索新事物。", image: "📜" },
    { id: 33, name: "权杖骑士", nameEn: "Knight of Wands", type: "wands", keywords: "勇敢、热情、自由奔放", meaning: "充满激情地追求目标，行动迅速。", image: "🐎" },
    { id: 34, name: "权杖皇后", nameEn: "Queen of Wands", type: "wands", keywords: "自信、热情、社交魅力", meaning: "自信而有魅力，善于激励他人。", image: "👸" },
    { id: 35, name: "权杖国王", nameEn: "King of Wands", type: "wands", keywords: "领导力、远见、果断", meaning: "具有远见卓识的领导者，果断决策。", image: "🤴" },
    
    // 圣杯牌组 (14张)
    { id: 36, name: "圣杯王牌", nameEn: "Ace of Cups", type: "cups", keywords: "新情感、爱、直觉", meaning: "新的情感开始，爱与直觉的涌现。", image: "🌊" },
    { id: 37, name: "圣杯二", nameEn: "Two of Cups", type: "cups", keywords: "和谐、合作、深情连接", meaning: "和谐的关系，深厚的情感连接。", image: "💑" },
    { id: 38, name: "圣杯三", nameEn: "Three of Cups", type: "cups", keywords: "庆祝、社交、友谊", meaning: "与朋友庆祝，享受社交时光。", image: "🥂" },
    { id: 39, name: "圣杯四", nameEn: "Four of Cups", type: "cups", keywords: "沉思、不满、抽离", meaning: "对现状不满，需要重新审视内心。", image: "😔" },
    { id: 40, name: "圣杯五", nameEn: "Five of Cups", type: "cups", keywords: "失落、悲伤、失望", meaning: "经历失落，但仍需看到希望。", image: "😢" },
    { id: 41, name: "圣杯六", nameEn: "Six of Cups", type: "cups", keywords: "怀旧、治愈、童年记忆", meaning: "回忆过去，从记忆中寻找治愈。", image: "🌸" },
    { id: 42, name: "圣杯七", nameEn: "Seven of Cups", type: "cups", keywords: "选择、幻想、白日梦", meaning: "面临多种选择，需要分辨幻想与现实。", image: "🌈" },
    { id: 43, name: "圣杯八", nameEn: "Eight of Cups", type: "cups", keywords: "放弃、追寻更深意义", meaning: "放弃不再满足的事物，追寻更深意义。", image: "🚶" },
    { id: 44, name: "圣杯九", nameEn: "Nine of Cups", type: "cups", keywords: "愿望达成、满足、快乐", meaning: "愿望实现，感到满足和快乐。", image: "😊" },
    { id: 45, name: "圣杯十", nameEn: "Ten of Cups", type: "cups", keywords: "幸福、家庭和谐、情感圆满", meaning: "家庭幸福，情感圆满，和谐美满。", image: "🏠" },
    { id: 46, name: "圣杯侍从", nameEn: "Page of Cups", type: "cups", keywords: "敏感、梦想家、天真", meaning: "敏感而富有想象力，充满梦想。", image: "🐟" },
    { id: 47, name: "圣杯骑士", nameEn: "Knight of Cups", type: "cups", keywords: "浪漫、优雅、理想主义", meaning: "浪漫的追求者，优雅而理想化。", image: "🦄" },
    { id: 48, name: "圣杯皇后", nameEn: "Queen of Cups", type: "cups", keywords: "同情、直觉、治愈力", meaning: "富有同情心，直觉敏锐，善于治愈。", image: "🧜‍♀️" },
    { id: 49, name: "圣杯国王", nameEn: "King of Cups", type: "cups", keywords: "智慧、平衡、温和权威", meaning: "情感智慧，内心平衡，温和而有权威。", image: "🧜‍♂️" },
    
    // 宝剑牌组 (14张)
    { id: 50, name: "宝剑王牌", nameEn: "Ace of Swords", type: "swords", keywords: "突破、清晰、新想法", meaning: "思维突破，获得清晰的洞察力。", image: "⚔️" },
    { id: 51, name: "宝剑二", nameEn: "Two of Swords", type: "swords", keywords: "僵局、逃避、两难选择", meaning: "面临两难选择，需要做出决定。", image: "😶" },
    { id: 52, name: "宝剑三", nameEn: "Three of Swords", type: "swords", keywords: "心碎、分离、悲伤", meaning: "经历心痛，但这是治愈的开始。", image: "💔" },
    { id: 53, name: "宝剑四", nameEn: "Four of Swords", type: "swords", keywords: "休息、疗愈、暂停", meaning: "需要休息和恢复，暂停是为了更好地前进。", image: "🧘" },
    { id: 54, name: "宝剑五", nameEn: "Five of Swords", type: "swords", keywords: "冲突、争论、胜利代价", meaning: "冲突后的胜利，但付出了代价。", image: "🏴" },
    { id: 55, name: "宝剑六", nameEn: "Six of Swords", type: "swords", keywords: "过渡、离开、慢慢恢复", meaning: "离开困境，向更好的地方过渡。", image: "⛵" },
    { id: 56, name: "宝剑七", nameEn: "Seven of Swords", type: "swords", keywords: "策略、欺骗、暗中行动", meaning: "需要策略，但要小心欺骗。", image: "🦊" },
    { id: 57, name: "宝剑八", nameEn: "Eight of Swords", type: "swords", keywords: "束缚、无力感、被困", meaning: "感到被困，但束缚往往是自己设下的。", image: "🕸️" },
    { id: 58, name: "宝剑九", nameEn: "Nine of Swords", type: "swords", keywords: "噩梦、焦虑、恐惧", meaning: "被焦虑和恐惧困扰，需要面对内心。", image: "😰" },
    { id: 59, name: "宝剑十", nameEn: "Ten of Swords", type: "swords", keywords: "结束、痛苦、崩溃", meaning: "痛苦的结束，但也是新生的开始。", image: "🗡️" },
    { id: 60, name: "宝剑侍从", nameEn: "Page of Swords", type: "swords", keywords: "好奇、警觉、新消息", meaning: "充满好奇心，保持警觉，新消息将至。", image: "🗡️" },
    { id: 61, name: "宝剑骑士", nameEn: "Knight of Swords", type: "swords", keywords: "果断、理智、追求目标", meaning: "果断行动，理智追求目标。", image: "⚡" },
    { id: 62, name: "宝剑皇后", nameEn: "Queen of Swords", type: "swords", keywords: "清晰、公正、理智判断", meaning: "思维清晰，公正理智，判断准确。", image: "👁️" },
    { id: 63, name: "宝剑国王", nameEn: "King of Swords", type: "swords", keywords: "权威、理性、高标准", meaning: "理性权威，坚持高标准。", image: "👑" },
    
    // 星币牌组 (14张)
    { id: 64, name: "星币王牌", nameEn: "Ace of Pentacles", type: "pentacles", keywords: "新机会、财富、稳定", meaning: "新的物质机会，财富和稳定的基础。", image: "💰" },
    { id: 65, name: "星币二", nameEn: "Two of Pentacles", type: "pentacles", keywords: "平衡资源、灵活应对", meaning: "在多个事务间平衡，灵活应对变化。", image: "⚖️" },
    { id: 66, name: "星币三", nameEn: "Three of Pentacles", type: "pentacles", keywords: "合作、学习、团队成果", meaning: "团队合作，学习技能，共同创造。", image: "🏗️" },
    { id: 67, name: "星币四", nameEn: "Four of Pentacles", type: "pentacles", keywords: "稳定、储蓄、守护资源", meaning: "守护已有资源，保持稳定。", image: "🏦" },
    { id: 68, name: "星币五", nameEn: "Five of Pentacles", type: "pentacles", keywords: "困难、失落、孤立", meaning: "经历物质困难，但不要失去希望。", image: "🚪" },
    { id: 69, name: "星币六", nameEn: "Six of Pentacles", type: "pentacles", keywords: "慷慨、分享、公平交换", meaning: "慷慨分享，公平交换，施与受。", image: "🎁" },
    { id: 70, name: "星币七", nameEn: "Seven of Pentacles", type: "pentacles", keywords: "耐心等待、收获、成长", meaning: "耐心等待成果，评估进展。", image: "🌱" },
    { id: 71, name: "星币八", nameEn: "Eight of Pentacles", type: "pentacles", keywords: "技能、专注、质量", meaning: "专注提升技能，追求卓越品质。", image: "🔨" },
    { id: 72, name: "星币九", nameEn: "Nine of Pentacles", type: "pentacles", keywords: "独立、享受成果、自足", meaning: "享受独立和成果，自给自足。", image: "🦚" },
    { id: 73, name: "星币十", nameEn: "Ten of Pentacles", type: "pentacles", keywords: "家庭财富、传统、安全", meaning: "家庭财富和安全，传承传统。", image: "🏛️" },
    { id: 74, name: "星币侍从", nameEn: "Page of Pentacles", type: "pentacles", keywords: "勤奋、学习、务实", meaning: "勤奋学习，务实进取。", image: "📚" },
    { id: 75, name: "星币骑士", nameEn: "Knight of Pentacles", type: "pentacles", keywords: "稳健、耐心、可靠", meaning: "稳健可靠，耐心追求目标。", image: "🐢" },
    { id: 76, name: "星币皇后", nameEn: "Queen of Pentacles", type: "pentacles", keywords: "丰盛、滋养、务实关怀", meaning: "物质丰盛，滋养他人，务实关怀。", image: "🌳" },
    { id: 77, name: "星币国王", nameEn: "King of Pentacles", type: "pentacles", keywords: "成功、保障、慷慨", meaning: "物质成功，财务保障，慷慨大方。", image: "🦁" }
];

// 虚拟人物数据
const avatars = {
    qsh: {
        name: "秦始皇",
        title: "始皇帝",
        icon: "👑",
        style: "霸气、威严、果断",
        responses: [
            "六国可灭，何惧一难？",
            "天下大势，唯朕独断。",
            "车同轨，书同文，万事皆可统一。",
            "朕之江山，一寸不让。",
            "焚书坑儒，唯留真理。",
            "长城万里，始于足下。",
            "功过三皇，德兼五帝。",
            "横扫六合，气吞八荒。",
            "朕即天下，天下即朕。",
            "万世基业，始于今日。"
        ]
    },
    swk: {
        name: "孙悟空",
        title: "齐天大圣",
        icon: "🐵",
        style: "桀骜、机智、无畏",
        responses: [
            "俺老孙来也！怕个甚！",
            "皇帝轮流做，明年到我家！",
            "吃俺老孙一棒！",
            "俺乃齐天大圣孙悟空！",
            "妖怪，哪里逃！",
            "筋斗云，十万八千里！",
            "七十二变，变变变！",
            "师父莫怕，有俺老孙在！",
            "如来老儿，俺不服！",
            "大闹天宫，何惧小难？"
        ]
    },
    msk: {
        name: "马斯克",
        title: "科技狂人",
        icon: "🚀",
        style: "创新、直接、未来主义",
        responses: [
            "Let's make life multiplanetary.",
            "Failure is an option here.",
            "Persistence is very important.",
            "The future is bright.",
            "Innovate or die.",
            "Mars is the next step.",
            "Think different, act bold.",
            "AI is the future.",
            "Work hard every day.",
            "Dream big, start small."
        ]
    },
    lbd: {
        name: "李白",
        title: "诗仙",
        icon: "🍶",
        style: "豪放、浪漫、飘逸",
        responses: [
            "天生我材必有用！",
            "长风破浪会有时！",
            "人生得意须尽欢！",
            "仰天大笑出门去！",
            "举杯邀明月，对影成三人。",
            "飞流直下三千尺！",
            "安能摧眉折腰事权贵！",
            "抽刀断水水更流。",
            "两岸猿声啼不住。",
            "直挂云帆济沧海！"
        ]
    },
    zz: {
        name: "诸葛亮",
        title: "卧龙",
        icon: "🎋",
        style: "智慧、沉稳、谋略",
        responses: [
            "鞠躬尽瘁，死而后已。",
            "非淡泊无以明志。",
            "运筹帷幄，决胜千里。",
            "知己知彼，百战不殆。",
            "淡泊明志，宁静致远。",
            "欲思其利，必虑其害。",
            "大事起于难，小事起于易。",
            "志当存高远。",
            "静以修身，俭以养德。",
            "谋事在人，成事在天。"
        ]
    },
    lz: {
        name: "老子",
        title: "道家始祖",
        icon: "☯️",
        style: "深邃、无为、自然",
        responses: [
            "道法自然，无为而治。",
            "上善若水，水善利万物。",
            "知人者智，自知者明。",
            "千里之行，始于足下。",
            "祸兮福之所倚。",
            "大音希声，大象无形。",
            "知足者富，强行者有志。",
            "柔弱胜刚强。",
            "无为而无不为。",
            "道可道，非常道。"
        ]
    }
};

// 答案之书 - 88条智慧答案
const answerBookAnswers = [
    // 鼓励型 (20条)
    "放手去做，你已经准备好了。",
    "相信自己，你比想象中更强大。",
    "勇敢迈出第一步，剩下的路会自己展开。",
    "你的努力终将开花结果。",
    "不要害怕失败，它是成功的必经之路。",
    "坚持下去，胜利就在前方。",
    "你拥有改变一切的力量。",
    "相信自己的直觉，它不会骗你。",
    "每一次尝试都是进步。",
    "你的潜力远超你的想象。",
    "勇往直前，不要回头。",
    "你比你以为的更接近目标。",
    "相信过程，一切都会好起来。",
    "你的勇气会带你到达想去的地方。",
    "不要怀疑自己，你完全可以。",
    "现在就是最好的时机。",
    "你的努力不会被辜负。",
    "保持信心，奇迹即将发生。",
    "你已经走了这么远，不要放弃。",
    "相信自己，你值得最好的。",
    
    // 冷静型 (18条)
    "先停下来，答案会自然浮现。",
    "不要急于做决定，给自己一点时间。",
    "深呼吸，让心静下来。",
    "有时候等待比行动更明智。",
    "不要被情绪左右，冷静思考。",
    "暂时放下，换个角度看问题。",
    "给自己一些空间，答案会来。",
    "不要着急，最好的时机还未到。",
    "静下心来，听听内心的声音。",
    "有时候不行动就是最好的行动。",
    "让事情自然发展，不要强求。",
    "退一步，海阔天空。",
    "冷静下来，你会发现新的可能。",
    "给自己一点时间，不要着急。",
    "放下执念，答案自现。",
    "有时候沉默比言语更有力量。",
    "让心休息一会儿。",
    "不要强迫，顺其自然。",
    
    // 行动型 (18条)
    "迈出一小步，比完美计划更重要。",
    "现在就去做，不要等待。",
    "行动是治愈焦虑的良药。",
    "开始比完美更重要。",
    "不要只是想想，去实践。",
    "小步快跑，胜过原地踏步。",
    "做就是了，不要犹豫。",
    "行动胜过千言万语。",
    "今天就开始，不要等到明天。",
    "先做起来，边做边调整。",
    "不要等待机会，创造机会。",
    "动起来，答案在路上。",
    "实践出真知。",
    "去做你害怕的事。",
    "行动是最好的答案。",
    "不要拖延，现在就动手。",
    "从小事做起，积少成多。",
    "迈出第一步，剩下的会跟随。",
    
    // 反思型 (16条)
    "问问自己：什么让你真正快乐？",
    "回顾过去，你会找到答案。",
    "问问自己，这真的是你想要的吗？",
    "有时候答案就在你忽略的地方。",
    "向内看，你会找到方向。",
    "问问自己：五年后你会怎么看这件事？",
    "答案就在你心中，只是你没发现。",
    "回顾你的初心。",
    "问问自己：最坏的结果是什么？",
    "有时候问题本身就是答案。",
    "静下心来，答案自会浮现。",
    "问问自己：你在逃避什么？",
    "回顾过去的选择，它们教会了你什么？",
    "有时候放下比坚持更需要勇气。",
    "问问自己：如果不会失败，你会怎么做？",
    "答案往往藏在问题背后。",
    
    // 幽默/轻松型 (16条)
    "周末的咖啡店会有惊喜。",
    "吃顿好的，事情会明朗。",
    "睡一觉，明天再说。",
    "去散步，灵感会来找你。",
    "喝杯茶，放松一下吧。",
    "也许你需要一个假期。",
    "问问你信任的朋友。",
    "去大自然走走，答案在风中。",
    "听首歌，让心情好起来。",
    "也许答案就在你的梦里。",
    "去运动一下，头脑会更清醒。",
    "洗个热水澡，灵感会涌现。",
    "看看窗外的风景。",
    "也许你需要一只猫。",
    "去吃点甜的，心情会好。",
    "答案可能就在下一页书里。"
];
