// ==================== 多主题特效系统 ====================
// 主题列表：starry(星空), sunrise(朝阳初升), meadow(草地), rain(雨天), snow(雪天)

const THEMES = ['starry', 'sunrise', 'meadow', 'rain', 'snow'];
const THEME_META = {
    starry:  { icon: '🌙', label: '星空',   next: 'sunrise' },
    sunrise: { icon: '🌅', label: '朝阳初升', next: 'meadow'  },
    meadow:  { icon: '🌿', label: '草地',   next: 'rain'    },
    rain:    { icon: '🌧️', label: '雨天',   next: 'snow'    },
    snow:    { icon: '❄️', label: '雪天',   next: 'starry'  },
};

// ========== 全局状态 ==========
let currentTheme = 'starry';
let themeEffectIntervals = [];
let themeEffectTimeouts = [];
let themeAudio = null;
let mouseEffectHandler = null;
let trailEffectHandler = null;

// ========== 音效资源（使用 Web Audio API 生成） ==========
let audioCtx = null;

function getAudioCtx() {
    if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    return audioCtx;
}

// 生成白噪声（用于雨声/风声）
function createNoiseBuffer(ctx, seconds) {
    const sr = ctx.sampleRate;
    const buf = ctx.createBuffer(1, sr * seconds, sr);
    const data = buf.getChannelData(0);
    for (let i = 0; i < data.length; i++) {
        data[i] = Math.random() * 2 - 1;
    }
    return buf;
}

// 雨声 — 滤波白噪声
function playRainSound() {
    const ctx = getAudioCtx();
    const buf = createNoiseBuffer(ctx, 4);
    const src = ctx.createBufferSource();
    src.buffer = buf;
    src.loop = true;

    const lp = ctx.createBiquadFilter();
    lp.type = 'lowpass';
    lp.frequency.value = 800;

    const hp = ctx.createBiquadFilter();
    hp.type = 'highpass';
    hp.frequency.value = 200;

    const gain = ctx.createGain();
    gain.gain.value = 0.08;

    src.connect(lp).connect(hp).connect(gain).connect(ctx.destination);
    src.start();
    return { src, gain };
}

// 风声 — 更低的滤波噪声
function playWindSound() {
    const ctx = getAudioCtx();
    const buf = createNoiseBuffer(ctx, 6);
    const src = ctx.createBufferSource();
    src.buffer = buf;
    src.loop = true;

    const lp = ctx.createBiquadFilter();
    lp.type = 'lowpass';
    lp.frequency.value = 400;

    const gain = ctx.createGain();
    gain.gain.value = 0.05;

    // LFO 产生起伏
    const lfo = ctx.createOscillator();
    lfo.frequency.value = 0.15;
    const lfoGain = ctx.createGain();
    lfoGain.gain.value = 0.03;
    lfo.connect(lfoGain).connect(gain.gain);
    lfo.start();

    src.connect(lp).connect(gain).connect(ctx.destination);
    src.start();
    return { src, gain, lfo };
}

// 鸟鸣 — 简单正弦波啾啾
function playBirdChirp() {
    const ctx = getAudioCtx();
    const osc = ctx.createOscillator();
    osc.type = 'sine';
    const now = ctx.currentTime;
    osc.frequency.setValueAtTime(2400, now);
    osc.frequency.linearRampToValueAtTime(3200, now + 0.05);
    osc.frequency.linearRampToValueAtTime(2000, now + 0.12);

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(0.06, now + 0.02);
    gain.gain.linearRampToValueAtTime(0, now + 0.15);

    osc.connect(gain).connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.2);
}

// 虫鸣 — 草地用
function playCricketSound() {
    const ctx = getAudioCtx();
    const osc = ctx.createOscillator();
    osc.type = 'square';
    const now = ctx.currentTime;
    osc.frequency.value = 4200;

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0, now);
    // 连续短促 chirp
    for (let i = 0; i < 6; i++) {
        const t = now + i * 0.06;
        gain.gain.setValueAtTime(0.03, t);
        gain.gain.setValueAtTime(0, t + 0.03);
    }
    gain.gain.setValueAtTime(0, now + 0.4);

    osc.connect(gain).connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.5);
}

