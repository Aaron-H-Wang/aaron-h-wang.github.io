(function () {
  "use strict";

  var storageKey = "haoyu-post-navigation-context";

  function cleanPath(value) {
    var url = new URL(value, window.location.origin);
    var path = url.pathname.replace(/\/+$/, "") || "/";
    return path;
  }

  function linksFor(container) {
    var selector = container.classList.contains("site-search__results")
      ? ".site-search__result"
      : ".post-card__inner";

    return Array.prototype.slice.call(container.querySelectorAll(selector)).map(function (link) {
      var titleNode = link.querySelector(".site-search__result-title, h2");
      var card = link.closest(".post-card");
      return {
        url: new URL(link.href, window.location.origin).pathname,
        title: card && card.getAttribute("data-post-title")
          ? card.getAttribute("data-post-title")
          : (titleNode ? titleNode.textContent.trim() : link.textContent.trim())
      };
    });
  }

  function rememberContext(container) {
    var name = container.getAttribute("data-post-context");
    var posts = linksFor(container);
    if (!name || !posts.length) return;

    try {
      window.sessionStorage.setItem(storageKey, JSON.stringify({ name: name, posts: posts }));
    } catch (error) {
      return;
    }
  }

  document.addEventListener("click", function (event) {
    var link = event.target.closest(".post-card__inner, .post-card__cover-link, .site-search__result");
    if (!link) return;
    var container = link.closest("[data-post-context]");
    if (!container) return;

    rememberContext(container);
    var context = container.getAttribute("data-post-context");
    var url = new URL(link.href, window.location.origin);
    url.searchParams.set("from", context);
    link.href = url.pathname + url.search + url.hash;
  });

  function arrow(direction) {
    if (direction === "previous") {
      return '<span aria-hidden="true"><svg xmlns="http://www.w3.org/2000/svg" width="6" height="11" viewBox="0 0 6 11"><path d="M5.647 1.718c.37-.434.323-1.09-.106-1.465A1.016 1.016 0 0 0 4.095.36L.25 4.875a1.05 1.05 0 0 0 .017 1.378l3.95 4.407c.38.424 1.03.456 1.448.07a1.05 1.05 0 0 0 .07-1.468l-3.34-3.725 3.253-3.819z"/></svg></span>';
    }
    return '<span aria-hidden="true"><svg xmlns="http://www.w3.org/2000/svg" width="6" height="11" viewBox="0 0 6 11"><path d="M.353 9.282c-.37.434-.323 1.09.106 1.465a1.016 1.016 0 0 0 1.446-.107L5.75 6.125a1.05 1.05 0 0 0-.017-1.378L1.784.34A1.015 1.015 0 0 0 .336.27a1.05 1.05 0 0 0-.07 1.468l3.34 3.725L.353 9.282z"/></svg></span>';
  }

  function truncate(title) {
    return title.length > 30 ? title.slice(0, 27).replace(/\s+$/, "") + "..." : title;
  }

  function item(post, direction, context) {
    var wrapper = document.createElement("div");
    wrapper.className = "controls__item " + (direction === "previous" ? "prev" : "next");
    if (!post) return wrapper;

    var label = document.createElement("span");
    var link = document.createElement("a");
    label.textContent = direction === "previous" ? "Previous" : "Next";
    link.href = post.url + "?from=" + encodeURIComponent(context);
    link.setAttribute("aria-label", (direction === "previous" ? "Previous: " : "Next: ") + post.title);
    link.innerHTML = direction === "previous"
      ? arrow("previous") + " " + truncate(post.title)
      : truncate(post.title) + " " + arrow("next");
    wrapper.appendChild(label);
    wrapper.appendChild(link);
    return wrapper;
  }

  function applyContextNavigation() {
    var controls = document.getElementById("post-context-navigation");
    var requestedContext = new URLSearchParams(window.location.search).get("from");
    if (!controls || !requestedContext) return;

    var context;
    try {
      context = JSON.parse(window.sessionStorage.getItem(storageKey));
    } catch (error) {
      return;
    }
    if (!context || context.name !== requestedContext || !Array.isArray(context.posts)) return;

    var current = cleanPath(controls.getAttribute("data-current-url"));
    var index = context.posts.findIndex(function (post) { return cleanPath(post.url) === current; });
    if (index === -1) return;

    controls.textContent = "";
    controls.setAttribute("data-active-context", context.name);
    controls.appendChild(item(context.posts[index - 1], "previous", context.name));
    controls.appendChild(item(context.posts[index + 1], "next", context.name));
  }

  applyContextNavigation();
}());
