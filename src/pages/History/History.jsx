import { useMemo, useState } from "react";

import {
  BarChart3,
  CalendarDays,
  Check,
  ListChecks,
  Minus,
  MoreVertical,
  Pill,
  TrendingUp,
  X,
} from "lucide-react";

import Sidebar from "../../components/Sidebar/Sidebar";
import "./History.css";

function History() {
  const [statusFilter, setStatusFilter] = useState("All");
  const [dateFilter, setDateFilter] = useState("This Week");
  const [selectedDate, setSelectedDate] = useState("");

  const medicineHistory = useMemo(
    () => [
      {
        id: 1,
        medicine: "Paracetamol 500 mg",
        time: "08:00 AM",
        date: "September 18, 2025",
        rawDate: "2025-09-18",
        instruction: "Take after food",
        status: "Taken",
      },
      {
        id: 2,
        medicine: "Amoxicillin 250 mg",
        time: "02:00 PM",
        date: "September 18, 2025",
        rawDate: "2025-09-18",
        instruction: "Take after meals",
        status: "Taken",
      },
      {
        id: 3,
        medicine: "Vitamin D3 1000 IU",
        time: "09:00 AM",
        date: "September 17, 2025",
        rawDate: "2025-09-17",
        instruction: "Take with water",
        status: "Missed",
      },
      {
        id: 4,
        medicine: "Cetirizine 10 mg",
        time: "09:00 PM",
        date: "September 17, 2025",
        rawDate: "2025-09-17",
        instruction: "Take at night",
        status: "Skipped",
      },
      {
        id: 5,
        medicine: "Metformin 500 mg",
        time: "08:00 AM",
        date: "September 16, 2025",
        rawDate: "2025-09-16",
        instruction: "Take after food",
        status: "Taken",
      },
      {
        id: 6,
        medicine: "Azithromycin 250 mg",
        time: "10:00 AM",
        date: "September 10, 2025",
        rawDate: "2025-09-10",
        instruction: "Take after breakfast",
        status: "Taken",
      },
      {
        id: 7,
        medicine: "Vitamin C 500 mg",
        time: "08:30 AM",
        date: "September 5, 2025",
        rawDate: "2025-09-05",
        instruction: "Take with water",
        status: "Missed",
      },
      {
        id: 8,
        medicine: "Pantoprazole 40 mg",
        time: "07:00 AM",
        date: "August 28, 2025",
        rawDate: "2025-08-28",
        instruction: "Take before breakfast",
        status: "Taken",
      },
    ],
    [],
  );

  const statusButtons = ["All", "Taken", "Missed", "Skipped"];

  const formatDateKey = (date) => {
    const year = date.getFullYear();

    const month = String(date.getMonth() + 1).padStart(2, "0");

    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  const filteredHistory = useMemo(() => {
    let filtered = [...medicineHistory];

    if (statusFilter !== "All") {
      filtered = filtered.filter((item) => item.status === statusFilter);
    }

    /*
      Exact date selected from calendar icon.
      This has priority.
    */
    if (selectedDate) {
      return filtered.filter((item) => item.rawDate === selectedDate);
    }

    /*
      Demo date because the sample data
      is from September 2025.

      Later change this to:
      const today = new Date();
    */
    const today = new Date(2025, 8, 18);

    if (dateFilter === "All Dates") {
      return filtered;
    }

    if (dateFilter === "Today") {
      const todayKey = formatDateKey(today);

      return filtered.filter((item) => item.rawDate === todayKey);
    }

    if (dateFilter === "Yesterday") {
      const yesterday = new Date(today);

      yesterday.setDate(yesterday.getDate() - 1);

      const yesterdayKey = formatDateKey(yesterday);

      return filtered.filter((item) => item.rawDate === yesterdayKey);
    }

    if (dateFilter === "This Week") {
      const weekStart = new Date(today);

      weekStart.setDate(today.getDate() - today.getDay());

      const weekEnd = new Date(weekStart);

      weekEnd.setDate(weekStart.getDate() + 6);

      const startKey = formatDateKey(weekStart);

      const endKey = formatDateKey(weekEnd);

      return filtered.filter(
        (item) => item.rawDate >= startKey && item.rawDate <= endKey,
      );
    }

    if (dateFilter === "This Month") {
      return filtered.filter((item) => {
        const [year, month] = item.rawDate.split("-");

        return (
          Number(year) === today.getFullYear() &&
          Number(month) === today.getMonth() + 1
        );
      });
    }

    if (dateFilter === "Last Month") {
      const previousMonth = new Date(
        today.getFullYear(),
        today.getMonth() - 1,
        1,
      );

      return filtered.filter((item) => {
        const [year, month] = item.rawDate.split("-");

        return (
          Number(year) === previousMonth.getFullYear() &&
          Number(month) === previousMonth.getMonth() + 1
        );
      });
    }

    return filtered;
  }, [medicineHistory, statusFilter, dateFilter, selectedDate]);

  const totalCount = medicineHistory.length;

  const takenCount = medicineHistory.filter(
    (item) => item.status === "Taken",
  ).length;

  const missedCount = medicineHistory.filter(
    (item) => item.status === "Missed",
  ).length;

  const skippedCount = medicineHistory.filter(
    (item) => item.status === "Skipped",
  ).length;

  const adherence =
    totalCount > 0 ? Math.round((takenCount / totalCount) * 100) : 0;

  const getStatusIcon = (status) => {
    if (status === "Taken") {
      return <Check size={25} />;
    }

    if (status === "Missed") {
      return <X size={22} />;
    }

    return <Minus size={22} />;
  };

  const handleDateDropdownChange = (event) => {
    setDateFilter(event.target.value);

    setSelectedDate("");
  };

  const handleExactDateChange = (event) => {
    const value = event.target.value;

    setSelectedDate(value);

    if (value) {
      setDateFilter("All Dates");
    }
  };

  const handleClearFilters = () => {
    setStatusFilter("All");
    setDateFilter("This Week");
    setSelectedDate("");
  };

  return (
    <div className="history-page-layout">
      <Sidebar activePage="History" />

      <main className="history-page-main">
        {/* HEADER */}

        <header className="history-top-section">
          <div className="history-page-heading">
            <p className="history-breadcrumb">History</p>

            <h1>History</h1>

            <p className="history-subtitle">
              Track your medicine intake and adherence.
            </p>
          </div>

          <div className="history-motivation-card">
            <div className="history-motivation-icon">
              <TrendingUp size={25} />
            </div>

            <p>
              Small steps every day
              <br />
              make a big difference.
            </p>
          </div>
        </header>

        {/* ADHERENCE */}

        <section className="history-adherence-card">
          <div className="history-section-heading">
            <div className="history-section-icon">
              <BarChart3 size={22} />
            </div>

            <div>
              <h2>Medicine Adherence</h2>

              <p>Your overall medicine intake this week</p>
            </div>
          </div>

          <div className="history-adherence-grid">
            <div className="history-stat-card adherence">
              <div
                className="history-progress-circle"
                style={{
                  "--progress": `${adherence * 3.6}deg`,
                }}
              >
                <div className="history-progress-inner">{adherence}%</div>
              </div>

              <div className="history-stat-info">
                <strong>{adherence}%</strong>

                <span>Adherence</span>

                <small>Great job!</small>
              </div>
            </div>

            <div className="history-stat-card taken">
              <div className="history-stat-icon">
                <Pill size={27} />
              </div>

              <div className="history-stat-info">
                <strong>{takenCount}</strong>

                <span>Taken Doses</span>

                <small>On schedule</small>
              </div>
            </div>

            <div className="history-stat-card missed">
              <div className="history-stat-icon">
                <X size={26} />
              </div>

              <div className="history-stat-info">
                <strong>{missedCount}</strong>

                <span>Missed Doses</span>

                <small>Keep going</small>
              </div>
            </div>

            <div className="history-stat-card skipped">
              <div className="history-stat-icon">
                <Minus size={27} />
              </div>

              <div className="history-stat-info">
                <strong>{skippedCount}</strong>

                <span>Skipped Doses</span>

                <small>Stay consistent</small>
              </div>
            </div>
          </div>
        </section>

        {/* FILTERS */}

        <section className="history-filter-card">
          {/* STATUS FILTER */}

          <div className="history-status-filter">
            <h3>Filter by Status</h3>

            <div className="history-filter-buttons">
              {statusButtons.map((status) => (
                <button
                  key={status}
                  type="button"
                  className={`history-filter-button ${
                    statusFilter === status ? "active" : ""
                  }`}
                  onClick={() => setStatusFilter(status)}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>

          <div className="history-filter-divider" />

          {/* DATE FILTER */}

          <div className="history-date-filter">
            <h3>Filter by Date</h3>

            <div className="history-date-filter-row">
              {/* CLICKABLE CALENDAR ICON */}

              <div
                className={`history-date-icon history-calendar-picker ${
                  selectedDate ? "active-date" : ""
                }`}
              >
                <CalendarDays size={20} />

                <input
                  type="date"
                  value={selectedDate}
                  onChange={handleExactDateChange}
                  className="history-hidden-date-input"
                  aria-label="Select exact date"
                />
              </div>

              {/* DROPDOWN */}

              <select
                className="history-date-dropdown"
                value={dateFilter}
                onChange={handleDateDropdownChange}
              >
                <option value="All Dates">All Dates</option>

                <option value="Today">Today</option>

                <option value="Yesterday">Yesterday</option>

                <option value="This Week">This Week</option>

                <option value="This Month">This Month</option>

                <option value="Last Month">Last Month</option>
              </select>

              {/* CLEAR EXACT DATE */}

              {selectedDate && (
                <button
                  type="button"
                  className="history-clear-exact-date"
                  onClick={() => {
                    setSelectedDate("");
                    setDateFilter("This Week");
                  }}
                  title="Clear selected date"
                >
                  <X size={15} />
                </button>
              )}
            </div>
          </div>
        </section>

        {/* ACTIVE FILTER */}

        {selectedDate && (
          <div className="history-selected-date-info">
            <span>Showing records for:</span>

            <strong>
              {new Date(`${selectedDate}T00:00:00`).toLocaleDateString(
                "en-US",
                {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                },
              )}
            </strong>

            <button
              type="button"
              onClick={() => {
                setSelectedDate("");
                setDateFilter("This Week");
              }}
            >
              Clear
            </button>
          </div>
        )}

        {/* HISTORY LIST */}

        <section className="history-list-card">
          <div className="history-section-heading history-list-heading">
            <div className="history-section-icon">
              <ListChecks size={22} />
            </div>

            <div>
              <h2>Medicine History</h2>

              <p>Your medicine intake records</p>
            </div>
          </div>

          <div className="history-record-list">
            {filteredHistory.length > 0 ? (
              filteredHistory.map((item) => (
                <article className="history-record" key={item.id}>
                  <div
                    className={`history-record-status-icon ${item.status.toLowerCase()}`}
                  >
                    {getStatusIcon(item.status)}
                  </div>

                  <div className="history-record-info">
                    <h3>{item.medicine}</h3>

                    <p>
                      {item.time}

                      <span>•</span>

                      {item.date}
                    </p>

                    <small>{item.instruction}</small>
                  </div>

                  <div
                    className={`history-status-badge ${item.status.toLowerCase()}`}
                  >
                    {item.status}
                  </div>

                  <button
                    type="button"
                    className="history-record-menu"
                    aria-label={`More options for ${item.medicine}`}
                  >
                    <MoreVertical size={19} />
                  </button>
                </article>
              ))
            ) : (
              <div className="history-empty-state">
                <CalendarDays size={38} />

                <h3>No medicine records found</h3>

                <p>No records match the selected filters.</p>

                <button
                  type="button"
                  className="history-empty-clear"
                  onClick={handleClearFilters}
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}

export default History;