// 铃声滴答（下雪轻柔铃声）
function playSnowChime() {
    const ctx = getAudioCtx();
    const osc = ctx.createOscillator();
    osc.type = 'sine';
    const freq = [523.25, 659.25, 783.99, 1046.5][Math.floor(Math.random() * 4)];
    const now = ctx.currentTime;
    osc.frequency.value = freq;

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.04, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 2);

    osc.connect(gain).connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 2);
}

// ========== 清理当前主题特效 ==========
function cleanupThemeEffects() {
    // 清除定时器
    themeEffectIntervals.forEach(id => clearInterval(id));
    themeEffectTimeouts.forEach(id => clearTimeout(id));
    themeEffectIntervals = [];
    themeEffectTimeouts = [];

    // 停止音效
    if (themeAudio) {
        try {
            if (themeAudio.src) themeAudio.src.stop();
            if (themeAudio.lfo) themeAudio.lfo.stop();
        } catch (e) {}
        themeAudio = null;
    }

    // 移除鼠标事件
    if (mouseEffectHandler) {
        document.removeEventListener('mousemove', mouseEffectHandler);
        mouseEffectHandler = null;
    }
    if (trailEffectHandler) {
        document.removeEventListener('mousemove', trailEffectHandler);
        trailEffectHandler = null;
    }

    // 清除特效 DOM 元素
    document.querySelectorAll(
        '.shooting-star, .floating-particle, .theme-effect-el, .sunrise-ray, .raindrop, .snowflake, .firefly, .fallen-leaf, .sunbeam'
    ).forEach(el => el.remove());
}

// ========== 主题初始化 / 切换 ==========
function initTheme() {
    currentTheme = localStorage.getItem('theme') || 'starry';
    // 兼容旧版 dark/light
    if (currentTheme === 'dark') currentTheme = 'starry';
    if (currentTheme === 'light') currentTheme = 'sunrise';
    if (!THEMES.includes(currentTheme)) currentTheme = 'starry';

    applyTheme(currentTheme);
}

function toggleTheme() {
    const next = THEME_META[currentTheme].next;
    currentTheme = next;
    localStorage.setItem('theme', next);
    applyTheme(next);
}

function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    updateThemeIcon(theme);
    cleanupThemeEffects();

    // 启动对应主题特效
    switch (theme) {
        case 'starry':  initStarryEffects();  break;
        case 'sunrise': initSunriseEffects(); break;
        case 'meadow':  initMeadowEffects();  break;
        case 'rain':    initRainEffects();     break;
        case 'snow':    initSnowEffects();     break;
    }
}

function updateThemeIcon(theme) {
    const icon = document.querySelector('.theme-icon');
    const label = document.querySelector('.theme-label');
    if (icon) icon.textContent = THEME_META[theme].icon;
    if (label) label.textContent = THEME_META[theme].label;
}

// ==================== 星空主题 ====================
function initStarryEffects() {
    // 流星
    themeEffectIntervals.push(setInterval(() => {
        if (Math.random() > 0.6) createShootingStar();
    }, 3000));

    // 漂浮星星
    for (let i = 0; i < 15; i++) {
        themeEffectTimeouts.push(setTimeout(() => createFloatingParticle(), i * 200));
    }
    themeEffectIntervals.push(setInterval(() => {
        if (document.querySelectorAll('.floating-particle').length < 20) {
            createFloatingParticle();
        }
    }, 2000));

    // 鼠标星光追随
    const starColors = [
        'rgba(255,255,255,VAL)', 'rgba(200,200,255,VAL)', 'rgba(255,215,0,VAL)',
        'rgba(147,112,219,VAL)', 'rgba(100,180,255,VAL)'
    ];
    let lastSX = 0, lastSY = 0;
    mouseEffectHandler = (e) => {
        const dx = e.clientX - lastSX, dy = e.clientY - lastSY;
        const speed = Math.sqrt(dx * dx + dy * dy);
        lastSX = e.clientX; lastSY = e.clientY;
        if (speed < 1.5) return;
        const count = speed > 8 ? 3 : speed > 3 ? 2 : 1;
        for (let i = 0; i < count; i++) {
            const el = document.createElement('div');
            el.className = 'theme-effect-el';
            const sz = 2 + Math.random() * 5;
            const dur = 0.5 + Math.random() * 0.7;
            const op = 0.5 + Math.random() * 0.5;
            const colTpl = starColors[Math.floor(Math.random() * starColors.length)];
            const col = colTpl.replace('VAL', op.toFixed(2));
            el.style.cssText = `
                position:fixed; pointer-events:none; z-index:9999; border-radius:50%;
                left:${e.clientX + (Math.random()-.5)*8}px; top:${e.clientY + (Math.random()-.5)*8}px;
                width:${sz}px; height:${sz}px;
                background:radial-gradient(circle,${col},transparent 70%);
                box-shadow:0 0 ${sz*2}px ${col};
                animation:mouseParticleFade ${dur}s ease forwards;
                --dx:${(Math.random()-.5)*40}px; --dy:${(Math.random()-.5)*40-10}px; --op:${op};
            `;
            document.body.appendChild(el);
            setTimeout(() => el.remove(), dur * 1000);
        }
    };
    document.addEventListener('mousemove', mouseEffectHandler);
}

