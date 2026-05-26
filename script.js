/* =============================================================
 * 신해원 포트폴리오 — 공통 자바스크립트
 * 광운대학교 인터넷활용 / 2026
 * -------------------------------------------------------------
 *  목차 (모든 페이지에서 같은 파일을 사용하지만,
 *        해당 요소가 없는 페이지에선 자동으로 건너뜁니다.)
 *
 *   1. 푸터 연도 자동 표시
 *   2. 현재 페이지 네비게이션 강조
 *   3. 히어로 타이핑 애니메이션 (Home 전용)
 *   4. 스크롤 시 요소 페이드인 (IntersectionObserver)
 *   5. 컨택트 폼 — 유효성 검사 + mailto 전송
 * ============================================================= */


/* DOMContentLoaded: 문서 구조가 모두 로드된 뒤 스크립트를 실행합니다.
   이렇게 해야 아래에서 querySelector 로 요소를 찾을 때 null 이 안 나옵니다. */
document.addEventListener('DOMContentLoaded', function () {

    /* ===== 1. 푸터 연도 자동 표시 ============================ */
    // 매년 footer 의 연도를 직접 수정하지 않아도 되도록 자동화합니다.
    var yearEl = document.getElementById('year');
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }


    /* ===== 2. 현재 페이지 네비 active 표시 ==================== */
    // location.pathname 으로 현재 파일명을 얻고,
    // primary-nav 안의 a 태그 중 href 가 일치하는 것에 .is-active 부여.
    var currentFile = location.pathname.split('/').pop() || 'index.html';
    var navLinks = document.querySelectorAll('.primary-nav a');

    navLinks.forEach(function (link) {
        var linkFile = link.getAttribute('href');
        if (linkFile === currentFile) {
            link.classList.add('is-active');
            link.setAttribute('aria-current', 'page'); // 스크린리더용
        }
    });


    /* ===== 3. 히어로 타이핑 애니메이션 ======================== */
    // #typed 요소가 있는 경우(=Home 페이지)에만 실행.
    // 여러 단어를 순차적으로 타이핑/삭제하여 다양한 정체성을 어필합니다.
    var typedEl = document.getElementById('typed');
    if (typedEl) {
        var roles = [
            'ERP 개발자',
            'SAP 컨설턴트',
            'Business Developer',
            '경영학도'
        ];

        var roleIdx = 0;     // 현재 표시 중인 단어 번호
        var charIdx = 0;     // 현재 글자 위치
        var isDeleting = false;
        var TYPE_SPEED  = 110;   // 타이핑 속도 (ms)
        var ERASE_SPEED = 60;    // 지우기 속도 (ms)
        var HOLD_TIME   = 1600;  // 다 친 뒤 잠깐 멈추는 시간

        function tick() {
            var word = roles[roleIdx];

            if (isDeleting) {
                // 한 글자씩 지우는 중
                charIdx--;
                typedEl.textContent = word.slice(0, charIdx);

                if (charIdx === 0) {
                    isDeleting = false;
                    roleIdx = (roleIdx + 1) % roles.length;
                    setTimeout(tick, 300);
                    return;
                }
                setTimeout(tick, ERASE_SPEED);
            } else {
                // 한 글자씩 타이핑하는 중
                charIdx++;
                typedEl.textContent = word.slice(0, charIdx);

                if (charIdx === word.length) {
                    isDeleting = true;
                    setTimeout(tick, HOLD_TIME);
                    return;
                }
                setTimeout(tick, TYPE_SPEED);
            }
        }

        // 사용자가 prefers-reduced-motion 설정을 켜둔 경우엔 첫 단어만 표시.
        var prefersReducedMotion = window.matchMedia(
            '(prefers-reduced-motion: reduce)'
        ).matches;

        if (prefersReducedMotion) {
            typedEl.textContent = roles[0];
        } else {
            tick();
        }
    }


    /* ===== 4. 스크롤 페이드인 (IntersectionObserver) ========== */
    // 화면에 보일 때마다 .is-visible 클래스 부여 → CSS가 페이드/슬라이드 처리.
    // IntersectionObserver 는 'scroll 이벤트 + 위치 계산'을 대체하는 최신 API로
    // 성능이 좋고 코드가 간결합니다.
    var fadeTargets = document.querySelectorAll('.fade-in');

    if (fadeTargets.length > 0 && 'IntersectionObserver' in window) {
        var io = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    io.unobserve(entry.target); // 한 번만 실행
                }
            });
        }, {
            threshold: 0.12,
            rootMargin: '0px 0px -40px 0px'
        });

        fadeTargets.forEach(function (el) { io.observe(el); });
    } else {
        // 구형 브라우저 폴백 — 그냥 모두 보이게 처리
        fadeTargets.forEach(function (el) { el.classList.add('is-visible'); });
    }


    /* ===== 5. 컨택트 폼 — 유효성 검사 + mailto ================ */
    // contact.html 에만 존재하는 폼.
    // submit 시 → 클라이언트단 검증 → 통과하면 mailto: 링크로 메일 클라이언트 실행.
    var contactForm = document.getElementById('contact-form');
    if (contactForm) {

        var formResult = document.getElementById('form-result');
        var TARGET_EMAIL = 'win737449@gmail.com';

        // 이메일 형식 정규식 (간이형 — 학습용 충분 수준)
        var EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        contactForm.addEventListener('submit', function (e) {
            e.preventDefault(); // 기본 페이지 이동 막기

            // 입력값 가져오기
            var nameInput    = document.getElementById('field-name');
            var emailInput   = document.getElementById('field-email');
            var subjectInput = document.getElementById('field-subject');
            var messageInput = document.getElementById('field-message');

            var name    = nameInput.value.trim();
            var email   = emailInput.value.trim();
            var subject = subjectInput.value.trim();
            var message = messageInput.value.trim();

            // 이전 에러 초기화
            clearAllErrors();

            // 검증 — 통과 못한 항목이 있으면 hasError = true
            var hasError = false;

            if (name === '') {
                showError('field-name', '이름을 입력해 주세요.');
                hasError = true;
            }

            if (email === '') {
                showError('field-email', '이메일을 입력해 주세요.');
                hasError = true;
            } else if (!EMAIL_REGEX.test(email)) {
                showError('field-email', '올바른 이메일 형식이 아닙니다.');
                hasError = true;
            }

            if (message === '') {
                showError('field-message', '메시지를 입력해 주세요.');
                hasError = true;
            } else if (message.length < 10) {
                showError('field-message', '메시지는 10자 이상 입력해 주세요.');
                hasError = true;
            }

            if (hasError) return;

            // 검증 통과 → mailto URL 만들기
            // encodeURIComponent 로 한글/특수문자 깨짐 방지
            var mailSubject = subject || '[Portfolio] ' + name + '님의 메시지';
            var mailBody = ''
                + '보낸 사람: ' + name + '\n'
                + '회신 이메일: ' + email + '\n\n'
                + '─────────────────────\n\n'
                + message;

            var mailto = 'mailto:' + TARGET_EMAIL
                + '?subject=' + encodeURIComponent(mailSubject)
                + '&body='    + encodeURIComponent(mailBody);

            // 사용자의 기본 메일 클라이언트 실행
            window.location.href = mailto;

            // 화면에 성공 메시지 표시 + 폼 초기화
            if (formResult) {
                formResult.textContent =
                    '✓ 메일 클라이언트가 열렸습니다. 보내기 버튼을 눌러 전송을 완료해 주세요.';
                formResult.classList.add('is-success');
            }
            contactForm.reset();
        });

        // ----- 헬퍼 함수 -----
        function showError(fieldId, msg) {
            var field = document.getElementById(fieldId);
            var row = field.closest('.form-row');
            row.classList.add('has-error');
            var errEl = row.querySelector('.form-error');
            if (errEl) errEl.textContent = msg;
        }

        function clearAllErrors() {
            var rows = contactForm.querySelectorAll('.form-row');
            rows.forEach(function (row) {
                row.classList.remove('has-error');
                var errEl = row.querySelector('.form-error');
                if (errEl) errEl.textContent = '';
            });
            if (formResult) {
                formResult.textContent = '';
                formResult.classList.remove('is-success');
            }
        }

        // 입력 중에 에러 메시지 자동으로 지우기 (UX 개선)
        contactForm.querySelectorAll('input, textarea').forEach(function (el) {
            el.addEventListener('input', function () {
                var row = el.closest('.form-row');
                if (row.classList.contains('has-error')) {
                    row.classList.remove('has-error');
                    var errEl = row.querySelector('.form-error');
                    if (errEl) errEl.textContent = '';
                }
            });
        });
    }

}); // end of DOMContentLoaded

