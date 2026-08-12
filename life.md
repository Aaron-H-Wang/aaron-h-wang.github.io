---
layout: page
title: Life
permalink: /life/
description: Life and photography posts by Haoyu Wang.
category: Life
---

<p class="page-lead">Photography, adventures, observations, and moments from life beyond engineering.</p>

{% assign category_posts = site.categories[page.category] %}
{% if category_posts and category_posts.size > 0 %}
<div class="post-list category-post-list" itemscope itemtype="https://schema.org/Blog">
  {% for post in category_posts %}
    {% include card.html %}
  {% endfor %}
</div>
{% else %}
<div class="empty-posts">
  <p class="section-kicker">LIFE POSTS</p>
  <h2>The first life post is coming soon.</h2>
</div>
{% endif %}
