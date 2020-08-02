## 了解Linux 

### command

- cd ~          切换到当前用户的home路径
- cd -          切换到上次操作所在路径
- pwd           Print Working Directory 显示当前目录绝对路径 
- ls            ls -a ，连同隐藏文件( 开头为 . 的文件) 一起列出来  

- mkdir mydir
- touch file    创建一个名为 file 的文件
- touch a{1..10}.txt  一次创建10个文件

- cp        cp  1.txt  2.txt    复制文件
- cp -r     cp -r test1 test2 复制目录（-r 代表递归复制）

- rmdir         删除空目录  
- rm            rm file1  删除 'file1' 文件  //删除只读 -f
- rm -r         rm -r mydir  删除mydir目录
    
- mv        mv source destination  移动 文件/目录 到destination目录
- mv        mv file1 file2  重命名 文件/目录

- cat/nl    正序显示 / 添加行号并正序显示

- file      查看文件类型

- df        Disk free（空余硬盘） 查看磁盘容量 
- df -h     以更易读的方式展示

- vimtutor  内置vim学习教程
- who am i/who mom likes    查看当前用户

- echo      输出文本
- man       获取某个命令的说明和使用方式 ，按 q 键退出
- env / export  查看所有已经定义过的环境变量
- echo $PATH    查看环境变量PATH
- 

### 环境变量
按变量的生命周期可分为 永久的 和 临时的 两类变量
    - 永久的需要修改配置文件，使变量永久生效
    - 临时的使用 export命令行 声明即可，变量在shell关闭时失效

全局环境变量存储在  /etc/profile 文件中，它对所有用户永久生效
每个用户目录下有一个 .profile 文件，这个文件只对当前用户永久生效

在shell中输入一个命令，shell是通过环境变量 PATH 来进行搜索的，PATH里保存了shell命令的搜索路径。

查看 PATH 环境变量的内容`$ echo $PATH`，会看到有如下输出`/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin`，通常这些目录下放的都是可执行文件，会按照这个路径按照顺序依次到目录中去查找。
- 添加自定义路径到 PATH 环境变量
```shell
$ PATH=$PATH:/usr/local/mongodb/bin //配置mongodb时添加的环境变量
```
PATH 里面的路径是以 ：作为分隔符，此外添加的时候一定要使用绝对路径。通过这种方式添加环境变量，只在当前shell有效，一旦退出终端就会失效。

### Linux进程
进程（process）：进程是程序在一个数据集合上的一次执行过程
线程（thread）：进程中的子任务

并发：在一个时间段内，宏观来看有多个程序都在活动，有条不紊的执行（每一瞬间只有一个在执行，只是在一段时间有多个程序都执行过）
并行：在每一个瞬间，都有多个程序都在同时执行，这个必须有多个 CPU 才行

程序      进程          线程 
公司      技术部    前端、后端、运维

进程 VS 线程
1. 一个程序至少要有一个进程，一个进程至少要有一个线程
2. 进程之间相互独立。每启动一个进程，系统会为它分配内存供其使用；同一进程下，不同的线程共享该进程的系统资源
3. 进程需要分配较大的内存，操作昂贵；线程只需要小部分栈就可以
4. 进程之间通信需要 TCP/IP 通信实现，同一进程下的线程由于共享系统资源，通信较方便（IPC）
5. 由于进程之间相互独立，一个进程死掉不会对另一个进程造成影响。而多线程程序只要一个线程死掉，整个进程也就死掉了。

### 其他
tab键可以补全命令
使用通配符* 和 ？进行模糊匹配 ls *.js，*匹配0或多个字符，？匹配任意一个字符
