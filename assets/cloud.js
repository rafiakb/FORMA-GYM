/* FORMA Cloud adapter: Supabase Auth + row-level protected SQL storage.
   Public publishable/anon key only. Never put a service_role key in browser code. */
(()=>{'use strict';
let client=null,catalog=null,loginUser=null;
function fail(error){if(error)throw new Error(error.message||String(error));}
function config(){const c=window.FORMA_CONFIG||{};
  if(!/^https:\/\/[a-z0-9-]+\.supabase\.co\/?$/i.test(String(c.supabaseUrl||''))||
      !c.supabaseAnonKey||c.supabaseAnonKey.includes('PASTE_'))
      throw new Error('Supabase belum dikonfigurasi. Buka SETUP.html dan isi assets/config.js sebelum upload ke Vercel.');
  if(!window.supabase?.createClient)throw new Error('Library Supabase tidak termuat. Pastikan koneksi internet dan muat ulang halaman.');
  if(!client)client=window.supabase.createClient(c.supabaseUrl.replace(/\/$/,''),c.supabaseAnonKey,{
    auth:{persistSession:true,autoRefreshToken:true,detectSessionInUrl:true}
  });
  return client;
}
async function getCatalog(){if(!catalog){const r=await fetch('assets/catalog.json');if(!r.ok)throw Error('Katalog gerakan tidak ditemukan.');catalog=await r.json();}return catalog;}
async function current(){const {data,error}=await config().auth.getUser();if(error&&error.name!=='AuthSessionMissingError')fail(error);loginUser=data?.user||null;return loginUser;}
function assertUser(){if(!loginUser)throw Error('Silakan masuk kembali ke akunmu.');return loginUser.id;}
const stringify=(x)=>JSON.stringify(x??null);
async function readRow(){const uid=assertUser();const b=config();
  let q=await b.from('forma_user_data').select('*').eq('user_id',uid).maybeSingle();fail(q.error);
  if(!q.data){const n=String(loginUser.user_metadata?.name||loginUser.email?.split('@')[0]||'Atlet').trim().slice(0,100);
    const ins=await b.from('forma_user_data').insert({user_id:uid,name:n}).select('*').single();
    if(ins.error){ // Safe retry for two browser tabs creating same row concurrently.
      const again=await b.from('forma_user_data').select('*').eq('user_id',uid).maybeSingle();fail(again.error);
      if(!again.data)fail(ins.error);q=again;
    }else q=ins;
  }
  return q.data;
}
async function updateRow(fields){const uid=assertUser();const q=await config().from('forma_user_data').update(fields).eq('user_id',uid).select('user_id').single();fail(q.error);return q.data;}
function validDate(x){return /^\d{4}-\d{2}-\d{2}$/.test(String(x||''))&&!isNaN(Date.parse(String(x)+'T12:00:00'));}
function mapProgram(p,byid){return {...p,items:(p.items||[]).map((v,i)=>({...v,position:i+1,program_id:p.id,...((e)=>e?{name:e.name,muscle:e.muscle,motion:e.motion}:{name:'Gerakan',muscle:'',motion:'squat'})(byid.get(Number(v.exercise_id)))}))};}
function isoDay(d){return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;}
function sameWeek(t){const now=new Date(),dt=new Date(t);const x=new Date(now.getFullYear(),now.getMonth(),now.getDate());x.setDate(x.getDate()-(x.getDay()+6)%7);return dt>=x&&dt<=now;}
function makeSummary(history){const daily=new Map();let volume=0,sets=0,minutes=0;
  for(const row of history){minutes+=Number(row.duration_minutes)||0;volume+=Number(row.volume)||0;sets+=Number(row.total_sets)||0;
    const date=isoDay(new Date(row.finished_at));const d=daily.get(date)||{day:date,count:0,minutes:0};d.count++;d.minutes+=Number(row.duration_minutes)||0;daily.set(date,d);
  }
  const min=new Date();min.setDate(min.getDate()-55);min.setHours(0,0,0,0);
  return {sessions:history.length,minutes,volume,sets,week:history.filter(x=>sameWeek(x.finished_at)).length,
    daily:[...daily.values()].filter(x=>new Date(x.day+'T12:00:00')>=min).sort((a,b)=>a.day.localeCompare(b.day))};
}
async function snapshot(){const [cat,row]=await Promise.all([getCatalog(),readRow()]);
  const byid=new Map(cat.exercises.map(e=>[Number(e.id),e]));
  const presets=cat.programs.map(p=>mapProgram(p,byid));
  const customs=(Array.isArray(row.custom_programs)?row.custom_programs:[]).map(p=>mapProgram(p,byid));
  const history=(Array.isArray(row.history)?row.history:[]).map(x=>({
    ...x,total_sets:(x.sets||[]).length,volume:(x.sets||[]).reduce((a,s)=>a+Number(s.reps||0)*Number(s.weight_kg||0),0)
  })).sort((a,b)=>Date.parse(b.finished_at)-Date.parse(a.finished_at));
  return {ok:true,user:{id:loginUser.id,name:row.name,email:loginUser.email,goal:row.goal,
      height_cm:row.height_cm,target_per_week:row.target_per_week,created_at:row.created_at},
    csrf:'',exercises:cat.exercises,programs:[...customs,...presets],
    schedule:Array.isArray(row.schedule)?row.schedule:[],history:history.slice(0,100),
    metrics:(Array.isArray(row.metrics)?row.metrics:[]).slice().sort((a,b)=>a.measured_on.localeCompare(b.measured_on)),
    summary:makeSummary(history)};
}
async function mutate(action,data){const row=await readRow(),uid=assertUser();
  if(action==='profile'){
    const name=String(data.name||'').trim(),goal=String(data.goal||'');
    const height=data.height_cm===''?null:Number(data.height_cm),target=Number(data.target_per_week);
    if(name.length<2||name.length>100||!['Membangun otot','Menurunkan berat','Menjaga kebugaran','Meningkatkan kekuatan'].includes(goal)||
       (height!==null&&(!Number.isFinite(height)||height<100||height>250))||!Number.isInteger(target)||target<1||target>7)throw Error('Data profil tidak valid.');
    await updateRow({name,goal,height_cm:height,target_per_week:target});
  }else if(action==='metric'){
    const date=data.measured_on||isoDay(new Date()),w=Number(data.weight_kg),waist=data.waist_cm===''?null:Number(data.waist_cm);
    if(!validDate(date)||date>isoDay(new Date())||!Number.isFinite(w)||w<20||w>400||
       (waist!==null&&(!Number.isFinite(waist)||waist<30||waist>250)))throw Error('Pengukuran tidak valid.');
    const arr=(Array.isArray(row.metrics)?row.metrics:[]).filter(x=>x.measured_on!==date);
    arr.push({measured_on:date,weight_kg:w,waist_cm:waist});arr.sort((a,b)=>a.measured_on.localeCompare(b.measured_on));
    await updateRow({metrics:arr});
  }else if(action==='schedule'){
    const day=Number(data.weekday),pid=data.program_id==null?null:Number(data.program_id);
    const cat=await getCatalog();const allowed=[...cat.programs,...(row.custom_programs||[])].some(p=>Number(p.id)===pid);
    if(!Number.isInteger(day)||day<0||day>6||(pid!=null&&!allowed))throw Error('Jadwal/program tidak ditemukan.');
    const arr=(Array.isArray(row.schedule)?row.schedule:[]).filter(x=>Number(x.weekday)!==day);
    arr.push({weekday:day,program_id:pid});await updateRow({schedule:arr});
  }else if(action==='new_program'){
    const name=String(data.name||'').trim(),description=String(data.description||'').trim(),items=data.items||[];
    const cat=await getCatalog(),allowed=new Set(cat.exercises.map(x=>Number(x.id)));
    if(name.length<3||name.length>120||description.length>255||!Array.isArray(items)||items.length<1||items.length>14||
      items.some(x=>!allowed.has(Number(x.exercise_id))||!Number.isInteger(Number(x.sets))||Number(x.sets)<1||Number(x.sets)>8||String(x.reps||'').length>30))
      throw Error('Program harus mempunyai 1–14 gerakan dan jumlah set valid.');
    const arr=Array.isArray(row.custom_programs)?row.custom_programs:[];
    const id=Date.now()*1000+Math.floor(Math.random()*1000); // numeric ID compatible with original app
    const p={id,user_id:uid,name,description:description||'Program buatanmu',category:'Program Saya',duration_label:'Kustom',hue:7,
      items:items.map((x,i)=>({exercise_id:Number(x.exercise_id),sets:Number(x.sets),reps:String(x.reps||'12'),rest_seconds:Math.min(300,Math.max(15,Number(x.rest_seconds)||60)),position:i+1}))};
    await updateRow({custom_programs:[...arr,p]});
  }else if(action==='delete_program'){
    const id=Number(data.program_id);const arr=Array.isArray(row.custom_programs)?row.custom_programs:[];
    if(!arr.some(x=>Number(x.id)===id))throw Error('Program hanya dapat dihapus oleh pemiliknya.');
    await updateRow({custom_programs:arr.filter(x=>Number(x.id)!==id),schedule:(row.schedule||[]).map(s=>Number(s.program_id)===id?{...s,program_id:null}:s)});
  }else if(action==='workout'){
    const cat=await getCatalog(),programs=[...cat.programs,...(row.custom_programs||[])],pid=data.program_id==null?null:Number(data.program_id);
    const pg=programs.find(x=>Number(x.id)===pid);
    const duration=Number(data.duration_minutes),sets=data.sets||[],note=String(data.note||'');
    const known=new Set(cat.exercises.map(x=>Number(x.id)));
    if((pid!=null&&!pg)||!Number.isInteger(duration)||duration<1||duration>600||
      !Array.isArray(sets)||sets.length<1||sets.length>150||note.length>300||sets.some(x=>
        !known.has(Number(x.exercise_id))||Number(x.set_number)<1||Number(x.set_number)>30||!Number.isInteger(Number(x.reps))||
        Number(x.reps)<1||Number(x.reps)>1000||!Number.isFinite(Number(x.weight_kg))||Number(x.weight_kg)<0||Number(x.weight_kg)>700))
      throw Error('Periksa set, durasi, dan beban sebelum menyimpan sesi.');
    const history=Array.isArray(row.history)?row.history:[];
    history.push({id:crypto.randomUUID(),program_id:pid,program_name:pg?.name||'Latihan bebas',finished_at:new Date().toISOString(),
      duration_minutes:duration,note,sets:sets.map(x=>({exercise_id:Number(x.exercise_id),set_number:Number(x.set_number),reps:Number(x.reps),weight_kg:Number(x.weight_kg)}))});
    await updateRow({history});
  }else throw Error('Aksi tidak ditemukan.');
  return snapshot();
}
async function request(action,data){const b=config();await getCatalog();
  if(action==='bootstrap'){await current();if(!loginUser)return {ok:true,user:null};return snapshot();}
  if(action==='register'){
    const name=String(data.name||'').trim(),email=String(data.email||'').trim(),password=String(data.password||'');
    if(name.length<2||name.length>100||!email.includes('@')||password.length<8)throw Error('Isi nama, email, dan password minimal 8 karakter.');
    const r=await b.auth.signUp({email,password,options:{data:{name},emailRedirectTo:location.origin+location.pathname}});fail(r.error);
    if(!r.data.session)return {ok:true,user:null,needsVerification:true};
    loginUser=r.data.user;return snapshot();
  }
  if(action==='login'){
    const r=await b.auth.signInWithPassword({email:String(data.email||'').trim(),password:String(data.password||'')});fail(r.error);
    loginUser=r.data.user;return snapshot();
  }
  if(action==='logout'){const r=await b.auth.signOut();fail(r.error);loginUser=null;return {ok:true,user:null};}
  if(!loginUser)await current();assertUser();return mutate(action,data||{});
}
function exportCSV(history){const rows=[['Tanggal','Program','Durasi (menit)','Jumlah Set','Volume (kg)','Catatan'],
  ...history.map(x=>[x.finished_at,x.program_name,x.duration_minutes,x.total_sets,x.volume,x.note||''])];
  const val=x=>'"'+String(x??'').replace(/"/g,'""')+'"';
  const csv='\ufeff'+rows.map(r=>r.map(val).join(',')).join('\r\n');
  const blob=new Blob([csv],{type:'text/csv;charset=utf-8'}),url=URL.createObjectURL(blob),a=document.createElement('a');
  a.href=url;a.download='forma-progres-latihan.csv';document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),3000);
}
async function resetPassword(email){const r=await config().auth.resetPasswordForEmail(String(email).trim(),{redirectTo:location.origin+'/reset-password.html'});fail(r.error);}
window.FormaCloud={request,exportCSV,resetPassword};
})();
