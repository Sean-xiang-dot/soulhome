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
            
            // 显示含义
            const meaningText = card.isReversed ? 
                `挑战与阻碍：${card.keywords}。这张牌逆位出现，提示你需要注意这方面的挑战。` :
                `积极能量：${card.keywords}。${card.meaning}`;
            
            meaning.innerHTML = `
                <p class="position-title">${positionNames[index]}的影响</p>
                <p class="meaning-text">${meaningText}</p>
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
    
    // 过去部分
    interpretation += `<div class="interp-section">
        <h4>✦ 过去的启示</h4>
        <p>「${past.name}」代表你过去的经历${past.isReversed ? '中遇到的挑战' : '带来的成长'}。
        这段经历塑造了你现在的状态，${past.isReversed ? '虽然艰难，但让你更加坚强。' : '为你打下了坚实的基础。'}</p>
    </div>`;
    
    // 现在部分
    interpretation += `<div class="interp-section">
        <h4>✦ 现在的状况</h4>
        <p>「${present.name}」揭示了你当前的处境${present.isReversed ? '中的困境' : '中的机遇'}。
        ${present.meaning} 这是你需要重点关注的领域。</p>
    </div>`;
    
    // 未来部分
    interpretation += `<div class="interp-section">
        <h4>✦ 未来的指引</h4>
        <p>「${future.name}」预示着未来的走向${future.isReversed ? '，提醒你需要警惕' : '，充满了希望'}。
        ${future.isReversed ? '不要被表面的困难吓倒，' : '保持现在的方向，'}成功就在前方。</p>
    </div>`;
    
    // 建议
    interpretation += `<div class="interp-section advice">
        <h4>✦ 给你的建议</h4>
        <p>综合三张牌的能量，建议你：${past.isReversed || present.isReversed ? 
            '不要被过去的困难束缚，专注于当下能做的事情，一步一步来。' : 
            '保持积极的心态，相信自己的能力，未来会如你所愿。'}
        记住，塔罗牌只是指引，真正的力量在你心中。</p>
    </div>`;
    
    document.getElementById('interpretation').innerHTML = interpretation;
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
                <p>你选择了与${currentAvatar.name}对话。请输入你的问题，我会用${currentAvatar.name}的风格回应你</p>
            </div>
        `;
        
        // 添加开场白
        setTimeout(() => {
            addAvatarMessage(getRandomResponse());
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

function getRandomResponse() {
    if (!currentAvatar) return '';
    const responses = currentAvatar.responses;
    return responses[Math.floor(Math.random() * responses.length)];
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
    
    // 模拟回复延迟
    setTimeout(() => {
        removeTypingIndicator();
        const response = getRandomResponse();
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
}