// ==================== 朝阳初升主题 ====================
function initSunriseEffects() {
    // 阳光射线
    createSunbeams();

    // 间歇粒子光斑（飘浮金色光点）
    themeEffectIntervals.push(setInterval(() => {
        if (document.querySelectorAll('.theme-effect-el.sun-mote').length < 12) {
            createSunMote();
        }
    }, 1500));

    // 鸟鸣
    themeEffectIntervals.push(setInterval(() => {
        if (Math.random() > 0.5) playBirdChirp();
    }, 6000));
    themeEffectTimeouts.push(setTimeout(() => playBirdChirp(), 1000));

    // 鼠标光线跟随 — 暖色光环
    let lastSunX = 0, lastSunY = 0;
    mouseEffectHandler = (e) => {
        const dx = e.clientX - lastSunX, dy = e.clientY - lastSunY;
        const speed = Math.sqrt(dx * dx + dy * dy);
        lastSunX = e.clientX; lastSunY = e.clientY;
        if (speed < 2) return;
        const el = document.createElement('div');
        el.className = 'theme-effect-el';
        const sz = 8 + Math.random() * 12;
        const colors = ['rgba(255,180,50,0.6)', 'rgba(255,140,0,0.5)', 'rgba(255,220,100,0.4)', 'rgba(255,100,30,0.3)'];
        const col = colors[Math.floor(Math.random() * colors.length)];
        el.style.cssText = `
            position:fixed; pointer-events:none; z-index:9999; border-radius:50%;
            left:${e.clientX}px; top:${e.clientY}px;
            width:${sz}px; height:${sz}px;
            transform:translate(-50%,-50%);
            background:radial-gradient(circle,${col},transparent 70%);
            box-shadow:0 0 ${sz}px ${col};
            animation:mouseParticleFade 0.8s ease forwards;
            --dx:${(Math.random()-.5)*20}px; --dy:${Math.random()*-20-5}px; --op:0.7;
        `;
        document.body.appendChild(el);
        setTimeout(() => el.remove(), 800);
    };
    document.addEventListener('mousemove', mouseEffectHandler);
}

function createSunbeams() {
    // 顶部发出的光线
    const container = document.createElement('div');
    container.className = 'theme-effect-el sunbeam-container';
    container.style.cssText = `
        position:fixed;top:0;left:0;right:0;bottom:0;pointer-events:none;z-index:1;overflow:hidden;
    `;
    for (let i = 0; i < 6; i++) {
        const ray = document.createElement('div');
        ray.className = 'sunbeam theme-effect-el';
        const angle = -30 + i * 12 + Math.random() * 8;
        const width = 60 + Math.random() * 80;
        ray.style.cssText = `
            position:absolute; top:-10%; right:-5%;
            width:${width}px; height:140vh;
            background:linear-gradient(180deg, rgba(255,200,60,0.15) 0%, rgba(255,180,50,0.05) 40%, transparent 80%);
            transform-origin:top right; transform:rotate(${angle}deg);
            animation:sunbeamPulse ${6+Math.random()*4}s ease-in-out infinite;
            animation-delay:${i*0.8}s; opacity:0.6;
        `;
        container.appendChild(ray);
    }
    document.body.appendChild(container);
}

