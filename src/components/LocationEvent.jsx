const LocationEvent = ({ event, events }) => {
  // If multiple events passed, render combined view
  if (events) {
    if (events.length === 1) {
      // Single event from events array
      const singleEvent = events[0];
      return (
        <section className="location-event">
          <div className="location-content">
            <div className="location-year">{singleEvent.year}</div>
            <div className="location-details">
              <span className="location-icon">📍</span>
              <h3 className="location-title">
                {singleEvent.person} moved to {singleEvent.location}
              </h3>
            </div>
          </div>
        </section>
      );
    }
    
    // Multiple events - combined view
    if (events.length > 1) {
      return (
        <section className="location-event">
          <div className="location-content">
            <div className="location-year">{events[0].year}</div>
            <div className="moves-list">
              {events.map((evt, index) => (
                <div key={evt.id} className="move-item">
                  <span className="location-icon">📍</span>
                  <span>{evt.person} moved to {evt.location}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      );
    }
  }

  // Single event view
  return (
    <section className="location-event">
      <div className="location-content">
        <div className="location-year">{event.year}</div>
        <div className="location-details">
          <span className="location-icon">📍</span>
          <h3 className="location-title">
            {event.person} moved to {event.location}
          </h3>
        </div>
      </div>
    </section>
  );
};

export default LocationEvent;