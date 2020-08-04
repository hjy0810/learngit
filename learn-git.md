### configuration
git操作最基本的流程
    创建工作目录 对工作目录进行修改
    git add ./
        git hash-object -w 文件名(修改了多少个工作目录中的文件 此命令就要被执行多少次)
        git update-index ...
    git commit -m "注释内容"
        git write-tree
        git commit-tree

```shell
git config --global user.name "hjy0810"
git config --global user.email huangjianyong_cn@126.com
# 每次 Git 提交时都会引用这两条信息，说明是谁提交了更新，会随更新内容一 起被永久纳入历史记录

git config --list   # 检查已有的配置信息
```

### init
```shell
首先远程创建 my-app 仓库
mkdir my-app
cd my-app
git init 
# 添加文件
git add .
git commit -m 'description'
git remote add origin https://github.com/hjy0810/test.git #连接到远程仓库
git push -u origin master  #推送到master分支
```
简单版
```shell
远程创建 my-app 仓库
git clone https://github.com/hjy0810/test.git  //默认master分支
#添加文件
git add .
git commit -m 'description'
git push -u origin master
```
### .git目录
objects目录       存储所有数据内容
refs目录          保存了所有 分支 及其 最后一次提交的 SHA-1 值
HEAD              文件以路径形式指示 当前指向的分支
index             文件保存暂存区信息

hooks目录         包含客户端或服务端的钩子脚本;
info目录          包含一个全局性排除文件
logs目录          保存日志信息
description       用来显示对仓库的描述信息
config            文件包含项目特有的配置选项
--------
**如果当前所在分支为master，Head指向master，master指向当前分支的最后一次提交，所以Head代表的就是当前分支**

### 对象
git对象
树对象
提交对象
```shell
# git 对象
git没有保存文件名，保存的是文件的内容，并某个文件中的内容生成所对应的 SHA-1 值（长度为 40 个字符的校验和） 
Git 存储内容的方式:一个文件对应一条内容。校验和的前两个字符用于命名子目录，余下的 38 个字符则用作文件名。         
```

### git branch
Git的分支，其实本质上是**指向最新提交对象的指针**。
创建分支，会在当前所在的提交对象上创建一个指向它的指针。
切换分支时，git通过HEAD文件获取这个分支最新提交的SHA-1值，并让Head指向它。
分支的创建、切换、合并只是修改了head指针，所以速度非常快。
合并分支时，如果可能，Git会用Fast forward模式(快进式合并不会产生冲突)，这种模式下，删除分支后，会丢掉分支信息。加上--no-ff参数就可以用普通模式合并，合并后的历史能看出来曾经做过合并。

```shell
# 创建、切换
git branch [branch-name]    新建一个分支
git checkout [branch-name]  切换到这个分支
git checkout -b [branch-name]   新建一个分支并切换过去（同上两条）

git branch [branch-name] [commitHash]  新建一个分支并且使分支指向对应的提交对象（时光机）

# 建议使用新版本
git switch -c [branch-name]     创建并切换
git switch [branch-name]        切换

# 删除
git branch -d [branch-name]     删除指定的分支
git branch -D [branch-name]     强制删除
# 查看
git branch      查看当前本地分支，绿色带*为当前分支
git branch -a   查看当前所有分支，绿色带*为当前分支，红色的是远程分支
git branch -v   查看当前本地分支的最后一次提交

git push -u origin [branch-name]    把当前分支推送到远程，远程没有会新建这个分支
```

#### 合并 vs 冲突
```
git merge [branch-name]     把指定的分支合并到当前所在的分支
```

冲突：如果在两个不同的分支中，对同一个文件的同一个部分进行了不同的修改，git就没法干净的合并它们，就会造成冲突。
解决冲突：打开git合并失败的文件，手动编辑之后提交

```shell
vim [conflict-file]
# 手动编辑之后
git commit -am 'descr'
```

