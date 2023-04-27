const imageUpload = async (file) => {   ///   cloudinary image upload
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "hmzl4ytu");
    formData.append("cloud_name", "djpee6nuc");
    const data = await fetch(
      "https://api.cloudinary.com/v1_1/djpee6nuc/image/upload",
      {
        method: "POST",
        body: formData,
      }
    );
    let result = await data.json();
    return result.url;
  };

  export default imageUpload