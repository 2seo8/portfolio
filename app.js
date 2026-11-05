const app = document.querySelector('#app');
const projects = window.PORTFOLIO_PROJECTS;

const esc = s => String(s).replace(
  /[&<>"']/g,
  c => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  }[c])
);

const params = new URLSearchParams(location.search);
const selected = projects.find(
  p => p.slug === params.get('project')
);

function projectDiagram(p) {
  return `
    <div class="diagram"
         aria-label="${esc(p.title)} 흐름 도식">
      ${p.diagram.map((item, i) => `
        <div class="diagram-step">
          <span>${String(i + 1).padStart(2, '0')}</span>
          <b>${esc(item)}</b>
        </div>
        ${i < p.diagram.length - 1
          ? '<i aria-hidden="true">→</i>'
          : ''}
      `).join('')}
    </div>
  `;
}

function home() {
  app.innerHTML = `
    <section class="hero" id="top">
      <p class="eyebrow">FINANCE · LAW · IT</p>

      <h1>
        금융 제도와 고객의 문제를<br>
        <strong>IT의 기준</strong>으로 구체화합니다.
      </h1>

      <p class="lead">
        우리금융그룹의 청년 IT 아카데미에서
        금융 IT 실무를 학습하고 있습니다.
      </p>
    </section>

    <section class="about" id="about">
      <p class="eyebrow">ABOUT</p>

      <div class="about-grid">
        <div>
          <span>학력</span>
          <b>
            연세대학교 경영학과 졸업
            (2020.03 ~ 2025.08)
          </b>
        </div>

        <div>
          <span>교육</span>
          <b>우리WON IT 아카데미 (2026.08~)</b>
        </div>

        <div>
          <span>활동</span>
          <b>
            아시아대학생 연합 법학회 (ALSA)
            연세대 지부 (2023.09~2024.12)
          </b>
        </div>

        <div>
          <span>자격증</span>
          <b>
            전산회계 1급 (2025.12)<br>
            TOEIC 955 (2026.09)
          </b>
        </div>
      </div>

      <div class="contact-list">
        <div>
          <span>이메일</span>
          <a href="mailto:baptong123@gmail.com">
            baptong123@gmail.com
          </a>
        </div>

        <div>
          <span>GitHub</span>
          <a href="https://github.com/2seo8/portfolio">
            github.com/2seo8/portfolio
          </a>
        </div>
      </div>
    </section>

    <section class="projects" id="projects">
      <div class="section-heading">
        <p class="eyebrow">PROJECTS</p>
        <span>${projects.length}</span>
      </div>

      <div class="timeline">
        ${projects.map(p => `
          <article class="project-summary">
            <span class="timeline-dot"></span>

            <div class="project-meta">
              ${esc(p.period)} — ${esc(p.team)}
            </div>

            <h2>${esc(p.title)}</h2>
            <p>${esc(p.summary)}</p>

            <dl>
              <dt>담당</dt>
              <dd>${esc(p.role)}</dd>
              <dt>결과</dt>
              <dd>${esc(p.result)}</dd>
            </dl>

            <div class="chips">
              ${p.tags.map(t => `
                <span>${esc(t)}</span>
              `).join('')}
            </div>

            <a class="detail-link"
               href="?project=${encodeURIComponent(p.slug)}">
              자세히 보기 <span>→</span>
            </a>
          </article>
        `).join('')}
      </div>
    </section>
  `;
}

function detail(p) {
  const images = (
    p.gallery && p.gallery.length
      ? p.gallery
      : (p.image ? [p.image] : [])
  );

  let imageIndex = 0;

  const galleryMarkup = () => images.length
    ? `
      <div class="gallery-image">
        <img
          src="${esc(images[imageIndex])}"
          alt="${esc(p.title)} 자료 ${imageIndex + 1}"
        >
      </div>

      <div class="gallery-controls">
        <button id="galleryPrev"
                ${images.length < 2 ? 'disabled' : ''}>
          ← 이전
        </button>

        <span>
          ${String(imageIndex + 1).padStart(2, '0')}
          / ${String(images.length).padStart(2, '0')}
        </span>

        <button id="galleryNext"
                ${images.length < 2 ? 'disabled' : ''}>
          다음 →
        </button>
      </div>
    `
    : `
      <div class="gallery-image gallery-placeholder">
        ${projectDiagram(p)}
        <small>
          프로젝트 화면·산출물 이미지를 추가할 수 있어요
        </small>
      </div>
    `;

  app.innerHTML = `
    <a class="back-link" href="./#projects">
      ← 프로젝트 목록
    </a>

    <div class="detail-layout">
      <aside class="detail-aside">
        <p class="eyebrow">
          PROJECT / ${esc(p.number)}
        </p>

        <h1>${esc(p.title)}</h1>
        <p class="detail-summary">${esc(p.summary)}</p>

        <dl class="meta-list">
          <dt>기간</dt>
          <dd>${esc(p.period)}</dd>

          <dt>팀 구성</dt>
          <dd>${esc(p.team)}</dd>

          <dt>담당</dt>
          <dd>${esc(p.role)}</dd>

          <dt>결과</dt>
          <dd>${esc(p.result)}</dd>
        </dl>

        <div class="chips">
          ${p.tags.map(t => `
            <span>${esc(t)}</span>
          `).join('')}
        </div>

        <a class="repo-link"
           href="https://github.com/2seo8/portfolio">
          GitHub 저장소 ↗
        </a>
      </aside>

      <section class="detail-main">
        <div class="gallery-head">
          <p class="eyebrow">GALLERY</p>

          <span>
            ${images.length
              ? `${String(imageIndex + 1).padStart(2, '0')} / ${String(images.length).padStart(2, '0')}`
              : '도식 미리보기'}
          </span>
        </div>

        <div id="gallerySlot">
          ${galleryMarkup()}
        </div>

        <section class="story">
          <p class="eyebrow">CASE STUDY</p>

          ${p.sections.map((s, i) => `
            <article>
              <span class="story-no">
                ${String(i + 1).padStart(2, '0')}
              </span>

              <div>
                <h2>${esc(s[0])}</h2>
                <p>${esc(s[1])}</p>
              </div>
            </article>
          `).join('')}
        </section>
      </section>
    </div>
  `;

  if (images.length > 1) {
    const refresh = () => {
      document.querySelector('#gallerySlot').innerHTML =
        galleryMarkup();

      document.querySelector('.gallery-head span').textContent =
        `${String(imageIndex + 1).padStart(2, '0')} / ${String(images.length).padStart(2, '0')}`;

      document.querySelector('#galleryPrev')
        .addEventListener('click', () => {
          imageIndex = (
            imageIndex - 1 + images.length
          ) % images.length;

          refresh();
        });

      document.querySelector('#galleryNext')
        .addEventListener('click', () => {
          imageIndex = (imageIndex + 1) % images.length;
          refresh();
        });
    };

    refresh();
  }
}

selected ? detail(selected) : home();

document.querySelector('#themeToggle')
  .addEventListener('click', () => {
    document.body.classList.toggle('night');
  });