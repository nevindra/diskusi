import { useCallback, useState } from 'react';

const compressImage = async (file: File): Promise<File> => {
	return new Promise((resolve) => {
		const reader = new FileReader();
		reader.onload = (e) => {
			const img = new Image();
			img.onload = () => {
				const canvas = document.createElement('canvas');
				const ctx = canvas.getContext('2d')!;
				const maxWidth = 800;
				const scaleFactor = maxWidth / img.width;
				canvas.width = maxWidth;
				canvas.height = img.height * scaleFactor;
				ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
				canvas.toBlob(
					(blob) => {
						if (blob) {
							resolve(new File([blob], file.name, { type: 'image/jpeg' }));
						}
					},
					'image/jpeg',
					0.7
				);
			};
			img.src = e.target?.result as string;
		};
		reader.readAsDataURL(file);
	});
};

export const usePastedImages = () => {
	const [pastedImages, setPastedImages] = useState<File[]>([]);

	const handlePaste = useCallback(async (event: React.ClipboardEvent) => {
		const items = event.clipboardData?.items;
		if (items) {
			for (let i = 0; i < items.length; i++) {
				if (items[i].type.indexOf('image') !== -1) {
					const file = items[i].getAsFile();
					if (file) {
                        console.log(file);
						const compressedFile = await compressImage(file);
						setPastedImages((prevImages) => [...prevImages, compressedFile]);
					}
				}
			}
		}
	}, []);

	const removeImage = useCallback((index: number) => {
		setPastedImages((prevImages) => prevImages.filter((_, i) => i !== index));
	}, []);

	return { pastedImages, handlePaste, removeImage };
};
