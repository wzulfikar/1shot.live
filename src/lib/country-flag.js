export function getCountryFlagEmoji() {
  const country = detectCountryFromTimezone();
  if (!country?.countryCode) return null;

  // Convert country code to flag emoji
  // Country code is two letters, so we convert each letter to a regional indicator symbol
  return country.countryCode
    .toUpperCase()
    .replace(/./g, (char) => String.fromCodePoint(char.charCodeAt(0) + 127397));
}

function detectCountryFromTimezone() {
  try {
    // Get the user's timezone
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    if (!timezone) return null;

    // Extract country code from timezone
    // Timezone format is usually "Continent/City" or "Continent/Region/City"
    const countryCode = getCountryFromTimezone(timezone);
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

// Helper function to get country code from timezone
function getCountryFromTimezone(timezone) {
  // Common timezone to country mappings
  const timezoneCountries = {
    // Europe
    "Europe/Helsinki": "FI",
    "Europe/London": "GB",
    "Europe/Paris": "FR",
    "Europe/Berlin": "DE",
    "Europe/Madrid": "ES",
    "Europe/Rome": "IT",
    "Europe/Amsterdam": "NL",
    "Europe/Brussels": "BE",
    "Europe/Vienna": "AT",
    "Europe/Stockholm": "SE",
    "Europe/Oslo": "NO",
    "Europe/Copenhagen": "DK",
    "Europe/Dublin": "IE",
    "Europe/Lisbon": "PT",
    "Europe/Zurich": "CH",
    "Europe/Prague": "CZ",
    "Europe/Warsaw": "PL",
    "Europe/Budapest": "HU",
    "Europe/Athens": "GR",
    "Europe/Moscow": "RU",
    "Europe/Istanbul": "TR",

    // Americas
    "America/New_York": "US",
    "America/Los_Angeles": "US",
    "America/Chicago": "US",
    "America/Denver": "US",
    "America/Phoenix": "US",
    "America/Anchorage": "US",
    "America/Toronto": "CA",
    "America/Vancouver": "CA",
    "America/Montreal": "CA",
    "America/Mexico_City": "MX",
    "America/Sao_Paulo": "BR",
    "America/Buenos_Aires": "AR",
    "America/Santiago": "CL",
    "America/Lima": "PE",
    "America/Bogota": "CO",

    // Asia
    "Asia/Tokyo": "JP",
    "Asia/Singapore": "SG",
    "Asia/Shanghai": "CN",
    "Asia/Hong_Kong": "HK",
    "Asia/Seoul": "KR",
    "Asia/Taipei": "TW",
    "Asia/Manila": "PH",
    "Asia/Bangkok": "TH",
    "Asia/Jakarta": "ID",
    "Asia/Kuala_Lumpur": "MY",
    "Asia/Dubai": "AE",
    "Asia/Mumbai": "IN",
    "Asia/Kolkata": "IN",
    "Asia/Tel_Aviv": "IL",
    "Asia/Baghdad": "IQ",
    "Asia/Tehran": "IR",

    // Oceania
    "Australia/Sydney": "AU",
    "Australia/Melbourne": "AU",
    "Australia/Brisbane": "AU",
    "Australia/Perth": "AU",
    "Australia/Adelaide": "AU",
    "Pacific/Auckland": "NZ",
    "Pacific/Fiji": "FJ",

    // Africa
    "Africa/Cairo": "EG",
    "Africa/Johannesburg": "ZA",
    "Africa/Lagos": "NG",
    "Africa/Nairobi": "KE",
    "Africa/Casablanca": "MA",
    "Africa/Tunis": "TN",
    "Africa/Accra": "GH",
  };

  return timezoneCountries[timezone] || null;
}
