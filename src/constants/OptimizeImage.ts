export const optimizeImage = (file: File): Promise<File> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;

      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (!ctx) return reject('Canvas context를 가져올 수 없음');

        const MAX_WIDTH = 760;
        let width = img.width;
        let height = img.height;

        if (width > MAX_WIDTH) {
          height *= MAX_WIDTH / width;
          width = MAX_WIDTH;
        }

        canvas.width = width;
        canvas.height = height;
        ctx.drawImage(img, 0, 0, width, height);

        canvas.toBlob(
          (blob) => {
            if (!blob) return reject('Blob 변환 실패');

            const optimizedFile = new File([blob], 'optimized.webp', {
              type: 'image/webp',
              lastModified: Date.now(),
            });

            resolve(optimizedFile);
          },
          'image/webp',
          0.8
        );
      };
    };

    reader.onerror = (error) => reject(error);
  });
};