function createSunMote() {
    const el = document.createElement('div');
    el.className = 'theme-effect-el sun-mote';
    const sz = 3 + Math.random() * 5;
    const x = Math.random() * window.innerWidth;
    const dur = 4 + Math.random() * 6;
    el.style.cssText = `
        position:fixed; pointer-events:none; z-index:2; border-radius:50%;
        left:${x}px; bottom:-10px;
        width:${sz}px; height:${sz}px;
        background:radial-gradient(circle, rgba(255,200,80,0.8), transparent 70%);
        box-shadow:0 0 ${sz*3}px rgba(255,180,50,0.4);
        animation:sunMoteFall ${dur}s ease-in forwards;
    `;
    document.body.appendChild(el);
    setTimeout(() => el.remove(), dur * 1000);
}

// ==================== 草地主题 ====================
function initMeadowEffects() {
    // 飘叶
    themeEffectIntervals.push(setInterval(() => {
        if (document.querySelectorAll('.fallen-leaf').length < 8) {
            createFallenLeaf();
        }
    }, 2000));
    for (let i = 0; i < 4; i++) {
        themeEffectTimeouts.push(setTimeout(() => createFallenLeaf(), i * 500));
    }

    // 萤火虫
    themeEffectIntervals.push(setInterval(() => {
        if (document.querySelectorAll('.firefly').length < 10) {
            createFirefly();
        }
    }, 2500));
    for (let i = 0; i < 6; i++) {
        themeEffectTimeouts.push(setTimeout(() => createFirefly(), i * 400));
    }

    // 虫鸣
    themeEffectIntervals.push(setInterval(() => {
        if (Math.random() > 0.4) playCricketSound();
    }, 5000));
    themeEffectTimeouts.push(setTimeout(() => playCricketSound(), 2000));

    // 鼠标 — 叶片跟随
    let lastMX = 0, lastMY = 0;
    mouseEffectHandler = (e) => {
        const dx = e.clientX - lastMX, dy = e.clientY - lastMY;
        const speed = Math.sqrt(dx * dx + dy * dy);
        lastMX = e.clientX; lastMY = e.clientY;
        if (speed < 3) return;
        const el = document.createElement('div');
        el.className = 'theme-effect-el';
        const leaves = ['🍃', '🌿', '☘️', '🍂'];
        el.textContent = leaves[Math.floor(Math.random() * leaves.length)];
        const sz = 10 + Math.random() * 8;
        el.style.cssText = `
            position:fixed; pointer-events:none; z-index:9999;
            left:${e.clientX}px; top:${e.clientY}px;
            font-size:${sz}px;
            animation:leafDrift 1.2s ease forwards;
            --dx:${(Math.random()-.5)*30}px; --dy:${Math.random()*-30-10}px;
        `;
        document.body.appendChild(el);
        setTimeout(() => el.remove(), 1200);
    };
    document.addEventListener('mousemove', mouseEffectHandler);
}

function createFallenLeaf() {
    const el = document.createElement('div');
    el.className = 'theme-effect-el fallen-leaf';
    const leaves = ['🍃', '🌿', '🍂', '🍁'];
    el.textContent = leaves[Math.floor(Math.random() * leaves.length)];
    const x = Math.random() * window.innerWidth;
    const dur = 6 + Math.random() * 6;
    el.style.cssText = `
        position:fixed; pointer-events:none; z-index:2;
        left:${x}px; top:-30px;
        font-size:${14 + Math.random()*10}px;
        animation:leafFall ${dur}s linear forwards;
        --sway:${(Math.random()-.5)*200}px;
    `;
    document.body.appendChild(el);
    setTimeout(() => el.remove(), dur * 1000);
}

