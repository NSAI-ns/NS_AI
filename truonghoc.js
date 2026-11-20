
/* ==========================================================================
   ADVANCED 2-TAB SCHOOL SEARCH ENGINE WITH DEBOUNCE, MULTI-FILTER & PAGINATION
   ========================================================================== */

let currentSchoolTab = 'vn'; // 'vn' | 'global'
let vnSchoolList = [];
let globalSchoolList = [];
let filteredSchoolList = [];
let currentSchoolPage = 1;
const SCHOOLS_PER_PAGE = 24; // 24 thẻ mỗi trang / chunk (chia đều lưới 2, 3, 4 cột)
let visibleSchoolCount = 24;
let schoolFilterDebounceTimer = null;

// Quản lý trạng thái lazy-load dữ liệu thế giới
let isGlobalDataLoaded = false;
let isGlobalDataLoading = false;
let globalLoadPromise = null;

// Quản lý so sánh trường học (Tối đa 3 trường)
let selectedCompareSchoolIds = [];
// Chế độ lọc chỉ xem trường yêu thích (Wishlist)
let filterOnlyFavorites = false;

/**
 * Chuẩn hóa chuỗi tiếng Việt không dấu để tìm kiếm thông minh
 */
function removeVietnameseTones(str) {
  if (!str) return '';
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd').replace(/Đ/g, 'D')
    .toLowerCase()
    .trim();
}

/**
 * Tìm trường trong dataset theo ID (hỗ trợ cả trường VN và Thế giới, fallback cache)
 */
function findSchoolById(id) {
  if (!id) return null;
  const target = String(id).trim().toLowerCase();
  let school = vnSchoolList.find(s => s.id && s.id.toLowerCase() === target) ||
               globalSchoolList.find(s => s.id && s.id.toLowerCase() === target);
  if (!school && Array.isArray(window.DEFAULT_GLOBAL_SCHOOLS_DATA)) {
    const raw = window.DEFAULT_GLOBAL_SCHOOLS_DATA.find((s, idx) => {
      const gId = s.id || ('global_' + String(idx + 1).padStart(3, '0'));
      return gId.toLowerCase() === target;
    });
    if (raw) school = normalizeGlobalSchool(raw, 0);
  }
  return school || null;
}

/**
 * Tìm trường trong dataset theo tên trường
 */
function findSchoolByName(name) {
  if (!name) return null;
  const target = String(name).trim().toLowerCase();
  let school = vnSchoolList.find(s => s.name && s.name.trim().toLowerCase() === target) ||
               globalSchoolList.find(s => s.name && s.name.trim().toLowerCase() === target);
  if (!school && Array.isArray(window.DEFAULT_GLOBAL_SCHOOLS_DATA)) {
    const raw = window.DEFAULT_GLOBAL_SCHOOLS_DATA.find(s => s.name && s.name.trim().toLowerCase() === target);
    if (raw) school = normalizeGlobalSchool(raw, 0);
  }
  return school || null;
}

/**
 * Lấy danh sách ID các trường yêu thích từ localStorage ('ns_bookmarked_school_ids' hoặc 'ns_favorite_school_ids')
 * Hỗ trợ tương thích ngược đầy đủ nếu trước đó lưu dưới dạng object hoặc trong 'ns_bookmarked_schools'
 */
function getFavoriteSchoolIds() {
  const ids = new Set();

  // 1. Chuẩn mới: Đọc từ 'ns_bookmarked_school_ids' hoặc 'ns_favorite_school_ids' (chỉ lưu mảng string ID để chống tràn bộ nhớ)
  try {
    const rawFav = localStorage.getItem('ns_bookmarked_school_ids') || localStorage.getItem('ns_favorite_school_ids');
    if (rawFav) {
      const parsed = JSON.parse(rawFav);
      if (Array.isArray(parsed)) {
        parsed.forEach(item => {
          if (typeof item === 'string' && item.trim()) {
            ids.add(item.trim());
          } else if (item && typeof item === 'object' && item.id) {
            ids.add(String(item.id).trim());
          }
        });
      }
    }
  } catch (e) {
    console.warn('Lỗi đọc ns_bookmarked_school_ids:', e);
  }

  // 2. Tương thích ngược: Đọc từ 'ns_bookmarked_schools' legacy nếu có
  try {
    const rawLegacy = localStorage.getItem('ns_bookmarked_schools');
    if (rawLegacy) {
      const parsedLegacy = JSON.parse(rawLegacy);
      if (Array.isArray(parsedLegacy)) {
        parsedLegacy.forEach(item => {
          if (typeof item === 'string' && item.trim()) {
            const trimmed = item.trim();
            const school = findSchoolById(trimmed) || findSchoolByName(trimmed);
            if (school) {
              ids.add(school.id);
            } else {
              ids.add(trimmed);
            }
          } else if (item && typeof item === 'object') {
            if (item.id) {
              ids.add(String(item.id).trim());
            } else if (item.name) {
              const school = findSchoolByName(item.name);
              if (school) ids.add(school.id);
            }
          }
        });
      }
    }
  } catch (e) {
    console.warn('Lỗi đọc ns_bookmarked_schools legacy:', e);
  }

  return Array.from(ids);
}

/**
 * Kiểm tra xem trường đã được lưu vào danh sách mục tiêu / yêu thích chưa
 */
function isSchoolBookmarked(identifier) {
  if (!identifier) return false;
  const target = String(identifier).trim().toLowerCase();
  const favIds = getFavoriteSchoolIds();

  // Kiểm tra trực tiếp theo ID
  if (favIds.some(id => id.toLowerCase() === target)) return true;

  // Kiểm tra theo tên trường
  const school = findSchoolByName(target);
  if (school && favIds.includes(school.id)) return true;

  const schoolById = findSchoolById(target);
  if (schoolById && favIds.includes(schoolById.id)) return true;

  return false;
}

/**
 * Bật/tắt lưu trường vào danh sách nguyện vọng yêu thích
 * CHỈ lưu mảng các ID gọn nhẹ vào 'ns_bookmarked_school_ids' để fix QuotaExceededError
 */
function toggleSchoolBookmark(schoolIdOrName, schoolObj = null) {
  if (!schoolIdOrName) return false;

  let school = null;
  if (schoolObj && schoolObj.id) {
    school = schoolObj;
  } else {
    school = findSchoolById(schoolIdOrName) || findSchoolByName(schoolIdOrName);
  }

  const schoolId = school ? school.id : String(schoolIdOrName).trim();
  const schoolName = school ? school.name : String(schoolIdOrName).trim();

  let favIds = getFavoriteSchoolIds();
  const index = favIds.indexOf(schoolId);
  let isBookmarkedNow = false;

  if (index >= 0) {
    favIds.splice(index, 1);
    isBookmarkedNow = false;
  } else {
    favIds.push(schoolId);
    isBookmarkedNow = true;
  }

  // 1. Ghi ONLY mảng ID vào 'ns_bookmarked_school_ids' và 'ns_favorite_school_ids' (tối ưu tuyệt đối dung lượng)
  try {
    localStorage.setItem('ns_bookmarked_school_ids', JSON.stringify(favIds));
    localStorage.setItem('ns_favorite_school_ids', JSON.stringify(favIds));
  } catch (err) {
    console.error('Lỗi khi lưu ns_bookmarked_school_ids:', err);
  }

  // 2. Đồng bộ danh sách tên trường dạng chuỗi gọn nhẹ vào 'ns_bookmarked_schools'
  // (để ketqua.html và muctieu.html không bị gián đoạn, KHÔNG lưu full JSON object nặng nề)
  try {
    const schoolNames = favIds.map(id => {
      const s = findSchoolById(id);
      return s ? s.name : id;
    });
    localStorage.setItem('ns_bookmarked_schools', JSON.stringify(schoolNames));
  } catch (err) {
    console.warn('Lỗi đồng bộ ns_bookmarked_schools:', err);
  }

  // 3. Cập nhật UI nút bookmark
  updateBookmarkButtonsUI(schoolName, isBookmarkedNow);
  updateBookmarkButtonsUI(schoolId, isBookmarkedNow);
  updateFavoriteCountBadge();

  // 4. Nếu đang ở chế độ xem Wishlist, re-apply filters để cập nhật danh sách
  if (filterOnlyFavorites) {
    applySchoolFilters();
  }

  // 5. Toast thông báo
  if (typeof showToast === 'function') {
    if (isBookmarkedNow) {
      showToast(`⭐ Đã lưu "${schoolName}" vào danh sách nguyện vọng!`, 'success');
    } else {
      showToast(`Đã bỏ lưu "${schoolName}" khỏi danh sách nguyện vọng.`, 'info');
    }
  }

  return isBookmarkedNow;
}

/**
 * Trả về danh sách tên hoặc ID tương thích ngược cho các trang khác
 */
function getBookmarkedSchools() {
  const favIds = getFavoriteSchoolIds();
  return favIds.map(id => {
    const s = findSchoolById(id);
    return s ? s.name : id;
  });
}

/**
 * Lấy danh sách đầy đủ chi tiết các trường yêu thích bằng cách tra cứu theo ID từ dataset đã tải
 */
function getFavoriteSchoolObjects() {
  const favIds = getFavoriteSchoolIds();
  const list = [];
  favIds.forEach(id => {
    const s = findSchoolById(id);
    if (s) {
      list.push(s);
    } else {
      list.push({
        id: id,
        name: id,
        isGlobal: id.startsWith('global_'),
        type: 'Chưa xác định'
      });
    }
  });
  return list;
}

/**
 * Cập nhật số lượng trường đã lưu trên badge
 */
function updateFavoriteCountBadge() {
  const count = getFavoriteSchoolIds().length;
  const badge = document.getElementById('favCountBadge');
  if (badge) badge.textContent = count;
}

/**
 * Tự động di chuyển và tối ưu hóa dữ liệu bookmark cũ khi khởi động trang
 */
function migrateAndSyncFavorites() {
  const ids = new Set();

  try {
    const rawFav = localStorage.getItem('ns_bookmarked_school_ids') || localStorage.getItem('ns_favorite_school_ids');
    if (rawFav) {
      const parsed = JSON.parse(rawFav);
      if (Array.isArray(parsed)) {
        parsed.forEach(item => {
          if (typeof item === 'string' && item.trim()) {
            ids.add(item.trim());
          } else if (item && typeof item === 'object' && item.id) {
            ids.add(String(item.id).trim());
          }
        });
      }
    }
  } catch (e) {}

  try {
    const rawLegacy = localStorage.getItem('ns_bookmarked_schools');
    if (rawLegacy) {
      const parsedLegacy = JSON.parse(rawLegacy);
      if (Array.isArray(parsedLegacy)) {
        parsedLegacy.forEach(item => {
          if (typeof item === 'string' && item.trim()) {
            const trimmed = item.trim();
            const school = findSchoolById(trimmed) || findSchoolByName(trimmed);
            if (school) {
              ids.add(school.id);
            } else {
              ids.add(trimmed);
            }
          } else if (item && typeof item === 'object') {
            if (item.id) {
              ids.add(String(item.id).trim());
            } else if (item.name) {
              const school = findSchoolByName(item.name);
              if (school) ids.add(school.id);
            }
          }
        });
      }
    }
  } catch (e) {}

  const finalIds = Array.from(ids);
  try {
    localStorage.setItem('ns_bookmarked_school_ids', JSON.stringify(finalIds));
    localStorage.setItem('ns_favorite_school_ids', JSON.stringify(finalIds));
  } catch (e) {}

  try {
    const cleanNames = finalIds.map(id => {
      const s = findSchoolById(id);
      return s ? s.name : id;
    });
    localStorage.setItem('ns_bookmarked_schools', JSON.stringify(cleanNames));
  } catch (e) {}

  updateFavoriteCountBadge();
}

/**
 * Bật/tắt chế độ chỉ hiển thị các trường đã lưu trong Wishlist
 */
