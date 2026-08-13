(function () {
  "use strict";

  var root = document.getElementById("site-search");
  var openButton = document.querySelector(".header__search-button");
  var input = document.getElementById("site-search-input");
  var results = document.getElementById("site-search-results");
  var status = document.getElementById("site-search-status");
  var closeButtons = document.querySelectorAll("[data-search-close]");
  var posts = null;
  var previousFocus = null;

  if (!root || !openButton || !input || !results || !status) return;

  function normalize(value) {
    return String(value || "")
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/\s+/g, " ")
      .trim();
  }

  function loadIndex() {
    if (posts) return Promise.resolve(posts);
    return fetch(root.getAttribute("data-search-index"))
      .then(function (response) {
        if (!response.ok) throw new Error("Search index could not be loaded.");
        return response.json();
      })
      .then(function (data) {
        posts = data.map(function (post) {
          post._title = normalize(post.title);
          post._summary = normalize(post.summary);
          post._categories = normalize((post.categories || []).join(" "));
          post._tags = normalize((post.tags || []).join(" "));
          post._content = normalize(post.content);
          post._all = [post._title, post._summary, post._categories, post._tags, post._content].join(" ");
          return post;
        });
        return posts;
      });
  }

  function score(post, terms) {
    var total = 0;
    for (var i = 0; i < terms.length; i += 1) {
      var term = terms[i];
      if (post._all.indexOf(term) === -1) return -1;
      if (post._title.indexOf(term) !== -1) total += 10;
      if (post._tags.indexOf(term) !== -1) total += 6;
      if (post._categories.indexOf(term) !== -1) total += 5;
      if (post._summary.indexOf(term) !== -1) total += 3;
      if (post._content.indexOf(term) !== -1) total += 1;
    }
    return total;
  }

  function makeResult(post) {
    var link = document.createElement("a");
    var meta = document.createElement("span");
    var title = document.createElement("strong");
    var summary = document.createElement("span");
    var category = (post.categories && post.categories[0]) || "Post";

    link.className = "site-search__result";
    link.href = post.url;
    meta.className = "site-search__result-meta";
    title.className = "site-search__result-title";
    summary.className = "site-search__result-summary";
    meta.textContent = category + " · " + post.date;
    title.textContent = post.title;
    summary.textContent = post.summary || "Open this post to read more.";
    link.appendChild(meta);
    link.appendChild(title);
    link.appendChild(summary);
    return link;
  }

  function render() {
    var query = normalize(input.value);
    results.textContent = "";

    if (!query) {
      status.textContent = "Start typing to search Research, Life, and News posts.";
      return;
    }

    var terms = query.split(" ").filter(Boolean);
    var matches = posts
      .map(function (post, index) { return { post: post, score: score(post, terms), index: index }; })
      .filter(function (item) { return item.score >= 0; })
      .sort(function (a, b) { return b.score - a.score || a.index - b.index; })
      .slice(0, 12);

    status.textContent = matches.length
      ? matches.length + (matches.length === 1 ? " post found" : " posts found")
      : "No posts found. Try another keyword.";
    matches.forEach(function (item) { results.appendChild(makeResult(item.post)); });
  }

  function openSearch() {
    previousFocus = document.activeElement;
    root.hidden = false;
    document.body.classList.add("search-open");
    status.textContent = "Loading posts…";
    window.requestAnimationFrame(function () { root.classList.add("is-open"); });
    loadIndex()
      .then(function () {
        render();
        input.focus();
      })
      .catch(function () {
        status.textContent = "Search is temporarily unavailable. Please try again.";
        input.focus();
      });
  }

  function closeSearch() {
    root.classList.remove("is-open");
    document.body.classList.remove("search-open");
    window.setTimeout(function () { root.hidden = true; }, 180);
    if (previousFocus) previousFocus.focus();
  }

  openButton.addEventListener("click", openSearch);
  input.addEventListener("input", render);
  closeButtons.forEach(function (button) { button.addEventListener("click", closeSearch); });
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && !root.hidden) closeSearch();
    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
      event.preventDefault();
      if (root.hidden) openSearch(); else input.focus();
    }
  });
}());