/* ===== 6. Portfolio 검색 / 정렬 / 카테고리 필터 ================ */
document.addEventListener('DOMContentLoaded', function () {
    var projectGrid = document.getElementById('project-grid');
    if (!projectGrid) return;

    var cards = Array.prototype.slice.call(projectGrid.querySelectorAll('.project-card'));
    var searchInput = document.getElementById('project-search');
    var sortSelect = document.getElementById('project-sort');
    var categoryButtons = document.querySelectorAll('[data-category-filter]');
    var emptyText = document.getElementById('portfolio-empty');
    var currentCategory = 'all';

    function normalize(text) {
        return (text || '').toString().toLowerCase().replace(/\s+/g, ' ').trim();
    }

    function getSearchText(card) {
        return normalize([
            card.dataset.title,
            card.dataset.category,
            card.dataset.date,
            card.textContent
        ].join(' '));
    }

    function dateValue(card) {
        var value = card.dataset.date || '1900-01-01';
        var parts = value.split('-');
        var year = Number(parts[0]) || 1900;
        var month = Number(parts[1] || 1) - 1;
        var day = Number(parts[2] || 1);
        return new Date(year, month, day).getTime();
    }

    function orderValue(card) {
        return Number(card.dataset.order || 999);
    }

    function sortCards(mode) {
        var sorted = cards.slice().sort(function (a, b) {
            var diff = dateValue(b) - dateValue(a);
            if (mode === 'oldest') diff = diff * -1;
            if (diff !== 0) return diff;
            return orderValue(a) - orderValue(b);
        });

        sorted.forEach(function (card) {
            projectGrid.appendChild(card);
        });
    }

    function renderProjects() {
        var query = normalize(searchInput ? searchInput.value : '');
        var visibleCount = 0;

        sortCards(sortSelect ? sortSelect.value : 'latest');

        cards.forEach(function (card) {
            var categoryMatch = currentCategory === 'all' || card.dataset.category === currentCategory;
            var searchMatch = query === '' || getSearchText(card).indexOf(query) !== -1;
            var isVisible = categoryMatch && searchMatch;

            card.classList.toggle('is-hidden', !isVisible);
            if (isVisible) visibleCount++;
        });


        if (emptyText) {
            emptyText.hidden = visibleCount !== 0;
        }
    }

    categoryButtons.forEach(function (button) {
        button.addEventListener('click', function () {
            currentCategory = button.dataset.categoryFilter;
            categoryButtons.forEach(function (btn) { btn.classList.remove('is-active'); });
            button.classList.add('is-active');
            renderProjects();
        });
    });

    if (searchInput) {
        searchInput.addEventListener('input', renderProjects);
    }

    if (sortSelect) {
        sortSelect.addEventListener('change', renderProjects);
    }

    renderProjects();
});


