const { createApp, ref, computed, onMounted } = Vue;
createApp({
 setup() {
 // ── Estado reactivo ────────────────────────────────────
 const titulo = ref('🎵Disquería de Vinilo');
 const discos = ref([]);
 const cargando = ref(false);
 const error = ref(null);
 const categoria = ref('todos');
 const busqueda = ref('');
 // ── AJAX: carga el JSON ─────────────────────────────────
 async function cargarDiscos() {
 try {
 cargando.value = true;
 error.value = null;
 const res = await fetch('data/discos.json');
 if (!res.ok) throw new Error(`HTTP ${res.status}`);
 discos.value = await res.json();
 } catch (e) {
 error.value = 'No se pudo cargar el catálogo.';
 console.error(e);
 } finally {
 cargando.value = false;
 }
 }
 // ── Propiedad computada: filtro por género + búsqueda ───
 const discosFiltrados = computed(() => {
 return discos.value.filter(d => {
 const porCategoria = categoria.value === 'todos'
 || d.genero === categoria.value;
 const termino = busqueda.value.toLowerCase();
 const porBusqueda = d.album.toLowerCase().includes(termino)
 || d.artista.toLowerCase().includes(termino);
 return porCategoria && porBusqueda;
 });
 });
  // ── Ciclo de vida ───────────────────────────────────────
 onMounted(() => cargarDiscos());
 return { titulo, discos, cargando, error,
 categoria, busqueda, discosFiltrados, cargarDiscos };
 }
}).mount('#app');
