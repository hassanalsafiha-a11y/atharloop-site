/* Athar Sourcing — Accessible Interactive Controller (file:// & HTTPS safe) */
(function () {
  'use strict';

  var docEl = document.documentElement;
  var lang = docEl.getAttribute('lang') === 'en' ? 'en' : 'ar';

  /* 1. Mobile Navigation Drawer */
  var menuBtn = document.getElementById('menuToggle');
  var mobileDrawer = document.getElementById('mobileDrawer');
  if (menuBtn && mobileDrawer) {
    menuBtn.addEventListener('click', function () {
      var open = mobileDrawer.classList.toggle('is-open');
      menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    var drawerLinks = mobileDrawer.querySelectorAll('a');
    for (var i = 0; i < drawerLinks.length; i++) {
      drawerLinks[i].addEventListener('click', function () {
        mobileDrawer.classList.remove('is-open');
        menuBtn.setAttribute('aria-expanded', 'false');
      });
    }
    document.addEventListener('keydown', function (ev) {
      if (ev.key === 'Escape' && mobileDrawer.classList.contains('is-open')) {
        mobileDrawer.classList.remove('is-open');
        menuBtn.setAttribute('aria-expanded', 'false');
        menuBtn.focus();
      }
    });
  }

  /* 2. Synchronized Audience Mode (Hero Lens <-> Partnership Form Track) */
  var formEl = document.getElementById('partnershipForm');
  var activeTrack = 'buyer';

  function applyFormTrack(track) {
    activeTrack = track === 'factory' ? 'factory' : 'buyer';
    var trackBtns = document.querySelectorAll('[data-track]');
    for (var i = 0; i < trackBtns.length; i++) {
      var isMatch = trackBtns[i].getAttribute('data-track') === activeTrack;
      trackBtns[i].setAttribute('aria-selected', isMatch ? 'true' : 'false');
    }
    if (!formEl) return;
    var trackInput = document.getElementById('fieldTrack');
    if (trackInput) trackInput.value = activeTrack;

    var swaps = formEl.querySelectorAll('[data-buyer-text]');
    for (var j = 0; j < swaps.length; j++) {
      var el = swaps[j];
      el.textContent = el.getAttribute(activeTrack === 'factory' ? 'data-factory-text' : 'data-buyer-text');
    }
    var phSwaps = formEl.querySelectorAll('[data-buyer-ph]');
    for (var k = 0; k < phSwaps.length; k++) {
      var inp = phSwaps[k];
      inp.setAttribute('placeholder', inp.getAttribute(activeTrack === 'factory' ? 'data-factory-ph' : 'data-buyer-ph'));
    }
    var scopeSelect = document.getElementById('fieldScope');
    if (scopeSelect) {
      var rawOpts = scopeSelect.getAttribute(activeTrack === 'factory' ? 'data-factory-options' : 'data-buyer-options');
      if (rawOpts) {
        var list = rawOpts.split('||');
        scopeSelect.innerHTML = '';
        for (var m = 0; m < list.length; m++) {
          var opt = document.createElement('option');
          opt.value = list[m];
          opt.textContent = list[m];
          scopeSelect.appendChild(opt);
        }
      }
    }
  }

  function applyHeroLens(mode) {
    var target = mode === 'factory' ? 'factory' : 'buyer';
    var lensBtns = document.querySelectorAll('[data-lens]');
    for (var i = 0; i < lensBtns.length; i++) {
      var active = lensBtns[i].getAttribute('data-lens') === target;
      lensBtns[i].setAttribute('aria-selected', active ? 'true' : 'false');
    }
    var panels = document.querySelectorAll('[data-lens-panel]');
    for (var j = 0; j < panels.length; j++) {
      var show = panels[j].getAttribute('data-lens-panel') === target;
      if (show) {
        panels[j].removeAttribute('hidden');
      } else {
        panels[j].setAttribute('hidden', '');
      }
    }
    applyFormTrack(target);
  }

  var lensTriggers = document.querySelectorAll('[data-lens]');
  for (var lt = 0; lt < lensTriggers.length; lt++) {
    lensTriggers[lt].addEventListener('click', function () {
      applyHeroLens(this.getAttribute('data-lens'));
    });
  }

  var trackTriggers = document.querySelectorAll('[data-track]');
  for (var tt = 0; tt < trackTriggers.length; tt++) {
    trackTriggers[tt].addEventListener('click', function () {
      applyFormTrack(this.getAttribute('data-track'));
    });
  }

  /* 3. Section 01: Gap Diagnostic Tabs */
  var gapTabs = document.querySelectorAll('[data-gap-tab]');
  for (var gt = 0; gt < gapTabs.length; gt++) {
    gapTabs[gt].addEventListener('click', function () {
      var targetId = this.getAttribute('data-gap-tab');
      for (var x = 0; x < gapTabs.length; x++) {
        gapTabs[x].setAttribute('aria-selected', gapTabs[x] === this ? 'true' : 'false');
      }
      var panels = document.querySelectorAll('[data-gap-panel]');
      for (var y = 0; y < panels.length; y++) {
        if (panels[y].getAttribute('data-gap-panel') === targetId) {
          panels[y].removeAttribute('hidden');
        } else {
          panels[y].setAttribute('hidden', '');
        }
      }
    });
  }

  /* 4. CSS Grid Accordions (4 Pillars & Governance FAQs) */
  var accTriggers = document.querySelectorAll('.accordion-trigger');
  for (var ac = 0; ac < accTriggers.length; ac++) {
    accTriggers[ac].addEventListener('click', function () {
      var card = this.closest('.accordion-card');
      if (!card) return;
      var group = card.parentElement;
      var willOpen = !card.classList.contains('is-open');
      if (group && group.getAttribute('data-single-open') === 'true') {
        var siblings = group.querySelectorAll('.accordion-card');
        for (var s = 0; s < siblings.length; s++) {
          siblings[s].classList.remove('is-open');
          var btn = siblings[s].querySelector('.accordion-trigger');
          if (btn) btn.setAttribute('aria-expanded', 'false');
        }
      }
      card.classList.toggle('is-open', willOpen);
      this.setAttribute('aria-expanded', willOpen ? 'true' : 'false');
    });
  }

  /* 5. Section 02: 6-Stage Athar QA Inspector */
  var qaBtns = document.querySelectorAll('[data-qa-stage]');
  var qaBox = document.getElementById('qaDetailBox');
  for (var qb = 0; qb < qaBtns.length; qb++) {
    qaBtns[qb].addEventListener('click', function () {
      for (var k = 0; k < qaBtns.length; k++) {
        qaBtns[k].setAttribute('aria-selected', qaBtns[k] === this ? 'true' : 'false');
      }
      if (qaBox) {
        qaBox.textContent = this.getAttribute('data-qa-detail') || '';
      }
    });
  }

  /* 6. Section 03: Flagship ESG Report Dimension Filter */
  var esgTabs = document.querySelectorAll('[data-esg-filter]');
  var esgCards = document.querySelectorAll('.esg-row-card');
  for (var ef = 0; ef < esgTabs.length; ef++) {
    esgTabs[ef].addEventListener('click', function () {
      var dim = this.getAttribute('data-esg-filter');
      for (var k = 0; k < esgTabs.length; k++) {
        esgTabs[k].setAttribute('aria-selected', esgTabs[k] === this ? 'true' : 'false');
      }
      for (var c = 0; c < esgCards.length; c++) {
        var cardDim = esgCards[c].getAttribute('data-dim');
        if (dim === 'all' || cardDim === dim) {
          esgCards[c].removeAttribute('hidden');
        } else {
          esgCards[c].setAttribute('hidden', '');
        }
      }
    });
  }

  /* 7. Section 04: 35% / 35% / 30% Statutory Escrow Ring Inspector */
  var sliceBtns = document.querySelectorAll('[data-escrow-idx]');
  var ringArcs = document.querySelectorAll('.escrow-arc');
  var ringPct = document.getElementById('escrowRingPct');
  var escrowDetail = document.getElementById('escrowDetailBox');

  function activateEscrowSlice(idxStr) {
    for (var i = 0; i < sliceBtns.length; i++) {
      var match = sliceBtns[i].getAttribute('data-escrow-idx') === idxStr;
      sliceBtns[i].setAttribute('aria-selected', match ? 'true' : 'false');
      if (match) {
        if (ringPct) ringPct.textContent = sliceBtns[i].getAttribute('data-escrow-pct') || '35%';
        if (escrowDetail) escrowDetail.textContent = sliceBtns[i].getAttribute('data-escrow-detail') || '';
      }
    }
    for (var a = 0; a < ringArcs.length; a++) {
      var arcMatch = ringArcs[a].getAttribute('data-slice') === idxStr;
      ringArcs[a].classList.toggle('is-active', arcMatch);
    }
  }

  for (var sb = 0; sb < sliceBtns.length; sb++) {
    sliceBtns[sb].addEventListener('click', function () {
      activateEscrowSlice(this.getAttribute('data-escrow-idx'));
    });
  }
  for (var ra = 0; ra < ringArcs.length; ra++) {
    ringArcs[ra].addEventListener('click', function () {
      activateEscrowSlice(this.getAttribute('data-slice'));
    });
  }

  /* 8. Section 05: 1-Click Vertical Pre-Selection */
  var vertSelectBtns = document.querySelectorAll('[data-select-vertical]');
  var verticalSelect = document.getElementById('fieldVertical');
  var startSection = document.getElementById('start');
  for (var vs = 0; vs < vertSelectBtns.length; vs++) {
    vertSelectBtns[vs].addEventListener('click', function () {
      var vKey = this.getAttribute('data-select-vertical');
      if (verticalSelect && vKey) {
        verticalSelect.value = vKey;
      }
      if (startSection) {
        startSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      var orgField = document.getElementById('fieldOrg');
      if (orgField) {
        setTimeout(function () { orgField.focus({ preventScroll: true }); }, 350);
      }
    });
  }

  /* 9. Section 07: Accessible On-Blur Validation & Serverless Brief Dispatch */
  if (formEl) {
    var msgRequired = formEl.getAttribute('data-err-required') || 'Required';
    var msgEmail = formEl.getAttribute('data-err-email') || 'Invalid email';

    function validateField(input) {
      var errEl = document.getElementById(input.id + 'Err');
      var val = (input.value || '').trim();
      var errMsg = '';
      if (input.hasAttribute('required') && !val) {
        errMsg = msgRequired;
      } else if (input.type === 'email' && val && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) {
        errMsg = msgEmail;
      }
      if (errMsg) {
        input.setAttribute('aria-invalid', 'true');
        if (errEl) errEl.textContent = errMsg;
        return false;
      }
      input.setAttribute('aria-invalid', 'false');
      if (errEl) errEl.textContent = '';
      return true;
    }

    var reqInputs = formEl.querySelectorAll('input[required]');
    for (var ri = 0; ri < reqInputs.length; ri++) {
      reqInputs[ri].addEventListener('blur', function () {
        validateField(this);
      });
      reqInputs[ri].addEventListener('input', function () {
        if (this.getAttribute('aria-invalid') === 'true') {
          validateField(this);
        }
      });
    }

    function computeRefCode(seed) {
      var h = 2166136261;
      for (var i = 0; i < seed.length; i++) {
        h ^= seed.charCodeAt(i);
        h = Math.imul(h, 16777619);
      }
      var code = Math.abs(h >>> 0).toString(36).toUpperCase().slice(0, 4);
      while (code.length < 4) code = '0' + code;
      return 'ATH-2026-' + code;
    }

    formEl.addEventListener('submit', function (ev) {
      ev.preventDefault();
      var allValid = true;
      var firstInvalid = null;
      for (var i = 0; i < reqInputs.length; i++) {
        if (!validateField(reqInputs[i])) {
          allValid = false;
          if (!firstInvalid) firstInvalid = reqInputs[i];
        }
      }
      if (!allValid) {
        if (firstInvalid) firstInvalid.focus();
        return;
      }

      var org = document.getElementById('fieldOrg').value.trim();
      var role = document.getElementById('fieldRole').value.trim();
      var name = document.getElementById('fieldName').value.trim();
      var email = document.getElementById('fieldEmail').value.trim();
      var phone = document.getElementById('fieldPhone').value.trim();
      var vertEl = document.getElementById('fieldVertical');
      var vertText = vertEl.options[vertEl.selectedIndex].text;
      var scopeEl = document.getElementById('fieldScope');
      var scopeText = scopeEl.options[scopeEl.selectedIndex].text;
      var notes = (document.getElementById('fieldNotes').value || '').trim();

      var refCode = computeRefCode(org + '|' + email + '|' + vertText + '|' + activeTrack);
      var trackLabel = activeTrack === 'factory'
        ? (lang === 'en' ? 'National Host Factory / Operator' : 'مصنع أو مشغّل وطني شريك')
        : (lang === 'en' ? 'Enterprise Buyer / Gov Entity' : 'شريك توريد مؤسسي / جهة حكومية');

      var lines = lang === 'en' ? [
        'ATHAR SOURCING — INSTITUTIONAL PARTNERSHIP BRIEF',
        'Reference: ' + refCode,
        'Track: ' + trackLabel,
        'Entity / Facility: ' + org,
        'Contact: ' + name + (role ? ' (' + role + ')' : ''),
        'Email: ' + email + ' | Phone: ' + phone,
        'Target Vertical: ' + vertText,
        'Scope / Priority: ' + scopeText
      ] : [
        'شركة توليد الأثر | مذكرة طلب شراكة مؤسسية',
        'رقم المرجع: ' + refCode,
        'المسار المؤسسي: ' + trackLabel,
        'الجهة / المنشأة: ' + org,
        'مقدم الطلب: ' + name + (role ? ' (' + role + ')' : ''),
        'البريد: ' + email + ' | الجوال: ' + phone,
        'القطاع المستهدف: ' + vertText,
        'النطاق / الأولوية: ' + scopeText
      ];

      if (notes) {
        lines.push((lang === 'en' ? 'Notes: ' : 'ملاحظات إضافية: ') + notes);
      }

      var briefText = lines.join('\n');
      var subject = (lang === 'en'
        ? '[Athar Partnership ' + refCode + '] '
        : '[شراكة توليد الأثر ' + refCode + '] ') + org;

      var resultBox = document.getElementById('briefResult');
      var refSpan = document.getElementById('briefRefVal');
      var previewPre = document.getElementById('briefPreviewText');
      var mailBtn = document.getElementById('briefMailtoBtn');
      var waBtn = document.getElementById('briefWaBtn');
      var copyBtn = document.getElementById('briefCopyBtn');
      var copyStatus = document.getElementById('briefCopyStatus');

      if (refSpan) refSpan.textContent = refCode;
      if (previewPre) previewPre.textContent = briefText;
      if (mailBtn) {
        mailBtn.setAttribute(
          'href',
          'mailto:Hassan@atharloop.com?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(briefText)
        );
      }
      if (waBtn) {
        waBtn.setAttribute(
          'href',
          'https://wa.me/966590052348?text=' + encodeURIComponent(briefText)
        );
      }
      if (copyStatus) copyStatus.textContent = '';
      if (resultBox) {
        resultBox.removeAttribute('hidden');
        resultBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }

      if (copyBtn) {
        copyBtn.onclick = function () {
          var copiedMsg = copyBtn.getAttribute('data-copied-msg') || 'Copied';
          if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(briefText).then(function () {
              if (copyStatus) copyStatus.textContent = copiedMsg;
            }).catch(function () {
              fallbackCopy(briefText, copyStatus, copiedMsg);
            });
          } else {
            fallbackCopy(briefText, copyStatus, copiedMsg);
          }
        };
      }
    });
  }

  function fallbackCopy(text, statusEl, msg) {
    var ta = document.createElement('textarea');
    ta.value = text;
    ta.setAttribute('readonly', '');
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    try {
      document.execCommand('copy');
      if (statusEl) statusEl.textContent = msg;
    } catch (e) {
      /* ignore */
    }
    document.body.removeChild(ta);
  }
})();
