import { NextResponse, connection } from "next/server"

interface JokeResponse {
  id?: number | string
  type: "single" | "twopart"
  joke?: string
  setup?: string
  delivery?: string
  isFallback?: boolean
}

// Fallback jokes in case public network is offline
const FALLBACK_JOKES: JokeResponse[] = [
  {
    id: "f1",
    type: "twopart",
    setup: "Why do programmers prefer dark mode?",
    delivery: "Because light attracts bugs.",
    isFallback: true,
  },
  {
    id: "f2",
    type: "single",
    joke: "A SQL query walks into a bar, walks up to two tables and asks: 'Can I join you?'",
    isFallback: true,
  },
  {
    id: "f3",
    type: "twopart",
    setup: "How many programmers does it take to change a light bulb?",
    delivery: "None. It's a hardware problem.",
    isFallback: true,
  },
  {
    id: "f4",
    type: "single",
    joke: "There are 10 types of people in the world: those who understand binary, and those who don't.",
    isFallback: true,
  },
  {
    id: "f5",
    type: "twopart",
    setup: "Why did the JavaScript developer wear glasses?",
    delivery: "Because they didn't C#.",
    isFallback: true,
  },
]

export async function GET(request: Request) {
  await connection()
  try {
    const res = await fetch(
      "https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist,explicit&safe-mode",
      {
        headers: {
          Accept: "application/json",
          "User-Agent": "Portfolio-HarshaJagadish",
        },
        signal: AbortSignal.timeout(4000), // Clean modern 4s abort signal
        cache: "no-store", // Always fresh when requested
      }
    )

    if (!res.ok) {
      throw new Error(`Joke API status ${res.status}`)
    }

    const data = await res.json()

    if (data.error) {
      throw new Error(data.message || "JokeAPI returned an error flag")
    }

    if (data.type === "twopart") {
      return NextResponse.json({
        id: data.id,
        type: "twopart",
        setup: data.setup,
        delivery: data.delivery,
        isFallback: false,
      })
    } else {
      return NextResponse.json({
        id: data.id,
        type: "single",
        joke: data.joke,
        isFallback: false,
      })
    }
  } catch (error) {
    console.warn("Dev joke external API error, using safe fallback:", error)
    // Select a random fallback joke
    const randomFallback = FALLBACK_JOKES[Math.floor(Math.random() * FALLBACK_JOKES.length)]
    return NextResponse.json(randomFallback)
  }
}
