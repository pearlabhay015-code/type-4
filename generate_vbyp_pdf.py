import fitz
import os

os.makedirs('assets/documents/nss', exist_ok=True)
pdf_path = 'assets/documents/nss/youth-parliament-minutes-2025.pdf'

doc = fitz.open()

# Page 1: Overview & Day 1
page1 = doc.new_page(width=595, height=842) # A4

# Header banner
rect_header = fitz.Rect(36, 36, 559, 100)
page1.draw_rect(rect_header, color=(0/255, 86/255, 155/255), fill=(0/255, 86/255, 155/255))

page1.insert_text((48, 62), 'CENTRAL UNIVERSITY OF SOUTH BIHAR, GAYA', fontsize=14, color=(1, 1, 1), fontname='helv')
page1.insert_text((48, 78), 'National Service Scheme (NSS) & Nehru Yuva Kendra (NYKS)', fontsize=10, color=(1, 1, 1), fontname='helv')
page1.insert_text((48, 92), 'District Level VIKSIT BHARAT YOUTH PARLIAMENT 2025', fontsize=10, color=(1, 217/255, 80/255), fontname='helv')

# Document Title
page1.insert_text((36, 126), 'MINUTE-TO-MINUTE PROGRAMME SCHEDULE', fontsize=13, color=(122/255, 12/255, 12/255), fontname='helv')
page1.insert_text((36, 142), 'Event Dates: 24th - 25th March, 2025 | Venue: Vivekananda Lecture Hall, CUSB Panchanpur, Gaya', fontsize=9.5, color=(0.2, 0.2, 0.2), fontname='helv')
page1.insert_text((36, 156), 'Theme: One Nation, One Election: Paving the Way for Viksit Bharat', fontsize=9.5, color=(0/255, 86/255, 155/255), fontname='helv')

# Day 1 Header
rect_d1 = fitz.Rect(36, 175, 559, 195)
page1.draw_rect(rect_d1, color=(0/255, 86/255, 155/255), fill=(0/255, 86/255, 155/255))
page1.insert_text((44, 189), 'DAY 1: 24th MARCH, 2025 (MONDAY) - INAUGURAL & NODAL SPEECH ROUNDS', fontsize=9.5, color=(1, 1, 1), fontname='helv')

# Table Day 1
day1_schedule = [
    ('10:00 AM - 10:45 AM', 'Registration & Verification of District Candidates (Gaya, Nawada, Jehanabad, Aurangabad)'),
    ('10:45 AM - 11:00 AM', 'Assembly & Seating of Dignitaries and Participants in Vivekananda Lecture Hall'),
    ('11:00 AM - 11:10 AM', 'Lighting of the Ceremonial Lamp & University Kulgeet rendition'),
    ('11:10 AM - 11:20 AM', 'Welcome Address by Programme Coordinator (Prof. Pawan Kumar Mishra, DSW)'),
    ('11:20 AM - 11:35 AM', 'Opening Address by District Youth Officer, Nehru Yuva Kendra (NYK) Gaya'),
    ('11:35 AM - 12:00 PM', 'Presidential Address by Hon\'ble Vice Chancellor Prof. Kameshwar Nath Singh'),
    ('12:00 PM - 12:15 PM', 'Orientation on Parliamentary Procedures, Rules of Debate & Evaluation Rubric'),
    ('12:15 PM - 01:30 PM', 'Technical Session I: Declamation Round for Gaya & Jehanabad District Nominees'),
    ('01:30 PM - 02:30 PM', 'Networking Lunch Break'),
    ('02:30 PM - 04:30 PM', 'Technical Session II: Declamation Round for Nawada & Aurangabad District Nominees'),
    ('04:30 PM - 05:00 PM', 'Jury Deliberation & Announcement of Finalists for Day 2 Parliamentary Simulation')
]

y = 215
for time_slot, activity in day1_schedule:
    rect_row = fitz.Rect(36, y - 13, 559, y + 15)
    page1.draw_rect(rect_row, color=(0.85, 0.88, 0.92), fill=(0.97, 0.98, 1.0) if (len(day1_schedule)%2==0) else (1,1,1))
    page1.insert_text((42, y), time_slot, fontsize=8.5, color=(0/255, 86/255, 155/255), fontname='helv')
    page1.insert_textbox(fitz.Rect(175, y - 10, 550, y + 14), activity, fontsize=8.5, color=(0.15, 0.15, 0.15), fontname='helv')
    y += 30

# Footer Page 1
page1.insert_text((36, 810), 'Central University of South Bihar — National Service Scheme (NSS) Cell | Page 1 of 2', fontsize=8, color=(0.5, 0.5, 0.5), fontname='helv')

# Page 2: Day 2 & Valedictory
page2 = doc.new_page(width=595, height=842)

