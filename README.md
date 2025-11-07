cat << 'EOF' > README.md
# Sheets Deadline Tracker

Google Apps Scripts used to:
- Automatically adjust deadline dates when they fall on holidays or Sundays
- Notify via email when deadlines are approaching

## Features
✅ Detects Italian national holidays  
✅ Moves deadlines forward if needed  
✅ Sends email alerts when deadlines are within 14 days  

## Files
- `holidays.gs` — holiday calculation + date adjustment
- `checkDeadlines.gs` — email notification script

## Usage
1. Copy scripts into Google Sheets > Extensions > Apps Script
2. Configure sheet name and email inside the script
3. Set up time–based triggers

## License
MIT
EOF
