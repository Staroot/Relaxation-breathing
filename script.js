const mainScreen = document.getElementById('main-screen');
const breathScreen = document.getElementById('breath-screen');
const btnStress = document.getElementById('btn-stress');
const btnBack = document.getElementById('btn-back');
const dot = document.getElementById('breathing-dot');
const textEl = document.getElementById('instruction-text');

let breathInterval;
const phases = ['들이쉬기', '참기', '내쉬기', '참기'];

// 화면 전환 및 호흡 시작
btnStress.addEventListener('click', () => {
    mainScreen.style.opacity = '0';
    
    setTimeout(() => {
        mainScreen.style.display = 'none';
        breathScreen.style.display = 'flex';
        
        setTimeout(() => {
            breathScreen.style.opacity = '1';
            startBreathingCycle();
        }, 50);
    }, 500);
});

// 타이머 및 텍스트 교체 로직
function startBreathingCycle() {
    let step = 0;
    textEl.innerText = phases[step];
    
    // 점 애니메이션 시작
    dot.style.animationPlayState = 'running';

    // 4초 단위 텍스트 변경
    breathInterval = setInterval(() => {
        textEl.classList.add('fade-out');
        
        setTimeout(() => {
            step = (step + 1) % phases.length;
            textEl.innerText = phases[step];
            textEl.classList.remove('fade-out');
        }, 500);
        
    }, 4000);
}

// 메인 화면으로 복귀
btnBack.addEventListener('click', () => {
    // 타이머 및 애니메이션 초기화
    clearInterval(breathInterval);
    dot.style.animationPlayState = 'paused';
    dot.style.animation = 'none'; 
    void dot.offsetWidth; // 리플로우 강제 (애니메이션 재시작을 위함)
    dot.style.animation = 'moveAroundBox 16s linear infinite';
    dot.style.animationPlayState = 'paused';

    breathScreen.style.opacity = '0';
    
    setTimeout(() => {
        breathScreen.style.display = 'none';
        mainScreen.style.display = 'flex';
        setTimeout(() => {
            mainScreen.style.opacity = '1';
        }, 50);
    }, 500);
});