function createFirefly() {
    const el = document.createElement('div');
    el.className = 'theme-effect-el firefly';
    const sz = 4 + Math.random() * 4;
    const x = Math.random() * window.innerWidth;
    const y = Math.random() * window.innerHeight;
    const dur = 4 + Math.random() * 6;
    el.style.cssText = `
        position:fixed; pointer-events:none; z-index:2; border-radius:50%;
        left:${x}px; top:${y}px;
        width:${sz}px; height:${sz}px;
        background:radial-gradient(circle, rgba(180,255,80,0.9), transparent 70%);
        box-shadow:0 0 ${sz*3}px rgba(180,255,80,0.6);
        animation:fireflyFloat ${dur}s ease-in-out infinite;
        --fx:${(Math.random()-.5)*100}px; --fy:${(Math.random()-.5)*80}px;
    `;
    document.body.appendChild(el);
    setTimeout(() => el.remove(), dur * 2 * 1000);
}

// ==================== 雨天主题 ====================
function initRainEffects() {
    // 雨滴
    themeEffectIntervals.push(setInterval(() => {
        for (let i = 0; i < 3; i++) createRaindrop();
    }, 100));

    // 雨声
    themeAudio = playRainSound();

    // 鼠标 — 涟漪
    mouseEffectHandler = (e) => {
        const el = document.createElement('div');
        el.className = 'theme-effect-el';
        el.style.cssText = `
            position:fixed; pointer-events:none; z-index:9999;
            left:${e.clientX}px; top:${e.clientY}px;
            width:0; height:0; border-radius:50%;
            border:2px solid rgba(150,200,255,0.5);
            transform:translate(-50%,-50%);
            animation:rippleExpand 0.8s ease-out forwards;
        `;
        document.body.appendChild(el);
        setTimeout(() => el.remove(), 800);
    };
    // 低频触发涟漪
    let rippleThrottle = 0;
    trailEffectHandler = mouseEffectHandler;
    mouseEffectHandler = (e) => {
        rippleThrottle++;
        if (rippleThrottle % 8 === 0) trailEffectHandler(e);
    };
    document.addEventListener('mousemove', mouseEffectHandler);
}

function createRaindrop() {
    const el = document.createElement('div');
    el.className = 'theme-effect-el raindrop';
    const x = Math.random() * window.innerWidth;
    const dur = 0.5 + Math.random() * 0.5;
    const len = 15 + Math.random() * 20;
    el.style.cssText = `
        position:fixed; pointer-events:none; z-index:2;
        left:${x}px; top:-${len}px;
        width:1.5px; height:${len}px;
        background:linear-gradient(180deg, transparent, rgba(150,200,255,0.6));
        animation:raindropFall ${dur}s linear forwards;
    `;
    document.body.appendChild(el);
    setTimeout(() => el.remove(), dur * 1000);
}

// ==================== 雪天主题 ====================
function initSnowEffects() {
    // 飘雪
    themeEffectIntervals.push(setInterval(() => {
        if (document.querySelectorAll('.snowflake').length < 60) {
            createSnowflake();
        }
    }, 200));
    for (let i = 0; i < 30; i++) {
        themeEffectTimeouts.push(setTimeout(() => createSnowflake(), i * 100));
    }

    // 风声
    themeAudio = playWindSound();

    // 偶尔铃声
    themeEffectIntervals.push(setInterval(() => {
        if (Math.random() > 0.6) playSnowChime();
    }, 8000));

    // 鼠标 — 雪花飘散跟随
    let lastSnowX = 0, lastSnowY = 0;
    mouseEffectHandler = (e) => {
        const dx = e.clientX - lastSnowX, dy = e.clientY - lastSnowY;
        const speed = Math.sqrt(dx * dx + dy * dy);
        lastSnowX = e.clientX; lastSnowY = e.clientY;
        if (speed < 2) return;
        const el = document.createElement('div');
        el.className = 'theme-effect-el';
        const flakes = ['❄', '❅', '❆', '✻', '✼'];
        el.textContent = flakes[Math.floor(Math.random() * flakes.length)];
        const sz = 8 + Math.random() * 10;
        el.style.cssText = `
            position:fixed; pointer-events:none; z-index:9999;
            left:${e.clientX}px; top:${e.clientY}px;
            font-size:${sz}px; color:rgba(255,255,255,0.8);
            text-shadow:0 0 6px rgba(200,220,255,0.6);
            animation:snowMouseDrift 1.5s ease forwards;
            --sdx:${(Math.random()-.5)*40}px; --sdy:${Math.random()*30+10}px;
        `;
        document.body.appendChild(el);
        setTimeout(() => el.remove(), 1500);
    };
    document.addEventListener('mousemove', mouseEffectHandler);
}

