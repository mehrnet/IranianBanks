// App.js - IranianBanks Web Showcase Controller
(function () {
  'use strict';

  var currentFilter = 'all';
  var searchQuery = '';
  var banks = IranianBanks.BANKS;

  var cardInput = document.getElementById('cardShebaInput');
  var previewLogo = document.getElementById('previewBankLogo');
  var resultPanel = document.getElementById('resultPanel');
  var banksGrid = document.getElementById('banksGrid');

  // Input live listener
  cardInput.addEventListener('input', function () {
    handleDetection(cardInput.value);
  });

  window.testSample = function (val) {
    cardInput.value = val;
    handleDetection(val);
  };

  function handleDetection(val) {
    var detected = IranianBanks.detect(val);
    if (!detected || !detected.bank) {
      previewLogo.innerHTML = '<span style="font-size: 1.2rem; color: #64748b;">💳</span>';
      resultPanel.classList.remove('active');
      return;
    }

    var bank = detected.bank;
    previewLogo.innerHTML = '<img src="' + bank.logo_svg + '" alt="' + bank.name_fa + '">';
    resultPanel.classList.add('active');

    document.getElementById('resultBankName').textContent = bank.name_fa;
    document.getElementById('resultTypeBadge').textContent = bank.type === 'neobank' ? 'نئوبانک دیجیتال' : 'بانک رسمی';
    document.getElementById('resultTypeBadge').className = 'badge ' + (bank.type === 'neobank' ? 'success' : '');

    var validityEl = document.getElementById('resultValidityBadge');
    if (detected.valid) {
      validityEl.textContent = '✓ معتبر (الگوریتم رسمی)';
      validityEl.className = 'badge success';
    } else if (detected.type === 'partial_card') {
      validityEl.textContent = 'در حال تایپ ارقام...';
      validityEl.className = 'badge';
    } else {
      validityEl.textContent = '✗ رقم کنترلی نادرست';
      validityEl.className = 'badge';
      validityEl.style.background = 'rgba(239, 68, 68, 0.15)';
      validityEl.style.borderColor = '#EF4444';
      validityEl.style.color = '#F87171';
    }

    document.getElementById('resultIbanCode').textContent = bank.iban_code ? 'IRxx' + bank.iban_code + '...' : '-';
    document.getElementById('resultBin').textContent = (bank.bins && bank.bins.length > 0) ? bank.bins.join(', ') : '-';

    var formatted = detected.type === 'card'
      ? IranianBanks.formatCard(detected.normalized)
      : (detected.type === 'sheba' ? IranianBanks.formatSheba(detected.normalized) : detected.normalized);
    document.getElementById('resultFormatted').textContent = formatted;
  }

  // Filter & Search
  window.setFilter = function (filter, btn) {
    currentFilter = filter;
    document.querySelectorAll('.filter-tabs .tab-btn').forEach(function (b) {
      b.classList.remove('active');
    });
    btn.classList.add('active');
    renderGrid();
  };

  document.getElementById('searchInput').addEventListener('input', function (e) {
    searchQuery = e.target.value.trim().toLowerCase();
    renderGrid();
  });

  window.showCodeTab = function (tab, btn) {
    document.querySelectorAll('.code-tabs .tab-btn').forEach(function (b) {
      b.classList.remove('active');
    });
    btn.classList.add('active');
    ['js', 'py', 'php'].forEach(function (t) {
      var el = document.getElementById('codeTab-' + t);
      if (el) el.style.display = (t === tab) ? 'block' : 'none';
    });
  };

  function renderGrid() {
    var filtered = banks.filter(function (b) {
      if (currentFilter !== 'all' && b.type !== currentFilter) return false;
      if (!searchQuery) return true;
      var q = searchQuery;
      return (
        b.name_fa.toLowerCase().indexOf(q) !== -1 ||
        b.name_en.toLowerCase().indexOf(q) !== -1 ||
        (b.parent_bank && b.parent_bank.toLowerCase().indexOf(q) !== -1) ||
        (b.iban_code && b.iban_code.indexOf(q) !== -1) ||
        (b.bins && b.bins.some(function (bin) { return bin.indexOf(q) !== -1; }))
      );
    });

    banksGrid.innerHTML = '';
    filtered.forEach(function (b) {
      var card = document.createElement('div');
      card.className = 'bank-card';

      var binsStr = (b.bins && b.bins.length > 0) ? b.bins.slice(0, 3).join(', ') : '-';
      var parentHtml = b.parent_bank
        ? '<div style="font-size: 0.7rem; color: #a7f3d0; margin-top: 2px;">وابسته به ' + b.parent_bank + '</div>'
        : '';

      card.innerHTML =
        '<div class="bank-card-header">' +
          '<div class="bank-logo-wrap">' +
            '<img src="' + b.logo_svg + '" alt="' + b.name_fa + '" loading="lazy">' +
          '</div>' +
          '<div class="bank-info">' +
            '<div class="bank-name">' + b.name_fa + '</div>' +
            '<div class="bank-sub">' + b.name_en + '</div>' +
            parentHtml +
          '</div>' +
        '</div>' +
        '<div class="bank-meta">' +
          '<div class="bank-meta-row">' +
            '<span>پیش‌شماره کارت (BIN):</span>' +
            '<span class="meta-val">' + binsStr + '</span>' +
          '</div>' +
          '<div class="bank-meta-row">' +
            '<span>کد بانک در شبا:</span>' +
            '<span class="meta-val">' + (b.iban_code || '-') + '</span>' +
          '</div>' +
        '</div>' +
        '<div class="download-actions">' +
          '<a href="' + b.logo_svg + '" download class="dl-btn">' +
            '<span>SVG</span>' +
          '</a>' +
          '<a href="' + b.logo_png + '" download class="dl-btn">' +
            '<span>PNG</span>' +
          '</a>' +
          '<a href="' + b.website + '" target="_blank" rel="noopener noreferrer" class="dl-btn" style="flex: 0 0 32px;" title="وب‌سایت رسمی">' +
            '🌐' +
          '</a>' +
        '</div>';

      banksGrid.appendChild(card);
    });
  }

  // Initial render
  renderGrid();
})();
