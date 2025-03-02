import { getCountryFromTimezone } from "../utils/getCountryFromTimezone.js";

export function getCountryFlagEmoji() {
  const country = detectCountryFromTimezone();
  if (!country?.countryCode) return null;

  // Convert country code to flag emoji
  // Country code is two letters, so we convert each letter to a regional indicator symbol
  const emoji = country.countryCode
    .toUpperCase()
    .replace(/./g, (char) => String.fromCodePoint(char.charCodeAt(0) + 127397));

  return { emoji, name: country.countryName };
}

function detectCountryFromTimezone() {
  try {
    const countryCode = getCountryFromTimezone();
    if (!countryCode) return null;

    // Get the country name using DisplayNames API
    const countryName = new Intl.DisplayNames(["en"], { type: "region" }).of(
      countryCode
    );

    return {
      countryCode,
      countryName,
      timezone,
    };
  } catch (error) {
    console.error("Error detecting country:", error);
    return null;
  }
}
