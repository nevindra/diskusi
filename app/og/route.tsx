import { ImageResponse } from '@vercel/og';

export const runtime = 'edge';

export async function GET(req: Request) {
	try {
		const { searchParams } = new URL(req.url);
		const question = (searchParams.get('question') || 'Default Question').slice(
			0,
			100
		);

		const image = new ImageResponse(
			<div
				style={{
					width: '1200px',
					height: '630px',
					backgroundColor: '#6246ea',
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'center',
					alignItems: 'center',
					fontFamily: 'Arial, sans-serif',
					color: 'white',
					position: 'relative',
					padding: '40px',
				}}
			>
				<div style={{ fontSize: '64px', marginBottom: '30px' }}>⚡</div>
				<h1
					style={{
						fontSize: '44px',
						fontWeight: 'bold',
						marginBottom: '30px',
						padding: '15px 30px',
						backgroundColor: 'rgba(0,0,0,0.5)',
						borderRadius: '15px',
					}}
				>
					Pertanyaan
				</h1>
				<p
					style={{
						fontSize: '58px',
						textAlign: 'center',
						maxWidth: '90%',
						lineHeight: '1.3',
					}}
				>
					{question}
				</p>
				<div
					style={{
						position: 'absolute',
						bottom: '30px',
						right: '30px',
						fontSize: '32px',
						fontWeight: 'bold',
					}}
				>
					Komunal
				</div>
			</div>,
			{
				width: 1200,
				height: 630,
			}
		);
		return image;
	} catch (error) {
		console.error('Error generating OG image:', error);
		if (error instanceof Error) {
			return new Response(`Error: ${error.message}`, { status: 500 });
		}
		return new Response('Unknown error generating image', { status: 500 });
	}
}
