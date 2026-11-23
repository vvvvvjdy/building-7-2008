'use strict';
// The 2008 sources and the later archivist's interventions are visibly distinct.
const ARCHIVE={recipient:'刘可阳',account:'阳阳得意',owner:'林夏',nickname:'半夏',snapshot:'2008-12-31 23:59',compiled:'2026-11-20',recorded:'2026-11-20',died:'2026-12-05',sent:'2026-12-29'};
ui.entry='qq';
const oldRetroAction=retroAction,oldQQ=qqScreen,oldForum=forumScreen;
const sourceBand=(kind,text)=>`<div class="source-band ${kind}"><b>${kind==='original'?'原始档案':kind==='broken'?'缓存残缺':'后期整理附注'}</b><span>${text}</span></div>`;
const navButton=(a,t)=>btn(a,t);
const markRead=id=>{state.flags.read=state.flags.read||[];if(!state.flags.read.includes(id))state.flags.read.push(id);save();};
const wasRead=id=>(state.flags.read||[]).includes(id);
const documents={
 complaint:{title:'居民投诉记录',date:'2008.12.28—30',body:'12 月 28 日晚，七号楼后方住户登记异味。12 月 30 日晚，同一位置再次收到投诉。多户反映不适。来访人要求核查楼后管道，未提供物质检测结果。',meaning:'记录居民所见所闻；不是化学鉴定。'},
 discharge:{title:'夜间排放登记',date:'2008.12.28—30',body:'厂区记录中，两次异常排放均发生在晚间，涉及七号楼后方的同一段设施。登记表旁留有林父的书面异议：“停止排放，先排查，楼里还住着人。”',meaning:'时间、位置与投诉可以相互核对。'},
 party:{title:'新年联欢节目单',date:'2008.12.28',body:'跨年夜厂区联欢。节目包括合唱、朗诵与烟花观赏。节目单没有管道运行、诊断或现场人员记录。',meaning:'日常材料；不能解释排放异常。'},
 medical:{title:'原始病历副本',date:'2008.12.30',body:'多名患者描述：夜间闻到楼后异味后出现不适。原记录写“原因待查，建议进一步检查环境暴露”。没有确认水源污染，也没有任何依据指向林夏。',meaning:'病历记录症状和不确定性，不支持诅咒传言。'},
 instruction:{title:'诊断修改要求',date:'2008.12.30',body:'厂办转给罗医生的便笺：“统一归入住宅环境不宜居住，不要写厂区来源，按腾退评估口径处理。”便笺标有登记号 C-17；夹页保留了修改前后的诊断文本。',meaning:'直接记录了修改要求及责任转移的方向。'},
 payment:{title:'对应款项记录',date:'2008.12.30',body:'卫生所账目与厂方支出凭据都有 C-17。厂方项目名为“腾退评估协助”，收款确认人为罗医生。它与同编号的诊断修改便笺一起留存。',meaning:'通过同一编号建立关联，不能只凭日期接近定责。'},
 rule:{title:'安置优先承诺',date:'2008.12.27',body:'内部承诺：配合腾退并完成现场交接的住户，优先进入本批有限的安置名单。刘父签收处写着：“交接拖到下一批，本户优先资格不予保留。”名单里另有十七户的签收记录。',meaning:'说明利益规则与动机，不证明具体行为。'},
 evacuation:{title:'清场安排与未撤离记录',date:'2008.12.31',body:'原安排要求先完成清场并核实人员，再执行后续行动。最后一份清场回报仍注明“林家未撤离，禁止报交接完成”。刘父在收到回报的栏位签字。',meaning:'证明他知道清场尚未完成；具体行动还需其他记录。'},
 gate:{title:'保卫科门禁记录',date:'2008.12.31 · 事故前',body:'记录人：值班保卫。来访人员：刘父。进入区域：七号楼后方作业区。进入发生在最后一份未撤离回报之后、火情报告之前。记录没有写他在区域内做了什么。',meaning:'只证明位置与相对先后，不单独证明纵火。'},
 statement:{title:'刘父事后陈述副本',date:'2009.01.02',body:'“我知道还没清完。交接再拖，我家名额就没了。我没等通知，先去破坏了阀门，又点了火。我以为出点险情，人就肯走。后来压不住了。”陈述页有本人签名，附当晚值班员记录。',meaning:'记载行为及其自述；要与独立事故记录核对。'},
 report:{title:'事故调查节录',date:'2009.01.08',body:'调查将先前导致居民不适的危险排放，与当晚火灾分开记录。现场设施受人为破坏，引发可燃介质泄漏并遭明火引燃；在尚未完成清场的情况下，火势扩展失控。起火区域与门禁、值班员记录对应。林父在事故中遇难，林夏受伤生还。',meaning:'说明火灾机制与后果；异味本身不能证明是哪种物质。'}
};
function friendDirectory(){
 const contacts = [['王浩','浩哥最拽'],['李静','静静de小情绪'],['赵磊','低调小磊']];
 return `<section class="qq-directory" aria-label="刘可阳的 QQ 好友面板">
  <header class="qq-identity">
   <div class="qq-portrait">${icon('qq')}</div>
   <div class="qq-account"><strong>阳阳得意</strong><small>刘可阳</small><p>明天放学要记得等她。</p></div>
   ${btn('own-space','<span aria-hidden="true">★</span>','space-star','aria-label="我的空间（阳阳得意）" title="我的空间（阳阳得意）"')}
  </header>
  <div class="qq-nav"><b>${icon('qq')} 我的好友</b>${btn('chat','消息记录')}${btn('own-space','QQ空间')}</div>
  <div class="buddy-book">
   <details open class="buddy-group"><summary>朋友 <small>[1]</small></summary>
    <button class="summer-contact" data-action="linxia" type="button">
      <i class="gardenia-face" aria-hidden="true"></i><span><strong>半夏 <em>（林夏）</em></strong><small>我不咬人。</small></span><i class="offline-dot" aria-label="离线"></i>
    </button>
    <aside class="buddy-tip" aria-hidden="true"><span class="gardenia-face"></span><div><b>半夏</b><small>备注　林夏<br>状态　离线</small></div></aside>
   </details>
   <details class="buddy-group"><summary>他们 <small>[3]</small></summary>${contacts.map(([real,nick])=>btn('offline',`<i aria-hidden="true">♟</i> ${nick}<small>${real}</small>`,'dormant-contact')).join('')}</details>
   <div class="qq-watermark" aria-hidden="true">QQ<sup>2008</sup></div>
  </div>
  <footer class="qq-foot">${btn('menu',icon('qq')+'菜单')}${btn('drive',icon('disk')+'旧硬盘')}${btn('notes',icon('notes')+'记事本')}</footer>
 </section>`;
}
function entryScreen(){
 if(ui.entry==='closed')return `${browserTools('http://qzone.qq.com / 半夏')}<section class="offline-page"><div class="offline-document">
  <div class="offline-banner">☆ Qzone <small>QQ空间</small></div><div class="offline-content"><div class="lost-portrait" aria-hidden="true"></div>
  <div><small>半夏的个人空间</small><h1>该空间已关闭</h1><p>这个账号已经注销。<br>旧硬盘里，还留着一份她的主页。</p>
  ${btn('cache-list',icon('folder')+'从本机缓存打开','local-copy')}${btn('qq-home','返回好友列表','plain-link')}</div></div>
  <footer>状态由整理者于 2026 年补录</footer></div></section>${statusbar('已完成 · 页面已关闭')}`;
 if(ui.entry==='cache')return `${browserTools('E:&#92;Temporary Internet Files')}<div class="cache-explorer">
  <aside class="explorer-side">${taskPanel('文件和文件夹任务',btn('qq-home',icon('qq')+'返回好友列表'))}${taskPanel('详细信息','<b>Temporary Internet Files</b><p>Internet 临时文件<br>位于旧硬盘 (E:)</p>')}</aside>
  <section class="cache-folder"><header>${icon('folder')}<div><small>Internet Explorer</small><h2>Temporary Internet Files</h2></div></header>
  <div class="cache-columns"><span>名称</span><span>上次保存</span></div>
  <button type="button" data-action="cache-open" class="cache-record">${icon('internet')}<span><b>index.html</b><small>半夏的小小世界 · 主页缓存</small></span><time>2008-12-31 23:59</time></button>
  <p>页面可读，部分模块缺失。单击文件打开保存的页面。</p>
  </section></div>${statusbar('1 个对象 · 本机缓存')}`;
 if(ui.entry==='own')return keyangSpace();
 return friendDirectory();
}
function keyangSpace(){
 return `${browserTools('E:\\archive\\qzone\\keyang\\index.html')}<section class="space-2008 keyang-space">
  <header class="qzone-brand"><b>☆ Qzone <small>QQ空间</small></b><span>刘可阳的个人空间</span>${btn('qq-home','QQ 好友列表')}</header>
  <div class="team-letterhead keyang-letterhead"><h2>阳阳得意的QQ空间</h2></div>
  <div class="keyang-columns">
   <aside><section class="qpanel"><h3>个人档案</h3><div class="keyang-profile"><img src="assets/keyang-portrait.webp" alt="阳阳得意画的蓝色头像"><b>阳阳得意</b><p>跨年夜放烟花，我们院最牛！</p></div></section>
   <section class="qpanel"><h3>我的相册</h3><figure class="keyang-album"><img src="assets/keyang-school.webp" alt="新村小学校园"><figcaption>放学路上</figcaption></figure></section></aside>
   <div><section class="qpanel"><h3>我的日志 <small>共 2 篇</small></h3>${journal(keyangEntries)}</section>
   <section class="qpanel keyang-messages"><h3>留言板 <small>2 条留言</small></h3><p><b>半夏</b>　今晚记得来我家阳台看烟花！<time>2008-12-31 19:48</time></p><p><b>阳阳得意</b>　谁去谁是小狗。<time>2008-12-31 20:21</time></p></section>
   <div class="keyang-doodles" aria-hidden="true"></div></div>
   <aside><section class="qpanel"><h3>好友 <small>1 位</small></h3>${btn('linxia','<img src="assets/linxia-flower.webp" alt=""><b>半夏</b>','keyang-friend')}</section><section class="qpanel"><h3>最近访客</h3><ul class="keyang-visits"><li>浩哥最拽</li><li>静静de小情绪</li><li>低调小磊</li></ul></section></aside>
  </div>${sourceBand('original','刘可阳的空间 · 本机缓存 · 最后保存 '+ARCHIVE.snapshot)}</section>${statusbar('已载入刘可阳的空间')}`;
}
function winterPrint() {
 return `<figure class="winter-print"><img width="1152" height="648" src="assets/snow-courtyard.webp" alt="落雪的家属院，树下停着几辆自行车"><figcaption>放学一起走的那条路。<time>2008 年冬</time></figcaption></figure>`;
}
function spaceContents() {
 switch (ui.qtab) {
  case 'journal': return journal();
  case 'album': return `<h4 class="album-title">旧时光 <small>1 张照片</small></h4>${winterPrint()}`;
  case 'guestbook': return `<div class="guest-message"><b>刘可阳</b><time>2008-12-28 20:18</time><p>来踩踩！记得回踩~</p></div><div class="guest-message"><b>林夏</b><time>2008-12-29 19:46</time><p>明天见，记得一起回家。</p></div><div class="guest-message"><b>李静</b><time>2008-12-30 18:40</time><p>你空间又是栀子花。</p></div>`;
  default: return `${journal()}<div class="linxia-scribbles" aria-hidden="true"></div><h3 class="journal-label">旧时光 ${btn('qtab-album','进入相册')}</h3><div class="space-album-cover">${btn('qtab-album',winterPrint(),'album-open','aria-label="打开旧时光相册"')}</div>`;
 }
}
function newYearKeepsake() {
 return `<section class="qpanel keepsake"><h3>我的小挂件</h3><div class="keepsake-area">
  <div class="secret-note" ${state.sticker?'':'aria-hidden="true"'}>约好看烟花的日子<b>08 · 12 · 31</b><small>年 / 月 / 日</small></div>
  <button type="button" data-action="sticker" class="flower-sticker ${state.sticker?'moved':''}" aria-label="移开栀子花挂件，查看约定日期" aria-expanded="${state.sticker}">
  <span class="pendant-picture" aria-hidden="true"></span><small>拉开花签</small></button></div>
  <div class="keepsake-link">${btn('chat',has('chat')?'打开聊天记录':'验证跨年约定')}</div></section>`;
}
function spacePlayer() {
 return `<section class="qpanel space-music"><h3>我的音乐盒</h3><div class="mini-deck ${ui.audio?'playing':''}">
  <div class="deck-lcd"><small>${ui.audio?'PLAY':'STOP'} &nbsp; 01</small><b>窗边的小调</b><span class="meter-lines" aria-hidden="true"></span></div>
  ${btn('music',ui.audio?'Ⅱ':'▶','deck-key',`aria-label="${ui.audio?'暂停':'播放'}窗边的小调" aria-pressed="${!!ui.audio}"`)}</div></section>`;
}
qzoneScreen=function(){
 const title={home:'我的日志',album:'我的相册',journal:'我的日志',guestbook:'留下你的脚印'}[ui.qtab]||'我的相册';
 const tabs=[['home','主页'],['journal','日志'],['album','相册'],['guestbook','留言板']];
 return `${browserTools('E:\\archive\\qzone\\linxia\\index.html')}<div class="qzone-page space-2008 ${ui.restoringSpace?'restoring-space':''}">
  <header class="qzone-brand"><b>☆ Qzone <small>QQ空间</small></b><span>林夏的个人空间</span>${btn('qq-home','QQ 好友列表')}</header>
  <div class="team-letterhead linxia-letterhead qzone-banner"><h2>半夏的小小世界</h2></div>
  <nav class="qzone-tabs" aria-label="空间栏目">${tabs.map(([id,label])=>btn('qtab-'+id,label,ui.qtab===id?'active':'',ui.qtab===id?'aria-current="page"':'')).join('')}${btn('chat','聊天记录')}${btn('private-open','私人备份')}</nav>
  <div class="qzone-columns"><aside>${profile()}${spacePlayer()}</aside>
   <section class="qpanel diary-list"><h3>${title}${['home','journal'].includes(ui.qtab)?'<small>共 3 篇</small>':''}</h3>${spaceContents()}</section>
   <aside>${newYearKeepsake()}<section class="qpanel referral-panel"><h3>最近访客 <small>来访来源</small></h3><div class="visitor-sources">
    ${[['浩哥最拽','7号楼那个女孩'],['静静de小情绪','同一主题'],['匿名访客','离她远点']].map(([name,thread])=>btn('forum-entry',`<b>${name}</b><small>新村论坛 › ${thread}</small>`)).join('')}</div></section>
    <section class="qpanel lock-panel"><h3>私人备份</h3><p>${has('archive')?'留言与网页收藏目录':'提示：我最喜欢的花'}</p>${btn('private-open',has('archive')?'查看收藏目录':'输入口令')}</section></aside>
  </div>${sourceBand('original','林夏的空间 · 本机缓存 · 最后保存 '+ARCHIVE.snapshot)}<footer class="qzone-footer">© 2008 半夏的小小世界</footer></div>${statusbar('已载入林夏的空间')}`;
};
qqScreen=function(){let h=oldQQ().replaceAll('GameBoy','你的 NDSL').replaceAll('半夏的小小世界','半夏').replace('▾ 我的好友 (2/8)','▾ 朋友 (1)').replace(/<button data-action="contact-keyang">.*?<\/button>/,'').replace('▸ 同学 (0/6)','▸ 他们 (3)');h=h.replace('<div class="qq-history">','<div class="qq-history">');h=h.replace('消息管理器</b>','消息管理器</b>');h=h.replaceAll('data-action="blog">查看林夏的博客 →','data-action="space">返回空间查看访客').replaceAll('查看林夏的博客 →','查看林夏的私人备份 →').replaceAll('打开博客 ↗','私人备份').replaceAll('打开博客','私人备份').replace('她的博客里还留着一个旧链接。','空间的最近访客留下了论坛来源。');return sourceBand('original','刘可阳的聊天归档 · 对方：林夏（半夏） · 掌机属于林夏')+h+`<div class="route-footer">${btn('space','返回林夏的空间')}${btn('private-open','查看私人备份')}</div>`;};
function privateArchive(){if(!has('archive')){showModal('私人备份 · 访问口令',`${sourceBand('original','林夏保存的私密资料，不是公共论坛的密码。')}<label for="answer">提示：我最喜欢的花</label><input id="answer" data-submit="private-unlock" autocomplete="off" placeholder="从头像、空间皮肤或留言中寻找"><div id="error" role="status"></div>${btn('private-unlock','打开私人备份','primary')}`);return;}showModal('林夏的私人备份',`${sourceBand('original','2008 年的留言与收藏目录')}<h3>给可阳的留言</h3><p>你是唯一愿意陪我一起回家的人。等栀子花开了，我们一起去看。</p><h3>保存的好友列表</h3><p>账号：半夏（林夏）<br>朋友（1）：阳阳得意 · 刘可阳<br>他们：其他院里的住户与同学</p><h3>网页收藏目录</h3><p>7号楼那个女孩 / 原帖已删<br>楼后面那股味道 / 本地快照可读<br>新村小学合影 / 原始扫描与发布版</p><small>收藏目录中的地址，可以和论坛搜索结果中的失效链接对应。</small>${btn('forum-entry','打开收藏中的论坛地址')}`);}
forumScreen=function(){let h=oldForum();h=h.replace('<div class="forum-page">',`<div class="forum-page">${sourceBand('original','跃进新村论坛 · 公开版块 · 不需要私人口令')}`);if(ui.forumPost===1){h=h.replace(/<p>晚上走廊里总有声音。[\s\S]*?<\/p>/,`<p class="deleted-post">该帖已被管理员删除。标题仍保留在访客来源中。</p><p>原帖内容：${has('archive')?btn('read-bullying','查看本地快照'):'需要网页收藏目录中的本地索引。'}</p>`);}if(state.search&&ui.forumPost===null){h=h.replace(/<div class="attachment">[\s\S]*?<\/div><div class="forum-caution">/,`<div class="attachment"><div><b>异味主题的原链接已经失效</b><p>${has('archive')?'私人备份索引与此地址匹配。':'先返回林夏空间，寻找她保存的网页收藏目录。'}</p>${btn(has('archive')?'odor-snapshot':'private-open',has('archive')?'读取异味帖本地快照':'查找私人备份')}${has('odor')?`<p>快照附件：班级合影（原始扫描＋发布版）</p>${has('chat')?btn('to4','对照两版合影 →','primary'):btn('chat','先解锁聊天，核对异味线索')}`:''}</div></div><div class="forum-caution">`);}return h+`<div class="route-footer">${btn('space','返回林夏的空间')}${btn('private-open','私人备份与索引')}</div>`;};
photoResult=function(){
 if(state.photo<=30){
   return `<span>林夏和可阳坐在一起。</span>${btn('to5','记录','', 'aria-label="记录对照结果，查看相关档案"')}`;
 }
 return `<span>向左拖动，观察蓝衣男孩身旁的白痕。</span>${btn('to5','记录','','disabled')}`;
};
const inquirySets={
  5:{title:'排放与投诉',ids:['complaint','discharge','party'],needed:['complaint','discharge'],next:6,evidence:'hazard',question:'哪些记录在时间和地点上相互对应？'},
  6:{title:'医疗档案对照',ids:['medical','instruction','payment','party'],needed:['medical','instruction','payment'],next:7,evidence:'clinic',question:'哪些原件能共同证明厂方参与修改诊断？'}
};
const archiveForms={
 medical:{heading:'门诊病历',office:'跃进新村卫生所',rows:[['日期','2008.12.30'],['主诉','夜间闻到异味后不适'],['初诊','原因待查'],['建议','进一步检查环境暴露']]},
 instruction:{heading:'诊断修改便笺',office:'厂办转卫生所',rows:[['收件','罗医生'],['登记号','C-17'],['修改口径','住宅环境不宜居住'],['用途','腾退评估']]},
 payment:{heading:'卫生所账目',office:'厂方支出凭据 · 收款联',rows:[['编号','C-17'],['项目','腾退评估协助'],['收款确认','罗医生'],['日期','2008.12.30']]},
 party:{heading:'跨年联欢节目单',office:'厂区活动室',rows:[['日期','2008.12.28'],['节目','合唱、朗诵'],['活动','烟花观赏']]},
 rule:{heading:'安置优先承诺',office:'安置材料 · 签收联',rows:[['日期','2008.12.27'],['条件','完成现场交接'],['签收','刘父']]},
 evacuation:{heading:'清场回报',office:'现场交接记录',rows:[['日期','2008.12.31'],['未撤离','林家'],['回报签收','刘父']]},
 gate:{heading:'人员出入登记',office:'保卫科 · 门禁记录',rows:[['日期','2008.12.31'],['来访人','刘父'],['区域','七号楼后方作业区']]},
 statement:{heading:'事后陈述',office:'陈述副本 · 签名页',rows:[['日期','2009.01.02'],['陈述人','刘父'],['附件','当晚值班记录']]},
 report:{heading:'事故调查节录',office:'调查记录 · 节选',rows:[['日期','2009.01.08'],['地点','七号楼'],['附件','现场调查记录']]}
};
function archivePaper(id){
 if(id==='discharge'||id==='complaint'){
  const asset=id==='discharge'?'record-emission':'record-complaint';
  return `<img class="record-facsimile" src="assets/${asset}.webp" alt="${documents[id].title}扫描图">`;
 }
 const f=archiveForms[id];
 return `<span class="record-form form-${id}">
   <span class="record-office">${f.office}</span><strong class="record-title">${f.heading}</strong>
   <span class="record-fields">${f.rows.map(([label,value])=>`<span><small>${label}</small><b${value==='C-17'?' class="marked-entry"':''}>${value}</b></span>`).join('')}</span>
 </span>`;
}
function archiveCard(id){
 const d=documents[id],read=wasRead(id);
 return btn('read-'+id,`<span class="file-strip"><b>${d.title}</b><small>${read?'已读':'打开'}</small></span>${archivePaper(id)}`,
  'archive-card',`aria-label="放大阅读：${d.title}（${read?'已读':'未读'}）"`);
}
function archiveHeading(title,context,clinic=false){
 return `<header class="register-banner${clinic?' clinic-banner':''}">${clinic?'<img src="assets/clinic-facade.webp" alt="">':''}
 <div><small>${context}</small><h2>${title}</h2></div>${btn('evidence','证据夹')}</header>`;
}
function inquiryScreen(){
 const d=inquirySets[state.stage],clinic=state.stage===6;
 const selected=state.flags['select'+state.stage]||[];
 const cards=clinic?['medical','instruction','payment']:['discharge','complaint'];
 const path=clinic?'本地档案 / 卫生所 / C-17':'本地档案 / 跃进机械厂 / 居民来访';
 return `${browserTools(path)}<section class="archive-register">
  ${archiveHeading(clinic?'跃进新村卫生所':'跃进机械厂档案室',clinic?'医疗档案 / 诊断与款项':'厂区档案 / 居民来访',clinic)}
  <div class="register-body">
   <h3 class="register-title">${d.title}${clinic?'（C-17）':''}</h3>
   <div class="archive-cards${clinic?' three-files':''}">${cards.map(archiveCard).join('')}</div>
   <div class="loose-attachment">同目录附件　${btn('read-party','新年联欢节目单','file-link')}</div>
   <fieldset class="archive-choice"><legend>${d.question}</legend>
   <p>点开原件阅读，再勾选要一起核对的材料。</p>
   <div>${d.ids.map(id=>`<label><input type="checkbox" value="${id}" data-select="${state.stage}" ${selected.includes(id)?'checked':''}>${documents[id].title}</label>`).join('')}</div></fieldset>
   <div class="register-submit"><span id="error" role="status"></span>${btn('submit-inquiry','提交关联判断','primary')}</div>
  </div>${sourceBand('original',clinic?'卫生所与厂方往来材料 · 2008 年 12 月':'居民与厂区登记记录 · 2008 年 12 月')}
 </section>`;
}
function restoredScreen(){return `${browserTools('回收站')}<section class="recovery-view"><h2>被删除的文件</h2>${sourceBand('broken','这些文件来自后期汇集的档案目录，不只包含 2008 年网页。')}<table class="record-table"><tr><th>选择</th><th>名称</th><th>内容</th></tr>${[['db','archive.db','保卫科记录与后续调查材料'],['party','新年活动安排.txt','联欢节目单'],['photo','班级合影.jpg','已保存的图像副本']].map(([id,t,d])=>`<tr><td><input aria-label="选择 ${t}" type="radio" name="recover" value="${id}" ${state.flags.recover===id?'checked':''}></td><td>${t}</td><td>${d}</td></tr>`).join('')}</table><div id="error" role="status"></div>${btn('recover-file','恢复选中的文件','primary')}</section>`;}
const chainRoles=[['利益动机','rule'],['已知风险','evacuation'],['到场位置','gate'],['具体行为','statement'],['事故后果','report']];
function chainScreen(){
 const catalog=['gate','rule','report','statement','evacuation'];
 return `${browserTools('archive.db / 已恢复 / 档案索引')}<section class="archive-register">
  ${archiveHeading('事故档案索引','archive.db / 已恢复')}
  <div class="register-body">
   <h3 class="register-title">事故当晚，发生了什么？</h3>
   <div class="archive-cards five-files">${catalog.map(archiveCard).join('')}</div>
   <fieldset class="archive-choice"><legend>每份材料能证明什么？</legend>
   <p>阅读原件，再把材料配到它所支持的判断。门禁里出现了父亲的名字，还需要其他记录。</p>
   <div class="archive-slots">${chainRoles.map(([role,id])=>`<label>${role}<select aria-label="${role}" data-chain="${id}"><option value="">选择材料</option>${catalog.map(opt=>`<option value="${opt}" ${state.flags.chain?.[id]===opt?'selected':''}>${documents[opt].title}</option>`).join('')}</select></label>`).join('')}</div></fieldset>
   <div class="register-submit"><span id="error" role="status"></span>${btn('submit-chain','核对完整证据链','primary')}</div>
  </div>${sourceBand('later','后期汇集 · 2008 年现场记录与 2009 年调查副本，原件日期分别保留。')}
 </section>`;
}
function openArchiveRecord(id){
 const d=documents[id],trigger=document.activeElement?.dataset.action;
 markRead(id);
 render();
 showModal(d.title,`<article class="archive-reader">
   <header><span>原件阅览</span><time>${safe(d.date)}</time></header>
   <div class="reader-desk">${archivePaper(id)}</div>
   <div class="reader-transcript"><h3>原件转录</h3><p>${safe(d.body)}</p>
   <h3>档案注记</h3><p>${safe(d.meaning)}</p></div>
 </article>`);
 if(trigger==='read-'+id)ui.returnFocus=screen.querySelector(`[data-action="read-${id}"]`);
}
function endingScreen(){if(state.stage===9)return `<div class="blue-screen"><b>Windows</b><h2>ARCHIVE_INTEGRITY_ERROR</h2><p>原有的解释，已经无法覆盖记录。</p><p>五份材料指向同一段经过：<br>刘父为保住安置优先资格，在知道清场未完成时提前行动。<br>设施破坏与引燃造成火势失控，林父遇难，林夏受伤。</p><p class="blue-technical">RECOVERING FINAL MESSAGE …<br>本段为档案程序的预设转场</p>${btn('ending','读取最后的留言 →')}</div>`;
const choice=state.stage===11;return `<section class="ending"><div class="ending-flower">✿</div><small>${choice?'最后的选择':'林夏的预录留言 · '+ARCHIVE.recorded}</small><h2>${choice?(state.choice==='public'?'让被掩盖的名字，<br>重新被听见。':'有些真相，<br>还在等待被说出。'):'刘可阳，<br>我不是来恨你的。'}</h2>${choice?`<p>${state.choice==='public'?'你选择整理原件、核对来源，把证据和林夏的名字一起带出沉默。':'你暂时没有公开。资料仍在，你也可以重新作出选择。'}</p><p>这一次，你已经读过他们各自留下的记录。</p>${btn('back-ending','回到选择')}${btn('evidence','回顾全部证据')}${btn('home','回到旧桌面')}`:`<p>我知道，你当年只是一个八岁的孩子。<br>也是唯一愿意顶住大人排挤，牵起我手的人。</p><p>大人们为了利益，造谣、隐瞒。<br>我花了几年整理这些，不是为了让你替父亲认罪。<br>我想让这些年的谎言结束，让我和爸爸的名字被好好说出来。</p><p>后来做档案整理时，我保存了活动室旧电脑上的用户资料。<br>这份档案里，我给你留了自己的座位。</p><p>欢迎语和你一路读到的回应，都是我提前写好的。<br>它们会随着你的阅读出现。不是我正在屏幕另一边打字。</p><p>现在，你愿意把这些记录带出去吗？</p><p class="ending-context">预录自白的文字转录。影片素材尚未接入。</p>${!state.flags.transfer?btn('transfer','查看随盘转交说明','primary'):`<div class="transfer-note"><b>随盘说明 · 档案室同事 · ${ARCHIVE.sent}</b><p>林夏在 2026 年 11 月 20 日把录好的留言与硬盘交给我，嘱托在跨年夜前寄给你。她于 12 月 5 日因事故后遗症病情恶化去世。这封说明是我整理包裹时补入的。</p><p>录制：${ARCHIVE.recorded}<br>去世：${ARCHIVE.died}<br>寄出：${ARCHIVE.sent}<br>送达：2026-12-31</p><small>所有互动均来自预先保存的记录与脚本。</small></div><div class="ending-actions">${btn('choose-public','整理证据，公开真相','primary')}${btn('choose-silent','暂时保持沉默')}</div>`}`}<small>选择只发生在故事中，不会向真实互联网发布内容。</small></section>`;}
render=function(){
 const s=state.stage, roster=s===0&&ui.entry==='qq';
 const entryTitles={qq:'腾讯QQ 2008',closed:'半夏的空间 - Microsoft Internet Explorer',cache:'Temporary Internet Files',own:'阳阳得意的QQ空间 - Microsoft Internet Explorer'};
 const title=s===0?entryTitles[ui.entry]:stageTitles[s];
 const desktop=document.querySelector('#desktop');
 if(desktop.classList.contains('roster-open')!==roster){
  appWindow.style.removeProperty('left');
  appWindow.style.removeProperty('top');
  desktop.classList.remove('maximized');
  const control=appWindow.querySelector('[data-action="maximize"]');
  control.setAttribute('aria-pressed','false');
  control.setAttribute('aria-label','放大游戏窗口');
 }
 desktop.classList.toggle('roster-open',roster);
 desktop.classList.toggle('final-mode',s>=9);
 desktop.classList.toggle('corrupted',s===8);
 appWindow.dataset.stage=s;
 const views=[entryScreen,qzoneScreen,qqScreen,forumScreen,photoScreen,inquiryScreen,inquiryScreen,restoredScreen,chainScreen,endingScreen,endingScreen,endingScreen];
 screen.innerHTML=views[s]();
 const symbol=roster||s===2?'qq':s===1||s===3||s===0&&ui.entry!=='cache'?'internet':s===0?'folder':s===4?'photo':'file';
 document.querySelector('#window-title').innerHTML=icon(symbol)+`<span>${title}</span>`;
 document.querySelector('#task-icon').innerHTML=icon(symbol);
 document.querySelector('#task-label').textContent=title.split(' - ')[0];
 document.querySelector('.desktop-icons').innerHTML=[['qq-home','qq','腾讯QQ'],['drive','computer','我的电脑'],['recycle','bin','回收站'],['space','internet','Internet Explorer']].map(([a,i,t])=>btn(a,icon(i)+`<span>${t}</span>`)).join('');
 document.title='消失在2008的7号楼 · '+title;
 document.body.classList.toggle('crt',!!state.flags.crt);
 save();
};
retroAction=function(a){
 if(a.startsWith('read-')){
  const id=a.slice(5);
  if(Object.hasOwn(documents,id)){openArchiveRecord(id);return true;}
 }
 if(a.startsWith('visit-')){openWindow();if(!visit(Number(a.slice(6))))toast('这份资料还没有解锁。');return true;}
 switch(a){
 case 'home':case 'start':case 'boot':case 'boot-done':case 'qq-home':openWindow();ui.entry='qq';visit(0);return true;
 case 'resume':openWindow();if(!visit(state.maxStage)){ui.entry='qq';visit(0);}return true;
 case 'own-space':ui.entry='own';visit(0);return true;
 case 'linxia':case 'linxia-space':openWindow();ui.entry='closed';visit(0);return true;
 case 'cache-list':ui.entry='cache';visit(0);return true;
 case 'cache-open':ui.restoringSpace=!state.flags.cache;state.flags.cache=true;openWindow();advance(1);ui.restoringSpace=false;return true;
 case 'space':openWindow();if(state.flags.cache)visit(1);else{ui.entry='closed';visit(0);}return true;
 case 'offline':showModal('QQ 系统消息','<p>对方已离线，无法发送消息。</p><small>这里只保存了旧用户目录，不连接真实账号。</small>');return true;
 case 'drive':case 'folders':case 'archive':showModal('我的电脑',`<h3>LINXIA_2008 (E:)</h3><p>硬盘接在刘可阳 2026 年的电脑上。当前 XP 界面由档案程序模拟。</p><p>2008 年用户目录：刘可阳（阳阳得意）<br>网页缓存：林夏（半夏）与跃进新村论坛<br>后期汇集资料：单独保留原件日期</p>${btn('qq-home','打开旧 QQ 面板')}`);return true;
 case 'unlock':showModal('离线聊天 · 约定验证',`<p>这不是 QQ 登录，也不是生日密保。</p><label for="answer">约好一起看烟花的日期（六位数字）</label><input id="answer" data-submit="password1" inputmode="numeric" autocomplete="off" placeholder="YYMMDD"><div id="error" role="status"></div>${btn('password1','解锁离线聊天','primary')}`);return true;
 case 'chat':case 'qq-view':if(has('chat')){openWindow();visit(2);}else{openWindow();if(state.flags.cache){visit(1);retroAction('unlock');}else{ui.entry='qq';visit(0);toast('先从林夏头像寻找她的缓存空间。');}}return true;
 case 'blog':case 'private-open':privateArchive();return true;
 case 'private-unlock':if(answer()==='栀子花'){addEvidence('archive');save();render();privateArchive();}else error('口令不匹配。看看她的头像、空间底纹和留言板。');return true;
 case 'forum-entry':openWindow();state.flags.forum=true;ui.forumPost=1;advance(3);return true;
 case 'read-bullying':if(!has('archive')){privateArchive();return true;}showModal('被删帖的本地快照',`${sourceBand('broken','原帖已删；正文来自私人收藏中的本地副本。')}<h3>7号楼那个带胎记的女孩</h3><p>发帖者把走廊里模糊的侧影说成“怪物”，把楼里的异常归到林夏身上。图片经过恶意修改，来源并非可靠事故记录。</p><p>跟帖中有人转述厂方针对林父的说法，却没有提供证据。</p><small>这是当年霸凌的痕迹，不是林夏为了吓人制作的画面。</small>`);return true;
 case 'odor-snapshot':if(!has('archive')){privateArchive();return true;}addEvidence('odor');save();render();showModal('异味帖 · 本地快照',`${sourceBand('original','2008.12.30 · 老陈')}<p>七号楼后面那股苦杏仁味又来了。好几户都说不舒服，晚上尤其明显。有人说是水出了问题，但没见过检测结果。</p><p>我把以前的合影和投诉记录一起存下了。楼里不是只有一个人在说这件事。</p><small>快照附件现在可以从搜索结果中打开。</small>`);return true;
 case 'forum-archive':if(canVisit(4)){advance(4);}else showModal('档案索引',`<p>需要把私人收藏目录与异味快照对应，并读取当年的聊天记录。</p>${btn('private-open','私人备份')}${btn('chat','聊天记录')}`);return true;
 case 'submit-inquiry':{const d=inquirySets[state.stage];if(!d)return true;const ids=state.flags['select'+state.stage]||[];if(ids.some(id=>!wasRead(id)))error('先打开所选原件阅读，不能只凭文件名判断。');else if(ids.length!==d.needed.length||d.needed.some(id=>!ids.includes(id)))error(state.stage===5?'还没有建立相同时间和地点的对应。节目单不能证明排放异常。':'证据不完整或混入了无关材料。需要病历、修改要求及同编号款项三者对应。');else advance(d.next,d.evidence);return true;}
 case 'recycle':if(has('clinic')){openWindow();visit(7);}else showModal('回收站','<p>当前可见的回收站为空。只有恢复更多目录索引后，才能看见被删除的档案。</p>');return true;
 case 'recover-file':if(state.flags.recover!=='db')error('这份文件不是保卫科记录数据库。查看文件内容列，再选择。');else{advance(8,'entry');retroAction('read-gate');}return true;
 case 'submit-chain':if(chainRoles.some(([,id])=>!wasRead(id)))error('还有原件没有阅读。先点开每份材料。');else if(chainRoles.some(([,id])=>state.flags.chain?.[id]!==id))error('有材料被放到了它不能单独证明的位置。尤其注意：门禁只证明到场，安置承诺只证明利益。');else advance(9,'truth');return true;
 case 'transfer':state.flags.transfer=true;save();render();return true;
 case 'previous':if(state.stage===0){ui.entry=ui.entry==='cache'?'closed':'qq';render();return true;}for(let i=state.stage-1;i>=0;i--)if(canVisit(i)){visit(i);break;}return true;
 case 'next':for(let i=state.stage+1;i<=state.maxStage;i++)if(canVisit(i)){visit(i);break;}return true;
 case 'contact-linxia':retroAction('linxia');return true;
 case 'help':showModal('帮助和支持','<p>从刘可阳旧 QQ 中的林夏头像开始，经关闭页找到本机缓存。</p><p>空间挂件提供聊天约定日期。私人备份提示的是她喜欢的花。论坛公开可读，删帖快照需要私人索引。</p><p>后半段先阅读原件，再配对证据。所有答案可以从已经出现的材料中找到。顶部“提示”会逐级说明。</p><p>窗口可拖动和缩放。关闭窗口不会清除进度，任务栏可以重开。所有账号、消息与公开选择都只是故事中的模拟。</p>');return true;
 case 'timeline':showModal('事件时间线',`<div class="timeline"><article><time>2000</time><p>刘可阳与林夏出生。</p></article><article><time>2008.12.31</time><p>两人八岁，七号楼发生事故。</p></article>${has('truth')?'<article><time>2009</time><p>事故调查记录留下现场行为与后果。</p></article>':''}${state.flags.transfer?'<article><time>2026.11.20</time><p>林夏录制留言，交付硬盘。</p></article><article><time>2026.12.05</time><p>林夏去世。</p></article><article><time>2026.12.29</time><p>档案室同事按嘱托寄出。</p></article>':''}<article><time>2026.12.31</time><p>刘可阳收到旧移动硬盘。</p></article></div>`);return true;
 default:return oldRetroAction(a);
 }
};
document.addEventListener('change',e=>{if(e.target.dataset.select){const key='select'+e.target.dataset.select;let ids=state.flags[key]||[];state.flags[key]=e.target.checked?[...new Set([...ids,e.target.value])]:ids.filter(x=>x!==e.target.value);save();}if(e.target.dataset.chain){state.flags.chain=state.flags.chain||{};state.flags.chain[e.target.dataset.chain]=e.target.value;save();}if(e.target.name==='recover'){state.flags.recover=e.target.value;save();}});
// A keyboard/click fallback accompanies physical dragging of the teaching prop.
document.addEventListener('pointerdown',e=>{const el=e.target.closest('.flower-sticker, [data-action="sticker"]');if(!el||state.sticker)return;const start=[e.clientX,e.clientY];el.setPointerCapture(e.pointerId);const move=ev=>{if(Math.hypot(ev.clientX-start[0],ev.clientY-start[1])>25){el.removeEventListener('pointermove',move);state.sticker=true;save();render();}};el.addEventListener('pointermove',move);el.addEventListener('pointerup',()=>el.removeEventListener('pointermove',move),{once:true});});
if(!canVisit(state.stage))state.stage=0;
render();