function toggleFavoritesOnlyFilter() {
  filterOnlyFavorites = !filterOnlyFavorites;
  const btn = document.getElementById('btnFilterFavorites');
  if (btn) {
    if (filterOnlyFavorites) {
      btn.classList.add('active');
      if (typeof showToast === 'function') {
        showToast('⭐ Đang hiển thị danh sách các trường mục tiêu đã lưu.', 'info');
      }
    } else {
      btn.classList.remove('active');
    }
  }
  currentSchoolPage = 1;
  applySchoolFilters();
}

/**
 * Cập nhật nút bookmark sau khi click
 */
function updateBookmarkButtonsUI(identifier, isBookmarked) {
  if (!identifier) return;
  const target = String(identifier).trim().toLowerCase();
  const school = findSchoolById(identifier) || findSchoolByName(identifier);
  const targetName = school ? school.name.trim().toLowerCase() : target;
  const targetId = school ? school.id.trim().toLowerCase() : target;

  document.querySelectorAll('.school-bookmark-btn').forEach(btn => {
    const btnName = (btn.getAttribute('data-school-name') || '').trim().toLowerCase();
    const btnId = (btn.getAttribute('data-school-id') || '').trim().toLowerCase();
    const decodedBtnName = decodeURIComponent(btnName);

    if (btnName === targetName || decodedBtnName === targetName || btnName === target || btnId === targetId || btnId === target) {
      if (isBookmarked) {
        btn.classList.add('bookmarked');
        btn.innerHTML = '⭐ Đã lưu';
        btn.setAttribute('title', 'Bấm để bỏ lưu khỏi danh sách nguyện vọng');
      } else {
        btn.classList.remove('bookmarked');
        btn.innerHTML = '☆ Lưu mục tiêu';
        btn.setAttribute('title', 'Lưu vào danh sách nguyện vọng');
      }
    }
  });

  // Cập nhật nút bookmark trong schoolModal nếu đang mở
  const modalBookmarkBtn = document.getElementById('modalBookmarkBtn');
  if (modalBookmarkBtn) {
    const mId = (modalBookmarkBtn.getAttribute('data-school-id') || '').trim().toLowerCase();
    const mName = (modalBookmarkBtn.getAttribute('data-school-name') || '').trim().toLowerCase();
    if (mId === targetId || mName === targetName || mName === target) {
      if (isBookmarked) {
        modalBookmarkBtn.classList.add('bookmarked');
        modalBookmarkBtn.innerHTML = '⭐ Đã lưu trong nguyện vọng';
      } else {
        modalBookmarkBtn.classList.remove('bookmarked');
        modalBookmarkBtn.innerHTML = '☆ Lưu vào mục tiêu';
      }
    }
  }
}

/* ==========================================================================
   SCHOOL COMPARISON ENGINE (TỐI ĐA 3 TRƯỜNG & FLOATING DOCK & COMPARISON MODAL)
   ========================================================================== */

/**
 * Kiểm tra xem trường đã được chọn để so sánh chưa
 */
function isSchoolSelectedForCompare(schoolId) {
  return selectedCompareSchoolIds.includes(schoolId);
}

/**
 * Xử lý click nút so sánh từ thẻ trường
 */
function handleCompareCardClick(event, schoolId) {
  if (event) event.stopPropagation();
  toggleCompareSchool(schoolId);
}

/**
 * Bật/tắt chọn trường để so sánh (Tối đa 3 trường)
 */
function toggleCompareSchool(schoolId) {
  if (!schoolId) return false;
  const school = findSchoolById(schoolId);
  const schoolName = school ? school.name : schoolId;

  const idx = selectedCompareSchoolIds.indexOf(schoolId);
  if (idx >= 0) {
    selectedCompareSchoolIds.splice(idx, 1);
    if (typeof showToast === 'function') {
      showToast(`Đã bỏ chọn "${schoolName}" khỏi so sánh.`, 'info');
    }
  } else {
    if (selectedCompareSchoolIds.length >= 3) {
      if (typeof showToast === 'function') {
        showToast('⚠️ Bạn chỉ có thể so sánh tối đa 3 trường cùng lúc. Vui lòng bỏ chọn một trường trước khi thêm trường mới.', 'warning');
      }
      return false;
    }
    selectedCompareSchoolIds.push(schoolId);
    if (typeof showToast === 'function') {
      showToast(`⚖️ Đã thêm "${schoolName}" vào so sánh (${selectedCompareSchoolIds.length}/3).`, 'success');
    }
  }

  updateCompareCardsUI();
  renderComparisonDock();

  // Nếu modal so sánh đang mở thì re-render modal
  const compareModal = document.getElementById('schoolCompareModal');
  if (compareModal && !compareModal.hidden) {
    if (selectedCompareSchoolIds.length === 0) {
      closeSchoolCompareModal();
    } else {
      renderComparisonModalContent();
    }
  }

  return true;
}

/**
 * Bỏ chọn 1 trường khỏi danh sách so sánh
 */
function removeCompareSchool(schoolId) {
  const idx = selectedCompareSchoolIds.indexOf(schoolId);
  if (idx >= 0) {
    selectedCompareSchoolIds.splice(idx, 1);
    updateCompareCardsUI();
    renderComparisonDock();

    const compareModal = document.getElementById('schoolCompareModal');
    if (compareModal && !compareModal.hidden) {
      if (selectedCompareSchoolIds.length === 0) {
        closeSchoolCompareModal();
      } else {
        renderComparisonModalContent();
      }
    }
  }
}

/**
 * Xóa toàn bộ danh sách chọn so sánh
 */
function clearSchoolCompareSelection() {
  selectedCompareSchoolIds = [];
  updateCompareCardsUI();
  renderComparisonDock();
  closeSchoolCompareModal();
  if (typeof showToast === 'function') {
    showToast('Đã xóa toàn bộ danh sách so sánh trường.', 'info');
  }
}

/**
 * Cập nhật giao diện các nút so sánh và viền thẻ trên trang
 */
function updateCompareCardsUI() {
  document.querySelectorAll('[data-compare-id]').forEach(el => {
    const id = el.getAttribute('data-compare-id');
    const isSelected = selectedCompareSchoolIds.includes(id);

    if (el.tagName === 'INPUT' && el.type === 'checkbox') {
      el.checked = isSelected;
    } else if (el.classList.contains('school-compare-btn')) {
      if (isSelected) {
        el.classList.add('active');
        const textSpan = el.querySelector('.compare-btn-text');
        if (textSpan) textSpan.textContent = 'Đang so sánh';
        el.setAttribute('title', 'Bỏ chọn khỏi so sánh');
      } else {
        el.classList.remove('active');
        const textSpan = el.querySelector('.compare-btn-text');
        if (textSpan) textSpan.textContent = '+ So sánh';
        el.setAttribute('title', 'Chọn so sánh (tối đa 3 trường)');
      }
    } else if (el.classList.contains('btn-compare-action')) {
      if (isSelected) {
        el.classList.add('primary');
        el.classList.remove('secondary');
        el.innerHTML = '⚖️ Đang so sánh';
      } else {
        el.classList.remove('primary');
        el.classList.add('secondary');
        el.innerHTML = '⚖️ + So sánh';
      }
    }
  });

  document.querySelectorAll('.school-card[data-school-card-id]').forEach(card => {
    const id = card.getAttribute('data-school-card-id');
    if (selectedCompareSchoolIds.includes(id)) {
      card.classList.add('card-selected-compare');
    } else {
      card.classList.remove('card-selected-compare');
    }
  });
}

/**
 * Render thanh Dock nổi dưới chân trang
 */
function renderComparisonDock() {
  const dock = document.getElementById('schoolCompareDock');
  if (!dock) return;

  const count = selectedCompareSchoolIds.length;
  if (count === 0) {
    dock.style.display = 'none';
    return;
  }

  dock.style.display = 'block';

  const badge = document.getElementById('compareCountBadge');
  if (badge) badge.textContent = `${count}/3 trường`;

  const slotsContainer = document.getElementById('dockSchoolSlots');
  if (slotsContainer) {
    let slotsHtml = '';
    selectedCompareSchoolIds.forEach(id => {
      const s = findSchoolById(id);
      if (s) {
        const icon = s.isGlobal ? '🌍' : '🏫';
        const badgeText = s.isGlobal ? `Top #${s.rank}` : (s.code || s.type || 'VN');
        slotsHtml += `
          <div class="dock-slot-item">
            <span>${icon}</span>
            <div class="dock-slot-info">
              <span class="dock-slot-name" title="${s.name}">${s.name}</span>
              <span class="dock-slot-badge">${badgeText}</span>
            </div>
            <button type="button" class="dock-slot-remove" onclick="removeCompareSchool('${s.id}')" title="Bỏ trường này khỏi so sánh">✕</button>
          </div>
        `;
      }
    });

    for (let i = count; i < 3; i++) {
      slotsHtml += `
        <div class="dock-slot-empty" onclick="scrollToSchoolGrid()" title="Bấm để duyệt và chọn thêm trường">
          <span class="dock-slot-empty-plus">+</span>
          <span>Chọn thêm</span>
        </div>
      `;
    }

    slotsContainer.innerHTML = slotsHtml;
  }

  const btnOpen = document.getElementById('btnOpenCompareModal');
  if (btnOpen) {
    btnOpen.innerHTML = `⚖️ Xem so sánh ➔`;
  }
}

/**
 * Cuộn tới danh sách trường khi bấm vào ô trống trong dock
 */
function scrollToSchoolGrid() {
  const el = document.getElementById('schoolsSection');
  if (el) el.scrollIntoView({ behavior: 'smooth' });
}

/**
 * Mở modal so sánh trường học
 */
async function openSchoolCompareModal() {
  if (!Array.isArray(selectedCompareSchoolIds) || selectedCompareSchoolIds.length === 0) {
    if (typeof showToast === 'function') {
      showToast('Vui lòng chọn ít nhất 1 trường để so sánh.', 'warning');
    }
    return;
  }

  // Nếu có trường quốc tế trong danh sách so sánh mà chưa nạp data thế giới -> nạp trước
  const hasGlobal = selectedCompareSchoolIds.some(id => String(id).startsWith('global_') || !vnSchoolList.some(s => s.id === id));
  if (hasGlobal && (!globalSchoolList || globalSchoolList.length === 0)) {
    await ensureGlobalSchoolDataLoaded();
  }

  renderComparisonModalContent();
  const modal = document.getElementById('schoolCompareModal');
  if (modal) {
    modal.hidden = false;
    modal.style.display = 'grid';
  }
}

/**
 * Đóng modal so sánh
 */
function closeSchoolCompareModal() {
  const modal = document.getElementById('schoolCompareModal');
  if (modal) {
    modal.hidden = true;
    modal.style.display = 'none';
  }
}

/**
 * Render nội dung chi tiết trong Modal so sánh (Đối chiếu 5 tiêu chí)
 */
