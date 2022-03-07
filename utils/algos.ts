import { ShiftDecodeEvaluation } from "../components/types";
const checkWord = require("check-if-word"),
  checker = checkWord("en");

const START_MIN = "a".charCodeAt(0);
const START_MAY = "A".charCodeAt(0);
const END_MIN = "z".charCodeAt(0);
const END_MAY = "Z".charCodeAt(0);
const LETTER_COUNT = 26;
const TOLERANCE = 0.75;

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
  for (let shift = 0; shift < 26; shift++) {
    decodedText = shifter_decode(baseText, shift);
    decodedTextWords = decodedText.split(/[^A-Za-z]/);
    console.log("nieve");
    const validWordRatio = getValidWordRatio(decodedTextWords);
    console.log("sol");

    if (validWordRatio >= TOLERANCE) {
      return {
        isDecodable: true,
        decodedText: decodedText,
        shiftsNeeded: shift,
      };
    }
  }

  return { isDecodable: false };
}

function getValidWordRatio(words: string[]): number {
  const validWords = checker.getValidWords(words);
  return validWords.length / words.length;
}
