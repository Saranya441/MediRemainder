import { useMemo, useState } from "react";

import {
  CalendarDays,
  Check,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Lightbulb,
  MoreVertical,
  Pill,
  XCircle,
} from "lucide-react";

import Sidebar from "../../components/Sidebar/Sidebar";
import "./Calendar.css";

function Calendar() {
  const [currentMonth, setCurrentMonth] = useState(new Date(2025, 8, 1));

  const [selectedDate, setSelectedDate] = useState(new Date(2025, 8, 18));

  /*
    Temporary frontend data.

    Later this will come from the backend
    based on the medicines saved by the user.
  */
  const medicineSchedule = [
    {
      id: 1,
      date: "2025-09-18",
      time: "08:00 AM",
      medicine: "Paracetamol",
      dosage: "500 mg",
      quantity: "1 tablet",
      instruction: "Take after food",
      status: "Taken",
    },
    {
      id: 2,
      date: "2025-09-18",
      time: "02:00 PM",
      medicine: "Amoxicillin",
      dosage: "250 mg",
      quantity: "1 capsule",
      instruction: "Take after meals",
      status: "Upcoming",
    },
    {
      id: 3,
      date: "2025-09-18",
      time: "08:00 PM",
      medicine: "Paracetamol",
      dosage: "500 mg",
      quantity: "1 tablet",
      instruction: "Take after food",
      status: "Upcoming",
    },
  ];

  /*
    Temporary calendar indicators.

    green = medicines
    orange = some taken
    red = missed
  */
  const calendarMarkers = {
    "2025-09-08": ["has"],
    "2025-09-12": ["partial"],
    "2025-09-15": ["has", "partial"],
    "2025-09-18": ["has"],
    "2025-09-22": ["has"],
    "2025-09-25": ["partial"],
    "2025-09-30": ["has"],
  };

  const formatDateKey = (date) => {
    const year = date.getFullYear();

    const month = String(date.getMonth() + 1).padStart(2, "0");

    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  const selectedDateKey = formatDateKey(selectedDate);

  const selectedSchedule = medicineSchedule.filter(
    (item) => item.date === selectedDateKey,
  );

  const takenCount = selectedSchedule.filter(
    (item) => item.status === "Taken",
  ).length;

  const upcomingCount = selectedSchedule.filter(
    (item) => item.status === "Upcoming",
  ).length;

  const missedCount = selectedSchedule.filter(
    (item) => item.status === "Missed",
  ).length;

  const monthLabel = currentMonth.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  const selectedDateLabel = selectedDate.toLocaleDateString("en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const shortSelectedDateLabel = selectedDate.toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  /*
    Generate 42 calendar cells
    = 6 weeks × 7 days
  */
  const calendarDays = useMemo(() => {
    const year = currentMonth.getFullYear();

    const month = currentMonth.getMonth();

    const firstDay = new Date(year, month, 1);

    const lastDay = new Date(year, month + 1, 0);

    const startDay = firstDay.getDay();

    const totalDays = lastDay.getDate();

    const previousMonthLastDay = new Date(year, month, 0).getDate();

    const days = [];

    /* Previous month */

    for (let i = startDay - 1; i >= 0; i--) {
      days.push({
        date: new Date(year, month - 1, previousMonthLastDay - i),
        outsideMonth: true,
      });
    }

    /* Current month */

    for (let day = 1; day <= totalDays; day++) {
      days.push({
        date: new Date(year, month, day),
        outsideMonth: false,
      });
    }

    /* Next month */

    let nextMonthDay = 1;

    while (days.length < 42) {
      days.push({
        date: new Date(year, month + 1, nextMonthDay),
        outsideMonth: true,
      });

      nextMonthDay++;
    }

    return days;
  }, [currentMonth]);

  const handlePreviousMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1),
    );
  };

  const handleNextMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1),
    );
  };

  const handleToday = () => {
    const today = new Date();

    setCurrentMonth(new Date(today.getFullYear(), today.getMonth(), 1));

    setSelectedDate(today);
  };

  return (
    <div className="calendar-page-layout">
      <Sidebar activePage="Calendar" />

      <main className="calendar-page-main">
        {/* =========================
            PAGE HEADER
        ========================== */}

        <header className="calendar-top-section">
          <div className="calendar-heading">
            <p className="calendar-breadcrumb">Calendar</p>

            <h1>Calendar</h1>

            <p className="calendar-subtitle">
              View your medicine schedule and stay on track.
            </p>
          </div>

          <div className="calendar-quote-card">
            <div className="calendar-quote-icon">
              <CalendarDays size={22} />
            </div>

            <p>
              “Consistency today
              <br />
              for a healthier tomorrow.”
            </p>
          </div>
        </header>

        {/* =========================
            TWO COLUMN AREA
        ========================== */}

        <div className="calendar-content-grid">
          {/* =====================
              LEFT COLUMN
          ====================== */}

          <section className="calendar-left-column">
            {/* CALENDAR */}

            <div className="calendar-card">
              <div className="calendar-month-header">
                <div className="calendar-month-nav">
                  <button
                    type="button"
                    onClick={handlePreviousMonth}
                    aria-label="Previous month"
                  >
                    <ChevronLeft size={18} />
                  </button>

                  <h2>{monthLabel}</h2>
                </div>

                <div className="calendar-month-actions">
                  <button
                    type="button"
                    onClick={handleNextMonth}
                    aria-label="Next month"
                  >
                    <ChevronRight size={18} />
                  </button>

                  <button
                    type="button"
                    className="calendar-today-button"
                    onClick={handleToday}
                  >
                    Today
                  </button>
                </div>
              </div>

              {/* WEEKDAYS */}

              <div className="calendar-weekdays">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
                  (day) => (
                    <span key={day}>{day}</span>
                  ),
                )}
              </div>

              {/* DATES */}

              <div className="calendar-days-grid">
                {calendarDays.map(({ date, outsideMonth }) => {
                  const key = formatDateKey(date);

                  const isSelected = key === selectedDateKey;

                  const markers = calendarMarkers[key] || [];

                  return (
                    <button
                      type="button"
                      key={key}
                      className={`calendar-day-cell ${
                        outsideMonth ? "outside" : ""
                      } ${isSelected ? "selected" : ""}`}
                      onClick={() => setSelectedDate(date)}
                    >
                      <span className="calendar-day-number">
                        {date.getDate()}
                      </span>

                      <div className="calendar-day-markers">
                        {markers.includes("has") && (
                          <span className="calendar-dot green" />
                        )}

                        {markers.includes("partial") && (
                          <span className="calendar-dot orange" />
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* LEGEND */}

              <div className="calendar-legend">
                <div>
                  <span className="calendar-dot green" />
                  <span>Has medicines</span>
                </div>

                <div>
                  <span className="calendar-dot orange" />
                  <span>Some taken</span>
                </div>

                <div>
                  <span className="calendar-dot red" />
                  <span>Missed dose</span>
                </div>

                <div>
                  <span className="calendar-dot blue" />
                  <span>Selected date</span>
                </div>
              </div>
            </div>

            {/* =====================
                SELECTED DATE SUMMARY
            ====================== */}

            <div className="calendar-summary-card">
              <div className="calendar-summary-heading">
                <div className="calendar-summary-heading-icon">
                  <CalendarDays size={19} />
                </div>

                <div>
                  <h3>Selected Date Summary</h3>

                  <p>A quick overview of {shortSelectedDateLabel}</p>
                </div>
              </div>

              <div className="calendar-summary-grid">
                <div className="calendar-mini-summary blue">
                  <Pill size={19} />

                  <div>
                    <strong>{selectedSchedule.length}</strong>

                    <span>Total Medicines</span>
                  </div>
                </div>

                <div className="calendar-mini-summary green">
                  <Check size={19} />

                  <div>
                    <strong>{takenCount}</strong>

                    <span>Taken</span>
                  </div>
                </div>

                <div className="calendar-mini-summary blue">
                  <Clock3 size={19} />

                  <div>
                    <strong>{upcomingCount}</strong>

                    <span>Upcoming</span>
                  </div>
                </div>

                <div className="calendar-mini-summary red">
                  <XCircle size={19} />

                  <div>
                    <strong>{missedCount}</strong>

                    <span>Missed</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* =====================
              RIGHT COLUMN
          ====================== */}

          <section className="calendar-right-column">
            {/* SELECTED DATE */}

            <div className="calendar-date-banner">
              <h2>{selectedDateLabel}</h2>

              <p>
                {selectedSchedule.length} medicine
                {selectedSchedule.length !== 1 ? "s" : ""} scheduled
              </p>
            </div>

            {/* STATUS */}

            <div className="calendar-status-row">
              <div className="calendar-status-box green">
                <div className="calendar-status-icon">
                  <Check size={20} />
                </div>

                <div>
                  <strong>{takenCount}</strong>

                  <span>Taken</span>
                </div>
              </div>

              <div className="calendar-status-box blue">
                <div className="calendar-status-icon">
                  <Clock3 size={20} />
                </div>

                <div>
                  <strong>{upcomingCount}</strong>

                  <span>Upcoming</span>
                </div>
              </div>

              <div className="calendar-status-box red">
                <div className="calendar-status-icon">
                  <XCircle size={20} />
                </div>

                <div>
                  <strong>{missedCount}</strong>

                  <span>Missed</span>
                </div>
              </div>
            </div>

            {/* =====================
                MEDICINE SCHEDULE
            ====================== */}

            <div className="calendar-schedule-list">
              {selectedSchedule.length > 0 ? (
                selectedSchedule.map((item) => (
                  <article
                    key={item.id}
                    className={`calendar-schedule-card ${
                      item.status === "Taken"
                        ? "taken"
                        : item.status === "Missed"
                          ? "missed"
                          : "upcoming"
                    }`}
                  >
                    {/* TIME */}

                    <div className="calendar-schedule-time">
                      <strong>{item.time}</strong>

                      <span
                        className={`calendar-dose-status ${
                          item.status === "Taken"
                            ? "taken"
                            : item.status === "Missed"
                              ? "missed"
                              : "upcoming"
                        }`}
                      >
                        {item.status === "Taken" ? (
                          <Check size={13} />
                        ) : item.status === "Missed" ? (
                          <XCircle size={13} />
                        ) : (
                          <Clock3 size={13} />
                        )}

                        {item.status}
                      </span>
                    </div>

                    {/* MEDICINE */}

                    <div className="calendar-schedule-medicine">
                      <div className="calendar-medicine-icon">
                        <Pill size={18} />
                      </div>

                      <div className="calendar-medicine-info">
                        <h3>{item.medicine}</h3>

                        <p>
                          {item.dosage}

                          <span>•</span>

                          {item.quantity}
                        </p>

                        <small>{item.instruction}</small>
                      </div>
                    </div>

                    <button
                      type="button"
                      className="calendar-schedule-menu"
                      aria-label={`More options for ${item.medicine}`}
                    >
                      <MoreVertical size={17} />
                    </button>
                  </article>
                ))
              ) : (
                <div className="calendar-empty-schedule">
                  <CalendarDays size={29} />

                  <h3>No medicines scheduled</h3>

                  <p>There are no medicine reminders for this date.</p>
                </div>
              )}
            </div>

            {/* TIP */}

            <div className="calendar-tip-card">
              <div className="calendar-tip-icon">
                <Lightbulb size={21} />
              </div>

              <div>
                <h3>Tip</h3>

                <p>
                  Tap on a medicine to view more details or mark it as taken
                  once you’ve had it.
                </p>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default Calendar;