function renderComparisonModalContent() {
  const container = document.getElementById('schoolCompareContent');
  if (!container) return;

  const schools = selectedCompareSchoolIds.map(id => findSchoolById(id)).filter(Boolean);
  if (schools.length === 0) {
    container.innerHTML = `
      <div style="text-align:center;padding:40px 20px;color:#94a3b8;">
        <p style="font-size:32px;margin:0 0 10px;">⚖️</p>
        <p style="font-size:16px;color:#fff;font-weight:600;">Chưa có trường nào được chọn để so sánh.</p>
        <p style="font-size:13.5px;">Hãy tích chọn tối đa 3 trường từ danh sách để xem bảng đối chiếu chi tiết.</p>
      </div>
    `;
    return;
  }

  // Header các cột trường
  const headerColsHtml = schools.map(s => {
    const isBookmarked = isSchoolBookmarked(s.id);
    const badgeText = s.isGlobal ? `🏆 Top #${s.rank}` : (s.code ? `Mã: ${s.code}` : (s.type || 'Công lập'));
    return `
      <th class="col-school">
        <div class="compare-school-header">
          <div class="compare-school-top">
            <span class="school-badge ${s.isGlobal ? 'school-badge-rank' : 'school-badge-primary'}">${badgeText}</span>
            <button type="button" class="compare-btn-remove" onclick="removeCompareSchool('${s.id}')" title="Bỏ khỏi so sánh">✕ Bỏ</button>
          </div>
          <div style="display:flex;align-items:center;gap:6px;margin-top:4px;">
            <span style="font-size:22px;">${s.isGlobal ? '🌍' : '🏫'}</span>
            <h4 class="compare-school-name">${s.name}</h4>
          </div>
          <div style="font-size:12.5px;color:#94a3b8;margin-bottom:6px;">
            📍 ${s.isGlobal ? (s.city ? s.city + ', ' + s.country : s.country) : (s.province || 'Việt Nam') + (s.region ? ' (Miền ' + s.region + ')' : '')}
          </div>
          <div style="display:flex;gap:6px;flex-wrap:wrap;margin-top:auto;">
            <button
              type="button"
              class="school-bookmark-btn ${isBookmarked ? 'bookmarked' : ''}"
              data-school-id="${s.id}"
              data-school-name="${encodeURIComponent(s.name)}"
              onclick="toggleSchoolBookmark('${s.id}', null); renderComparisonModalContent();"
              style="padding:4px 10px;font-size:11.5px;"
            >
              ${isBookmarked ? '⭐ Đã lưu' : '☆ Lưu mục tiêu'}
            </button>
            <button
              type="button"
              class="btn small primary"
              onclick="closeSchoolCompareModal(); showSchoolModalById('${s.id}', ${s.isGlobal});"
              style="padding:4px 10px;font-size:11.5px;"
            >
              🔍 Xem hồ sơ
            </button>
          </div>
        </div>
      </th>
    `;
  }).join('');

  // Nếu < 3 trường, hiển thị cột gợi ý thêm trường
  let emptyColHeader = '';
  let emptyColCell = (content = '') => '';
  if (schools.length < 3) {
    emptyColHeader = `
      <th class="col-school" style="background:rgba(255,255,255,0.02);border:1.5px dashed rgba(255,255,255,0.15);text-align:center;">
        <div style="padding:20px 10px;">
          <p style="font-size:28px;margin:0 0 8px;color:#818cf8;">+</p>
          <p style="font-size:14px;color:#c7d2fe;font-weight:600;margin:0 0 6px;">Thêm trường so sánh</p>
          <span style="font-size:12px;color:#94a3b8;display:block;margin-bottom:12px;">(Tối đa 3 trường cùng lúc)</span>
          <button type="button" class="btn small secondary" onclick="closeSchoolCompareModal(); scrollToSchoolGrid();" style="font-size:12px;padding:6px 12px;">
            + Khám phá thêm trường
          </button>
        </div>
      </th>
    `;
    emptyColCell = (content = '') => `
      <td style="background:rgba(255,255,255,0.015);border:1.5px dashed rgba(255,255,255,0.08);color:#64748b;text-align:center;font-size:12px;">
        ${content || '—'}
      </td>
    `;
  }

  // Row 1: Tên & Mã trường
  const nameCodeRowHtml = schools.map(s => {
    const codeBadge = s.isGlobal 
      ? `<span class="school-badge school-badge-rank" style="font-size:11px;">🏆 Top #${s.rank}</span>`
      : `<span class="school-badge school-badge-primary" style="font-size:11px;">Mã: ${s.code || 'Chưa cập nhật'}</span>`;
    return `
      <td>
        <div style="font-weight:700;color:#f8fafc;font-size:14px;margin-bottom:6px;">${s.name}</div>
        ${codeBadge}
      </td>
    `;
  }).join('') + emptyColCell('Chưa chọn trường');

  // Row 2: Loại hình trường (Công lập/Tư thục/Quốc tế...)
  const typeRowHtml = schools.map(s => {
    if (s.isGlobal) {
      return `
        <td>
          <span class="school-badge school-badge-info" style="margin-bottom:6px;">Quốc tế / Toàn cầu</span>
          <p style="margin:4px 0 0;font-size:12.5px;color:#cbd5e1;">Viện đại học nghiên cứu quốc tế thuộc <b>${s.country}</b> (${s.continent})</p>
        </td>
      `;
    }
    const typeBadge = getVNSchoolTypeBadge(s.type);
    return `
      <td>
        <span class="school-badge ${typeBadge.cls}" style="margin-bottom:6px;">${typeBadge.icon} ${typeBadge.text}</span>
        <p style="margin:4px 0 0;font-size:12.5px;color:#cbd5e1;">${typeBadge.note}</p>
      </td>
    `;
  }).join('') + emptyColCell('Chưa có dữ liệu');

  // Row 3: Điểm chuẩn tham khảo / Thứ hạng QS thế giới
  const scoreRowHtml = schools.map(s => {
    if (s.isGlobal) {
      return `
        <td>
          <div style="margin-bottom:6px;">
            <span style="color:#94a3b8;font-size:12px;">${s.ranking_source || 'Xếp hạng toàn cầu'}:</span>
            <div style="font-size:18px;font-weight:800;color:#fef08a;margin-top:2px;">🏆 Top #${s.rank} Thế giới</div>
          </div>
          <span style="display:inline-block;padding:2px 8px;border-radius:6px;background:rgba(234,179,8,0.15);color:#fde047;font-size:11.5px;font-weight:600;">
            ${s.ranking_source || 'OpenAlex Citation Rank'}
          </span>
        </td>
      `;
    }
    const scoreVal = s.score_range || 'Theo đề án tuyển sinh';
    return `
      <td>
        <div style="margin-bottom:6px;">
          <span style="color:#94a3b8;font-size:12px;">Khung điểm sàn / chuẩn THPT:</span>
          <div style="font-size:18px;font-weight:800;color:#fde047;margin-top:2px;">📊 ${scoreVal} điểm</div>
        </div>
        <span style="display:inline-block;padding:2px 8px;border-radius:6px;background:rgba(99,102,241,0.15);color:#c7d2fe;font-size:11.5px;font-weight:600;">
          Top trường trọng điểm Việt Nam
        </span>
      </td>
    `;
  }).join('') + emptyColCell('Chưa có dữ liệu');

  // Row 4: Tổ hợp xét tuyển GDPT 2018 / Yêu cầu đầu vào (IELTS/SAT/GPA)
  const admissionRowHtml = schools.map(s => {
    if (s.isGlobal) {
      return `
        <td>
          <div style="margin-bottom:6px;">
            <b style="color:#67e8f9;font-size:12.5px;">Yêu cầu chứng chỉ &amp; Học thuật:</b>
            <p style="margin:4px 0 6px;color:#f1f5f9;line-height:1.45;font-weight:500;">${s.requirements || 'IELTS 6.5+, GPA 8.0+'}</p>
          </div>
          <div style="font-size:12px;color:#94a3b8;">
            📋 Hồ sơ: Bài luận cá nhân (Personal Statement), Thư giới thiệu (LOR) &amp; Hoạt động ngoại khóa.
          </div>
        </td>
      `;
    }
    const combos = s.combinations || ['A00', 'A01', 'D01'];
    const combosChips = combos.map(c => `<span class="school-badge school-badge-primary" style="font-size:11px;padding:2px 6px;">${c}</span>`).join(' ');
    const methods = (s.admission_methods || ['Thi TN THPT', 'Đánh giá năng lực']).join(' · ');
    return `
      <td>
        <div style="margin-bottom:6px;">
          <b style="color:#a78bfa;font-size:12.5px;">Tổ hợp xét tuyển GDPT 2018:</b>
          <div style="display:flex;gap:4px;flex-wrap:wrap;margin:4px 0 8px;">
            ${combosChips}
          </div>
        </div>
        <div style="font-size:12px;color:#94a3b8;">
          <b style="color:#cbd5e1;">Phương thức:</b> ${methods}
        </div>
      </td>
    `;
  }).join('') + emptyColCell('Chưa có dữ liệu');

  // Row 5: Khu vực / Quốc gia & Tỉnh thành
  const regionCostRowHtml = schools.map(s => {
    if (s.isGlobal) {
      return `
        <td>
          <div style="margin-bottom:6px;">
            <span style="color:#94a3b8;font-size:12px;">Quốc gia &amp; Tỉnh/Thành:</span>
            <div style="font-weight:600;color:#f1f5f9;margin-top:2px;">📍 ${s.city ? s.city + ', ' : ''}${s.country} (${s.continent})</div>
          </div>
          <div>
            <span style="color:#94a3b8;font-size:12px;">Học bổng &amp; Tài chính:</span>
            <p style="margin:2px 0 0;color:#4ade80;font-weight:600;font-size:13px;line-height:1.4;">${s.scholarship_info || 'Có chính sách học bổng quốc tế'}</p>
          </div>
        </td>
      `;
    }
    return `
      <td>
        <div style="margin-bottom:6px;">
          <span style="color:#94a3b8;font-size:12px;">Khu vực &amp; Tỉnh/Thành:</span>
          <div style="font-weight:600;color:#f1f5f9;margin-top:2px;">📍 ${s.province || 'Chưa xác định'} · Miền ${s.region || 'Cả nước'}</div>
        </div>
        <div>
          <span style="color:#94a3b8;font-size:12px;">Học phí ước tính:</span>
          <p style="margin:2px 0 0;color:#fde047;font-weight:600;font-size:13px;line-height:1.4;">${s.tuitionRange || 'Theo quy định học phí hiện hành'}</p>
        </div>
      </td>
    `;
  }).join('') + emptyColCell('Chưa có dữ liệu');

  // Row 6: Các ngành đào tạo mũi nhọn
  const strengthsRowHtml = schools.map(s => {
    const items = s.isGlobal ? (s.strengths || []) : (s.majors || []);
    const chips = items.slice(0, 6).map(it => `
      <span class="school-bench-chip" style="background:${s.isGlobal ? 'rgba(99,102,241,0.2)' : 'rgba(255,255,255,0.08)'};color:#e2e8f0;font-size:12px;margin:2px 3px 2px 0;padding:3px 8px;">
        ${it}
      </span>
    `).join('');
    return `
      <td>
        <div style="display:flex;flex-wrap:wrap;gap:4px;">
          ${chips || '<span style="color:#94a3b8;">Đa ngành đào tạo</span>'}
        </div>
      </td>
    `;
  }).join('') + emptyColCell('Chưa có dữ liệu');

  // Row 7: Nút liên kết cổng tuyển sinh chính thức
  const linkRowHtml = schools.map(s => {
    return `
      <td>
        <a href="${s.website}" target="_blank" rel="noopener" class="btn small primary" style="display:inline-flex;align-items:center;gap:6px;text-decoration:none;font-size:12px;padding:6px 12px;">
          🌐 Cổng tuyển sinh chính thức ↗
        </a>
      </td>
    `;
  }).join('') + emptyColCell('—');

  // Phân tích thông minh & Khuyến nghị chiến lược (Synthesis)
  const synthesisHtml = buildComparisonSynthesis(schools);

  container.innerHTML = `
    <div class="compare-table-wrap">
      <table class="compare-table">
        <thead>
          <tr>
            <th class="col-feature">Tiêu chí so sánh</th>
            ${headerColsHtml}
            ${emptyColHeader}
          </tr>
        </thead>
        <tbody>
          <tr>
            <th class="col-feature">🏫 Tiêu chí 1: Tên &amp; Mã trường</th>
            ${nameCodeRowHtml}
          </tr>
          <tr>
            <th class="col-feature">🏛️ Tiêu chí 2: Loại hình trường</th>
            ${typeRowHtml}
          </tr>
          <tr>
            <th class="col-feature">📊 Tiêu chí 3: Điểm chuẩn / Thứ hạng quốc tế</th>
            ${scoreRowHtml}
          </tr>
          <tr>
            <th class="col-feature">📐 Tiêu chí 4: Tổ hợp &amp; Yêu cầu đầu vào</th>
            ${admissionRowHtml}
          </tr>
          <tr>
            <th class="col-feature">📍 Tiêu chí 5: Khu vực / Quốc gia &amp; Tỉnh thành</th>
            ${regionCostRowHtml}
          </tr>
          <tr>
            <th class="col-feature">🔬 Tiêu chí 6: Các ngành đào tạo mũi nhọn</th>
            ${strengthsRowHtml}
          </tr>
          <tr>
            <th class="col-feature">🌐 Tiêu chí 7: Cổng tuyển sinh chính thức</th>
            ${linkRowHtml}
          </tr>
        </tbody>
      </table>
    </div>

    ${synthesisHtml}
  `;
}

