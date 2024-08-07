'use server'

export async function uploadImages(data: FormData) {
	console.log('Starting image upload process');
	console.log('Form data:', data);

	// const id = nanoid();
	// const uploadPromises = images.map(async (file, index) => {
	// 	const fileName = `${id}_${index}.jpg`;
	// 	console.log(`Uploading file: ${fileName}`);

	// 	try {
	// 		const { data, error } = await supabase.storage
	// 			.from('images')
	// 			.upload(fileName, file);

	// 		if (error) {
	// 			console.error('Error uploading image:', error);
	// 			return null;
	// 		}

	// 		console.log('File uploaded successfully:', fileName);

	// 		const { data: urlData } = supabase.storage
	// 			.from('images')
	// 			.getPublicUrl(fileName);

	// 		console.log('Public URL:', urlData.publicUrl);

	// 		return urlData.publicUrl;
	// 	} catch (error) {
	// 		console.error('Unexpected error during file upload:', error);
	// 		return null;
	// 	}
	// });

	// const urls = await Promise.all(uploadPromises);
	// const filteredUrls = urls.filter((url): url is string => url !== null);

	// console.log('Final uploaded URLs:', filteredUrls);

	// return filteredUrls;
}
