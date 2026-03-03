const mainScreen = document.getElementById('main-screen');
const breathScreen = document.getElementById('breath-screen');
const btnStress = document.getElementById('btn-stress');
const btnBack = document.getElementById('btn-back');
const dot = document.getElementById('breathing-dot');
const textEl = document.getElementById('instruction-text');

let cycleTimeout, fadeTimeout;
let isBreathing = false;
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
    isBreathing = true;
    
    // 초기 텍스트 설정 및 애니메이션 시작
    textEl.innerText = phases[step];
    textEl.classList.remove('fade-out');
    dot.style.animationPlayState = 'running';

    function scheduleNextPhase() {
        if (!isBreathing) return;

        // 점이 변을 이동하는 4초 중 3.5초 대기 후 페이드 아웃 시작
        cycleTimeout = setTimeout(() => {
            textEl.classList.add('fade-out');
            
            // 0.5초 뒤 (정확히 모서리에 닿는 시점) 텍스트 교체 및 페이드 인
            fadeTimeout = setTimeout(() => {
                step = (step + 1) % phases.length;
                textEl.innerText = phases[step];
                textEl.classList.remove('fade-out');
                
                // 다음 사이클 예약
                scheduleNextPhase();
            }, 500);
        }, 3500); 
    }

    scheduleNextPhase();
}

// 메인 화면으로 복귀
btnBack.addEventListener('click', () => {
    // 타이머 및 상태 초기화
    isBreathing = false;
    clearTimeout(cycleTimeout);
    clearTimeout(fadeTimeout);
    textEl.classList.remove('fade-out');
    
    // 점 애니메이션 초기화
    dot.style.animationPlayState = 'paused';
    dot.style.animation = 'none'; 
    void dot.offsetWidth; // 리플로우 강제 발생
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