#### 分支策略
首先，master分支应该是非常稳定的，也就是仅用来发布新版本，平时不能在上面干活；
干活都在dev分支上，到某个时候，比如1.0版本发布时，再把dev分支合并到master上，在master分支发布1.0版本；
每个人都在dev分支上干活，每个人都有自己的分支，时不时地往dev分支上合并就可以了

#### bug 分支 (git 存储)
1. 使用  git stash  把当前工作现场“储藏”起来
2. 切换到指定分支，创建分支解决bug
3. 切换到自己工作的分支，使用    git stash list   查看之前的工作现场   
4. git stash pop  恢复工作内容的同时把stash内容也删了
5. 之前分支的子分支也有同样的bug，使用cherry-pick命令

#### 多人协作

### git 撤销&重置
```shell
# 工作区
git checkout -- [filename]  撤销自己在工作区的修改(执行了git add的才行)
git checkout [filename]     同下，把文件从 暂存区 复制到 工作区，用来丢弃本地修改
git restore [filename]      Git 2.23 版本之后新加的，用来替代之前 git checkout
                            把文件从 暂存区 复制到 工作区，用来丢弃本地修改
# 缓存区
git reset HEAD [filename]   撤回当前文件的 git add 操作

git ls-files -s     查看当前暂存区的文件
git cat-file -p [commit SHA-1]  查看指定SHA-1的文件内容
git cat-file -p HEAD            查看当前HEAD的SHA-1值


# 历史区
git commit --amend  撤回自己的提交: 适用于注释写错了,重新修改注释（会覆盖之前的注释）


git reset file      从 历史区 复制文件到 暂存区，而不动 工作区
git reset --hard    从 历史区 复制所有文件到 暂存区 和 工作区，不能指定单个文件

```
####重置
git reset 
```shell
git rest --soft HEAD~  
    移动 HEAD 所指向的分支，就是HEAD带着当前分支一起移动，不同于 切换 分支中checkout的 只修改HEAD所指向的分支，而各分支本身的指向不会改变。
    HEAD~ 指的就是 HEAD 的父结点，他仅会把当前分支指向修改为他的父节点，而不会改变索引和工作目录。 
# 执行了上个命令之后，HEAD会带着当前分支指向当前的父节点，如何回去？
git reflog 查看所有的提交历史(只要动了HEAD就会记录)，然后找到输出的第二条就是之前的HEAD指向，找到它的 SHA-1值
2d6cb0f (HEAD -> master) HEAD@{0}: reset: moving to HEAD~
4baf46f HEAD@{1}: commit: ad
...

git reset --soft 4baf46f    就可以回到之前的HEAD

```
```shell
git reset HEAD~
        等同于 git reset –mixed HEAD~
        HEAD带着当前分支一起移动，此外还修改了 暂存区
        即把当前HEAD指向的那个版本的内容复制一份到暂存区
git reset HEAD 是将最新提交的内容复制一份到暂存区
```
```shell
git reset HEAD --hard HEAD~     硬重置
        HEAD带着当前分支一起移动，此外还修改了 暂存区 和 工作区
        即把当前HEAD指向的那个版本的内容复制一份到暂存区 和 工作区
```




### git log
- git log
```shell
commit d7aa5dc5b9ae88a550d06a0a2b7ebd0031dd9ff7 (HEAD -> master)
Author: hjy0810 <huangjianyong_cn@126.com>
Date:   Mon Aug 3 12:12:47 2020 +0800

    commit

commit 7fb01946e5cd807a6d929bfffb8d34a4f5c67016
Author: hjy0810 <huangjianyong_cn@126.com>
Date:   Mon Aug 3 11:38:11 2020 +0800

    modefied

commit c70ebdaa95391f9d1a95e95cfff6dfefb1c09fcc (origin/master)
Author: hjy0810 <huangjianyong_cn@126.com>
Date:   Mon Aug 3 09:08:04 2020 +0800

    abc

```
按提交时间列出所有的更新，最近的更新排在最上面。
这个命令会列出每个提交的 SHA-1 hash、作者的用户名和邮件、提交时间 以及 描述信息。

