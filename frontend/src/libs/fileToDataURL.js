const fileToDataURL = (file) =>
  new Promise((resolve, reject) => {
    const fileReader = new FileReader();

    fileReader.addEventListener('loadend', () => resolve(fileReader.result));
    fileReader.addEventListener('abort', () => reject(new Error('abort')));
    fileReader.addEventListener('error', () => reject(new Error('error')));
    fileReader.readAsDataURL(file);
  });

export default fileToDataURL;
