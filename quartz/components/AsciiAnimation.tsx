import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"

const AsciiAnimation: QuartzComponent = ({ fileData }: QuartzComponentProps) => {
  if (fileData.slug !== "index") {
    return <></>
  }

  const scriptContent = `
    (function () {
      const CONFIG = {
        cols: 50,
        rows: 25,
        
        // [속도 설정] 숫자가 작을수록 빠릅니다 (ms 단위)
        minSpeed: 20,  // 가장 빠른 비의 속도
        maxSpeed: 80, // 가장 느린 비의 속도
        
        fadingTime: '1.5s', 
        
        // [확률 설정] 1에 가까울수록 비가 덜 옵니다 (간헐적)
        rainChance: 0.99, 

        // 색상 설정
        brightColor: '#ccffcc', 
        glowColor: '#91ff00ff',   
        baseColor: '#000000',   
        
        chars: "アァカサタナハマヤラワ0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ"
      };

      let animationFrameId;

      function initMatrix() {
        const pre = document.getElementById("matrix-container");
        if (!pre) {
          animationFrameId = requestAnimationFrame(initMatrix);
          return;
        }
        setupDOM(pre);
        startAnimation();
      }

      function setupDOM(pre) {
        pre.innerHTML = '';
        
        const style = document.createElement('style');
        style.textContent = \`
          #matrix-grid {
            display: grid;
            grid-template-columns: repeat(\${CONFIG.cols}, 1fr);
            width: 100%;
            height: 100%;
          }
          .matrix-cell {
            text-align: center;
            font-family: 'Consolas', 'Monaco', monospace;
            font-weight: bold;
            color: \${CONFIG.baseColor};
            text-shadow: none;
            /* 꼬리가 사라지는 속도 */
            transition: color \${CONFIG.fadingTime} ease-out, text-shadow \${CONFIG.fadingTime} ease-out;
          }
          .matrix-cell.bright-head {
            color: \${CONFIG.brightColor};
            text-shadow: 0 0 8px \${CONFIG.glowColor}, 0 0 12px \${CONFIG.glowColor};
            transition: none; 
          }
        \`;
        pre.appendChild(style);

        const grid = document.createElement('div');
        grid.id = 'matrix-grid';

        for (let y = 0; y < CONFIG.rows; y++) {
          for (let x = 0; x < CONFIG.cols; x++) {
            const span = document.createElement('span');
            span.className = 'matrix-cell';
            span.id = \`mtx-\${x}-\${y}\`;
            span.textContent = CONFIG.chars[Math.floor(Math.random() * CONFIG.chars.length)];
            grid.appendChild(span);
          }
        }
        pre.appendChild(grid);
      }

      function startAnimation() {
        // [핵심 변경] drops 배열이 단순 위치가 아니라 '객체'를 담습니다.
        // { y: 현재위치, speed: 이 줄의 속도, lastMove: 마지막 움직인 시간 }
        const drops = Array(CONFIG.cols).fill(0).map(() => ({
          y: Math.floor(Math.random() * CONFIG.rows * -1),
          speed: Math.random() * (CONFIG.maxSpeed - CONFIG.minSpeed) + CONFIG.minSpeed,
          lastMove: 0
        }));

        function render(currentTime) {
          // 전역 타이머(throttle)를 제거하고 각 열별로 시간을 체크합니다.
          
          for (let x = 0; x < CONFIG.cols; x++) {
            const drop = drops[x];

            // 이 열(column)이 움직일 시간이 되었는지 확인
            if (currentTime - drop.lastMove < drop.speed) {
              continue; // 아직 때가 아니면 건너뜀
            }
            
            // 움직일 시간이 됨 -> 시간 갱신
            drop.lastMove = currentTime;
            
            const currentY = drop.y;

            // 1. 지나간 자리 끄기
            if (currentY >= 0 && currentY < CONFIG.rows) {
               const prevSpan = document.getElementById(\`mtx-\${x}-\${currentY}\`);
               if (prevSpan) prevSpan.classList.remove('bright-head');
            }

            // 2. 새 위치 켜기
            const nextY = currentY + 1;
            if (nextY >= 0 && nextY < CONFIG.rows) {
              const span = document.getElementById(\`mtx-\${x}-\${nextY}\`);
              if (span) {
                span.textContent = CONFIG.chars[Math.floor(Math.random() * CONFIG.chars.length)];
                span.classList.add('bright-head');
              }
            }

            // 3. 리셋 로직 (간헐적 확률 적용 + 속도 리셋)
            // 화면 높이의 1.5배만큼 내려갔고, 랜덤 확률(rainChance)을 통과하면 리셋
            if (nextY > CONFIG.rows * 1.5 && Math.random() > CONFIG.rainChance) {
              drop.y = 0; 
              // 리셋될 때 속도도 랜덤하게 다시 배정 (지루함 방지)
              drop.speed = Math.random() * (CONFIG.maxSpeed - CONFIG.minSpeed) + CONFIG.minSpeed;
            } else {
              drop.y++;
            }
          }

          animationFrameId = requestAnimationFrame(render);
        }

        render(0);
      }

      initMatrix();
    })()
  `

  return (
    <div style={{ display: "flex", justifyContent: "center", margin: "2rem 0" }}>
      <div
        id="matrix-container"
        style={{
          backgroundColor: "#000",
          width: "100%",
          maxWidth: "800px",
          height: "500px",
          overflow: "hidden",     // 둥근 모서리 바깥으로 글자가 튀어나가지 않게 필수
          position: "relative",
          userSelect: "none",
          cursor: "default",

          borderRadius: "20px",            // 1. 모서리 둥글게 (픽셀 조절 가능)
          // border: "1px solid #003311",     // 2. 아주 은은한 어두운 초록색 테두리 (경계선 표시)
          // boxShadow: "0 0 15px rgba(0, 255, 102, 0.2)" // 3. (선택사항) 은은한 녹색 광원 효과
        }}
      >
      </div>
      <script dangerouslySetInnerHTML={{ __html: scriptContent }} />
    </div>
  )
}

export default (() => AsciiAnimation) satisfies QuartzComponentConstructor