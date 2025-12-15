// Foro simple usando localStorage
import { traducciones } from './Traducciones.mjs';

const CLAVE_FORO = 'foro_posts';

function obtenerUsuario() {
    const u = localStorage.getItem('usuario_logueado');
    if (!u) return null;
    try { return JSON.parse(u); } catch (e) { return null; }
}

function cargarPosts(){
    let raw = localStorage.getItem(CLAVE_FORO);
    if (!raw) return [];
    try{ return JSON.parse(raw);} catch(e){ return []; }
}

function guardarPosts(posts){
    localStorage.setItem(CLAVE_FORO, JSON.stringify(posts));
}

function crearId(){
    return Date.now().toString(36) + Math.random().toString(36).slice(2,8);
}

function renderPosts(){
    const cont = document.getElementById('contenedor_posts');
    if(!cont) return;
    const posts = cargarPosts();
    cont.innerHTML = '';

    // Mostrar más recientes primero
    for(let i = posts.length - 1; i >= 0; i--){
        const p = posts[i];
        const postEl = document.createElement('div');
        postEl.className = 'resena-tarjeta foro-post';
        postEl.dataset.id = p.id;

        const autor = p.autor || 'Usuario';
        const fecha = p.fecha || '';

        const idioma = localStorage.getItem('idioma_seleccionado') || 'ES';
        const t = traducciones[idioma] || traducciones['ES'];

        postEl.innerHTML = `
            <div style="display:flex; justify-content:space-between; align-items:center;">
                <div><strong>${autor}</strong> <span class="resena-meta">${fecha}</span></div>
                <div>
                    <button class="boton btn-like" data-id="${p.id}">❤ <span class="like-count">${p.liked_by? p.liked_by.length:0}</span></button>
                    <button class="boton btn-reply" data-id="${p.id}">${t.reply_btn}</button>
                </div>
            </div>
            <p style="margin-top:8px; white-space:pre-wrap;">${escapeHtml(p.texto)}</p>
            <div class="foro-replies" data-id="${p.id}"></div>
            <div class="reply-form-container" data-id="${p.id}" style="display:none; margin-top:8px;">
                <textarea rows="3" class="reply-text" style="width:100%; padding:6px;" placeholder="${t.foro_placeholder}"></textarea>
                <div style="margin-top:6px;"><button class="boton btn-send-reply" data-id="${p.id}">${t.send_reply_btn}</button></div>
            </div>
        `;

        cont.appendChild(postEl);

        // render replies
        const repliesContainer = postEl.querySelector('.foro-replies');
        if(p.replies && p.replies.length){
            for(const r of p.replies){
                const rEl = document.createElement('div');
                rEl.className = 'resena-tarjeta foro-reply';
                rEl.style.marginTop = '8px';
                rEl.innerHTML = `<strong>${r.autor}</strong> <span class="resena-meta">${r.fecha}</span><p style="margin:6px 0 0 0; white-space:pre-wrap;">${escapeHtml(r.texto)}</p>`;
                repliesContainer.appendChild(rEl);
            }
        }
    }

    // asignar eventos a botones creados
    document.querySelectorAll('.btn-like').forEach(b=> b.onclick = (e)=>{toggleLike(e.currentTarget.dataset.id)});
    document.querySelectorAll('.btn-reply').forEach(b=> b.onclick = (e)=>{toggleReplyForm(e.currentTarget.dataset.id)});
    document.querySelectorAll('.btn-send-reply').forEach(b=> b.onclick = (e)=>{sendReply(e.currentTarget.dataset.id)});
}

function toggleReplyForm(id){
    const el = document.querySelector(`.reply-form-container[data-id='${id}']`);
    if(!el) return;
    el.style.display = (el.style.display === 'none')? 'block':'none';
}

