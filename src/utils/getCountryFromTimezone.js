const mapTimezoneToCountry = {
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

/**
 * Extract country code from timezone.
 * Timezone format is usually "Continent/City" or "Continent/Region/City".
 * Returns 2-letter country code or null.
 *
 * @returns {string | null}
 */
export function getCountryFromTimezone(
  timezone = Intl.DateTimeFormat().resolvedOptions().timeZone
) {
  return mapTimezoneToCountry[timezone] || null;
}
