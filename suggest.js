'use strict';
const suggestButton = document.getElementById('suggest-button');
const suggestionEmail = 'runbickers@gmail.com';
function legacyCopy() {
  const previousFocus = document.activeElement;
  const field = document.createElement('textarea');
  field.value = suggestionEmail;
  field.readOnly = true;
  field.style.cssText = 'position:fixed;left:0;top:0;opacity:0;font-size:16px;';
  document.body.appendChild(field);
  field.select();
  field.setSelectionRange(0, field.value.length);
  try { return document.execCommand('copy'); }
  catch { return false; }
  finally {
    field.remove();
    if (previousFocus) previousFocus.focus({ preventScroll: true });
  }
}
suggestButton.addEventListener('click', async () => {
  let copied = false;
  if (window.isSecureContext && navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(suggestionEmail);
      copied = true;
    } catch { copied = legacyCopy(); }
  } else { copied = legacyCopy(); }
  if (copied) {
    window.alert('제안사항을 보낼 이메일 주소가 복사되었습니다. 감사합니다');
  } else {
    window.prompt('자동 복사가 제한되어 있습니다. 아래 이메일 주소를 직접 복사해 주세요.', suggestionEmail);
  }
});
