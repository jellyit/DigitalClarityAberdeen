'use strict';
const panels={"team":{"title":"Meet the Team","text":"We combine professional experience, digital expertise and a genuinely understanding approach. Whatever brings you to us, you will be treated with kindness, respect and complete discretion.","sections":[{"name":"Sarah Tweddle","role":"Founder & Director","paragraphs":["Sarah has more than 25 years’ experience in senior IT, information management, data protection and compliance roles. She holds a Master’s degree in Information Technology Management and is skilled at researching information, identifying gaps and turning complicated material into clear, organised findings.","Sarah understands that asking for help can feel daunting, particularly when the circumstances are deeply personal or upsetting. You will never be judged, rushed or made to feel uncomfortable. Your privacy, dignity and trust will be protected throughout."]},{"name":"Sophie Tweddle","role":"Digital Research & Content Support","paragraphs":["Sophie holds a Bachelor’s degree in Digital Marketing and works with local clients, providing digital marketing and social media support.","She brings strong online research skills and a natural talent for finding and organising information. Sophie also helps document findings and uses her Canva expertise to create clear, professional and easy-to-understand reports."]},{"name":"Specialist Support","role":"Additional Expertise When Required","paragraphs":["For work requiring specialist knowledge, we may engage carefully selected independent professionals on an ad hoc basis. Any involvement will be discussed with you beforehand, and the same high standards of confidentiality and data protection will always apply."]}]},"privacy":{"title":"Your information stays under your control","text":"Wherever possible, we work securely within a dedicated folder in your own cloud-storage account. This reduces unnecessary copies of sensitive documents and allows you to control and withdraw our access. Appropriate security and confidentiality procedures apply throughout your engagement."},"individuals":{"title":"Support for individuals","text":"Practical case support, digital help and investigative research when you need clarity. Explore separation and divorce support, digital life support, verification and research, or discuss where to begin in a free initial consultation."},"solicitors":{"title":"Support for solicitors","text":"Document organisation, financial disclosure and case information support, alongside tracing and investigative research. Clear, structured reports and ethical, lawful methods support your work with clients."},"about":{"title":"Proudly based in Aberdeen","text":"Digital Clarity Aberdeen provides practical case support, digital help and investigative research for individuals, solicitors and businesses. Our approach is confidential and professional, with clear information to help you move forward."},"service-0":{"title":"Separation & Divorce Support","text":"Practical support to bring order to your case information. We can help you organise documents and financial disclosure into a clear, structured format to support your work with your solicitor."},"service-1":{"title":"Digital Life Support","text":"One-to-one help with the digital side of a major life change. Discuss the accounts, devices and online services you need to organise, and the support that would help you move forward."},"service-2":{"title":"Verify & Protect","text":"Talk through your concerns about an online connection or information you need to verify. We use ethical, lawful research methods to help you make informed decisions."},"service-3":{"title":"Trace & Research","text":"Research support for individuals, solicitors and businesses. Discuss your question, the information already available and the scope of research needed, with findings presented clearly."},"contact":{"title":"Free initial 15 minute consultation","text":"Let’s discuss how we can help. No obligation, just a conversation. Consultations are available by phone, video call or in person in Aberdeen. Email contactus@dcaberdeen.com to arrange a time."}};

const nav=document.querySelector('.nav');
const menu=document.querySelector('[data-menu]');
const dialog=document.querySelector('#details');
const title=document.querySelector('#dialog-title');
const description=document.querySelector('#dialog-description');
const action=document.querySelector('#dialog-action');
const email=document.querySelector('#dialog-email');
let returnFocus=null;
function closeMenu(){nav.classList.remove('expanded');menu.setAttribute('aria-expanded','false');menu.setAttribute('aria-label','Open navigation');}
function openPanel(key){
 const panel=panels[key];if(!panel)return;
 closeMenu();title.textContent=panel.title;description.textContent=panel.text;
 if(key==='contact'){
  const address=document.createElement('a');address.href='mailto:contactus@dcaberdeen.com';address.textContent='contactus@dcaberdeen.com';
  const parts=panel.text.split('contactus@dcaberdeen.com');description.replaceChildren(parts[0],address,parts[1]||'');
 }

 const sections=document.querySelector('#dialog-sections');
 sections.replaceChildren();
 for(const item of panel.sections||[]){
  const section=document.createElement('section');section.className='team-section';
  for(const [tag,value] of [['h3',item.name],['h4',item.role],...item.paragraphs.map(p=>['p',p])]){const el=document.createElement(tag);el.textContent=value;section.append(el);}
  sections.append(section);
 }
 sections.hidden=!panel.sections;

 document.querySelector('#dialog-phones').hidden=key!=='contact';
 action.hidden=key==='contact';email.hidden=key!=='contact';
 if(!dialog.open){returnFocus=document.activeElement;dialog.showModal();document.body.classList.add('modal-open');}
 dialog.scrollTop=0;
}
menu.addEventListener('click',()=>{const expanded=nav.classList.toggle('expanded');menu.setAttribute('aria-expanded',String(expanded));menu.setAttribute('aria-label',expanded?'Close navigation':'Open navigation');});
document.querySelectorAll('[data-panel]').forEach(button=>button.addEventListener('click',()=>openPanel(button.dataset.panel)));
document.querySelectorAll('[data-close-menu]').forEach(link=>link.addEventListener('click',closeMenu));
document.querySelector('.dialog-close').addEventListener('click',()=>dialog.close());
action.addEventListener('click',()=>openPanel('contact'));
dialog.addEventListener('click',event=>{if(event.target===dialog){const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)dialog.close();}});
dialog.addEventListener('close',()=>{document.body.classList.remove('modal-open');if(returnFocus)returnFocus.focus();});
