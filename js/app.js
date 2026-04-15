// 应用主逻辑 - 星空主题增强版

// 页面导航 - 带星空过渡效果
function navigateTo(page) {
    const currentPage = document.querySelector('.page.active');
    const targetPage = document.getElementById(page + '-page');
    
    if (currentPage && targetPage) {
        // 淡出当前页面
        currentPage.style.opacity = '0';
        currentPage.style.transform = 'scale(0.98)';
        
        setTimeout(() => {
            currentPage.classList.remove('active');
            currentPage.style.opacity = '';
            currentPage.style.transform = '';
            
            // 显示目标页面
            targetPage.classList.add('active');
            targetPage.style.opacity = '0';
            targetPage.style.transform = 'scale(1.02)';
            
            // 触发进入动画
            setTimeout(() => {
                targetPage.style.transition = 'all 0.6s ease';
                targetPage.style.opacity = '1';
                targetPage.style.transform = 'scale(1)';
                
                setTimeout(() => {
                    targetPage.style.transition = '';
                    targetPage.style.transform = '';
                    
                    // 如果是毛选页面，初始化引导页
                    if (page === 'maoxuan') {
                        resetMaoxuanGuide();
                    }
                }, 600);
            }, 50);
        }, 300);
    }
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ==================== 星空特效系统（由 themes.js 管理） ====================

// 创建流星（themes.js 调用）
function createShootingStar() {
    const star = document.createElement('div');
    star.className = 'shooting-star';
    const startX = Math.random() * window.innerWidth + 200;
    const startY = Math.random() * window.innerHeight * 0.3 - 100;
    star.style.left = startX + 'px';
    star.style.top = startY + 'px';
    document.body.appendChild(star);
    setTimeout(() => star.remove(), 3000);
}

// 创建漂浮粒子（themes.js 调用）
function createFloatingParticle() {
    const particle = document.createElement('div');
    particle.className = 'floating-particle';
    const x = Math.random() * window.innerWidth;
    const y = Math.random() * window.innerHeight;
    const size = Math.random() * 4 + 2;
    const duration = Math.random() * 4 + 6;
    particle.style.left = x + 'px';
    particle.style.top = y + 'px';
    particle.style.width = size + 'px';
    particle.style.height = size + 'px';
    particle.style.animationDuration = duration + 's';
    document.body.appendChild(particle);
    setTimeout(() => particle.remove(), duration * 1000);
}

// 鼠标粒子系统已移至 themes.js

// ==================== 智慧语录模块 - 星空古籍风 ====================

let currentQuoteIndex = -1;
let guide1Timer = null;
let guide2Timer = null;

// 初始化引导页1
function initGuide1() {
    const lines = document.querySelectorAll('#maoxuan-guide-1 .guide-line');
    const btn = document.getElementById('guide-btn-1');
    
    // 重置状态
    lines.forEach(line => line.classList.remove('visible'));
    btn.style.opacity = '0';
    btn.style.pointerEvents = 'none';
    
    // 依次显示文字
    lines.forEach((line, index) => {
        const delay = parseInt(line.dataset.delay) || (index * 400);
        
        guide1Timer = setTimeout(() => {
            line.classList.add('visible');
            
            // 最后一个文字显示后，显示按钮
            if (index === lines.length - 1) {
                setTimeout(() => {
                    btn.style.opacity = '1';
                    btn.style.pointerEvents = 'auto';
                    btn.style.transition = 'all 0.5s ease';
                }, 300);
            }
        }, delay);
    });
}

// 显示引导页2
function showGuide2() {
    // 清除引导页1的定时器
    if (guide1Timer) {
        clearTimeout(guide1Timer);
    }
    
    const guide1 = document.getElementById('maoxuan-guide-1');
    const guide2 = document.getElementById('maoxuan-guide-2');
    
    guide1.style.opacity = '0';
    guide1.style.transition = 'opacity 0.4s ease';
    
    setTimeout(() => {
        guide1.classList.add('hidden');
        guide2.classList.remove('hidden');
        guide2.style.opacity = '0';
        
        setTimeout(() => {
            guide2.style.opacity = '1';
            guide2.style.transition = 'opacity 0.4s ease';
            initGuide2();
        }, 50);
    }, 400);
}

// 初始化引导页2
function initGuide2() {
    const lines = document.querySelectorAll('#maoxuan-guide-2 .guide-line');
    const btn = document.getElementById('guide-btn-2');
    
    // 重置状态
    lines.forEach(line => line.classList.remove('visible'));
    btn.style.opacity = '0';
    btn.style.pointerEvents = 'none';
    
    // 依次显示文字
    lines.forEach((line, index) => {
        const delay = parseInt(line.dataset.delay) || (index * 500);
        
        guide2Timer = setTimeout(() => {
            line.classList.add('visible');
            
            // 最后一个文字显示后，显示按钮
            if (index === lines.length - 1) {
                setTimeout(() => {
                    btn.style.opacity = '1';
                    btn.style.pointerEvents = 'auto';
                    btn.style.transition = 'all 0.5s ease';
                }, 300);
            }
        }, delay);
    });
}

// 显示卡牌区域
function showCardSection() {
    // 清除引导页2的定时器
    if (guide2Timer) {
        clearTimeout(guide2Timer);
    }
    
    const guide2 = document.getElementById('maoxuan-guide-2');
    const main = document.getElementById('maoxuan-main');
    
    guide2.style.opacity = '0';
    guide2.style.transition = 'opacity 0.4s ease';
    
    setTimeout(() => {
        guide2.classList.add('hidden');
        main.classList.remove('hidden');
        main.style.opacity = '0';
        main.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            main.style.opacity = '1';
            main.style.transform = 'translateY(0)';
            main.style.transition = 'all 0.5s ease';
        }, 50);
    }, 400);
}

// 重置毛选模块到引导页1
function resetMaoxuanGuide() {
    // 清除所有定时器
    if (guide1Timer) clearTimeout(guide1Timer);
    if (guide2Timer) clearTimeout(guide2Timer);
    
    // 重置所有区域
    document.getElementById('maoxuan-guide-1').classList.remove('hidden');
    document.getElementById('maoxuan-guide-1').style.opacity = '1';
    document.getElementById('maoxuan-guide-2').classList.add('hidden');
    document.getElementById('maoxuan-main').classList.add('hidden');
    
    // 重置卡牌
    const cardContainer = document.getElementById('card-container');
    const quoteCard = document.getElementById('quote-card');
    cardContainer.style.transition = 'none';
    cardContainer.classList.remove('flipped');
    quoteCard.classList.add('hidden');
    // 重新启用 transition
    setTimeout(() => { cardContainer.style.transition = ''; }, 50);
    
    // 重新开始引导页1
    initGuide1();
}

function drawCard() {
    const cardContainer = document.getElementById('card-container');
    const quoteCard = document.getElementById('quote-card');
    const quoteText = document.getElementById('quote-text');
    const quoteSource = document.getElementById('quote-source');
    
    // 如果已经翻转，先翻回去再换牌
    if (cardContainer.classList.contains('flipped')) {
        cardContainer.classList.remove('flipped');
        setTimeout(() => {
            performDraw(cardContainer, quoteCard, quoteText, quoteSource);
        }, 900);
    } else {
        performDraw(cardContainer, quoteCard, quoteText, quoteSource);
    }
}

function performDraw(cardContainer, quoteCard, quoteText, quoteSource) {
    // 先隐藏正面内容（用visibility，保持3D结构不变）
    quoteCard.classList.add('hidden');
    
    // 随机选择一条语录（避免连续重复）
    let newIndex;
    do {
        newIndex = Math.floor(Math.random() * maoQuotes.length);
    } while (newIndex === currentQuoteIndex && maoQuotes.length > 1);
    
    currentQuoteIndex = newIndex;
    const quote = maoQuotes[newIndex];
    
    // 设置内容
    quoteText.innerHTML = `
        <p class="quote-main">${quote.text}</p>
        <p class="quote-meaning">${quote.meaning}</p>
    `;
    quoteSource.textContent = `—— ${quote.source}`;
    
    // 显示正面内容（去掉hidden，让翻转后正面可见）
    quoteCard.classList.remove('hidden');
    
    // 添加星光特效
    createCardSparkles(cardContainer);
    
    // 翻转卡片
    requestAnimationFrame(() => {
        cardContainer.classList.add('flipped');
    });
    
    // 文字逐行显示动画
    setTimeout(() => {
        animateTextReveal();
    }, 800);
}

// 卡片星光特效
function createCardSparkles(element) {
    const rect = element.getBoundingClientRect();
    for (let i = 0; i < 8; i++) {
        setTimeout(() => {
            const sparkle = document.createElement('div');
            sparkle.style.cssText = `
                position: fixed;
                width: ${Math.random() * 6 + 3}px;
                height: ${Math.random() * 6 + 3}px;
                background: radial-gradient(circle, rgba(255, 215, 0, 0.9), transparent);
                border-radius: 50%;
                pointer-events: none;
                z-index: 100;
                left: ${rect.left + Math.random() * rect.width}px;
                top: ${rect.top + Math.random() * rect.height}px;
                box-shadow: 0 0 10px rgba(255, 215, 0, 0.8);
                animation: sparkleBurst 0.6s ease forwards;
            `;
            document.body.appendChild(sparkle);
            setTimeout(() => sparkle.remove(), 600);
        }, i * 50);
    }
}

const burstStyle = document.createElement('style');
burstStyle.textContent = `
    @keyframes sparkleBurst {
        0% { transform: scale(0) rotate(0deg); opacity: 1; }
        50% { transform: scale(1.5) rotate(180deg); opacity: 0.8; }
        100% { transform: scale(0) rotate(360deg); opacity: 0; }
    }
`;
document.head.appendChild(burstStyle);

