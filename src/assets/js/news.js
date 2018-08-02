var itemIds = [];
var itemList = [];
var itemLimit = 30;
var offset = 0;
var busy = false;
var scrollThrottle = null;
var ajaxTimeout = null;

// Can be list, post, or user.
var pageType = 'list';

const baseURL = 'https://hacker-news.firebaseio.com/v0';
var topItemsRequest = $.ajax(baseURL + '/topstories.json');

/**
 * Grabs more items from the top 100 list, with the given offset.
 */
function getMoreItems(topItems, offset) {
  topItems = topItems.slice(offset, offset + itemLimit);

  var requests = topItems.map(function(item) {
    var itemData = $.ajax(baseURL + '/item/' + item + '.json');

    return itemData;
  });

  $.when.apply($, requests).done(function() {
    var results = Array.prototype.slice.call(arguments, 0).map(function(array) {
      return array[0];
    });

    results.forEach(function(result) {
      itemList.push(result);
      $('#content').append(entryFormat(result));
    });
  });

  this.offset += 20;
  if (this.offset >= 100) {
    $('#scrollText').hide();
    $(window).unbind('scroll');
  }
  busy = false;
}

/**
 * Throws all parts of an item div into an array and then joins it with spaces.
 */
function entryFormat(data, full) {
  var link = '<a class="lead" target="_blank" href="' + data.url + '" >' + data.title + '</a>',
      comments = data.kids ? data.kids.length : 0,
      commentLink =  full ? ''
        : '| <b><span class="comment_link" data-id="' + data.id + '" >' + comments + ' comments</span></b>',
      entryArgs = [
        '<div class="item_entry">',
        link,
       '<p>',
       data.score,
       'points',
       ' by ' + data.by,
       commentLink,
       '</p>',
       '</div>',
      ];

  var blurb = entryArgs.join(' ');
  var extra = '<p>' + data.text + '</p>' + '<h3>' + comments + ' comments</h3>';

  if (full)
    return blurb + extra;
  return blurb;
};

/**
 * Infinity scroll in action
 **/
var win = $(window);

win.scroll(function() {
  clearTimeout(scrollThrottle);
  scrollThrottle = setTimeout(function() {
    if (pageType === 'list') {
      if (!busy && $(document).height() - win.height() == win.scrollTop()) {
        busy = true;
        getMoreItems(itemIds, offset);
      }
    }
  }, 300);
});

topItemsRequest.done(function(topItems) {
  itemIds = topItems;
  getMoreItems(topItems, offset);
});

/**
 * Wait until it has been 300 ms since the last AJAX completion to show the
 * content.
 */
$(document).ajaxComplete(function() {
  clearTimeout(ajaxTimeout);
  ajaxTimeout = setTimeout(function() {
    $('#content').removeClass('hidden');
    $('#scrollText').removeClass('hidden');
  }, 300);
});
