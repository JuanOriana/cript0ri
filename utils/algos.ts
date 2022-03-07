import { ShiftDecodeEvaluation } from "../components/types";

const START_MIN = "a".charCodeAt(0);
const START_MAY = "A".charCodeAt(0);
const END_MIN = "z".charCodeAt(0);
const END_MAY = "Z".charCodeAt(0);
const LETTER_COUNT = 26;
const TOLERANCE = 0.6;
const SHIFTER_DECODE_WORD_COUNT = 3;
const DICT_API_ROUTE = "https://api.dictionaryapi.dev/api/v2/entries/en/";

export function shifter_encode(baseText: string, shiftAmount: number): string {
  let result = "";
  let letterToShift = "";
  let charcode = 0;

  for (let i = 0; i < baseText.length; i++) {
    letterToShift = baseText[i];
    charcode = letterToShift.charCodeAt(0);
    if (charcode >= START_MIN && charcode <= END_MIN) {
      charcode += shiftAmount;
      if (charcode > END_MIN) charcode -= LETTER_COUNT;
    } else if (charcode >= START_MAY && charcode <= END_MAY) {
      charcode += shiftAmount;
      if (charcode > END_MAY) charcode -= LETTER_COUNT;
    }
    result += String.fromCharCode(charcode);
  }
  return result;
}

export function shifter_decode(baseText: string, shiftAmount: number): string {
  let result = "";
  let letterToShift = "";
  let charcode = 0;
  for (let i = 0; i < baseText.length; i++) {
    letterToShift = baseText[i];
    charcode = letterToShift.charCodeAt(0);
    if (charcode >= START_MIN && charcode <= END_MIN) {
      charcode -= shiftAmount;
      if (charcode < START_MIN) charcode += LETTER_COUNT;
    } else if (charcode >= START_MAY && charcode <= END_MAY) {
      charcode -= shiftAmount;
      if (charcode < START_MAY) charcode += LETTER_COUNT;
    }
    result += String.fromCharCode(charcode);
  }
  return result;
}

export async function shifter_decode_auto(
  baseText: string
): Promise<ShiftDecodeEvaluation> {
  let decodedText = "";
  let decodedTextWords = [];
  let validWordCount = 0;
  for (let shift = 0; shift < 26; shift++) {
    decodedText = shifter_decode(baseText, shift);
    decodedTextWords = decodedText.split(/[^A-Za-z]/);
    decodedTextWords = decodedTextWords.sort(
      (wordA, wordB) => wordB.length - wordA.length
    );
    decodedTextWords = decodedTextWords.slice(0, SHIFTER_DECODE_WORD_COUNT);
    for (const word of decodedTextWords) {
      const result = await fetch(DICT_API_ROUTE + word);
      if (result.status === 200) {
        validWordCount++;
      }
    }

    if (validWordCount / decodedTextWords.length >= TOLERANCE) {
      return {
        isDecodable: true,
        decodedText: decodedText,
        shiftsNeeded: shift,
      };
    }
  }

  return { isDecodable: false };
}
