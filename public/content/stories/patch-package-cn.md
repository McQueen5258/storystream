---
title: 工作中学到新知识之patch-package
date: 2026-01-13
language: zh
tags: 
  - 技术
  - 随笔
category: Life
cover: https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80
summary: 这是一个在工作中学习和探索到的新知识。
---

# 工作中学到新知识之patch-package

今天我想分享我在工作中学习到的新的编程知识。你讲在本文中学会如何在遇到依赖的仓库更新并出现新的问题后，如何在依赖库更新并修复问题前，通过更改现依赖仓库的版本自己修复问题并将更改保存下来。

事情的起因是今天在工作时做了一个任务，这个任务是一个Bug， 一个关于在图表中，长按其中一个数据不显示对应的小弹窗的问题。我在两个月前做了一个关于学习数据的统计图表，效果就是可以切换周/月/年，然后以图表形式观看自己的学习时长，长按某一个Bar(条状数据)就会显示出一个小弹窗，显示你具体在这个日期学习了多长时间，并且在图表下面还会有你具体学习了什么。

![Chart Example](https://res.cloudinary.com/hn5s2xle/image/upload/v1786053233/Chart_Example_cyhha6.png)

当时我记得很清楚我当时完成了，效果也特别好。直到几周前我测试这个图表的时候长按任何Bar都没反应，没有显示小弹窗，图表下面也没有任何变化。事情就变得复杂起来了，我明明在两个月前已经完成了，现在测试又有问题了。这让我摸不着头脑，就把这个问题记录了下来，创建了一个任务给自己，想着后面在修（这种烧脑的问题留给未来的我修吧(^_^*)）

直到今天终于还是躲不开这个问题，我就让我的搭档Codex (ChatGPT编程助理)帮我分析一下每次长按之后在Console中出现的Warn (警告)并修复这个问题:

```apl
console.js:614 [Reanimated] Reading from value during component render. Please ensure that you do not access the value property or use get method of a shared value while React is rendering a component.

If you don't want to see this message, you can disable the strict mode. Refer to:
https://docs.swmansion.com/react-native-reanimated/docs/debugging/logger-configuration for more details.
...
```

Codex改完代码我再测试发现仍然没修好，我就只能用我的方法，把状态打印到Console中，通过打印状态一步一步看看是发生了什么。通过Console打印的数据，可以观察到长按图标中的数据柱子后并不是什么都没发生，而是长按后获取的不是正确的数据柱子。然后我将我发现的问题发给Codex，它就直接帮我分析并修复了问题，然后我就发现他的解决方法就是直接去修复依赖库的代码 (在node_modules下面的依赖库的代码)。我就想着直接改依赖库的代码的话，如果我把node_modules删掉并重新执行安装yarn install，在node_modules中更改的代码不就没了吗？我就把这个问题给Codex，但我发现他已经考虑到了这个问题，并且他的回答触及到了我不知道的内容，也就是今天学习到的新知识：patch-package

Codex回答说：你现在用的是 patch-package，已经生成了补丁文件：victory-native+41.20.2.patch。只要这个补丁文件在仓库里、并且安装后会跑 patch-package，以后 yarn install 也会自动打补丁，不会丢失。

也就是说，当我更改了node_modules的某个依赖库的代码后，会生成一个文件，这个文件会记录我在这个依赖库的哪个版本更改了代码，在下次删除node_modules并且重新执行安装yarn start结束后都会自动应用 这个生成的文件到到 node_modules中对应的依赖库。

所以以后遇到依赖库更新之后出现bug，但是依赖库的开发者没有修复，可以使用patch-package方法，自己临时修复依赖库的问题(^_^)v