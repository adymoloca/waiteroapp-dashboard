export async function getBase64Image(file) {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      
      fileReader.readAsDataURL(file);
      fileReader.onloadend = () => {
        resolve(fileReader.result);
      };
  
      fileReader.onerror = (err) => {
        reject(err);
      }
    });
}

export async function getBase64ImagesArray(files) {
    return new Promise((resolve) => {
        const base64files = files.map((file)=>{
            const base64file = getBase64Image(file)
            return base64file
        })
        resolve(base64files)
    })
}

export async function dataURLtoFile(dataurl, filename) {
  return new Promise((resolve)=>{
    const arr = dataurl.split(',')
    const mime = arr[0].match(/:(.*?);/)[1]
    const bstr = atob(arr[1])
    let n = bstr.length
    const u8arr = new Uint8Array(n);   
    while(n--){
        u8arr[n] = bstr.charCodeAt(n);
    }
    resolve(new File([u8arr], filename, {type:mime}))
  })
}