/* ===== 7. DOM Style Lab — 스타일 선택 / 미리보기 ================ */
document.addEventListener('DOMContentLoaded', function () {
    var target = document.getElementById('style-target');
    if (!target) return;

    var textInput = document.getElementById('style-text-input');
    var fontSelect = document.getElementById('font-select');
    var sizeSelect = document.getElementById('font-size-select');
    var colorSelect = document.getElementById('text-color-select');
    var bgSelect = document.getElementById('bg-color-select');
    var weightSelect = document.getElementById('weight-select');
    var alignSelect = document.getElementById('align-select');
    var applyBtn = document.getElementById('apply-style-btn');
    var resetBtn = document.getElementById('reset-style-btn');
    var toggleBtn = document.getElementById('toggle-target-btn');
    var isHidden = false;

    function applyStyle() {
        target.textContent = textInput && textInput.value.trim()
            ? textInput.value.trim()
            : '문장을 입력해 주세요.';
        target.style.fontFamily = fontSelect ? fontSelect.value : 'var(--font-sans)';
        target.style.fontSize = sizeSelect ? sizeSelect.value : '20px';
        target.style.color = colorSelect ? colorSelect.value : 'var(--text)';
        target.style.backgroundColor = bgSelect ? bgSelect.value : 'var(--surface)';
        target.style.fontWeight = weightSelect ? weightSelect.value : '400';
        target.style.textAlign = alignSelect ? alignSelect.value : 'center';
    }

    function resetStyle() {
        if (textInput) textInput.value = '이 문장의 스타일을 원하는 대로 바꿔보세요!';
        if (fontSelect) fontSelect.value = 'var(--font-sans)';
        if (sizeSelect) sizeSelect.value = '20px';
        if (colorSelect) colorSelect.value = 'var(--text)';
        if (bgSelect) bgSelect.value = 'var(--surface)';
        if (weightSelect) weightSelect.value = '400';
        if (alignSelect) alignSelect.value = 'center';
        target.style.display = 'block';
        isHidden = false;
        if (toggleBtn) toggleBtn.textContent = '숨기기';
        applyStyle();
    }

    [textInput, fontSelect, sizeSelect, colorSelect, bgSelect, weightSelect, alignSelect].forEach(function (control) {
        if (!control) return;
        control.addEventListener('input', applyStyle);
        control.addEventListener('change', applyStyle);
    });

    if (applyBtn) applyBtn.addEventListener('click', applyStyle);
    if (resetBtn) resetBtn.addEventListener('click', resetStyle);

    if (toggleBtn) {
        toggleBtn.addEventListener('click', function () {
            target.style.display = isHidden ? 'block' : 'none';
            toggleBtn.textContent = isHidden ? '숨기기' : '보이기';
            isHidden = !isHidden;
        });
    }

    applyStyle();
});