# Header banner Page 2
rect_header2 = fitz.Rect(36, 36, 559, 80)
page2.draw_rect(rect_header2, color=(0/255, 86/255, 155/255), fill=(0/255, 86/255, 155/255))
page2.insert_text((48, 58), 'VIKSIT BHARAT YOUTH PARLIAMENT (VBYP) 2025', fontsize=12.5, color=(1, 1, 1), fontname='helv')
page2.insert_text((48, 72), 'CUSB & NYKS District Nodal Center | Minute-to-Minute Schedule', fontsize=9, color=(1, 217/255, 80/255), fontname='helv')

# Day 2 Header
rect_d2 = fitz.Rect(36, 95, 559, 115)
page2.draw_rect(rect_d2, color=(122/255, 12/255, 12/255), fill=(122/255, 12/255, 12/255))
page2.insert_text((44, 109), 'DAY 2: 25th MARCH, 2025 (TUESDAY) - YOUTH PARLIAMENT SIMULATION & VALEDICTORY', fontsize=9.5, color=(1, 1, 1), fontname='helv')

# Table Day 2
day2_schedule = [
    ('10:00 AM - 10:30 AM', 'Reporting & Roll-Call of Finalist Youth Parliamentarians'),
    ('10:30 AM - 11:30 AM', 'Youth Parliament Mock Session: Opening Statement & Bill Introduction'),
    ('11:30 AM - 01:00 PM', 'Parliamentary Debate & Cross-Examination: "One Nation One Election Roadmaps"'),
    ('01:00 PM - 02:00 PM', 'Lunch & Refreshments'),
    ('02:00 PM - 03:00 PM', 'Question-Hour Simulation & Open Floor Interventions'),
    ('03:00 PM - 03:30 PM', 'Jury Evaluation, Score Compilation & Selection for State/National Level Round'),
    ('03:30 PM - 04:30 PM', 'Valedictory Ceremony: Address by Chief Guest & Dignitaries'),
    ('04:30 PM - 04:50 PM', 'Distribution of Winner Trophies, Certificates of Merit and Participation'),
    ('04:50 PM - 05:00 PM', 'Vote of Thanks by NSS Programme Officer & National Anthem')
]

y2 = 135
for time_slot, activity in day2_schedule:
    rect_row = fitz.Rect(36, y2 - 13, 559, y2 + 15)
    page2.draw_rect(rect_row, color=(0.85, 0.88, 0.92), fill=(0.97, 0.98, 1.0) if (len(day2_schedule)%2==0) else (1,1,1))
    page2.insert_text((42, y2), time_slot, fontsize=8.5, color=(122/255, 12/255, 12/255), fontname='helv')
    page2.insert_textbox(fitz.Rect(175, y2 - 10, 550, y2 + 14), activity, fontsize=8.5, color=(0.15, 0.15, 0.15), fontname='helv')
    y2 += 30

# Organizing Committee Box
rect_comm = fitz.Rect(36, y2 + 20, 559, y2 + 160)
page2.draw_rect(rect_comm, color=(0/255, 86/255, 155/255), fill=(0.96, 0.98, 1.0))
page2.insert_text((48, y2 + 42), 'ORGANIZING COMMITTEE & NODAL CONTACTS', fontsize=10, color=(0/255, 86/255, 155/255), fontname='helv')
page2.insert_text((48, y2 + 60), '• Patron: Prof. Kameshwar Nath Singh, Hon\'ble Vice-Chancellor, CUSB', fontsize=8.5, color=(0.2, 0.2, 0.2), fontname='helv')
page2.insert_text((48, y2 + 76), '• Chairperson - Organizing Committee: Prof. Pawan Kumar Mishra, DSW, CUSB', fontsize=8.5, color=(0.2, 0.2, 0.2), fontname='helv')
page2.insert_text((48, y2 + 92), '• Programme Coordinator: Prof. Budhendra Singh, Member of Organizing Committee', fontsize=8.5, color=(0.2, 0.2, 0.2), fontname='helv')
page2.insert_text((48, y2 + 108), '• District Youth Officer: Sh. Hemant, NYK Gaya', fontsize=8.5, color=(0.2, 0.2, 0.2), fontname='helv')
page2.insert_text((48, y2 + 124), '• Programme Officers: Dr. Anil Kumar, Dr. Anindya Deb, Dr. Parijat Pradhan, Dr. Rahul Singh', fontsize=8.5, color=(0.2, 0.2, 0.2), fontname='helv')
page2.insert_text((48, y2 + 140), '• Portal Registration: https://mybharat.gov.in/ (MY Bharat Scheme, GoI)', fontsize=8.5, color=(122/255, 12/255, 12/255), fontname='helv')

# Footer Page 2
page2.insert_text((36, 810), 'Central University of South Bihar — National Service Scheme (NSS) Cell | Page 2 of 2', fontsize=8, color=(0.5, 0.5, 0.5), fontname='helv')

doc.save(pdf_path)
print('Successfully saved youth-parliament-minutes-2025.pdf!')
