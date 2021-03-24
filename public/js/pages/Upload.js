import { getInfo } from '../utils.js';

(async () => {
  const { baseURL } = await getInfo();

  const form = document.querySelector('#upload__form');
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = new FormData(form);

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
  });
})();
