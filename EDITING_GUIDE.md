# 个人网站手动维护指南

这个网站使用 Jekyll。修改文件并推送到 GitHub 的 `main` 分支后，GitHub Actions 会自动重新部署网站。

## 最简单的方式：直接在 GitHub 网页中修改

1. 打开仓库：<https://github.com/Aaron-H-Wang/aaron-h-wang.github.io>
2. 点击需要修改的文件。
3. 点击右上角铅笔图标 **Edit this file**。
4. 修改内容后，点击 **Commit changes**。
5. 打开仓库的 **Actions** 页面，等待 `Deploy Jekyll site to Pages` 显示绿色勾号。
6. 通常一两分钟后即可在 <https://aaron-h-wang.github.io> 看到更新。

## 修改首页标题与网站信息

编辑 `_config.yml`：

- `title`：首页主标题和浏览器标题。
- `description`：搜索引擎使用的网站介绍。
- `hero_img`：首页背景图在 `assets/img` 下的路径。
- `github_username`：GitHub 账号。
- `linkedin_url`：LinkedIn 地址。

首页背景上的两段介绍位于 `_layouts/default.html`，搜索 `hero__meta` 和 `hero__description` 即可修改。

## 修改 About 页面

编辑 `about.md`。文件最上方两个 `---` 之间是页面设置，下面是正文。普通段落可以直接修改；保留 HTML 标签即可维持现有排版。

## 新建一篇文章

在 GitHub 仓库中点击 **Add file -> Create new file**，文件名必须使用：

```text
_posts/YYYY-MM-DD-英文短标题.md
```

例如：

```text
_posts/2026-08-11-my-first-research-note.md
```

文件内容可以从下面复制：

```yaml
---
layout: post
title: "My First Research Note"
summary: "A short description shown on post cards."
categories:
  - Research
image: /assets/img/posts/my-photo.jpg
---

Write the article here using Markdown.

## A section heading

Normal paragraph text.
```

分类只能使用下面其中一个，并注意首字母大写：

```yaml
categories:
  - Research
```

或：

```yaml
categories:
  - Life
```

Research 文章会自动出现在首页和 Research 页面；Life 文章会自动出现在首页和 Life 页面。

### Research Post 的统一长度与结构

Research Post 建议保持在 **580–650 个英文单词**，对应约三分钟的正文阅读时间。图片说明和参考链接不计入主要篇幅。为了与现有页面保持一致，建议依次包含：

1. 一段简洁的研究问题与背景；
2. 作者或发表信息；
3. 三至四个核心指标；
4. 方法、实验验证和工程意义；
5. 两至三张论文原图及清晰的图注；
6. 一个简短的 Takeaway 和论文链接。

扩充内容时应优先解释“为什么需要这项研究”和“结果对工程设计意味着什么”，避免重复摘要或单纯为了增加字数而堆叠技术细节。

## 给文章添加图片

1. 在仓库中进入 `assets/img/posts`。
2. 点击 **Add file -> Upload files** 上传 JPG、PNG 或 WebP 图片。
3. 在文章设置中加入：

```yaml
image: /assets/img/posts/图片文件名.jpg
```

文件名建议只使用小写英文字母、数字和连字符，不要使用空格或中文。

如果文章不需要图片，删除 `image` 这一行即可，Sleek 会显示默认的深色卡片背景。

## 修改或删除文章

- 修改：打开 `_posts` 中的文章，点击铅笔图标编辑并提交。
- 删除：打开文章，使用右上角菜单中的 **Delete file**，然后提交。
- 修改日期：重命名文件开头的 `YYYY-MM-DD`。

## 在电脑上本地预览

已经安装 Ruby 和 Bundler 时，在项目目录运行：

```bash
bundle install
bundle exec jekyll serve
```

然后访问 <http://localhost:4000>。停止预览时在终端按 `Ctrl+C`。

完成修改后运行：

```bash
git add -A
git commit -m "Describe your change"
git push origin main
```

## 出错时如何恢复

在 GitHub 仓库的 **Actions** 页面查看红色失败记录。若刚刚的修改导致错误，可打开该文件重新编辑，或在 **Commits** 中找到上一个正常版本并恢复。最常见的问题是文章开头缺少 `---`、分类拼写错误，或文件名没有日期。
