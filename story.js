'use strict';
// The 2008 sources and the later archivist's interventions are visibly distinct.
const ARCHIVE={recipient:'刘可阳',account:'阳阳得意',owner:'林夏',nickname:'半夏',snapshot:'2008-12-31 23:59',compiled:'2026-11-20',recorded:'2026-11-20',died:'2026-12-05',sent:'2026-12-29'};
ui.entry='qq';
const oldRetroAction=retroAction;
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
 evacuation:{title:'清场安排与未撤离记录',date:'2008.12.31',body:'原安排要求先完成清场并核实人员，再执行后续行动。现场回报写着“清场人数未核完，暂缓交接”，签收栏有刘父的名字。另附的住户清点页仍留有空白。',meaning:'签收证明他已收到暂缓交接的通知。回报没有列出当时仍留在楼内的人。'},
 gate:{title:'保卫科门禁记录',date:'2008.12.31 · 事故前',body:'记录人：值班保卫。来访人员：刘父。进入区域：七号楼后方作业区。进入发生在暂缓交接回报签收之后、火情报告之前。记录没有写他在区域内做了什么。',meaning:'只证明位置与相对先后。门禁没有记录他进入后的动作。'},
 statement:{title:'刘父事后陈述副本',date:'2009.01.02',body:'“他们说还要再等等。我怕这次交不上去，我家的名额就轮不到了。现场设施是我提前动的。我只想让他们快点搬。出了事，我一直没把这话告诉人。”陈述页末有刘父签名，随页附值班日志。',meaning:'刘父自述提前干预、事后隐瞒。调查材料可以核对发生的火情；这些原件没有指认刘父亲自点火。'},
 report:{title:'事故调查节录',date:'2009.01.08',body:'调查将先前导致居民不适的危险排放，与当晚火灾分开记录。调查确认：现场设施遭到人为干预，当晚发生火灾并迅速失控。起火区域与值班记录对应。调查没有确认是谁引燃了大火。林父在事故中遇难，林夏受伤生还。',meaning:'说明火灾机制与后果；异味本身不能证明是哪种物质。'}
};
const offlineDelivery = {
 recipient:'刘可阳',
 welcome:'欢迎回家，刘可阳。',
 lastVisit:'2008-12-31 23:59',
 unlockDate:'2026-12-31',
 note:'可阳，是你吗？我留给你的位置，还在。',
 reply:'我看见你回来了。先去看那几条访客记录，好吗？'
};
// file: copies run offline too. The HTTP edition reads the copy supplied with the parcel.
if(location.protocol==='https:'||location.protocol==='http:'){
 fetch('./config.json').then(r=>r.ok?r.json():{}).then(data=>{
  for(const key of Object.keys(offlineDelivery)){
   if(typeof data[key]==='string'&&data[key].trim())offlineDelivery[key]=data[key];
  }
 }).catch(()=>{});
}
function showWelcome(){
 showModal('本地访客记录',`<div class="return-envelope"><small>${safe(offlineDelivery.unlockDate)} · 致 ${safe(offlineDelivery.recipient)}</small><h2>${safe(offlineDelivery.welcome)}</h2><p>上一次访问：${safe(offlineDelivery.lastVisit)}</p><small>硬盘预置访客记录 · config.json</small></div>`);
}
function scheduledMessage(){
 return `<aside class="scheduled-message" aria-label="来自半夏的留言"><img src="assets/linxia-flower.webp" alt=""><div><small>${safe(offlineDelivery.unlockDate)} · 随盘留言</small><b>半夏</b><p>${safe(offlineDelivery.note)}</p>
  ${state.flags.repliedToLinxia?`<p class="reply-line"><small>刘可阳</small>你还在吗？</p><p class="auto-line"><small>半夏 · 自动回复</small>${safe(offlineDelivery.reply)}</p>`:btn('ask-linxia','你还在吗？')}
 </div></aside>`;
}
function friendSnapshot(){
 return `<section class="saved-roster"><header>QQ 好友列表 · 2008 年缓存</header><div class="snapshot-id"><img src="assets/linxia-flower.webp" alt=""><span>半夏<small>林夏的账号</small></span></div>
  <details open><summary>朋友（1）</summary><div class="snapshot-id"><img src="assets/keyang-portrait.webp" alt=""><span>阳阳得意<small>备注　刘可阳</small></span></div></details>
  <details><summary>他们（3）</summary><p>浩哥最拽　静静de小情绪　低调小磊</p></details></section>`;
}
function highlightChatLine(i,text){
 return `<span class="inverted-line">${btn('reveal-chat-'+i,state.flags['chatInk'+i]?'收起反白字':'反白查看','ink-toggle',`aria-expanded="${!!state.flags['chatInk'+i]}"`)}<span class="hidden-ink ${state.flags['chatInk'+i]?'ink-on':''}">${text}</span></span>`;
}
function xpArchiveDrive() {
 const folders = [
  ['linxia','xp-archive-folder','林夏2008空间'],
  ['drive-blog','xp-archive-folder','博客归档'],
  ['chat','xp-chat-folder','QQ聊天归档']
 ];
 return `${browserTools('E:&#92;旧硬盘')}<div class="cache-explorer xp-archive-drive">
  <aside class="explorer-side">
   ${taskPanel('文件和文件夹任务','<p>浏览本地存档</p><p>只读文件系统</p>')}
   ${taskPanel('其它位置',btn('qq-home',icon('qq')+'我的 QQ'))}
   ${taskPanel('详细信息','<b>旧硬盘 (E:)</b><p>本地磁盘<br>文件系统：NTFS</p>')}
  </aside><section class="xp-volume-folders" aria-label="旧硬盘上的文件夹">${folders.map(([a,img,label])=>btn(a,'<img src="assets/'+img+'.webp" alt=""><span>'+label+'</span>')).join('')}</section></div>${statusbar('3 个对象 · 旧硬盘 (E:)')}`;
}
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
 if(ui.entry==='volume')return xpArchiveDrive();
 if(ui.entry==='closed')return `${browserTools('http://qzone.qq.com / 半夏')}<section class="offline-page"><div class="offline-document">
  <div class="offline-banner">☆ Qzone <small>QQ空间</small></div><div class="offline-content"><div class="lost-portrait" aria-hidden="true"></div>
  <div><small>半夏的个人空间</small><h1>该空间已关闭</h1><p>这个账号已经注销。<br>由于主人的设置，您暂时无法访问。</p>
  ${btn('cache-list',icon('folder')+'从本机缓存打开','local-copy')}${btn('qq-home','返回好友列表','plain-link')}</div></div>
  <footer>状态由整理者于 2026 年补录</footer></div></section>${statusbar('已完成 · 页面已关闭')}`;
 if(ui.entry==='cache')return `${browserTools('E:&#92;Temporary Internet Files')}<div class="cache-explorer">
  <aside class="explorer-side">${taskPanel('文件和文件夹任务',btn('qq-home',icon('qq')+'返回好友列表'))}${taskPanel('详细信息','<b>Temporary Internet Files</b><p>Internet 临时文件<br>位于旧硬盘 (E:)</p>')}</aside>
  <section class="cache-folder"><header>${icon('folder')}<div><small>Internet Explorer</small><h2>Temporary Internet Files</h2></div></header>
  <div class="cache-columns"><span>名称</span><span>上次保存</span></div>
  <button type="button" data-action="cache-open" class="cache-record">${icon('internet')}<span><b>index.html</b><small>linxia.qzone.qq.com/index.html</small></span><time>2008-12-31 23:59</time></button>
  <p>页面可读，部分模块缺失。单击文件打开保存的页面。</p>
  </section></div>${statusbar('1 个对象 · 本机缓存')}`;
 if(ui.entry==='own')return keyangSpace();
 return friendDirectory();
}
function keyangSpace(){
 return `${browserTools('http://user.qzone.qq.com/269834271')}<section class="space-2008 keyang-space">
  <header class="qzone-brand"><b>☆ Qzone <small>QQ空间</small></b><span>刘可阳的个人空间</span>${btn('welcome-again','访客记录')}${btn('qq-home','QQ 好友列表')}</header>
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
 return `<button type="button" data-action="sticker" class="hero-keepsake ${state.sticker?'date-visible':''}" aria-label="${state.sticker?'跨年约定：08 年 12 月 31 日':'移开右上角栀子花挂件'}" aria-expanded="${state.sticker}">
   <img src="assets/keepsake-${state.sticker?'date':'flower'}.webp" alt=""><small>${state.sticker?'08 · 12 · 31':'移开花朵'}</small></button>`;
}
function spacePlayer() {
 return `<section class="qpanel space-music"><h3>我的音乐盒</h3><div class="mini-deck ${ui.audio?'playing':''}">
  <div class="deck-lcd"><small>${ui.audio?'PLAY':'STOP'} &nbsp; 01</small><b>窗边的小调</b><span class="meter-lines" aria-hidden="true"></span></div>
  ${btn('music',ui.audio?'Ⅱ':'▶','deck-key',`aria-label="${ui.audio?'暂停':'播放'}窗边的小调" aria-pressed="${!!ui.audio}"`)}</div></section>`;
}
qzoneScreen=function(){
 const title={home:'我的日志',album:'我的相册',journal:'我的日志',guestbook:'留下你的脚印'}[ui.qtab]||'我的相册';
 const tabs=[['home','主页'],['journal','日志'],['album','相册'],['guestbook','留言板']];
 return `${browserTools('http://linxia.qzone.qq.com/index.html')}<div class="qzone-page space-2008 ${ui.restoringSpace?'restoring-space':''}">
  ${sourceBand('broken','以下内容来自本机缓存，最后保存于 '+ARCHIVE.snapshot)}<header class="qzone-brand"><b>☆ Qzone <small>QQ空间</small></b><span>林夏的个人空间</span>${btn('qq-home','QQ 好友列表')}</header>
  <div class="team-letterhead linxia-letterhead qzone-banner"><h2>半夏的小小世界</h2>${newYearKeepsake()}</div>
  <nav class="qzone-tabs" aria-label="空间栏目">${tabs.map(([id,label])=>btn('qtab-'+id,label,ui.qtab===id?'active':'',ui.qtab===id?'aria-current="page"':'')).join('')}${btn('chat','聊天记录')}${btn('private-open','私人备份')}</nav>
  <div class="qzone-columns"><aside>${profile()}${spacePlayer()}</aside>
   <section class="qpanel diary-list"><h3>${title}${['home','journal'].includes(ui.qtab)?'<small>共 3 篇</small>':''}</h3>${spaceContents()}</section>
   <aside><section class="qpanel referral-panel"><h3>最近访客 <small>来访来源</small></h3><div class="visitor-sources">
    ${[['浩哥最拽','她家是不是有问题'],['静静de小情绪','又见过那个侧影'],['匿名访客','离她远点']].map(([name,thread])=>btn('forum-entry',`<b>${name}</b><small>跃进新村论坛 › 7号楼那个带胎记的女孩<br>跟帖：${thread}</small>`)).join('')}</div></section>
    <section class="qpanel lock-panel"><h3>聊天归档</h3><p>验证跨年约定后可读。</p>${btn('chat',has('chat')?'打开聊天记录':'验证跨年约定')}</section><section class="qpanel lock-panel"><h3>私人备份</h3><p>${has('archive')?'留言与网页收藏目录':'提示：我最喜欢的花'}</p>${btn('private-open',has('archive')?'查看收藏目录':'输入口令')}</section><section class="qpanel period-links"><h3>友情链接</h3>${btn('forum-front','跃进新村论坛')}</section><section class="qpanel missing-module"><h3>空间装扮</h3><p>□　未保存挂件缩略图</p></section></aside>
  </div><footer class="qzone-footer">© 2008 半夏的小小世界</footer></div>${statusbar('已载入林夏的空间')}`;
};
function privateArchive(){
 if(!has('archive')){
  if(state.flags.cache && state.stage!==1){openWindow();visit(1);}
  showModal('私人备份',`<div class="backup-prompt"><p><img src="assets/key-backup.webp" alt="">提示：我最喜欢的花</p>
    <label>访问口令 <input id="answer" data-submit="private-unlock" autocomplete="off"></label>
    <div id="error" role="status"></div><footer>${btn('private-unlock','确定','primary')}${btn('close','取消')}</footer></div>`);
  dialog.querySelector('#answer').focus();return;
 }
 showModal('林夏的私人备份',`${sourceBand('original','2008 年的留言与收藏目录')}<h3>给可阳的留言</h3><p>你是唯一愿意陪我一起回家的人。等栀子花开了，我们一起去看。</p><h3>保存的好友列表</h3>${friendSnapshot()}<h3>网页收藏目录</h3><p>7号楼那个女孩 / 原帖已删<br>楼后面那股味道 / 本地快照可读<br>新村小学合影 / 原始扫描与发布版</p><small>收藏目录中的地址，可以和论坛搜索结果中的失效链接对应。</small>${btn('forum-entry','打开收藏中的论坛地址')}`);}
const forumBoards=['社区公告','生活交流','居民相册','便民信息','业主杂谈'];
const boardPosts=[[0,3],[1,2,4,5,6,7],[4],[3,5],[1,6,7]];
function missingOdorPost(){
 return `<div class="snapshot-result"><b>关于7号楼异味的反映</b><p>原帖已删除。页面标题仍留在本地搜索索引中。</p>
  ${has('archive')?btn('odor-snapshot','百度快照 · 读取本地保存副本'):btn('private-open','用私人收藏索引定位快照')}
  ${has('odor')?`<div class="file-attachment"><small>已找回的快照附件</small>${btn(has('chat')?'to4':'chat',has('chat')?'班级合影.jpg · 对照扫描件与发布版':'打开聊天记录，核对异味线索')}</div>`:''}</div>`;
}
function bbsSnapshot(kind){
 const smell=kind==='odor';
 const messages=smell?[
  ['低调小磊','7号楼后面的管道附近又有一股苦杏仁味，好几户都不舒服。有人说水出了问题，谁见过检测单？','bbs-author'],
  ['静静de小情绪','之前我回的帖子里也有人提起。老陈把原来的照片和投诉一起存了。','bbs-author2']
 ]:[
  ['七号楼住户','厂里有人说她爸惹了麻烦。昨晚走廊那个人影，是不是又是她？','bbs-alley'],
  ['浩哥最拽','我把别人转过来的图调黑了。你们看，这影子是不是很吓人？','bbs-author'],
  ['静静de小情绪','谁拍的？她的头像明明是栀子花，怎么都在转这张黑影？','bbs-author2']
 ];
 return `<div class="thread-heading"><h3>${smell?'关于7号楼异味的反映':'7号楼那个带胎记的女孩'}</h3></div>
 ${messages.map(([name,quote,avatar],i)=>`<article class="bbs-floor"><aside><b>${name}</b><img src="assets/${avatar}.webp" alt=""><small>新村居民</small></aside><div><header>发表于 2008-12-30 <span>${i+1}楼</span></header><p>${quote}</p></div></article>`).join('')}
 <div class="snapshot-result">${smell?`<b>附件列表</b>${btn(has('chat')?'to4':'chat',has('chat')?'班级合影.jpg · 对照扫描件与发布版':'打开聊天记录，核对异味线索')}`:'<small>来源：居民转帖，图像经过二次处理。原拍摄者未署名。</small>'}
 ${btn('forum-home','返回帖子列表')}</div>`;
}
function bbsArticle(i){
 if(i===1)return `<div class="thread-heading">${btn('forum-home','« 返回列表')}<h3>${forumPosts[i][1]}</h3></div>
 <div class="removed-notice"><img src="assets/bbs-info.webp" alt=""><strong>该帖已被管理员删除</strong><p>楼主：七号楼住户　最后编辑：2008-12-30</p>${has('archive')?btn('read-bullying','读取私人收藏中的快照'):btn('private-open','查找本地收藏索引')}</div>`;
 if(i===2)return `<div class="thread-heading">${btn('forum-home','« 返回列表')}<h3>关于7号楼异味的反映</h3></div>
 <div class="removed-notice"><img src="assets/bbs-info.webp" alt=""><strong>该主题已被删除或不存在。</strong><p>${btn('forum-home','论坛首页')} ${btn(has('archive')?'odor-snapshot':'private-open',has('archive')?'百度快照 · 本地副本':'查找私人收藏索引')}</p></div>`;
 return forumArticle(i);
}
forumScreen=function(){
 const board=ui.forumBoard??1;
 const query=ui.bbsSearching===false?'':state.search?(state.flags.bbsQuery||'苦杏仁味'):'';
 const flower=query==='栀子花';
 const ids=query?(flower?[1,7]:[2,4,6]):boardPosts[board];
 const snapshot=ui.forumSnapshot;
 const isThread=ui.forumPost!==null;
 const address=snapshot?'file:///E:/archive/ydxc-bbs/'+(snapshot==='odor'?'7251':'4826')+'.html':'http://ydxc.bbs.cn/'+(isThread?'thread/'+[203,4826,7251,311,864,519,327,470][ui.forumPost]+'.html':query?'search?q='+encodeURIComponent(query):'board/'+board+'.html');
 const content=snapshot?bbsSnapshot(snapshot):isThread?bbsArticle(ui.forumPost):`<div class="forum-list-title"><b>${query?'搜索结果 · '+query:forumBoards[board]}</b><span>${ids.length} 条保存的主题</span></div>
 <table class="forum-table"><thead><tr><th>主题</th><th>作者</th><th>回复 / 查看</th><th>最后发表</th></tr></thead><tbody>${ids.map(i=>{const p=forumPosts[i];return `<tr><td>${btn('post-'+i,`<span class="post-tag">${p[0]}</span>${p[1]}${i===1||i===2?'　[已删除]':''}`)}</td><td>${p[2]}</td><td>${p[3]}</td><td>${p[4]}</td></tr>`}).join('')}</tbody></table>
 ${query&&!flower?missingOdorPost():''}`;
 return `${browserTools(address)}<div class="forum-page ${ui.forumArriving?'bbs-arriving':''}">
 <header class="forum-banner period-bbs"><h2>跃进新村论坛</h2></header>
 <nav class="forum-nav">${btn('forum-home','首页')}${forumBoards.map((label,i)=>btn('forum-category-'+i,label,board===i?'active':'')).join('')}</nav>
 ${sourceBand(snapshot||state.search&&query?'broken':'original',snapshot?'本页来自本机保存的网页快照 · '+ARCHIVE.snapshot:query?'本机搜索索引 · '+ARCHIVE.snapshot:'跃进新村论坛 · 2008 年公开帖文存档')}
 <div class="forum-search"><span>跃进新村论坛 » ${isThread?'帖子阅读':query?'离线索引':forumBoards[board]}</span><label for="answer">站内搜索</label><input id="answer" placeholder="输入关键词" value="${safe(query)}">${btn('search','搜索')}<div id="error" role="status"></div></div>
 <div class="forum-columns"><aside><h3>版块导航</h3>${forumBoards.map((label,i)=>btn('forum-category-'+i,'▧ '+label,board===i?'selected':'')).join('')}
 <h3>最新回复</h3>${btn('post-7','深夜的走廊……')}${btn('post-6','大家最近是不是都有点不舒服')}<h3>社区资料</h3><p>注册用户：320<br>帖子：4287<br>最后保存：2008.12.31</p><h3>档案资料</h3>${btn('forum-archive','合影与调查记录')}</aside>
 <section>${content}</section></div><footer class="forum-footer">跃进新村论坛　© 2008</footer></div>
 ${statusbar('已完成 · 本地论坛存档')}<div class="route-footer">${btn('space','返回林夏的空间')}${btn('private-open','私人备份与索引')}</div>`;
};

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
 evacuation:{heading:'清场回报',office:'现场交接记录',rows:[['日期','2008.12.31'],['现场回报','人数未核完'],['回报签收','刘父']]},
 gate:{heading:'人员出入登记',office:'保卫科 · 门禁记录',rows:[['日期','2008.12.31'],['来访人','刘父'],['区域','七号楼后方作业区']]},
 statement:{heading:'事后陈述',office:'陈述副本 · 签名页',rows:[['日期','2009.01.02'],['陈述人','刘父'],['附件','当晚值班记录']]},
 report:{heading:'事故调查节录',office:'调查记录 · 节选',rows:[['日期','2009.01.08'],['地点','七号楼'],['附件','现场调查记录']]}
};
function archivePaper(id){
 const sheets={
   complaint:['record-complaint','居民投诉记录'],
   discharge:['record-emission','厂区隐患排查日志'],
   medical:['clinic-medical','C-17 原始病历'],
   instruction:['clinic-instruction','C-17 修改便笺附页 · 改写后的记录'],
   payment:['clinic-payment','跃进新村卫生所账目，C-17 被红线标出'],
   rule:['case-relocation','动迁名单'],
   evacuation:['case-risk-log','厂区隐患排查日志'],
   gate:['case-plan','7 号楼平面图'],
   statement:['case-duty','保卫科值班日志'],
   report:['case-clinic','诊所记录']
 };
 const sheet=sheets[id];
 if(sheet){
   const [asset,label]=sheet;
   const companion=chainRoles.some(([,key])=>key===id);
   return `<span class="archive-sheet">
     <span class="archive-sheet-image"><img class="record-facsimile" src="assets/${asset}.webp" alt="${label}">
       ${id==='instruction'?'<span class="clinic-entry">住宅环境不宜居住</span>':''}</span>
     ${companion?`<small class="sheet-caption">同卷图页 · ${label}</small>`:''}
   </span>`;
 }
 const f=archiveForms[id];
 return `<span class="record-form form-${id}">
   <span class="record-office">${f.office}</span><strong class="record-title">${f.heading}</strong>
   <span class="record-fields">${f.rows.map(([label,value])=>`<span><small>${label}</small><b>${value}</b></span>`).join('')}</span>
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
const recoveryFiles=[
 {id:'db',name:'archive.db',dir:'档案汇编',type:'数据库',note:'保卫科登记簿与事故调查副本',icon:'disk'},
 {id:'party',name:'新年活动安排.txt',dir:'厂区活动',type:'文本',note:'跨年联欢节目单',icon:'file'},
 {id:'photo',name:'班级合影.jpg',dir:'学校相册',type:'图片',note:'已读合影的副本',icon:'photo'}
];
function recoveryRegister(){
 // Only the register metadata is legible before the original opens. Names stay withheld.
 const cells=['2008-12-31','待核姓名','—','进入','7 号楼'];
 return `<div class="restore-db-preview">${browserTools('http://localhost/database/')}
  <section class="preview-database"><h2>本地数据库</h2><div class="preview-database-layout">
   <aside><b>首页</b><strong>门禁记录</strong><span>设备信息</span><span>系统设置</span></aside>
   <div><h3>门禁记录</h3><table><caption>保卫科登记簿 · 跨年夜</caption>
    <thead><tr>${['日期','人员','时间','出入','地点'].map(label=>`<th>${label}</th>`).join('')}</tr></thead>
    <tbody><tr>${cells.map((value,i)=>`<td><span data-preview-field="${i}" hidden>${value}</span></td>`).join('')}</tr>
    ${Array.from({length:4},()=>'<tr aria-hidden="true"><td></td><td></td><td></td><td></td><td></td></tr>').join('')}</tbody></table>
   </div></div></section>${statusbar('正在读取保卫科离线目录…')}</div>`;
}
function restoredScreen(){
 const rows=recoveryFiles.map(f=>`<tr><td><label><input aria-label="选择 ${f.name}" type="radio" name="recover" value="${f.id}" ${state.flags.recover===f.id?'checked':''}>${icon(f.icon)}<b>${f.name}</b></label></td><td>${f.dir}</td><td>${f.type}</td><td>${f.note}</td></tr>`).join('');
 return `<div class="restore-picker">${browserTools('旧硬盘 (E:) / 回收站')}<section class="restore-files">
  <header class="register-banner"><div><small>旧硬盘 (E:)</small><h2>本地文件恢复工具</h2></div></header>
  <div class="restore-workspace"><aside>${icon('bin')}<b>已删除的文件</b><span>3 个文件</span></aside><div class="restore-list">
   <h3>回收站目录</h3><table><thead><tr><th>文件名称</th><th>原位置</th><th>类型</th><th>目录摘要</th></tr></thead><tbody>${rows}</tbody></table>
   <p class="restore-note">门禁原件和后来的调查副本保存在同一个数据库里。选择要还原的文件。</p>
   <div class="register-submit"><span id="error" role="status"></span>${btn('recover-file','还原选中文件','primary')}</div>
  </div></div>${sourceBand('broken','整理者汇集的离线档案目录 · 各份材料保留原日期。')}</section></div>${recoveryRegister()}`;
}
const caseAppendices={
 rule:{name:'动迁名单',src:'relocation',caption:'签收名册。个人获得优先资格的条件见同卷《安置优先承诺》。'},
 gate:{name:'7 号楼平面图',src:'plan',caption:'保卫科留存的位置参考图。图中没有个人行踪标记。'},
 statement:{name:'保卫科值班日志',src:'duty',caption:'当晚的值班登记。刘父承认提前行动的话，出自他事后的签名陈述。'}
};
async function restoreDatabase(){
 if(state.stage!==7||!has('clinic'))return;
 if(state.flags.recover!=='db'){error('要还原的是保卫科与调查材料的数据库。看看各文件的目录摘要。');return;}
 const fields=[...screen.querySelectorAll('[data-preview-field]')];
 fields.forEach(el=>{el.hidden=true;});
 showModal('文件恢复工具',`<div class="restore-progress">${icon('disk')}<div><p>文件　<strong>archive.db</strong></p><p>状态　<span data-restore-status>还原索引与附件</span></p><div class="progress-line">进度　<progress max="5" value="0" aria-label="档案还原进度"></progress> <output>0%</output></div></div></div>`);
 const close=dialog.querySelector('.modal-body [data-action="close"]');close.textContent='取消';
 const progress=dialog.querySelector('progress'),output=dialog.querySelector('output');
 // Keep the original files read-only. The preview images load alongside the restored index.
 for(const [,id] of chainRoles){
  if(!progress.isConnected||state.stage!==7)return;
  const attachment=caseAppendices[id];
  if(attachment){
   const preview=new Image();preview.src='assets/case-'+attachment.src+'.webp';
   await preview.decode().catch(()=>{}); // A missing preview must not block access to the transcript.
  }
  await new Promise(resolve=>setTimeout(resolve,270));
  if(!progress.isConnected||state.stage!==7)return;
  fields[[0,4,3,2,1][progress.value]].hidden=false;
  progress.value++;output.textContent=progress.value*20+'%';
 }
 dialog.querySelector('[data-restore-status]').textContent='恢复完成';
 close.dataset.action='finish-recovery';close.textContent='完成';
 await new Promise(resolve=>setTimeout(resolve,650));
 if(progress.isConnected&&state.stage===7)retroAction('finish-recovery');
}
function showCaseAppendix(id){
 const f=caseAppendices[id];
 if(!f||state.stage!==8)return;
 showModal(f.name,`<figure class="case-exhibit"><img src="assets/case-${f.src}.webp" alt="${f.name}纸本扫描图"><figcaption>${f.caption}</figcaption></figure>`);
}
const chainRoles=[['利益动机','rule'],['已知风险','evacuation'],['到场位置','gate'],['具体行为','statement'],['事故后果','report']];
function chainScreen(){
 const catalog=['gate','rule','report','statement','evacuation'];
 const transcription=catalog.every(wasRead)?`<details class="meeting-fragment">
   <summary><span class="fragment-icon" aria-hidden="true">♫</span> 卷末附注 · 会议录音残段</summary>
   <div class="fragment-paper">
     <div class="fragment-drawing" aria-hidden="true"><img src="assets/linxia-doodle.webp" alt=""><span>ERR / DATA</span></div>
     <div class="fragment-lines"><small>录音转写 · 两位说话人身份未辨</small>
       <p>“这笔钱……怎么分？”</p><p>“按名单算。剩下的……”</p>
       <span>〔此处缺音〕</span></div>
   </div><p class="fragment-source">林夏整理旧会议录音时留下的转写节录。由档案程序叠在童年涂鸦上播放。</p>
 </details>`:'';
 return `${browserTools('archive.db / 已恢复 / 档案索引')}<section class="archive-register">
  ${archiveHeading('事故档案索引','archive.db / 已恢复')}
  <div class="register-body">
   <h3 class="register-title">事故当晚，发生了什么？</h3>
   <div class="archive-cards five-files">${chainRoles.map(([,id])=>archiveCard(id)).join('')}</div>
   <div class="case-attachments"><span>同卷附件</span>${Object.entries(caseAppendices).map(([id,f])=>btn('case-appendix-'+id,`<img alt="" src="assets/case-${f.src}.webp">${f.name}`)).join('')}</div>
   <fieldset class="archive-choice"><legend>每份材料能证明什么？</legend>
   <p>阅读原件，再把材料配到它所支持的判断。门禁里出现了父亲的名字，还需要其他记录。</p>
   <div class="archive-slots">${chainRoles.map(([role,id])=>`<label>${role}<select aria-label="${role}" data-chain="${id}"><option value="">选择材料</option>${catalog.map(opt=>`<option value="${opt}" ${state.flags.chain?.[id]===opt?'selected':''}>${documents[opt].title}</option>`).join('')}</select></label>`).join('')}</div></fieldset>
   ${transcription}
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
function interruptionScreen(){
 return `<section class="archive-stop">
  <h2>ARCHIVE_INTEGRITY_ERROR</h2>
  <p class="stop-code">*** STOP: 0x0000007B<br>BUILDING_7 / INDEX_20081231</p>
  <p>旧索引中，“林夏带来灾难”的说法与原件冲突。</p>
  <p>现场回报还在等核验，刘父却为安置名额提前行动。<br>门禁记下他到过现场，事后陈述记下他承认的干预。<br>调查确认火势失控。林父遇难，林夏受伤生还。</p>
  <p class="stop-code">READING FINAL MESSAGE<span class="stop-cursor" aria-hidden="true">_</span></p>
  ${btn('ending','读取林夏留下的留言 →')}
  <small>档案程序预设转场</small>
 </section>`;
}
function transferLetter(){
 return `<article class="handover-letter"><header><small>随盘文件 · 档案室同事</small><h3>转交说明</h3></header>
  <p>可阳，</p><p>11 月 20 日，林夏把硬盘托付给我。她录好了留言，希望你在跨年前收到。12 月 5 日，她因事故后遗症病情恶化去世。</p>
  <p>我照她的意思，把这封说明和硬盘一起寄给你。</p><footer>档案室同事<br><time>${ARCHIVE.sent}</time></footer>
  <dl class="handover-dates"><div><dt>留言录制</dt><dd>${ARCHIVE.recorded}</dd></div><div><dt>林夏去世</dt><dd>${ARCHIVE.died}</dd></div><div><dt>硬盘寄出</dt><dd>${ARCHIVE.sent}</dd></div><div><dt>硬盘送达</dt><dd>2026-12-31</dd></div></dl>
 </article>`;
}
function messageTranscript(){
 return `<article class="message-transcript"><p>我不是来恨你的，刘可阳。</p>
  <p>你当年也才八岁。院子里的人都绕着我走的时候，是你还肯牵我的手，陪我回家。</p>
  <p>大人们为了自己的利益，把那些事都算在我头上。我花了几年整理这些，想让他们好好说出我和爸爸的名字。</p>
  <p>后来我在档案室工作，把活动室那台旧电脑的用户资料保存了下来。在这份档案里，我给你留了自己的座位。</p>
  <p>你一路看到的回应，我都提前写好了。到了你读完这句话的时候，选择就在你手里了。</p>
  <footer>林夏 · ${ARCHIVE.recorded}</footer></article>`;
}
function endingScreen(){
 if(state.stage===9)return interruptionScreen();
 if(state.stage===11){
  const published=state.choice==='public';
  return `<section class="last-record last-decision"><div class="decision-block"><small>调查结束 · 刘可阳</small>
   <h2>${published?'公开真相':'暂时沉默'}</h2><p>${published?'你把原件、出处和林夏的名字一并整理，决定让当年的事情被更多人知道。':'你关掉了公开页面，把硬盘放回桌上。林夏和父亲留下的记录仍在这里。'}</p>
   <div class="decision-links">${btn('back-ending','重新选择')}${btn('evidence','回顾证据')}${btn('home','回到旧桌面')}</div></div></section>`;
 }
 if(state.flags.transfer){
  return `<section class="last-record last-decision"><div class="decision-block"><small>林夏的留言 · 最后一页</small>
   <h2>你愿意把真相说出来吗？</h2><div class="decision-choice">${btn('choose-public','公开真相')}${btn('choose-silent','暂时沉默')}</div>
   <div class="decision-links">${btn('reread-message','重读留言')}${btn('reread-letter','重读转交说明')}</div><small>选择保存在本机，可随时重新选择。</small></div></section>`;
 }
 return `<section class="last-record last-intro"><div class="last-message"><header><small>林夏给刘可阳 · ${ARCHIVE.recorded}</small><h2>预录留言</h2></header>
  <div class="message-index"><button type="button" data-action="open-message"><span aria-hidden="true">▤</span> 阅读文字转录</button></div>
  <div class="letter-open">${btn('transfer','拆开随盘的转交说明 →','','aria-describedby="letter-status"')}<small id="letter-status">${state.flags.messageRead?'':'请先读林夏的留言'}</small></div><span id="error" role="status"></span></div></section>`;
}
render=function(){
 const s=state.stage, roster=s===0&&ui.entry==='qq';
 const entryTitles={volume:'旧硬盘 (E:)',qq:'腾讯QQ 2008',closed:'半夏的空间 - Microsoft Internet Explorer',cache:'Temporary Internet Files',own:'阳阳得意的QQ空间 - Microsoft Internet Explorer'};
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
 const fullPage = (s === 0 && ui.entry === 'own') || (s >= 1 && s <= 5) || s === 8;
 if (desktop.dataset.fullPage !== String(fullPage)) {
  desktop.dataset.fullPage = String(fullPage);
  desktop.classList.toggle('maximized',fullPage);
  const control = appWindow.querySelector('[data-action="maximize"]');
  control.setAttribute('aria-pressed',String(fullPage));
  control.setAttribute('aria-label',fullPage?'还原游戏窗口':'放大游戏窗口');
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
 document.querySelector('.desktop-icons').innerHTML=[['qq-home','qq','腾讯QQ'],['drive','computer','我的电脑'],['recycle','bin','回收站'],['own-space','internet','Internet Explorer']].map(([a,i,t])=>btn(a,icon(i)+`<span>${t}</span>`)).join('');
 document.title='消失在2008的7号楼 · '+title;
 document.body.classList.toggle('crt',!!state.flags.crt);
 save();
};
retroAction=function(a){
 if(a==='reveal-chat-0'||a==='reveal-chat-1'){
  const key='chatInk'+a.slice(-1);state.flags[key]=!state.flags[key];save();render();
  screen.querySelector('[data-action="'+a+'"]')?.focus({preventScroll:true});return true;
 }
 if(a.startsWith('case-appendix-')){showCaseAppendix(a.slice(14));return true;}
 if(a.startsWith('post-')||a==='open-bookmark')ui.forumSnapshot=null;
 if(a.startsWith('forum-category-')){
  const board=Number(a.slice(15));
  if(forumBoards[board]){ui.forumSnapshot=null;ui.forumBoard=board;ui.bbsSearching=false;ui.forumPost=null;render();}
  return true;
 }
 if(a.startsWith('read-')){
  const id=a.slice(5);
  if(Object.hasOwn(documents,id)){openArchiveRecord(id);return true;}
 }
 if(a.startsWith('visit-')){openWindow();if(!visit(Number(a.slice(6))))toast('这份资料还没有解锁。');return true;}
 switch(a){
 case 'home':case 'start':case 'boot':case 'boot-done':case 'qq-home':openWindow();ui.entry='qq';visit(0);return true;
 case 'resume':openWindow();if(!visit(state.maxStage)){ui.entry='qq';visit(0);}return true;
 case 'own-space':
  openWindow();ui.entry='own';visit(0);
  if(!document.querySelector('#desktop').classList.contains('maximized'))act('maximize');
  if(!state.flags.spaceWelcome){state.flags.spaceWelcome=true;save();showWelcome();}
  return true;
 case 'welcome-again':showWelcome();return true;
 case 'ask-linxia':state.flags.repliedToLinxia=true;save();render();screen.querySelector('.scheduled-message')?.scrollIntoView({block:'nearest'});return true;
 case 'linxia':case 'linxia-space':openWindow();ui.entry='closed';visit(0);return true;
 case 'cache-list':ui.entry='cache';visit(0);return true;
 case 'cache-open':ui.restoringSpace=!state.flags.cache;state.flags.cache=true;openWindow();advance(1);ui.restoringSpace=false;return true;
 case 'space':openWindow();if(state.flags.cache)visit(1);else{ui.entry='closed';visit(0);}return true;
 case 'offline':showModal('QQ 系统消息','<p>对方已离线，无法发送消息。</p><small>这里只保存了旧用户目录，不连接真实账号。</small>');return true;
 case 'drive':case 'folders':case 'archive':openWindow();ui.entry='volume';visit(0);return true;
 case 'drive-blog':if(state.flags.cache)privateArchive();else retroAction('linxia');return true;
 case 'unlock':showModal('离线聊天 · 约定验证',`<p>这不是 QQ 登录，也不是生日密保。</p><label for="answer">约好一起看烟花的日期（六位数字）</label><input id="answer" data-submit="password1" inputmode="numeric" autocomplete="off" placeholder="YYMMDD"><div id="error" role="status"></div>${btn('password1','解锁离线聊天','primary')}`);return true;
 case 'chat':case 'qq-view':if(has('chat')){openWindow();visit(2);}else{openWindow();if(state.flags.cache){visit(1);retroAction('unlock');}else{ui.entry='qq';visit(0);toast('先从林夏头像寻找她的缓存空间。');}}return true;
 case 'blog':case 'private-open':privateArchive();return true;
 case 'private-unlock':if(answer()==='栀子花'){addEvidence('archive');save();render();privateArchive();}else error('口令不匹配。看看她的头像、空间底纹和留言板。');return true;
 case 'forum-entry':case 'forum-front':{
  if(!state.flags.cache){openWindow();ui.entry='closed';visit(0);return true;}
  const fromSpace=state.stage<3;
  openWindow();state.flags.forum=true;ui.forumPost=a==='forum-entry'?1:null;
  ui.forumSnapshot=null;ui.forumBoard=1;ui.bbsSearching=false;ui.forumArriving=fromSpace;advance(3);ui.forumArriving=false;return true;
 }
 case 'forum-home':ui.forumSnapshot=null;ui.forumPost=null;ui.forumBoard=1;ui.bbsSearching=false;render();return true;
 case 'search':{
  if(state.stage!==3)return oldRetroAction(a);
  const keyword=answer();if(!/杏仁|异味|气味|栀子花/.test(keyword)){error('索引里没有这条记录。可查找聊天或居民反复提起的词。');return true;}
  ui.forumSnapshot=null;ui.forumPost=null;ui.bbsSearching=true;state.search=true;state.flags.bbsQuery=keyword.includes('栀子花')?'栀子花':'苦杏仁味';
  save();render();return true;
 }
 case 'favorites':showModal('IE 收藏夹',`<div class="saved-links">${btn('space','半夏的小小世界')}${btn('forum-front','跃进新村论坛')}${state.flags.bookmarked!==undefined?btn('open-bookmark',forumPosts[state.flags.bookmarked]?.[1]||'论坛帖子'):''}</div>`);return true;
 case 'read-bullying':case 'odor-snapshot':
  if(!has('archive')){privateArchive();return true;}
  if(a==='odor-snapshot')addEvidence('odor');
  ui.forumSnapshot=a==='odor-snapshot'?'odor':'rumour';ui.forumPost=a==='odor-snapshot'?2:1;
  openWindow();save();render();return true;
 case 'forum-archive':if(canVisit(4)){advance(4);}else showModal('档案索引',`<p>需要把私人收藏目录与异味快照对应，并读取当年的聊天记录。</p>${btn('private-open','私人备份')}${btn('chat','聊天记录')}`);return true;
 case 'submit-inquiry':{const d=inquirySets[state.stage];if(!d)return true;const ids=state.flags['select'+state.stage]||[];if(ids.some(id=>!wasRead(id)))error('先打开所选原件阅读，不能只凭文件名判断。');else if(ids.length!==d.needed.length||d.needed.some(id=>!ids.includes(id)))error(state.stage===5?'还没有建立相同时间和地点的对应。节目单不能证明排放异常。':'证据不完整或混入了无关材料。需要病历、修改要求及同编号款项三者对应。');else advance(d.next,d.evidence);return true;}
 case 'recycle':if(has('clinic')){openWindow();visit(7);}else showModal('回收站','<p>当前可见的回收站为空。只有恢复更多目录索引后，才能看见被删除的档案。</p>');return true;
 case 'recover-file':restoreDatabase();return true;
 case 'finish-recovery':if(state.stage===7&&has('clinic')&&dialog.querySelector('.restore-progress progress')?.value===5){dialog.innerHTML='';advance(8,'entry');retroAction('read-gate');}return true;
 case 'submit-chain':if(state.stage!==8||!has('entry'))return true;if(chainRoles.some(([,id])=>!wasRead(id)))error('还有原件没有阅读。先点开每份材料。');else if(chainRoles.some(([,id])=>state.flags.chain?.[id]!==id))error('有材料被放到了它不能单独证明的位置。尤其注意：门禁只证明到场，安置承诺只证明利益。');else advance(9,'truth');return true;
 case 'open-message':if(state.stage===10&&has('truth')){state.flags.messageRead=true;save();render();showModal('预录留言 · 文字转录',messageTranscript());ui.returnFocus=screen.querySelector('[data-action="transfer"]');}return true;
 case 'transfer':if(state.stage===10&&has('truth')){if(!state.flags.messageRead&&!state.flags.transfer){error('请先打开林夏的留言，读完后就能查看同事的说明。');return true;}state.flags.transfer=true;save();render();showModal('随盘转交说明',transferLetter());ui.returnFocus=screen.querySelector('[data-action="reread-letter"]');}return true;
 case 'reread-message':if(state.stage===10&&has('truth'))showModal('预录留言 · 文字转录',messageTranscript());return true;
 case 'reread-letter':if(state.stage===10&&state.flags.transfer)showModal('随盘转交说明',transferLetter());return true;
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
