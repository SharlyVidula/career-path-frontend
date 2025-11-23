import React, {useState, useEffect} from "react";
import axios from "axios";

export default function AdminCareers(){
  const [list,setList] = useState([]);
  const [form,setForm] = useState({ title:"", description:"", requiredSkills:[], relatedInterests:[] });
  const [editing,setEditing] = useState(null);

  useEffect(()=>{ load(); },[]);
  async function load(){ const r = await axios.get('/api/admin/careers'); setList(r.data.careers||[]); }

  async function save(){
    const payload = { ...form };
    if(editing){ await axios.put('/api/admin/careers/'+editing._id, payload); setEditing(null); }
    else await axios.post('/api/admin/careers', payload);
    setForm({ title:"", description:"", requiredSkills:[], relatedInterests:[] });
    load();
  }

  return (<div style={{padding:20}}>
    <h2>Admin Careers</h2>
    <div style={{display:"flex",gap:20}}>
      <div style={{flex:1}}>
        {list.map(c=>(
          <div key={c._id} style={{padding:10,border:"1px solid #eee",marginBottom:8}}>
            <strong>{c.title}</strong>
            <div style={{fontSize:13}}>{c.description}</div>
            <div style={{marginTop:6}}>
              <button onClick={()=>{ setEditing(c); setForm({ title:c.title, description:c.description, requiredSkills:c.requiredSkills||[], relatedInterests:c.relatedInterests||[] })}}>Edit</button>
              <button onClick={async ()=>{ if(!confirm("Delete?")) return; await axios.delete('/api/admin/careers/'+c._id); load(); }}>Delete</button>
            </div>
          </div>
        ))}
      </div>
      <div style={{width:420}}>
        <h3>{editing? "Edit":"Add"}</h3>
        <input placeholder="Title" value={form.title} onChange={e=>setForm({...form,title:e.target.value})} style={{width:"100%",marginBottom:8}} />
        <textarea placeholder="Description" value={form.description} onChange={e=>setForm({...form,description:e.target.value})} style={{width:"100%",marginBottom:8}} />
        <input placeholder="skills comma" value={(form.requiredSkills||[]).join(", ")} onChange={e=>setForm({...form, requiredSkills: e.target.value.split(",").map(s=>s.trim()).filter(Boolean)})} style={{width:"100%",marginBottom:8}} />
        <input placeholder="interests comma" value={(form.relatedInterests||[]).join(", ")} onChange={e=>setForm({...form, relatedInterests: e.target.value.split(",").map(s=>s.trim()).filter(Boolean)})} style={{width:"100%",marginBottom:8}} />
        <div style={{display:"flex",gap:8}}><button onClick={save}>{editing? "Save":"Create"}</button><button onClick={()=>{ setEditing(null); setForm({ title:"", description:"", requiredSkills:[], relatedInterests:[] }); }}>Cancel</button></div>
      </div>
    </div>
  </div>);
}
