import countries from './countries.json'

// TODO: memoize function for performance improvements
export function countryOptions() {
    return countries.slice(0, 10).map(country => ({ value: country.name, label: country.name, icon: country.emoji }))
}