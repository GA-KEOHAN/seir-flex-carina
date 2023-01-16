# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

Location.create([
  { lat: 40.7128, lng: 74.0059, name: 'New York City' },
  { lat: 78.2232, lng: 15.6267, name: 'LongYearByen' }
])

Temperature.create([
  { average_high_f: 39, average_low_f: 26, month: 'January', location_id: 1 },
  { average_high_f: 42, average_low_f: 29, month: "February", location_id: 1 },
  { average_high_f: 50, average_low_f: 35, month: 'March', location_id: 1 },
  { average_high_f: 61, average_low_f: 45, month: 'April', location_id: 1 },
  { average_high_f: 71, average_low_f: 54, month: 'May', location_id: 1 },
  { average_high_f: 79, average_low_f: 64, month: 'June', location_id: 1 },
  { average_high_f: 84, average_low_f: 69, month: 'July', location_id: 1 },
  { average_high_f: 83, average_low_f: 68, month: 'August', location_id: 1 },
  { average_high_f: 75, average_low_f: 61, month: 'September', location_id: 1 },
  { average_high_f: 64, average_low_f: 50, month: 'October', location_id: 1 },
  { average_high_f: 54, average_low_f: 42, month: 'November', location_id: 1 },
  { average_high_f: 43, average_low_f: 48, month: 'December', location_id: 1 },
  { average_high_f: -6, average_low_f: -12, month: 'January', location_id: 2 },
])