/**
 * Tổng hợp so sánh & Khuyến nghị chiến lược tuyển sinh
 */
function buildComparisonSynthesis(schools) {
  if (schools.length < 2) {
    return `
      <div class="compare-synthesis-card">
        <div class="compare-synthesis-header">
          <span style="font-size:20px;">💡</span>
          <h4 class="compare-synthesis-title">Mẹo đối chiếu chiến lược</h4>
        </div>
        <p style="color:#cbd5e1;font-size:13.5px;margin:0;line-height:1.6;">
          Bạn hiện đang chọn 1 trường. Hãy tích chọn thêm 1 đến 2 trường nữa (cùng nhóm ngành hoặc khác phân khúc) để NS AI tự động phân tích so sánh chiến thuật Reach / Match / Safety và cân đối học phí!
        </p>
      </div>
    `;
  }

  const vnSchools = schools.filter(s => !s.isGlobal);
  const globalSchools = schools.filter(s => s.isGlobal);

  let compNote = '';
  if (vnSchools.length >= 2) {
    compNote = `Đối chiếu giữa các trường trong nước cho thấy sự khác biệt về ngưỡng điểm chuẩn và phương thức xét tuyển (TSA, HSA, THPT). Hãy phân bổ nguyện vọng theo chiến thuật bậc thang để đảm bảo tỷ lệ trúng tuyển cao nhất.`;
  } else if (vnSchools.length === 1 && globalSchools.length >= 1) {
    compNote = `Bạn đang cân nhắc giữa lựa chọn Đại học trong nước (${vnSchools[0].name}) và Lộ trình Du học quốc tế (${globalSchools.map(s => s.name).join(', ')}). Lựa chọn này đòi hỏi cân nhắc kỹ giữa khả năng tài chính, hồ sơ chứng chỉ ngoại ngữ (IELTS/SAT) và mục tiêu phát triển toàn cầu.`;
  } else {
    compNote = `Đối chiếu giữa các Đại học quốc tế hàng đầu (${globalSchools.map(s => s.name).join(', ')}). Chú ý thời hạn nộp hồ sơ (Early Decision vs Regular Decision) và điều kiện học bổng tài chính.`;
  }

  return `
    <div class="compare-synthesis-card">
      <div class="compare-synthesis-header">
        <span style="font-size:22px;">🧠</span>
        <div>
          <h4 class="compare-synthesis-title">Nhận định &amp; Khuyến nghị chiến lược tuyển sinh NS AI</h4>
          <span style="font-size:12px;color:#94a3b8;">Đúc kết từ dữ liệu đối chiếu ${schools.length} trường được chọn</span>
        </div>
      </div>
      <div class="compare-synthesis-grid">
        <div class="compare-synthesis-item">
          <h5>🎯 Phân tầng chiến thuật (Reach / Match / Safety)</h5>
          <p>${compNote}</p>
        </div>
        <div class="compare-synthesis-item">
          <h5>💰 Cân đối đầu tư tài chính &amp; Cơ hội học bổng</h5>
          <p>Đối chiếu học phí và chính sách hỗ trợ để đảm bảo tính bền vững suốt 4 năm đại học. Ưu tiên tìm kiếm các gói học bổng khuyến khích học tập hoặc hỗ trợ tài chính cần thiết.</p>
        </div>
        <div class="compare-synthesis-item">
          <h5>📋 Chiến lược xếp thứ tự nguyện vọng</h5>
          <p>Đặt trường có điểm chuẩn / kỳ vọng cao nhất ở <b>Nguyện vọng 1</b> (Reach), tiếp theo là trường vừa vặn năng lực ở <b>Nguyện vọng 2</b> (Match), và trường có biên an toàn cao ở <b>Nguyện vọng 3</b> (Safety).</p>
        </div>
      </div>
    </div>
  `;
}

/**
 * Chuẩn hóa đối tượng trường Việt Nam
 */
function normalizeVNSchool(s, idx) {
  const id = s.id || ('vn_' + (s.code ? s.code.toLowerCase() : String(idx + 1).padStart(3, '0')));
  const name = s.name || 'Chưa có tên trường';
  const code = s.code || '';
  let region = s.region || '';
  const province = s.province || '';

  // Đoán vùng miền nếu chưa có
  if (!region && province) {
    const bac = ['Hà Nội', 'Cao Bằng', 'Tuyên Quang', 'Điện Biên', 'Lai Châu', 'Sơn La', 'Lào Cai', 'Thái Nguyên', 'Lạng Sơn', 'Quảng Ninh', 'Bắc Ninh', 'Phú Thọ', 'Hải Phòng', 'Hưng Yên', 'Ninh Bình'];
    const trung = ['Thanh Hóa', 'Nghệ An', 'Hà Tĩnh', 'Quảng Trị', 'Huế', 'Đà Nẵng', 'Quảng Ngãi', 'Gia Lai', 'Khánh Hòa', 'Đắk Lắk', 'Lâm Đồng'];
    if (bac.some(p => province.includes(p))) region = 'Bắc';
    else if (trung.some(p => province.includes(p))) region = 'Trung';
    else region = 'Nam';
  }

  // Đoán loại hình nếu chưa có
  let type = s.type || '';
  if (!type) {
    const n = name.toLowerCase();
    if (n.includes('cao đẳng')) {
      type = 'Cao đẳng công lập';
    } else if (n.includes('quân y') || n.includes('an ninh') || n.includes('cảnh sát') || n.includes('sĩ quan') || n.includes('hậu cần') || n.includes('kỹ thuật quân sự') || n.includes('phòng không') || n.includes('hải quân')) {
      type = 'Quân đội';
    } else if (n.includes('rmit') || n.includes('vinuni') || n.includes('buv') || n.includes('fulbright')) {
      type = 'Quốc tế';
    } else if (n.includes('fpt') || n.includes('văn lang') || n.includes('hoa sen') || n.includes('hutech') || n.includes('kinh tế - tài chính') || n.includes('phenikaa')) {
      type = 'Tư thục';
    } else {
      type = 'Công lập';
    }
  }

  const majors = Array.isArray(s.majors) ? s.majors : [];
  let combinations = Array.isArray(s.combinations) ? s.combinations : [];
  if (!combinations.length && Array.isArray(s.applicableCombos)) {
    combinations = s.applicableCombos;
  }
  if (!combinations.length && s.benchmarks && Array.isArray(s.benchmarks.comboBenchmarks)) {
    combinations = s.benchmarks.comboBenchmarks.map(b => b.combo).filter(Boolean);
  }
  if (!combinations.length) {
    combinations = ['A00', 'A01', 'D01'];
  }

  let score_range = s.score_range || '';
  if (!score_range && s.benchmarks) {
    if (s.benchmarks.floor) {
      score_range = `${s.benchmarks.floor} - 28.0`;
    } else if (s.benchmarks.comboBenchmarks && s.benchmarks.comboBenchmarks.length) {
      const scores = s.benchmarks.comboBenchmarks.map(b => b.score).filter(Boolean);
      if (scores.length) {
        score_range = `${Math.min(...scores)} - ${Math.max(...scores)}`;
      }
    }
  }

  let admission_methods = Array.isArray(s.admission_methods) ? s.admission_methods : [];
  if (!admission_methods.length && s.admissionNote) {
    admission_methods = ['Thi tốt nghiệp THPT', 'Xét học bạ', 'Đánh giá năng lực'];
  } else if (!admission_methods.length) {
    admission_methods = ['Thi tốt nghiệp THPT', 'Xét tuyển kết hợp'];
  }

  const website = s.website || ('https://www.google.com/search?q=' + encodeURIComponent('cổng tuyển sinh ' + name));
  const description = s.description || 'Cơ sở giáo dục đại học uy tín, đào tạo đa ngành tại Việt Nam.';
  const tuitionRange = s.tuitionRange || s.tuitionNote || 'Theo quy định học phí trường công lập/tư thục từng năm.';

  return {
    id,
    name,
    code,
    region,
    province,
    type,
    majors,
    combinations,
    score_range,
    admission_methods,
    website,
    description,
    tuitionRange,
    isGlobal: false
  };
}

/**
 * Chuẩn hóa đối tượng trường Thế giới (Du học)
 */
function normalizeGlobalSchool(s, idx) {
  const id = s.id || ('global_' + String(idx + 1).padStart(3, '0'));
  const rank = s.rank || (idx + 1);
  const name = s.name || 'Chưa có tên trường';
  const continent = s.continent || 'Quốc tế';
  const country = s.country || 'Thế giới';
  const city = s.city || '';
  const strengths = Array.isArray(s.strengths) ? s.strengths : [];
  const requirements = s.requirements || 'IELTS 6.5+, GPA 8.0+, Bài luận & Hoạt động ngoại khóa';
  const scholarship_info = s.scholarship_info || 'Có chính sách học bổng dành cho sinh viên quốc tế';
  const website = s.website || ('https://www.google.com/search?q=' + encodeURIComponent('university ' + name));

  return {
    id,
    rank,
    name,
    continent,
    country,
    city,
    strengths,
    requirements,
    scholarship_info,
    website,
    isGlobal: true
  };
}

/**
 * Helper tải JSON an toàn qua nhiều đường dẫn tương đối (tương thích GitHub Pages & local)
 */
async function fetchJsonSafely(paths) {
  for (let i = 0; i < paths.length; i++) {
    try {
      const res = await fetch(paths[i]);
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) return data;
      }
    } catch (e) {}
  }
  return null;
}

/**
 * Lazy-load: Nạp dữ liệu Top 1.000 Đại học Thế giới chỉ khi người dùng cần
 * Có bộ nhớ đệm (in-memory cache) tránh fetch lặp lại khi chuyển đổi giữa các tab
 */
async function ensureGlobalSchoolDataLoaded() {
  if (isGlobalDataLoaded && Array.isArray(globalSchoolList) && globalSchoolList.length > 0) {
    return globalSchoolList;
  }
  if (globalLoadPromise) {
    return globalLoadPromise;
  }

  // Tái sử dụng dữ liệu từ window.DEFAULT_GLOBAL_SCHOOLS_DATA nếu đã có sẵn trong bộ nhớ
  if (Array.isArray(window.DEFAULT_GLOBAL_SCHOOLS_DATA) && window.DEFAULT_GLOBAL_SCHOOLS_DATA.length > 0) {
    globalSchoolList = window.DEFAULT_GLOBAL_SCHOOLS_DATA.map((s, idx) => normalizeGlobalSchool(s, idx));
    isGlobalDataLoaded = true;
    return globalSchoolList;
  }

  isGlobalDataLoading = true;
  globalLoadPromise = (async () => {
    try {
      const globalCandidates = [
        'data/schools_global_top1000.json',
        './data/schools_global_top1000.json',
        '../data/schools_global_top1000.json',
        '../HTML/data/schools_global_top1000.json',
        'HTML/data/schools_global_top1000.json',
        '../JS/data/schools_global_top1000.json',
        'JS/data/schools_global_top1000.json',
        'schools_global_top1000.json',
        './schools_global_top1000.json'
      ];
      let rawGlobal = await fetchJsonSafely(globalCandidates);

      if (!rawGlobal || !Array.isArray(rawGlobal) || rawGlobal.length === 0) {
        console.error('[NS AI] KHONG TAI DUOC data/schools_global_top1000.json. Kiem tra file co bi loi JSON/BOM khong.', globalCandidates);
        if (Array.isArray(window.DEFAULT_GLOBAL_SCHOOLS_DATA) && window.DEFAULT_GLOBAL_SCHOOLS_DATA.length > 0) {
          rawGlobal = window.DEFAULT_GLOBAL_SCHOOLS_DATA;
          console.warn('[NS AI] Dang dung du lieu du phong chi co', rawGlobal.length, 'truong.');
        } else {
          rawGlobal = [];
        }
      }

      globalSchoolList = rawGlobal.map((s, idx) => normalizeGlobalSchool(s, idx));
      if (Array.isArray(rawGlobal) && rawGlobal.length > 0) {
        window.DEFAULT_GLOBAL_SCHOOLS_DATA = rawGlobal;
      }
      isGlobalDataLoaded = true;
      return globalSchoolList;
    } finally {
      isGlobalDataLoading = false;
      globalLoadPromise = null;
    }
  })();

  return globalLoadPromise;
}

