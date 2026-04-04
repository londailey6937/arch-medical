#!/usr/bin/env python3
"""Build vCard with embedded headshot photo."""

with open('/tmp/headshot_b64.txt', 'r') as f:
    b64 = f.read().strip()

# vCard 3.0: PHOTO line folded at 75 chars with leading-space continuations
photo_line = 'PHOTO;ENCODING=b;TYPE=JPEG:' + b64
lines = [photo_line[:75]]
rest = photo_line[75:]
while rest:
    lines.append(' ' + rest[:74])
    rest = rest[74:]
photo_block = '\r\n'.join(lines)

vcf_lines = [
    'BEGIN:VCARD',
    'VERSION:3.0',
    'N:;510k Bridge;;;',
    'FN:510k Bridge',
    'ORG:Pilot Software LLC dba 510k Bridge',
    'TITLE:FDA 510(k) Medical Device Consulting',
    'ADR;TYPE=WORK:;;Gresham;Oregon;;USA',
    'EMAIL;TYPE=WORK:info@510kbridge.com',
    'URL:https://510kbridge.com',
]

vcf_content = '\r\n'.join(vcf_lines) + '\r\n'
vcf_content += photo_block + '\r\n'
vcf_content += (
    'NOTE:FDA 510(k) regulatory consulting\\, project management\\, '
    'and trilingual support (EN/CN/KO) for medical device companies '
    'entering the US market.\r\n'
)
vcf_content += 'CATEGORIES:Medical Device,FDA,510(k),Consulting\r\n'
vcf_content += 'END:VCARD\r\n'

with open('public/510kbridge.vcf', 'w', newline='') as f:
    f.write(vcf_content)

print(f'vCard written with photo ({len(b64)} base64 chars)')
