import { Image } from '@nextui-org/image';

interface QuestionBodyProps {
	content: string;
	imageUrls: string[];
	onImageClick: (imageUrl: string) => void;
}

export function QuestionBody({
	content,
	imageUrls,
	onImageClick,
}: QuestionBodyProps) {
	return (
		<div className="">
			<p className="text-sm sm:text-base line-clamp-3">{content}</p>
			{imageUrls && imageUrls.length > 0 && (
				<div className="flex flex-wrap gap-2 mt-2">
					{imageUrls.map((imageUrl: string, index: number) => (
						<div key={index} className="relative">
							<Image
								src={imageUrl}
								alt={`Image ${index + 1}`}
								width={100}
								height={100}
								onClick={() => onImageClick(imageUrl)}
								className="cursor-pointer hover:opacity-80 transition-opacity"
							/>
						</div>
					))}
				</div>
			)}
		</div>
	);
}