/**
 * Khởi tạo và tải dữ liệu trường học Việt Nam (Lazy-load trường Quốc tế khi người dùng chuyển Tab)
 */
async function loadAllSchoolData() {
  const container = document.getElementById('schools');
  if (container) {
    container.innerHTML = `
      <div class="school-loading-state" style="grid-column: 1 / -1;">
        <div class="school-spinner"></div>
        <p style="color:#cbd5e1;font-weight:600;margin:0 0 6px;">Đang tải cơ sở dữ liệu trường học...</p>
        <span style="font-size:12.5px;color:#94a3b8;">Đang nạp 255+ trường Đại học &amp; Cao đẳng Việt Nam...</span>
      </div>
    `;
  }

  // 1. Tải duy nhất dữ liệu trường Việt Nam (255 trường đầy đủ) khi khởi động trang
  const vnCandidates = [
    'data/schools_vn.json',
    './data/schools_vn.json',
    '../data/schools_vn.json',
    '../HTML/data/schools_vn.json',
    'HTML/data/schools_vn.json',
    '../JS/data/schools_vn.json',
    'JS/data/schools_vn.json',
    'schools_vn.json',
    './schools_vn.json'
  ];
  let rawVN = await fetchJsonSafely(vnCandidates);

  if (!rawVN) {
    console.error('[NS AI] Da thu cac duong dan VN:', vnCandidates.map(p => new URL(p, location.href).href));
  }

  if (!rawVN || !Array.isArray(rawVN) || rawVN.length === 0) {
    console.error('[NS AI] KHONG TAI DUOC data/schools_vn.json. Kiem tra file co bi loi JSON/BOM khong.', vnCandidates);
    if (Array.isArray(window.DEFAULT_SCHOOLS_DATA) && window.DEFAULT_SCHOOLS_DATA.length > 0) {
      rawVN = window.DEFAULT_SCHOOLS_DATA;
      console.warn('[NS AI] Dang dung du lieu du phong chi co', rawVN.length, 'truong.');
    } else {
      rawVN = [];
    }
  }

  vnSchoolList = rawVN.map((s, idx) => normalizeVNSchool(s, idx));
  // Đồng bộ lại vào window.DEFAULT_SCHOOLS_DATA để chatbot và ketqua dùng chung 255 trường
  if (Array.isArray(rawVN) && rawVN.length > 0) {
    window.DEFAULT_SCHOOLS_DATA = rawVN;
  }

  // 2. KHÔNG tải trước data/schools_global_top1000.json ở đây.
  // Dữ liệu Top 1.000 Quốc tế sẽ được nạp theo cơ chế lazy-load khi chuyển Tab.

  // Tự động kiểm tra và tối ưu hóa dữ liệu yêu thích (fix QuotaExceededError)
  migrateAndSyncFavorites();
  updateFavoriteCountBadge();
  renderComparisonDock();

  // Cập nhật dòng đếm số trường
  const loadingNote = document.querySelector('.school-loading-state span');
  if (loadingNote) loadingNote.remove();

  // Khởi tạo hiển thị ban đầu 24 trường (chunked rendering)
  currentSchoolPage = 1;
  visibleSchoolCount = SCHOOLS_PER_PAGE;

  // Áp dụng bộ lọc và render lần đầu
  applySchoolFilters();
}

/**
 * Chuyển đổi giữa 2 Tab: 'vn' và 'global' (kèm lazy-load dữ liệu quốc tế)
 */
async function switchSchoolTab(tab) {
  if (currentSchoolTab === tab) return;
  currentSchoolTab = tab;

  const tabVN = document.getElementById('tabVN');
  const tabGlobal = document.getElementById('tabGlobal');
  const panelVN = document.getElementById('filterPanelVN');
  const panelGlobal = document.getElementById('filterPanelGlobal');
  const qInput = document.getElementById('q');

  if (tab === 'vn') {
    if (tabVN) { tabVN.classList.add('active'); tabVN.setAttribute('aria-selected', 'true'); }
    if (tabGlobal) { tabGlobal.classList.remove('active'); tabGlobal.setAttribute('aria-selected', 'false'); }
    if (panelVN) panelVN.style.display = 'grid';
    if (panelGlobal) panelGlobal.style.display = 'none';
    if (qInput) qInput.placeholder = '🔎 Tìm tên trường, mã trường, tỉnh/thành hoặc ngành học...';
  } else {
    if (tabVN) { tabVN.classList.remove('active'); tabVN.setAttribute('aria-selected', 'false'); }
    if (tabGlobal) { tabGlobal.classList.add('active'); tabGlobal.setAttribute('aria-selected', 'true'); }
    if (panelVN) panelVN.style.display = 'none';
    if (panelGlobal) panelGlobal.style.display = 'grid';
    if (qInput) qInput.placeholder = '🔎 Tìm tên trường, quốc gia, thành phố hoặc chuyên ngành đào tạo...';
  }

  currentSchoolPage = 1;
  visibleSchoolCount = SCHOOLS_PER_PAGE;

  // Nếu chuyển sang tab Quốc tế mà chưa có dữ liệu trong bộ nhớ -> Lazy load ngay
  if (tab === 'global' && !isGlobalDataLoaded) {
    const container = document.getElementById('schools');
    const countLabel = document.getElementById('schoolCountLabel');
    if (countLabel) {
      countLabel.innerHTML = 'Đang tải dữ liệu Top 1.000 Đại học Thế giới...';
    }
    if (container) {
      container.innerHTML = `
        <div class="school-loading-state" style="grid-column: 1 / -1;">
          <div class="school-spinner"></div>
          <p style="color:#cbd5e1;font-weight:600;margin:0 0 6px;">Đang tải cơ sở dữ liệu Top 1.000 Đại học Thế giới...</p>
          <span style="font-size:12.5px;color:#94a3b8;">Xếp hạng học thuật OpenAlex &amp; Yêu cầu du học...</span>
        </div>
      `;
    }
    await ensureGlobalSchoolDataLoaded();
  }

  applySchoolFilters();
}

/**
 * Xóa ô tìm kiếm
 */
function clearSchoolSearch() {
  clearTimeout(schoolFilterDebounceTimer);
  const qInput = document.getElementById('q');
  const clearBtn = document.getElementById('searchClearBtn');
  if (qInput) {
    qInput.value = '';
    qInput.focus();
  }
  if (clearBtn) clearBtn.style.display = 'none';
  currentSchoolPage = 1;
  visibleSchoolCount = SCHOOLS_PER_PAGE;
  applySchoolFilters();
}

/**
 * Đặt lại tất cả các bộ lọc
 */
function resetSchoolFilters() {
  clearTimeout(schoolFilterDebounceTimer);
  const qInput = document.getElementById('q');
  const clearBtn = document.getElementById('searchClearBtn');
  if (qInput) qInput.value = '';
  if (clearBtn) clearBtn.style.display = 'none';

  // Đặt lại lọc Wishlist
  filterOnlyFavorites = false;
  const btnFav = document.getElementById('btnFilterFavorites');
  if (btnFav) btnFav.classList.remove('active');

  // Reset VN filters
  const region = document.getElementById('filterRegion');
  if (region) region.value = '';
  const typeVN = document.getElementById('filterTypeVN');
  if (typeVN) typeVN.value = '';
  const combo = document.getElementById('filterCombo');
  if (combo) combo.value = '';
  const scoreRange = document.getElementById('filterScoreRange');
  if (scoreRange) scoreRange.value = '';

  // Reset Global filters
  const country = document.getElementById('filterCountry');
  if (country) country.value = '';
  const rank = document.getElementById('filterRank');
  if (rank) rank.value = '';
  const strength = document.getElementById('filterStrength');
  if (strength) strength.value = '';

  currentSchoolPage = 1;
  visibleSchoolCount = SCHOOLS_PER_PAGE;
  applySchoolFilters();
  if (typeof showToast === 'function') {
    showToast('Đã đặt lại tất cả bộ lọc tìm kiếm.', 'info');
  }
}

/**
 * Trả về thông tin phân loại, class CSS, icon và diễn giải chuẩn cho từng loại hình trường Việt Nam
 */
function getVNSchoolTypeBadge(type) {
  const t = type || 'Công lập';
  if (t.includes('Quân đội') || t.includes('Công an')) {
    return {
      text: t,
      cls: 'school-badge-danger',
      icon: '⭐',
      note: 'Khối lực lượng vũ trang nhân dân · Tuyển sinh theo chỉ tiêu của Bộ Quốc phòng / Bộ Công an'
    };
  }
  if (t.includes('Quốc tế')) {
    return {
      text: t,
      cls: 'school-badge-info',
      icon: '🌐',
      note: 'Đại học Quốc tế / Viện đào tạo liên kết · Cấp bằng quốc tế, chuẩn kiểm định toàn cầu'
    };
  }
  if (t.includes('Cao đẳng')) {
    return {
      text: t,
      cls: 'school-badge-teal',
      icon: '🎓',
      note: 'Hệ Cao đẳng (Giáo dục Nghề nghiệp) · Đào tạo thực hành chuyên sâu 2.5 – 3 năm'
    };
  }
  if (t.includes('Tư thục') || t.includes('Dân lập')) {
    return {
      text: t,
      cls: 'school-badge-warning',
      icon: '🏢',
      note: 'Cơ sở giáo dục ngoài công lập · Cơ sở vật chất hiện đại, mô hình liên kết doanh nghiệp'
    };
  }
  return {
    text: t,
    cls: 'school-badge-primary',
    icon: '🏛️',
    note: 'Đại học / Học viện Công lập · Do ngân sách nhà nước hỗ trợ hoặc hoạt động tự chủ tài chính'
  };
}

/**
 * Áp dụng các bộ lọc đa chiều (kèm debounce 250ms khi gõ phím)
 */
