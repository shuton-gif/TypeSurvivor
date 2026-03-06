import { GameState } from "./game";

type InputProps = {
    state: GameState
}

type LanguageComponents = {
  // Core grammatical roles
  Topic?: string;        // は — the discourse frame ("as for X...")
  Subject?: string;      // が — the grammatical subject
  Object: string;       // を — direct object (optional, pro-drop)
  IndirectObject?: string; // に — recipient/target ("to X")

  // Modifiers (all head-final, come BEFORE what they modify)
  Adjective?: string;    // modifies noun　大きい犬
  Adverb?: string;       // modifies verb　早く走る

  // Verb components (agglutinative stack)
  Verb: string;          // stem — the only required field
  Causative?: boolean;   // させ
  Passive?: boolean;     // られ
  Negative?: boolean;    // ない
  Tense?: "past" | "present" | "future";
  Politeness?: "plain" | "polite"; // plain vs ます/です form
}

async function handleInput(input: string) {
    try {
        const response = await fetch('/api/claude', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: input })
        })
        
        const data = await response.json()
        
        if (data.success) {
            return data.response
        } else {
            console.error('Claude API error:', data.error)
            return null
        }
    } catch (error) {
        console.error('Failed to call Claude API:', error)
        return null
    }
}

export { handleInput }

function checkSubject(input:string) {
    
}