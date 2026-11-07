/* Athar Sourcing — Accessible Multi-Page Controller (file:// & HTTPS safe) */
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

  /* 2. CSS Grid Accordions (4 Pillars on /partners/ & Executive FAQs on /esg/) */
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

  /* 3. Six-Stage Athar QA Inspector (/partners/) */
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

  /* 4. ESG Report Dimension Filter (/esg/) */
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

  /* 5. Statutory 35% / 35% / 30% Escrow Ring Inspector (/partners/) */
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

  /* 6. One-Click Supply Vertical Pre-Selection (Home) */
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
        setTimeout(function () { orgField.focus({ preventScroll: true }); }, 320);
      }
    });
  }

  /* 7. Accessible PDPL Validation + Backend Form Relay + Reference Brief */
  var formEl = document.getElementById('partnershipForm');
  if (formEl) {
    var msgRequired = formEl.getAttribute('data-err-required') || 'Required';
    var msgEmail = formEl.getAttribute('data-err-email') || 'Invalid email';
    var msgConsent = formEl.getAttribute('data-err-consent') || 'Consent required';
    var msgSending = formEl.getAttribute('data-msg-sending') || 'Submitting...';
    var msgSent = formEl.getAttribute('data-msg-sent') || 'Submitted.';
    var msgFallback = formEl.getAttribute('data-msg-fallback') || 'Brief ready below.';
    var ajaxEndpoint = formEl.getAttribute('data-ajax-endpoint') || '';

    function validateField(input) {
      var errEl = document.getElementById(input.id + 'Err');
      var errMsg = '';
      if (input.type === 'checkbox') {
        if (input.hasAttribute('required') && !input.checked) {
          errMsg = msgConsent;
        }
      } else {
        var val = (input.value || '').trim();
        if (input.hasAttribute('required') && !val) {
          errMsg = msgRequired;
        } else if (input.type === 'email' && val && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) {
          errMsg = msgEmail;
        }
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
      if (reqInputs[ri].type === 'checkbox') {
        reqInputs[ri].addEventListener('change', function () {
          validateField(this);
        });
      } else {
        reqInputs[ri].addEventListener('blur', function () {
          validateField(this);
        });
        reqInputs[ri].addEventListener('input', function () {
          if (this.getAttribute('aria-invalid') === 'true') {
            validateField(this);
          }
        });
      }
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

      var trackVal = (document.getElementById('fieldTrack') || {}).value || 'buyer';
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

      var refCode = computeRefCode(org + '|' + email + '|' + vertText + '|' + trackVal);
      var trackLabel = trackVal === 'factory'
        ? (lang === 'en' ? 'National Host Factory / Operator' : 'مصنع أو مشغّل وطني شريك')
        : (lang === 'en' ? 'Enterprise Buyer / Public Entity' : 'مشتري مؤسسي / جهة حكومية');

      var lines = lang === 'en' ? [
        'ATHAR SOURCING — INSTITUTIONAL PARTNERSHIP BRIEF',
        'Reference: ' + refCode,
        'Track: ' + trackLabel,
        'Organization / Facility: ' + org,
        'Contact: ' + name + (role ? ' (' + role + ')' : ''),
        'Email: ' + email + ' | Phone: ' + phone,
        'Target Vertical: ' + vertText,
        'Requirement: ' + scopeText
      ] : [
        'شركة توليد الأثر | مذكرة طلب شراكة مؤسسية',
        'رقم المرجع: ' + refCode,
        'المسار: ' + trackLabel,
        'الجهة / المنشأة: ' + org,
        'مقدم الطلب: ' + name + (role ? ' (' + role + ')' : ''),
        'البريد: ' + email + ' | الجوال: ' + phone,
        'القطاع المستهدف: ' + vertText,
        'المطلوب: ' + scopeText
      ];

      if (notes) {
        lines.push((lang === 'en' ? 'Notes: ' : 'ملاحظات إضافية: ') + notes);
      }

      var briefText = lines.join('\n');
      var subject = (lang === 'en'
        ? '[Athar Sourcing ' + refCode + '] '
        : '[توليد الأثر ' + refCode + '] ') + org;

      var resultBox = document.getElementById('briefResult');
      var statusBanner = document.getElementById('briefServerStatus');
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
          'mailto:partnerships@atharloop.com?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(briefText)
        );
      }
      if (waBtn) {
        waBtn.setAttribute(
          'href',
          'https://wa.me/966590052348?text=' + encodeURIComponent(briefText)
        );
      }
      if (copyStatus) copyStatus.textContent = '';

      var isHttp = window.location.protocol === 'http:' || window.location.protocol === 'https:';
      if (isHttp && window.fetch && ajaxEndpoint) {
        if (statusBanner) statusBanner.textContent = msgSending;
        fetch(ajaxEndpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            _subject: subject,
            _cc: 'partnerships@atharloop.com',
            _template: 'table',
            reference: refCode,
            track: trackLabel,
            organization: org,
            contact_name: name,
            role: role || '-',
            email: email,
            phone: phone,
            vertical: vertText,
            requirement: scopeText,
            notes: notes || '-',
            pdpl_consent: 'Accepted'
          })
        }).then(function (res) {
          if (statusBanner) {
            statusBanner.textContent = res.ok ? msgSent : msgFallback;
          }
        }).catch(function () {
          if (statusBanner) statusBanner.textContent = msgFallback;
        });
      } else if (statusBanner) {
        statusBanner.textContent = msgFallback;
      }

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