function applySchoolFilters() {
  const qInput = document.getElementById('q');
  const clearBtn = document.getElementById('searchClearBtn');
  const rawTerm = qInput ? qInput.value.trim() : '';
  const normTerm = removeVietnameseTones(rawTerm);

  if (clearBtn) {
    clearBtn.style.display = rawTerm ? 'inline-flex' : 'none';
  }

  if (currentSchoolTab === 'vn') {
    const regionVal = document.getElementById('filterRegion')?.value || '';
    const typeVal = document.getElementById('filterTypeVN')?.value || '';
    const comboVal = document.getElementById('filterCombo')?.value || '';
    const scoreVal = document.getElementById('filterScoreRange')?.value || '';

    filteredSchoolList = vnSchoolList.filter(s => {
      // 1. Text search
      if (normTerm) {
        const textToSearch = removeVietnameseTones(
          `${s.name} ${s.code} ${s.province} ${s.region} ${(s.majors||[]).join(' ')} ${s.description}`
        );
        if (!textToSearch.includes(normTerm)) return false;
      }

      // 2. Region filter
      if (regionVal && s.region !== regionVal && !s.province.includes(regionVal)) {
        return false;
      }

      // 3. Type filter
      if (typeVal) {
        const sType = s.type || '';
        const sName = s.name || '';
        if (typeVal === 'Công lập') {
          if (!sType.includes('Công lập') || sType.includes('Cao đẳng')) return false;
        } else if (typeVal === 'Tư thục') {
          if ((!sType.includes('Tư thục') && !sType.includes('Dân lập')) || sType.includes('Cao đẳng')) return false;
        } else if (typeVal === 'Quốc tế') {
          if (!sType.includes('Quốc tế')) return false;
        } else if (typeVal === 'Quân đội - Công an') {
          if (!sType.includes('Quân đội') && !sType.includes('Công an')) return false;
        } else if (typeVal === 'Cao đẳng') {
          if (!sType.includes('Cao đẳng') && !sName.includes('Cao đẳng')) return false;
        } else if (sType !== typeVal) {
          return false;
        }
      }

      // 4. Combination filter
      if (comboVal) {
        const hasCombo = (s.combinations || []).some(c => c.toUpperCase() === comboVal.toUpperCase());
        if (!hasCombo) return false;
      }

      // 5. Score range filter
      if (scoreVal) {
        let minScore = null;
        let maxScore = null;
        if (s.score_range) {
          const nums = s.score_range.match(/([0-9]+(\.[0-9]+)?)/g);
          if (nums && nums.length >= 2) {
            minScore = parseFloat(nums[0]);
            maxScore = parseFloat(nums[1]);
          } else if (nums && nums.length === 1) {
            minScore = parseFloat(nums[0]);
            maxScore = parseFloat(nums[0]);
          }
        }
        if (minScore === null && maxScore === null) {
          // Không loại trừ nếu chưa có mốc điểm cụ thể
        } else {
          if (scoreVal === 'under20') {
            if (minScore !== null && minScore >= 20) return false;
          } else if (scoreVal === '20-24') {
            if ((maxScore !== null && maxScore < 20) || (minScore !== null && minScore > 24)) return false;
          } else if (scoreVal === '24-27') {
            if ((maxScore !== null && maxScore < 24) || (minScore !== null && minScore > 27)) return false;
          } else if (scoreVal === 'over27') {
            if (maxScore !== null && maxScore < 27 && (minScore === null || minScore < 27)) return false;
          }
        }
      }

      return true;
    });

  } else {
    // Tab Global: nếu dữ liệu chưa tải xong, chờ lazy-load hoàn tất
    if (!isGlobalDataLoaded) {
      ensureGlobalSchoolDataLoaded().then(() => {
        applySchoolFilters();
      });
      return;
    }

    const countryVal = document.getElementById('filterCountry')?.value || '';
    const rankVal = document.getElementById('filterRank')?.value || '';
    const strengthVal = document.getElementById('filterStrength')?.value || '';

    filteredSchoolList = globalSchoolList.filter(s => {
      // 1. Text search
      if (normTerm) {
        const textToSearch = removeVietnameseTones(
          `${s.name} ${s.country} ${s.city} ${s.continent} ${(s.strengths||[]).join(' ')}`
        );
        if (!textToSearch.includes(normTerm)) return false;
      }

      // 2. Country filter
      if (countryVal && s.country !== countryVal && !s.country.includes(countryVal)) {
        return false;
      }

      // 3. Rank filter
      if (rankVal) {
        const r = s.rank || 9999;
        if (rankVal === 'top100' && r > 100) return false;
        if (rankVal === 'top300' && (r < 101 || r > 300)) return false;
        if (rankVal === 'top500' && (r < 301 || r > 500)) return false;
        if (rankVal === 'top1000' && (r < 501 || r > 1000)) return false;
      }

      // 4. Strengths filter
      if (strengthVal) {
        const normStrengthVal = removeVietnameseTones(strengthVal);
        const hasStrength = (s.strengths || []).some(st => removeVietnameseTones(st).includes(normStrengthVal));
        if (!hasStrength) return false;
      }

      return true;
    });
  }

  // Lọc chỉ hiển thị trường đã lưu trong Wishlist (nếu được kích hoạt)
  if (filterOnlyFavorites) {
    const favIds = getFavoriteSchoolIds();
    filteredSchoolList = filteredSchoolList.filter(s => favIds.includes(s.id));
  }

  renderSchoolList();
}

/**
 * Debounce bộ lọc và tìm kiếm (250ms - 300ms)
 * Tránh giật lag và giảm thiểu thao tác lọc/vẽ DOM lặp lại liên tục khi người dùng gõ phím hoặc đổi dropdown
 */
function debouncedApplySchoolFilters(delay = 250) {
  clearTimeout(schoolFilterDebounceTimer);
  schoolFilterDebounceTimer = setTimeout(() => {
    currentSchoolPage = 1;
    visibleSchoolCount = SCHOOLS_PER_PAGE;
    applySchoolFilters();
  }, delay);
}

/**
 * Render HTML cho một thẻ trường học (dùng chung cho cả renderSchoolList và loadMoreSchools)
 */
function renderSchoolCardHtml(s) {
  const bookmarked = isSchoolBookmarked(s.id);
  const isCompared = isSchoolSelectedForCompare(s.id);

  const compareBtnHtml = `
    <button
      type="button"
      class="school-compare-btn ${isCompared ? 'active' : ''}"
      data-compare-id="${s.id}"
      onclick="handleCompareCardClick(event, '${s.id}')"
      title="${isCompared ? 'Bỏ chọn khỏi so sánh' : 'Chọn so sánh (tối đa 3 trường)'}"
    >
      <span>⚖️</span>
      <span class="compare-btn-text">${isCompared ? 'Đang so sánh' : '+ So sánh'}</span>
    </button>
  `;

  const bookmarkBtnHtml = `
    <button
      type="button"
      class="school-bookmark-btn ${bookmarked ? 'bookmarked' : ''}"
      data-school-id="${s.id}"
      data-school-name="${encodeURIComponent(s.name)}"
      onclick="handleSchoolBookmarkClick(event, '${encodeURIComponent(s.name)}', ${s.isGlobal})"
      title="${bookmarked ? 'Bấm để bỏ lưu khỏi danh sách nguyện vọng' : 'Lưu vào danh sách nguyện vọng'}"
    >
      ${bookmarked ? '⭐ Đã lưu' : '☆ Lưu mục tiêu'}
    </button>
  `;

  if (!s.isGlobal) {
    // Thẻ trường Việt Nam
    const majorsHtml = (s.majors || []).slice(0, 4).map(m => `<span class="school-bench-chip" style="background:rgba(255,255,255,0.08);color:#e2e8f0;">${m}</span>`).join('');
    const combosHtml = (s.combinations || []).slice(0, 4).join(', ');
    const typeBadge = getVNSchoolTypeBadge(s.type);

    return `
      <article class="school-card ${isCompared ? 'card-selected-compare' : ''}" data-school-card-id="${s.id}">
        <div class="school-card-header">
          <div>
            <span class="school-logo">🏫</span>
            <div class="school-badge-row">
              ${s.code ? `<span class="school-badge school-badge-primary">Mã: ${s.code}</span>` : ''}
              <span class="school-badge ${typeBadge.cls}">${typeBadge.icon} ${typeBadge.text}</span>
              <span class="school-badge school-badge-info">${s.region ? 'Miền ' + s.region : (s.province || 'Việt Nam')}</span>
            </div>
          </div>
          <div class="school-card-header-actions" style="display:flex;align-items:center;gap:6px;flex-shrink:0;">
            ${compareBtnHtml}
            ${bookmarkBtnHtml}
          </div>
        </div>

        <h3 style="font-size: 17px; margin: 4px 0 8px; color: #ffffff; line-height: 1.4;">
          ${s.name}
        </h3>

        <p class="school-location" style="font-size: 13px; margin: 0 0 10px;">
          📍 ${s.province ? s.province : 'Chưa xác định'} ${s.region ? '· Vùng ' + s.region : ''}
        </p>

        <p style="font-size: 13.5px; line-height: 1.5; color: #cbd5e1; margin-bottom: 10px; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">
          ${s.description}
        </p>

        <div style="margin: 10px 0; font-size: 13px;">
          <b style="color: #a78bfa;">Ngành tiêu biểu:</b>
          <div style="display: flex; flex-wrap: wrap; gap: 4px; margin-top: 6px;">
            ${majorsHtml || '<span style="color:#64748b;">Đa ngành đào tạo</span>'}
          </div>
        </div>

        <div style="background: rgba(255,255,255,0.035); padding: 10px 12px; border-radius: 10px; margin: 12px 0; font-size: 12.5px; border: 1px solid rgba(255,255,255,0.06);">
          ${s.score_range ? `<div style="margin-bottom: 4px;"><span style="color:#94a3b8;">Khung điểm chuẩn:</span> <strong style="color:#fde047;">${s.score_range}đ</strong></div>` : ''}
          <div><span style="color:#94a3b8;">Tổ hợp xét tuyển:</span> <span style="color:#c7d2fe; font-weight:600;">${combosHtml || 'A00, A01, D01'}</span></div>
        </div>

        <div style="display: flex; gap: 8px; flex-wrap: wrap; margin-top: auto; padding-top: 8px;">
          <button
            type="button"
            class="btn small primary"
            style="padding: 7px 14px; font-size: 12.5px;"
            onclick="showSchoolModalById('${s.id}', false)">
            🔍 Xem chi tiết
          </button>
          <button
            type="button"
            class="btn small btn-compare-action ${isCompared ? 'primary' : 'secondary'}"
            data-compare-id="${s.id}"
            style="padding: 7px 12px; font-size: 12.5px;"
            onclick="handleCompareCardClick(event, '${s.id}')">
            ⚖️ ${isCompared ? 'Đang so sánh' : 'So sánh'}
          </button>
          <a
            href="${s.website}"
            target="_blank"
            rel="noopener"
            class="btn small secondary"
            style="text-decoration: none; font-size: 12.5px; padding: 7px 12px;">
            🌐 Cổng tuyển sinh
          </a>
        </div>
      </article>
    `;
  } else {
    // Thẻ trường Thế giới (Du học)
    const strengthsHtml = (s.strengths || []).slice(0, 4).map(st => `<span class="school-bench-chip" style="background:rgba(99,102,241,0.15);color:#c7d2fe;">${st}</span>`).join('');

    return `
      <article class="school-card ${isCompared ? 'card-selected-compare' : ''}" data-school-card-id="${s.id}">
        <div class="school-card-header">
          <div>
            <span class="school-logo">🌍</span>
            <div class="school-badge-row">
              <span class="school-badge school-badge-rank">🏆 Top #${s.rank}</span>
              <span class="school-badge school-badge-info">${s.country}</span>
              <span class="school-badge school-badge-primary">${s.continent}</span>
            </div>
          </div>
          <div class="school-card-header-actions" style="display:flex;align-items:center;gap:6px;flex-shrink:0;">
            ${compareBtnHtml}
            ${bookmarkBtnHtml}
          </div>
        </div>

        <h3 style="font-size: 17px; margin: 4px 0 8px; color: #ffffff; line-height: 1.4;">
          ${s.name}
        </h3>

        <p class="school-location" style="font-size: 13px; margin: 0 0 10px;">
          📍 ${s.city ? s.city + ', ' : ''}${s.country}
        </p>

        <div style="margin: 10px 0; font-size: 13px;">
          <b style="color: #67e8f9;">Ngành thế mạnh hàng đầu:</b>
          <div style="display: flex; flex-wrap: wrap; gap: 4px; margin-top: 6px;">
            ${strengthsHtml || '<span style="color:#64748b;">Đa ngành quốc tế</span>'}
          </div>
        </div>

        <div style="background: rgba(255,255,255,0.035); padding: 10px 12px; border-radius: 10px; margin: 12px 0; font-size: 12.5px; border: 1px solid rgba(255,255,255,0.06);">
          <div style="margin-bottom: 4px;"><span style="color:#94a3b8;">Yêu cầu đầu vào:</span> <span style="color:#f1f5f9;">${s.requirements}</span></div>
          <div><span style="color:#94a3b8;">Học bổng:</span> <span style="color:#4ade80;">${s.scholarship_info}</span></div>
        </div>

        <div style="display: flex; gap: 8px; flex-wrap: wrap; margin-top: auto; padding-top: 8px;">
          <button
            type="button"
            class="btn small primary"
            style="padding: 7px 14px; font-size: 12.5px;"
            onclick="showSchoolModalById('${s.id}', true)">
            🔍 Xem chi tiết
          </button>
          <button
            type="button"
            class="btn small btn-compare-action ${isCompared ? 'primary' : 'secondary'}"
            data-compare-id="${s.id}"
            style="padding: 7px 12px; font-size: 12.5px;"
            onclick="handleCompareCardClick(event, '${s.id}')">
            ⚖️ ${isCompared ? 'Đang so sánh' : 'So sánh'}
          </button>
          <a
            href="${s.website}"
            target="_blank"
            rel="noopener"
            class="btn small secondary"
            style="text-decoration: none; font-size: 12.5px; padding: 7px 12px;">
            🌐 Website trường
          </a>
        </div>
      </article>
    `;
  }
}

