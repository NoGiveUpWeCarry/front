export const optimizeImage = (file: File): Promise<File> => {
  return new Promise(async (resolve, reject) => {
    try {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = async (event) => {
        const img = new Image();
        img.src = event.target?.result as string;

        await img.decode();

        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (!ctx) return reject('Canvas context를 가져올 수 없음');

        const TARGET_WIDTH = 590;
        const TARGET_HEIGHT = 331.88;

        let originalWidth = img.width;
        let originalHeight = img.height;
        const originalAspectRatio = originalWidth / originalHeight;

        let newHeight = TARGET_HEIGHT;
        let newWidth = originalAspectRatio * newHeight;

        if (newWidth > TARGET_WIDTH) {
          newWidth = TARGET_WIDTH;
          newHeight = newWidth / originalAspectRatio;
        }

        canvas.width = TARGET_WIDTH;
        canvas.height = TARGET_HEIGHT;

        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        const offsetX = (TARGET_WIDTH - newWidth) / 2;
        const offsetY = (TARGET_HEIGHT - newHeight) / 2;
        ctx.drawImage(img, offsetX, offsetY, newWidth, newHeight);

        const blob = await new Promise<Blob | null>((resolveBlob) =>
          canvas.toBlob(resolveBlob, 'image/webp', 0.8)
        );

        if (!blob) return reject('Blob 변환 실패');

        const optimizedFile = new File([blob], 'optimized.webp', {
          type: 'image/webp',
          lastModified: Date.now(),
        });

        resolve(optimizedFile);
      };

      reader.onerror = (error) => reject(error);
    } catch (error) {
      reject(error);
    }
  });
};
