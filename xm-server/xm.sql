SET NAMES UTF8;
DROP DATABASE IF EXISTS xm;
CREATE DATABASE xm CHARSET=UTF8;
USE xm;

-- 用户表
CREATE TABLE xm_user(
 uid INT PRIMARY KEY AUTO_INCREMENT,
 uname VARCHAR(32),
 upwd VARCHAR(32),
 email VARCHAR(64),
 phone VARCHAR(16),
 note_code VARCHAR(6),
 state VARCHAR(32),
 user_name VARCHAR(32),
 identity_card CHAR(18),
 gender CHAR(1)      #  1->男   0->女
);

INSERT INTO xm_user VALUES
(NULL,"z7821327",md5("123456"),"7821327@qq.com",13111111111,"123456","中国","明安彬",420115199103049819,"男"),
(NULL,"z87944276",md5("123456"),"7821327@qq.com",13111111112,"123456","中国","明安彬",420115199103049819,"男"),
(NULL,"z287234769",md5("123456"),"7821327@qq.com",13111111113,"123456","中国","阿娴",420115199103049819,"女"),
(NULL,"lilei1",md5("123456"),"123456@qq.com",13111111114,"123456","中国","李雷",420115199103049819,"男");

-- 手机商品表
CREATE TABLE xm_phone_product(
  pid INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(64),       #标题
  subtitle VARCHAR(128),   #副标题
  details VARCHAR(128),    #产品详细说明
  pic VARCHAR(128),        #产品图片地址
  price DECIMAL(10,0),      #价格
  href VARCHAR(128),         #商品ID链接地址
  product_count VARCHAR(300) #商品数量
);
INSERT INTO xm_phone_product VALUES
(NULL,"小米9 6GB+128GB","骁龙855，索尼4800万超广角微距三摄","11","img/index/phone/mi9-80.png",2999,"product-details.html?pid=1",11),
(NULL,"小米MIX 3 全网通版 6GB内存","4800万拍照千元机，18个月超长质保","11","img/index/phone/mi9se-80.png",3299,"product-details.html?pid=2",12),
(NULL,"Redmi Note 7 3GB+32G","4800万拍照千元机，18个月超长质保","11","img/index/phone/m8-80.png",999,"product-details.html?pid=3",13),
(NULL,"小米Play 4GB+64GB","5.84'' 小水滴全面屏，后置1200万 AI 双摄","11","img/index/phone/pms_1545457719.47232999!220x220.png",1099,"product-details.html?pid=4",14),
(NULL,"小米8青春版6GB+64GB","潮流镜面渐变色，2400万自拍旗舰","11","img/index/phone/pms_1537324004.08544830!220x220.jpg",1499,"product-details.html?pid=5",15),
(NULL,"小米8 SE 6GB+64GB","三星 AMOLED 全面屏，骁龙710","11","img/index/phone/pms_1527685277.65255600!220x220.jpg",1599,"product-details.html?pid=6",16),
(NULL,"小米MIX 3 全网通版 8GB内存 黑色","三星 AMOLED 全面屏，骁龙710","11","img/index/phone/pms_1524621350.77238418!220x220.jpg",3599,"product-details.html?pid=7",17),
(NULL,"小米MIX 3 全网通版 8GB+256GB 黑色","骁龙855，索尼4800万超广角微距三摄","11","img/index/phone/pms_1528719461.20891365!220x220.jpg",3999,"product-details.html?pid=8",18),
(NULL,"小米8 SE 6GB+64GB","三星 AMOLED 全面屏，骁龙710","11","img/index/phone/pms_1527685277.65255600!220x220.jpg",1599,"product-details.html?pid=9",19),
(NULL,"小米MIX 3 全网通版 8GB内存 黑色","三星 AMOLED 全面屏，骁龙710","11","img/index/phone/pms_1524621350.77238418!220x220.jpg",3599,"product-details.html?pid=10",20),
(NULL,"小米双单元半入耳式耳机","半入耳式舒适佩戴 | 动圈+陶瓷喇叭双单元声学架构 | 高韧性线材+微机电 | 麦克风线控 | 90 °贴心插头","半入耳·满入心","img/shop-cart/pms_1521442671.5222520!140x140.jpg",65,"product-details.html?pid=11",21),  
(NULL,"小米电视音响","为电视而生的好音响 支持市场上绝大多数电视","外表简洁低调，内心真实澎湃，小米电视音响，设计简洁流畅，声音丰满均衡，颜值在线，是看电视不可或缺的好伴侣；有了它，将您的听觉体验带上一个新的高度。现在，声音将变得更加美好。","img/shop-cart/pms_1522391647.00851451!140x140.jpg",399,"product-details.html?pid=12",22),
(NULL,"小米电视4A 65英寸","4K HDR | 人工智能语音系统 | 蓝牙语音遥控器","该电视含开机等形式的广告，开机时的广告视频不能删除、更改、且第三方内容的广告视频无法控制","img/shop-cart/pms_1535103027.24861415!140x140.jpg",2999,"product-details.html?pid=13",23),
(NULL,"小米电视4S 65英寸","骁龙855，索尼4800万超广角微距三摄","11","img/shop-cart/pms_1539308021.88618010!140x140.jpg",3999,"product-details.html?pid=14",24),
(NULL,"米家互联网洗烘一体机10kg","骁龙855，索尼4800万超广角微距三摄","11","img/shop-cart/pms_1545975724.92496169!140x140.jpg",2199,"product-details.html?pid=15",25),
(NULL,"小米电视4X 65英寸","骁龙855，索尼4800万超广角微距三摄","11","img/shop-cart/pms_1555945845.58334039!140x140.jpg",3099,"product-details.html?pid=16",26),
(NULL,"小米全面屏电视E55A","骁龙855，索尼4800万超广角微距三摄","11","img/shop-cart/pms_1555947485.70419235!140x140.jpg",2499,"product-details.html?pid=17",27),
(NULL,"小米电视4C 65英寸","骁龙855，索尼4800万超广角微距三摄","11","img/shop-cart/pms_1556096913.21054127!140x140.jpg",3099,"product-details.html?pid=18",28),
(NULL,"米家飞行员太阳镜","骁龙855，索尼4800万超广角微距三摄","11","img/shop-cart/pms_1556528367.85034850!140x140.jpg",99,"product-details.html?pid=19",29),
(NULL,"小米米家行车记录仪1S","骁龙855，索尼4800万超广角微距三摄","11","img/shop-cart/pms_1558089552.53522355!140x140.jpg",299,"product-details.html?pid=20",30);


-- 订单表
/**购物车条目**/
CREATE TABLE xm_shoppingcart(
  sid INT PRIMARY KEY AUTO_INCREMENT,
  uid INT,      #用户编号
  pid INT,   #商品编号
  count INT,        #购买数量
  is_checked BOOLEAN #是否已勾选，确定购买
);

INSERT INTO xm_shoppingcart VALUES
(NULL,3,1,1,1),
(NULL,3,2,1,1),
(NULL,3,3,1,1),
(NULL,4,1,1,1),
(NULL,4,2,1,1),
(NULL,4,11,1,1),
(NULL,4,12,1,1),
(NULL,4,13,1,1),
(NULL,4,14,1,1),
(NULL,4,15,1,1);



