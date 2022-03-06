import { ShiftDecodeEvaluation } from "../components/types";
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
    const response = await fetch(
      "/api/dict?words=" + decodedTextWords.join(",")
    );
    const json = await response.json();
    if (json.validCount / json.totalCount >= TOLERANCE) {
      return {
        isDecodable: true,
        decodedText: decodedText,
        shiftsNeeded: shift,
      };
    }
  }

  return { isDecodable: false };
}
