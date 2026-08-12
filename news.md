---
layout: page
title: News
permalink: /news/
description: News and updates from Haoyu Wang.
category: News
---

<p class="page-lead">Recent milestones, announcements, and updates from my academic journey.</p>

{% assign category_posts = site.categories[page.category] %}
{% if category_posts and category_posts.size > 0 %}
<div class="post-list category-post-list" itemscope itemtype="https://schema.org/Blog">
  {% for post in category_posts %}
    {% include card.html %}
  {% endfor %}
</div>
{% else %}
<div class="empty-posts">
  <p class="section-kicker">NEWS &amp; UPDATES</p>
  <h2>The first news post is coming soon.</h2>

</div>
{% endif %}