/**
 * Hiển thị danh sách thẻ trường kèm phân trang và xem thêm (chunked rendering)
 */
function renderSchoolList() {
  const container = document.getElementById('schools');
  const countLabel = document.getElementById('schoolCountLabel');
  const paginationContainer = document.getElementById('schoolPagination');
  const loadMoreContainer = document.getElementById('schoolLoadMoreWrap');

  if (!container) return;

  const total = filteredSchoolList.length;
  const totalPages = Math.max(1, Math.ceil(total / SCHOOLS_PER_PAGE));

  if (currentSchoolPage > totalPages) currentSchoolPage = totalPages;
  if (currentSchoolPage < 1) currentSchoolPage = 1;

  // Trường hợp danh sách rỗng
  if (total === 0) {
    if (countLabel) {
      const tabName = currentSchoolTab === 'vn' ? 'Đại học & Cao đẳng Việt Nam' : 'Đại học Thế giới';
      countLabel.innerHTML = `Không tìm thấy trường nào phù hợp trong <b>${tabName}</b>`;
    }
    container.innerHTML = `
      <div class="school-empty-state" style="grid-column: 1 / -1;">
        <div style="font-size: 40px; margin-bottom: 12px;">🔍</div>
        <h3 style="color:#ffffff; margin: 0 0 8px; font-size: 18px;">Không tìm thấy trường phù hợp</h3>
        <p style="color:#94a3b8; font-size: 14px; max-width: 520px; margin: 0 auto 16px; line-height: 1.6;">
          Hãy thử xóa bớt từ khóa, nới lỏng khung điểm sàn hoặc chuyển đổi qua lại giữa 2 tab để khám phá thêm cơ hội.
        </p>
        <button type="button" class="btn primary" onclick="resetSchoolFilters()">
          ↺ Đặt lại toàn bộ bộ lọc
        </button>
      </div>
    `;
    if (loadMoreContainer) {
      loadMoreContainer.style.display = 'none';
      loadMoreContainer.innerHTML = '';
    }
    if (paginationContainer) paginationContainer.innerHTML = '';
    return;
  }

  // Giới hạn visibleSchoolCount tối đa bằng total
  if (visibleSchoolCount > total) visibleSchoolCount = total;
  if (visibleSchoolCount < Math.min(SCHOOLS_PER_PAGE, total)) {
    visibleSchoolCount = Math.min(SCHOOLS_PER_PAGE, total);
  }

  // Cập nhật nhãn đếm
  if (countLabel) {
    countLabel.innerHTML = `Hiển thị <b>1 – ${visibleSchoolCount}</b> trong tổng số <b>${total}</b> trường tìm thấy (Đã tải <b>${visibleSchoolCount}/${total}</b> · Trang <b>${currentSchoolPage}/${totalPages}</b>)`;
  }

  // Lấy danh sách trường hiển thị đợt này (chunked 24 trường)
  const itemsToRender = filteredSchoolList.slice(0, visibleSchoolCount);

  // Render thẻ trường vào DOM trong một lần duy nhất (zero-jank)
  container.innerHTML = itemsToRender.map(s => renderSchoolCardHtml(s)).join('');

  // Render nút Xem thêm 24 trường và thanh phân trang
  renderSchoolLoadMoreAndPagination(total, SCHOOLS_PER_PAGE, currentSchoolPage, visibleSchoolCount);
}

/**
 * Tải thêm 24 trường tiếp theo vào DOM (zero-jank append qua insertAdjacentHTML)
 */
function loadMoreSchools() {
  const container = document.getElementById('schools');
  const countLabel = document.getElementById('schoolCountLabel');
  if (!container) return;

  const total = filteredSchoolList.length;
  if (visibleSchoolCount >= total) return;

  const nextStart = visibleSchoolCount;
  const nextEnd = Math.min(nextStart + SCHOOLS_PER_PAGE, total);
  const nextSlice = filteredSchoolList.slice(nextStart, nextEnd);

  visibleSchoolCount = nextEnd;
  currentSchoolPage = Math.ceil(visibleSchoolCount / SCHOOLS_PER_PAGE);

  // Nối thêm thẻ mới qua insertAdjacentHTML (không vẽ lại toàn bộ DOM đã có)
  const newCardsHtml = nextSlice.map(s => renderSchoolCardHtml(s)).join('');
  container.insertAdjacentHTML('beforeend', newCardsHtml);

  // Cập nhật nhãn đếm
  const totalPages = Math.max(1, Math.ceil(total / SCHOOLS_PER_PAGE));
  if (countLabel) {
    countLabel.innerHTML = `Hiển thị <b>1 – ${visibleSchoolCount}</b> trong tổng số <b>${total}</b> trường tìm thấy (Đã tải <b>${visibleSchoolCount}/${total}</b> · Trang <b>${currentSchoolPage}/${totalPages}</b>)`;
  }

  // Cập nhật lại nút xem thêm và phân trang
  renderSchoolLoadMoreAndPagination(total, SCHOOLS_PER_PAGE, currentSchoolPage, visibleSchoolCount);
}

/**
 * Xử lý click bookmark từ thẻ
 */
function handleSchoolBookmarkClick(event, encodedName, isGlobal) {
  event.stopPropagation();
  const schoolName = decodeURIComponent(encodedName);
  const list = isGlobal ? globalSchoolList : vnSchoolList;
  const schoolObj = list.find(s => s.name === schoolName) || null;
  toggleSchoolBookmark(schoolName, schoolObj);
}

/**
 * Render nút "Xem thêm 24 trường" và thanh phân trang
 */
function renderSchoolLoadMoreAndPagination(totalItems, itemsPerPage, currentPage, visibleCount) {
  let loadMoreContainer = document.getElementById('schoolLoadMoreWrap');
  const paginationContainer = document.getElementById('schoolPagination');

  if (!loadMoreContainer && paginationContainer) {
    loadMoreContainer = document.createElement('div');
    loadMoreContainer.id = 'schoolLoadMoreWrap';
    loadMoreContainer.className = 'school-load-more-wrap';
    paginationContainer.parentNode.insertBefore(loadMoreContainer, paginationContainer);
  }

  const remaining = Math.max(0, totalItems - visibleCount);

  // 1. Render nút "Xem thêm 24 trường"
  if (loadMoreContainer) {
    if (remaining > 0) {
      const nextBatchSize = Math.min(itemsPerPage, remaining);
      loadMoreContainer.style.display = 'flex';
      loadMoreContainer.innerHTML = `
        <button
          type="button"
          class="school-load-more-btn"
          onclick="loadMoreSchools()"
          title="Tải thêm ${nextBatchSize} trường vào danh sách"
        >
          <span>⬇️ Xem thêm ${nextBatchSize} trường</span>
          <span style="font-size:12px;opacity:0.85;font-weight:500;">(Còn ${remaining} trường)</span>
        </button>
      `;
    } else {
      loadMoreContainer.style.display = 'none';
      loadMoreContainer.innerHTML = '';
    }
  }

  // 2. Render thanh phân trang
  if (paginationContainer) {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    if (totalPages <= 1) {
      paginationContainer.innerHTML = '';
      return;
    }

    let html = `
      <button
        type="button"
        class="page-btn"
        ${currentPage === 1 ? 'disabled' : ''}
        onclick="goToSchoolPage(${currentPage - 1})"
        title="Trang trước"
      >
        « Trước
      </button>
    `;

    // Hiển thị các số trang thông minh
    const pageNumbers = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pageNumbers.push(i);
    } else {
      pageNumbers.push(1);
      if (currentPage > 3) pageNumbers.push('...');
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);
      for (let i = start; i <= end; i++) pageNumbers.push(i);
      if (currentPage < totalPages - 2) pageNumbers.push('...');
      pageNumbers.push(totalPages);
    }

    pageNumbers.forEach(p => {
      if (p === '...') {
        html += `<span class="page-ellipsis" style="color:#94a3b8;padding:0 6px;">...</span>`;
      } else {
        html += `
          <button
            type="button"
            class="page-btn ${p === currentPage ? 'active' : ''}"
            onclick="goToSchoolPage(${p})"
          >
            ${p}
          </button>
        `;
      }
    });

    html += `
      <button
        type="button"
        class="page-btn"
        ${currentPage === totalPages ? 'disabled' : ''}
        onclick="goToSchoolPage(${currentPage + 1})"
        title="Trang sau"
      >
        Sau »
      </button>
    `;

    paginationContainer.innerHTML = html;
  }
}

/**
 * Chuyển trang và cuộn mượt về đầu danh sách trường
 */
