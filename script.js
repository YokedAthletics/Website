const loader=document.getElementById('loader');window.addEventListener('load',()=>setTimeout(()=>loader.classList.add('hide'),900));
const toggle=document.querySelector('.menu-toggle'),nav=document.querySelector('nav');toggle.addEventListener('click',()=>{const open=nav.classList.toggle('open');toggle.setAttribute('aria-expanded',open)});nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>nav.classList.remove('open')));
const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible')}),{threshold:.12});document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));
document.getElementById('year').textContent=new Date().getFullYear();
document.getElementById('bmiForm').addEventListener('submit',e=>{e.preventDefault();const h=+document.getElementById('height').value,w=+document.getElementById('weight').value,bmi=703*w/(h*h);let label=bmi<18.5?'underweight':bmi<25?'in the generally healthy range':bmi<30?'overweight':'in the obesity range';document.getElementById('bmiResult').textContent=`Estimated BMI: ${bmi.toFixed(1)} — ${label}. BMI is only a screening tool.`});
document.getElementById('tdeeForm').addEventListener('submit',e=>{e.preventDefault();const age=+document.getElementById('age').value,sex=document.getElementById('sex').value,h=+document.getElementById('tHeight').value*2.54,w=+document.getElementById('tWeight').value/2.20462,a=+document.getElementById('activity').value;const bmr=sex==='male'?10*w+6.25*h-5*age+5:10*w+6.25*h-5*age-161;document.getElementById('tdeeResult').textContent=`Estimated maintenance: ${Math.round(bmr*a).toLocaleString()} calories/day. Use this as a starting point and adjust based on progress.`});
document.getElementById('applicationForm').addEventListener('submit',e=>{e.preventDefault();const value=id=>document.getElementById(id).value.trim();const name=value('appName');const lines=[`Name: ${name}`,`Email: ${value('appEmail')}`,`Primary goal: ${value('appGoal')}`,`Training experience: ${value('appExperience')}`,`Days available: ${value('appDays')}`,`Preferred start: ${value('appStart')}`,`Biggest challenge: ${value('appChallenge')}`,'',`Goal details: ${value('appMessage')}`];const subject=encodeURIComponent(`Coaching Application — ${name}`);const body=encodeURIComponent(lines.join('\n'));window.location.href=`mailto:mikegreen@yokedathletics.co.site?subject=${subject}&body=${body}`});
// Animated statistics
const counters=document.querySelectorAll('.count');
const counterObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{
  if(!entry.isIntersecting||entry.target.dataset.done)return;
  const el=entry.target,target=Number(el.dataset.target),suffix=el.dataset.suffix||'';
  el.dataset.done='1';let start=null;
  const tick=t=>{if(!start)start=t;const p=Math.min((t-start)/1100,1);el.textContent=Math.round(target*(1-Math.pow(1-p,3)))+suffix;if(p<1)requestAnimationFrame(tick)};requestAnimationFrame(tick);
}),{threshold:.5});counters.forEach(c=>counterObserver.observe(c));
// Subtle hero parallax
const heroBg=document.querySelector('.hero-bg');window.addEventListener('scroll',()=>{if(heroBg&&window.innerWidth>700)heroBg.style.translate=`0 ${Math.min(window.scrollY*.12,70)}px`},{passive:true});