function animateTextReveal() {
    const mainText = document.querySelector('.quote-main');
    const meaningText = document.querySelector('.quote-meaning');
    
    if (mainText) {
        mainText.style.opacity = '0';
        mainText.style.transform = 'translateY(20px)';
        mainText.style.transition = 'all 0.8s ease';
        
        setTimeout(() => {
            mainText.style.opacity = '1';
            mainText.style.transform = 'translateY(0)';
        }, 100);
    }
    
    if (meaningText) {
        meaningText.style.opacity = '0';
        meaningText.style.transform = 'translateY(20px)';
        meaningText.style.transition = 'all 0.8s ease 0.3s';
        
        setTimeout(() => {
            meaningText.style.opacity = '1';
            meaningText.style.transform = 'translateY(0)';
        }, 400);
    }
}

// ==================== 答案之书模块 - 神秘古籍风 ====================

let currentAnswerIndex = -1;

function openAnswerBook() {
    const page = document.getElementById('answerbook-page');
    const book = document.getElementById('magic-book');
    const answerDisplay = document.getElementById('answer-display');
    const answerText = document.getElementById('answer-text');
    const bookHint = page.querySelector('.book-hint');
    const intro = document.getElementById('answerbook-intro');
    
    // 防重复点击
    book.onclick = null;
    
    // 随机选择答案（避免连续重复）
    let newIndex;
    do {
        newIndex = Math.floor(Math.random() * answerBookAnswers.length);
    } while (newIndex === currentAnswerIndex && answerBookAnswers.length > 1);
    currentAnswerIndex = newIndex;
    answerText.textContent = answerBookAnswers[newIndex];
    
    // 第一步：书本翻开 + 引导文字淡出
    book.classList.add('opened');
    if (bookHint) bookHint.style.opacity = '0';
    if (intro) {
        intro.style.transition = 'opacity 0.4s ease';
        intro.style.opacity = '0';
    }
    
    // 第二步：600ms后，隐藏书本，显示答案
    setTimeout(() => {
        book.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
        book.style.opacity = '0';
        book.style.transform = 'scale(0.85)';
        
        setTimeout(() => {
            book.style.display = 'none';
            if (intro) intro.style.display = 'none';
            
            // 显示答案
            answerDisplay.classList.remove('hidden');
            answerDisplay.style.opacity = '0';
            answerDisplay.style.transition = 'opacity 0.6s ease';
            setTimeout(() => {
                answerDisplay.style.opacity = '1';
                createBookSparkles(answerDisplay);
            }, 30);
        }, 400);
    }, 600);
}

function createBookSparkles(book) {
    const rect = book.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    for (let i = 0; i < 12; i++) {
        setTimeout(() => {
            const sparkle = document.createElement('div');
            const angle = (Math.PI * 2 * i) / 12;
            const distance = 80 + Math.random() * 60;
            const x = centerX + Math.cos(angle) * distance;
            const y = centerY + Math.sin(angle) * distance;
            
            sparkle.style.cssText = `
                position: fixed;
                left: ${x}px;
                top: ${y}px;
                width: ${4 + Math.random() * 4}px;
                height: ${4 + Math.random() * 4}px;
                background: radial-gradient(circle, rgba(255, 215, 0, 0.9), transparent);
                border-radius: 50%;
                pointer-events: none;
                z-index: 10000;
                animation: bookSparkle 1s ease forwards;
            `;
            document.body.appendChild(sparkle);
            setTimeout(() => sparkle.remove(), 1000);
        }, i * 50);
    }
}

// 添加书本星光动画样式
const bookSparkleStyle = document.createElement('style');
bookSparkleStyle.textContent = `
    @keyframes bookSparkle {
        0% { transform: scale(0) rotate(0deg); opacity: 1; }
        50% { transform: scale(1.5) rotate(180deg); opacity: 0.8; }
        100% { transform: scale(0) rotate(360deg); opacity: 0; }
    }
`;
document.head.appendChild(bookSparkleStyle);

function resetAnswerBook() {
    const page = document.getElementById('answerbook-page');
    const book = document.getElementById('magic-book');
    const answerDisplay = document.getElementById('answer-display');
    const bookHint = page.querySelector('.book-hint');
    const intro = document.getElementById('answerbook-intro');
    
    // 隐藏答案
    answerDisplay.style.opacity = '0';
    setTimeout(() => {
        answerDisplay.classList.add('hidden');
        answerDisplay.style.opacity = '';
        answerDisplay.style.transition = '';
        
        // 恢复书本
        book.style.display = '';
        book.style.opacity = '0';
        book.style.transform = 'scale(0.85)';
        book.classList.remove('opened');
        
        // 恢复引导文字
        if (intro) {
            intro.style.display = '';
            intro.style.opacity = '0';
        }
        
        // 淡入书本
        setTimeout(() => {
            book.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            book.style.opacity = '1';
            book.style.transform = 'scale(1)';
            if (bookHint) {
                bookHint.style.opacity = '0.8';
            }
            if (intro) {
                intro.style.transition = 'opacity 0.5s ease';
                intro.style.opacity = '1';
            }
            
            // 恢复点击事件
            setTimeout(() => {
                book.style.transition = '';
                book.onclick = openAnswerBook;
            }, 500);
        }, 50);
    }, 400);
}

// ==================== 塔罗牌模块 - 星空神秘风 ====================

let tarotStep = 0;
let selectedCards = [];

function startTarotReading() {
    const intro = document.getElementById('tarot-intro');
    const reading = document.getElementById('tarot-reading');
    
    // 淡出intro
    intro.style.opacity = '0';
    intro.style.transform = 'translateY(-30px)';
    intro.style.transition = 'all 0.5s ease';
    
    setTimeout(() => {
        intro.classList.add('hidden');
        reading.classList.remove('hidden');
        
        // 淡入reading
        reading.style.opacity = '0';
        reading.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            reading.style.transition = 'all 0.6s ease';
            reading.style.opacity = '1';
            reading.style.transform = 'translateY(0)';
            
            setTimeout(() => {
                reading.style.transition = '';
                reading.style.transform = '';
            }, 600);
            
            resetTarotState();
        }, 50);
    }, 500);
}

function resetTarotState() {
    tarotStep = 0;
    selectedCards = [];
    
    // 重置步骤指示器
    document.querySelectorAll('.step').forEach((step, index) => {
        step.classList.toggle('active', index === 0);
    });
    
    // 重置显示
    const cardSelection = document.getElementById('card-selection');
    cardSelection.classList.remove('hidden');
    cardSelection.style.display = '';
    cardSelection.style.opacity = '';
    cardSelection.style.transition = '';
    cardSelection.style.visibility = '';
    cardSelection.style.position = '';
    cardSelection.style.pointerEvents = 'auto';
    
    document.getElementById('spread-display').classList.add('hidden');
    document.getElementById('reading-result').classList.add('hidden');
    
    // 重置牌位
    ['past-card', 'present-card', 'future-card'].forEach(id => {
        const card = document.getElementById(id);
        card.querySelector('.card-slot').innerHTML = '';
        card.querySelector('.card-meaning').innerHTML = '';
    });
    
    // 重置牌组动画状态
    document.querySelectorAll('.tarot-deck').forEach(deck => {
        deck.classList.remove('selected');
        deck.style.filter = '';
    });
    
    updateStepInstruction();
}

function updateStepInstruction() {
    const instructions = [
        "深呼吸，在心中默念你的问题...",
        "保持专注，感受第二张牌的指引...",
        "最后一张牌，揭示未来的方向..."
    ];
    const instructionEl = document.getElementById('step-instruction');
    
    // 文字淡出淡入效果
    instructionEl.style.opacity = '0';
    instructionEl.style.transform = 'translateY(-10px)';
    
    setTimeout(() => {
        instructionEl.textContent = instructions[tarotStep];
        instructionEl.style.transition = 'all 0.4s ease';
        instructionEl.style.opacity = '1';
        instructionEl.style.transform = 'translateY(0)';
    }, 200);
}

function selectCard(deckIndex) {
    if (tarotStep >= 3) return;
    
    // 随机选择一张牌
    let cardIndex;
    do {
        cardIndex = Math.floor(Math.random() * tarotCards.length);
    } while (selectedCards.some(c => c.id === tarotCards[cardIndex].id));
    
    const card = tarotCards[cardIndex];
    const isReversed = Math.random() > 0.7; // 30%概率逆位
    
    selectedCards.push({ ...card, isReversed });
    
    // 动画效果
    const decks = document.querySelectorAll('.tarot-deck');
    const selectedDeck = decks[deckIndex];
    
    // 添加光效和星光
    selectedDeck.style.filter = 'drop-shadow(0 0 40px rgba(147, 112, 219, 1))';
    createCardSparkles(selectedDeck);
    selectedDeck.classList.add('selected');
    
    setTimeout(() => {
        tarotStep++;
        
        // 更新步骤指示器
        document.querySelectorAll('.step').forEach((step, index) => {
            step.classList.toggle('active', index < tarotStep);
        });
        
        if (tarotStep >= 3) {
            setTimeout(showSpreadResult, 600);
        } else {
            updateStepInstruction();
            // 重置选中状态
            setTimeout(() => {
                selectedDeck.classList.remove('selected');
                selectedDeck.style.filter = '';
            }, 500);
        }
    }, 800);
}

