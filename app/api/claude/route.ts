import Anthropic from '@anthropic-ai/sdk'

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
})

export async function POST(request: Request) {
  try {
    const { message } = await request.json()

    const response = await anthropic.messages.create({
      model: "claude-3-sonnet-20240229",
      max_tokens: 1000,
      messages: [{ role: "user", content: message }]
    })

    const textContent = response.content.find(block => block.type === 'text')
    return Response.json({
      response: textContent?.type === 'text' ? textContent.text : '',
      success: true
    })
  } catch (error) {
    console.error('Claude API error:', error)
    return Response.json({
      error: 'Failed to call Claude API',
      success: false
    }, { status: 500 })
  }
}