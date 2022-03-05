const START_MIN = "a".charCodeAt(0);
const START_MAY = "A".charCodeAt(0);
const END_MIN = "z".charCodeAt(0);
const END_MAY = "Z".charCodeAt(0);
const LETTER_COUNT = 26;

export function shifter(baseText: string, shiftAmount: number) {
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
