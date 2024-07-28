import { ImageResponse } from '@vercel/og'

export const runtime = 'edge'

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const question = searchParams.get('question') || 'Default Question'

    return new ImageResponse(
      (
        <div
          style={{
            backgroundColor: 'white',
            height: '100%',
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '40px',
          }}
        >
          <div
            style={{
              fontSize: 48,
              fontStyle: 'normal',
              color: 'black',
              maxWidth: '100%',
              textAlign: 'center',
              wordWrap: 'break-word',
            }}
          >
            {question}
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    )
  } catch (error) {
    console.error('Error generating OG image:', error)
    return new Response('Error generating image', { status: 500 })
  }
}