function createSnowflake() {
    const el = document.createElement('div');
    el.className = 'theme-effect-el snowflake';
    const flakes = ['❄', '❅', '❆', '✻', '•'];
    el.textContent = flakes[Math.floor(Math.random() * flakes.length)];
    const x = Math.random() * window.innerWidth;
    const sz = 8 + Math.random() * 14;
    const dur = 4 + Math.random() * 6;
    el.style.cssText = `
        position:fixed; pointer-events:none; z-index:2;
        left:${x}px; top:-20px;
        font-size:${sz}px; color:rgba(255,255,255,0.7);
        text-shadow:0 0 4px rgba(200,220,255,0.4);
        animation:snowFall ${dur}s linear forwards;
        --snowSway:${(Math.random()-.5)*150}px;
    `;
    document.body.appendChild(el);
    setTimeout(() => el.remove(), dur * 1000);
}

// ==================== 注入主题动画 CSS ====================
const themeAnimStyle = document.createElement('style');
themeAnimStyle.textContent = `
    /* 已有的粒子动画 */
    @keyframes mouseParticleFade {
        0%   { transform:translate(-50%,-50%) scale(1); opacity:var(--op,0.9); }
        100% { transform:translate(calc(-50% + var(--dx,0px)),calc(-50% + var(--dy,0px))) scale(0); opacity:0; }
    }

    /* 阳光射线脉动 */
    @keyframes sunbeamPulse {
        0%,100% { opacity:0.3; }
        50%     { opacity:0.7; }
    }
    /* 阳光金色光点上升 */
    @keyframes sunMoteFall {
        0%   { transform:translateY(0) translateX(0); opacity:0; }
        10%  { opacity:0.8; }
        100% { transform:translateY(-100vh) translateX(var(--sway,30px)); opacity:0; }
    }

    /* 叶片飘落 */
    @keyframes leafFall {
        0%   { transform:translateY(0) translateX(0) rotate(0deg); opacity:0.9; }
        100% { transform:translateY(110vh) translateX(var(--sway,50px)) rotate(720deg); opacity:0; }
    }
    /* 鼠标叶片飘散 */
    @keyframes leafDrift {
        0%   { transform:translate(-50%,-50%) scale(1) rotate(0deg); opacity:0.9; }
        100% { transform:translate(calc(-50% + var(--dx,0px)),calc(-50% + var(--dy,0px))) scale(0.3) rotate(180deg); opacity:0; }
    }

    /* 萤火虫 */
    @keyframes fireflyFloat {
        0%,100% { transform:translate(0,0); opacity:0.2; }
        25%     { transform:translate(var(--fx,30px),var(--fy,-20px)); opacity:0.9; }
        50%     { transform:translate(calc(var(--fx,30px)*-0.5),calc(var(--fy,-20px)*0.5)); opacity:0.3; }
        75%     { transform:translate(calc(var(--fx,30px)*0.3),calc(var(--fy,-20px)*-0.8)); opacity:0.8; }
    }

    /* 雨滴 */
    @keyframes raindropFall {
        0%   { transform:translateY(0); opacity:0.7; }
        100% { transform:translateY(110vh); opacity:0.2; }
    }
    /* 鼠标涟漪 */
    @keyframes rippleExpand {
        0%   { width:0; height:0; opacity:0.6; border-width:2px; }
        100% { width:60px; height:60px; opacity:0; border-width:1px; }
    }

    /* 雪花飘落 */
    @keyframes snowFall {
        0%   { transform:translateY(0) translateX(0) rotate(0deg); opacity:0.8; }
        100% { transform:translateY(110vh) translateX(var(--snowSway,50px)) rotate(360deg); opacity:0.1; }
    }
    /* 鼠标雪花飘散 */
    @keyframes snowMouseDrift {
        0%   { transform:translate(-50%,-50%) scale(1); opacity:0.9; }
        100% { transform:translate(calc(-50% + var(--sdx,0px)),calc(-50% + var(--sdy,20px))) scale(0.2); opacity:0; }
    }
`;
document.head.appendChild(themeAnimStyle);