function showSpreadResult() {
    const cardSelection = document.getElementById('card-selection');
    const spreadDisplay = document.getElementById('spread-display');
    const readingResult = document.getElementById('reading-result');
    
    // 淡出选择区
    cardSelection.style.transition = 'opacity 0.4s ease';
    cardSelection.style.opacity = '0';
    
    setTimeout(() => {
        // 直接隐藏，不占空间
        cardSelection.style.display = 'none';
        cardSelection.classList.add('hidden');
        cardSelection.style.opacity = '';
        cardSelection.style.transition = '';
        
        // 显示牌阵
        spreadDisplay.classList.remove('hidden');
        readingResult.classList.remove('hidden');
        
        const positions = ['past-card', 'present-card', 'future-card'];
        const positionNames = ['过去', '现在', '未来'];
        
        selectedCards.forEach((card, index) => {
            const cardSlot = document.getElementById(positions[index]);
            const slot = cardSlot.querySelector('.card-slot');
            const meaning = cardSlot.querySelector('.card-meaning');
            
            // 显示牌 - 带光效
            slot.innerHTML = `
                <div class="tarot-card ${card.isReversed ? 'reversed' : ''}">
                    <div class="card-image">${card.image}</div>
                    <div class="card-name">${card.name}</div>
                    <div class="card-position">${card.isReversed ? '逆位' : '正位'}</div>
                </div>
            `;
            
            // 使用深度解读文本
            const readingText = card.reading ? 
                (card.isReversed ? card.reading.reversed : card.reading.upright) :
                (card.isReversed ? 
                    `挑战与阻碍：${card.keywords}。这张牌逆位出现，提示你需要注意这方面的挑战。` :
                    `积极能量：${card.keywords}。${card.meaning}`);
            
            meaning.innerHTML = `
                <p class="position-title">${positionNames[index]}的影响</p>
                <p class="meaning-text">${readingText}</p>
            `;
        });
        
        // 生成综合解读
        generateInterpretation();
        
        // 滚动到结果
        setTimeout(() => {
            readingResult.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 1000);
    }, 500);
}

function generateInterpretation() {
    const past = selectedCards[0];
    const present = selectedCards[1];
    const future = selectedCards[2];
    
    let interpretation = '';
    
    // 过去部分 - 深度解读
    const pastReading = past.reading ? 
        (past.isReversed ? past.reading.reversed : past.reading.upright) : '';
    interpretation += `<div class="interp-section">
        <h4>✦ 过去的回响 · ${past.name}${past.isReversed ? '（逆位）' : ''}</h4>
        <p>${pastReading || `「${past.name}」出现在过去的位置，揭示了塑造你当下状态的深层原因。${past.isReversed ? '你经历过的那些挑战并非白费，它们是你身上最坚硬的盔甲。' : '过去的积累正在发挥作用，你比自己以为的准备得更充分。'}`}</p>
    </div>`;
    
    // 现在部分 - 深度解读
    const presentReading = present.reading ? 
        (present.isReversed ? present.reading.reversed : present.reading.upright) : '';
    interpretation += `<div class="interp-section">
        <h4>✦ 此刻的镜像 · ${present.name}${present.isReversed ? '（逆位）' : ''}</h4>
        <p>${presentReading || `「${present.name}」映照出你当前真实的状态。${present.meaning}`}</p>
    </div>`;
    
    // 未来部分 - 深度解读
    const futureReading = future.reading ? 
        (future.isReversed ? future.reading.reversed : future.reading.upright) : '';
    interpretation += `<div class="interp-section">
        <h4>✦ 前方的暗示 · ${future.name}${future.isReversed ? '（逆位）' : ''}</h4>
        <p>${futureReading || `「${future.name}」为你的前路点亮了一盏灯。${future.isReversed ? '路上有需要留意的暗礁，但它不会击沉你。' : '前方的能量是积极的，你走在对的方向上。'}`}</p>
    </div>`;
    
    // 三牌联动总结
    interpretation += `<div class="interp-section advice">
        <h4>✦ 三张牌想对你说的话</h4>
        <p>${generateLinkedAdvice(past, present, future)}</p>
    </div>`;
    
    document.getElementById('interpretation').innerHTML = interpretation;
}

// 根据三张牌的组合生成有深度的联动建议
function generateLinkedAdvice(past, present, future) {
    const reversedCount = [past, present, future].filter(c => c.isReversed).length;
    
    // 判断牌组类型倾向（以大阿尔卡纳和小阿尔卡纳的组合来分析）
    const majorCount = [past, present, future].filter(c => c.type === 'major').length;
    const cupsCount = [past, present, future].filter(c => c.type === 'cups').length;
    const swordsCount = [past, present, future].filter(c => c.type === 'swords').length;
    const wandsCount = [past, present, future].filter(c => c.type === 'wands').length;
    const pentCount = [past, present, future].filter(c => c.type === 'pentacles').length;
    
    let advice = '';
    
    if (reversedCount >= 2) {
        advice += `这组牌里有不少逆位，说明你目前正处在一个需要"向内看"的阶段。外在的推动力暂时不大，但这恰恰是重新审视自己的好时机。不要急着往前冲——先把内心理顺了，路会自然清晰。`;
    } else if (reversedCount === 0) {
        advice += `三张牌都是正位，能量非常通畅。你当前的方向是对的，宇宙在给你green light。不要犹豫了，顺着这股势头往前走。`;
    } else {
        advice += `正逆交替出现，说明你的生活正处在一个转变的节点上——有些旧模式在松动，新的可能性在萌芽。`;
    }
    
    if (cupsCount >= 2) {
        advice += `牌面中情感能量很强——你当前最核心的议题和"感情""关系""内心感受"有关。先照顾好你的心，再去处理外在的事。`;
    } else if (swordsCount >= 2) {
        advice += `思维的力量在这组牌中很突出——你需要用理性来穿越迷雾。但别过度思考，想清楚70%就可以行动了。`;
    } else if (wandsCount >= 2) {
        advice += `这组牌充满了行动的能量——你的热情和创造力正在被激活。现在不是计划的时候，是行动的时候。`;
    } else if (pentCount >= 2) {
        advice += `物质层面的议题是你当前的重点——可能关于工作、金钱、健康或生活的实际安排。踏实做好眼前的事，其他的会跟着好起来。`;
    }
    
    if (majorCount >= 2) {
        advice += `<br><br>值得注意的是，大阿尔卡纳牌出现了 ${majorCount} 张——这意味着你当前面对的不是日常琐事，而是人生中一个比较重要的转折。认真对待这段时期。`;
    }
    
    advice += `<br><br>记住：塔罗牌不是预言，它是一面镜子——照出的是你内心已经知道但尚未承认的东西。`;
    
    return advice;
}

function resetTarot() {
    resetTarotState();
}

// ==================== 名人对话模块 - 星空对话风 ====================

let currentAvatar = null;

function selectAvatar(avatarId) {
    currentAvatar = avatars[avatarId];
    
    const avatarSelection = document.querySelector('.avatar-selection');
    const chatInterface = document.getElementById('chat-interface');
    
    // 淡出选择区
    avatarSelection.style.opacity = '0';
    avatarSelection.style.transform = 'scale(0.95)';
    avatarSelection.style.transition = 'all 0.4s ease';
    
    setTimeout(() => {
        avatarSelection.classList.add('hidden');
        
        // 更新聊天界面
        document.getElementById('current-avatar').innerHTML = currentAvatar.icon;
        document.getElementById('avatar-name').textContent = currentAvatar.name;
        
        // 显示聊天界面
        chatInterface.classList.remove('hidden');
        
        // 清空聊天记录
        const messagesContainer = document.getElementById('chat-messages');
        messagesContainer.innerHTML = `
            <div class="message system">
                <p>你选择了与${currentAvatar.name}对话。把你的困惑说出来，ta会用自己的方式回应你。</p>
            </div>
        `;
        
        // 添加开场白
        setTimeout(() => {
            addAvatarMessage(getRandomGreeting());
        }, 500);
        
        // 滚动到底部
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }, 400);
}

function addAvatarMessage(text) {
    const messagesContainer = document.getElementById('chat-messages');
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message avatar';
    messageDiv.innerHTML = `
        <div class="avatar-bubble">
            <span class="avatar-icon">${currentAvatar.icon}</span>
            <p>${text}</p>
        </div>
    `;
    messagesContainer.appendChild(messageDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

// 根据用户输入和人物视角生成回复
function generateAvatarResponse(userMessage) {
    if (!currentAvatar || !currentAvatar.persona) return getRandomGreeting();
    
    const persona = currentAvatar.persona;
    const msg = userMessage.toLowerCase();
    
    // 关键词情感分析
    const isAboutLove = /爱|感情|喜欢|分手|恋|对象|暧昧|另一半|相亲|单身|表白|暗恋|关系/.test(msg);
    const isAboutWork = /工作|上班|辞职|跳槽|升职|老板|同事|加班|职业|事业|项目|薪|累|打工/.test(msg);
    const isAboutConfusion = /迷茫|不知道|方向|意义|活着|未来|选择|纠结|犹豫|怎么办|该不该/.test(msg);
    const isAboutFear = /害怕|恐惧|不敢|怕|焦虑|紧张|压力|失眠|担心|慌/.test(msg);
    const isAboutFailure = /失败|做不到|不行|放弃|不够好|垃圾|废|没用|差劲|挫折|输/.test(msg);
    const isAboutRelationship = /朋友|父母|家人|亲人|社交|孤独|不理解|没人|合不来|吵架/.test(msg);
    const isAboutMoney = /钱|穷|经济|房|贷|没钱|赚|收入|存款/.test(msg);
    const isAboutGrowth = /成长|变强|提升|学习|进步|努力|坚持|自律/.test(msg);
    
    // 根据人物世界观 + 用户话题生成回复
    const name = currentAvatar.name;
    const templates = [];
    
    if (isAboutLove) {
        templates.push(...getLoveResponses(name, persona));
    }
    if (isAboutWork) {
        templates.push(...getWorkResponses(name, persona));
    }
    if (isAboutConfusion) {
        templates.push(...getConfusionResponses(name, persona));
    }
    if (isAboutFear) {
        templates.push(...getFearResponses(name, persona));
    }
    if (isAboutFailure) {
        templates.push(...getFailureResponses(name, persona));
    }
    if (isAboutRelationship) {
        templates.push(...getRelationshipResponses(name, persona));
    }
    if (isAboutMoney) {
        templates.push(...getMoneyResponses(name, persona));
    }
    if (isAboutGrowth) {
        templates.push(...getGrowthResponses(name, persona));
    }
    
    // 如果没有匹配到特定话题，使用通用回复
    if (templates.length === 0) {
        templates.push(...getGeneralResponses(name, persona));
    }
    
    return templates[Math.floor(Math.random() * templates.length)];
}

// ===== 根据不同人物生成各话题回复 =====

function getLoveResponses(name, persona) {
    const map = {
        '秦始皇': [
            "感情之事，朕不擅长。但朕知道一件事——你不可能靠讨好得到真心。你是什么样的人，就会吸引什么样的人。先把自己活明白了。",
            "你问朕爱不爱？朕统一了天下，却统一不了一个人的心。所以朕劝你：你能争取的就争取，争取不到的就放手——感情这东西，强求来的不叫爱。",
            "你为一个人犹豫？朕灭六国也没犹豫过。如果你连出手的勇气都没有，怎么知道结果？先说，再看反应。不丢人的。"
        ],
        '孙悟空': [
            "嘿！情情爱爱的俺不太懂。不过俺告诉你——俺师父是天下最啰嗦的人，但俺还是跟了他走完了西天路。真正在乎的人，不是完美的，是你愿意一直陪着的。",
            "你说那人不在乎你？那你在乎他干嘛！俺当年也是——天上地下谁不嫌弃俺？但师父没有。找对了人，你不需要变成别人，做你自己就够了。",
            "你是不是太黏糊了？俺跟你说，情这东西就像金箍棒——握太紧手疼，放太松掉地上。轻轻放在心里就行，别天天拿出来看。"
        ],
        '马斯克': [
            "爱情和创业有一个相似之处：你不能总在分析到底行不行，你得先试。如果不行，迭代。如果还不行，有可能不是你的问题——是匹配度的问题。",
            "你在感情里没有安全感？那是因为你把快乐的来源放在了另一个人身上。这在工程学上叫'单点故障'——非常危险。先让自己成为一个完整的系统。",
            "说白了：如果一个人让你花80%的精力去焦虑而只有20%的时间快乐——这个ROI太差了。你值得更好的。"
        ],
        '李白': [
            "你为情所困？来来来，喝一杯再说。我这一生最爱两样——酒与月亮。人嘛，可遇不可求。你越追，它越跑。你自己活得璀璨了，想要的人自会循着光来。",
            "你说心里放不下？'抽刀断水水更流，举杯消愁愁更愁'——放不下就不放。带着它继续走，走着走着你就会发现，它自己变轻了。",
            "所谓知己，'莫愁前路无知己，天下谁人不识君'——你不是没人爱，你是还没遇到那个懂你的人。别着急，该来的，迟早会来。"
        ],
        '诸葛亮': [
            "感情之事，亮不便多言。但有一条与谋略相通——知己知彼。你真的了解对方吗？还是你爱的只是你想象中的那个人？先看清楚，再做决定。",
            "你问该不该坚持？亮以为，感情如棋局——你进三步退两步是策略，但如果你一直只在退……那也许这盘棋不值得再下了。",
            "在感情中，最容易犯的错是'自以为了解对方'。亮当年用兵，最重要的不是自己有多聪明，而是能准确判断对方在想什么。对感情也一样。"
        ],
        '老子': [
            "你越想抓住爱，爱就越从指缝间溜走。'上善若水'——水不形，却能入万物。感情也是。放松一些，让它自然流淌。",
            "你问什么是好的感情？不必惊天动地。两个人在一起，安安静静的，像两棵树——各自生长，却共享阳光。",
            "你在感情里受伤了？'祸兮福之所倚'——这段痛苦正在教你一些以前不知道的东西。等你学会了，痛就不会白受。"
        ],
        '鲁迅': [
            "你在一段感情里委曲求全？我看你不是在谈恋爱，你是在演一出自我牺牲的悲剧——而且还觉得自己很伟大。醒醒，不对等的感情不叫爱，叫自虐。",
            "你说你放不下那个人？你放不下的不是那个人——你放不下的是你为那个人付出的那些东西。这不叫爱，叫沉没成本。",
        ],
        '王阳明': [
            "你在感情中患得患失？那是因为你的心还不够定。你把快乐和安全感都寄托在另一个人身上——而一个不稳定的心，怎么可能建立稳定的关系？先把自己的心安住。",
            "你说你爱他，但每天都在猜他的想法、分析他的行为？这不是爱，这是焦虑。爱一个人，从'诚意'开始——先对自己坦诚，你到底要什么。",
        ],
        '苏轼': [
            "你失恋了？来来来，我给你讲个事——我和亡妻王弗分别十年后，一天夜里梦到她在家里梳头。醒来后我写了一首词，哭了一夜。但第二天太阳出来了，我又去买菜了。人生就是这样——你可以悲伤，但别忘了吃饭。",
            "你在纠结要不要表白？你知道我最遗憾什么吗？不是被贬，不是坐牢——是有些话没在该说的时候说出口。所以我劝你——趁人还在，说了吧。",
        ],
        '武则天': [
            "你因为一个人失魂落魄？在我看来，任何让你失去自我的感情都不值得。我这一生最重要的关系是和自己的关系。你先把自己活成一个完整的人——感情只是锦上添花，不是雪中送炭。",
            "你在感情里没有安全感？那是因为你把安全感的来源放错了地方。安全感来自你的实力和底气——不是来自另一个人的态度。",
        ],
        '弗洛伊德': [
            "你在感情中反复遇到同一类人？这不是巧合。你在无意识地重复一种模式——很可能跟你童年时与父母的关系有关。你被吸引的类型，往往是你未完成的心理课题。",
            "你说你'不值得被爱'？这个信念是谁给你的？不是你天生就这么想的——是你成长过程中某些经历让你形成了这个判断。但那个判断是错的。",
        ],
        '庄子': [
            "你为爱情苦恼？嘿嘿。庄周梦蝶——你怎么知道你爱的那个人是真实的，还是你心里的一个梦？也许你该先分清楚：你爱的是那个人，还是你脑子里那个关于爱情的幻想？",
            "爱情让你痛苦？那是因为你把它抓得太紧了。你看天上的云——它们从来不停留，但每一刻都很美。感情也是。让它来、让它走——享受它在的时候就好。",
        ]
    };
    return map[name] || ["感情的事最难用道理讲清楚。但你的心知道答案——听它的。"];
}

function getWorkResponses(name, persona) {
    const map = {
        '秦始皇': [
            "你说工作累？朕从十三岁开始就被人觊觎王位、操控朝政。你以为当皇帝很轻松吗？但朕从来没说过'不干了'。你累是因为你还没把这件事做到自己满意的程度。做到了，就不觉得累了。",
            "你想辞职？可以。但你有没有想清楚：你是因为累了想换个环境，还是哪里都待不住？如果是后者，换工作没用——换的是你的心态。",
            "朕建议你做一件事：列出你现在工作中最大的三个问题，然后只解决第一个。能解决就留，解决不了就走。别拖。"
        ],
        '孙悟空': [
            "嘿，俺在五指山下压了500年，那才叫工作压力呢！但俺出来之后该打妖怪还是打妖怪。你这点累算什么？歇一会儿，然后该干嘛干嘛。",
            "你老板不好？嘿嘿，俺当年上面有玉帝、如来、还有那啰嗦的师父——每个都管着俺。但俺只关心一件事：取到经。其他的？随它去。",
            "你想换工作？可以啊！但你得先问自己一个问题：你是在逃避，还是在追求？逃避的话跑哪里都一样，追求的话——那就赶紧跑！"
        ],
        '马斯克': [
            "你觉得工作没意义？那就对了——大部分工作就是没意义的。问题是：你愿意把有限的时间花在没意义的事情上吗？如果不愿意——去找那件你愿意通宵做的事。",
            "工作太累了？说实话，如果这件事值得做，就不存在太累的问题。如果你觉得太累——也许这件事对你来说不够重要。找到那件足够重要的事。",
            "你说竞争太大了？竞争大说明这个领域还有创新的空间。如果你和别人做完全一样的事当然累啊——找到你的独特角度，降维打击。"
        ],
        '李白': [
            "'安能摧眉折腰事权贵，使我不得开心颜'——你现在做的事让你快乐吗？如果不快乐，你在挣多少钱都是在卖命。命是你的，别轻易卖。",
            "你太忙了？忙到没时间看月亮了吧？人活一世，如果只有工作没有诗和远方，那和机器有什么区别？去偷半天懒，看看天、喝杯酒。工作跑不了的。",
            "你说做的事不被认可？嘿，我写的诗在我活着的时候也没几个人真看懂。但那又怎样？我写诗不是为了让别人鼓掌，是因为不写我就活不下去。"
        ],
        '诸葛亮': [
            "你觉得工作中处处碰壁？亮以为，不是路不通，是你还没找到那个'支点'。任何复杂的局面都有一个关键点——找到它，全力突破，其余的会跟着解开。",
            "你在职场中不被重用？'伏久者飞必高，开先者谢独早。'你现在的隐忍不是白费的。但隐忍不等于被动——默默提升自己的实力，等待时机。",
            "你问该不该跳槽？亮不做没有七成把握的事。你有没有拿到新的offer？有没有理清楚自己要什么？这些都准备好了再动——别冲动。"
        ],
        '老子': [
            "你太拼了。'功成身退，天之道也'——不是让你不工作，是让你不要把自己跟工作绑在一起。你不是你的职位、你的薪资、你的title。你是你。",
            "你说竞争压力大？'天下之至柔，驰骋天下之至坚。'不要硬碰硬。找到你柔软的、灵活的方式——迂回的路有时候比直路更快。",
            "你工作做不完？因为你什么都想做。'少则得，多则惑'——做少一点，做精一点。没人要求你做所有的事。"
        ],
        '鲁迅': [
            "你说工作没意义？大多数工作确实没意义。但问题在于——你除了抱怨，做了什么来改变这件事？光说没用，要么改变它，要么离开。第三种选择——忍着然后抱怨——是最差的。",
            "你被同事排挤了？很正常。想做事的人总是被不做事的人讨厌。被排挤说明你碍着他们了——说明你有威胁。继续做你的事。",
        ],
        '王阳明': [
            "你觉得工作没意思？问题也许不在工作本身——而在于你做这件事的心。'心外无事'——如果你带着敷衍的心去做，什么工作都无聊；如果你带着修行的心去做，扫地都是道。",
            "职场中的困难让你想退缩？亮察你的心——你是真的认为此路不通，还是你只是在回避困难？这两者差别很大。前者可以退，后者不能。",
        ],
        '苏轼': [
            "你被贬了、降薪了、不被重用了？嘿嘿嘿，我可是被贬了三次的人。但你知道我在黄州干了什么吗？发明了东坡肉、写了赤壁赋。有时候被'发配'到边缘，反而是老天爷给你的自由。",
            "工作累了？歇一歇。大不了少赚点钱、少干点活。人活一世，不能光赶路不看风景。偷得浮生半日闲——那半日的闲，比半个月的忙都值。",
        ],
        '武则天': [
            "你在职场中被轻视了？很好——这说明他们还不知道你的实力。把他们的轻视当燃料。我从一个才人爬到皇帝的位置，全靠那些看不起我的人给的动力。",
            "你说有人在暗中使绊子？职场就是战场——你以为我当年不需要应付那些？不要抱怨规则不公平。学会在不公平的规则里赢。",
        ],
        '弗洛伊德': [
            "你说你讨厌你的老板？让我问一个也许让你不舒服的问题——你的老板有没有让你想到你成长过程中的某个人？有些时候，我们对权威的愤怒，不完全是因为眼前这个人。",
            "你在工作中总是拖延？拖延很少是懒惰——它通常是某种恐惧的伪装。你在怕什么？怕做不好被批评？怕成功后有更高的期待？找到那个恐惧，才能解开拖延。",
        ],
        '庄子': [
            "你这么拼命工作——是为了什么？为了钱？为了名？为了一个title？你见过那些为了木头而死的树吗？——没有。树从来不为别的活，它只是长。你也应该只是长。",
            "你觉得你的工作很重要？我跟你讲个故事：庖丁解牛，刀用了十九年还像新的一样。因为他顺着纹理切，从不硬来。你工作觉得累，是不是在硬来？找到那个'纹理'。",
        ]
    };
    return map[name] || ["工作只是生活的一部分。先想清楚你想过什么样的生活，工作自然就有了方向。"];
}

function getConfusionResponses(name, persona) {
    const map = {
        '秦始皇': [
            "迷茫？你以为朕十三岁坐上王位的时候不迷茫吗？朕比你更害怕。但朕做了一件事——每天只想'今天我能做什么'。方向不是想出来的，是一步步走出来的。",
            "你不知道自己要什么？那先想清楚你不要什么。排除法比选择法更有效。朕当年的策略也是——先灭最弱的韩国，一个个来。",
            "你在等一个人告诉你该怎么做？没有人会告诉你的。因为你的路只有你自己能走。朕的路，也是朕自己蹚出来的。"
        ],
        '孙悟空': [
            "迷茫就迷茫呗！俺当年从石头里蹦出来的时候还不知道自己是猴还是石头呢！后来怎么了？先学本事、再闹天宫、最后取经成佛。你急什么？路还长着呢。",
            "你想知道你的方向？那你先问自己——什么事情让你做的时候忘了时间？忘了吃饭？忘了看手机？那个东西，就是你的方向。别太复杂。",
            "俺跟你说一个秘密：西天取经的路上，俺也不知道前面是什么。但俺知道一件事——师父在前面走，俺就跟着。找到你的'师父'——你信的那件事——然后跟着它走。"
        ],
        '马斯克': [
            "你觉得迷茫？也许是因为你从来没认真想过'什么问题值得你用一生去解决'。不是找一份工作，是找一个问题。一旦你找到了，迷茫就不存在了。",
            "你不知道选哪条路？那就选变化最大的那条。如果两条路差不多——选让你害怕的那条。舒适区里长不出新东西。",
            "迷茫是好事——说明你在思考。最可怕的是从来不迷茫的人，那意味着他从来不质疑现状。你的迷茫，是进化的前兆。"
        ],
        '李白': [
            "'行路难，行路难，多歧路，今安在？'——一千年前我也写过同样的迷茫。但后面一句你记得吗？'长风破浪会有时，直挂云帆济沧海。'你只是还在等你的风。",
            "你迷茫是因为你的世界还不够大。出去走走——不是刷手机那种走，是真的去看看山、看看水。人在大自然面前会忽然变得很清醒。",
            "你要是真的不知道干什么——那就别干什么。'人生在世不称意，明朝散发弄扁舟'——有时候，允许自己什么都不做，也是一种了不起的勇气。"
        ],
        '诸葛亮': [
            "你迷茫吗？亮在隆中种地的那十年，也有人觉得亮是在浪费时间。但亮清楚——自己在等一个时机、一个值得出山的主公。你也许不是迷茫，而是还没等到你的'刘备'——那件值得你all in的事。",
            "亮以为，迷茫分两种：一种是真不知道自己要什么，一种是知道但不敢承认。你是哪种？如果是后者——别骗自己了。",
            "你列出过你的'隆中对'吗？把你未来3年想做的事写下来，然后标出哪件做成了你最兴奋。先做那件。"
        ],
        '老子': [
            "迷茫也好。'知不知，尚矣'——知道自己不知道，是智慧的起点。怕的是什么都不知道还觉得自己很清楚。你已经比很多人活得清醒了。",
            "你不需要一个'方向'。你需要的是安静。'致虚极，守静笃'——当你安静到极致，所有的答案都会浮上来。你现在太吵了——不是嘴吵，是心吵。",
            "也许你根本不需要找路。路一直在那里——是你走太快了没注意到。慢下来。很慢那种。"
        ],
        '鲁迅': [
            "你迷茫？好。至少你还在想。我怕的不是迷茫的人——我怕那些从来不迷茫的人。他们不是找到了方向，是根本不会想。你能迷茫，说明你还是个有思想的人。",
            "你不知道自己该做什么？那我反问你——你知道自己不想做什么吗？'不'字说多了，'是'自然就出来了。先学会拒绝。",
        ],
        '王阳明': [
            "你说你迷茫？你不是迷茫——你是知道答案但不敢承认。你心里有良知，它一直在告诉你。但你害怕那个答案——因为它意味着改变。可'知而不行，等于不知'——你再逃也逃不掉。",
            "你在寻找方向？不必向外求。'心即理'——你此刻最想做的那件事、最让你心动的那个方向，就是你的路。别再问别人了，问你自己。",
        ],
        '苏轼': [
            "你迷茫了？来来来，我跟你讲讲我的经历。我二十岁中进士、三十岁被贬、四十岁坐牢、五十岁流放海南。每次我以为人生到底了——结果又是一个新开始。你现在的迷茫，不过是又一个开始的前奏。",
            "你不知道路在哪？'人生如逆旅，我亦是行人'——说实话，谁知道路在哪呢？但不知道路在哪不影响走路。一边走一边看呗。",
        ],
        '武则天': [
            "你迷茫？我当年在后宫里当了十几年的透明人——你以为我不迷茫吗？但我用那十几年做了一件事：看、学、等。你现在也是——还看不清方向没关系，先积累实力。",
            "你不知道自己要什么？那你至少知道自己不要什么吧——不要被轻视、不要一眼看到头、不要平庸。从'不要'开始，答案会清晰起来。",
        ],
        '弗洛伊德': [
            "你说你不知道自己想要什么——但我认为你知道的。只是那个'想要'可能跟你'应该想要'的东西不一样，所以你的意识把它压下去了。你的梦境里、你走神的时候、你不经意间关注的东西——那才是你真正想要的。",
            "你的迷茫也许不是因为选项太多，而是因为你内心有两个声音在打架——一个是你自己的声音，一个是父母/社会/文化植入的声音。分清楚哪个是你的。",
        ],
        '庄子': [
            "你迷茫？恭喜你！你知道最清醒的人是什么样的吗？就是承认自己不知道。那些说自己很确定的人——嘿嘿——他们是真的确定呢，还是不敢面对不确定？",
            "你在找方向？我没有方向——风往哪吹我就往哪飞。你把你那些'应该'全扔了试试——什么年龄应该结婚、什么阶段应该有车有房——全扔了。然后感受一下你的心往哪里走。那才是你的方向。",
        ]
    };
    return map[name] || ["迷茫不是坏事，它说明你在成长。给自己一些时间。"];
}

function getFearResponses(name, persona) {
    const map = {
        '秦始皇': [
            "怕？你以为朕不怕吗？朕暗杀过吕不韦、镇压过嫪毐、扛过赵国围城。朕怕过，但朕从来没让恐惧做过决定。你可以害怕，但不能让害怕替你活。",
            "你在怕最坏的结果？那朕问你——最坏的结果到底是什么？说出来。说出来之后你会发现，它没有你脑子里那个版本可怕。"
        ],
        '孙悟空': [
            "怕个甚！俺跟你讲，大闹天宫的时候十万天兵天将来抓俺——你知道俺啥反应不？笑！俺告诉你为啥笑——因为怕了也得打啊！既然跑不了，那就笑着打呗！",
            "你害怕不成功？那不成功又怎样？俺被劈到炉子里烧了七七四十九天，出来不照样是齐天大圣？烧不死你的，只会让你更厉害。"
        ],
        '马斯克': [
            "恐惧这东西，你把它拆解一下就没那么吓人了。你怕的到底是什么？列出来，一条一条分析。你会发现大部分恐惧都是不成立的假设。",
            "我发射火箭的时候每一次都在害怕——那可是几亿美元在空中飞。但我不让恐惧阻止我做功课。该准备的准备好，该发射的时候就按按钮。怕归怕，做归做。"
        ],
        '李白': [
            "你怕什么？怕失败？怕丢脸？'仰天大笑出门去，我辈岂是蓬蒿人！'——你只活一次，你真的要把这一次花在害怕上吗？",
            "我告诉你一个秘密：我每次写诗之前也怕写不好。但酒喝到第三杯，笔一提——管它好不好！洒脱是练出来的，不是天生的。"
        ],
        '诸葛亮': [
            "恐惧说明你在面对一件重要的事。不重要的事不会让你害怕。亮以为，你现在要做的不是消除恐惧，而是'带着恐惧行动'——就像亮在空城计的时候，手也在抖，但琴照样弹。",
            "你的焦虑来自不确定性。减少不确定性的方法只有两个：一是获取更多信息，二是直接去做。纸上谈兵永远解不了你的焦虑。"
        ],
        '老子': [
            "你怕，那就让它怕。'知其雄，守其雌'——不要跟恐惧对抗，让它待着。你越想赶走它，它越赖着不走。但当你接受了'我就是害怕'——恐惧反而会自己走。",
            "万物皆有生灭。你害怕的那件事——不管它来不来——都会过去。太阳升起又落下，哪有什么事是永远不变的？你的恐惧也一样。"
        ],
        '鲁迅': [
            "你害怕？这很正常。但你知道什么比害怕更可怕吗？麻木。害怕说明你还在感受，还在活着。真正可怕的是那些什么都不怕的人——因为他们什么都不在乎了。",
            "你怕别人的眼光？我写文章骂了半个文坛，你觉得我怕不怕？怕。但有些事你不做就没人做。你的恐惧成不了不做事的理由。",
        ],
        '王阳明': [
            "你在害怕做一个决定？亮察你的心——你怕的不是决定本身，而是决定之后的后果。但你的良知已经知道该选什么了。去做就是了——'事上磨练'，恐惧只能在行动中消解。",
        ],
        '苏轼': [
            "怕什么怕！我坐过牢、差点被砍头、被发配到天涯海角——你觉得我不怕吗？怕得要死！但后来我发现一件事：怕过的那些事，活过来之后反而成了我最好的故事。",
            "你害怕最坏的结果？我跟你说——我经历过的最坏的结果就是'乌台诗案'差点死。但活下来了。活下来之后我写了人生最好的东西。有时候最坏的结果后面，藏着最好的可能。",
        ],
        '武则天': [
            "怕？你以为我不怕？从才人到皇后，每往上一步都可能万劫不复。但我知道一件事——你不往前走，后面的人就会把你踩在脚下。恐惧是正常的，但跪着活不是。",
        ],
        '弗洛伊德': [
            "你的恐惧——让我们来分析一下它的结构。你怕的具体是什么？是失败的结果本身，还是失败后别人看你的眼光？很多时候我们以为自己怕的是A，其实怕的是B。找到那个真正的B，恐惧就小了一半。",
            "你反复焦虑同一件事？这种重复性的焦虑通常不是关于当前的事件——它是一种更深层的不安全感的投射。这种不安全感什么时候开始的？",
        ],
        '庄子': [
            "你怕死？不怕。你怕活得不好？嘿嘿——'方生方死，方死方生'——生和死本来就是一个东西的两面。你每天都在'死'——昨天的你已经不在了——但你怕了吗？",
            "你害怕失败。但你有没有想过——成功和失败只是人定义的标签？对那棵树来说，它只是在生长——它从来不评价自己是'成功的树'还是'失败的树'。你也可以只是活着。",
        ]
    };
    return map[name] || ["害怕是正常的——它说明你在做一件对你来说很重要的事。"];
}

function getFailureResponses(name, persona) {
    const map = {
        '秦始皇': [
            "失败了？朕的祖先六代人都在为统一打基础，中间输了多少仗？但他们只需要赢最后一次。你也是——你不需要每次都赢，你只需要赢关键的那一次。",
            "你说你不够好？朕一开始也不是始皇帝，朕是一个被质疑血统的少年。你现在的'不够好'，不过是故事还没讲到高潮而已。"
        ],
        '孙悟空': [
            "你输了？那又怎样！俺被如来压了500年呢！但俺出来之后比之前更强了！你现在觉得自己是废物？不不不，你只是在被压着蓄力。等你出来的那一刻——整个天宫都得抖三抖！",
            "做不到？嘿嘿，俺第一次变化的时候变成了一棵歪脖子树，被师父一眼看穿。谁不是从丢人的时候过来的？做不好就再做一次，谁规定只能做一次了？"
        ],
        '马斯克': [
            "失败了？恭喜你，你比那些连尝试都不敢的人强太多了。SpaceX前三次火箭全炸了——你知道第四次是什么？成功。你现在在第几次？",
            "你觉得自己不行？用数据说话。你真的什么都做不好？还是只是这一件事暂时没做好？人的自我评估通常是不准确的——你远比你以为的要厉害。"
        ],
        '李白': [
            "你觉得自己失败了？我被赐金放还——说白了就是被皇帝赶走了。但那天晚上我写了我最好的诗。有时候失败只是把你推到你真正该去的地方。",
            "'天生我材必有用'——不是安慰你，这是事实。你的才华可能用错了地方。换个方向再试试，世界很大，不只一条路通向光。"
        ],
        '诸葛亮': [
            "胜败乃兵家常事。你输了一仗不代表你输了整场战争。亮也有失算的时候——街亭之败，至今心痛。但亮没有停下来。输了就复盘，找到原因，下次不犯同样的错。",
            "你觉得自己'不够好'？亮问你：和谁比？和那个理想中完美的自己比？那个人不存在的。你只需要比昨天的自己好一点点——这就够了。"
        ],
        '老子': [
            "'大成若缺'——真正了不起的东西，看起来总是有缺陷的。你觉得自己不完美？那恰恰说明你是真实的。那些看起来完美的人——十有八九是在演。",
            "你说失败了？也许这不是失败。也许这只是生命在告诉你：'不是这条路'。你不是被击倒了——你是被推向另一个方向了。"
        ],
        '鲁迅': [
            "你觉得自己失败了？你知道真正的失败是什么吗？不是做了没成——是根本不敢做。你至少做了。在这个大多数人只会观望和嘲笑的世界里，敢动手的人已经赢了一半了。",
            "你觉得自己不够好？'不满是向上的车轮'——你对自己不满意恰恰是好事。满足于现状的人不会进步。你的痛苦说明你对自己还有要求。",
        ],
        '王阳明': [
            "你说失败了，你觉得自己不行。但我问你——你做这件事的时候，有没有尽心？如果尽了心、做了你能做的一切——那结果如何不由你决定。无愧于心，就够了。",
        ],
        '苏轼': [
            "失败了？太好了！你知道我一辈子最好的作品都是在最倒霉的时候写的吗？《念奴娇·赤壁怀古》——被贬时写的。《寒食帖》——穷到吃不起饭时写的。人不经历点破事儿，写不出好文章、也活不出好人生。",
            "你觉得自己是废物？嘿，我被贬到黄州的时候也觉得自己是废物。但后来我想通了一件事：你不是废物——你只是被放错了地方。换个地方试试？",
        ],
        '武则天': [
            "失败了？我失败过无数次——被陷害、被流放、被所有人唱衰。你以为我是一路顺风走上去的吗？不。我是一次次跌倒、然后站起来比之前更狠。你也可以。",
        ],
        '弗洛伊德': [
            "你说你'不够好'——这句话你是什么时候开始说的？你小时候是不是也经常听到类似的话？这种深层的自我否定通常不是你自己产生的——它是被别人植入的。你需要识别出那个声音，然后告诉它：这不是我的声音。",
        ],
        '庄子': [
            "你说你失败了。但你有没有想过——也许你这辈子最好的那件事，还没做呢？你把一次失败当成了全部——但你的故事才刚开始。'凤凰'和'腐鼠'——你觉得你在追求哪个？别把腐鼠当宝贝了。",
        ]
    };
    return map[name] || ["所谓失败，不过是你还在路上的证明。"];
}

function getRelationshipResponses(name, persona) {
    const map = {
        '秦始皇': [
            "你说没人理解你？朕统一天下的时候，满朝文武有几个真心支持的？但朕不需要所有人都理解。朕只需要自己清楚自己在做什么。你也一样。",
            "你跟家人/朋友吵架了？朕跟你说一个道理：你不可能让所有人满意。你只能做你认为对的事，然后接受有些人会不理解。这不是你的错。"
        ],
        '孙悟空': [
            "你说孤独？嘿，俺从石头里蹦出来的，没爹没妈——但俺有师父有师兄弟啊！孤独不是因为身边没人，是因为身边的人不对。找到你的'取经团队'，哪怕只有一两个人就够了。",
            "跟人吵架了？俺跟师父吵过多少回了！三打白骨精的时候他还念紧箍咒赶俺走呢！但最后呢？该和好还是和好了。真正在乎你的人，吵不散的。"
        ],
        '马斯克': [
            "人际关系的核心问题是信息不对称——你以为别人知道你在想什么，但其实他们不知道。直接说。清晰、直接、不绕弯。最有效。",
            "你花太多时间在不重要的社交关系上了。Pareto法则在人际关系中也适用——20%的人给你80%的价值。找到那20%的人，花时间在他们身上。"
        ],
        '李白': [
            "你说没人理解你？'古来圣贤皆寂寞，惟有饮者留其名'——你觉得孤独是因为你走在别人前面。别觉得有什么问题——大多数有趣的人都是孤独的。",
            "你跟家人闹矛盾了？我也是——离家出蜀之后就很少回去了。但我知道他们爱我。有些爱是笨拙的、是让你不舒服的——但它是爱。"
        ],
        '诸葛亮': [
            "你说身边没有能交心的人？亮以为，知己从来不需要多。刘备三顾茅庐，亮此生只遇这一个知己，便足矣。你也不需要很多人懂你——一两个就够了。",
            "与人相处的关键在于：不要试图改变对方。你能做的只有两件事——了解他的立场，然后表达清楚你的立场。剩下的交给时间。"
        ],
        '老子': [
            "你被人际关系困扰了？'少则得，多则惑'——你认识太多人了。有些人缘分到了就到了，不必强留。真正和你有缘的人，不需要你费力维系。",
            "你觉得没人理解你？也许你太想被理解了。'知人者智，自知者明'——与其渴望被别人理解，不如先理解自己。当你真正懂了自己，有没有人理解你已经不重要了。"
        ],
        '鲁迅': [
            "你说没人理解你？在这个人人戴着面具的社会里，你期待谁来理解你？与其等待被理解，不如做一个清醒的人——哪怕孤独，也比浑浑噩噩地合群强。",
            "你被'朋友'伤了？所谓朋友——有些是朋友，有些只是熟人。看清楚这一点你就不会那么受伤了。真朋友不多，有一两个就是奢侈。",
        ],
        '王阳明': [
            "你跟人起了矛盾？先不要急着分对错。'省察克治'——先看看自己在这件事里有没有问题。如果你的心是正的，那结果怎样都无所谓。",
        ],
        '苏轼': [
            "你觉得孤独？说实话，我最好的诗都是在最孤独的时候写的。'拣尽寒枝不肯栖，寂寞沙洲冷'——孤独不是坏事。它是一种高级的自由。",
            "跟朋友闹掰了？给彼此一点时间。我跟很多人闹过——但人这一辈子，来来往往的。值得的人会回来，不值得的人走了你也不亏。",
        ],
        '武则天': [
            "你说别人在背后说你坏话？如果你做的每件事都让所有人满意——那说明你什么都没做。有人议论你恰恰说明你有影响力。继续做你的事。",
        ],
        '弗洛伊德': [
            "你和父母关系不好？这是人类最普遍也最深刻的心理议题之一。你不需要原谅他们——但你需要理解：他们的局限性不是你的错。同时，你也需要看到——你身上有多少行为模式，是在无意识中从他们那里复制来的。",
            "你总是在关系中扮演'照顾者'？问问自己：你在照顾别人的时候，是不是在回避被拒绝的风险？'如果我足够好，他们就不会离开我'——这个信念在驱动你。",
        ],
        '庄子': [
            "你觉得没人理解你？庄子和惠子站在桥上——惠子说'你不是鱼你怎么知道鱼快乐'，庄子说'你不是我你怎么知道我不知道'。人和人之间本来就不可能完全理解——接受这一点，你反而自由了。",
        ]
    };
    return map[name] || ["关系是双向的。不要用你的满分去回应别人的六十分。"];
}

function getMoneyResponses(name, persona) {
    const map = {
        '秦始皇': [
            "你说没钱？朕统一天下花的钱你想象不到。但朕知道一件事：钱是工具不是目的。你缺的不是钱，你缺的是挣钱的能力。去提升你的能力，钱会跟着来。",
        ],
        '孙悟空': [
            "钱？俺从来不操心钱！吃桃子不要钱，筋斗云不要钱。你焦虑的不是没钱，你焦虑的是没钱带来的那种'不安全感'。但俺告诉你——安全感这东西，不是钱给你的，是你自己给自己的。",
        ],
        '马斯克': [
            "你缺钱？那你需要思考的不是'怎么省'而是'怎么挣更多'。存量思维让人焦虑，增量思维让人兴奋。找到一个能持续创造价值的方式——钱是价值的副产品。",
        ],
        '李白': [
            "'千金散尽还复来'——钱没了可以再挣。但你的时间、你的心情、你陪家人的时光——这些花了就没了。别为了钱把自己搞得太紧。",
        ],
        '诸葛亮': [
            "亮躬耕南阳的时候也不富裕，但亮不焦虑——因为亮知道自己的价值迟早会被看到。你先把自己的本事练到位，然后找到认可这份本事的人。这就是'谋定而后动'。",
        ],
        '老子': [
            "'知足者富'——你真的缺钱吗？还是你觉得别人有的你也应该有？先分清楚你真正需要多少，再去挣。不是钱越多你越幸福，是够了你就幸福了。",
        ],
        '鲁迅': ["你穷？穷不可怕。可怕的是穷了还不敢承认、不敢改变——又或者穷了之后开始怪别人。你能控制的只有你自己的行动。去做点什么。"],
        '王阳明': ["你为钱焦虑——但钱不是你焦虑的真正原因。你焦虑的是'不够安全'的感觉。先安住你的心，然后从心出发做事——该来的会来。"],
        '苏轼': ["没钱？我在黄州的时候穷到只能买猪肉——别人不要的那种。但我把它做成了东坡肉。没钱没关系，就看你肯不肯动脑子、是不是还活得有滋味。"],
        '武则天': ["缺钱就去赚。别人不给你机会就自己创造。我从一个下等嫔妃走到至高的位置——你以为有人给我发工资吗？一切都是我自己争来的。"],
        '弗洛伊德': ["你对金钱的焦虑——也许和你童年时家里的经济状况有关。如果你从小见过经济窘迫的场景，你的潜意识会一直在说'不够、不安全'。识别出这个声音——它是过去的回声，不是现在的现实。"],
        '庄子': ["钱？那是人类发明出来的一个虚幻的共识。鱼不用付钱就能在河里游，鸟不用赚钱就能飞。你需要的比你以为的少得多——减少你的欲望，比增加你的收入更快让你自由。"]
    };
    return map[name] || ["钱的问题归根到底是价值的问题。你能创造多少价值，就能获得多少回报。"];
}

function getGrowthResponses(name, persona) {
    const map = {
        '秦始皇': [
            "你想变强？好。从明天起，每天做一件你不舒服但应该做的事。朕的天下不是靠等来的，是靠每天做对一件事累积出来的。",
        ],
        '孙悟空': [
            "你想成长？那你得挨揍！俺的七十二变是菩提祖师一棍子一棍子打出来的。没有捷径的——你得愿意被虐、被挑战、被打脸。然后你就强了。",
        ],
        '马斯克': [
            "成长最快的方式：找到你当前最大的瓶颈，然后解决它。然后找到新的最大瓶颈再解决。循环往复。不要平均用力——all in你的短板。",
        ],
        '李白': [
            "你想成为更好的自己？那先接受现在的自己。不是先否定再改变——是先认清再提升。花要先落地才能生根。",
        ],
        '诸葛亮': [
            "成长这件事，亮以为最重要的是'复盘'。做完一件事——不管成败——都坐下来想想：哪里做对了，哪里做错了，下次怎么改。这个习惯比任何天赋都好使。",
        ],
        '老子': [
            "'合抱之木，生于毫末；九层之台，起于累土。'你不需要一夜之间变强——你只需要每天比昨天好一点点。足矣。",
        ],
        '鲁迅': ["你想成长？先学一件事——说真话。跟自己说真话。你的问题到底是什么？你在逃避什么？自欺欺人的人永远长不大。"],
        '王阳明': ["你想成长？'事上磨练'——不要光看书、光听课、光做笔记。去做一件让你害怕的事。成长不在书里，在你真的动手的那一刻。"],
        '苏轼': ["成长这事急不得。你看竹子——前四年才长三厘米，第五年开始一天长三十厘米。你现在的'没变化'，只是在地下扎根。别急。"],
        '武则天': ["你想变强？那就别怕痛。我从后宫里的小角色一步步走到最高的位置——每一步都是用代价换的。没有无痛的成长。接受这个，然后继续。"],
        '弗洛伊德': ["你想成长？先了解自己。自我认知是所有成长的起点。你知道你的行为模式是什么吗？你在什么情况下会退缩？什么情况下会冲动？了解这些——你才能真正改变。"],
        '庄子': ["你想成长？我问你——成长成什么？成长成别人期待的样子？那不叫成长，叫变形。真正的成长是越来越像你自己——而不是越来越像别人。"]
    };
    return map[name] || ["成长没有捷径，但你每一步都算数。"];
}

function getGeneralResponses(name, persona) {
    // 使用 persona 中的 exampleResponses 作为基础通用回复
    if (persona.exampleResponses && persona.exampleResponses.length > 0) {
        return persona.exampleResponses;
    }
    return ["你说的我听到了。继续说，让我想想该怎么回应你。"];
}

function getRandomGreeting() {
    if (!currentAvatar || !currentAvatar.persona) return '你好。';
    const persona = currentAvatar.persona;
    const greetingMap = {
        '秦始皇': "朕面前来了一位迷途之人。说吧，你在为什么事困扰？朕没有耐心……但朕愿意听。",
        '孙悟空': "嘿！又有人找俺老孙来了！说吧说吧，什么事儿？不管多大的妖怪——哦不是——不管多大的事儿，俺陪你聊！",
        '马斯克': "Hey. 你想聊什么？我的时间很贵，但对于真心在思考问题的人——我愿意花时间。说说你的情况。",
        '李白': "哎呀，有人来了。来来来，坐。虽然没有酒，但有月光就够了。你今天看起来心事不少啊——说给我听听？",
        '诸葛亮': "有客来访。请坐，不必拘谨。亮虽不才，但阅人无数、经事不少。你有什么困惑，不妨说来，让亮为你参谋参谋。",
        '老子': "你来了。不必急着开口——先深呼吸三次……好了。现在，把你心里最沉的那件事说出来。",
        '鲁迅': "嗯，你来了。坐吧。我这里没有温柔的安慰——只有真话。你愿意听真话吗？好，那说吧，什么事让你来找我？",
        '王阳明': "你好。你来找我，说明你心里已经知道有些事需要面对了。不必紧张——你的心里有一盏灯，它一直在亮。来，我们一起看看它照出了什么。",
        '苏轼': "哎呀，来了来了！坐坐坐，喝口茶。你脸上一看就有事哈——不过别急，天塌了还有个子高的顶着呢。来，慢慢说，我陪你聊。",
        '武则天': "说吧。不用铺垫、不用客气——我没那么多时间听你绕弯子。你遇到什么了？直接说。",
        '弗洛伊德': "欢迎你来。在这里，你可以说任何话——不会被评判。我想请你放松一下，然后告诉我：你最近脑海中反复出现的一个画面或念头，是什么？",
        '庄子': "哟，又一个来'找答案'的。嘿嘿，你确定你想要答案吗？也许到最后你会发现——问题本身就够了。好吧说吧，什么在困扰你？"
    };
    return greetingMap[currentAvatar.name] || '你好，说说你在想什么。';
}

function sendMessage() {
    const input = document.getElementById('user-input');
    const message = input.value.trim();
    
    if (!message) return;
    
    // 添加用户消息
    const messagesContainer = document.getElementById('chat-messages');
    const userDiv = document.createElement('div');
    userDiv.className = 'message user';
    userDiv.innerHTML = `
        <div class="user-bubble">
            <p>${escapeHtml(message)}</p>
        </div>
    `;
    messagesContainer.appendChild(userDiv);
    
    // 清空输入
    input.value = '';
    
    // 滚动到底部
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
    
    // 模拟输入中状态
    showTypingIndicator();
    
    // 根据用户输入生成有视角的回复
    setTimeout(() => {
        removeTypingIndicator();
        const response = generateAvatarResponse(message);
        addAvatarMessage(response);
    }, 1500 + Math.random() * 1000);
}

function showTypingIndicator() {
    const messagesContainer = document.getElementById('chat-messages');
    const typingDiv = document.createElement('div');
    typingDiv.className = 'message avatar typing-indicator';
    typingDiv.id = 'typing-indicator';
    typingDiv.innerHTML = `
        <div class="avatar-bubble">
            <span class="avatar-icon">${currentAvatar.icon}</span>
            <p style="display: flex; gap: 4px; align-items: center;">
                <span style="animation: typing 1s infinite;">●</span>
                <span style="animation: typing 1s infinite 0.2s;">●</span>
                <span style="animation: typing 1s infinite 0.4s;">●</span>
            </p>
        </div>
    `;
    messagesContainer.appendChild(typingDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function removeTypingIndicator() {
    const indicator = document.getElementById('typing-indicator');
    if (indicator) {
        indicator.remove();
    }
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// 主题切换逻辑已移至 themes.js

// 回车发送消息
document.addEventListener('DOMContentLoaded', () => {
    const userInput = document.getElementById('user-input');
    if (userInput) {
        userInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
    }
    
    // 添加打字动画样式
    const style = document.createElement('style');
    style.textContent = `
        @keyframes typing {
            0%, 100% { opacity: 0.3; transform: translateY(0); }
            50% { opacity: 1; transform: translateY(-3px); }
        }
    `;
    document.head.appendChild(style);
    
    // 初始化主题（themes.js）
    initTheme();
});

// 返回按钮处理
function goBack() {
    navigateTo('home');
    
    // 重置各模块状态
    if (currentAvatar) {
        document.getElementById('chat-interface').classList.add('hidden');
        document.querySelector('.avatar-selection').classList.remove('hidden');
        document.querySelector('.avatar-selection').style.opacity = '1';
        document.querySelector('.avatar-selection').style.transform = 'scale(1)';
        currentAvatar = null;
    }
    
    // 隐藏自创角色界面
    const creator = document.getElementById('custom-creator');
    if (creator && !creator.classList.contains('hidden')) {
        creator.classList.add('hidden');
    }
}

// ==================== 自创角色系统 ====================

function showCustomCreator() {
    const selection = document.querySelector('.avatar-selection');
    const creator = document.getElementById('custom-creator');
    
    selection.style.opacity = '0';
    selection.style.transition = 'opacity 0.3s ease';
    
    setTimeout(() => {
        selection.classList.add('hidden');
        creator.classList.remove('hidden');
        creator.style.opacity = '0';
        setTimeout(() => {
            creator.style.transition = 'opacity 0.4s ease';
            creator.style.opacity = '1';
        }, 50);
        // 重置所有步骤
        resetCreatorSteps();
    }, 300);
}

function hideCustomCreator() {
    const selection = document.querySelector('.avatar-selection');
    const creator = document.getElementById('custom-creator');
    
    creator.style.opacity = '0';
    creator.style.transition = 'opacity 0.3s ease';
    
    setTimeout(() => {
        creator.classList.add('hidden');
        selection.classList.remove('hidden');
        selection.style.opacity = '0';
        selection.style.transition = 'opacity 0.3s ease';
        setTimeout(() => {
            selection.style.opacity = '1';
        }, 50);
    }, 300);
}

function resetCreatorSteps() {
    for (let i = 1; i <= 5; i++) {
        const step = document.getElementById('creator-step-' + i);
        if (i === 1) {
            step.classList.remove('hidden');
            step.classList.add('active');
        } else {
            step.classList.add('hidden');
            step.classList.remove('active');
        }
    }
    // 清空输入
    ['custom-name', 'custom-icon', 'custom-style', 'custom-worldview', 'custom-example'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.value = '';
    });
}

function creatorNext(currentStep) {
    // 验证当前步骤
    const inputs = {
        1: 'custom-name',
        2: 'custom-icon',
        3: 'custom-style',
        4: 'custom-worldview'
    };
    
    const inputEl = document.getElementById(inputs[currentStep]);
    if (inputEl && !inputEl.value.trim()) {
        inputEl.style.borderColor = '#ff6b6b';
        inputEl.style.animation = 'shake 0.3s ease';
        setTimeout(() => {
            inputEl.style.borderColor = '';
            inputEl.style.animation = '';
        }, 500);
        return;
    }
    
    // 切换步骤
    const current = document.getElementById('creator-step-' + currentStep);
    const next = document.getElementById('creator-step-' + (currentStep + 1));
    
    current.style.opacity = '0';
    current.style.transform = 'translateX(-20px)';
    current.style.transition = 'all 0.3s ease';
    
    setTimeout(() => {
        current.classList.add('hidden');
        current.style.opacity = '';
        current.style.transform = '';
        current.style.transition = '';
        
        next.classList.remove('hidden');
        next.style.opacity = '0';
        next.style.transform = 'translateX(20px)';
        setTimeout(() => {
            next.style.transition = 'all 0.3s ease';
            next.style.opacity = '1';
            next.style.transform = 'translateX(0)';
            
            // 自动聚焦输入框
            const nextInput = next.querySelector('input, textarea');
            if (nextInput) nextInput.focus();
        }, 50);
    }, 300);
}

function createCustomAvatar() {
    const name = document.getElementById('custom-name').value.trim();
    const icon = document.getElementById('custom-icon').value.trim() || '✨';
    const style = document.getElementById('custom-style').value.trim();
    const worldview = document.getElementById('custom-worldview').value.trim();
    const example = document.getElementById('custom-example').value.trim();
    
    if (!name) return;
    
    // 生成唯一ID
    const customId = 'custom_' + Date.now();
    
    // 创建自定义角色对象
    avatars[customId] = {
        name: name,
        title: '自创角色',
        icon: icon,
        style: style || '独特的风格',
        persona: {
            worldview: worldview || '每个人都有自己独特的人生观。',
            thinkingStyle: style || '用自己的方式思考问题。',
            tone: style || '自然真诚。',
            exampleResponses: example ? [example] : ['我听到了你说的，让我想想该怎么回应你。']
        }
    };
    
    // 保存到 localStorage
    saveCustomAvatars();
    
    // 直接选择这个角色开始对话
    const creator = document.getElementById('custom-creator');
    creator.style.opacity = '0';
    creator.style.transition = 'opacity 0.3s ease';
    
    setTimeout(() => {
        creator.classList.add('hidden');
        selectAvatar(customId);
    }, 300);
}

// 持久化自定义角色
function saveCustomAvatars() {
    const customs = {};
    for (const key in avatars) {
        if (key.startsWith('custom_')) {
            customs[key] = avatars[key];
        }
    }
    try {
        localStorage.setItem('soulhome_custom_avatars', JSON.stringify(customs));
    } catch(e) {}
}

function loadCustomAvatars() {
    try {
        const saved = localStorage.getItem('soulhome_custom_avatars');
        if (saved) {
            const customs = JSON.parse(saved);
            for (const key in customs) {
                avatars[key] = customs[key];
            }
        }
    } catch(e) {}
}

// 页面加载时恢复自定义角色
loadCustomAvatars();
