type Emotion = 'angry' | 'disgust' | 'fear' | 'happy' | 'sad' | 'surprise' | 'neutral';

interface Feature {
  keys: number[];       // Face keys
  male?: boolean;       // Gender
  age?: number;         // Age
  emotion?: Emotion;    // Emotion
  live?: number;        // Living probability
}

export default function getFaceFeature(picture?: Buffer): Feature[];
