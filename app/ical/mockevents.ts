import type { CalendarEvent } from "./filter";

// Define the CalendarConfirmationStatus enum
enum CalendarConfirmationStatus {
  CONFIRMED = "CONFIRMED",
  TENTATIVE = "TENTATIVE",
  CANCELLED = "CANCELLED",
}

export const calendarEvents: CalendarEvent[] = [
  {
    uid: "event-1",
    dtstamp: new Date(),
    status: CalendarConfirmationStatus.CONFIRMED,
    url: "https://example.com/event-1",
    summary: "Lecture on History",
    description: "A lecture on the history of ancient civilizations.",
    start: new Date(2023, 10, 6, 9, 0), // November 6, 2023, 9:00 AM
    end: new Date(2023, 10, 6, 11, 0), // November 6, 2023, 11:00 AM
    location: "Room 101",
    "CO-RECURRINGID": undefined,
  },
  {
    uid: "event-2",
    dtstamp: new Date(),
    status: CalendarConfirmationStatus.CONFIRMED,
    url: "https://example.com/event-2",
    summary: "Math Quiz",
    description: "Math quiz for Algebra class.",
    start: new Date(2023, 10, 6, 13, 0), // November 6, 2023, 1:00 PM
    end: new Date(2023, 10, 6, 15, 0), // November 6, 2023, 3:00 PM
    location: "Room 205",
    "CO-RECURRINGID": undefined,
  },
  {
    uid: "event-3",
    dtstamp: new Date(),
    status: CalendarConfirmationStatus.CONFIRMED,
    url: "https://example.com/event-3",
    summary: "Student Council Meeting",
    description: "Monthly meeting of the student council.",
    start: new Date(2023, 10, 7, 10, 0), // November 7, 2023, 10:00 AM
    end: new Date(2023, 10, 7, 12, 0), // November 7, 2023, 12:00 PM
    location: "Student Center",
    "CO-RECURRINGID": undefined,
  },
  {
    uid: "event-4",
    dtstamp: new Date(),
    status: CalendarConfirmationStatus.CONFIRMED,
    url: "https://example.com/event-4",
    summary: "Science Fair",
    description: "Annual science fair showcasing student projects.",
    start: new Date(2023, 10, 8, 9, 0), // November 8, 2023, 9:00 AM
    end: new Date(2023, 10, 8, 11, 0), // November 8, 2023, 11:00 AM
    location: "Science Hall",
    "CO-RECURRINGID": undefined,
  },
  {
    uid: "event-5",
    dtstamp: new Date(),
    status: CalendarConfirmationStatus.CONFIRMED,
    url: "https://example.com/event-5",
    summary: "Art Exhibition",
    description: "Student art exhibition and gallery opening.",
    start: new Date(2023, 10, 8, 13, 0), // November 8, 2023, 1:00 PM
    end: new Date(2023, 10, 8, 15, 0), // November 8, 2023, 3:00 PM
    location: "Art Gallery",
    "CO-RECURRINGID": undefined,
  },
  {
    uid: "event-6",
    dtstamp: new Date(),
    status: CalendarConfirmationStatus.CONFIRMED,
    url: "https://example.com/event-6",
    summary: "Midterm Exams",
    description: "Midterm exams for all classes.",
    start: new Date(2023, 10, 10, 9, 0), // November 10, 2023, 9:00 AM
    end: new Date(2023, 10, 10, 11, 0), // November 10, 2023, 11:00 AM
    location: "Various Rooms",
    "CO-RECURRINGID": undefined,
  },
  {
    uid: "event-7",
    dtstamp: new Date(),
    status: CalendarConfirmationStatus.CONFIRMED,
    url: "https://example.com/event-7",
    summary: "Soccer Practice",
    description: "Varsity soccer team practice session.",
    start: new Date(2023, 10, 10, 13, 0), // November 10, 2023, 1:00 PM
    end: new Date(2023, 10, 10, 15, 0), // November 10, 2023, 3:00 PM
    location: "Soccer Field",
    "CO-RECURRINGID": undefined,
  },
  {
    uid: "event-8",
    dtstamp: new Date(),
    status: CalendarConfirmationStatus.CONFIRMED,
    url: "https://example.com/event-8",
    summary: "Club Meeting",
    description: "Weekly meeting of the Science Club.",
    start: new Date(2023, 10, 11, 14, 0), // November 11, 2023, 2:00 PM
    end: new Date(2023, 10, 11, 16, 0), // November 11, 2023, 4:00 PM
    location: "Science Lab",
    "CO-RECURRINGID": undefined,
  },
  {
    uid: "event-9",
    dtstamp: new Date(),
    status: CalendarConfirmationStatus.CONFIRMED,
    url: "https://example.com/event-9",
    summary: "School Play Rehearsal",
    description: "Rehearsal for the upcoming school play.",
    start: new Date(2023, 10, 12, 10, 0), // November 12, 2023, 10:00 AM
    end: new Date(2023, 10, 12, 12, 0), // November 12, 2023, 12:00 PM
    location: "Auditorium",
    "CO-RECURRINGID": undefined,
  },
  {
    uid: "event-10",
    dtstamp: new Date(),
    status: CalendarConfirmationStatus.CONFIRMED,
    url: "https://example.com/event-10",
    summary: "Parent-Teacher Conferences",
    description: "Parent-teacher conferences for all grades.",
    start: new Date(2023, 10, 12, 14, 0), // November 12, 2023, 2:00 PM
    end: new Date(2023, 10, 12, 16, 0), // November 12, 2023, 4:00 PM
    location: "Classrooms",
    "CO-RECURRINGID": undefined,
  },
  {
    uid: "event-11",
    dtstamp: new Date(),
    status: CalendarConfirmationStatus.CONFIRMED,
    url: "https://example.com/event-11",
    summary: "Music Recital",
    description: "Student music recital and performance.",
    start: new Date(2023, 10, 12, 19, 0), // November 12, 2023, 7:00 PM
    end: new Date(2023, 10, 12, 21, 0), // November 12, 2023, 9:00 PM
    location: "Music Hall",
    "CO-RECURRINGID": undefined,
  },
  {
    uid: "event-12",
    dtstamp: new Date(),
    status: CalendarConfirmationStatus.CONFIRMED,
    url: "https://example.com/event-12",
    summary: "Sports Day",
    description: "Annual sports day event for all students.",
    start: new Date(2023, 10, 12, 9, 0), // November 12, 2023, 9:00 AM
    end: new Date(2023, 10, 12, 11, 0), // November 12, 2023, 11:00 AM
    location: "Sports Field",
    "CO-RECURRINGID": undefined,
  },
];
