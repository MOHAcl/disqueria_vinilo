const { createApp, ref, onMounted } = Vue;
createApp({
 setup() {
 const titulo = ref('🎵Disquería de Vinilo');
 const discos = ref([]);
 const categoriaActiva = ref('todos');
 // AJAX: carga el catálogo desde el JSON
 async function cargarDiscos() {
 const respuesta = await fetch('data/discos.json');
 const datos = await respuesta.json();
 discos.value = datos;
 }
 onMounted(() => {
 cargarDiscos(); // Se ejecuta cuando Vue termina de montar
 });
 return { titulo, discos, categoriaActiva, cargarDiscos };
 }
}).mount('#app');