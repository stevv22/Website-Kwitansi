var $=function(i){return document.getElementById(i)};
var P0=[
 {n:'Espresso Double',c:'Minuman',h:18000,s:45,i:'☕'},
 {n:'Iced Cappuccino',c:'Minuman',h:24000,s:30,i:'🥤'},
 {n:'Matcha Latte',c:'Minuman',h:26000,s:20,i:'🍃'},
 {n:'Roti Bakar Cokelat',c:'Snack',h:15000,s:15,i:'🍞'},
 {n:'Nasi Goreng Special',c:'Makanan',h:32000,s:25,i:'🍚'},
 {n:'French Fries',c:'Snack',h:18000,s:40,i:'🍟'},
 {n:'Croissant Butter',c:'Dessert',h:22000,s:12,i:'🥐'},
 {n:'Ice Cream Vanilla',c:'Dessert',h:15000,s:18,i:'🍦'}
];
var P=load()||P0,q=P.map(function(){return 0}),cat='Semua';
function add(i,d){var v=q[i]+d;if(v<0)return;q[i]=v;draw();render()}
function clearCart(){q=P.map(function(){return 0});draw();render()}
function draw(){
 if(cat!='Semua'&&cats().indexOf(cat)<0)cat='Semua';
 var k=($('cari').value||'').toLowerCase();
 $('cards').innerHTML=P.map(function(p,i){
  if((cat!='Semua'&&p.c!=cat)||p.n.toLowerCase().indexOf(k)<0)return '';
  return '<button class="card" onclick="add('+i+',1)"><div class="ic">'+p.i+'</div><div class="nm">'+p.n+'</div><div class="ft"><span class="pr">Rp '+fmt(p.h)+'</span></div></button>'}).join('');
 var h='';P.forEach(function(p,i){if(q[i])h+='<div class="ci"><div><b>'+p.n+'</b><small>Rp '+fmt(p.h)+'</small></div><div class="qc"><button onclick="add('+i+',-1)" aria-label="Kurangi">-</button><span>'+q[i]+'</span><button onclick="add('+i+',1)" aria-label="Tambah">+</button><button onclick="add('+i+',-'+q[i]+')" aria-label="Hapus">🗑</button></div></div>'});
 $('items').innerHTML=h||'<p class="empty">Keranjang kosong. Klik produk untuk menambahkan.</p>';
}
var ed=-1,armed=-1;
function save(){try{localStorage.setItem('hdi_p',JSON.stringify(P))}catch(e){}}
function load(){try{var v=JSON.parse(localStorage.getItem('hdi_p'));if(v&&v.length){v.forEach(function(p){if(p.i=='🍽️'||p.i=='🍽')p.i='📜'});return v}}catch(e){}return null}
function cats(){var o=[];P.forEach(function(p){if(o.indexOf(p.c)<0)o.push(p.c)});return o}
function go(v){document.body.classList.toggle('v-prod',v=='prod');$('n1').classList.toggle('on',v!='prod');$('n2').classList.toggle('on',v=='prod');$('ttl').textContent=v=='prod'?'Manajemen Produk':'Halaman Kasir';if(v=='prod')drawProd()}
function drawProd(){
 $('ptb').innerHTML=P.map(function(p,i){return '<tr><td><div class="pn"><span class="ic">'+p.i+'</span>'+esc(p.n)+'</div></td><td>Rp '+fmt(p.h)+'</td><td><button class="al" onclick="openMod('+i+')">Edit</button><button class="al d" onclick="del('+i+')">'+(armed==i?'Yakin hapus?':'Hapus')+'</button></td></tr>'}).join('')||'<tr><td colspan="3">Belum ada produk. Klik Tambah Produk Baru.</td></tr>';
}
function del(i){
 if(armed!=i){armed=i;drawProd();setTimeout(function(){if(armed==i){armed=-1;drawProd()}},3000);return}
 P.splice(i,1);q.splice(i,1);armed=-1;save();drawProd();draw();render();
}
function openMod(i){
 ed=i;var p=i<0?{n:'',c:'',h:'',s:'',i:'📜'}:P[i];
 $('mt').textContent=i<0?'Tambah Produk Baru':'Edit Produk';
 $('mn').value=p.n;$('mh').value=p.h;$('mi').value=p.i;$('me').textContent='';
 $('mod').classList.add('on');$('mn').focus();
}
function closeMod(){$('mod').classList.remove('on')}
function saveMod(){
 var n=$('mn').value.trim(),h=parseInt($('mh').value,10);
 if(!n||isNaN(h)||h<0){$('me').textContent='Nama dan harga wajib diisi dengan benar.';return}
 var o={n:n,c:ed<0?'':P[ed].c,h:h,s:0,i:$('mi').value.trim()||'📜'};
 if(ed<0){P.push(o);q.push(0)}else{P[ed]=o}
 save();closeMod();drawProd();draw();render();
}
function tick(){$('clock').textContent=new Date().toLocaleString('id-ID',{weekday:'long',day:'numeric',month:'short',year:'numeric',hour:'2-digit',minute:'2-digit'})+' WIB'}
var satuan=['','satu','dua','tiga','empat','lima','enam','tujuh','delapan','sembilan','sepuluh','sebelas'];
function tb(n){
 if(n<12)return satuan[n];
 if(n<20)return tb(n-10)+' belas';
 if(n<100)return tb(Math.floor(n/10))+' puluh'+(n%10?' '+tb(n%10):'');
 if(n<200)return 'seratus'+(n%100?' '+tb(n%100):'');
 if(n<1000)return tb(Math.floor(n/100))+' ratus'+(n%100?' '+tb(n%100):'');
 if(n<2000)return 'seribu'+(n%1000?' '+tb(n%1000):'');
 if(n<1e6)return tb(Math.floor(n/1000))+' ribu'+(n%1000?' '+tb(n%1000):'');
 if(n<1e9)return tb(Math.floor(n/1e6))+' juta'+(n%1e6?' '+tb(n%1e6):'');
 if(n<1e12)return tb(Math.floor(n/1e9))+' miliar'+(n%1e9?' '+tb(n%1e9):'');
 return tb(Math.floor(n/1e12))+' triliun'+(n%1e12?' '+tb(n%1e12):'');
}
function cap(s){return s.replace(/\b\w/g,function(c){return c.toUpperCase()})}
function fmt(n){return n.toLocaleString('id-ID')}
function render(){
 $('pDari').textContent=$('dari').value;
 $('pKota').textContent=$('kota').value?$('kota').value+',':'';
 var d=$('tgl').value;
 $('pTgl').textContent=d?d.split('-').reverse().join('/'):'';
 $('pTtd').textContent=$('ttd').value;
 $('pCat').textContent=$('cat').value;
 var sub=0,h='',n=0,rc=0;
 function row(no,nm,amt){rc++;return '<tr><td class="n">'+no+'</td><td>'+nm+'</td><td class="j"><div class="m"><span>Rp.</span><span>'+amt+'</span></div></td></tr>'}
 P.forEach(function(p,i){if(!q[i])return;n++;var a=p.h*q[i];sub+=a;h+=row(n,p.n+(q[i]>1?' x '+q[i]:''),fmt(a))});
 var dv=Math.min(parseInt($('disc').value,10)||0,sub);
 var pp=$('ppn').checked?Math.round((sub-dv)*0.11):0;
 var t=sub-dv+pp;
 if(dv)h+=row('','Diskon','-'+fmt(dv));
 if(pp)h+=row('','PPN 11%',fmt(pp));
 while(rc<6)h+=row('','','');
 $('pRows').innerHTML=h;
 $('pTot').textContent=t?fmt(t):'-';
 $('pTerb').textContent=t?cap(tb(t))+' Rupiah':'Nol Rupiah';
 $('sub').textContent='Rp '+fmt(sub);
 $('dv').textContent='- Rp '+fmt(dv);
 $('pv').textContent='Rp '+fmt(pp);
 $('gt').textContent='Rp '+fmt(t);
}
function showReceipt(on){
 var o=$('out');o.classList.toggle('off',!on);
 if(on){render();o.scrollIntoView({behavior:'smooth',block:'start'})}
}
function printNow(){
 render();
 try{window.print()}catch(e){}
}
function esc(s){return s.replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})}
var today=new Date();
$('tgl').value=today.getFullYear()+'-'+String(today.getMonth()+1).padStart(2,'0')+'-'+String(today.getDate()).padStart(2,'0');
document.addEventListener('input',function(e){if(e.target.id=='cari')draw();render()});
document.addEventListener('change',render);
tick();setInterval(tick,30000);
draw();render();
