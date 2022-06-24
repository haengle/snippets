// custom filters for 11ty content

eleventyConfig.addFilter("filterResults", function(array, type, match) {

    if (array && type == 'category') {
      const catList = array.filter((arr) => {
        let arrCategories = arr.fields?.content?.fields?.category?.value.split(',');
        if (arrCategories) {
          const matches = arrCategories.filter(cat => match.includes(cat.trim().toLowerCase()));
          if (matches.length > 0) {
            return true;
          }
        }
        
      });
      return catList;
    }

    if (array && type == 'category-date') {
      const catList = array.filter((arr) => {
        let arrCategories = arr.fields.category?.value.split(',');
        if (arrCategories) {
          const matches = arrCategories.filter(cat => match.includes(cat.trim().toLowerCase()));
          if (matches.length > 0) {
            return true;
          }
        }
        
      });
       // sort dates by expDate
       return catList.sort(function(a,b) {
        var dateA = new Date(a.fields.settings?.fields?.expireDate?.value);
        var dateB = new Date(b.fields.settings?.fields?.expireDate?.value);
        if (dateA && dateB) {
          return dateA - dateB;
        }
       })
    }

    if (array && type == 'category-post') {
      const catList = array.filter((arr) => {
        let arrCategories = arr.fields?.content?.fields?.main?.fields?.categories?.value.split(',');
        if (arrCategories) {
          const matches = arrCategories.filter(cat => match.includes(cat.trim().toLowerCase()));
          if (matches.length > 0) {
            return true;
          }
        }
        
      });
      return catList;
    }

    if (array && type == 'named') {
      const namedDates = array.filter((arr) => {
        let thedates = match.includes(arr.label.toLowerCase());
        return thedates;
      });

      // sort dates by expDate
      return namedDates.sort(function(a,b) {
        var dateA = new Date(a.fields.settings?.fields?.expireDate?.value);
        var dateB = new Date(b.fields.settings?.fields?.expireDate?.value);
        if (dateA && dateB) {
          return dateA - dateB;
        }
       })
    }

    if (array && type == 'post-labels') {
      return labeledPosts = array.filter((arr) => {
        let posts = match.includes(arr.label.toLowerCase());
        return posts;
      });
    }

    if (array && type == 'exclude') {
      return labeledPosts = array.filter((arr) => {
        let posts = !match.includes(arr.label.toLowerCase());
        return posts;
      });
    }

    if (array && type == 'url') {
      return contentByUrl = array.filter((arr) => {
        let thecontent = arr.fields.settings?.fields?.urlPath.value.includes(match);
        return thecontent;
      });
    }
  });

// use with 11ty collection
//  {% set eventList = collections.events | filterResults('named', ['match','names']) | limit(eventLimit) %}
