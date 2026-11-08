'use strict';
const KEY='building7.demo.v1';
const defaultState=()=>({stage:0,maxStage:0,sticker:false,search:false,photo:100,flags:{},evidence:[],choice:null});
let state=defaultState();
try{const saved=JSON.parse(localStorage.getItem(KEY)||'null');if(saved&&Number.isInteger(saved.stage)&&saved.stage>=0&&saved.stage<=11)state={...state,...saved,flags:saved.flags||{},evidence:Array.isArray(saved.evidence)?saved.evidence:[]};}catch{}
// Older saves did not track the furthest unlocked screen. Recover it from their evidence.
const evidenceProgress={chat:2,forum:3,odor:3,photo:5,hazard:6,clinic:7,entry:8,truth:9};
state.maxStage=Math.min(11,Math.max(state.stage,Number(state.maxStage)||0,...state.evidence.map(e=>evidenceProgress[e]||0)));
const screen=document.querySelector('#screen'), dialog=document.querySelector('#dialog-root');
const appWindow=document.querySelector('.app-window'), placeholder=document.querySelector('#window-placeholder');
const save=()=>{try{localStorage.setItem(KEY,JSON.stringify(state));}catch{}};
const addEvidence=(name)=>{if(!state.evidence.includes(name))state.evidence.push(name)};
const advance=(n,evidence)=>{if(evidence)addEvidence(evidence);state.stage=n;state.maxStage=Math.max(state.maxStage,n);save();render();screen.focus({preventScroll:true});window.scrollTo(0,0)};
const visit=(n)=>{if(Number.isInteger(n)&&n>=0&&n<=state.maxStage){state.stage=n;save();render();screen.focus({preventScroll:true});window.scrollTo(0,0)}};
const safe=(x)=>String(x).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const chapterNames=['旧硬盘','童年空间','新村论坛','被遮住的人','厂区与诊所','底层档案','未竟的邀请'];
const chapterIndex=()=>state.stage===0?0:state.stage<=2?1:state.stage===3?2:state.stage===4?3:state.stage<=6?4:state.stage<=8?5:6;
const hintTexts={1:['看一看空间里可以移动的装饰。','点一下花朵，找到下面的密保提示。','密码是六位数字：081231。'],2:['聊天中有一种花反复出现。','答案是两个孩子约定一起看的花。','输入“栀子花”。'],3:['先看帖子里几位居民共同提到的异常。','试着搜索气味相关的词。','搜索“苦杏仁味”。'],4:['照片可能不止一个图层。','调整照片下方的滑杆，观察被遮住的位置。','将覆盖层调到 30% 或以下。'],5:['注意记录发生的先后与地点。','挑出与七号楼后管道有关的记录。','选择“管道隐患与夜间排放记录”。'],6:['比较诊断与付款的时间。','不是只看病历，还要对照账目。','选择“诊所账目与厂方付款记录”。'],7:['先查事故当晚谁进入了现场。','门禁能证明进出，但不能单独证明行为。','选择“保卫科门禁记录”。'],8:['把门禁和能说明现场操作的记录放在一起。','关键是进入现场的人以及随后对阀门的操作。','选择“刘父进入后破坏阀门并点火”。']};
const evidenceNames={'chat':'QQ 聊天记录','forum':'栀子花与论坛入口','odor':'论坛里的苦杏仁味','photo':'被遮住的合影','hazard':'厂区隐患与排放记录','clinic':'诊所账目与诊断','entry':'保卫科门禁记录','truth':'阀门与值班日志'};
const evidenceDetails={chat:'2008 年 12 月 30 日，林夏邀请刘可阳在跨年夜去她家阳台看烟花；两人还约好一起看栀子花。',forum:'聊天里提到的栀子花打开了旧博客指向的新村论坛。',odor:'论坛住户和旧聊天都提到七号楼后管道附近的苦杏仁味。气味本身还不能证明发生了什么。',photo:'合影覆盖层下出现林夏的身影，照片存在被人为遮盖的痕迹。',hazard:'厂区隐患排查和夜间排放记录，与居民反映的管道气味相互关联。',clinic:'诊断被统一修改，卫生所账目又显示与厂方有未公开的款项往来。',entry:'保卫科门禁记录显示刘父曾进入事故现场；门禁本身不能证明他做了什么。',truth:'值班日志与门禁对照后，显示刘父为抢动迁名额提前破坏阀门并点火，导致大火提前失控。'};
const backgrounds={
1:'你是刘可阳，26 岁。18 年前，你住在跃进机械厂的家属区「跃进新村」。2008 年跨年夜，七号楼发生火灾；此后你搬离了这里，与儿时好友林夏失去联系。',
2:'小时候，刘可阳和林夏住在同一个大院。他是少数愿意陪伴她的朋友。硬盘里的聊天停在火灾前一天；打开论坛，也许能找到他们失联的原因。',
3:'跃进新村是机械厂职工和家属居住的大院。这个论坛留存了居民当年的讨论。先把每条说法当作证词：哪些有记录支持，哪些只是传言？',
4:'论坛里同时出现了关于林夏的传言和一张被修改的合影。先看清照片里被遮住的人，再决定要相信谁。',
5:'照片显示林夏曾被人刻意抹去。居民反复提到的气味又指向七号楼后方：接下来查厂区记录，看能否解释这个共同的线索。',
6:'厂区记录让调查从传言转向人为事故。卫生所给居民的诊断是否可信，还需要和其他档案一起核对。',
7:'诊所账目和厂区记录揭开了逼迁与污名背后的联系。2008 年跨年夜的大火夺走了林父的生命；要弄清火灾如何失控，还得查当晚的记录。',
8:'门禁记录让你第一次看到父亲的名字。它只说明他到过现场，接下来要对照日志，区分出入记录和具体行为。',
9:'你终于把居民证词、厂区资料、诊所账目和当晚的记录连在了一起。就在这时，硬盘中的程序开始失去响应。'
};
const background=(stage)=>backgrounds[stage]?`<section class="story-context" aria-label="故事背景"><span>◈ &nbsp; ${stage===1?'故事开始前':'调查回顾'}</span><p>${backgrounds[stage]}</p></section>`:'';
function button(action,label,cls='secondary',extra=''){return `<button type="button" class="${cls}" data-action="${action}" ${extra}>${label}</button>`}
function heading(kicker,title,desc){return `<div class="section-kicker">${kicker}</div><h2>${title}</h2><p class="lead">${desc}</p>`}
function showModal(title,body){ui.returnFocus=document.activeElement;dialog.innerHTML=`<div class="modal-backdrop"><div class="modal" role="dialog" aria-modal="true" aria-label="${safe(title)}"><div class="window-bar"><span>${safe(title)}</span><div class="window-actions"><button type="button" data-action="close" aria-label="关闭对话框">×</button></div></div><div class="modal-body">${body}<div>${button('close','关闭','primary')}</div></div></div></div>`;dialog.querySelector('button')?.focus()}
function error(message){const el=document.querySelector('#error');if(el)el.textContent=message}
function answer(){return document.querySelector('#answer')?.value.trim()||''}
function act(action){if(retroAction(action))return;switch(action){
case 'start': ui.drive=true;render();break;case 'resume':visit(state.maxStage);break;
case 'previous':visit(state.stage-1);break;case 'next':visit(state.stage+1);break;
case 'minimize':case 'close-window': dialog.innerHTML='';appWindow.hidden=true;placeholder.hidden=false;document.querySelector('[data-action="restore"]').focus();break;
case 'restore': dialog.innerHTML='';appWindow.hidden=false;placeholder.hidden=true;screen.focus({preventScroll:true});break;
case 'maximize':{const wide=document.querySelector('#desktop').classList.toggle('maximized');const el=document.querySelector('[data-action="maximize"]');el.setAttribute('aria-pressed',String(wide));el.setAttribute('aria-label',wide?'还原游戏窗口':'放大游戏窗口');break}
case 'menu':showModal('开始',`<p>打开一份资料，或继续你的调查。所有进度保存在当前浏览器。</p><div class="menu-grid">${button('archive','我的档案')}${button('chat','聊天记录')}${button('evidence','证据夹')}${button('restore','回到游戏')}${button('restart','重新开始')}</div>`);break;
case 'archive':showModal('我的档案',`<p>一块旧硬盘与一次迟到十八年的调查。</p><div class="evidence-list"><div class="evidence"><b>现在</b><span>2026 年，刘可阳 26 岁，收到一块匿名硬盘。你的目标是重新找到儿时好友林夏，弄清七号楼发生过什么。</span></div><div class="evidence"><b>过去</b><span>2008 年跨年夜，跃进机械厂家属区的七号楼发生火灾。那时刘可阳与林夏都是八岁的孩子。</span></div><div class="evidence"><b>操作</b><span>阅读页面、点击或输入线索；在已解锁的页面间使用前后箭头，证据夹会保存发现。提示会分级给出。</span></div></div>`);break;
case 'chat':showModal('聊天记录',state.evidence.includes('chat')?`<p>离线备份 · 2008 年 12 月 30 日</p><div class="chat"><div class="message"><div class="who">林夏</div><div class="bubble">跨年夜厂里要放烟花，你一定要来我家阳台看！</div></div><div class="message mine"><div class="who">刘可阳</div><div class="bubble">借我玩 GameBoy 都不肯，谁去谁是小狗。</div></div><div class="message"><div class="who">林夏</div><div class="bubble">等栀子花开了，我们再一起去看花。说好了。</div></div></div><div class="notice warm">隐藏留言：七号楼后面的管道有奇怪的苦杏仁味。林夏有些害怕，希望可阳陪她。</div>`:'<p>聊天备份还被密保锁住。先到林夏的空间，移开挂件寻找提示。</p>');break;case 'sticker':state.sticker=true;save();render();break;
case 'password1':if(answer()==='081231'&&state.sticker){dialog.innerHTML='';advance(2,'chat');}else error(state.sticker?'密码不对。再想一想跨年夜的日期。':'先看看挂件下面有什么。');break;
case 'password2':if(answer()==='栀子花')advance(3,'forum');else error('密码不对。回到聊天里，找找两个人约定一起看的花。');break;
case 'search':ui.forumPost=null;if(/杏仁/.test(answer())){state.search=true;addEvidence('odor');save();render()}else error('没有找到相关内容。搜索帖子里已经出现的线索试试。');break;
case 'to4':advance(4);break;case 'to5':if(state.photo<=30)advance(5,'photo');break;case 'hazard':advance(6,'hazard');break;case 'clinic':advance(7,'clinic');break;case 'entry':advance(8,'entry');break;case 'truth':advance(9,'truth');break;case 'ending':advance(10);break;
case 'wrong':error('这份资料还不能回答当前的问题。试着对照线索的时间、地点和内容。');break;
case 'choose-public':state.choice='public';advance(11);break;case 'choose-silent':state.choice='silent';advance(11);break;case 'back-ending':advance(10);break;
case 'evidence':showModal('证据夹',state.evidence.length?`<p>已收集 ${state.evidence.length} 条线索。可以在这里回看内容；未发现的记录不会提前显示。</p><div class="evidence-list">${state.evidence.map((e,i)=>`<div class="evidence"><b>${String(i+1).padStart(2,'0')}</b><span><strong>${safe(evidenceNames[e]||e)}</strong><br>${safe(evidenceDetails[e]||'')}</span></div>`).join('')}</div>`:'<p>还没有收集到证据。先打开空间，看看留下了什么。</p>');break;
case 'hint':{const arr=hintTexts[state.stage];let level=Math.min((state.flags['hint'+state.stage]||0)+1,3);state.flags['hint'+state.stage]=level;save();showModal('分级提示',arr?`<p>你可以逐步查看更多提示。</p><div class="evidence-list">${arr.slice(0,level).map((h,i)=>`<div class="evidence"><b>提示 ${i+1}</b><span>${h}</span></div>`).join('')}</div>${level<3?button('morehint','再看一条提示'):''}`:'<p>顺着页面中的线索继续调查即可。</p>');break}
case 'morehint':act('hint');break;case 'close':closeModal();break;
case 'restart':showModal('重新开始','<p>重新开始会清除当前浏览器保存的进度，是否继续？</p>'+button('confirm-restart','清除进度并重新开始','secondary'));break;
case 'confirm-restart':dialog.innerHTML='';state=defaultState();ui.drive=false;ui.blog=false;ui.forumPost=null;save();render();window.scrollTo(0,0);break;
}}
document.addEventListener('click',e=>{const target=e.target.closest('[data-action]');if(target)act(target.dataset.action)});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&dialog.innerHTML)closeModal();if(e.key==='Enter'&&e.target.id==='answer'){if(state.stage===1)act('password1');if(state.stage===2)act('password2');if(state.stage===3)act('search')}});
document.addEventListener('input',e=>{if(e.target.id==='layer'){state.photo=Number(e.target.value);document.querySelector('#layer-value').textContent=state.photo;const overlay=document.querySelector('.photo-cover');if(overlay)overlay.style.opacity=state.photo/100;const result=document.querySelector('#photo-result');result.innerHTML=state.photo<=30?'<div class="notice">被遮住的是林夏。她并没有从照片里消失，而是被人刻意抹去了。</div>'+button('to5','记录线索，查看厂区档案 →','primary'):'<div class="notice">试着降低覆盖层的不透明度，看看下面是什么。</div>';save()}});
render();
