---
layout: page
title: Research
permalink: /research/
description: Research posts by Haoyu Wang.
category: Research
---

<p class="page-lead">Research notes, projects, publications, and ideas from my work as an electrical engineer.</p>

{% assign category_posts = site.categories[page.category] %}
{% if category_posts and category_posts.size > 0 %}
<div class="post-list category-post-list" itemscope itemtype="https://schema.org/Blog">
  {% for post in category_posts %}
    {% include card.html %}
  {% endfor %}
</div>
{% else %}
<div class="empty-posts">
  <p class="section-kicker">RESEARCH POSTS</p>
  <h2>The first research post is coming soon.</h2>
  <p>Posts labeled <strong>Research</strong> will automatically appear on this page.</p>
</div>
{% endif %}
