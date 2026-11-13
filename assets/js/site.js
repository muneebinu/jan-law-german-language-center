(function(){
 const body=document.body, menu=document.getElementById('menu-toggle'), nav=document.getElementById('navlinks');
 function closeMenu(){nav.classList.remove('open');menu.setAttribute('aria-expanded','false');menu.setAttribute('aria-label','Open navigation menu');menu.textContent='☰';body.classList.remove('menu-open')}
 menu.addEventListener('click',function(){const opening=!nav.classList.contains('open');nav.classList.toggle('open',opening);menu.setAttribute('aria-expanded',String(opening));menu.setAttribute('aria-label',opening?'Close navigation menu':'Open navigation menu');menu.textContent=opening?'×':'☰';body.classList.toggle('menu-open',opening)});
 nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));
 document.querySelectorAll('[data-select-course]').forEach(a=>a.addEventListener('click',()=>{const choice=document.getElementById('course');const level=a.getAttribute('data-select-course');choice.value=level+'  -  PKR '+(level==='A1'?'35,000':level==='A2'?'40,000':'50,000')}));
 document.addEventListener('keydown',e=>{if(e.key==='Escape')closeMenu()});
 const form=document.getElementById('admission-form');
 const fields={name:document.getElementById('full-name'),phone:document.getElementById('phone'),course:document.getElementById('course')};
 function validPhone(v){const digits=v.replace(/\D/g,'');return digits.length>=10&&digits.length<=15}
 form.addEventListener('submit',function(e){
  e.preventDefault();
  let ok=true;
  Object.keys(fields).forEach(key=>{const input=fields[key],wrap=document.getElementById('field-'+key);let valid=key==='name'?input.value.trim().length>=2:key==='phone'?validPhone(input.value):Boolean(input.value);wrap.classList.toggle('invalid',!valid);if(!valid)ok=false});
  const email=document.getElementById('email');const emailWrap=document.getElementById('field-email');const emailValid=!email.value||email.checkValidity();emailWrap.classList.toggle('invalid',!emailValid);if(!emailValid){email.focus();ok=false}
  if(!ok){const first=form.querySelector('.field.invalid input,.field.invalid select');if(first)first.focus();return}
  const data=new FormData(form);
  const lines=['Assalamualaikum Jan Law German Language Center,','I would like to enquire about admission.','', 'Full name: '+data.get('name').trim(),'Phone number: '+data.get('phone').trim(),'Email: '+(data.get('email')||'Not provided'),'Course: '+data.get('course'),'Current German knowledge: '+data.get('knowledge'),'Preferred contact: '+data.get('contact'),'Additional message: '+(data.get('message').trim()||'None'),'','Please share the admission details and next steps.'];
  document.getElementById('form-success').classList.add('show');
  const url='https://wa.me/923189150911?text='+encodeURIComponent(lines.join('\n'));
  window.open(url,'_blank','noopener,noreferrer');
 });
 Object.values(fields).forEach(input=>input.addEventListener('input',()=>{const key=input.id==='full-name'?'name':input.id==='phone'?'phone':'course';document.getElementById('field-'+key).classList.remove('invalid')}));
 document.getElementById('email').addEventListener('input',()=>document.getElementById('field-email').classList.remove('invalid'));
 fetch('assets/jan-law-original-logo.b64').then(r=>{if(!r.ok)throw new Error('logo asset unavailable');return r.text()}).then(encoded=>{const src='data:image/png;base64,'+encoded.trim();document.querySelectorAll('#brand-logo,.footer-logo').forEach(img=>{img.src=src;img.style.visibility='visible'})}).catch(()=>{document.querySelectorAll('#brand-logo,.footer-logo').forEach(img=>{img.style.display='none'})});
 document.documentElement.classList.add('js-ready');
 if('IntersectionObserver' in window&&!window.matchMedia('(prefers-reduced-motion: reduce)').matches){const io=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');io.unobserve(entry.target)}}),{threshold:.08});document.querySelectorAll('.reveal').forEach(el=>io.observe(el))}else{document.querySelectorAll('.reveal').forEach(el=>el.classList.add('visible'))}
})();
