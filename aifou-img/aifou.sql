SET NAMES UTF8;
#重建数据库sspai
DROP DATABASE IF EXISTS aifou;
CREATE DATABASE aifou CHARSET=UTF8;
USE aifou;
#创建产品详情表
CREATE TABLE products(
  pid INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(32),#标题
	price INT,#价格
	old_price INT,#促销前价格
  ptype INT, #商品类型 1为iphone 2为安卓 3为平板 4为笔记本 5为配件
	img VARCHAR(128),
	content_img VARCHAR(128)#详细介绍图片
);
CREATE TABLE product_spec(
  pid INT,
  spec INT,#规格 1为32g黑色 2为128g黑色 3为32g银色 4为128g银色 5为32g红色 6为128g红色
  price INT#价格
);
CREATE TABLE pimg(#商品图片
  pid INT PRIMARY KEY AUTO_INCREMENT,
  img1 VARCHAR(128),#主图片
  img2 VARCHAR(128),
  img3 VARCHAR(128),
  img4 VARCHAR(128),
  img5 VARCHAR(128),
  img6 VARCHAR(128),
  img7 VARCHAR(128),
  img8 VARCHAR(128),
  img9 VARCHAR(128),
  img10 VARCHAR(128)
);
CREATE TABLE simg(#商品颜色图
  pid INT PRIMARY KEY AUTO_INCREMENT,
  black VARCHAR(128),
  white VARCHAR(128)
);
CREATE TABLE ad_products(#产品宣传表
  pid INT PRIMARY KEY AUTO_INCREMENT,
  ad_img VARCHAR(128),#宣传图
  ad_title VARCHAR(32)#标题
);
CREATE TABLE user(
  uid INT PRIMARY KEY AUTO_INCREMENT,
  uname VARCHAR(32),#用户名
  upwd VARCHAR(32),#用户密码
  phone VARCHAR(32)#用户手机
);
CREATE TABLE cart( #购物车
  uid INT ,
  pid INT,
  spec INT,
  selected BOOLEAN,
  count INT
);
INSERT INTO product_spec VALUES
(
  1,
  1,
  5599
),
(
  1,
  2,
  6599
),
(
  1,
  3,
  5599
),
(
  1,
  4,
  6599
),
(
  2,
  1,
  4599
),
(
  2,
  2,
  5399
),
(
  2,
  3,
  4599
),
(
  2,
  4,
  5399
),
(
  3,
  1,
  1399
),
(
  3,
  2,
  2399
),
(
  3,
  3,
  1399
),
(
  3,
  4,
  2399
),
(
  4,
  3,
  1599
),
(
  4,
  4,
  2899
),
(
  5,
  1,
  2899
),
(
  5,
  2,
  3599
),
(
  5,
  3,
  2899
),
(
  5,
  4,
  3599
),
(
  6,
  1,
  2299
),
(
  6,
  2,
  3099
),
(
  7,
  1,
  269
),
(
  8,
  1,
  2299
),
(
  8,
  2,
  3099
),
(
  9,
  1,
  3099
),
(
  9,
  2,
  3899
),
(
  10,
  1,
  3399
),
(
  10,
  2,
  3999
),
(
  11,
  3,
  999
),
(
  11,
  4,
  1499
),
(
  12,
  1,
  599
),
(
  13,
  1,
  899
),
(
  14,
  1,
  99
),
(
  15,
  1,
  3499
),
(
  16,
  1,
  3399
),
(
  17,
  1,
  3399
),
(
  17,
  2,
  4099
),
(
  17,
  3,
  3399
),
(
  17,
  4,
  4099
),
(
  18,
  1,
  999
),
(
  19,
  1,
  69
),
(
  20,
  1,
  138
),
(
  21,
  1,
  79
),
(
  22,
  1,
  99
),
(
  23,
  1,
  99
);
INSERT INTO products VALUES
(  1,
  "【官换】 A级 iPhone X",
	5599,
	5999,
  1,
	"img/detail/1-1.jpg",
  "img/detail/1d.jpg"
),
(
  2,
  "【官换】 A级 iPhone 8 Plus",
	4599,
	5599,
  1,
	"img/detail/2-1.jpg",
  "img/detail/2d.jpg"
),
(
  3,
  "A级 iPhone 6s",
	1399,
	1999,
  1,
	"img/detail/3-1.jpg",
  "img/detail/3d.jpg"
),
(
  4,
  "【国行官换】 A级 iPhone SE",
	1599,
	2299,
  1,
	"img/detail/4-1.jpg",
  "img/detail/4d.jpg"
),
(
  5,
  "A级 美版 iPhone 7 Plus",
	2899,
	2899,
  1,
	"img/detail/5-1.jpg",
  "img/detail/5d.jpg"
),
(
  6,
  "A级 美版 Galaxy S8",
	2299,
	2999,
  2,
	"img/detail/6-1.jpg",
  "img/detail/6d.jpg"
),
(
  8,
  "原封iPad Air2",
	2299,
	2299,
  3,
	"img/detail/8-1.jpg",
  "img/detail/8d.jpg"
),
(
  9,
  "A级 国行 iPhone 7",
	3099,
	3899,
  1,
	"img/detail/9-1.jpg",
  "img/detail/9d.jpg"
),
(
  10,
  "A级 欧版 iPhone 8",
	3999,
	4799,
  1,
	"img/detail/10-1.jpg",
  "img/detail/10d.jpg"
),
(
  11,
  "A级 V版 iPhone SE",
	999,
	999,
  1,
	"img/detail/11-1.jpg",
  "img/detail/11d.jpg"
),
(
  12,
  "【官换裸机】 高性价比 Apple Pencil",
	599,
	999,
  5,
	"img/detail/12-1.jpg",
  "img/detail/12d.jpg"
),
(
  13,
  "【官换裸机】 高性价比 AirPods",
	899,
	1299,
  5,
	"img/detail/13-1.jpg",
  "img/detail/13d.jpg"
),
(
  14,
  "iPhone X 热弯 3D 全覆盖钢化膜",
	99,
	99,
  5,
	"img/detail/14-1.jpg",
  "img/detail/14d.jpg"
),
(
  15,
  "vivo NEX 联通/移动/电信4G",
  3499,
  3499,
  2,
  "img/detail/15-1.jpg",
  "img/detail/15d.jpg"
),
(
  16,
  "oppo Find X 联通/移动/电信4G",
  3399,
  3399,
  2,
  "img/detail/16-1.jpg",
  "img/detail/16d.jpg"
),
(
  17,
  "小米 MIX2s",
  3399,
  4099,
  2,
  "img/detail/17-1.jpg",
  "img/detail/17d.jpg"
),
(
  18,
  "【国行】 iPad mini 2",
  999,
  999,
  3,
  "img/detail/18-1.jpg",
  "img/detail/18d.jpg"
),
(
  19,
  "爱否 双头快充 充电器",
  69,
  69,
  5,
  "img/detail/19-1.jpg",
  "img/detail/19d.jpg"
),
(
  20,
  "苹果 EarPods耳机",
  138,
  138,
  5,
  "img/detail/20-1.jpg",
  "img/detail/20d.jpg"
),
(
  21,
  "iPhone6/6s/6P/6SP保护壳",
  79,
  79,
  5,
  "img/detail/21-1.jpg",
  "img/detail/21d.jpg"
),
(
  22,
  "空气蛋 airpords无线充电保护壳",
  99,
  99,
  5,
  "img/detail/22-1.jpg",
  "img/detail/22d.jpg"
),
(
  23,
  "爱否 布加皮 iPhone保护壳",
  99,
  99,
  5,
  "img/detail/23-1.jpg",
  "img/detail/23d.jpg"
);
INSERT INTO simg VALUES
(
  1,
	"img/detail/1b.png",
	"img/detail/1w.png"
),
(
  2,
	"img/detail/2b.png",
	"img/detail/2w.png"
),
(
  3,
	"img/detail/3b.png",
	"img/detail/3w.png"
),
(
  4,
  "",
  "img/detail/4w.png"
),
(
  5,
  "img/detail/5b.png",
  "img/detail/5w.png"
),
(
  6,
  "img/detail/6b.png",
  ""
),
(
	9,
  "img/detail/9b.png",
  ""
),
(
	10,
  "img/detail/10b.png",
  ""
),
(
	11,
  "",
  "img/detail/11w.png"
),
(
  15,
  "img/detail/15b.png",
  ""
),
(
  16,
  "img/detail/16b.png",
  ""
),
(
  17,
  "img/detail/17b.png",
  "img/detail/17w.png"
);
INSERT INTO pimg VALUES
(
  1,
  "img/detail/1-1.jpg",
  "img/detail/1-2.jpg",
  "img/detail/1-3.jpg",
  "img/detail/1-4.jpg",
  "img/detail/1-5.jpg",
  "img/detail/1-6.jpg",
  "img/detail/1-7.jpg",
  "img/detail/1-8.jpg",
  "img/detail/1-9.jpg",
  "img/detail/1-10.jpg"
),
(
  2,
  "img/detail/2-1.jpg",
  "img/detail/2-2.jpg",
  "img/detail/2-3.jpg",
  "img/detail/2-4.jpg",
  "img/detail/2-5.jpg",
  "img/detail/2-6.jpg",
  "img/detail/2-7.jpg",
  "img/detail/2-8.jpg",
  "img/detail/2-9.jpg",
  "img/detail/2-10.jpg"
),
(
  3,
  "img/detail/3-1.jpg",
  "img/detail/3-2.jpg",
  "img/detail/3-3.jpg",
  "img/detail/3-4.jpg",
  "img/detail/3-5.jpg",
  "img/detail/3-6.jpg",
  "img/detail/3-7.jpg",
  "img/detail/3-8.jpg",
  "img/detail/3-9.jpg",
  "img/detail/3-10.jpg"
),
(
  4,
  "img/detail/4-1.jpg",
  "img/detail/4-2.jpg",
  "img/detail/4-3.jpg",
  "img/detail/4-4.jpg",
  "img/detail/4-5.jpg",
  "img/detail/4-6.jpg",
  "img/detail/4-7.jpg",
  "img/detail/4-8.jpg",
  "img/detail/4-9.jpg",
  "img/detail/4-10.jpg"
),
(
  5,
  "img/detail/5-1.jpg",
  "img/detail/5-2.jpg",
  "img/detail/5-3.jpg",
  "img/detail/5-4.jpg",
  "img/detail/5-5.jpg",
  "img/detail/5-6.jpg",
  "img/detail/5-7.jpg",
  "img/detail/5-8.jpg",
  "img/detail/5-9.jpg",
  "img/detail/5-10.jpg"
),
(
  6,
  "img/detail/6-1.jpg",
  "img/detail/6-2.jpg",
  "img/detail/6-3.jpg",
  "img/detail/6-4.jpg",
  "img/detail/6-5.jpg",
  "img/detail/6-6.jpg",
  "img/detail/6-7.jpg",
  "img/detail/6-8.jpg",
  "img/detail/6-9.jpg",
  "img/detail/6-10.jpg"
),
(
  8,
  "img/detail/8-1.jpg",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  ""
),
(
  9,
  "img/detail/9-1.jpg",
  "img/detail/9-2.jpg",
  "img/detail/9-3.jpg",
  "img/detail/9-4.jpg",
  "img/detail/9-5.jpg",
  "img/detail/9-6.jpg",
  "img/detail/9-7.jpg",
  "img/detail/9-8.jpg",
  "img/detail/9-9.jpg",
  "img/detail/9-10.jpg"
),
(
  10,
  "img/detail/10-1.jpg",
  "img/detail/10-2.jpg",
  "img/detail/10-3.jpg",
  "img/detail/10-4.jpg",
  "img/detail/10-5.jpg",
  "img/detail/10-6.jpg",
  "img/detail/10-7.jpg",
  "img/detail/10-8.jpg",
  "img/detail/10-9.jpg",
  "img/detail/10-10.jpg"
),
(
  11,
  "img/detail/11-1.jpg",
  "img/detail/11-2.jpg",
  "img/detail/11-3.jpg",
  "img/detail/11-4.jpg",
  "img/detail/11-5.jpg",
  "img/detail/11-6.jpg",
  "img/detail/11-7.jpg",
  "img/detail/11-8.jpg",
  "img/detail/11-9.jpg",
  "img/detail/11-10.jpg"
),
(
  12,
  "img/detail/12-1.jpg",
  "img/detail/12-2.jpg",
  "img/detail/12-3.jpg",
  "",
  "",
  "",
  "",
  "",
  "",
  ""
),
(
  13,
  "img/detail/13-1.jpg",
  "img/detail/13-2.jpg",
  "img/detail/13-3.jpg",
  "img/detail/13-4.jpg",
  "",
  "",
  "",
  "",
  "",
  ""
),
(
  14,
  "img/detail/14-1.jpg",
  "img/detail/14-2.jpg",
  "img/detail/14-3.jpg",
  "img/detail/14-4.jpg",
  "",
  "",
  "",
  "",
  "",
  ""
),
(
  15,
  "img/detail/15-1.jpg",
  "img/detail/15-2.jpg",
  "img/detail/15-3.jpg",
  "img/detail/15-4.jpg",
  "img/detail/15-5.jpg",
  "img/detail/15-6.jpg",
  "img/detail/15-7.jpg",
  "img/detail/15-8.jpg",
  "img/detail/15-9.jpg",
  "img/detail/15-10.jpg"
),
(
  16,
  "img/detail/16-1.jpg",
  "img/detail/16-2.jpg",
  "img/detail/16-3.jpg",
  "img/detail/16-4.jpg",
  "img/detail/16-5.jpg",
  "img/detail/16-6.jpg",
  "img/detail/16-7.jpg",
  "img/detail/16-8.jpg",
  "img/detail/16-9.jpg",
  "img/detail/16-10.jpg"
),
(
  17,
  "img/detail/17-1.jpg",
  "img/detail/17-2.jpg",
  "img/detail/17-3.jpg",
  "img/detail/17-4.jpg",
  "img/detail/17-5.jpg",
  "img/detail/17-6.jpg",
  "img/detail/17-7.jpg",
  "img/detail/17-8.jpg",
  "img/detail/17-9.jpg",
  "img/detail/17-10.jpg"
),
(
  18,
  "img/detail/18-1.jpg",
  "img/detail/18-2.jpg",
  "img/detail/18-3.jpg",
  "img/detail/18-4.jpg",
  "img/detail/18-5.jpg",
  "img/detail/18-6.jpg",
  "img/detail/18-7.jpg",
  "img/detail/18-8.jpg",
  "img/detail/18-9.jpg",
  "img/detail/18-10.jpg"
),
(
  19,
  "img/detail/19-1.jpg",
  "img/detail/19-2.jpg",
  "img/detail/19-3.jpg",
  "img/detail/19-4.jpg",
  "",
  "",
  "",
  "",
  "",
  ""
),
(
  20,
  "img/detail/20-1.jpg",
  "img/detail/20-2.jpg",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  ""
),
(
  21,
  "img/detail/21-1.jpg",
  "img/detail/21-2.jpg",
  "img/detail/21-3.jpg",
  "img/detail/21-4.jpg",
  "img/detail/21-5.jpg",
  "",
  "",
  "",
  "",
  ""
),
(
  22,
  "img/detail/22-1.jpg",
  "img/detail/22-2.jpg",
  "img/detail/22-3.jpg",
  "img/detail/22-4.jpg",
  "img/detail/22-5.jpg",
  "",
  "",
  "",
  "",
  ""
),
(
  23,
  "img/detail/23-1.jpg",
  "img/detail/23-2.jpg",
  "img/detail/23-3.jpg",
  "img/detail/23-4.jpg",
  "",
  "",
  "",
  "",
  "",
  ""
);
INSERT INTO ad_products VALUES
(
  1,
  "img/home/goods1.jpg",
  "【官换】 A级 iPhone X 限时特价 5599起"
),
(
  2,
  "img/home/goods2.jpg",
  "【官换】 A级 iPhone 8 Plus 限时特价 4599"
),
(
  3,
  "img/home/goods3.jpg",
  "A级 iPhone 6s 32G 限时特价 1399"
),
(
  4,
  "img/home/goods4.jpg",
  "【国行官换】 A级 iPhone SE 限时特价 1599"
),
(
  5,
  "img/home/goods5.jpg",
  "A级 美版 iPhone 7 Plus 限时特价 2899"
),
(
  6,
  "img/home/goods6.jpg",
  "A级 美版 Galaxy S8 限时特价 2299"
),
(
  8,
  "img/home/goods8.jpg",
  "原封iPad Air2 限时特价 2299"
),
(
  9,
  "img/home/goods9.jpg",
  "A级 国行 iPhone 7 限时特价 3099"
),
(
  10,
  "img/home/goods10.jpg",
  "A级 欧版 iPhone 8 限时特价 3399"
),
(
  11,
  "img/home/goods11.jpg",
  "A级 V版 iPhone SE 限时特价 999"
),
(
  12,
  "img/home/goods12.jpg",
  "【官换裸机】 高性价比 Apple Pencil 限时特价 599"
),
(
  13,
  "img/home/goods13.jpg",
  "【官换裸机】 高性价比 AirPods 限时特价 899"
),
(
  14,
  "img/home/goods14.jpg",
  "最薄的iPhone X 热弯 3D 全覆盖钢化膜"
);