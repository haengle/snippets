// auto expire dated content when 11ty generates entries from CMS API data

// 11ty.js
const { monthNames, dayNames, nth, isDateFuture } = require('./path/to/utils');

// add collection for "events" content type
eleventyConfig.addCollection("events", (event) => {
    const result = event.getAll()[0].data.entries;

    // get events type
    let events = result.filter(function(item) {
      return item.subtype == "events" 
              && item.fields.content.fields.startDate.value
              && item.status == "published";
    });

    // sort events by startDate
    events.sort(function(a,b) {
        var dateA = new Date(a.fields.content.fields.startDate.value);
        var dateB = new Date(b.fields.content.fields.startDate.value);
        if (dateA && dateB) {
          return dateA - dateB;
        }
    })

    // filter events for future dates only
    return events.filter(function(event) {
      const today = new Date();
      expireDate = event.fields.content?.fields?.endDate?.value.length ? event.fields.content.fields.endDate.value : event.fields.content.fields.startDate.value;
      let showFromDate = new Date(event.fields.settings?.fields?.showDate?.value);

      if (event.fields.settings?.fields?.keepVisible?.value === true) {
        return event;
      } else if ((showFromDate.getTime() < today.getTime()) || isNaN(showFromDate.getTime()) || event.fields.settings?.fields?.showDate?.value == null) {
        expireDate = new Date(expireDate);
        // add 24 hours to event's start/end date
        theNextDay = new Date(expireDate.getTime() + 60 * 60 * 24 * 1000); 

        return isDateFuture(theNextDay);
      }
      
    });

  });