git log --pretty='xxx'    使用不同于默认格式的方式展示提交历史。 
- git log --pretty=oneline  将每个提交放在一行显示
- git log --pretty=format:"%h - %an, %ar : %s"  按照选项定制记录的显示格式
- git log --pretty=format:"%h %s" --graph   展示分支、合并历史
```shell
$ git log --pretty=oneline
#
d7aa5dc5b9ae88a550d06a0a2b7ebd0031dd9ff7 (HEAD -> master) commit
f1f1b73933e60f24e57bde153b22d2e808f6231c 12
7fb01946e5cd807a6d929bfffb8d34a4f5c67016 modefied
c70ebdaa95391f9d1a95e95cfff6dfefb1c09fcc (origin/master) abc
a4abc4abac3ed0069f40b6cc1906626c1e84651b test
```
```shell
$ git log --pretty=format:"%h - %an, %ar : %s"
# 
d7aa5dc - hjy0810, 49 minutes ago : commit
f1f1b73 - hjy0810, 53 minutes ago : 12
7fb0194 - hjy0810, 84 minutes ago : modefied
c70ebda - hjy0810, 4 hours ago : abc
a4abc4a - hjy0810, 4 hours ago : test
```
#### log vs reflog
```shell
git log     显示所有提交过的版本信息，但不包括已经被删除的 commit 记录和 reset 的操作
git reflog  查看所有分支的所有操作记录（包括已经被删除的 commit 记录和 reset 的操作）
            简单来说只要HEAD更改，这个命令就会记录，常用于恢复本地的错误操作。
git reflog -g   更详细的reflog
```

### 其他命令
```shell
# linux
echo 'hello world'
echo 'hello world' > h.txt  新建h.txt文件并把'hello world'写入文件

find ./             找到当前目录下 所有文件和目录
find ./ -type f     只找文件
find ./.git/objects -type f     

# git
git remote -v     当前指向的远程repository

# 退出diff按 q 键
git diff        比较 工作区 与 暂存区 的差别（红色代表暂存区，绿色代表工作区）
                只能比较已跟踪文件，即只有当前文件已经被添加到暂存区，再次修改时才能diff
git diff –cached 或者 git diff –staged(1.6.1 以上)      
                比较 暂存区 与 历史区 的差别
                解决有哪些更新 已暂存 ，还未提交的问题

#
git commit -am      提交处于已跟踪(tracked)，但未暂存状态(unstaged)的文件
git rm              移除文件

git mv 1.txt 2.txt  修改文件 1.txt 的文件名为 2.txt

```
### 一些术语
```shell
工作区：Working Directory
暂存区：State(Index)
历史区：History

暂存区：也叫暂存目录、做索引
历史区：也叫版本库

Untracked           未跟踪
                    当前文件还没有从 工作区 添加到 暂存区 的文件
                    执行了 add 操作的文件，就是跟踪了这个文件
Unstaged            未暂存
                    当前文件已添加到暂存区，但是又更改了
所有执行了git add . 的文件，就是跟踪了这个文件

# 已跟踪的文件工作一段时间后，它们的状态可能是已提交，已暂存 和 已修改
Committed           已提交
Staged              已暂存
Modified            已修改
```
### tips
```
1. 每次 commit 之前，先用 git status 看下，工作区的内容是不是都已 添加到缓存区，否则 历史区 不会记录那些还没有 添加到缓存区的内容。
2. 每次 切换分支 之前， 执行一下 commit
3. git内部数据库的数据类型是 blob 类型
4. git add . 会先把 工作区 每个文件的修改分别做成一个 git对象 放到版本库，再从版本库拿出来放到暂存区。
5. 单个文件执行add，版本库中只有这个文件对应的 git对象，执行 commit，版本库中会额外增加这个文件对应的 树对象 和 提交对象。
```