function goToSchoolPage(page) {
  const total = filteredSchoolList.length;
  const totalPages = Math.max(1, Math.ceil(total / SCHOOLS_PER_PAGE));
  if (page < 1) page = 1;
  if (page > totalPages) page = totalPages;

  currentSchoolPage = page;
  const startIndex = (page - 1) * SCHOOLS_PER_PAGE;
  const endIndex = Math.min(startIndex + SCHOOLS_PER_PAGE, total);

  const container = document.getElementById('schools');
  const countLabel = document.getElementById('schoolCountLabel');
  if (container) {
    const pageItems = filteredSchoolList.slice(startIndex, endIndex);
    container.innerHTML = pageItems.map(s => renderSchoolCardHtml(s)).join('');
  }

  visibleSchoolCount = endIndex;

  if (countLabel) {
    countLabel.innerHTML = `Hiển thị <b>${startIndex + 1} – ${endIndex}</b> trong tổng số <b>${total}</b> trường tìm thấy (Trang <b>${currentSchoolPage}/${totalPages}</b>)`;
  }

  renderSchoolLoadMoreAndPagination(total, SCHOOLS_PER_PAGE, currentSchoolPage, visibleSchoolCount);

  const section = document.getElementById('schoolsSection');
  if (section) {
    section.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

/**
 * Hiển thị Modal chi tiết trường
 */
async function showSchoolModalById(schoolId, isGlobal) {
  if (isGlobal && (!globalSchoolList || globalSchoolList.length === 0)) {
    await ensureGlobalSchoolDataLoaded();
  }
  const list = isGlobal ? globalSchoolList : vnSchoolList;
  const s = list.find(item => item.id === schoolId) || null;
  if (!s) return;

  const modal = document.getElementById('schoolModal');
  const detail = document.getElementById('schoolDetail');
  if (!modal || !detail) return;

  const bookmarked = isSchoolBookmarked(s.id);
  const isCompared = isSchoolSelectedForCompare(s.id);

  if (!isGlobal) {
    // Chi tiết trường Việt Nam
    const majorsHtml = (s.majors || []).map(m => `<span class="school-bench-chip" style="background:rgba(255,255,255,0.08);color:#f1f5f9;margin:2px 4px 2px 0;">${m}</span>`).join('');
    const combosHtml = (s.combinations || []).join(' · ');
    const methodsHtml = (s.admission_methods || []).map(m => `<li>${m}</li>`).join('');
    const typeBadge = getVNSchoolTypeBadge(s.type);

    detail.innerHTML = `
      <p class="eyebrow">THÔNG TIN CHI TIẾT CƠ SỞ ĐÀO TẠO</p>
      <h2 style="font-size: 24px; margin: 4px 0 8px; color:#ffffff;">${s.name}</h2>
      <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;margin-bottom:16px;">
        <span class="school-badge ${typeBadge.cls}">${typeBadge.icon} ${typeBadge.text}</span>
        ${s.code ? `<span class="school-badge school-badge-primary">Mã: ${s.code}</span>` : ''}
        <span class="school-location" style="font-size: 14px; margin: 0;">📍 ${s.province || 'Chưa xác định'} · Vùng ${s.region || 'Cả nước'}</span>
      </div>

      <div class="detail-grid">
        <div>
          <b>📚 Ngành đào tạo tiêu biểu</b>
          <div style="display:flex;flex-wrap:wrap;gap:4px;margin-top:6px;">
            ${majorsHtml || 'Đa ngành'}
          </div>
        </div>

        <div>
          <b>ℹ️ Giới thiệu chung</b>
          <p>${s.description}</p>
        </div>

        <div>
          <b>📐 Tổ hợp &amp; Điểm chuẩn tham khảo</b>
          <p style="margin-bottom:6px;"><b>Tổ hợp:</b> ${combosHtml || 'A00, A01, D01'}</p>
          <p><b>Khung điểm sàn/chuẩn:</b> <strong style="color:#fde047;">${s.score_range || 'Theo đề án trường'}</strong></p>
        </div>

        <div>
          <b>💰 Học phí tham khảo</b>
          <p>${s.tuitionRange || 'Theo quy định hiện hành'}</p>
        </div>

        <div style="grid-column: 1 / -1;">
          <b>🎓 Phương thức tuyển sinh áp dụng</b>
          <ul style="margin: 6px 0 0 18px; padding: 0; color: #cbd5e1; line-height: 1.6;">
            ${methodsHtml}
          </ul>
        </div>
      </div>

      <div class="actions" style="display:flex;gap:10px;flex-wrap:wrap;align-items:center;">
        <a class="btn primary" href="${s.website}" target="_blank" rel="noopener">
          🌐 Cổng tuyển sinh chính thức / Website
        </a>
        <button
          type="button"
          class="btn secondary ${isCompared ? 'active' : ''}"
          style="display:inline-flex;align-items:center;gap:6px;color:#c7d2fe;"
          onclick="toggleCompareSchool('${s.id}'); showSchoolModalById('${s.id}', false);">
          ⚖️ ${isCompared ? 'Đang so sánh (Bỏ chọn)' : 'Thêm vào so sánh'}
        </button>
        <button
          type="button"
          id="modalBookmarkBtn"
          data-school-id="${s.id}"
          data-school-name="${encodeURIComponent(s.name)}"
          class="btn secondary ${bookmarked ? 'bookmarked' : ''}"
          style="display:inline-flex;align-items:center;gap:6px;color:#fde047;"
          onclick="toggleSchoolBookmark('${s.id}', null); showSchoolModalById('${s.id}', false);">
          ${bookmarked ? '⭐ Đã lưu trong nguyện vọng' : '☆ Lưu vào mục tiêu'}
        </button>
        <button type="button" class="btn secondary" onclick="closeSchoolModal()">
          Đóng
        </button>
      </div>

      <p class="tiny" style="margin-top: 14px; color: #94a3b8;">
        ⚠️ Thông tin tuyển sinh có thể thay đổi theo từng đợt xét tuyển. Thí sinh vui lòng tra cứu thông báo tuyển sinh chính thức của trường trước khi ra quyết định.
      </p>
    `;
  } else {
    // Chi tiết trường Thế giới (Du học)
    const strengthsHtml = (s.strengths || []).map(st => `<span class="school-bench-chip" style="background:rgba(99,102,241,0.2);color:#c7d2fe;margin:2px 4px 2px 0;">${st}</span>`).join('');

    detail.innerHTML = `
      <p class="eyebrow">GLOBAL UNIVERSITY PROFILE</p>
      <h2 style="font-size: 24px; margin: 4px 0 8px; color:#ffffff;">${s.name}</h2>
      <p class="school-location" style="font-size: 14px; margin-bottom: 16px;">
        🏆 <b>${s.ranking_source || 'OpenAlex Citation Rank'}: #${s.rank}</b> · 📍 ${s.city ? s.city + ', ' : ''}${s.country} (${s.continent})
      </p>

      <div class="detail-grid">
        <div>
          <b>🔬 Chuyên ngành thế mạnh toàn cầu</b>
          <div style="display:flex;flex-wrap:wrap;gap:4px;margin-top:6px;">
            ${strengthsHtml || 'Đa ngành xuất sắc'}
          </div>
        </div>

        <div>
          <b>🎯 Yêu cầu tuyển sinh quốc tế</b>
          <p>${s.requirements}</p>
        </div>

        <div style="grid-column: 1 / -1;">
          <b>🎁 Chính sách học bổng &amp; Hỗ trợ tài chính</b>
          <p style="color:#4ade80;font-weight:500;">${s.scholarship_info}</p>
        </div>
      </div>

      <div class="actions" style="display:flex;gap:10px;flex-wrap:wrap;align-items:center;">
        <a class="btn primary" href="${s.website}" target="_blank" rel="noopener">
          🌐 Trang chủ &amp; Tuyển sinh quốc tế
        </a>
        <button
          type="button"
          class="btn secondary ${isCompared ? 'active' : ''}"
          style="display:inline-flex;align-items:center;gap:6px;color:#c7d2fe;"
          onclick="toggleCompareSchool('${s.id}'); showSchoolModalById('${s.id}', true);">
          ⚖️ ${isCompared ? 'Đang so sánh (Bỏ chọn)' : 'Thêm vào so sánh'}
        </button>
        <button
          type="button"
          id="modalBookmarkBtn"
          data-school-id="${s.id}"
          data-school-name="${encodeURIComponent(s.name)}"
          class="btn secondary ${bookmarked ? 'bookmarked' : ''}"
          style="display:inline-flex;align-items:center;gap:6px;color:#fde047;"
          onclick="toggleSchoolBookmark('${s.id}', null); showSchoolModalById('${s.id}', true);">
          ${bookmarked ? '⭐ Đã lưu trong nguyện vọng' : '☆ Lưu vào mục tiêu'}
        </button>
        <button type="button" class="btn secondary" onclick="closeSchoolModal()">
          Đóng
        </button>
      </div>

      <p class="tiny" style="margin-top: 14px; color: #94a3b8;">
        ⚠️ Điều kiện GPA, SAT và ngoại ngữ có thể thay đổi tùy ngành học và khoa. Hãy kiểm tra trực tiếp trên cổng thông tin International Admissions của trường.
      </p>
    `;
  }

  modal.hidden = false;
}

/**
 * Đóng Modal chi tiết trường
 */
function closeSchoolModal() {
  const modal = document.getElementById('schoolModal');
  if (modal) modal.hidden = true;
}

// Backward compatibility alias for any existing click handlers
window.closeSchool = closeSchoolModal;
window.showSchool = function(index) {
  if (vnSchoolList[index]) {
    showSchoolModalById(vnSchoolList[index].id, false);
  }
};

/**
 * Cập nhật gợi ý hồ sơ hiện tại của học sinh
 */
function updateProfileHint() {
  const profileHint = document.getElementById('profileHint');
  if (!profileHint) return;

  try {
    const p = typeof getProfile === 'function' ? getProfile() : {};
    const goal = p.goals && p.goals.selected && p.goals.selected.length
      ? p.goals.selected.join(', ')
      : 'chưa chọn ngành';
    const province = p.info && p.info.province ? p.info.province : 'chưa chọn tỉnh/thành';
    const grade = p.info && p.info.grade ? 'lớp ' + p.info.grade : 'chưa chọn lớp';

    profileHint.innerHTML = `
      🎯 <b>Hồ sơ hiện tại:</b> ${province} · ${grade} · ngành quan tâm: <b>${goal}</b>
    `;
  } catch (e) {
    profileHint.innerHTML = `
      🎯 Hoàn thành 5 bước định hướng để NS AI gợi ý trường đại học phù hợp nhất với năng lực của bạn.
    `;
  }
}

/**
 * Khởi tạo toàn bộ trang Tra cứu trường học
 */
function initSchoolSearchEngine() {
  // Gắn sự kiện debounce tìm kiếm 250ms cho ô nhập từ khóa
  const qInput = document.getElementById('q');
  if (qInput) {
    qInput.addEventListener('input', () => {
      debouncedApplySchoolFilters(250);
    });
    qInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        clearTimeout(schoolFilterDebounceTimer);
        currentSchoolPage = 1;
        visibleSchoolCount = SCHOOLS_PER_PAGE;
        applySchoolFilters();
      }
    });
  }

  // Gắn sự kiện debounce 250ms cho tất cả các select bộ lọc VN
  ['filterRegion', 'filterTypeVN', 'filterCombo', 'filterScoreRange'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.addEventListener('change', () => debouncedApplySchoolFilters(250));
  });

  // Gắn sự kiện debounce 250ms cho tất cả các select bộ lọc Global
  ['filterCountry', 'filterRank', 'filterStrength'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.addEventListener('change', () => debouncedApplySchoolFilters(250));
  });

  // Modal chi tiết trường: backdrop click và phím ESC
  const modal = document.getElementById('schoolModal');
  if (modal) {
    modal.addEventListener('click', function(e) {
      if (e.target.id === 'schoolModal') closeSchoolModal();
    });
  }

  // Modal so sánh: backdrop click
  const compareModal = document.getElementById('schoolCompareModal');
  if (compareModal) {
    compareModal.addEventListener('click', function(e) {
      if (e.target.id === 'schoolCompareModal') closeSchoolCompareModal();
    });
  }

  // Phím ESC đóng cả 2 modal
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      closeSchoolModal();
      closeSchoolCompareModal();
    }
  });

  // Cập nhật gợi ý hồ sơ
  updateProfileHint();

  // Bắt đầu tải dữ liệu trường học (chỉ tải danh mục trường VN trước)
  loadAllSchoolData();
}

// Xuất các hàm ra đối tượng window để tương thích đầy đủ
window.findSchoolById = findSchoolById;
window.findSchoolByName = findSchoolByName;
window.getFavoriteSchoolIds = getFavoriteSchoolIds;
window.getFavoriteSchoolObjects = getFavoriteSchoolObjects;
window.getBookmarkedSchools = getBookmarkedSchools;
window.isSchoolBookmarked = isSchoolBookmarked;
window.toggleSchoolBookmark = toggleSchoolBookmark;
window.toggleFavoritesOnlyFilter = toggleFavoritesOnlyFilter;
window.toggleCompareSchool = toggleCompareSchool;
window.handleCompareCardClick = handleCompareCardClick;
window.removeCompareSchool = removeCompareSchool;
window.clearSchoolCompareSelection = clearSchoolCompareSelection;
window.openSchoolCompareModal = openSchoolCompareModal;
window.closeSchoolCompareModal = closeSchoolCompareModal;
window.renderComparisonDock = renderComparisonDock;
window.ensureGlobalSchoolDataLoaded = ensureGlobalSchoolDataLoaded;
window.loadMoreSchools = loadMoreSchools;
window.goToSchoolPage = goToSchoolPage;
window.debouncedApplySchoolFilters = debouncedApplySchoolFilters;
window.renderSchoolCardHtml = renderSchoolCardHtml;

// Tự động khởi chạy khi DOM sẵn sàng
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initSchoolSearchEngine);
} else {
  initSchoolSearchEngine();
}

