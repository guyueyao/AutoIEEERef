# “工友”网站平台部署说明

###### 1.[MySQL的配置&数据导入](#mysql)

###### 2.部署springboot

​	1.[JAVA (.jar) 部署(推荐)](#java)

​	2.[TOMCAT (.war) 部署](#tomcat)

###### 3.[设置自动https](#https)

## <a id="mysql">MySQL的配置&数据导入</a>



​	1. 安装MySQL，之后使用root用户登录MySQL(默认无密码)

```bash
sudo apt install mysql-server
sudo mysql -u root -p
```

​	2. 创建用户(admin)和密码(Admin@123)

```mysql
CREATE USER 'admin'@'localhost' IDENTIFIED BY 'Admin@123';
```

​	3. 创建名为zhaogong2的database

```mysql
create database zhaogong2;
```

​	4. 导入.sql数据

```mysql
use zhaogong2;
```

```mysql
source ./sql/data.sql;
```

​	5. 授予admin用户数据库使用权限

```mysql
GRANT ALL PRIVILEGES ON zhaogong2.* TO 'admin'@'localhost';
flush privileges;
```

​	6. 运行日志在同级目录的logs文件夹下

## <a id="java">JAVA (.jar) 部署</a>

### 依赖安装：

​			[JAVA-8](#jv8)

​	1. 将Jar/文件夹下gongyou-0.0.1-SNAPSHOT.jar 移动到工作目录

```bash
cp ./Jar/gongyou-0.0.1-SNAPSHOT.jar [your working directory]
```

​	2. 移动到工作目录

```bash
cd [your working directory]
```

​	3. 运行jar包

```bash
sudo java -jar gongyou-0.0.1-SNAPSHOT.jar
```

## <a id="tomcat">TOMCAT (.war) 部署</a>

### 依赖安装：

1. [JAVA-8](#jv8)
2. [JAVA-8对应的TOMCAT 9](#tom)

​	1. 将 /War/gongyou.war 复制到 /usr/local/tomcat/webapps/

```bash
cp ./War/gongyou.war /usr/local/tomcat/webapps/
```

​	2. 将SSL证书复制到tomcat路径下

​	将/ssl/zhaogong-cn-22.jks  复制到 /usr/local/tomcat/ssl/

```bash
mkdir /usr/local/tomcat/ssl/
cp ./ssl/zhaogong-cn-22.jks /usr/local/tomcat/ssl/
```

​	3. 配置tomcat，指定网络根路径为工友网站，并开启HTTPS

​	在 /usr/local/tomcat/conf/ server.xml中添加下面代码以指定网络根路径为工友网站

```xml
<Context path="" docBase="gongyou.war" />
```

​	在 /usr/local/tomcat/conf/ server.xml中添加下面代码以开启HTTPS

```xml
<Connector port="443" address="0.0.0.0" protocol="HTTP/1.1" SSLEnabled="true"
    maxThreads="150" scheme="https" secure="true"
    keystoreFile="/usr/local/tomcat/ssl/zhaogong-cn-22.jks"
    keystorePass="zhaogong"
    clientAuth="false" sslProtocol="TLS" />
```

​	在 /usr/local/tomcat/conf/ context.xml中添加下面代码以增加缓存

```xml
<Resources cachingAllowed="true" cacheMaxSize="100000" />
```

​	**你也可以直接通过将提供的/tomcat/conf/ 中的context.xml 和server.xml 替换 /usr/local/tomcat/conf/ 中的配置文件来完成上述配置**

```bash
cp ./tomcat/conf/context.xml /usr/local/tomcat/conf/
cp ./tomcat/conf/server.xml /usr/local/tomcat/conf/
```

​	4. 启动 tomcat

```bash
sudo startup.sh
```

​		tomcat启动需要一些时间，第一次访问网页时需要大量时间加载，之后正常。

​	6. 运行日志在/usr/local/tomcat/log/下

## <a id="https">设置自动https</a>

​	1. 安装nginx

```bash
sudo apt install nginx
```

​	2. 配置nginx来实现http跳转

​	在/etc/nginx/conf.d/目录下新建.conf配置文件，添加以下配置

```
server {
    listen  80;  
    server_name zhaogong.cn www.zhaogong.cn localhost; ##，绑定域名
    return 301 https://$server_name$request_uri;

}
```

​	**你也可以直接通过将提供的/nginx/http2https.conf 复制到 /etc/nginx/conf.d/来完成上述配置**

```bash
cp ./nginx/http2https.conf /etc/nginx/conf.d/
```

​	3. 注释nginx配置文件/etc/nginx/nginx.conf 中"include /etc/nginx/sites-enabled/*;"行

```
##
	# Virtual Host Configs
	##

	include /etc/nginx/conf.d/*.conf;
	#include /etc/nginx/sites-enabled/*; <---注释此行
```

​	4. 重载配置

```bash
sudo nginx -s reload
```

## <a id="jv8">JAVA-8 环境配置</a>

```bash
sudo add-apt-repository ppa:openjdk-r/ppa
```

```bash
sudo apt install openjdk-8-jdk
```

## <a id="tom">TOMCAT 安装&配置</a>

下载tomcat 9.0.65

```bash
wget https://dlcdn.apache.org/tomcat/tomcat-9/v9.0.65/bin/apache-tomcat-9.0.65.tar.gz
```

解压、安装

```bash
tar zxf apache-tomcat-9.0.65.tar.gz
```

```bash
sudo mv apache-tomcat-9.0.65 /usr/local/tomcat
```

```bash
sudo ln -s /usr/local/tomcat/bin/*  /usr/local/sbin/
```







