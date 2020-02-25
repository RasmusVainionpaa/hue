
// The MIT License (MIT)
//
// Copyright © 2015 Misha Moroshko
// https://github.com/moroshko/accessible-colors/blob/fe06609e598096ec7a6deb962487792d985cefbd/src/utils/color/color.js
//
// Permission is hereby granted, free of charge, to any person obtaining a copy of
// this software and associated documentation files (the "Software"), to deal in
// the Software without restriction, including without limitation the rights to
// use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
// of the Software, and to permit persons to whom the Software is furnished to do
// so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.

const THREE_DIGIT_HEX_COLOR_REGEX = /^[0-9a-fA-F]{3}$/;
const THREE_DIGIT_HEX_COLOR_WITH_HASH_REGEX = /^#[0-9a-fA-F]{3}$/;
const SIX_DIGIT_HEX_COLOR_REGEX = /^[0-9a-fA-F]{6}$/;
const SIX_DIGIT_HEX_COLOR_WITH_HASH_REGEX = /^#[0-9a-fA-F]{6}$/;

function str2sixDigitHex(str) {
  str = str.trim();

  if (SIX_DIGIT_HEX_COLOR_WITH_HASH_REGEX.test(str)) {
    return str;
  }

  if (SIX_DIGIT_HEX_COLOR_REGEX.test(str)) {
    return '#' + str;
  }

  if (THREE_DIGIT_HEX_COLOR_WITH_HASH_REGEX.test(str)) {
    return '#' + str[1] + str[1] + str[2] + str[2] + str[3] + str[3];
  }

  if (THREE_DIGIT_HEX_COLOR_REGEX.test(str)) {
    return '#' + str[0] + str[0] + str[1] + str[1] + str[2] + str[2];
  }

  return null;
}

function str2rgb(str) {
  const sixDigitHex = str2sixDigitHex(str);

  if (sixDigitHex === null) {
    return null;
  }

  return {
    r: parseInt(sixDigitHex.slice(1, 3), 16),
    g: parseInt(sixDigitHex.slice(3, 5), 16),
    b: parseInt(sixDigitHex.slice(5, 7), 16)
  };
}

// http://www.w3.org/WAI/GL/wiki/Relative_luminance
function relativeLuminance({ r, g, b }) {
  [r, g, b] = [r, g, b].map(c => {
    c = c / 255;

    if (c <= 0.03928) {
      return c / 12.92;
    }

    return Math.pow((c + 0.055) / 1.055, 2.4);
  });

  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

// http://www.w3.org/TR/UNDERSTANDING-WCAG20/visual-audio-contrast-contrast.html#key-terms
function contrast(str1, str2) {
  const L1 = relativeLuminance(str2rgb(str1));
  const L2 = relativeLuminance(str2rgb(str2));

  if (L1 < L2) {
    return (L2 + 0.05) / (L1 + 0.05);
  }

  return (L1 + 0.05) / (L2 + 0.05);
}

export {
  contrast
};