function sendReply(id){
    const usuario = obtenerUsuario();
    if(!usuario){
        const idioma = localStorage.getItem('idioma_seleccionado') || 'ES';
        const t = traducciones[idioma] || traducciones['ES'];
        alert(t.alert_must_login_reply);
        window.location.href = 'Parte A.html';
        return;
    }
    const textarea = document.querySelector(`.reply-form-container[data-id='${id}'] .reply-text`);
    if(!textarea) return;
    const texto = textarea.value.trim();
    if(texto.length < 2){ const idioma = localStorage.getItem('idioma_seleccionado') || 'ES'; const t = traducciones[idioma] || traducciones['ES']; alert(t.alert_invalid_reply); return; }

    const posts = cargarPosts();
    const idx = posts.findIndex(p => p.id === id);
    if(idx === -1) return;
    const autor = usuario.nombre || usuario.login || 'Usuario';
    const locale = (localStorage.getItem('idioma_seleccionado') === 'EN')? 'en-GB':'es-ES';
    const reply = {id: crearId(), autor, texto, fecha: new Date().toLocaleString(locale)};
    posts[idx].replies = posts[idx].replies || [];
    posts[idx].replies.push(reply);
    guardarPosts(posts);
    textarea.value = '';
    renderPosts();
}

function toggleLike(id){
    const usuario = obtenerUsuario();
    if(!usuario){
        const idioma = localStorage.getItem('idioma_seleccionado') || 'ES';
        const t = traducciones[idioma] || traducciones['ES'];
        alert(t.alert_must_login_reply);
        window.location.href = 'Parte A.html';
        return;
    }
    const login = usuario.login || usuario.nombre || 'anon';
    const posts = cargarPosts();
    const idx = posts.findIndex(p => p.id === id);
    if(idx === -1) return;
    posts[idx].liked_by = posts[idx].liked_by || [];
    const pos = posts[idx].liked_by.indexOf(login);
    if(pos === -1){ posts[idx].liked_by.push(login); }
    else { posts[idx].liked_by.splice(pos,1); }
    guardarPosts(posts);
    renderPosts();
}

function publicar(){
    const usuario = obtenerUsuario();
    if(!usuario){
        const idioma = localStorage.getItem('idioma_seleccionado') || 'ES';
        const t = traducciones[idioma] || traducciones['ES'];
        alert(t.alert_must_login_post);
        window.location.href = 'Parte A.html';
        return;
    }
    const texto = document.getElementById('texto_comentario').value.trim();
    if(texto.length < 3){ const idioma = localStorage.getItem('idioma_seleccionado') || 'ES'; const t = traducciones[idioma] || traducciones['ES']; alert(t.alert_short_comment); return; }

    const posts = cargarPosts();
    const autor = usuario.nombre || usuario.login || 'Usuario';
    const locale = (localStorage.getItem('idioma_seleccionado') === 'EN')? 'en-GB':'es-ES';
    const nuevo = { id: crearId(), autor, texto, fecha: new Date().toLocaleString(locale), liked_by: [], replies: [] };
    posts.push(nuevo);
    guardarPosts(posts);
    document.getElementById('texto_comentario').value = '';
    renderPosts();
}

function escapeHtml(unsafe){
    if(!unsafe) return '';
    return unsafe.replace(/[&<>\"]+/g, function(match){
        switch(match){
            case '&': return '&amp;';
            case '<': return '&lt;';
            case '>': return '&gt;';
            case '"': return '&quot;';
            default: return match;
        }
    });
}

document.addEventListener('DOMContentLoaded', ()=>{
    const publicarBtn = document.getElementById('publicar_btn');
    const limpiarBtn = document.getElementById('limpiar_btn');
    const infoLogin = document.getElementById('info_login');
    const usuario = obtenerUsuario();
    const idioma = localStorage.getItem('idioma_seleccionado') || 'ES';
    const t = traducciones[idioma] || traducciones['ES'];

    if(usuario){
        infoLogin.textContent = `${t.info_login_connected}${usuario.nombre || usuario.login}`;
    } else {
        infoLogin.innerHTML = t.info_login_not_logged;
    }

    // Ajustar textos locales (placeholder y botones) según idioma
    const textarea = document.getElementById('texto_comentario');
    if(textarea) textarea.placeholder = t.foro_placeholder;
    if(publicarBtn) publicarBtn.textContent = t.publicar_btn;
    if(limpiarBtn) limpiarBtn.textContent = t.limpiar_btn;

    if(publicarBtn) publicarBtn.onclick = publicar;
    if(limpiarBtn) limpiarBtn.onclick = ()=>{ document.getElementById('texto_comentario').value = ''; };

    renderPosts();
});

export{};
