'use strict';
// Separate v0.4 progress: old chapter numbers must not bypass new evidence.
const KEY='building7.demo.v2';
const defaultState=()=>({stage:0,maxStage:0,sticker:false,search:false,photo:100,flags:{},evidence:[],choice:null});
let state=defaultState();
try{const s=JSON.parse(localStorage.getItem(KEY)||'null');if(s&&Number.isInteger(s.stage)&&s.stage>=0&&s.stage<=11)state={...state,...s,flags:s.flags||{},evidence:Array.isArray(s.evidence)?s.evidence:[]};}catch{}
const screen=document.querySelector('#screen'),dialog=document.querySelector('#dialog-root');
const appWindow=document.querySelector('.app-window'),placeholder=document.querySelector('#window-placeholder');
const save=()=>{try{localStorage.setItem(KEY,JSON.stringify(state));}catch{}};
const safe=x=>String(x).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const has=id=>state.evidence.includes(id);
const addEvidence=id=>{if(!has(id))state.evidence.push(id);};
function canVisit(n){return n===0||n===1&&state.flags.cache||n===2&&has('chat')||n===3&&state.flags.forum||n===4&&has('chat')&&has('archive')&&has('odor')||n===5&&has('photo')||n===6&&has('hazard')||n===7&&has('clinic')||n===8&&has('entry')||n>=9&&n<=10&&has('truth')||n===11&&!!state.choice;}
function advance(n,evidence){if(evidence)addEvidence(evidence);if(!canVisit(n))return false;state.stage=n;state.maxStage=Math.max(state.maxStage,n);save();render();screen.focus({preventScroll:true});window.scrollTo(0,0);return true;}
function visit(n){return advance(n);}
function button(a,label,cls='secondary',extra=''){return `<button type="button" class="${cls}" data-action="${a}" ${extra}>${label}</button>`;}
const evidenceNames={chat:'跨年约定与聊天',archive:'私人备份与快照索引',odor:'居民异味记录',photo:'被删改的合影',hazard:'排放与投诉对应',clinic:'诊断修改与款项',entry:'恢复的门禁记录',truth:'事故证据链'};
const evidenceDetails={chat:'2008.12.30 的聊天提到林夏的 NDSL、跨年烟花、栀子花，以及七号楼后管道的异味。',archive:'林夏私人备份保存了被删帖的地址和本地快照索引。公开论坛没有密码。',odor:'居民投诉与聊天都提到同一处管道附近的苦杏仁味。气味只能帮助定位线索，不能认定具体物质或责任。',photo:'原始合影与论坛发布版对照后，发现林夏被人为遮去；照片不能证明诅咒。',hazard:'居民投诉时间、地点与厂区异常排放记录对应。水质污染只是当时未经证实的解释。',clinic:'原始病历、修改要求与对应款项共同显示：厂方要求将异常症状归入住宅环境问题，以推动腾退并掩盖厂区责任。',entry:'门禁记录显示刘父进入七号楼后方作业区。这里只证明到场，不证明他的行为。',truth:'安置承诺、清场记录、门禁、事后陈述和事故调查相互核对：刘父为取得安置优先资格，在未完成清场时提前行动，造成火灾失控。'};
const hintTexts={1:['空间装饰也可能藏着信息。','移开花朵，找跨年约定的年月日，格式 YYMMDD。','聊天验证答案是 081231。私人备份的口令是栀子花。'],2:['聊天里的异味与约定都值得记下。','私人备份在空间侧栏，论坛从最近访客进入。','私人备份口令是栀子花，公开论坛没有密码。'],3:['先读居民帖子，再使用搜索。','被删除的帖子需要私人备份中的本地快照索引。','搜索苦杏仁味。补齐聊天、私人备份和异味快照后查看合影。'],4:['比较发布版与原始扫描。','降低覆盖层不透明度。','调到 30% 或以下，再记录对照结果。'],5:['分别阅读居民投诉和厂区记录。','比较时间与地点，不能靠气味猜物质。','关联居民投诉记录与夜间排放登记。'],6:['诊断、修改要求和账目承担不同证明作用。','只有付款与诊断时间接近，还不足以证明掩盖。','选择原始病历、诊断修改要求、对应款项记录。'],7:['恢复事故当晚的资料。','选择数据库，不是活动安排或照片。','恢复 archive.db 后，先读门禁记录。'],8:['五份材料分别证明动机、风险、位置、行为和后果。','到场不等于实施行为，需要陈述和事故调查。','利益选安置承诺，风险选清场记录，到场选门禁，行为选事后陈述，后果选事故调查。']};
function showModal(title,body){ui.returnFocus=document.activeElement;dialog.innerHTML=`<div class="modal-backdrop"><div class="modal" role="dialog" aria-modal="true" aria-label="${safe(title)}"><div class="window-bar"><span>${safe(title)}</span><div class="window-actions"><button data-action="close" aria-label="关闭对话框">×</button></div></div><div class="modal-body">${body}<div>${button('close','关闭','primary')}</div></div></div></div>`;dialog.querySelector('button')?.focus();}
function error(message){const el=(dialog.querySelector('#error')||document.querySelector('#error'));if(el)el.textContent=message;else toast(message);}
function answer(){return ((dialog.querySelector('#answer')||document.querySelector('#answer'))?.value||'').trim().normalize('NFKC');}
function act(action){if(retroAction(action))return;switch(action){
case 'minimize':case 'close-window':dialog.innerHTML='';appWindow.hidden=true;placeholder.hidden=false;break;
case 'restore':openWindow();break;
case 'maximize':{const wide=document.querySelector('#desktop').classList.toggle('maximized');const el=document.querySelector('[data-action="maximize"]');el.setAttribute('aria-pressed',String(wide));el.setAttribute('aria-label',wide?'还原游戏窗口':'放大游戏窗口');break;}
case 'sticker':state.sticker=true;save();render();break;
case 'password1':if(answer()==='081231'){state.sticker=true;dialog.innerHTML='';advance(2,'chat');}else error('这不是跨年约定的日期。按年份后两位、月、日输入六位数字。');break;
case 'search':ui.forumPost=null;if(/杏仁|异味|气味/.test(answer())){state.search=true;save();render();}else error('本地索引没有匹配结果。试试居民反复提到的异味。');break;
case 'to4':if(!advance(4))error('还需要聊天记录、私人备份索引和异味快照。可以返回空间补齐。');break;
case 'to5':if(state.photo<=30)advance(5,'photo');break;
case 'ending':advance(10);break;
case 'choose-public':case 'choose-silent':if(state.flags.transfer){state.choice=action==='choose-public'?'public':'silent';advance(11);}break;
case 'back-ending':advance(10);break;
case 'evidence':showModal('证据夹',state.evidence.length?`<p>已记录 ${state.evidence.length} / 8 条线索</p><div class="evidence-list">${state.evidence.map((e,i)=>`<div class="evidence"><b>${i+1}</b><span><strong>${safe(evidenceNames[e]||e)}</strong><br>${safe(evidenceDetails[e]||'')}</span></div>`).join('')}</div>`:'<p>还没有记录线索。从 QQ 中的林夏头像开始。</p>');break;
case 'hint':case 'morehint':{const arr=hintTexts[state.stage]||['按页面中留下的线索继续。'];const key='hint'+state.stage;const level=Math.min((state.flags[key]||0)+1,arr.length);state.flags[key]=level;save();showModal('分级提示',arr.slice(0,level).map(h=>`<p>${h}</p>`).join('')+(level<arr.length?button('morehint','再看一条提示'):''));break;}
case 'close':closeModal();break;
case 'restart':showModal('重新开始','<p>重新开始 v0.4 调查？旧版 v0.3 存档不受影响。</p>'+button('confirm-restart','重新开始 v0.4'));break;
case 'confirm-restart':state=defaultState();ui.entry='package';ui.qtab='home';ui.forumPost=null;ui.private=false;dialog.innerHTML='';save();render();break;
}}
document.addEventListener('click',e=>{const target=e.target.closest('[data-action]');if(target)act(target.dataset.action);});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&dialog.innerHTML)closeModal();if(e.key==='Enter'&&e.target.id==='answer')act(e.target.dataset.submit||'search');});
document.addEventListener('input',e=>{if(e.target.id==='layer'){state.photo=Number(e.target.value);document.querySelector('#layer-value').textContent=state.photo;const overlay=document.querySelector('.photo-cover');if(overlay)overlay.style.opacity=state.photo/100;document.querySelector('#photo-result').innerHTML=photoResult();save();}});
