import { getInfo } from '../utils.js';

async function handleUpload(e) {
  e.preventDefault();
  
  const { baseURL } = await getInfo();
  
  const formData = new FormData(e.target);

  try {
    await axios.post(`${baseURL}/upload`, formData, {
      headers: {
        "Content-Type": `multipart/form-data; boundary=${formData._boundary}`,
      }
    });
    window.location.href = `${baseURL}/player`;
  } catch (error) {
    alert('Um erro ocorreu enquanto os arquivos eram enviados!');
  }
}

(() => {
  const form = document.querySelector('#upload__form');
  form.addEventListener('submit', handleUpload);
})();
