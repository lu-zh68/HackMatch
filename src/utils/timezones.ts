// Mapping of countries to UTC offsets
export const countryToOffset: { [key: string]: number } = {
  'United States - West Coast': -8,
  'United States - East Coast': -5,
  'United States - Central': -6,
  'Canada - Pacific': -8,
  'Canada - Eastern': -5,
  'United Kingdom': 0,
  'Ireland': 0,
  'France': 1,
  'Germany': 1,
  'Spain': 1,
  'Italy': 1,
  'Netherlands': 1,
  'Sweden': 1,
  'Norway': 1,
  'Denmark': 1,
  'Finland': 2,
  'Poland': 1,
  'Switzerland': 1,
  'India': 5.5,
  'China': 8,
  'Japan': 9,
  'South Korea': 9,
  'Singapore': 8,
  'Australia - Sydney': 11,
  'Australia - Melbourne': 11,
  'New Zealand': 13,
  'Brazil': -3,
  'Argentina': -3,
  'Mexico': -6,
  'South Africa': 2,
  'Nigeria': 1,
  'Kenya': 3,
  'UAE': 4,
  'Israel': 2,
  'Russia - Moscow': 3,
  'Turkey': 3,
  'Thailand': 7,
  'Indonesia': 7,
  'Philippines': 8,
  'Vietnam': 7,
  'Malaysia': 8,
};

export function getTimeDifference(userTimezone: string, profileTimezone: string): { hours: number; text: string } {
  const userOffset = countryToOffset[userTimezone] || 0;
  const profileOffset = countryToOffset[profileTimezone] || 0;
  const diff = profileOffset - userOffset;

  if (diff === 0) {
    return { hours: 0, text: 'Same timezone' };
  } else if (diff > 0) {
    return { hours: Math.abs(diff), text: `${Math.abs(diff)}h ahead` };
  } else {
    return { hours: Math.abs(diff), text: `${Math.abs(diff)}h behind` };
  }
}