/* ===== 8. Contact Guestbook — 댓글 추가 / 삭제 ================ */
document.addEventListener('DOMContentLoaded', function () {
    var guestbookForm = document.getElementById('guestbook-form');
    if (!guestbookForm) return;

    var nameInput = document.getElementById('comment-name');
    var messageInput = document.getElementById('comment-message');
    var commentList = document.getElementById('comment-list');
    var commentCount = document.getElementById('comment-count');
    var clearBtn = document.getElementById('clear-comments');
    var resultEl = document.getElementById('guestbook-result');
    var STORAGE_KEY = 'shw-guestbook-comments';

    function getSavedComments() {
        try {
            return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
        } catch (error) {
            return [];
        }
    }

    function saveComments(comments) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(comments));
    }

    function updateCount() {
        var count = commentList ? commentList.children.length : 0;
        if (commentCount) commentCount.textContent = count + '개 댓글';
    }

    function formatCount(value) {
        return Number(value || 0).toString();
    }

    function updateStoredComment(id, updater) {
        var comments = getSavedComments().map(function (saved) {
            if (saved.id !== id) return saved;
            return updater(saved);
        });
        saveComments(comments);
    }

    function makeCommentItem(comment) {
        comment.likes = Number(comment.likes || 0);
        comment.dislikes = Number(comment.dislikes || 0);

        var item = document.createElement('li');
        item.className = 'comment-item';
        item.dataset.commentId = comment.id;

        var body = document.createElement('div');
        body.className = 'comment-body';

        var meta = document.createElement('p');
        meta.className = 'comment-meta';
        meta.textContent = comment.name + ' · ' + comment.date;

        var text = document.createElement('p');
        text.className = 'comment-text';
        text.textContent = comment.message;

        var actions = document.createElement('div');
        actions.className = 'comment-actions';

        var likeBtn = document.createElement('button');
        likeBtn.type = 'button';
        likeBtn.className = 'comment-reaction';
        likeBtn.textContent = '좋아요 ' + formatCount(comment.likes);

        var dislikeBtn = document.createElement('button');
        dislikeBtn.type = 'button';
        dislikeBtn.className = 'comment-reaction';
        dislikeBtn.textContent = '싫어요 ' + formatCount(comment.dislikes);

        var deleteBtn = document.createElement('button');
        deleteBtn.type = 'button';
        deleteBtn.className = 'comment-delete';
        deleteBtn.textContent = '삭제';

        likeBtn.addEventListener('click', function () {
            comment.likes += 1;
            likeBtn.textContent = '좋아요 ' + formatCount(comment.likes);
            updateStoredComment(comment.id, function (saved) {
                saved.likes = Number(saved.likes || 0) + 1;
                return saved;
            });
        });

        dislikeBtn.addEventListener('click', function () {
            comment.dislikes += 1;
            dislikeBtn.textContent = '싫어요 ' + formatCount(comment.dislikes);
            updateStoredComment(comment.id, function (saved) {
                saved.dislikes = Number(saved.dislikes || 0) + 1;
                return saved;
            });
        });

        deleteBtn.addEventListener('click', function () {
            if (commentList && item.parentNode === commentList) {
                commentList.removeChild(item);
            }
            var comments = getSavedComments().filter(function (saved) {
                return saved.id !== comment.id;
            });
            saveComments(comments);
            updateCount();
            if (resultEl) resultEl.textContent = '댓글을 삭제했습니다.';
        });

        body.appendChild(meta);
        body.appendChild(text);
        actions.appendChild(likeBtn);
        actions.appendChild(dislikeBtn);
        actions.appendChild(deleteBtn);
        item.appendChild(body);
        item.appendChild(actions);
        return item;
    }

    function renderComments() {
        if (!commentList) return;
        commentList.innerHTML = '';
        getSavedComments().forEach(function (comment) {
            commentList.appendChild(makeCommentItem(comment));
        });
        updateCount();
    }

    guestbookForm.addEventListener('submit', function (e) {
        e.preventDefault();

        var name = nameInput.value.trim();
        var message = messageInput.value.trim();

        if (!name || !message) {
            if (resultEl) resultEl.textContent = '이름과 댓글을 모두 입력해 주세요.';
            return;
        }

        var comment = {
            id: 'comment-' + Date.now(),
            name: name,
            message: message,
            date: new Date().toLocaleString('ko-KR', { dateStyle: 'medium', timeStyle: 'short' }),
            likes: 0,
            dislikes: 0
        };

        var comments = getSavedComments();
        comments.unshift(comment);
        saveComments(comments);

        if (commentList) {
            commentList.insertBefore(makeCommentItem(comment), commentList.firstChild);
        }

        guestbookForm.reset();
        updateCount();
        if (resultEl) resultEl.textContent = '댓글이 추가되었습니다.';
    });

    if (clearBtn) {
        clearBtn.addEventListener('click', function () {
            if (!commentList || commentList.children.length === 0) {
                if (resultEl) resultEl.textContent = '삭제할 댓글이 없습니다.';
                return;
            }
            while (commentList.firstChild) {
                commentList.removeChild(commentList.firstChild);
            }
            saveComments([]);
            updateCount();
            if (resultEl) resultEl.textContent = '모든 댓글을 삭제했습니다.';
        });
    }

    renderComments();
});
